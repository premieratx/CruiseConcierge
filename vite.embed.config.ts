import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react()
    // No development plugins - this is for production embeds only
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/embed"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client", "embed.html")
      },
      output: {
        entryFileNames: "embed.js",
        chunkFileNames: "embed-[name].js",
        assetFileNames: "embed-[name].[ext]"
      }
    },
    // Optimize for embed usage
    minify: true,
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: 8192, // Inline small assets to reduce requests
  },
  define: {
    // Ensure production mode
    'process.env.NODE_ENV': '"production"'
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});