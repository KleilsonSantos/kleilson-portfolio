# ADR-0008: Deploy — Cloudflare Pages (SPA) + API Fastify em Container

- **Status:** Aceito (implementação em andamento)
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #8
- **Tipo:** Deploy / infraestrutura
- **Relacionados:** ADR-0005 (Fastify), ADR-0006 (Supabase), ADR-0007 (conteúdo Git)

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
| Build command | `npm run build` |
| Build output | `dist` |
| Framework preset | None / Vite |

[Serving Pages — SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/): sem `404.html` no topo, o Pages trata o projeto como SPA e faz fallback para `/`. O React Router (`NotFound.tsx`) continua responsável pela UX 404.

### 2. Onde rodar a API Fastify

| Opção | Prós | Contras |
|-------|------|---------|
| **Workers / Pages Functions (Hono)** | Same-origin fácil | Reescreve ADR-0005; Drizzle/`postgres` em Workers é frágil |
| **Cloudflare Containers** + Worker proxy | Mantém Node/Fastify; mesmo vendor; [docs Containers](https://developers.cloudflare.com/containers/) | Setup Docker + Durable Object; cold start |
| **Fly.io / Railway só para API** | Node simples | Dois vendors; CORS/`VITE_API_BASE_URL` |
| **Só mock / sem API em prod** | — | Rejeita aceite #8 |

**Escolhido:** Cloudflare **Containers** hospedando a imagem Node da API Fastify, com Worker (ou rota de domínio) encaminhando `/api/*` e `/health` para o container. Pages serve o SPA estático.

### 3. Same-origin vs URL absoluta

- **Preferido:** domínio custom (ex. `kleilsonsantos.dev`) com Pages no apex/www e rotas `/api` + `/health` → Container — `fetch('/api/contact')` permanece.
- **Escape hatch:** `VITE_API_BASE_URL` no build do Pages se a API ficar em subdomínio temporário (`api.…`).

## Considered Options

1. **Só GitHub Pages** — rejeitado (#8 / cutover)
2. **Vercel** — rejeitado (#62)
3. **Pages + reescrever API em Workers** — adiado (custo de reescrita; possível pós-estabilização)
4. **Pages + Containers (Fastify)** — **escolhido**
5. **Pages + Fly.io (API)** — fallback documentado se Containers bloquear o prazo

## Decision Outcome

### Frontend (Pages)

1. Projeto Cloudflare Pages ligado ao repo GitHub
2. Build: `npm run build` → `dist`
3. Branch de produção: `main` (previews em PRs)
4. Não adicionar `public/404.html` (preserva comportamento SPA do Pages)
5. Variáveis de build só se necessário (`VITE_API_BASE_URL`); nunca `DATABASE_URL` / service_role no Pages

### API (Containers)

6. Dockerfile multi-stage para `server/` (Node LTS, `PORT` injetado)
7. Secrets no Cloudflare: `DATABASE_URL`, `CORS_ORIGIN`, etc.
8. `GET /health` público; `POST /api/contact` com rate limit (já no Fastify)
9. CORS: origem do Pages / domínio custom

### Cutover

10. Publicar `*.pages.dev` primeiro
11. Documentar URL no README
12. Apontar domínio custom quando estável
13. GitHub Pages: banner/redirect gradual (não apagar até smoke de contato OK)

### Fora de escopo deste ADR

- Sentry (#9), analytics (#65), CMS Git-backed (#71)
- Monorepo (#10)

## Consequences

### Positivas

- Stack de API intacta (Fastify + Drizzle + Supabase)
- CDN global + previews de PR no Pages
- Alinhamento ao mapa de observabilidade (Fase 4)

### Negativas / limitações

- Dois artefatos de deploy (Pages + Container) até unificar domínio
- Cold start do container sob tráfego baixo (aceitável para portfólio)
- Conta Cloudflare + Docker local para `wrangler deploy` da API

## Confirmation

- [x] Site em `*.pages.dev` (ou custom) documentado no README (`https://kleilson-portfolio.pages.dev`)
- [ ] `POST /api/contact` em produção grava no Supabase
- [ ] `GET /health` público retorna `storage: postgres` (ou documenta fallback)
- [x] Este ADR + `docs/guides/deploy.md`
- [x] Secrets só no dashboard Cloudflare (Pages token / CI; API via `wrangler secret`)
- [ ] Aceite da issue #8 marcado via `gh issue edit`

## More Information

- [Cloudflare Pages — Vite](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/)
- [Cloudflare Pages — Serving / SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- Issue #8 · ADR-0005 · ADR-0006
