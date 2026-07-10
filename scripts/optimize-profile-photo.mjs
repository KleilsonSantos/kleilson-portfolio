/**
 * Gera avatar 1:1 centrado (canvas quadrado) a partir da captura retangular.
 * Uso: npm run optimize:photo
 * Não versionar capturas cruas — só public/images/profile/*
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

const sized = await sharp(src)
  .resize({ width: 700, height: 700, fit: 'inside', kernel: sharp.kernel.lanczos3 })
  .toBuffer({ resolveWithObject: true })

// Rosto na fonte pende à direita → offset óptico à esquerda
const left = Math.round((canvas - sized.info.width) / 2) - 36
const top = Math.round((canvas - sized.info.height) / 2) - 8

const pipeline = () =>
  sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 3,
      background: { r: 245, g: 247, b: 250 },
    },
  })
    .composite([{ input: sized.data, left: Math.max(0, left), top: Math.max(0, top) }])
    .sharpen({ sigma: 1.0 })

await pipeline().webp({ quality: 88, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline().jpeg({ quality: 90, mozjpeg: true }).toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320)
  .webp({ quality: 86 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, composite: { left, top, w: sized.info.width, h: sized.info.height } })
