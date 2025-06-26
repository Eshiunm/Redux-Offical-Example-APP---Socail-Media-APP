import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve('./src') }],
  },
  server: {
    open: true,
  },
  base: process.env.NODE_ENV === 'production' ? "/Redux-Offical-Example-APP_Social-Media-APP/" : "/"
})
