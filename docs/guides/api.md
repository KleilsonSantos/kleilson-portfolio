# Guia — API (Fastify local + Workers produção)

## O que existe

| Rota | Método | Descrição |
| --- | --- | --- |
| `/health` | GET | Liveness + readiness (`checks.database`); header `x-request-id` |
| `/api/contact` | POST | Aceita mensagem e persiste (JSON); responde `id` + `requestId` |

| Runtime | Onde | Persistência |
| --- | --- | --- |
| Fastify (`apps/api`) | Local / testes | Drizzle + `DATABASE_URL` ou memória |
| Workers (`apps/worker-api`) | Produção Free | Supabase PostgREST + service_role |

ADRs: [`0005`](../adr/0005-fastify-contact-api.md), [`0006`](../adr/0006-supabase-drizzle-contact.md), [`0008`](../adr/0008-cloudflare-deploy.md), [`0009`](../adr/0009-sentry-health.md), [`0011`](../adr/0011-turborepo-pnpm.md)

## Variáveis de ambiente

Copie `.env.example` → `.env` na **raiz do monorepo** e preencha (nunca commitar `.env`).

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `DATABASE_URL` | Local real | Postgres pooler **6543** |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Prod Worker | Secrets Wrangler |
| `CORS_ORIGIN` | Prod Worker | URL do Pages |
| `SENTRY_DSN` / `VITE_SENTRY_DSN` | Não | Opt-in (#9); sem DSN = no-op |
| `VITE_API_BASE_URL` | Prod Pages | URL do Worker (injete no build de deploy) |

## Rodar a API local

```bash
pnpm --filter @kleilson/api dev
# http://127.0.0.1:8787/health
```

## Frontend + API juntos

```bash
pnpm dev:full
```

## Produção

```bash
pnpm deploy:api
curl -sS https://kleilson-portfolio-api.kleilsonsantos.workers.dev/health
```

## Testes

```bash
pnpm test
pnpm typecheck
```

## Logs (BP-008)

- Contato: só `contactId` + `requestId` — **nunca** e-mail/mensagem completos
- Correlation: header `x-request-id` (ecoado na resposta)

## Relacionados

- [onboarding.md](./onboarding.md) — setup e `.env`
- [deploy.md](./deploy.md) — publicar API / Pages
- [observability.md](./observability.md) — health / Sentry / analytics
- [testing.md](./testing.md) — testes
- [ADR-0005](../adr/0005-fastify-contact-api.md) · [ADR-0006](../adr/0006-supabase-drizzle-contact.md)
