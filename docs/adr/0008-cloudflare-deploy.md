# ADR-0008: Deploy — Cloudflare Pages (SPA) + API em Workers Free

- **Status:** Aceito (implementado — Workers Free; Containers = caminho pago futuro)
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #8
- **Tipo:** Deploy / infraestrutura
- **Relacionados:** ADR-0005 (Fastify), ADR-0006 (Supabase), ADR-0007 (conteúdo Git), ADR-0011 (monorepo)

## Emenda (2026-07-12) — alinhamento ao código

| Antes (rascunho) | Atual |
| --- | --- |
| Paths `workers/api`, `server/` | `apps/worker-api`, `apps/api` |
| Build `npm run build` → `dist` | `pnpm --filter @kleilson/web build` → `apps/web/dist` |
| Produção = Containers Fastify | Produção = **Workers Free** (`apps/worker-api`); Fastify só local |
| Status “em andamento” | Cutover Pages + Worker documentados; #8 concluída no ROADMAP |

O corpo histórico abaixo registra a decisão e a emenda Free; use esta tabela + `docs/guides/deploy.md` como operação.

## Context and Problem Statement

O site está em GitHub Pages (`kleilsonsantos.github.io/kleilson-portfolio/`) sem API de produção. A Fase 4 (#8) exige:

1. SPA em **Cloudflare Pages** (não Vercel — #62)
2. API Fastify (`POST /api/contact`, `GET /health`) acessível em produção com `DATABASE_URL`
3. Secrets só no provedor
4. Cutover gradual do GitHub Pages

O frontend chama `fetch('/api/contact')` com path relativo — ideal manter **same-origin** em produção.

## Decision Drivers

1. Docs oficiais Cloudflare Pages para Vite/React
2. Preservar Fastify + Drizzle (ADR-0005/0006) — sem reescrever a API em Workers/Hono agora
3. Um vendor (Cloudflare) para CDN + API quando possível
4. Secrets fora do Git; CORS mínimo
5. Coerência com observabilidade (`/health` público) e cutover gradual

## Análises com evidências

### 1. SPA no Cloudflare Pages

[Deploy Vite no Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/):

| Setting | Valor |
|---------|--------|
| Production branch | `main` |
| Build command | `pnpm --filter @kleilson/web build` (ou `npx turbo run build --filter=@kleilson/web`) |
| Build output | `apps/web/dist` |
| Framework preset | None / Vite |

[Serving Pages — SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/): sem `404.html` no topo, o Pages trata o projeto como SPA e faz fallback para `/`. O React Router (`NotFound.tsx`) continua responsável pela UX 404.

### 2. Onde rodar a API Fastify

| Opção | Prós | Contras |
|-------|------|---------|
| **Workers / Pages Functions (Hono)** | Same-origin fácil | Reescreve ADR-0005; Drizzle/`postgres` em Workers é frágil |
| **Cloudflare Containers** + Worker proxy | Mantém Node/Fastify; mesmo vendor; [docs Containers](https://developers.cloudflare.com/containers/) | Setup Docker + Durable Object; cold start |
| **Fly.io / Railway só para API** | Node simples | Dois vendors; CORS/`VITE_API_BASE_URL` |
| **Só mock / sem API em prod** | — | Rejeita aceite #8 |

**Escolhido (original):** Cloudflare **Containers** + Fastify.

**Emenda 2026-07-10 (plano Free):** Containers exige **Workers Paid**. A API de produção roda em **Cloudflare Workers** (`apps/worker-api`) via PostgREST/Supabase (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`). Fastify + Drizzle permanece para **dev local** (`apps/api`). Dockerfile/Containers ficam como caminho pago futuro — sem Fly/Railway gratis.

### 3. Same-origin vs URL absoluta

- **Preferido:** domínio custom (ex. `kleilsonsantos.dev`) com Pages no apex/www e rotas `/api` + `/health` → API — `fetch('/api/contact')` permanece.
- **Escape hatch (atual Free):** `VITE_API_BASE_URL` = `https://kleilson-portfolio-api.<subdomínio>.workers.dev` no build do Pages.

## Considered Options

1. **Só GitHub Pages** — rejeitado (#8 / cutover)
2. **Vercel** — rejeitado (#62)
3. **Pages + API em Workers (PostgREST)** — **ativo agora (Free)** — evita Containers pagos
4. **Pages + Containers (Fastify)** — alvo quando houver Workers Paid
5. **Pages + Fly.io / Railway (API)** — rejeitado no momento (nada pago / outro vendor)

## Decision Outcome

### Frontend (Pages)

1. Projeto Cloudflare Pages ligado ao repo GitHub
2. Build: `pnpm --filter @kleilson/web build` → `apps/web/dist`
3. Branch de produção: `main` (previews em PRs)
4. Não adicionar `public/404.html` (preserva comportamento SPA do Pages)
5. Variáveis de build: `VITE_API_BASE_URL` enquanto split-origin; nunca `DATABASE_URL` / service_role no Pages

### API (Workers Free — atual)

6. Worker `kleilson-portfolio-api` em `apps/worker-api` — `GET /health`, `POST /api/contact`
7. Secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CORS_ORIGIN`
8. Fastify local em `apps/api` (ADR-0005); Dockerfile reservado para Containers pagos

### API (Containers — futuro pago)

9. Quando houver Workers Paid: proxy Container + `DATABASE_URL` (ver `docs/guides/deploy.md`)

### Cutover

10. Publicar `*.pages.dev` primeiro
11. Documentar URL no README
12. Apontar domínio custom quando estável
13. GitHub Pages: redirect legado (`legacy-github-pages/`) — não apagar até smoke OK

### Fora de escopo deste ADR (na decisão original; já tratados em ADRs/issues)

- Sentry (#9 / ADR-0009), analytics (#65 / ADR-0010), CMS (#71 / ADR-0012), monorepo (#10 / ADR-0011)

## Consequences

### Positivas

- Stack de API intacta (Fastify + Drizzle + Supabase)
- CDN global + previews de PR no Pages
- Alinhamento ao mapa de observabilidade (Fase 4)

### Negativas / limitações

- Dois artefatos de deploy (Pages + Worker) até unificar domínio custom
- Split-origin exige `VITE_API_BASE_URL` + CORS até same-origin
- Conta Cloudflare; `pnpm deploy:api` / Wrangler para o Worker

## Confirmation

- [x] Site em `*.pages.dev` documentado no README (`https://kleilson-portfolio.pages.dev`)
- [x] API prod em Workers Free (`apps/worker-api`) — ver `docs/guides/deploy.md`
- [x] Este ADR + `docs/guides/deploy.md`
- [x] Secrets só no dashboard Cloudflare / `wrangler secret`
- [x] Issue #8 refletida como concluída no ROADMAP

## More Information

- [Cloudflare Pages — Vite](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/)
- [Cloudflare Pages — Serving / SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- Issue #8 · ADR-0005 · ADR-0006
