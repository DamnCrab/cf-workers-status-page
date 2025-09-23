import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@rollup/plugin-yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cf-workers-status-page.enormouscrab.workers.dev',
        changeOrigin: true,
        secure: true
      }
    }
  }
})