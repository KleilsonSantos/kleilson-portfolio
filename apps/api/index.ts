import { config } from 'dotenv'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..')
config({ path: resolve(repoRoot, '.env') })

const { buildApp } = await import('./app')
const { usingDatabase } = await import('./store/index')

const port = Number(process.env.PORT ?? 8787)
const host = process.env.HOST ?? '127.0.0.1'

const app = await buildApp()

try {
  await app.listen({ port, host })
  app.log.info({ storage: usingDatabase() ? 'postgres' : 'memory' }, 'API listening')
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
