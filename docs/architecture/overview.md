# Arquitetura — Visão Geral (atual: v0.4.0)

## Diagrama lógico

```text
┌─────────────────────────────────────────┐
│           Browser (SPA)                 │
│  React 19 + React Router 7 + Vite 8     │
│  TypeScript (strict) · ADR-0004 visual  │
├─────────────────────────────────────────┤
│  pages/     Home | Sobre | Projetos |   │
│             Contatos | 404  (.tsx)      │
├─────────────────────────────────────────┤
│  data/      profile | projects |        │
│             credentials | contact (.ts) │
│             ★ Content-as-Code (ADR-0007)│
│  types/     contratos compartilhados    │
├─────────────────────────────────────────┤
│  hooks/     useDocumentMeta | useTheme  │
│  utils/     validation | sanitize |     │
│             theme                       │
└─────────────────────────────────────────┘
          │                    │
          │ mock (preview/E2E) │ API_PROXY=1 / prod
          ▼                    ▼
   Vite middleware      ┌──────────────────┐
   /api/contact         │  Fastify (server/)│
                        │  GET  /health     │
                        │  POST /api/contact│
                        │  Drizzle store    │
                        └────────┬─────────┘
                                 │ DATABASE_URL
                                 ▼
                           Supabase/Postgres
                           (contact_messages)

Produção (ADR-0008): Pages (dist/) + Container Fastify; same-origin preferido.
```

## Stack vigente

| Camada | Tecnologia |
|--------|------------|
| UI | React 19 + React Router 7 |
| Build | Vite 8 |
| Linguagem | TypeScript (strict) |
| Estilo | CSS design tokens (ADR-0004) |
| Qualidade | oxlint + Vitest + Playwright + Lighthouse + CodeQL |
| Contato (dev/preview) | Mock Vite `/api/contact` |
| Contato (API) | Fastify 5 em `server/` (ADR-0005) |
| Persistência | Supabase Postgres + Drizzle (ADR-0006); memória em testes |
| Deploy | Cloudflare Pages + API Container (ADR-0008) — em andamento #8 |

## Princípios

- Conteúdo profissional só com evidência (CV / GitHub / LinkedIn)
- Conteúdo = desired state no Git (`src/data/*`, ADR-0007); sem admin JWT/DB para narrativa
- Docs no mesmo PR quando build/test/uso/release/arquitetura mudam (ADR-0003)
- Fluxo Git: `feature/* → sandbox → main` + SemVer

## Referências

- [ADR-0001](../adr/0001-frontend-vite-react.md) — frontend
- [ADR-0002](../adr/0002-git-branching-strategy.md) — Git
- [ADR-0003](../adr/0003-documentation-strategy.md) — docs
- [ADR-0004](../adr/0004-visual-direction.md) — visual
- [ADR-0005](../adr/0005-fastify-contact-api.md) — API
- [ADR-0006](../adr/0006-supabase-drizzle-contact.md) — persistência contato
- [ADR-0007](../adr/0007-content-as-code.md) — gestão de conteúdo
- [content.md](../guides/content.md) — como editar conteúdo
- [ADR-0008](../adr/0008-cloudflare-deploy.md) — deploy Cloudflare
- [deploy.md](../guides/deploy.md) — como publicar
- [api.md](../guides/api.md) — como rodar a API
- [releases.md](../guides/releases.md) — tags
