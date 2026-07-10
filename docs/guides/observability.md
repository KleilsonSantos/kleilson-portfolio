# Observabilidade — mapa canônico (Fase 4)

Portfólio de baixo tráfego: **um caminho por preocupação**, sem APM enterprise redundante.

## Mapa (preocupação → ferramenta → issue)

| Preocupação | Ferramenta | Status | Issue |
| --- | --- | --- | --- |
| Disponibilidade / liveness | `GET /health` (+ `storage`) | ✅ | #6 / #7 |
| Readiness / DB | Ping Postgres quando `DATABASE_URL` | 📋 | **#9** (com Sentry/logs) |
| Deploy + CDN + API em produção | Cloudflare Pages (+ Container) | 📋 | **#8** · [ADR-0008](../adr/0008-cloudflare-deploy.md) · [deploy.md](./deploy.md) |
| Erros (frontend + API) | Sentry | 📋 | **#9** |
| Logs estruturados (API) | Logger Fastify (JSON em prod) + `requestId`; sem PII | 📋 | **#9** |
| Analytics privacy-first (pageviews) | Umami **ou** Plausible | 📋 | **#65** |
| Métricas / dashboards infra | Grafana Cloud (opcional) | 📋 pós-#8 | #62 (MCP) — só com tráfego real |
| Logs de banco / advisors | Supabase MCP / Dashboard | ✅ ops | #7 feito; uso contínuo |
| Qualidade / CVE no CI | CodeQL + Dependabot | ✅ | — |
| Agentes / MCP | Matriz oficial | 📋 | **#62** |

## Ordem recomendada

```text
#8 Deploy Cloudflare  →  #9 Sentry + logs + readiness/DB  →  #65 Analytics
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

## O que NÃO fazer neste repo

- Datadog + Grafana + Sentry ao mesmo tempo (redundância)
- Vercel como hosting (conflita com #8)
- Trazer Compose Prometheus/Grafana/Jaeger do lab Java
- Prometer “escala/monitoramento de produção” antes do deploy (#8)

## Relacionados

- ROADMAP Fase 4 · releases `v0.4.0+` → `v1.0.0` sugerido no deploy
- ADR-0005 (API) · ADR-0006 (Postgres)
- Issue #9 (escopo detalhado com aceite)
- Guia MCP: issue #62 → `docs/guides/mcp-tooling.md` (quando entregue)
