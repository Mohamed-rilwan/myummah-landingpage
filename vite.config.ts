import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so assets resolve on GitHub project Pages and locally.
export default defineConfig({
  plugins: [react()],
  base: './',
})
