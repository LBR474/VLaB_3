import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from "@tresjs/core";


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],  // or whatever libraries you're using
        },
      },
    },
  },

  base: "/VLaB_3/",
  
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
});
