import { defineConfig } from "vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue(),
  AutoImport({
    resolvers:[ElementPlusResolver()],
  }),
  Components({
    resolvers:[ElementPlusResolver()],
  })],


  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
    proxy:{
      '^/server':{
        target:'http://localhost:8083',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/server/,'')
      }
    }
  },
}));
