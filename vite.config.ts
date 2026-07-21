import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages URL: https://mohamed-rilwan.github.io/myummah-landingpage/
const base =
  process.env.GITHUB_PAGES === 'true' ? '/myummah-landingpage/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
