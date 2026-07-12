import { sql } from 'drizzle-orm'
import { getDb, hasDatabaseUrl } from '../db/client'
import { usingDatabase } from '../store/index'

export type HealthCheck = 'ok' | 'skip' | 'fail'

export type HealthPayload = {
  status: 'ok' | 'degraded'
  liveness: 'ok'
  readiness: 'ok' | 'degraded' | 'unavailable'
  service: string
  runtime: string
  storage: 'postgres' | 'memory' | 'unconfigured'
  checks: { database: HealthCheck }
  timestamp: string
  uptime?: number
  requestId?: string
}

/** Ping leve no Postgres (BP-015 readiness). */
export async function checkDatabaseReady(): Promise<HealthCheck> {
  if (!usingDatabase() || !hasDatabaseUrl()) return 'skip'
  try {
    await getDb().execute(sql`select 1`)
    return 'ok'
  } catch {
    return 'fail'
  }
}

export function buildHealthPayload(opts: {
  database: HealthCheck
  runtime: string
  storage: HealthPayload['storage']
  uptime?: number
  requestId?: string
}): HealthPayload {
  const readiness =
    opts.database === 'fail' ? 'unavailable' : opts.database === 'ok' ? 'ok' : 'degraded'

  return {
    status: readiness === 'unavailable' ? 'degraded' : 'ok',
    liveness: 'ok',
    readiness,
    service: 'kleilson-portfolio-api',
    runtime: opts.runtime,
    storage: opts.storage,
    checks: { database: opts.database },
    timestamp: new Date().toISOString(),
    ...(opts.uptime !== undefined ? { uptime: opts.uptime } : {}),
    ...(opts.requestId ? { requestId: opts.requestId } : {}),
  }
}
