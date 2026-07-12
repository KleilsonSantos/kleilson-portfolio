# Guia — Matriz MCP (Cursor / agentes)

Como autenticar e usar MCPs de forma **coerente** com o roadmap deste portfólio.  
Não adiciona dependência de runtime. Write ops via MCP **só com pedido explícito** do humano.

Contrato geral: [`AGENTS.md`](../../AGENTS.md) · Agentes: [`ai-agentic.md`](./ai-agentic.md) · Observabilidade: [`observability.md`](./observability.md)

## Estado do produto (fatos)

| Capacidade | Status | Issue / nota |
| --- | --- | --- |
| API Fastify local + Workers Free | ✅ | #6 / #8 · ADR-0005 / ADR-0008 |
| Persistência Postgres (`contact_messages`) | ✅ | #7 · ADR-0006 |
| Deploy Pages + API | ✅ | #8 |
| Sentry (no-op sem DSN) + health readiness | ✅ | #9 · ADR-0009 |
| Analytics Umami (opt-in) | ✅ código | #65 · ADR-0010 |
| CodeQL + Dependabot | ✅ | não substituir sem ADR |
| Monorepo | 📋 | #10 |
| CMS Git-backed | 📋 | #71 · Fase 5 |

## Princípio

**Um caminho por preocupação** — não empilhar APM enterprise num site de baixo tráfego.

| Preocupação | Caminho canônico |
| --- | --- |
| Dados / Postgres | Supabase (MCP + Dashboard) |
| Erros app | Sentry (opt-in DSN) |
| Pageviews | Umami (opt-in env) |
| Logs API prod | Cloudflare Workers Observability |
| Qualidade CI | CodeQL + Dependabot |
| Métricas infra (opcional) | Grafana Cloud — só com tráfego real |
| Deploy | Cloudflare Pages / Workers — **não** Vercel |

## Matriz MCP ↔ fase

### Usar (alinhado ao roadmap)

| MCP | Para quê | Quando | Relaciona |
| --- | --- | --- | --- |
| **Supabase** | projetos, SQL, advisors, logs, keys | **Agora** — ops contínuas | #7 |
| **Postman** (se auth) | contrato/coleção `/health` + `/api/contact`; smoke | API estável em Workers | #6, #8 |
| **Grafana Cloud** (se auth) | dashboards/métricas API/CDN | Opcional pós-deploy + tráfego real; **não** substitui Sentry | #8, #9 |
| **SonarQube** / **Snyk** (se auth + projeto) | qualidade/segurança **complementar** | Fase 5 ou DevSecOps explícito | #10 |

### Não usar neste repositório

| MCP / ideia | Motivo |
| --- | --- |
| **Vercel** (deploy) | Conflita com ADR-0008 / #8 (Cloudflare). |
| **GitLab** | Código e Issues/PRs estão no **GitHub**. |
| **Datadog** | Redundante com Sentry + CF Observability + Grafana opcional. |
| **Hugging Face / Figma / Miro / Slack / Notion / Atlassian** | Fora do runtime e do fluxo canônico; só se o autor pedir pontualmente. |

## Regras para agentes

1. Só usar MCP da coluna **Usar** (ou pedido explícito do humano para exceção).
2. **Write** (migrations, secrets, deploy, criar recursos pagos) → só com confirmação humana.
3. Não inventar schema Supabase / URLs de produção se o MCP não responder.
4. Não “prometer” APM/escala via Datadog/Vercel.
5. Não trocar CodeQL por Sonar/Snyk sem ADR.

## Pré-requisitos (não inventar)

- Sem projeto Supabase autenticado → não simular schema.
- Sem tráfego real → não priorizar Grafana.
- Sem DSN Sentry → erros ficam em CF Observability / logs locais; não fingir Sentry ativo.
- Sem `VITE_UMAMI_*` → analytics desligado (ADR-0010).

## Anti-padrões

- Datadog + Grafana + Sentry “só porque o MCP existe”
- Deploy na Vercel “para testar”
- Abrir issues no GitLab
- Adicionar pacote npm só para satisfazer um MCP

## Checklist de aceite (#62)

- [x] Este guia publicado
- [x] `AGENTS.md` referencia o guia
- [x] Não-objetivos explícitos (Vercel, Datadog, GitLab, trocar CodeQL)
- [x] Sem dependência de runtime nova

## Relacionados

- Issues: #7 · #8 · #9 · #62 · #65 · #10  
- Deploy: [`deploy.md`](./deploy.md) · Observabilidade: [`observability.md`](./observability.md)
