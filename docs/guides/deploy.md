# Guia — Deploy (Cloudflare Pages + API)

How-to do [ADR-0008](../adr/0008-cloudflare-deploy.md). Issue: [#8](https://github.com/KleilsonSantos/kleilson-portfolio/issues/8).

## Visão

```text
Browser  →  Cloudflare Pages (SPA dist/)
         →  /api/*  e  /health  →  Container (Fastify + Drizzle)
                                      →  Supabase Postgres
```

Conteúdo do site continua em Git (`src/data/*`, ADR-0007). Só mensagens de contato vão ao banco.

**Ordem recomendada:** conta → Pages (site) → API Container → ligar origins/CORS → smoke → cutover.

---

## Passo 0 — Conta e pré-requisitos

1. Crie/entre em [dash.cloudflare.com](https://dash.cloudflare.com).
2. Plano **Free** basta para Pages; Containers pode exigir conta com Workers habilitado (verifique o dashboard).
3. No Mac, para a API depois:
   - [Docker Desktop](https://docs.docker.com/desktop/) rodando (`docker info` ok)
   - Node 22+ (já usado no repo)
4. Tenha à mão (do Supabase → Settings → Database):
   - `DATABASE_URL` do **pooler** (porta **6543**), senha real no lugar de `[YOUR-PASSWORD]`

---

## Passo 1 — Deploy automático do SPA (escolha uma)

Há **duas** formas equivalentes. A **B** já está no repo (GitHub Actions).

### Opção A — Connect to Git (dashboard Cloudflare)

Docs: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/).

1. Dashboard → **Workers & Pages** → projeto **`kleilson-portfolio`** (ou Create → Pages → **Connect to Git**).
2. Autorize o Cloudflare no GitHub (`KleilsonSantos` / repo **`kleilson-portfolio`**).
3. Production branch: **`main`** · Build: `npm run build` · Output: `dist` · `NODE_VERSION=22`.
4. **Save and Deploy**.

Se o projeto já existia via upload manual, use **Settings → Builds → Connect to Git** (ou migre para um projeto novo e aponte o domínio).

### Opção B — GitHub Actions (recomendado se o projeto já é “Direct Upload”)

Workflow: [`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml).

1. Crie um token em [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) (**Create Token** → template *Edit Cloudflare Workers* ou Custom) com **no mínimo**:
   - **Account** → Cloudflare Pages → **Edit**
   - **Account** → Account Settings → **Read**
   - Include resources: a conta correta (não “All accounts” se tiver várias)
   - **Client IP Address Filtering: deixe vazio / Allow all** — tokens com IP fixo **falham no GitHub Actions** (`Cannot use the access token from location… [code: 9109]`)
2. No GitHub: repo → **Settings** → **Secrets and variables** → **Actions** → New repository secret:
   - `CLOUDFLARE_API_TOKEN` = o token (sem aspas / sem espaço no fim)
   - `CLOUDFLARE_ACCOUNT_ID` = id da conta (Overview do dashboard, barra lateral direita)
3. Troubleshooting:
   - `Authentication error [code: 10000]` → token inválido ou sem **Pages Edit**
   - `Cannot use the access token from location… [code: 9109]` → remova o filtro de IP do token (ou crie um token só para Actions, sem IP allowlist) → atualize o secret → **Actions** → Deploy Cloudflare Pages → **Run workflow**

3. Merge em **`main`** (ou **Actions** → Deploy Cloudflare Pages → **Run workflow**).
4. Cada push em `main` publica `https://kleilson-portfolio.pages.dev`.

**Não use A e B ao mesmo tempo** no mesmo projeto (dois deploys competindo). Escolha um.

---

## Passo 2 — Configurar o build do SPA (só se usar Opção A)

Docs: [Deploy Vite](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/).

| Campo | Valor |
|-------|--------|
| Project name | `kleilson-portfolio` (gera `*.pages.dev`) |
| Production branch | `main` |
| Framework preset | **None** (ou Vite, se aparecer) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (vazio / raiz do repo) |

**Variáveis de ambiente (Pages) — nesta fase:**

- **Não** adicione `DATABASE_URL` nem chaves Supabase secret.
- Deixe `VITE_API_BASE_URL` **vazio** enquanto a API não existir (o formulário de contato no Pages puro ainda não gravará no banco — esperado até o Passo 4).

5. Clique **Save and Deploy**.
6. Aguarde o build. Anote a URL: `https://kleilson-portfolio.pages.dev` (ou o nome que escolheu).

**SPA:** não crie `public/404.html` — sem esse arquivo o Pages trata o site como SPA ([Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/)).

### Previews de PR

- **Opção A:** branches ≠ `main` geram preview deployments automaticamente.
- **Opção B:** só produção em `main` (previews podem ser adicionados depois).

### Se o build falhar

- Confira Node: `NODE_VERSION=22` (A) ou o workflow já usa Node 22 (B).
- Logs: dashboard Cloudflare (A) ou aba **Actions** no GitHub (B).

---

## Passo 3 — API em Cloudflare Workers (plano Free)

Containers exige **Workers Paid**. Enquanto não houver plano pago, a API de produção é um **Worker** (`workers/api`) que grava em `contact_messages` via Supabase PostgREST. **Sem Docker.**

Fastify (`server/`) continua para desenvolvimento local (`npm run server:dev` / `dev:full`).

### 3.1 Deploy

```bash
npx wrangler login          # se ainda não autenticado
npm run deploy:api          # wrangler deploy — sem Docker
```

URL esperada: `https://kleilson-portfolio-api.kleilsonsantos.workers.dev`

### 3.2 Secrets da API (nunca no Git)

```bash
npx wrangler secret put SUPABASE_URL
# https://YOUR_PROJECT_REF.supabase.co

npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
# service_role do Dashboard Supabase (server-only)

npx wrangler secret put CORS_ORIGIN
# https://kleilson-portfolio.pages.dev
```

| Secret | Obrigatório | Notas |
|--------|-------------|--------|
| `SUPABASE_URL` | Sim | URL do projeto |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Bypass RLS; só no Worker |
| `CORS_ORIGIN` | Sim | URL exata do Pages (sem barra final) |

### 3.3 Smoke

```bash
curl -sS https://kleilson-portfolio-api.kleilsonsantos.workers.dev/health
```

Esperado: `"status":"ok"` e `"storage":"postgres"`.

### 3.4 Caminho pago futuro (Containers + Fastify)

Quando houver Workers Paid + Colima/Docker: restaurar `[[containers]]` no `wrangler.toml` (histórico no Git) e secrets `DATABASE_URL` / `CORS_ORIGIN`. Até lá, **não** use Fly/Railway pagos.

---

## Passo 3-alt — (legado) Containers

Docs: [Containers get started](https://developers.cloudflare.com/containers/get-started/). Requer plano pago + Colima/Docker (`docker info` ok).
---

## Passo 4 — Ligar o frontend à API

Enquanto Pages e API estiverem em **origins diferentes**:

1. Pages → projeto → **Settings** → **Environment variables** → Production:
   - `VITE_API_BASE_URL` = `https://kleilson-portfolio-api.kleilsonsantos.workers.dev` (sem `/` no final)
2. **Retry deployment** / novo deploy de `main` (Vite embute a var no build).
3. Confirme `CORS_ORIGIN` no Worker = URL do Pages.

**Meta final (same-origin):** domínio custom com rotas `/api` e `/health` → Container; aí **remova** `VITE_API_BASE_URL` e use só paths relativos. Isso pode ficar para um PR seguinte do #8.

---

## Passo 5 — Smoke de produção

```bash
# Health
curl -sS https://SEU_API_HOST/health

# Contato
curl -sS -X POST https://SEU_API_HOST/api/contact \
  -H 'content-type: application/json' \
  -d '{"name":"Smoke","email":"smoke@example.com","message":"teste deploy #8"}'
```

1. Abra o site no Pages → Contatos → envie uma mensagem real.
2. No Supabase → Table Editor → `contact_messages` → confirme a linha.

---

## Passo 6 — Domínio custom (opcional neste #8)

1. Pages → **Custom domains** → Add → siga o DNS (CNAME para `*.pages.dev`).
2. Atualize `CORS_ORIGIN` (e `VITE_API_BASE_URL` se ainda split-origin).
3. Atualize `PROFILE.siteUrl` / README quando for canônico.

---

## Passo 7 — Cutover do GitHub Pages

**Feito (gradual):**

1. README / `PROFILE.siteUrl` apontam para `https://kleilson-portfolio.pages.dev`.
2. Pasta `legacy-github-pages/` + workflow `legacy-github-pages-redirect.yml` publicam meta-refresh + JS redirect no GitHub Pages (project site).
3. Produção canônica permanece no Cloudflare Pages (`deploy-pages.yml`).

**Uma vez no GitHub (humano):** Settings → Pages → Source = **GitHub Actions** (não branch `gh-pages` antiga), para o workflow de redirect publicar.

Opcional depois de estável: desligar Pages legado por completo.

---

## O que você faz agora vs o que o código ainda entrega

| Agora (você — 1×) | Automático / código |
|-------------------|---------------------|
| Secrets GitHub `CLOUDFLARE_*` **ou** Connect to Git | Workflow `deploy-pages.yml` em cada push `main` |
| Docker/Colima + Containers (futuro pago) | `Dockerfile` reservado |
| Secrets Worker: `SUPABASE_*`, `CORS_ORIGIN` | Contato → Supabase (Free) |
| `VITE_API_BASE_URL` no Pages | Front fala com o Worker |

**Site:** Opção B (Actions) ou A (Connect to Git). **Não os dois.**  
**Supabase:** após Worker + secrets — não é disparado pelo merge sozinho.

---

## Checklist (#8)

- [x] Pages auto-deploy verde a partir de `main` — `kleilson-portfolio.pages.dev`
- [x] API `/health` com `storage: postgres` (Worker Free + secrets)
- [x] Contato grava no Supabase
- [x] README / ROADMAP / ADR-0008 (emenda Free Workers)
- [x] Secrets só no Cloudflare / GitHub Actions (nunca no Git)
- [x] Cutover GitHub Pages → redirect legado (`legacy-github-pages/`)

## Relacionados

- [api.md](./api.md) — rodar API local
- [observability.md](./observability.md) — ordem Fase 4
- [content.md](./content.md) — editar conteúdo (não é deploy)
- [ADR-0008](../adr/0008-cloudflare-deploy.md)
