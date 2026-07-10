/**
 * Gera assets de perfil otimizados a partir de capturas na raiz (dev only).
 * Uso: node --experimental-strip-types scripts/optimize-profile-photo.mjs
 * Não versionar as capturas originais — só public/images/profile/*
 */
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'public/images/profile')
mkdirSync(outDir, { recursive: true })

const candidates = [
  'Captura de Tela 2026-07-10 às 15.10.47.png',
  'Captura de Tela 2026-07-10 às 15.07.07.png',
]

const srcName = candidates.find((name) => existsSync(join(root, name)))
if (!srcName) {
  console.error('Nenhuma captura encontrada na raiz.')
  process.exit(1)
}

const src = join(root, srcName)
const meta = await sharp(src).metadata()
const cw = meta.width ?? 726
const ch = meta.height ?? 614
const side = Math.min(400, Math.min(cw, ch) - 40)
const left = Math.round((cw - side) / 2)
const top = Math.max(0, Math.round((ch - side) / 2) - 40)

const pipeline = () =>
  sharp(src)
    .extract({ left, top, width: side, height: side })
    .resize(800, 800, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 0.5 })
    .modulate({ brightness: 0.97, saturation: 1.08 })
    .normalize()

await pipeline().webp({ quality: 86, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline().jpeg({ quality: 90, mozjpeg: true }).toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320)
  .webp({ quality: 84 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, crop: { left, top, side }, out: outDir })
