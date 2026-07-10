/** @vitest-environment node */
import { afterEach, describe, expect, it } from 'vitest'
import { buildApp } from './app'
import { clearContacts } from './store/memory'

describe('Fastify API', () => {
  afterEach(() => {
    clearContacts()
  })

  it('GET /health retorna ok', async () => {
    const app = await buildApp()
    const response = await app.inject({ method: 'GET', url: '/health' })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toMatchObject({ status: 'ok', service: 'kleilson-portfolio-api' })
    await app.close()
  })

  it('POST /api/contact aceita payload válido', async () => {
    const app = await buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: {
        name: 'Kleilson',
        email: 'dev@example.com',
        category: 'oportunidade',
        message: 'Olá, gostaria de conversar sobre um projeto.',
      },
    })
    expect(response.statusCode).toBe(200)
    const body = response.json() as { success: boolean; id: string }
    expect(body.success).toBe(true)
    expect(body.id).toBeTruthy()
    await app.close()
  })

  it('POST /api/contact rejeita e-mail inválido', async () => {
    const app = await buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: {
        name: 'Kleilson',
        email: 'invalido',
        message: 'Mensagem com tamanho suficiente.',
      },
    })
    expect(response.statusCode).toBe(400)
    await app.close()
  })

  it('POST /api/contact rejeita body incompleto (schema)', async () => {
    const app = await buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: { name: 'A' },
    })
    expect(response.statusCode).toBe(400)
    await app.close()
  })
})
