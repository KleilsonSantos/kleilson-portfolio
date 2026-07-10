/**
 * Gera assets de perfil 1:1 a partir da captura retangular (sem máscara circular).
 * Uso: npm run optimize:photo
 * Não versionar capturas cruas — só public/images/profile/*
 */
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'public/images/profile')
mkdirSync(outDir, { recursive: true })

/** Preferir retangular limpa; circular só como fallback. */
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
const side = Math.min(w, h)
const left = Math.round((w - side) / 2)
/** Leve bias para baixo do topo: preserva cabeça no círculo CSS */
const top = Math.max(0, Math.round((h - side) * 0.12))

const pipeline = () =>
  sharp(src)
    .extract({ left, top, width: side, height: side })
    .resize(800, 800, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 0.5 })
    .modulate({ brightness: 0.98, saturation: 1.05 })

await pipeline().webp({ quality: 88, effort: 6 }).toFile(join(outDir, 'kleilson-avatar.webp'))
await pipeline().jpeg({ quality: 90, mozjpeg: true }).toFile(join(outDir, 'kleilson-avatar.jpg'))
await sharp(join(outDir, 'kleilson-avatar.webp'))
  .resize(320, 320)
  .webp({ quality: 86 })
  .toFile(join(outDir, 'kleilson-avatar-320.webp'))

console.log('OK', { src: srcName, crop: { left, top, side }, out: outDir })
