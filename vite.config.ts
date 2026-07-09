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

function contactApiMock(): Plugin {
  return {
    name: 'contact-api-mock',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/contact', contactHandler)
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use('/api/contact', contactHandler)
    },
  }
}

export default defineConfig({
  plugins: [react(), contactApiMock()],
})
