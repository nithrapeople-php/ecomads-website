import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        services: resolve(root, 'services.html'),
        approach: resolve(root, 'approach.html'),
        contact: resolve(root, 'contact.html'),
        seo: resolve(root, 'services/seo.html'),
        geo: resolve(root, 'services/geo.html'),
        paidAds: resolve(root, 'services/paid-ads.html'),
        googleBusiness: resolve(root, 'services/google-business.html'),
        vibeCoding: resolve(root, 'services/vibe-coding.html'),
      },
    },
  },
})
