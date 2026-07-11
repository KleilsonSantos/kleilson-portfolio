/**
 * API de produção — Cloudflare Workers (plano Free).
 * Substitui Containers (Workers Paid) enquanto #8 não tiver plano pago.
 * Local continua em Fastify (`npm run server:dev`) — ADR-0005.
 *
 * Rotas: GET /health · POST /api/contact
 * Persistência: Supabase PostgREST (service_role) → contact_messages
 */
import {
  assertContactBusinessRules,
  type ContactPayload,
} from '../../../server/schemas/contact'

export interface Env {
  /** URL do projeto Supabase, ex. https://xxxx.supabase.co */
  SUPABASE_URL: string
  /** service_role — bypass RLS; nunca no frontend */
  SUPABASE_SERVICE_ROLE_KEY: string
  /** Origens permitidas, CSV. Ex.: https://kleilson-portfolio.pages.dev */
  CORS_ORIGIN: string
}

const CONTACT_WINDOW_MS = 60_000
const CONTACT_MAX = 5
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

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

function corsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get('Origin') ?? ''
  const allowed = allowedOrigins(env)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin && (allowed.length === 0 || allowed.includes(origin))) {
    headers['Access-Control-Allow-Origin'] = origin
  } else if (allowed.length === 1) {
    headers['Access-Control-Allow-Origin'] = allowed[0]
  }
  return headers
}

function json(data: unknown, status: number, request: Request, env: Env): Response {
  return Response.json(data, {
    status,
    headers: corsHeaders(request, env),
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

async function handleHealth(request: Request, env: Env): Promise<Response> {
  const hasDb = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
  return json(
    {
      status: 'ok',
      service: 'kleilson-portfolio-api',
      runtime: 'cloudflare-workers',
      storage: hasDb ? 'postgres' : 'unconfigured',
      timestamp: new Date().toISOString(),
    },
    200,
    request,
    env,
  )
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ message: 'API sem secrets de banco.' }, 503, request, env)
  }

  if (!rateLimitContact(clientIp(request))) {
    return json({ message: 'Muitas tentativas. Aguarde um minuto.' }, 429, request, env)
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ message: 'JSON inválido.' }, 400, request, env)
  }

  if (!raw || typeof raw !== 'object') {
    return json({ message: 'Corpo inválido.' }, 400, request, env)
  }

  const bodyIn = raw as Record<string, unknown>
  const body: ContactPayload = {
    name: sanitize(String(bodyIn.name ?? '')),
    email: sanitize(String(bodyIn.email ?? '')),
    category: bodyIn.category ? sanitize(String(bodyIn.category)) : '',
    message: sanitize(String(bodyIn.message ?? '')),
  }

  if (body.name.length < 2 || body.name.length > 120) {
    return json({ message: 'Nome inválido.' }, 400, request, env)
  }
  if (body.email.length < 5 || body.email.length > 254) {
    return json({ message: 'E-mail inválido.' }, 400, request, env)
  }
  if (body.message.length < 10 || body.message.length > 4000) {
    return json({ message: 'Mensagem inválida.' }, 400, request, env)
  }
  if (body.category && body.category.length > 80) {
    return json({ message: 'Categoria inválida.' }, 400, request, env)
  }

  const businessError = assertContactBusinessRules(body)
  if (businessError) {
    return json({ message: businessError }, 400, request, env)
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
    console.error('contact insert failed', insertRes.status, detail.slice(0, 200))
    return json({ message: 'Não foi possível salvar a mensagem.' }, 502, request, env)
  }

  const rows = (await insertRes.json()) as Array<{ id?: string }>
  const id = rows[0]?.id
  if (!id) {
    return json({ message: 'Resposta inesperada do banco.' }, 502, request, env)
  }

  console.log(JSON.stringify({ msg: 'contact message accepted', contactId: id }))
  return json({ success: true, id }, 200, request, env)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (request.method === 'OPTIONS' && (path === '/health' || path.startsWith('/api/'))) {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) })
    }

    if (path === '/health' && request.method === 'GET') {
      return handleHealth(request, env)
    }

    if (path === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env)
    }

    return json(
      {
        error: 'not_found',
        hint: 'Use GET /health or POST /api/contact — SPA is on Cloudflare Pages',
      },
      404,
      request,
      env,
    )
  },
}
