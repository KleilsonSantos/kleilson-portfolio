import type { ContactApiError, ContactApiResponse, ContactForm } from '../types'

export async function sendContactForm(data: ContactForm): Promise<ContactApiResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as ContactApiError
    throw new Error(error.message || 'Não foi possível enviar sua mensagem.')
  }

  return response.json() as Promise<ContactApiResponse>
}
