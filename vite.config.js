import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// https://vitest.dev/guide/reporters.html
// TODO : .env
export default defineConfig({  
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }, 
      devOptions: {
        enabled: true
      },
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: false,
  },
})
