import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({

  base: '/apple8081/',  // ✅ 关键点：部署路径

  plugins: [
    vue(),
    vueDevTools(),
  ],

  server: {
    proxy: {
      '/apple8081-api': {
        target: 'http://localhost', // 你的后端地址（或容器地址）
        changeOrigin: true,
        ws: true, // ✅ 开启 WebSocket 代理
        rewrite: path => path.replace(/^\/apple8081-api/, '')
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
