import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (Layeser.github.io): served from the domain root, so base stays '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'none',
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
