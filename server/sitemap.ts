import type { Express } from "express";
import { absoluteCanonical, INDEXABLE_ROUTES } from "../shared/seoRoutes";

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildSitemapXml(): string {
  const urls = INDEXABLE_ROUTES.map((route) => `  <url>
    <loc>${xmlEscape(absoluteCanonical(route.path))}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function registerSitemapRoute(app: Express) {
  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(buildSitemapXml());
  });
}
