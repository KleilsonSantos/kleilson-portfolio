import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { healthRoutes } from './routes/health'
import { contactRoutes } from './routes/contact'

export async function buildApp() {
  const app = Fastify({
    logger: process.env.NODE_ENV !== 'test',
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
