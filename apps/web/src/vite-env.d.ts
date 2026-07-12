/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL da API em produção se não for same-origin (ADR-0008). Sem barra final. */
  readonly VITE_API_BASE_URL?: string
  /** Sentry DSN do projeto browser — opcional; sem DSN = no-op (ADR-0009). */
  readonly VITE_SENTRY_DSN?: string
  /** Umami script URL — opcional; sem URL+ID = no-op (ADR-0010). Ex.: https://cloud.umami.is/script.js */
  readonly VITE_UMAMI_SCRIPT_URL?: string
  /** Umami website id (UUID). */
  readonly VITE_UMAMI_WEBSITE_ID?: string
  /** Domínios permitidos (CSV), opcional. Ex.: kleilson-portfolio.pages.dev */
  readonly VITE_UMAMI_DOMAINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
