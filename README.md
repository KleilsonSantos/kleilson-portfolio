# Kleilson Portfolio

Portfólio profissional open source de **Kleilson dos Santos** — Software Engineer / Full Stack Developer com foco em microsserviços, AppSec, DevSecOps e AI Agentic Engineering.

## Status

| Fase | Escopo | Status |
|------|--------|--------|
| Fase 1 | Frontend foundation (React + Vite + Router) | ✅ Concluída (`v0.1.0`) |
| Fase 2 | TypeScript, design system, testes | 📋 Planejado |
| Fase 3 | Backend API + persistência | 📋 Planejado |
| Fase 4 | Observabilidade + deploy produção | 📋 Planejado |

## Stack (Fase 1)

- React 19 + Vite 8 + React Router 7
- JavaScript (JSX) — migração TypeScript na Fase 2
- CSS com design tokens
- oxlint + GitHub Actions (CI)

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

## Fluxo Git

```text
feature/* → sandbox → PR → main → tag vX.Y.Z
```

Guia completo: [`docs/guides/git-workflow.md`](./docs/guides/git-workflow.md)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Lint com oxlint |

## Estrutura

```text
src/
├── api/          # Clientes HTTP
├── components/   # Layout, Footer
├── data/         # Conteúdo derivado do CV (fonte verificável)
├── hooks/        # useDocumentMeta (SEO)
├── pages/        # Home, Sobre, Projetos, Contatos, 404
└── utils/        # Validação e sanitização
docs/
├── adr/          # Architecture Decision Records
├── architecture/ # Visão arquitetural
└── guides/       # Onboarding e contribuição
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
