import type { FastifyPluginAsync } from 'fastify'
import {
  assertContactBusinessRules,
  contactBodySchema,
  type ContactPayload,
} from '../schemas/contact'
import { saveContact } from '../store/index'

function sanitize(value: string): string {
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

export const contactRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: ContactPayload }>(
    '/api/contact',
    {
      schema: {
        body: contactBodySchema,
        response: {
          200: {
            type: 'object',
            required: ['success', 'id'],
            properties: {
              success: { type: 'boolean' },
              id: { type: 'string' },
            },
          },
        },
      },
      config: {
        rateLimit: {
          max: Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5),
          timeWindow: process.env.CONTACT_RATE_LIMIT_WINDOW ?? '1 minute',
        },
      },
    },
    async (request, reply) => {
      const body: ContactPayload = {
        name: sanitize(request.body.name),
        email: sanitize(request.body.email),
        category: request.body.category ? sanitize(request.body.category) : '',
        message: sanitize(request.body.message),
      }

      const businessError = assertContactBusinessRules(body)
      if (businessError) {
        return reply.code(400).send({ message: businessError })
      }

      const saved = await saveContact(body)
      // BP-008: só contactId + requestId — sem e-mail/mensagem
      request.log.info({ contactId: saved.id, requestId: request.id }, 'contact message accepted')
      return { success: true, id: saved.id, requestId: request.id }
    },
  )
}
