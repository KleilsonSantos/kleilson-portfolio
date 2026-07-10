/**
 * Avatar 1:1 full-bleed com headroom (padding superior) + upscale em 2 passos.
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
const meta = await sharp(src).metadata()
const w = meta.width ?? 268
const h = meta.height ?? 360
const padTop = Math.round(h * 0.28)
const padSide = Math.round(w * 0.08)

const padded = await sharp(src)
  .extend({
    top: padTop,
    bottom: Math.round(h * 0.06),
    left: padSide,
    right: padSide,
    background: { r: 255, g: 255, b: 255 },
  })
  .toBuffer()

const mid = await sharp(padded)
  .resize(560, 560, { fit: 'cover', position: 'north', kernel: sharp.kernel.lanczos3 })
  .toBuffer()

const pipeline = () =>
  sharp(mid)
    .resize(800, 800, { fit: 'cover', position: 'north', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.85, m1: 0.65, m2: 0.25 })
    .modulate({ brightness: 1.01, saturation: 1.05 })

await pipeline().webp({ quality: 90, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline()
  .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320, { kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.55 })
  .webp({ quality: 88 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, padTop, padSide })
