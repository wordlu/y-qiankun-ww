import { defineConfig } from 'vite';
import { resolve } from "path";
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "~",
        replacement: resolve(__dirname, "./")
      },
      {
        find: "@",
        replacement: resolve(__dirname, "./src")
      },
      {
        find: "assets",
        replacement: resolve(__dirname, "./src/assets")
      },
      {
        find: "@services",
        replacement: resolve(__dirname, "../weiwai-service/src/services")
      },
      {
        find: "@weiwai/weiwai-service",
        replacement: resolve(__dirname, "../weiwai-service/src")
      }
    ],
    extensions: [".ts", ".js", ".jsx", ".tsx"]
  },
  plugins: [
    createVuePlugin({
      include: /(\.md|\.vue)$/,
      jsx: true,
    }),
  ],
});
