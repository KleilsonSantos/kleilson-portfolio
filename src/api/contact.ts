import type { ContactApiError, ContactApiResponse, ContactForm } from '../types'

function contactEndpoint(): string {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '')
  return base ? `${base}/api/contact` : '/api/contact'
}

export async function sendContactForm(data: ContactForm): Promise<ContactApiResponse> {
  const response = await fetch(contactEndpoint(), {
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
