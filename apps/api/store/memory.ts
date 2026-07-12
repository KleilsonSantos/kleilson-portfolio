import type { ContactPayload, StoredContact } from '@kleilson/shared'

const messages: StoredContact[] = []

export function saveContact(payload: ContactPayload): StoredContact {
  const entry: StoredContact = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  messages.unshift(entry)
  if (messages.length > 200) messages.length = 200
  return entry
}

export function listContacts(): readonly StoredContact[] {
  return messages
}

export function clearContacts(): void {
  messages.length = 0
}
