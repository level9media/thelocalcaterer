import type { Plugin } from "vite";

const CDN_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr";
const LOCAL_BASE = "/assets/media";

export function localMediaPlugin(): Plugin {
  return {
    name: "the-local-caterer-local-media",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(?:[jt]sx?|html)$/.test(id) || !code.includes(CDN_BASE)) return null;
      return { code: code.split(CDN_BASE).join(LOCAL_BASE), map: null };
    },
    transformIndexHtml(html) {
      return html.includes(CDN_BASE) ? html.split(CDN_BASE).join(LOCAL_BASE) : html;
    },
  };
}
