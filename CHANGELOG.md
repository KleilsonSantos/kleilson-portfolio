# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/) e [Conventional Commits](https://www.conventionalcommits.org/).

## [Unreleased]

### Fixed

- 💄 Editorial Decap: contraste (modal Mídia / lists / FieldLabel) e espaçamento (ListCard, ListItem) — fim do texto claro em fundo branco
- 📋 Gate QA local obrigatório antes do push (`task-kickoff` Passo 5b) — funcional + visual
- 👷 commitlint: aceitar tipos `ui` e `release` (bloqueava promote sandbox→main)
- 🐛 Skin editorial só existia em `sandbox` — Pages (main) ainda servia `/admin` default; CSS agora carrega após Decap + seletores Emotion (`SidebarNavLink`, etc.) + mount `#nc-root`

### Changed

- 💄 Editorial `/admin` alinhado ao profile: tokens únicos (`design-tokens.css`), brand bar, CTAs/nav do App.css; remoção de `logo_url` depreciado

### Added

- 🔒 Allowlist `ADMIN_GITHUB_LOGINS` no Worker Decap OAuth (fail-closed; só logins autorizados recebem token)
- 💄 Skin editorial Decap alinhada ao ADR-0004 (`/admin/admin.css` + preview style)

## [0.5.0] - 2026-07-13

### Added

- 📝 Auditoria production-ready (`docs/audits/production-readiness-audit-2026-07.md`)
- 👷 Workflow Deploy Decap OAuth Worker (evita worker órfão em production)
- 📝 Auditoria usabilidade/funcionalidade runtime (`docs/audits/usability-functional-quality-audit-2026-07.md`)
- 🔒 Runbook Cloudflare Access para `/admin*` (Zero Trust self-hosted) — #121
- 🧪 E2E smoke Decap `/admin` + `config.yml` (`apps/web/e2e/admin.spec.ts`) #123
- 📝 Runbook admin editorial + operacional (`docs/guides/admin-operations.md`) #120
- ✅ Validação Zod + Vitest para `apps/web/content/*.json` (#119)
- 📝 Guia completo de arquitetura/fluxos (`docs/architecture/system-guide.md`)
- 📝 `SUPPORT.md` (community health) + links no README/CONTRIBUTING (#109)
- 🤖 Custom agents Copilot (`.github/agents/` — task-planner, code-reviewer, docs-writer) para a aba Agents
- ♻️ Monorepo pnpm + Turborepo (`apps/web`, `apps/api`, `apps/worker-api`, `apps/decap-oauth`, `packages/shared`) #10 / ADR-0011
- 📝 Decap CMS Git-backed (`/admin` + `content/*.json` + OAuth Worker) #71 / ADR-0012
- 🤖 Matriz MCP canônica (`docs/guides/mcp-tooling.md`) alinhada ao roadmap #62
- 📊 Analytics Umami privacy-first (opt-in via `VITE_UMAMI_*`, SPA pageviews) #65 / ADR-0010
- 🔒 Sentry (React/Node/Workers) no-op sem DSN + health liveness/readiness + `requestId` (#9 / ADR-0009)
- 🚀 API de produção em Cloudflare Workers Free (`apps/worker-api`) via PostgREST — sem Containers pagos #8 / ADR-0008
- ✨ Foto profissional no hero (Home/Sobre) + assets WebP em `apps/web/public/images/profile/`
- ✨ Soft skills (habilidades interpessoais) na página Sobre
- ✨ Canal WhatsApp em Contatos (`wa.me` com mensagem pré-preenchida)
- 📝 ADR-0007 Content-as-Code (emenda JSON/Decap) + guia `docs/guides/content.md`
- 📝 ADR-0008 Deploy Cloudflare Pages + Workers Free (#8) + guia `docs/guides/deploy.md`
- ✨ `VITE_API_BASE_URL` opcional em `apps/web/src/api/contact.ts` (API em origin separado)

### Changed

- 📝 `.env.example` reorganizado por seções (Supabase → API → observabilidade → MCP)
- 📝 Guides: seção `## Relacionados` padronizada (links correlacionados; sem chrome da Wiki) #113
- ♻️ Dockerfile / Containers = caminho **pago futuro** (não path ativo de produção)
- 🔧 Dependabot monorepo: apenas `directory: "/"`; política de autoria Git sem trailer de IDE
- 🚚 Cutover GitHub Pages → redirect para Cloudflare Pages (`legacy-github-pages/` + workflow)
- 📱 Layout responsivo multi-device: containers/tipografia fluidos, hero em grid (tablet→desktop), breakpoints por conteúdo
- 💄 Avatar: recorte com headroom + anel branco fino no círculo
- 📱 Nav mobile (hamburger, safe-area, alvos 44pt) alinhada a HIG
- 📝 ROADMAP Fase 4 aponta ADR-0008 / guia de deploy
- 📝 Sync docs pós-`v0.4.0`: ROADMAP Fase 4, observability map, SECURITY, onboarding, README
- 📝 `observability.md` + #9: princípios BP-008/BP-015 (health/logs) sem OTel/Prometheus
- 📝 Regra canônica: agente marca `[x]` nos Aceites cumpridos da issue (não esperar clique humano)
- 📝 Docs alinhadas ao monorepo/Decap/Workers Free (overview, ADRs 0007/0008/0011, guides)

### Fixed

- 🗺️ `robots.txt` + `sitemap.xml` estáticos (deixam de cair no fallback SPA HTML)
- 📞 `tel:` href RFC 3966 sem hífen (`contact.json`)
- 🎨 `theme-color` alinhado ao teal ADR-0004 (`#2dd4bf`)
- 🔗 Removidos projetos featured com GitHub 404 (`purchase-ecosystem`, `copilot-java21-springboot`); destaques públicos: `banking`, `infra-devtools`, `VaultSpring` (#130)
- 🐛 Deploy Pages: `wrangler` na raiz do monorepo para `wrangler-action` + pnpm (evita `ERR_PNPM_ADDING_TO_ROOT`)
- 🐛 `test:e2e` / `lighthouse` usam `pnpm --filter @kleilson/web build` (`tsc -b` + vite), não `vite build` direto
- 🐛 Redirect legado GitHub Pages: preservar `pathname` no `404.html` e remover `meta refresh` para a raiz (deep links)

## [0.4.0] - 2026-07-10

### Added

- ✨ Persistência de contato com Supabase Postgres + Drizzle ORM (`contact_messages`, ADR-0006) (#7)
- 🔒 `.gitignore` para `.env` + `.env.example` (sem segredos)

### Changed

- ♻️ Store da API: Postgres quando `DATABASE_URL` válida; memória em testes / sem DB
- 📝 Guia `docs/guides/api.md` atualizado para #7

## [0.3.0] - 2026-07-10

### Added

- ✨ API Fastify (`server/`) com `/health` + `POST /api/contact`, rate limit e ADR-0005 (#6)
- 🎨 View Transitions (React Router) + toggle de tema dark/light (#52)
- ✅ Vitest + Testing Library (utils + Footer) e job `npm run test` no CI (#3)
- 🔧 Hook `.githooks/commit-msg` + CI `commitlint` (Conventional Commits + Gitmoji)
- 📝 `AGENTS.md` + `.github/copilot-instructions.md` + instructions/prompts (camada AI IDE-agnóstica)
- 📝 Guia `docs/guides/ai-agentic.md` (contrato portável Cursor/Copilot/outros)
- 💄 README com badges, status atualizado, Project board e seção de agentes
- 🔧 Configuração markdownlint no repositório (zero avisos nos docs do projeto)
- 📝 Rules Cursor finas (ponteiros para `AGENTS.md` / `.github/prompts`, sem cópia)
- ✨ Seções Certificações, Educação e Cursos/treinamentos em Sobre (#28)
- ✨ Dados verificáveis em `src/data/credentialsData.ts` (CV ATS + inventário Udemy)
- 🎨 ADR-0004: direção visual V1–V5 (dark-first, Sora + IBM Plex Sans, accent teal)
- 🎨 Fundação visual: nav sticky, hero enxuto, tokens sem Inter/indigo (#25)
- 🎨 Projetos V2: featured primary + grid + lista compacta com tagline/impact (#25)
- ✨ Motion V3: fade-up de seções + hovers discretos (`prefers-reduced-motion`) (#25)
- ✨ Cards interativos (highlight/skill panels) + polish de componentes (#25)
- ✅ Playwright E2E smoke no CI (#4)
- ⚡ Lighthouse CI scaffold com asserts conservadores (#5)

### Changed

- ♻️ `ROADMAP.md` movido para `docs/ROADMAP.md`
- ♻️ markdownlint consolidado em `.markdownlint-cli2.jsonc` + `.vscode/settings.json`
- 📝 Política de lint documental alinhada a Keep a Changelog (`MD024.siblings_only`)
- 💄 CTAs com padding, alinhamento e contraste corrigidos (#24)
- 💄 Home: brand + headline + lead + CTAs no primeiro viewport (sem cards no hero)
- ♻️ Modelo `Project` com `tagline` e `impact` (storytelling verificável)
- 👷 CI com jobs `e2e`, `lighthouse` e `commitlint` após `quality`
- 📝 Conteúdo sincronizado com `Kleilson_Santos_CV_2026.docx`
- 💄 Logo da nav: `Kleilson Santos` (em vez de `Kleilson.`)
- 📝 Experiência: Abertura de Contas PF e Renegociação Mobile (Bradesco); eDOX como projeto interno Capgemini (Jan–Mai 2026)
- 📝 Lint canônico: **oxlint** (item ROADMAP “ESLint” substituído sem redundância); hooks via `.githooks`

### Fixed

- 🐛 Padding da lista compacta de projetos (`--space-5` inexistente → texto colado na borda)
- 🐛 Texto dos botões colado/vazando nas bordas (padding/`line-height`)
- 🐛 Secondary CTA ilegível no dark mode (borda + contraste)
- 🐛 Seta do `<select>` colada na borda (padding + chevron custom)

## [0.2.2] - 2026-07-09

### Added

- 📝 ADR-0003: estratégia canônica de documentação (evidence-based)
- 📝 Guia `docs/guides/documentation-sync.md` (política operacional)

### Changed

- 📝 CONTRIBUTING e PR template incluem gate documental (Google/Microsoft/OpenSSF)

## [0.2.1] - 2026-07-09

### Changed

- 📝 Sincronização da documentação com o status real do projeto (`v0.2.0` + TypeScript)
- 📝 README, ROADMAP, onboarding, architecture e releases atualizados
- 📝 package.json version alinhada a `0.2.1`

## [0.2.0] - 2026-07-09

### Added

- ✨ Migração completa para TypeScript (strict mode)
- ✨ Tipos compartilhados em `src/types/`
- 👷 `npm run typecheck` integrado ao CI

### Changed

- ♻️ Todos os módulos `.js`/`.jsx` convertidos para `.ts`/`.tsx`
- ♻️ `vite.config.ts` com tipagem do mock de contato
- 📝 Regras Cursor atualizadas para Fase 2

## [0.1.1] - 2026-07-09

### Added

- 📝 ADR-0002: estratégia de branches, sandbox e SemVer
- 📝 Guia completo de fluxo Git (`docs/guides/git-workflow.md`)
- 📝 Guia de releases e tags (`docs/guides/releases.md`)
- 🌿 Branch `sandbox` como ambiente de integração
- 🏷️ Tag `v0.1.0` retroativa para Fase 1

### Changed

- 📝 CONTRIBUTING alinhado ao fluxo `feature → sandbox → main`

## [0.1.0] - 2026-07-09

### Added

- ✨ Bootstrap React 19 + Vite 8 + React Router 7
- ✨ Páginas Home, Sobre, Projetos, Contatos e 404
- ✨ Conteúdo baseado no CV verificável
- ✨ Design tokens e layout responsivo
- ✨ SEO (meta + JSON-LD) e mock de API de contato
- 📝 Documentação OSS inicial + ADR-0001
- 👷 CI: lint + build

[Unreleased]: https://github.com/KleilsonSantos/kleilson-portfolio/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/KleilsonSantos/kleilson-portfolio/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/KleilsonSantos/kleilson-portfolio/compare/v0.3.0...v0.4.0
