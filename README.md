# Kleilson Portfolio

> Portfólio profissional enterprise-ready — React 19 + Vite 8 + TypeScript strict.
> Conteúdo 100% verificável (CV · GitHub · LinkedIn). Nenhuma informação inventada.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)

[Live](https://kleilson-portfolio.pages.dev) · [Issues](https://github.com/KleilsonSantos/kleilson-portfolio/issues) · [Project board](https://github.com/users/KleilsonSantos/projects/6) · [Releases](https://github.com/KleilsonSantos/kleilson-portfolio/releases)

---

## Status

| Item | Valor |
| --- | --- |
| Branch de integração | `sandbox` |
| Produção | `main` + tags SemVer |
| Última release | `v0.4.0` |
| Qualidade | TypeScript strict + oxlint + Vitest + Playwright + Lighthouse CI |
| Docs | ADRs + guides + [system-guide](./docs/architecture/system-guide.md) + CHANGELOG (Keep a Changelog) |
| AI agents | `AGENTS.md` + `.github/copilot-instructions.md` (IDE-agnóstico) |
| Monorepo | pnpm workspaces + Turborepo — [ADR-0011](./docs/adr/0011-turborepo-pnpm.md) (#10) |
| API | Prod: Workers Free (`kleilson-portfolio-api.kleilsonsantos.workers.dev`) · Local: Fastify `apps/api` — ADR-0005/0008 |
| Persistência | Supabase Postgres + Drizzle — ADR-0006 (`DATABASE_URL`) |
| Conteúdo | `apps/web/content/*.json` (+ wrappers `src/data/*`) — [ADR-0007](./docs/adr/0007-content-as-code.md) · [ADR-0012](./docs/adr/0012-decap-cms-git-backed.md) · [guia](./docs/guides/content.md) |
| Deploy | Cloudflare Pages (`kleilson-portfolio.pages.dev`) + Workers Free — [ADR-0008](./docs/adr/0008-cloudflare-deploy.md) (#8) |
| Observabilidade | [`docs/guides/observability.md`](./docs/guides/observability.md) |

---

## Por que este projeto

Portfólio pessoal com disciplina de engenharia de produto:

- **Conteúdo auditável** — só o que está no CV, GitHub e LinkedIn
- **Arquitetura documentada** — ADRs, fluxo Git canônico, releases SemVer
- **UI dark-first** — tipografia Sora + IBM Plex Sans, accent teal (ADR-0004)
- **Qualidade contínua** — lint, typecheck, E2E Playwright, Lighthouse CI
- **Agentes de IA portáveis** — mesmas regras no Cursor, Copilot, Claude Code ou outro

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Monorepo | pnpm + Turborepo |
| UI | React 19, React Router 7 (`apps/web`) |
| Build | Vite 8 |
| Linguagem | TypeScript 5.9 (strict) |
| Qualidade | oxlint + Vitest + Playwright + Lighthouse CI |
| API | Fastify 5 (`apps/api`) · Worker (`apps/worker-api`) |
| Dados | Supabase Postgres + Drizzle ORM |
| Deploy | Cloudflare Pages + Workers Free (API) — GitHub Pages só redirect legado |
| Docs | Markdown + ADRs em `docs/` |

---

## Quick start

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
pnpm install
pnpm dev
```

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Dev server do web |
| `pnpm build` | Build via Turborepo |
| `pnpm lint` / `pnpm typecheck` / `pnpm test` | Qualidade |
| `pnpm test:e2e` | Playwright smoke |
| `pnpm --filter @kleilson/api dev` | API Fastify (porta 8787) |
| `pnpm dev:full` | API + Vite com proxy |
| `pnpm preview` | Preview do build web |
| `pnpm deploy:api` | Deploy Worker API |
| `pnpm deploy:decap-oauth` | Deploy OAuth Decap |

---

## Estrutura

```text
apps/
├── web/                 # SPA Vite/React (+ e2e, Lighthouse, /admin Decap)
│   ├── content/         # JSON canônico (Content-as-Code)
│   ├── public/admin/    # Decap CMS
│   └── src/data/        # Wrappers TypeScript
├── api/                 # Fastify + Drizzle (dev/local)
├── worker-api/          # Cloudflare Workers Free (API prod)
└── decap-oauth/         # OAuth Worker do Decap
packages/
└── shared/              # Schema/regras de contato
docs/
├── adr/
├── architecture/
└── guides/
legacy-github-pages/     # Redirect legado → Pages.dev
```

---

## API

Ver [docs/guides/api.md](./docs/guides/api.md), ADR-0005 e ADR-0006.

Setup local: `cp .env.example .env` (raiz do monorepo).

---

## Fontes de conteúdo

Todo conteúdo profissional é extraído de fontes verificáveis:

- Currículo ATS (`cv-kleilson-2026-ats.md`)
- GitHub
- LinkedIn

**Nenhuma informação é inventada.**

---

## Agentes de IA

Regras portáveis (independentes de IDE e modelo):

- [AGENTS.md](./AGENTS.md) — contrato canônico
- [.github/agents/](./.github/agents/) — custom agents (aba Agents no GitHub)
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) — GitHub Copilot
- [.cursor/rules/](./.cursor/rules/) — projeção Cursor (ponteiros; sem duplicar prompts)
- [docs/guides/ai-agentic.md](./docs/guides/ai-agentic.md) — como usar

---

## Ajuda / suporte

Onde obter ajuda: [SUPPORT.md](./SUPPORT.md) · [Issues](https://github.com/KleilsonSantos/kleilson-portfolio/issues).

## Licença

MIT — veja [LICENSE](./LICENSE).

## Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md).
