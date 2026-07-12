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
| Docs | ADRs + guides + CHANGELOG (Keep a Changelog) |
| AI agents | `AGENTS.md` + `.github/copilot-instructions.md` (IDE-agnóstico) |
| API | Prod: Workers Free (`kleilson-portfolio-api.kleilsonsantos.workers.dev`) · Local: Fastify `server/` — ADR-0005/0008 |
| Persistência | Supabase Postgres + Drizzle — ADR-0006 (`DATABASE_URL`) |
| Conteúdo | Content-as-Code em `src/data/*` — [ADR-0007](./docs/adr/0007-content-as-code.md) · [guia](./docs/guides/content.md) |
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
| UI | React 19, React Router 7 |
| Build | Vite 8 |
| Linguagem | TypeScript 5.9 (strict) |
| Qualidade | oxlint + Vitest + Playwright + Lighthouse CI |
| API | Fastify 5 (`server/`) |
| Dados | Supabase Postgres + Drizzle ORM |
| Deploy | Cloudflare Pages + Workers Free (API) — GitHub Pages só redirect legado |
| Docs | Markdown + ADRs em `docs/` |

---

## Quick start

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
npm ci
npm run dev
```

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + build |
| `npm run lint` / `npm run format` | Qualidade de código |
| `npm run test` | Vitest (unit) |
| `npm run test:e2e` | Playwright smoke |
| `npm run server:dev` | API Fastify (porta 8787) |
| `npm run dev:full` | API + Vite com proxy |
| `npm run preview` | Preview do build |

---

## Estrutura

```text
public/
├── favicon.svg
├── icons.svg
└── images/profile/   # retrato otimizado (WebP/JPEG) — não versionar capturas cruas
src/
├── api/          # Clientes HTTP (.ts)
├── components/   # Layout, Footer, ProfilePhoto, UI (.tsx)
├── data/         # Conteúdo derivado do CV (fonte verificável)
├── hooks/        # useDocumentMeta (SEO)
├── pages/        # Home, Sobre, Projetos, Contatos, 404
├── types/        # Tipos compartilhados
├── utils/        # Validação e sanitização
├── App.tsx
└── main.tsx
docs/
├── adr/          # Architecture Decision Records
├── architecture/ # Visão arquitetural
├── guides/       # Onboarding, git-workflow, AI agents, releases
└── ROADMAP.md    # Fases / roadmap
.github/
├── copilot-instructions.md
├── instructions/ # Regras por path (Copilot)
└── prompts/      # Prompts canônicos (também @ no Cursor)
.cursor/rules/    # Projeção fina Cursor (ponteiros; sem cópia)
AGENTS.md         # Contrato único para qualquer agente de IA
server/           # API Fastify + Drizzle (ADR-0005 / ADR-0006)
```

---

## API

Ver [`docs/guides/api.md`](./docs/guides/api.md), [ADR-0005](./docs/adr/0005-fastify-contact-api.md) e [ADR-0006](./docs/adr/0006-supabase-drizzle-contact.md).

Setup local: `cp .env.example .env` (ver comentários no arquivo).

---

## Fontes de conteúdo

Todo conteúdo profissional é extraído de fontes verificáveis:

- Currículo ATS (`cv-kleilson-2026-ats.md`)
- [GitHub](https://github.com/KleilsonSantos)
- [LinkedIn](https://www.linkedin.com/in/kleilson-dev-full-stack/)

**Nenhuma informação é inventada.**

---

## Agentes de IA

Regras portáveis (independentes de IDE e modelo):

- [`AGENTS.md`](./AGENTS.md) — contrato canônico
- [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) — GitHub Copilot
- [`.cursor/rules/`](./.cursor/rules/) — projeção Cursor (ponteiros; sem duplicar prompts)
- [`docs/guides/ai-agentic.md`](./docs/guides/ai-agentic.md) — como usar

---

## Licença

MIT — veja [LICENSE](./LICENSE).

## Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md).
