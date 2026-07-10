import { describe, expect, it } from 'vitest'
import { sanitizeFormData, sanitizeInput } from './sanitize'

describe('sanitizeInput', () => {
  it('remove caracteres de controle e trim', () => {
    expect(sanitizeInput('  hello\u0000world  ')).toBe('helloworld')
    expect(sanitizeInput('\tline\n')).toBe('line')
  })

  it('preserva texto normal e acentos', () => {
    expect(sanitizeInput('Olá, Kleilson!')).toBe('Olá, Kleilson!')
  })
})

describe('sanitizeFormData', () => {
  it('sanitiza todos os campos', () => {
    expect(
      sanitizeFormData({
        name: '  Ana\u0007  ',
        email: ' ana@ex.com ',
        category: 'geral',
        message: '  mensagem ok  ',
      }),
    ).toEqual({
      name: 'Ana',
      email: 'ana@ex.com',
      category: 'geral',
      message: 'mensagem ok',
    })
  })
})
