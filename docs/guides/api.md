# Guia — API (Fastify local + Workers produção)

## O que existe

| Rota | Método | Descrição |
| --- | --- | --- |
| `/health` | GET | Liveness + readiness (`checks.database`); header `x-request-id` |
| `/api/contact` | POST | Aceita mensagem e persiste (JSON); responde `id` + `requestId` |

| Runtime | Onde | Persistência |
| --- | --- | --- |
| Fastify (`server/`) | Local / testes | Drizzle + `DATABASE_URL` ou memória |
| Workers (`workers/api`) | Produção Free | Supabase PostgREST + service_role |

ADRs: [`0005`](../adr/0005-fastify-contact-api.md), [`0006`](../adr/0006-supabase-drizzle-contact.md), [`0008`](../adr/0008-cloudflare-deploy.md), [`0009`](../adr/0009-sentry-health.md)

## Variáveis de ambiente

Copie `.env.example` → `.env` e preencha (nunca commitar `.env`).

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `DATABASE_URL` | Local real | Postgres pooler **6543** |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Prod Worker | Secrets Wrangler |
| `CORS_ORIGIN` | Prod Worker | URL do Pages |
| `SENTRY_DSN` / `VITE_SENTRY_DSN` | Não | Opt-in (#9); sem DSN = no-op |
| `VITE_API_BASE_URL` | Prod Pages | URL do Worker |

## Rodar a API local

```bash
npm run server:dev
# http://127.0.0.1:8787/health
```

## Frontend + API juntos

```bash
npm run dev:full
```

## Produção

```bash
npm run deploy:api
curl -sS https://kleilson-portfolio-api.kleilsonsantos.workers.dev/health
```

## Testes

```bash
npm run test
npm run typecheck:server
```

## Logs (BP-008)

- Contato: só `contactId` + `requestId` — **nunca** e-mail/mensagem completos
- Correlation: header `x-request-id` (ecoado na resposta)
