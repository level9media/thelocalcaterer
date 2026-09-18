import { absoluteCanonical, getRouteMeta, normalizeRoutePath, SITE_NAME } from "../shared/seoRoutes";

const DEFAULT_IMAGE = "https://www.thelocalcaterer.com/assets/media/hero_main_3ee61e07.webp";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
  notFound?: boolean;
}

const NOT_FOUND_META: PageMeta = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you requested could not be found. Visit The Local Caterer homepage to explore catering services in Mesa, Arizona.",
  canonical: absoluteCanonical("/404"),
  noindex: true,
  notFound: true,
};

export function getPageMeta(urlPath: string): PageMeta {
  const path = normalizeRoutePath(urlPath);
  const route = getRouteMeta(path);

  if (!route) return NOT_FOUND_META;

  return {
    title: route.title,
    description: route.description,
    canonical: absoluteCanonical(route.path),
    noindex: route.noindex,
  };
}

export function buildSeoHead(meta: PageMeta): string {
  const image = meta.ogImage ?? DEFAULT_IMAGE;
  const robots = meta.noindex
    ? "noindex, follow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const localBusinessSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "CateringService"],
    "@id": "https://www.thelocalcaterer.com/#business",
    name: SITE_NAME,
    url: "https://www.thelocalcaterer.com/",
    telephone: "(480) 718-1671",
    image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mesa",
      addressRegion: "AZ",
      postalCode: "85201",
      addressCountry: "US",
    },
    priceRange: "$$-$$$",
    servesCuisine: ["American", "Italian", "Mexican", "BBQ", "Mediterranean"],
    areaServed: ["Mesa, AZ", "Phoenix, AZ", "Scottsdale, AZ", "Chandler, AZ", "Gilbert, AZ"],
    sameAs: [
      "https://www.facebook.com/thelocalcatereraz",
      "https://www.instagram.com/thelocalcaterer",
      "https://www.yelp.com/biz/the-local-caterer-mesa",
      "https://www.weddingwire.com/biz/the-local-caterer/2ea3ce9f43a89862.html",
      "https://www.theknot.com/marketplace/the-local-caterer-mesa-az-2069298",
    ],
  });

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script type="application/ld+json">${localBusinessSchema.replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function injectSeoMeta(html: string, meta: PageMeta): string {
  const head = buildSeoHead(meta);
  if (html.includes("<!--app-head-->")) {
    return html.replace("<!--app-head-->", () => head);
  }

  return html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"[^>]*>/, () => `<meta name="description" content="${escapeHtml(meta.description)}" />`)
    .replace("</head>", () => `${head}\n  </head>`);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
