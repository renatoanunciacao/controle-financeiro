import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/finances/',
  build: {
    outDir: 'dist/finances',
  },
  plugins: [react()],
})
