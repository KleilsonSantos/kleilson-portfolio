const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const INITIAL_FORM = {
  name: '',
  email: '',
  category: '',
  message: '',
}

export function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Nome é obrigatório.'
      if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres.'
      return ''
    case 'email':
      if (!value.trim()) return 'E-mail é obrigatório.'
      if (!EMAIL_PATTERN.test(value.trim())) return 'Informe um e-mail válido.'
      return ''
    case 'message':
      if (!value.trim()) return 'Mensagem é obrigatória.'
      if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres.'
      return ''
    default:
      return ''
  }
}

export function validateForm(form) {
  return Object.keys(INITIAL_FORM).reduce((errors, field) => {
    const error = validateField(field, form[field])
    if (error) errors[field] = error
    return errors
  }, {})
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}
