# ROADMAP

## Fase 1 — Frontend Foundation ✅ (`v0.1.0`)

- [x] Repositório `kleilson-portfolio` com React + Vite + Router
- [x] Páginas: Home, Sobre, Projetos, Contatos, 404
- [x] Conteúdo baseado no CV verificável
- [x] Design tokens e layout responsivo
- [x] SEO básico (meta tags + JSON-LD)
- [x] Mock de API de contato (dev)
- [x] Documentação OSS inicial + `.cursor/` rules
- [x] CI: lint + build

## Git Workflow Enterprise ✅ (`v0.1.1`)

- [x] Branch `sandbox` como integração
- [x] Fluxo `feature/* → sandbox → main` com PRs
- [x] ADR-0002 + guias de workflow/releases
- [x] Tags SemVer e GitHub Releases
- [x] Kickoff canônico (`docs/guides/task-kickoff.md`)

## Fase 2 — Qualidade & TypeScript (em andamento)

- [x] Migração para TypeScript (strict) — issue #2 / `v0.2.0`
- [ ] Vitest (unit) + Testing Library — issue #3
- [ ] Playwright (E2E) — issue #4
- [ ] ESLint + Prettier + Husky
- [ ] Lighthouse CI — issue #5

## Fase 3 — Backend & Dados

- [ ] API Fastify (contato, health) — issue #6
- [ ] PostgreSQL via Supabase + Drizzle ORM — issue #7
- [ ] Rate limiting e validação server-side

## Fase 4 — Observabilidade & Deploy

- [ ] Sentry (errors) — issue #9
- [ ] Analytics (Umami/Plausible)
- [ ] Health checks e structured logging
- [ ] Deploy: Cloudflare Pages + API — issue #8
- [ ] Substituição gradual de `kleilsonsantos.github.io`

## Fase 5 — Monorepo & Enterprise

- [ ] Turborepo + pnpm workspaces — issue #10
- [x] CodeQL + Dependabot (básico já ativo)
- [x] ADRs iniciais (0001, 0002, 0003 — documentação evidence-based)
- [x] GitHub Projects + milestones
- [x] Política canônica de sync documental (ADR-0003)
- [x] Fundação visual V1 (ADR-0004 — tokens, tipografia, nav, hero)
