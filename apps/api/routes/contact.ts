import type { FastifyPluginAsync } from 'fastify'
import {
  contactBodySchema,
  sanitizeContactText,
  validateContactPayload,
  type ContactPayload,
} from '@kleilson/shared'
import { saveContact } from '../store/index'

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
        name: sanitizeContactText(request.body.name),
        email: sanitizeContactText(request.body.email),
        category: request.body.category ? sanitizeContactText(request.body.category) : '',
        message: sanitizeContactText(request.body.message),
      }

      const validationError = validateContactPayload(body)
      if (validationError) {
        return reply.code(400).send({ message: validationError })
      }

      const saved = await saveContact(body)
      // BP-008: só contactId + requestId — sem e-mail/mensagem
      request.log.info({ contactId: saved.id, requestId: request.id }, 'contact message accepted')
      return { success: true, id: saved.id, requestId: request.id }
    },
  )
}
