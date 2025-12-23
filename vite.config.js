import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['payload/shared'],
    },
  },
  optimizeDeps: {
    exclude: ['@payloadcms/live-preview'],
  },
})
