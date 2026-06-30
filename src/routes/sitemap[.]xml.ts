import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://ada-auto-forge.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          // ADA
          { path: "/ada", changefreq: "weekly", priority: "0.9" },
          { path: "/ada/services", changefreq: "monthly", priority: "0.8" },
          { path: "/ada/a-propos", changefreq: "monthly", priority: "0.6" },
          { path: "/ada/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/ada/reservation", changefreq: "monthly", priority: "0.8" },
          // IPB
          { path: "/ipb", changefreq: "weekly", priority: "0.9" },
          { path: "/ipb/services", changefreq: "monthly", priority: "0.8" },
          { path: "/ipb/a-propos", changefreq: "monthly", priority: "0.6" },
          { path: "/ipb/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/ipb/rendez-vous", changefreq: "monthly", priority: "0.8" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
