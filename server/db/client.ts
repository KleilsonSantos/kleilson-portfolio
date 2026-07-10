import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let client: ReturnType<typeof postgres> | null = null
let db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function hasDatabaseUrl(): boolean {
  const url = process.env.DATABASE_URL?.trim()
  return Boolean(url && !url.includes('[YOUR-PASSWORD]'))
}

export function getDb() {
  if (!hasDatabaseUrl()) {
    throw new Error('DATABASE_URL ausente ou ainda com placeholder [YOUR-PASSWORD]')
  }
  if (!db) {
    // Transaction pooler (6543): prepare:false evita prepared statements incompatíveis
    client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 5 })
    db = drizzle(client, { schema })
  }
  return db
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.end({ timeout: 5 })
    client = null
    db = null
  }
}
