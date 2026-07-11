/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL da API em produção se não for same-origin (ADR-0008). Sem barra final. */
  readonly VITE_API_BASE_URL?: string
  /** Sentry DSN do projeto browser — opcional; sem DSN = no-op (ADR-0009). */
  readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
