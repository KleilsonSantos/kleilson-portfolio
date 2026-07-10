/**
 * Avatar 1:1 full-bleed (fit: cover) — o círculo é só CSS.
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
    .sharpen({ sigma: 1.1 })
    .modulate({ brightness: 0.98, saturation: 1.05 })

await pipeline().webp({ quality: 88, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline().jpeg({ quality: 90, mozjpeg: true }).toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320)
  .webp({ quality: 86 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, mode: 'cover 800x800' })
