import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Needed when accessing the dev server through a tunnel like ngrok
    // (ngrok uses a different Host header than localhost)
    // Allow ngrok free-tier domains (covers changing subdomains)
    allowedHosts: ['.ngrok-free.dev'],
    host: true,
    port: 5173,
    strictPort: true,
  },
})
