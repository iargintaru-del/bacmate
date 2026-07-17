/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/bacmate/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "BacMate — Pregătire Bacalaureat M2",
        short_name: "BacMate",
        description: "Exersează matematică pentru Bacalaureat M2, pe capitole sau examen simulat.",
        lang: "ro",
        start_url: "/bacmate/",
        scope: "/bacmate/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2f5fda",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
