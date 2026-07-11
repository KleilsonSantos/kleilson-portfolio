/**
 * Sentry na API Fastify (local/dev) — no-op sem `SENTRY_DSN` (#9 / ADR-0009).
 */
import * as Sentry from '@sentry/node'

let initialized = false

export function initServerSentry(): void {
  const dsn = process.env.SENTRY_DSN?.trim()
  if (!dsn || initialized) return

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? 'development',
    tracesSampleRate: 0,
    sendDefaultPii: false,
  })
  initialized = true
}

export function captureServerException(error: unknown): void {
  if (!initialized) return
  Sentry.captureException(error)
}

export { Sentry }
