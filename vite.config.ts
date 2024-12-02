import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  base: '/herosVSboss/', // 基礎路徑
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    hmr: {
      overlay: false, // 避免 HMR 的報錯彈窗覆蓋整個畫面
    },
  },
  cacheDir: '.vite-cache', // 為確保開發環境緩存更清晰，設定專屬目錄（可選）
});
