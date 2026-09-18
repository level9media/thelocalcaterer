import fs from "node:fs/promises";
import path from "node:path";
import superjson from "superjson";
import { fileURLToPath } from "node:url";
import { INDEXABLE_ROUTES, NOINDEX_ROUTE_META } from "../shared/seoRoutes";
import { buildSeoHead, getPageMeta } from "../server/seoMeta";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(projectRoot, "dist", "public");
const template = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
const { render } = await import(path.join(projectRoot, "dist", "server-ssr", "entry-server.js"));

function renderDocument(route: string) {
  const { html, dehydratedState } = render(route);
  const meta = getPageMeta(route);
  const state = JSON.stringify(superjson.serialize(dehydratedState)).replace(/</g, "\\u003c");
  return template
    .replace("<!--app-head-->", () => buildSeoHead(meta))
    .replace("<!--app-html-->", () => html)
    .replace("</body>", () => `<script>window.__RQ_STATE__ = ${state}</script></body>`);
}

function writeRoute(pathname: string, document: string) {
  const target = pathname === "/"
    ? path.join(publicDir, "index.html")
    : path.join(publicDir, pathname.replace(/^\//, ""), "index.html");
  return fs.mkdir(path.dirname(target), { recursive: true }).then(() => fs.writeFile(target, document));
}

for (const route of INDEXABLE_ROUTES) {
  await writeRoute(route.path, renderDocument(route.path));
}

for (const pathname of Object.keys(NOINDEX_ROUTE_META)) {
  const meta = getPageMeta(pathname);
  const shell = template
    .replace("<!--app-head-->", () => buildSeoHead(meta))
    .replace("<!--app-html-->", "")
    .replace("</body>", () => `<script>window.__RQ_STATE__ = ${JSON.stringify(superjson.serialize({ queries: [], mutations: [] }))}</script></body>`);
  await writeRoute(pathname, shell);
}

console.log(`Prerendered ${INDEXABLE_ROUTES.length} indexable routes and ${Object.keys(NOINDEX_ROUTE_META).length} noindex app shells for Netlify.`);
