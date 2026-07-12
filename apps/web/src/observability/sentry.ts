/**
 * Sentry no frontend — no-op sem `VITE_SENTRY_DSN` (#9 / ADR-0009).
 */
import * as Sentry from '@sentry/react'

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim()

export function initFrontendSentry(): void {
  if (!dsn) return

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0,
    sendDefaultPii: false,
  })
}

export { Sentry }
