# Guia de Onboarding

## 1. Clone e instale

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
git checkout sandbox
pnpm install
pnpm dev
```

API local (opcional):

```bash
pnpm --filter @kleilson/api dev
# ou frontend + API: pnpm dev:full
```

## 2. Estrutura mental

- **Monorepo** — pnpm + Turborepo ([ADR-0011](../adr/0011-turborepo-pnpm.md))
- **Páginas** em `apps/web/src/pages/` — uma rota por arquivo (`.tsx`)
- **Dados** em `apps/web/src/data/` — única fonte de conteúdo estático (`.ts`)
- **Tipos** em `apps/web/src/types/` — contratos TypeScript do SPA
- **API local** em `apps/api/` — Fastify (`/health`, `/api/contact`) — [api.md](./api.md)
- **API prod** em `apps/worker-api/` — Cloudflare Workers Free
- **Shared** em `packages/shared/` — schema de contato
- **Decisões** em `docs/adr/` — leia antes de mudanças grandes
- **IA** em [`AGENTS.md`](../../AGENTS.md) + [`.cursor/rules/`](../../.cursor/rules/) — ver [`ai-agentic.md`](./ai-agentic.md)
- **Kickoff** em [`task-kickoff.md`](./task-kickoff.md) — procedimento obrigatório
- **Project board:** https://github.com/users/KleilsonSantos/projects/6

## 3. Fluxo de trabalho (canônico)

1. Mover issue para **In Progress** no GitHub Project
2. Branch a partir de **`sandbox`** (nunca de `main`)
3. Implementar com escopo mínimo
4. `pnpm typecheck && pnpm lint && pnpm test && pnpm build`
5. PR para `sandbox` → após merge, PR `sandbox` → `main`
6. CI deve passar

## 4. Atualizar conteúdo profissional

1. Confira CV / GitHub / LinkedIn
2. Propague mudanças via [content.md](./content.md) (`apps/web/content/*.json` + wrappers)
3. Não invente fatos

## Relacionados

- [task-kickoff.md](./task-kickoff.md) — iniciar tarefa
- [git-workflow.md](./git-workflow.md) — branches / PRs
- [api.md](./api.md) — API local + Worker
- [content.md](./content.md) — editar conteúdo
- [deploy.md](./deploy.md) — publicar
- [SUPPORT.md](../../SUPPORT.md) — ajuda / issues
