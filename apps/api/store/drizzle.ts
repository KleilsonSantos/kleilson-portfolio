import { desc } from 'drizzle-orm'
import { getDb } from '../db/client'
import { contactMessages } from '../db/schema'
import type { ContactPayload, StoredContact } from '@kleilson/shared'

export async function saveContact(payload: ContactPayload): Promise<StoredContact> {
  const db = getDb()
  const [row] = await db
    .insert(contactMessages)
    .values({
      name: payload.name,
      email: payload.email,
      category: payload.category || null,
      message: payload.message,
    })
    .returning()

  if (!row) {
    throw new Error('Falha ao persistir mensagem de contato')
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    category: row.category ?? undefined,
    message: row.message,
    createdAt: row.createdAt,
  }
}

export async function listContacts(): Promise<readonly StoredContact[]> {
  const db = getDb()
  const rows = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(200)

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    category: row.category ?? undefined,
    message: row.message,
    createdAt: row.createdAt,
  }))
}
