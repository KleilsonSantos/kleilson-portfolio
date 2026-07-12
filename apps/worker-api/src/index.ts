/**
 * API de produção — Cloudflare Workers (plano Free).
 * Observabilidade #9: requestId, readiness; erros → CF Workers Observability.
 * Sentry SDK no Worker omitido (peer conflict com workers-types v5); React/Fastify cobrem DSN opt-in.
 */
import {
  assertContactBusinessRules,
  type ContactPayload,
} from '@kleilson/shared'

export interface Env {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  CORS_ORIGIN: string
}

const CONTACT_WINDOW_MS = 60_000
const CONTACT_MAX = 5
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function requestIdOf(request: Request): string {
  const incoming = request.headers.get('x-request-id')?.trim()
  if (incoming) return incoming
  return crypto.randomUUID()
}

function sanitize(value: string): string {
  const trimmed = value.trim()
  let result = ''
  for (let i = 0; i < trimmed.length; i += 1) {
    const code = trimmed.charCodeAt(i)
    if (code === 0x09 || code === 0x0a || code === 0x0d || (code >= 0x20 && code !== 0x7f)) {
      result += trimmed[i]
    }
  }
  return result
}

function allowedOrigins(env: Env): string[] {
  return (env.CORS_ORIGIN ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

function corsHeaders(request: Request, env: Env, requestId: string): HeadersInit {
  const origin = request.headers.get('Origin') ?? ''
  const allowed = allowedOrigins(env)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Request-Id',
    'Access-Control-Expose-Headers': 'X-Request-Id',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
    'X-Request-Id': requestId,
  }
  if (origin && (allowed.length === 0 || allowed.includes(origin))) {
    headers['Access-Control-Allow-Origin'] = origin
  } else if (allowed.length === 1) {
    headers['Access-Control-Allow-Origin'] = allowed[0]
  }
  return headers
}

function json(
  data: unknown,
  status: number,
  request: Request,
  env: Env,
  requestId: string,
): Response {
  return Response.json(data, {
    status,
    headers: corsHeaders(request, env, requestId),
  })
}

function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? 'unknown'
}

function rateLimitContact(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + CONTACT_WINDOW_MS })
    return true
  }
  if (bucket.count >= CONTACT_MAX) return false
  bucket.count += 1
  return true
}

async function probeDatabase(env: Env): Promise<'ok' | 'skip' | 'fail'> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return 'skip'
  try {
    const base = env.SUPABASE_URL.replace(/\/$/, '')
    const res = await fetch(`${base}/rest/v1/contact_messages?select=id&limit=1`, {
      method: 'GET',
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })
    return res.ok ? 'ok' : 'fail'
  } catch {
    return 'fail'
  }
}

async function handleHealth(request: Request, env: Env, requestId: string): Promise<Response> {
  const database = await probeDatabase(env)
  const readiness = database === 'fail' ? 'unavailable' : database === 'ok' ? 'ok' : 'degraded'
  const storage =
    database === 'ok' ? 'postgres' : env.SUPABASE_URL ? 'unconfigured' : 'unconfigured'

  const payload = {
    status: readiness === 'unavailable' ? 'degraded' : 'ok',
    liveness: 'ok',
    readiness,
    service: 'kleilson-portfolio-api',
    runtime: 'cloudflare-workers',
    storage,
    checks: { database },
    timestamp: new Date().toISOString(),
    requestId,
  }
  return json(payload, readiness === 'unavailable' ? 503 : 200, request, env, requestId)
}

async function handleContact(request: Request, env: Env, requestId: string): Promise<Response> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ message: 'API sem secrets de banco.', requestId }, 503, request, env, requestId)
  }

  if (!rateLimitContact(clientIp(request))) {
    return json(
      { message: 'Muitas tentativas. Aguarde um minuto.', requestId },
      429,
      request,
      env,
      requestId,
    )
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ message: 'JSON inválido.', requestId }, 400, request, env, requestId)
  }

  if (!raw || typeof raw !== 'object') {
    return json({ message: 'Corpo inválido.', requestId }, 400, request, env, requestId)
  }

  const bodyIn = raw as Record<string, unknown>
  const body: ContactPayload = {
    name: sanitize(String(bodyIn.name ?? '')),
    email: sanitize(String(bodyIn.email ?? '')),
    category: bodyIn.category ? sanitize(String(bodyIn.category)) : '',
    message: sanitize(String(bodyIn.message ?? '')),
  }

  if (body.name.length < 2 || body.name.length > 120) {
    return json({ message: 'Nome inválido.', requestId }, 400, request, env, requestId)
  }
  if (body.email.length < 5 || body.email.length > 254) {
    return json({ message: 'E-mail inválido.', requestId }, 400, request, env, requestId)
  }
  if (body.message.length < 10 || body.message.length > 4000) {
    return json({ message: 'Mensagem inválida.', requestId }, 400, request, env, requestId)
  }
  if (body.category && body.category.length > 80) {
    return json({ message: 'Categoria inválida.', requestId }, 400, request, env, requestId)
  }

  const businessError = assertContactBusinessRules(body)
  if (businessError) {
    return json({ message: businessError, requestId }, 400, request, env, requestId)
  }

  const base = env.SUPABASE_URL.replace(/\/$/, '')
  const insertRes = await fetch(`${base}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      category: body.category || null,
      message: body.message,
    }),
  })

  if (!insertRes.ok) {
    const detail = await insertRes.text().catch(() => '')
    console.error(JSON.stringify({ msg: 'contact insert failed', status: insertRes.status, requestId, detail: detail.slice(0, 200) }))
    return json({ message: 'Não foi possível salvar a mensagem.', requestId }, 502, request, env, requestId)
  }

  const rows = (await insertRes.json()) as Array<{ id?: string }>
  const id = rows[0]?.id
  if (!id) {
    return json({ message: 'Resposta inesperada do banco.', requestId }, 502, request, env, requestId)
  }

  // BP-008: sem PII — só contactId + requestId
  console.log(JSON.stringify({ msg: 'contact message accepted', contactId: id, requestId }))
  return json({ success: true, id, requestId }, 200, request, env, requestId)
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const requestId = requestIdOf(request)

    if (request.method === 'OPTIONS' && (path === '/health' || path.startsWith('/api/'))) {
      return new Response(null, { status: 204, headers: corsHeaders(request, env, requestId) })
    }

    if (path === '/health' && request.method === 'GET') {
      return handleHealth(request, env, requestId)
    }

    if (path === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env, requestId)
    }

    return json(
      {
        error: 'not_found',
        hint: 'Use GET /health or POST /api/contact — SPA is on Cloudflare Pages',
        requestId,
      },
      404,
      request,
      env,
      requestId,
    )
  },
}

export default worker
