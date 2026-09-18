import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import superjson from "superjson";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { buildSeoHead, getPageMeta, type PageMeta } from "../seoMeta";

function composeHtml(template: string, appHtml: string, meta: PageMeta, dehydratedState: unknown) {
  const serializedState = JSON.stringify(superjson.serialize(dehydratedState)).replace(/</g, "\\u003c");
  return template
    .replace("</body>", () => `<script>window.__RQ_STATE__ = ${serializedState}</script></body>`)
    .replace("<!--app-head-->", () => buildSeoHead(meta))
    .replace("<!--app-html-->", () => appHtml);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    const meta = getPageMeta(url);

    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/entry-client.tsx"`,
        `src="/src/entry-client.tsx?v=${nanoid()}"`
      );
      template = await vite.transformIndexHtml(url, template);
      template = template.replace(
        "</head>",
        `<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>`
      );

      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, dehydratedState } = render(url);
      res
        .status(meta.notFound ? 404 : 200)
        .set("Cache-Control", "no-cache")
        .type("html")
        .end(composeHtml(template, html, meta, dehydratedState));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error("[SSR] Development render failed:", error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }

  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    const hasTrailingSlash = req.path.endsWith("/");
    if (req.path !== "/" && hasTrailingSlash) {
      const query = req.originalUrl.slice(req.path.length);
      const target = (req.path.replace(/\/+$/, "") || "/").replace(/^\/\/+/, "/");
      return res.redirect(301, target + query);
    }
    next();
  });

  app.use(express.static(distPath, { index: false, redirect: false }));

  const templatePath = path.resolve(distPath, "index.html");
  const serverEntryPath = path.resolve(import.meta.dirname, "server-ssr", "entry-server.js");

  app.use("*", async (req, res) => {
    const meta = getPageMeta(req.originalUrl);
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const { render } = await import(serverEntryPath);
      const { html, dehydratedState } = render(req.originalUrl);
      res
        .status(meta.notFound ? 404 : 200)
        .set("Cache-Control", "no-cache")
        .type("html")
        .end(composeHtml(template, html, meta, dehydratedState));
    } catch (error) {
      console.error("[SSR] Production render failed, serving hydration shell:", error);
      const template = await fs.promises.readFile(templatePath, "utf-8");
      res
        .status(meta.notFound ? 404 : 200)
        .set("Cache-Control", "no-cache")
        .type("html")
        .end(composeHtml(template, "", meta, { queries: [], mutations: [] }));
    }
  });
}
