# ADR-0006: Persistência de contato com Supabase Postgres + Drizzle

- **Status:** Aceito
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #7
- **Tipo:** Backend / dados
- **Path atual (2026-07-12):** Drizzle/store em `apps/api/` · prod via `apps/worker-api` + PostgREST (texto histórico pode citar `server/`)

## Context and Problem Statement

A API Fastify (#6 / ADR-0005) gravava contatos em memória. A Fase 3 exige persistência real sem expor mensagens via Data API pública.

## Decision Drivers

1. Postgres gerenciado (Supabase) alinhado ao roadmap
2. ORM tipado (Drizzle) sem Prisma/heavy client no path crítico
3. RLS + revoke em `anon`/`authenticated` — escrita só pelo server (`DATABASE_URL`)
4. Testes Vitest continuam sem banco (fallback memória quando `NODE_ENV=test` ou sem URL)

## Considered Options

1. **Só Supabase JS + service_role** — rejeitado como store principal (issue pede Drizzle/SQL)
2. **Prisma** — rejeitado (mais pesado para este escopo)
3. **Drizzle + `postgres.js` + pooler 6543** — **escolhido**

## Decision Outcome

- Tabela `public.contact_messages` (migration aplicada no projeto Supabase `Portfolio`)
- RLS habilitado **sem** policies para roles públicas (advisor INFO esperado; acesso PostgREST negado)
- `REVOKE` de `anon`/`authenticated`; `GRANT` mínimo a `service_role` se uso futuro via client admin
- Código: `server/db/*`, `server/store/drizzle.ts`, seletor em `server/store/index.ts`
- Env: `DATABASE_URL` (obrigatória em runtime real); keys Supabase no `.env` para ops/MCP — **nunca** `VITE_`

## Consequences

### Positivas

- Mensagens sobrevivem a restart
- Schema versionado via migration Supabase + espelho Drizzle
- CI/testes não dependem de Postgres

### Negativas / limitações

- Pooler transaction mode exige `prepare: false`
- Sem `DATABASE_URL` válida a API cai no fallback memória (logado no boot / `/health.storage`)

## Confirmation

- `npm run test` (memória)
- `npm run typecheck:server`
- Inserção manual com `DATABASE_URL` real → linha em `contact_messages`

## More Information

- [Drizzle + Supabase](https://orm.drizzle.team/docs/get-started-postgresql)
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Issue #7 · ADR-0005
