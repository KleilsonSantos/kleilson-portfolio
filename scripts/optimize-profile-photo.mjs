/**
 * Avatar 1:1: retrato menor em canvas branco (headroom) + nitidez leve.
 * Fundo branco = mesmo studio → sem “quadro” no círculo CSS.
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
const canvas = 800

const portrait = await sharp(src)
  .resize({ height: 620, fit: 'inside', kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.9, m1: 0.7, m2: 0.3 })
  .modulate({ brightness: 1.01, saturation: 1.05 })
  .toBuffer({ resolveWithObject: true })

const left = Math.round((canvas - portrait.info.width) / 2) - 20
const top = 72

const pipeline = () =>
  sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  }).composite([{ input: portrait.data, left: Math.max(0, left), top }])

await pipeline().webp({ quality: 90, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline()
  .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320, { kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.5 })
  .webp({ quality: 88 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, left, top, portrait: portrait.info })
