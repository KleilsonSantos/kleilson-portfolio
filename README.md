# Kleilson Portfolio

Portfólio profissional open source de **Kleilson dos Santos** — Software Engineer / Full Stack Developer com foco em microsserviços, AppSec, DevSecOps e AI Agentic Engineering.

## Status

| Fase | Escopo | Status |
|------|--------|--------|
| Fase 1 | Frontend foundation (React + Vite + Router) | ✅ Concluída (`v0.1.0`) |
| Git workflow | Sandbox, PRs, SemVer | ✅ Concluída (`v0.1.1`) |
| Fase 2 | TypeScript (strict) | ✅ Parcial (`v0.2.0`) — testes ainda pendentes |
| Fase 3 | Backend API + persistência | 📋 Planejado |
| Fase 4 | Observabilidade + deploy produção | 📋 Planejado |
| Fase 5 | Monorepo enterprise | 📋 Planejado |

**Release atual:** [`v0.2.0`](https://github.com/KleilsonSantos/kleilson-portfolio/releases/tag/v0.2.0)

## Stack (atual)

- React 19 + Vite 8 + React Router 7
- **TypeScript** (strict) — `.ts` / `.tsx`
- CSS com design tokens
- oxlint + `tsc` (typecheck) + GitHub Actions (CI) + CodeQL

## Pré-requisitos

- Node.js 20+
- npm 10+

## Desenvolvimento local

```bash
git clone https://github.com/KleilsonSantos/kleilson-portfolio.git
cd kleilson-portfolio
git checkout sandbox
npm install
npm run dev
```

## Fluxo Git (canônico)

```text
Issue → Project (In Progress) → feature/* from sandbox → PR → sandbox → PR → main → tag vX.Y.Z
```

- Guia: [`docs/guides/git-workflow.md`](./docs/guides/git-workflow.md)
- Kickoff: [`docs/guides/task-kickoff.md`](./docs/guides/task-kickoff.md)
- Docs sync: [`docs/guides/documentation-sync.md`](./docs/guides/documentation-sync.md) · [ADR-0003](./docs/adr/0003-documentation-strategy.md)
- Credenciais: [`docs/guides/credentials.md`](./docs/guides/credentials.md)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Verificação TypeScript (`tsc -b`) |
| `npm run lint` | Lint com oxlint |
| `npm run build` | Typecheck + build de produção |
| `npm run preview` | Preview do build |

## Estrutura

```text
src/
├── api/          # Clientes HTTP (.ts)
├── components/   # Layout, Footer (.tsx)
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
└── guides/       # Onboarding, git-workflow, releases, kickoff
```

## Fontes de conteúdo

Todo conteúdo profissional é extraído de fontes verificáveis:

- Currículo ATS (`cv-kleilson-2026-ats.md`)
- [GitHub](https://github.com/KleilsonSantos)
- [LinkedIn](https://www.linkedin.com/in/kleilson-dev-full-stack/)

**Nenhuma informação é inventada.**

## Licença

MIT — veja [LICENSE](./LICENSE).

## Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md).
