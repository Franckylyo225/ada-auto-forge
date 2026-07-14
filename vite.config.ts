import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "cloudflare-module",
    output: {
      dir: "dist",
      publicDir: "dist/client",
      serverDir: "dist/server",
    },
    cloudflare: {
      nodeCompat: true,
      deployConfig: false,
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
