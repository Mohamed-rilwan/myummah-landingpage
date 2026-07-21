import QRCode from 'qrcode'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public')
const url = 'https://myummah.co.uk/#connect'

await mkdir(outDir, { recursive: true })
await QRCode.toFile(path.join(outDir, 'qr-register.png'), url, {
  width: 720,
  margin: 2,
  color: { dark: '#0a2240', light: '#ffffff' },
})

const svg = await QRCode.toString(url, {
  type: 'svg',
  width: 720,
  margin: 2,
  color: { dark: '#0a2240', light: '#ffffff' },
})
await writeFile(path.join(outDir, 'qr-register.svg'), svg, 'utf8')

console.log('Generated public/qr-register.png and public/qr-register.svg')
console.log('Poster page: public/mosque-invite.html')
