import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  base: './',
  resolve: {
    alias: {
      "@": resolve("src"),
      "*": resolve(""),
      "~": resolve("packages"),
    },
  },
  build: {
    outDir: "storybook-build-view",
    assetsDir: "static",
  },
  
  devtool: "source-map",
})
