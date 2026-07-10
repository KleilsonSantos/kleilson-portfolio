/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL da API em produção se não for same-origin (ADR-0008). Sem barra final. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
