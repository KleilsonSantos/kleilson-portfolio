# Arquitetura — Visão Geral (Fase 1)

## Diagrama lógico

```text
┌─────────────────────────────────────────┐
│           Browser (SPA)                 │
│  React 19 + React Router 7 + Vite 8     │
├─────────────────────────────────────────┤
│  pages/     Home | Sobre | Projetos |   │
│             Contatos | 404              │
├─────────────────────────────────────────┤
│  data/      profileData | projectsData  │
│             contactData (CV verificável) │
├─────────────────────────────────────────┤
│  hooks/     useDocumentMeta (SEO)     │
│  utils/     validation | sanitize       │
└─────────────────────────────────────────┘
                    │
                    ▼ (Fase 3 — planejado)
            ┌───────────────┐
            │  Fastify API  │
            │  PostgreSQL   │
            └───────────────┘
```

## Princípios

1. **Conteúdo verificável** — sem dados inventados
2. **Evolução incremental** — fases pequenas com critérios de aceite
3. **Open Source desde o dia 1** — docs, ADRs, templates
4. **Observabilidade desde cedo** — health checks na Fase 4

## Repositórios relacionados

| Repositório | Papel |
|-------------|-------|
| `kleilson-portfolio` | Portfólio definitivo (este) |
| `cursor-ai-playground` | Base visual/conceitual (curso) |
| `kleilsonsantos.github.io` | Portfólio legado (substituição futura) |

## Branch strategy (GitHub Flow)

- `main` — produção
- `feature/*` — novas funcionalidades
- `fix/*` — correções
- `docs/*` — documentação
- `chore/*` — manutenção
- `ci/*` — pipelines

Sem branch `develop` neste estágio (repositório solo/open source).
