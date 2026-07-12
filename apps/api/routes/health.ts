import type { FastifyPluginAsync } from 'fastify'
import { usingDatabase } from '../store/index'
import { buildHealthPayload, checkDatabaseReady } from '../observability/health'

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async (request, reply) => {
    const database = await checkDatabaseReady()
    const payload = buildHealthPayload({
      database,
      runtime: 'node-fastify',
      storage: usingDatabase() ? 'postgres' : 'memory',
      uptime: process.uptime(),
      requestId: request.id,
    })
    const code = payload.readiness === 'unavailable' ? 503 : 200
    return reply.code(code).send(payload)
  })
}
