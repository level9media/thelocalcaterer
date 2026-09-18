import { describe, expect, it } from "vitest";
import { absoluteCanonical, getRouteMeta, INDEXABLE_ROUTES } from "../shared/seoRoutes";
import { buildSitemapXml } from "./sitemap";

describe("SEO route registry", () => {
  it("provides a unique title, description, and self-canonical URL for each indexable route", () => {
    const paths = INDEXABLE_ROUTES.map((route) => route.path);
    const titles = INDEXABLE_ROUTES.map((route) => route.title);

    expect(new Set(paths).size).toBe(paths.length);
    expect(new Set(titles).size).toBe(titles.length);

    INDEXABLE_ROUTES.forEach((route) => {
      const meta = getRouteMeta(route.path);
      expect(meta?.title).toBe(route.title);
      expect(meta?.description.length).toBeGreaterThan(50);
      expect(absoluteCanonical(route.path)).toBe(`https://www.thelocalcaterer.com${route.path === "/" ? "/" : route.path}`);
    });
  });

  it("emits every indexable route in sitemap.xml and excludes noindex utility paths", () => {
    const xml = buildSitemapXml();

    INDEXABLE_ROUTES.forEach((route) => {
      expect(xml).toContain(`<loc>${absoluteCanonical(route.path)}</loc>`);
    });

    expect(xml).not.toContain("/school-lunch");
    expect(xml).not.toContain("/admin/lunch-orders");
    expect(xml).not.toContain("/contact/thanks");
  });
});
