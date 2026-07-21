import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute project base so public assets never resolve against /assets/*.js
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/myummah-landingpage/' : '/',
}))
