import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(',').map((h) => h.trim())
    : [];
  
  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
    ],
    server: {
      allowedHosts: [
        ...allowedHosts
      ]
    }
  }
})
