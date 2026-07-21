/**
 * Overlay a real scannable QR (with logo) onto the designed invite poster.
 * Uses Jimp so it works on Node 18.
 */
import QRCode from 'qrcode'
import { Jimp } from 'jimp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')

const REGISTER_URL = 'https://myummah.co.uk/#connect'
const posterPath = path.join(publicDir, 'mosque-invite-poster.png')
const logoPath = path.join(publicDir, 'logo.png')
const qrOutPath = path.join(publicDir, 'qr-register.png')
const finalOutPath = path.join(publicDir, 'mosque-invite-final.png')

const poster = await Jimp.read(posterPath)
const { width, height } = poster.bitmap

// QR sits in the lower-center of the designed poster (approx. from visual layout)
const qrSize = Math.round(width * 0.36)
const qrX = Math.round((width - qrSize) / 2)
const qrY = Math.round(height * 0.545)

const qrBuffer = await QRCode.toBuffer(REGISTER_URL, {
  width: qrSize,
  margin: 1,
  errorCorrectionLevel: 'H',
  color: { dark: '#0a2240ff', light: '#ffffffff' },
})

const qr = await Jimp.read(qrBuffer)

// Center logo badge on QR (needs high error correction)
const logo = await Jimp.read(logoPath)
const badge = Math.round(qrSize * 0.22)
logo.cover({ w: badge, h: badge })

const pad = Math.round(badge * 0.16)
const badgeBg = new Jimp({
  width: badge + pad * 2,
  height: badge + pad * 2,
  color: 0xffffffff,
})
badgeBg.composite(logo, pad, pad)
qr.composite(
  badgeBg,
  Math.round((qrSize - badgeBg.bitmap.width) / 2),
  Math.round((qrSize - badgeBg.bitmap.height) / 2),
)

await qr.write(qrOutPath)

// Soft white plate behind QR to cover the old non-scannable code cleanly
const platePad = Math.round(qrSize * 0.06)
const plate = new Jimp({
  width: qrSize + platePad * 2,
  height: qrSize + platePad * 2,
  color: 0xffffffff,
})
poster.composite(plate, qrX - platePad, qrY - platePad)
poster.composite(qr, qrX, qrY)

await poster.write(finalOutPath)

console.log(`Poster ${width}x${height}`)
console.log(`QR placed at (${qrX}, ${qrY}) size ${qrSize}`)
console.log(`Wrote ${qrOutPath}`)
console.log(`Wrote ${finalOutPath}`)
