import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    proxy: {
      // 与 vercel.json 的 rewrite 保持一致，本地开发时代理力扣接口
      '/api/leetcode-submissions': {
        target: 'https://leetcode.cn',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/leetcode-submissions/,
            // 结尾斜杠：leetcode.cn 对无斜杠路径返回 301，会干扰本地代理
            '/api/user_submission_calendar/yin-tian-51/'
          ),
      },
    },
  },
})
