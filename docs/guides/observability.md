# Observabilidade — mapa canônico (Fase 4)

Portfólio de baixo tráfego: **um caminho por preocupação**, sem APM enterprise redundante.

## Mapa (preocupação → ferramenta → issue)

| Preocupação | Ferramenta | Status | Issue |
| --- | --- | --- | --- |
| Disponibilidade / liveness | `GET /health` (`liveness: ok`) | ✅ | #6 / #7 / **#9** |
| Readiness / DB | `readiness` + `checks.database` (ping/probe) | ✅ | **#9** · [ADR-0009](../adr/0009-sentry-health.md) |
| Deploy + CDN + API em produção | Cloudflare Pages + Workers Free | ✅ | **#8** · [ADR-0008](../adr/0008-cloudflare-deploy.md) · [deploy.md](./deploy.md) |
| Erros (frontend + API) | Sentry (no-op sem DSN) | ✅ código | **#9** · ADR-0009 |
| Logs estruturados (API) | Pino/Fastify + Worker JSON; `requestId`; sem PII | ✅ | **#9** |
| Analytics privacy-first (pageviews) | Umami (opt-in env) | ✅ código | **#65** · [ADR-0010](../adr/0010-analytics-umami.md) |
| Métricas / dashboards infra | Grafana Cloud (opcional) | 📋 | #62 (MCP) — só com tráfego real |
| Logs de banco / advisors | Supabase MCP / Dashboard | ✅ ops | #7 feito; uso contínuo |
| Qualidade / CVE no CI | CodeQL + Dependabot | ✅ | — |
| Agentes / MCP | Matriz oficial | 📋 | **#62** |

## Ordem recomendada

```text
#8 Deploy Cloudflare ✅  →  #9 Sentry + logs + readiness ✅  →  #65 Analytics ✅
         ↓
   (#62 docs MCP quando útil)
         ↓
   Grafana só se métricas de API/CDN justificarem custo
```

## Princípios aproveitados (curso purchase / Spring)

Do workspace `curso-spring-boot-kafka` (BP-015 Actuator probes, BP-008 logging, ADR-013 OTel):

| Aproveitar | Não copiar para este repo |
| --- | --- |
| Separar liveness vs readiness/DB | Actuator `/actuator/health/*` |
| Logs estruturados, stdout, sem PII | Logback/SLF4J stack Java |
| Correlation id por request | Micrometer Tracing + OTel + Jaeger |
| ADR curta ao escolher stack | Prometheus scrape + Grafana Compose local |
| Métricas só com necessidade real | Datadog / APM multi-serviço |

## Sentry (opt-in free)

Sem `VITE_SENTRY_DSN` / `SENTRY_DSN` o SDK **não envia nada**. Para ativar: criar projeto no [Sentry](https://sentry.io) (tier free) e setar DSN no Pages / `wrangler secret put SENTRY_DSN`.

## Umami (opt-in free) — #65

Sem `VITE_UMAMI_SCRIPT_URL` + `VITE_UMAMI_WEBSITE_ID` o script **não carrega**. Ativar: [Umami Cloud](https://cloud.umami.is) ou self-host → vars no Pages → redeploy. Ver [ADR-0010](../adr/0010-analytics-umami.md).

## O que NÃO fazer neste repo

- Datadog + Grafana + Sentry ao mesmo tempo (redundância)
- Vercel como hosting (conflito com #8)
- Trazer Compose Prometheus/Grafana/Jaeger do lab Java

## Relacionados

- ROADMAP Fase 4 · releases `v0.4.0+`
- ADR-0005 (API) · ADR-0006 (Postgres) · ADR-0008 (deploy) · ADR-0009 (Sentry/health) · ADR-0010 (Umami)
- Guia API: [api.md](./api.md)
