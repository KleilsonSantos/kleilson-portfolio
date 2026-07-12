/**
 * GitHub OAuth proxy for Decap CMS (Free Cloudflare Worker).
 * Spec: https://decapcms.org/docs/backends-overview/#using-github-with-an-oauth-proxy
 *
 * Secrets (wrangler secret put):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * GitHub OAuth App callback: https://<worker>/callback
 */
export interface Env {
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
}

const OAUTH_AUTHORIZE = 'https://github.com/login/oauth/authorize'
const OAUTH_ACCESS = 'https://github.com/login/oauth/access_token'

function htmlPage(title: string, body: string): Response {
  return new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>${title}</title></head><body>${body}</body></html>`,
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('Origin')

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (url.pathname === '/' || url.pathname === '/health') {
      return Response.json({ ok: true, service: 'kleilson-decap-oauth' })
    }

    if (url.pathname === '/auth') {
      const provider = url.searchParams.get('provider')
      if (provider && provider !== 'github') {
        return new Response('Unsupported provider', { status: 400 })
      }
      if (!env.GITHUB_CLIENT_ID) {
        return new Response('Missing GITHUB_CLIENT_ID', { status: 500 })
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
        <p>Autenticado. Você pode fechar esta janela.</p>
      `
      return htmlPage('Decap OAuth', script)
    }

    return new Response('Not found', { status: 404 })
  },
}
