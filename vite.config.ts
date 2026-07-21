import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (myummah.co.uk) serves at site root — not /myummah-landingpage/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
