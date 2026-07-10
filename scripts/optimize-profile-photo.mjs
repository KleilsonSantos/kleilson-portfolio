/**
 * Avatar 1:1 full-bleed (fit: cover) — preenche o círculo sem letterbox.
 * Headroom: só via CSS object-position (não usar canvas com padding).
 * Uso: npm run optimize:photo
 */
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'public/images/profile')
mkdirSync(outDir, { recursive: true })

const candidates = [
  'Captura de Tela 2026-07-10 às 15.07.07.png',
  'Captura de Tela 2026-07-10 às 15.10.47.png',
]

const srcName = candidates.find((name) => existsSync(join(root, name)))
if (!srcName) {
  console.error('Nenhuma captura encontrada na raiz.')
  process.exit(1)
}

const src = join(root, srcName)

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
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320, { kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.55 })
  .webp({ quality: 88 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, mode: 'cover centre 800x800' })
