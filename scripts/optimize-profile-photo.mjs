/**
 * Avatar 1:1 full-bleed (fit: cover) — preenche o círculo sem letterbox.
 * Headroom: só via CSS object-position (não usar canvas com padding).
 * Uso (raiz): pnpm optimize:photo  (cwd = apps/web)
 */
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const webRoot = process.cwd()
const repoRoot = resolve(webRoot, '../..')
const outDir = join(webRoot, 'public/images/profile')
mkdirSync(outDir, { recursive: true })

const candidates = [
  'Captura de Tela 2026-07-10 às 15.07.07.png',
  'Captura de Tela 2026-07-10 às 15.10.47.png',
]

const srcName = candidates.find((name) => existsSync(join(repoRoot, name)))
if (!srcName) {
  console.error('Nenhuma captura encontrada na raiz do monorepo.')
  process.exit(1)
}

const src = join(repoRoot, srcName)

const pipeline = () =>
  sharp(src)
    .resize(800, 800, {
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 1.0, m1: 0.7, m2: 0.3 })
    .modulate({ brightness: 0.99, saturation: 1.04 })

await pipeline().webp({ quality: 90, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline()
  .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(join(outDir, 'kleilson-avatar.jpg'))

console.log('OK →', outDir)
