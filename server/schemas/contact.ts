export type ContactPayload = {
  name: string
  email: string
  category?: string
  message: string
}

export type StoredContact = ContactPayload & {
  id: string
  createdAt: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const contactBodySchema = {
  type: 'object',
  required: ['name', 'email', 'message'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 120 },
    email: { type: 'string', minLength: 5, maxLength: 254 },
    category: { type: 'string', maxLength: 80 },
    message: { type: 'string', minLength: 10, maxLength: 4000 },
  },
} as const

export function assertContactBusinessRules(body: ContactPayload): string | null {
  if (!EMAIL_PATTERN.test(body.email.trim())) {
    return 'Informe um e-mail válido.'
  }
  return null
}
