import { useState, type FormEvent } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE } from '../data/profileData'
import { CONTACT_INFO, SOCIAL_LINKS, CATEGORIES } from '../data/contactData'
import { sendContactForm } from '../api/contact'
import { INITIAL_FORM, validateField, validateForm, hasErrors } from '../utils/validation'
import { sanitizeFormData } from '../utils/sanitize'
import type { ContactForm, ContactFormField, FormErrors, FormStatus } from '../types'

function Contatos() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  useDocumentMeta({
    title: `Contato | ${PROFILE.shortName}`,
    description: `Entre em contato com ${PROFILE.name} para oportunidades, projetos e colaborações.`,
    canonical: `${PROFILE.siteUrl}/contatos`,
  })

  const updateField = (name: ContactFormField, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateForm(form)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return

    setStatus('loading')
    setMessage('')

    try {
      await sendContactForm(sanitizeFormData(form))
      setStatus('success')
      setMessage('Mensagem enviada com sucesso. Retornarei em breve.')
      setForm(INITIAL_FORM)
      setErrors({})
    } catch {
      setStatus('error')
      setMessage('Não foi possível enviar agora. Tente novamente ou use o e-mail direto.')
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <span className="badge">Contato profissional</span>
        <h1>Contatos</h1>
        <p className="hero__lead">
          Oportunidades, projetos, consultorias e colaborações open source.
        </p>
      </header>

      <div className="contact-grid">
        <section className="card">
          <h2>Enviar mensagem</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-stack">
              <div className="form-field">
                <label htmlFor="name">Nome *</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name ? (
                  <p id="name-error" className="form-field__error">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="form-field__error">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="form-field">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {CATEGORIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  required
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message ? (
                  <p id="message-error" className="form-field__error">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <button className="btn" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            {message ? (
              <p
                className={`form-status form-status--${status === 'success' ? 'success' : 'error'}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            ) : null}
          </form>
        </section>

        <aside className="card">
          <h2>Canais diretos</h2>
          <ul className="info-list">
            {CONTACT_INFO.map((item) => (
              <li key={item.id}>
                <strong>{item.label}</strong>
                <br />
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
                <br />
                <small>{item.detail}</small>
              </li>
            ))}
          </ul>

          <h2 className="aside-heading">Redes</h2>
          <ul className="info-list">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Contatos
