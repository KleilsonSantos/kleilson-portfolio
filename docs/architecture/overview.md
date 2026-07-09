# Arquitetura — Visão Geral (atual: v0.2.0)

## Diagrama lógico

```text
┌─────────────────────────────────────────┐
│           Browser (SPA)                 │
│  React 19 + React Router 7 + Vite 8     │
│  TypeScript (strict)                    │
├─────────────────────────────────────────┤
│  pages/     Home | Sobre | Projetos |   │
│             Contatos | 404  (.tsx)      │
├─────────────────────────────────────────┤
│  data/      profileData | projectsData  │
│             contactData (.ts)           │
│  types/     contratos compartilhados    │
├─────────────────────────────────────────┤
│  hooks/     useDocumentMeta (SEO)       │
│  utils/     validation | sanitize       │
└─────────────────────────────────────────┘
                    │
                    ▼ (Fase 3 — planejado)
            ┌───────────────┐
            │  Fastify API  │
            │  PostgreSQL   │
            └───────────────┘
```

## Stack vigente

| Camada | Tecnologia |
|--------|------------|
| UI | React 19 + React Router 7 |
| Build | Vite 8 |
| Linguagem | TypeScript (strict) |
| Estilo | CSS design tokens |
| Qualidade | oxlint + `tsc -b` + CI + CodeQL |
| Contato (dev) | Mock Vite `/api/contact` |

## Princípios

1. **Conteúdo verificável** — sem dados inventados
2. **Evolução incremental** — fases pequenas com critérios de aceite
3. **Open Source desde o dia 1** — docs, ADRs, templates
4. **Git canônico** — `feature/* → sandbox → main` + SemVer
5. **Observabilidade desde cedo** — health checks na Fase 4

## Repositórios relacionados

| Repositório | Papel |
|-------------|-------|
| `kleilson-portfolio` | Portfólio definitivo (este) |
| `cursor-ai-playground` | Base visual/conceitual (curso) |
| `kleilsonsantos.github.io` | Portfólio legado (substituição futura) |

## Branch strategy (sandbox flow)

```text
feature/* | fix/* | docs/* | chore/* | ci/* ...
                    │
                    ▼
                sandbox
                    │
                    ▼
                  main  →  tag vX.Y.Z
```

Branches permanentes: `main` (produção) e `sandbox` (integração).

Ver: [`docs/guides/git-workflow.md`](../guides/git-workflow.md) e [ADR-0002](../adr/0002-git-branching-strategy.md).
