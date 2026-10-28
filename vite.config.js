import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogApiPlugin } from './plugins/blogApiPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), blogApiPlugin()],
})
