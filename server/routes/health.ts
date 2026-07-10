import type { FastifyPluginAsync } from 'fastify'
import { usingDatabase } from '../store/index'

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => ({
    status: 'ok',
    service: 'kleilson-portfolio-api',
    storage: usingDatabase() ? 'postgres' : 'memory',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
}
