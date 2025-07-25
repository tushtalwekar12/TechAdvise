import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // or '/your-subdirectory/' if deployed in a folder
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})