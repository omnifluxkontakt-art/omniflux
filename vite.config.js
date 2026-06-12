import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GH_PAGES=1 builds for GitHub Pages (served from /omniflux/);
// default build targets the root domain (omniflux.pl).
export default defineConfig({
  base: process.env.GH_PAGES ? '/omniflux/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['gsap', 'lenis'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
