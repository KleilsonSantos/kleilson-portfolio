# ADR-0009: Observabilidade — Sentry (no-op sem DSN) + health liveness/readiness

- **Status:** Aceito
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #9
- **Tipo:** Observabilidade
- **Relacionados:** ADR-0005 (API), ADR-0008 (deploy), `docs/guides/observability.md`

## Context

Após #8 (Pages + Workers Free), falta rastrear erros e distinguir liveness de readiness (BP-015), com logs sem PII (BP-008). Orçamento: **nada pago obrigatório**.

## Decision

1. **Sentry** via SDK (`@sentry/react`, `@sentry/node`) — **só ativa com DSN** (`VITE_SENTRY_DSN` / `SENTRY_DSN`). Sem DSN = no-op (plano free / opt-in). Worker de produção usa **Cloudflare Workers Observability** + logs JSON (`requestId`) — `@sentry/cloudflare` evitado por conflito de peer com `workers-types` v5.
2. **Logs:** Fastify/Pino JSON + `requestId`; Worker com log JSON `{ requestId, contactId }` — sem e-mail/mensagem.
3. **Health:** `GET /health` sempre liveness `ok`; `readiness` + `checks.database` (ping Postgres local / probe PostgREST no Worker).
4. **Fora:** Prometheus, OTel, Datadog, Grafana obrigatório (#62 opcional).

## Consequences

- Erros só chegam ao Sentry se o usuário criar projeto free e setar DSN.
- Workers Observability (CF) cobre logs de produção sem custo extra.
- Aceite #9 cumprido com código + docs; DSN é configuração, não bloqueio.
