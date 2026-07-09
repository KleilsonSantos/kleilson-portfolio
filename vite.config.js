import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function contactApiMock() {
  return {
    name: 'contact-api-mock',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          try {
            const data = JSON.parse(body)

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
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), contactApiMock()],
})
