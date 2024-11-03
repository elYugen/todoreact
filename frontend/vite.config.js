import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'apple-touch-icon.png',
        'logo.png',
      ],
      manifest: {
        name: 'ToDo List',
        short_name: 'App',
        description: 'Projet ToDo List en groupe',
        theme_color: '#ffffff',
        background_color: '#ffffff', 
        icons: [
          {
            src: 'favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'logo.png',
            sizes: '1024x1024', 
            type: 'image/png',
            purpose: 'any maskable' 
          }
        ],
        splash_pages: null
      }
    })
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
})