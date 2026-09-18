import { useEffect } from "react";
import { useLocation } from "wouter";
import { absoluteCanonical, getRouteMeta, SITE_NAME } from "@shared/seoRoutes";

type HeadField = {
  selector: string;
  tag: "meta" | "link";
  attributes: Record<string, string>;
};

function upsertHeadField(field: HeadField) {
  let element = document.head.querySelector<HTMLElement>(field.selector);
  if (!element) {
    element = document.createElement(field.tag);
    document.head.appendChild(element);
  }

  Object.entries(field.attributes).forEach(([name, value]) => element?.setAttribute(name, value));
}

export default function RouteHead() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location);
    const fallback = {
      path: "/404",
      title: `Page Not Found | ${SITE_NAME}`,
      description: "The page you requested could not be found. Explore The Local Caterer's catering services in Mesa, Arizona.",
      noindex: true,
    };
    const page = meta ?? fallback;
    const canonical = absoluteCanonical(page.path);
    const robots = page.noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    document.title = page.title;

    const fields: HeadField[] = [
      { selector: 'meta[name="description"]', tag: "meta", attributes: { name: "description", content: page.description } },
      { selector: 'meta[name="robots"]', tag: "meta", attributes: { name: "robots", content: robots } },
      { selector: 'link[rel="canonical"]', tag: "link", attributes: { rel: "canonical", href: canonical } },
      { selector: 'meta[property="og:title"]', tag: "meta", attributes: { property: "og:title", content: page.title } },
      { selector: 'meta[property="og:description"]', tag: "meta", attributes: { property: "og:description", content: page.description } },
      { selector: 'meta[property="og:url"]', tag: "meta", attributes: { property: "og:url", content: canonical } },
      { selector: 'meta[name="twitter:title"]', tag: "meta", attributes: { name: "twitter:title", content: page.title } },
      { selector: 'meta[name="twitter:description"]', tag: "meta", attributes: { name: "twitter:description", content: page.description } },
    ];

    fields.forEach(upsertHeadField);
  }, [location]);

  return null;
}
