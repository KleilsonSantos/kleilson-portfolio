import { describe, expect, it } from 'vitest'
import { hasErrors, validateField, validateForm } from './validation'

describe('validateField', () => {
  it('exige nome com pelo menos 2 caracteres', () => {
    expect(validateField('name', '')).toMatch(/obrigatório/i)
    expect(validateField('name', 'A')).toMatch(/pelo menos 2/i)
    expect(validateField('name', 'Ana')).toBe('')
  })

  it('valida e-mail', () => {
    expect(validateField('email', '')).toMatch(/obrigatório/i)
    expect(validateField('email', 'invalido')).toMatch(/válido/i)
    expect(validateField('email', 'qa@example.com')).toBe('')
  })

  it('exige mensagem com pelo menos 10 caracteres', () => {
    expect(validateField('message', '')).toMatch(/obrigatória/i)
    expect(validateField('message', 'curta')).toMatch(/pelo menos 10/i)
    expect(validateField('message', 'Mensagem válida de teste.')).toBe('')
  })

  it('categoria não tem regra obrigatória', () => {
    expect(validateField('category', '')).toBe('')
  })
})

describe('validateForm / hasErrors', () => {
  it('retorna erros para formulário vazio', () => {
    const errors = validateForm({
      name: '',
      email: '',
      category: '',
      message: '',
    })
    expect(hasErrors(errors)).toBe(true)
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.message).toBeTruthy()
  })

  it('passa com dados válidos', () => {
    const errors = validateForm({
      name: 'Kleilson',
      email: 'dev@example.com',
      category: 'oportunidade',
      message: 'Olá, gostaria de conversar sobre um projeto.',
    })
    expect(hasErrors(errors)).toBe(false)
  })
})
