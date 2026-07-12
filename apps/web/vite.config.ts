/// <reference types="vitest/config" />
import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect } from 'vite'

interface ContactPayload {
  name?: string
  email?: string
  message?: string
}

function contactHandler(
  req: IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
) {
  if (req.method !== 'POST') {
    next()
    return
  }

  let body = ''

  req.on('data', (chunk: Buffer) => {
    body += chunk
  })

  req.on('end', () => {
    try {
      const data = JSON.parse(body) as ContactPayload

      if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ message: 'Campos obrigatórios ausentes.' }))
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, id: `mock-${Date.now()}` }))
    } catch {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ message: 'Payload inválido.' }))
    }
  })
}

/** Mock local para preview/E2E. Desative com API_PROXY=1 e `pnpm --filter @kleilson/api dev`. */
function contactApiMock(): Plugin {
  return {
    name: 'contact-api-mock',
    configureServer(server: ViteDevServer) {
      if (process.env.API_PROXY === '1') return
      server.middlewares.use('/api/contact', contactHandler)
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use('/api/contact', contactHandler)
    },
  }
}

const apiTarget = process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:8787'

export default defineConfig({
  plugins: [react(), contactApiMock()],
  server:
    process.env.API_PROXY === '1'
      ? {
          proxy: {
            '/api': apiTarget,
            '/health': apiTarget,
          },
        }
      : undefined,
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
    env: {
      NODE_ENV: 'test',
    },
  },
})
