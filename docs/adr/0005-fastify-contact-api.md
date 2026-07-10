# ADR-0005: API Fastify para contato e health

- **Status:** Aceito
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #6
- **Tipo:** Backend / integração

## Context and Problem Statement

O formulário de contato usa mock no middleware Vite. A Fase 3 exige API real (contato + health), com validação e rate limit, sem antecipar o monorepo (#10) nem o persistência Supabase (#7).

## Decision Drivers

1. Stack alinhada ao CV (Fastify)
2. TypeScript strict e schemas oficiais Fastify
3. CI/E2E do frontend não devem depender do servidor ainda
4. Caminho claro para #7 (store) e #8 (deploy)

## Considered Options

1. **Só mock Vite** — rejeitado (não atende #6)
2. **Monorepo Turborepo já (#10)** — adiado (escopo Fase 5)
3. **`server/` Fastify no mesmo repo + mock Vite para preview/E2E** — **escolhido**

## Decision Outcome

- Código em `server/` (Fastify 5 + `@fastify/cors` + `@fastify/helmet` + `@fastify/rate-limit`)
- Rotas: `GET /health`, `POST /api/contact`
- Persistência temporária em memória (substituída em #7 / ADR-0006)
- Dev integrado: `API_PROXY=1` + `npm run server:dev` + `npm run dev`
- Preview/Playwright: mock Vite permanece (sem servidor)

## Consequences

### Positivas

- API testável com `app.inject` (Vitest)
- Rate limit e validação server-side desde já
- Deploy da API fica para #8 sem bloquear o frontend em GitHub Pages

### Negativas / limitações

- Dois caminhos de `/api/contact` (mock vs Fastify) até o deploy unificado
- Mensagens não persistem entre restarts

## Confirmation

- `npm run test` cobre health + contact
- `npm run typecheck:server` passa
- Documentação em `docs/guides/api.md`

## More Information

- [Fastify Getting Started](https://fastify.dev/docs/latest/Guides/Getting-Started/)
- [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit)
- Issue #6
