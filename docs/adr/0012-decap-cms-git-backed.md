# ADR-0012: Decap CMS Git-backed (editorial opcional)

- Status: Accepted
- Date: 2026-07-12
- Deciders: Kleilson Santos
- Issue: #71
- Relacionados: ADR-0007, ADR-0002, ADR-0011

## Context

ADR-0007 aceitou Content-as-Code canônico e CMS Git-backed como evolução opcional pós-deploy (#8). Monorepo (#10) já existe. Precisamos de UI editorial **sem** segunda fonte em banco e **sem** admin JWT/Firebase.

## Decision

Adotar **Decap CMS** (não TinaCMS):

| Critério | Decap | Tina |
| --- | --- | --- |
| Fonte de verdade | Git (commits) | Git (+ Tina Cloud opcional) |
| Auth | GitHub OAuth + proxy próprio | Tina Cloud / GitHub |
| Custo Free | Worker OAuth + Pages estático | Tina Cloud free limitada |
| Fit monorepo | Collections em `apps/web/content/*.json` | Mais acoplado a MDX/CMS runtime |

Implementação:

1. Conteúdo editável em `apps/web/content/*.json`; módulos `apps/web/src/data/*` só reexportam (tipos TS preservados).
2. UI em `/admin` (`apps/web/public/admin`) — Decap CDN; `config.yml` com backend GitHub, **branch `sandbox`**.
3. OAuth proxy Worker Free `@kleilson/decap-oauth` (`kleilson-decap-oauth.*.workers.dev`) — secrets `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`.
4. Publicação em `main` continua via PR `sandbox` → `main` + CI (lint/typecheck/build).

## Consequences

- Autor pode editar no browser autenticado com GitHub; commits caem em `sandbox`.
- Sem JWT em `localStorage`, sem Firebase keys, sem tabelas de conteúdo no Supabase.
- Setup humano: criar GitHub OAuth App + `wrangler secret put` + deploy do Worker OAuth.
- TinaCMS permanece rejeitado neste ADR (overhead Cloud / menos necessidade).

## Alternatives considered

1. TinaCMS + Tina Cloud — rejeitado (dependência Cloud; Decap cobre o caso Free).
2. CMS DB-backed — já rejeitado no ADR-0007.
3. Manter só edição em `.ts` — válido, mas não cumpre o aceite de implementação de #71.
