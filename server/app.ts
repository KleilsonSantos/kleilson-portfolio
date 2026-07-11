import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { randomUUID } from 'node:crypto'
import { healthRoutes } from './routes/health'
import { contactRoutes } from './routes/contact'
import { initServerSentry, captureServerException } from './observability/sentry'

export async function buildApp() {
  initServerSentry()

  const app = Fastify({
    logger:
      process.env.NODE_ENV === 'test'
        ? false
        : {
            level: process.env.LOG_LEVEL ?? 'info',
          },
    genReqId: (req) => {
      const incoming = req.headers['x-request-id']
      if (typeof incoming === 'string' && incoming.trim()) return incoming.trim()
      return randomUUID()
    },
    requestIdHeader: 'x-request-id',
  })

  app.addHook('onRequest', async (request, reply) => {
    reply.header('x-request-id', request.id)
  })

  app.setErrorHandler((error, request, reply) => {
    captureServerException(error)
    request.log.error({ err: error, requestId: request.id }, 'unhandled error')
    const status = (error as { statusCode?: number }).statusCode ?? 500
    reply.code(status).send({
      message: status >= 500 ? 'Erro interno.' : (error as Error).message,
      requestId: request.id,
    })
  })

  await app.register(helmet)
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
  })
  await app.register(rateLimit, {
    max: Number(process.env.RATE_LIMIT_MAX ?? 30),
    timeWindow: process.env.RATE_LIMIT_WINDOW ?? '1 minute',
  })

  await app.register(healthRoutes)
  await app.register(contactRoutes)

  return app
}
