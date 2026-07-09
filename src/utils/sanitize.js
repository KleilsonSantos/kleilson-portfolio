function isAllowedChar(code) {
  if (code === 0x09 || code === 0x0a || code === 0x0d) return true
  return code >= 0x20 && code !== 0x7f
}

export function sanitizeInput(value) {
  if (typeof value !== 'string') return ''

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

export function sanitizeFormData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)]),
  )
}
