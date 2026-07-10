import type { ContactPayload, StoredContact } from '../schemas/contact'
import { hasDatabaseUrl } from '../db/client'
import * as memory from './memory'
import * as drizzleStore from './drizzle'

/**
 * Persistência: Postgres (Drizzle) quando DATABASE_URL válida;
 * memória em testes / dev sem DB (fallback explícito).
 */
export function usingDatabase(): boolean {
  return hasDatabaseUrl() && process.env.NODE_ENV !== 'test'
}

export async function saveContact(payload: ContactPayload): Promise<StoredContact> {
  if (usingDatabase()) {
    return drizzleStore.saveContact(payload)
  }
  return memory.saveContact(payload)
}

export async function listContacts(): Promise<readonly StoredContact[]> {
  if (usingDatabase()) {
    return drizzleStore.listContacts()
  }
  return memory.listContacts()
}

export function clearContacts(): void {
  memory.clearContacts()
}
