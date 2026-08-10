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

/** Limites canônicos — espelham `contactBodySchema` (AJV no Fastify local). */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { min: 5, max: 254 },
  category: { max: 80 },
  message: { min: 10, max: 4000 },
} as const

export const contactBodySchema = {
  type: 'object',
  required: ['name', 'email', 'message'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: CONTACT_LIMITS.name.min,
      maxLength: CONTACT_LIMITS.name.max,
    },
    email: {
      type: 'string',
      minLength: CONTACT_LIMITS.email.min,
      maxLength: CONTACT_LIMITS.email.max,
    },
    category: { type: 'string', maxLength: CONTACT_LIMITS.category.max },
    message: {
      type: 'string',
      minLength: CONTACT_LIMITS.message.min,
      maxLength: CONTACT_LIMITS.message.max,
    },
  },
} as const

/** Remove caracteres de controle (exceto tab/LF/CR) — API local e Worker. */
export function sanitizeContactText(value: string): string {
  const trimmed = value.trim()
  let result = ''
  for (let i = 0; i < trimmed.length; i += 1) {
    const code = trimmed.charCodeAt(i)
    if (code === 0x09 || code === 0x0a || code === 0x0d || (code >= 0x20 && code !== 0x7f)) {
      result += trimmed[i]
    }
  }
  return result
}

export function assertContactFieldLengths(body: ContactPayload): string | null {
  if (
    body.name.length < CONTACT_LIMITS.name.min ||
    body.name.length > CONTACT_LIMITS.name.max
  ) {
    return 'Nome inválido.'
  }
  if (
    body.email.length < CONTACT_LIMITS.email.min ||
    body.email.length > CONTACT_LIMITS.email.max
  ) {
    return 'E-mail inválido.'
  }
  if (
    body.message.length < CONTACT_LIMITS.message.min ||
    body.message.length > CONTACT_LIMITS.message.max
  ) {
    return 'Mensagem inválida.'
  }
  if (body.category && body.category.length > CONTACT_LIMITS.category.max) {
    return 'Categoria inválida.'
  }
  return null
}

export function assertContactBusinessRules(body: ContactPayload): string | null {
  if (!EMAIL_PATTERN.test(body.email.trim())) {
    return 'Informe um e-mail válido.'
  }
  return null
}

/** Valida lengths + regras de negócio (fonte única para Worker e defesa no Fastify). */
export function validateContactPayload(body: ContactPayload): string | null {
  return assertContactFieldLengths(body) ?? assertContactBusinessRules(body)
}
