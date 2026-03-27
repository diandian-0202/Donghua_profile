import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: set to your GitHub repo name for GitHub Pages deployment
// e.g. if your repo is github.com/donghuazhang/portfolio → base: '/portfolio/'
export default defineConfig({
  plugins: [react()],
  base: '/Donghua_profile/',
})
