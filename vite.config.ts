import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react-swc";
import { BuildSettings } from "./devtools/dev-server";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: BuildSettings.aliases,
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: BuildSettings.PRODUCTION,
    minify: "terser",
    target: "es2015",
    outDir: "build",
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      entry: BuildSettings.alias("Root/index.tsx"),
      template: "public/index.html",
    }),
  ],
});
