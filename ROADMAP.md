# ROADMAP

## Fase 1 — Frontend Foundation (atual)

- [x] Repositório `kleilson-portfolio` com React + Vite + Router
- [x] Páginas: Home, Sobre, Projetos, Contatos, 404
- [x] Conteúdo baseado no CV verificável
- [x] Design tokens e layout responsivo
- [x] SEO básico (meta tags + JSON-LD)
- [x] Mock de API de contato (dev)
- [x] Documentação OSS inicial + `.cursor/` rules
- [x] CI: lint + build

## Fase 2 — Qualidade & TypeScript

- [ ] Migração para TypeScript
- [ ] Vitest (unit) + Testing Library
- [ ] Playwright (E2E)
- [ ] ESLint + Prettier + Husky
- [ ] Lighthouse CI

## Fase 3 — Backend & Dados

- [ ] API Fastify (contato, health)
- [ ] PostgreSQL via Supabase + Drizzle ORM
- [ ] Rate limiting e validação server-side

## Fase 4 — Observabilidade & Deploy

- [ ] Sentry (errors)
- [ ] Analytics (Umami/Plausible)
- [ ] Health checks e structured logging
- [ ] Deploy: Cloudflare Pages + API
- [ ] Substituição gradual de `kleilsonsantos.github.io`

## Fase 5 — Monorepo & Enterprise

- [ ] Turborepo + pnpm workspaces
- [ ] CodeQL + Dependabot avançado
- [ ] ADRs completos por decisão
- [ ] GitHub Projects + milestones
