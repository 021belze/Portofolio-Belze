import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Increase warning threshold since three.js is inherently large
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Manual chunks: pisahkan vendor besar agar browser bisa cache terpisah
        manualChunks: (id) => {
          // Three.js ecosystem — pisah sendiri (heaviest chunk)
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor'
          }
          // Framer Motion — pisah sendiri (animation library)
          if (id.includes('framer-motion')) {
            return 'framer-vendor'
          }
          // Lenis smooth scroll
          if (id.includes('lenis')) {
            return 'lenis-vendor'
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'lucide-vendor'
          }
          // General node_modules vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
