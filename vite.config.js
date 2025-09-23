import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { parse } from 'yaml'

// Custom plugin to handle YAML files
const yamlPlugin = () => {
  return {
    name: 'yaml',
    transform(code, id) {
      if (id.endsWith('.yaml') || id.endsWith('.yml')) {
        const yamlContent = parse(code)
        return `export default ${JSON.stringify(yamlContent)}`
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), yamlPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000
  }
})