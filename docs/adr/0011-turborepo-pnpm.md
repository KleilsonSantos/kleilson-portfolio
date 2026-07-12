# ADR-0011: Monorepo Turborepo + pnpm

- Status: Accepted
- Date: 2026-07-12
- Deciders: Kleilson Santos
- Issue: #10

## Context

O repositório cresceu para três runtimes distintos (Vite SPA, Fastify local, Cloudflare Worker) no mesmo pacote npm flat. Scripts, CI e deploy acoplavam paths raiz (`dist`, `server/`, `workers/api`). A Fase 5 do ROADMAP previa Turborepo + pnpm.

## Decision

Adotar **pnpm workspaces** + **Turborepo** com:

| Pacote | Path | Papel |
| --- | --- | --- |
| `@kleilson/web` | `apps/web` | SPA Vite/React + E2E + Lighthouse |
| `@kleilson/api` | `apps/api` | Fastify + Drizzle (dev/local; Dockerfile Containers futuro) |
| `@kleilson/worker-api` | `apps/worker-api` | API produção Workers Free |
| `@kleilson/decap-oauth` | `apps/decap-oauth` | OAuth Worker do Decap CMS |
| `@kleilson/shared` | `packages/shared` | Schema/regras de contato compartilhadas |

- Lockfile: `pnpm-lock.yaml` (substitui `package-lock.json`)
- Builds de deps nativas: `allowBuilds` em `pnpm-workspace.yaml` (pnpm 11)
- CI/deploy: `pnpm install --frozen-lockfile`; Pages publica `apps/web/dist`

## Consequences

- Comandos canônicos na raiz: `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm deploy:api`, `pnpm deploy:decap-oauth`
- Conteúdo: `apps/web/content/*.json` (+ wrappers `apps/web/src/data/*`)
- Dependabot: **só** `directory: "/"` (um `pnpm-lock.yaml`; subpastas quebram frozen-lockfile)
- Pacote adicional: `@kleilson/decap-oauth` em `apps/decap-oauth` (OAuth Decap; ADR-0012)
- Migração é breaking para quem ainda usa `npm ci` / paths antigos (`server/`, `workers/api`)

## Alternatives considered

1. Manter monólito npm — rejeitado: acoplamento crescente
2. Só workspaces sem Turborepo — rejeitado: cache/orquestração de tasks útil no CI
3. Extrair repos separados — overkill para um portfólio
