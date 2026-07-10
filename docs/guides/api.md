# Guia — API Fastify (#6)

## O que existe

| Rota | Método | Descrição |
| --- | --- | --- |
| `/health` | GET | Liveness (`status: ok`) |
| `/api/contact` | POST | Aceita mensagem de contato (JSON) |

Código: `server/` · ADR: [`0005-fastify-contact-api.md`](../adr/0005-fastify-contact-api.md)

## Rodar a API

```bash
npm run server:dev
# http://127.0.0.1:8787/health
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
npm run test          # inclui server/app.test.ts
npm run typecheck:server
```

## Limitações atuais

- Store em memória (até #7 Supabase/Drizzle)
- Produção da API entra com deploy (#8); o site em GitHub Pages segue estático
