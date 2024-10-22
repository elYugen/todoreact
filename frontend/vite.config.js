import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    
    // Rendre l'application PWA (Progressive Web App),
    // celle-ci pourra être installé en tant qu'application sur un mobile
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'ToDo List',
        short_name: 'App',
        description: 'Projet ToDo List en groupe',
        theme_color: '#ffffff',
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
          }
        ]
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
