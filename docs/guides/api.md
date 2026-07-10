# Guia — API Fastify (#6) + persistência (#7)

## O que existe

| Rota | Método | Descrição |
| --- | --- | --- |
| `/health` | GET | Liveness (`status: ok`, `storage: postgres\|memory`) |
| `/api/contact` | POST | Aceita mensagem de contato (JSON) e persiste |

Código: `server/` · ADRs: [`0005`](../adr/0005-fastify-contact-api.md), [`0006`](../adr/0006-supabase-drizzle-contact.md)

## Variáveis de ambiente

Copie `.env.example` → `.env` e preencha (nunca commitar `.env`).

**Sync com o remoto não apaga o `.env`:** ele está no `.gitignore`. `git pull` / `merge` / `checkout` só alteram arquivos versionados; arquivos ignorados (e untracked) permanecem no disco. Em clone novo: `cp .env.example .env` e preencher de novo (ou restaurar de um backup local / 1Password).

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `DATABASE_URL` | Sim (runtime real) | Postgres via pooler Supabase (porta **6543**). Substitua `[YOUR-PASSWORD]`. |
| `SUPABASE_URL` / keys | Ops / MCP | Não prefixar secret/service_role com `VITE_` |

Sem `DATABASE_URL` válida (ou em `NODE_ENV=test`), o store usa **memória**.

## Rodar a API

```bash
npm run server:dev
# http://127.0.0.1:8787/health  → storage: postgres|memory
```

## Frontend + API juntos

```bash
# terminal 1
npm run server:dev

# terminal 2
API_PROXY=1 npm run dev
```

Sem `API_PROXY=1`, o Vite continua com o **mock** de contato (útil para preview/E2E).

## Testes

```bash
npm run test          # inclui server/app.test.ts (memória)
npm run typecheck:server
```

## Limitações atuais

- Produção da API entra com deploy (#8); o site em GitHub Pages segue estático
- Tabela `contact_messages` não é listável via Data API pública (RLS + revoke) — só pelo server
