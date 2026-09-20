import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is a static index.html shell (Hero, Capabilities, About, etc.) with a
// React app mounted only for the Projects feature. SPA fallback lets React Router
// serve /projects/:id on direct load and refresh.
export default defineConfig({
  plugins: [react()],
})
