import type { FastifyPluginAsync } from 'fastify'

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => ({
    status: 'ok',
    service: 'kleilson-portfolio-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
}
