# Security Policy

## Versões suportadas

| Versão | Suportada |
|--------|-----------|
| 0.4.x  | ✅        |
| 0.3.x  | ✅ (segurança) |
| < 0.3  | ❌        |

## Reportar vulnerabilidade

**Não abra issues públicas para vulnerabilidades de segurança.**

Envie detalhes para: **kleilson@icloud.com**

Inclua:

- Descrição da vulnerabilidade
- Passos para reprodução
- Impacto potencial
- Sugestão de mitigação (se houver)

Responderemos em até 5 dias úteis.

## Escopo

- Código deste repositório
- Formulário de contato e API (`apps/api` local; `apps/worker-api` em produção)
- Pipeline CI/CD
- Dados em Postgres (Supabase) associados ao contato

## Práticas adotadas

- Sanitização de inputs no frontend
- Validação + rate limit server-side (Fastify)
- RLS + revoke em `contact_messages` (Data API pública bloqueada) — ADR-0006
- Segredos só em `.env` local / secrets do host (nunca `VITE_` para service_role)
- Dependabot e CodeQL ativos no GitHub
