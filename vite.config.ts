import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill Node.js globals
      buffer: "buffer",
      process: "process/browser",
    },
  },
  define: {
    global: "window", // Define `global` as `window` for browser
  },
});
