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

## Fase 2 — Qualidade & TypeScript ✅ (`v0.2.0` → `v0.3.0`)

- [x] Migração para TypeScript (strict) — issue #2 / `v0.2.0`
- [x] Vitest (unit) + Testing Library — issue #3
- [x] Playwright (E2E) — issue #4
- [x] Lint + hooks: **oxlint** + `.githooks` + CI `commitlint` (substitui o item original “ESLint + Prettier + Husky” sem redundância)
- [x] Lighthouse CI — issue #5
- [x] Direção visual ADR-0004 (V1–V5) + View Transitions / tema (#52)

## Fase 3 — Backend & Dados ✅ (`v0.3.0` → `v0.4.0`)

- [x] API Fastify (contato, health) — issue #6 / ADR-0005
- [x] PostgreSQL via Supabase + Drizzle ORM — issue #7 / ADR-0006
- [x] Rate limiting e validação server-side (na API Fastify #6)

## Fase 4 — Observabilidade & Deploy

Ordem: **#8 → #9 → analytics**; Grafana opcional pós-deploy. Detalhe: [`guides/observability.md`](./guides/observability.md).

- [ ] Deploy: Cloudflare Pages + API Container — issue #8 · [ADR-0008](./adr/0008-cloudflare-deploy.md) · [`guides/deploy.md`](./guides/deploy.md) ← **foco atual**
- [ ] Substituição gradual de `kleilsonsantos.github.io`
- [ ] Sentry (errors) + logs estruturados API — issue #9
- [ ] Analytics privacy-first (Umami/Plausible) — issue #65
- [x] Health check HTTP (`GET /health` na API)
- [ ] Matriz MCP (Cursor) — issue #62
- [ ] Grafana Cloud (métricas) — opcional, só com tráfego real (#62)

## Fase 5 — Monorepo & Enterprise

- [ ] Turborepo + pnpm workspaces — issue #10
- [x] CodeQL + Dependabot (básico já ativo)
- [x] ADRs (0001–0008)
- [x] GitHub Projects + milestones
- [x] Política canônica de sync documental (ADR-0003)
- [x] Fundação visual V1–V5 (ADR-0004)
- [x] Content-as-Code canônico (ADR-0007) + guia `guides/content.md`
- [ ] CMS Git-backed opcional (Decap/Tina → commits/PR em `sandbox`) — [#71](https://github.com/KleilsonSantos/kleilson-portfolio/issues/71), pós-#8, ver ADR-0007
- [x] Playwright E2E smoke (#4)
- [x] Lighthouse CI scaffold (#5)
- [x] Camada AI portável (`AGENTS.md` / Copilot / Cursor pointers)
