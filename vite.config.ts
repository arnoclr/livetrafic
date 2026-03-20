import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/prim": {
        target: "https://prim.iledefrance-mobilites.fr", // Remplace par l'URL de base de ton API
        changeOrigin: true,
        rewrite: function (path) {
          return path.replace(/^\/prim/, "");
        },
      },
    },
  },
});
