import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://lunalexandra.github.io/router-crud/",
  plugins: [react()],
})