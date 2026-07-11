/**
 * Worker proxy → Cloudflare Container (Fastify API).
 * Docs: https://developers.cloudflare.com/containers/get-started/
 * ADR-0008 · issue #8
 */
import { Container, getContainer } from '@cloudflare/containers'

export interface Env {
  API_CONTAINER: DurableObjectNamespace<ApiContainer>
  /** wrangler secret put DATABASE_URL */
  DATABASE_URL: string
  /** wrangler secret put CORS_ORIGIN — URL exata do Pages, sem barra final */
  CORS_ORIGIN: string
}

/**
 * Uma instância de container para a API (stateless Fastify + Postgres).
 * Secrets do Worker são repassados via envVars (docs CF: env-vars-and-secrets).
 */
export class ApiContainer extends Container<Env> {
  defaultPort = 8787
  /** Mantém quente o suficiente para o formulário de contato; cold start ok em idle. */
  sleepAfter = '15m'
  /** Necessário para o pooler Supabase (Postgres). */
  enableInternet = true
  pingEndpoint = '/health'

  envVars = {
    NODE_ENV: 'production',
    HOST: '0.0.0.0',
    PORT: '8787',
    DATABASE_URL: this.env.DATABASE_URL,
    CORS_ORIGIN: this.env.CORS_ORIGIN,
  }

  override onStart(): void {
    console.log('ApiContainer started')
  }

  override onStop(): void {
    console.log('ApiContainer stopped')
  }

  override onError(error: unknown): void {
    console.error('ApiContainer error:', error)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    // Só proxy das rotas da API — resto 404 (SPA fica no Pages).
    if (path === '/health' || path.startsWith('/api/')) {
      const container = getContainer(env.API_CONTAINER)
      return container.fetch(request)
    }

    return Response.json(
      {
        error: 'not_found',
        hint: 'Use /health or /api/* — SPA is on Cloudflare Pages',
      },
      { status: 404 },
    )
  },
}
