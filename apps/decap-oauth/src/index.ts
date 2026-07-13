/**
 * GitHub OAuth proxy for Decap CMS (Free Cloudflare Worker).
 * Spec: https://decapcms.org/docs/backends-overview/#using-github-with-an-oauth-proxy
 *
 * Secrets (wrangler secret put):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *   ADMIN_GITHUB_LOGINS — CSV de logins GitHub permitidos (ex.: KleilsonSantos)
 *                         Fail-closed: sem allowlist → 403 após OAuth.
 *
 * GitHub OAuth App callback: https://<worker>/callback
 */
export interface Env {
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  /** Comma-separated GitHub usernames allowed to receive Decap tokens. */
  ADMIN_GITHUB_LOGINS?: string
}

const OAUTH_AUTHORIZE = 'https://github.com/login/oauth/authorize'
const OAUTH_ACCESS = 'https://github.com/login/oauth/access_token'
const GITHUB_USER = 'https://api.github.com/user'

function htmlPage(title: string, body: string): Response {
  return new Response(
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"/><title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;
        background:#070b12;color:#e8eef7;padding:1.5rem;text-align:center}
      a{color:#2dd4bf}
      p{max-width:28rem;line-height:1.5;opacity:.9}
    </style></head><body>${body}</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

function corsHeaders(origin: string | null): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function parseAllowlist(raw: string | undefined): Set<string> {
  if (!raw?.trim()) return new Set()
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  )
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('Origin')

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (url.pathname === '/' || url.pathname === '/health') {
      const allowlistConfigured = parseAllowlist(env.ADMIN_GITHUB_LOGINS).size > 0
      return Response.json({
        ok: true,
        service: 'kleilson-decap-oauth',
        allowlistConfigured,
      })
    }

    if (url.pathname === '/auth') {
      const provider = url.searchParams.get('provider')
      if (provider && provider !== 'github') {
        return new Response('Unsupported provider', { status: 400 })
      }
      if (!env.GITHUB_CLIENT_ID) {
        return new Response('Missing GITHUB_CLIENT_ID', { status: 500 })
      }
      if (parseAllowlist(env.ADMIN_GITHUB_LOGINS).size === 0) {
        return htmlPage(
          'Admin bloqueado',
          `<p><strong>ADMIN_GITHUB_LOGINS</strong> não configurado.</p>
           <p>Configure a allowlist no Worker antes de usar o editorial.</p>`,
        )
      }
      const redirect = new URL(OAUTH_AUTHORIZE)
      redirect.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
      redirect.searchParams.set('scope', 'repo,user')
      redirect.searchParams.set('redirect_uri', `${url.origin}/callback`)
      return Response.redirect(redirect.toString(), 302)
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code')
      const error = url.searchParams.get('error')
      if (error) {
        return htmlPage('OAuth error', `<p>GitHub OAuth error: ${error}</p>`)
      }
      if (!code) {
        return new Response('Missing code', { status: 400 })
      }
      if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        return new Response('Missing OAuth secrets', { status: 500 })
      }

      const allowlist = parseAllowlist(env.ADMIN_GITHUB_LOGINS)
      if (allowlist.size === 0) {
        return htmlPage(
          'Acesso negado',
          `<p>Allowlist de administradores não configurada (<code>ADMIN_GITHUB_LOGINS</code>).</p>`,
        )
      }

      const tokenRes = await fetch(OAUTH_ACCESS, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      })
      const tokenJson = (await tokenRes.json()) as {
        access_token?: string
        error?: string
        error_description?: string
      }

      if (!tokenJson.access_token) {
        const msg = tokenJson.error_description || tokenJson.error || 'token exchange failed'
        return htmlPage('OAuth failed', `<p>${msg}</p>`)
      }

      const token = tokenJson.access_token

      const userRes = await fetch(GITHUB_USER, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'kleilson-decap-oauth',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      if (!userRes.ok) {
        return htmlPage('OAuth failed', `<p>Não foi possível validar o usuário GitHub.</p>`)
      }
      const userJson = (await userRes.json()) as { login?: string }
      const login = userJson.login?.trim()
      if (!login || !allowlist.has(login.toLowerCase())) {
        return htmlPage(
          'Acesso negado',
          `<p>A conta GitHub <strong>${login ?? '(desconhecida)'}</strong> não está autorizada no editorial.</p>
           <p>Somente logins na allowlist do maintainer recebem token Decap.</p>
           <p><a href="https://kleilson-portfolio.pages.dev/">← Voltar ao site</a></p>`,
        )
      }

      // postMessage protocol expected by Decap CMS
      const script = `
        <script>
          (function () {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:success:' + JSON.stringify({ token: ${JSON.stringify(token)}, provider: 'github' }),
                e.origin
              );
              window.removeEventListener('message', receiveMessage, false);
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
        <p>Autenticado como <strong>${login}</strong>. Você pode fechar esta janela.</p>
      `
      return htmlPage('Decap OAuth', script)
    }

    return new Response('Not found', { status: 404 })
  },
}
