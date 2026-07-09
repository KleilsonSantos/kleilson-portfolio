import type { ContactForm } from '../types'

function isAllowedChar(code: number): boolean {
  if (code === 0x09 || code === 0x0a || code === 0x0d) return true
  return code >= 0x20 && code !== 0x7f
}

export function sanitizeInput(value: string): string {
  const trimmed = value.trim()
  let result = ''

  for (let index = 0; index < trimmed.length; index += 1) {
    const char = trimmed[index]
    if (isAllowedChar(char.charCodeAt(0))) {
      result += char
    }
  }

  return result
}

export function sanitizeFormData(data: ContactForm): ContactForm {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    category: sanitizeInput(data.category),
    message: sanitizeInput(data.message),
  }
}
