// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
//
// Cloudflare plugin is intentionally disabled (`cloudflare: false`) so the build produces
// a standard Node-compatible SSR bundle at dist/server/server.js. Deployment target: Vercel
// (see vercel.json + api/server.mjs). The Cloudflare plugin only activates at build time,
// so the Lovable dev preview is unaffected.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
});
