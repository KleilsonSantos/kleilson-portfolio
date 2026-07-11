# ADR-0010: Analytics privacy-first — Umami (opt-in)

- **Status:** Aceito
- **Data:** 2026-07-10
- **Decisores:** Kleilson dos Santos
- **Issue:** #65
- **Tipo:** Observabilidade / produto
- **Relacionados:** ADR-0009 (Sentry ≠ pageviews), `docs/guides/observability.md`

## Context

Após #8/#9, falta pageviews LGPD-friendly. ROADMAP pede Umami **ou** Plausible — um só. Nada pago obrigatório.

## Decision

**Escolhido: Umami**

| Critério | Umami | Plausible Cloud |
| --- | --- | --- |
| Open source / self-host | Sim | Community edition; cloud pago |
| Cookies / fingerprint invasivo | Não (script leve) | Não |
| Opt-in sem conta no merge | Env `VITE_UMAMI_*` | Similar, mas cloud costuma ser pago |
| Alinhamento “nada pago” | Cloud free tier ou self-host | Cloud geralmente pago |

Integração: script **só carrega** se `VITE_UMAMI_SCRIPT_URL` + `VITE_UMAMI_WEBSITE_ID` estiverem definidos no build (Pages). SPA: `trackPageview` em mudanças de rota. Sem PII no payload (só path/title).

**Não usar:** Google Analytics, pixels de ads, Datadog RUM.

## Consequences

- Sem env = zero rede/analytics (mesmo padrão do Sentry #9).
- Ativar: criar site no [Umami Cloud](https://cloud.umami.is) (free) ou self-host; setar vars no Pages e redeploy.
- Cloudflare Web Analytics permanece opção nativa no dashboard Pages (fora deste ADR) — não duplicar os dois sem necessidade.
