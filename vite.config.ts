import { defineConfig } from "vite";

export default defineConfig({
  base: "/fixing-vertec-with-ai/",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  preview: {
    host: "127.0.0.1",
    port: 5187,
    strictPort: true,
  },
});
