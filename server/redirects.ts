/**
 * 301 Redirect Middleware — SEO Migration Protection
 * Maps all legacy Wix URLs to their new canonical equivalents.
 * Every redirect is permanent (301) to transfer full link equity.
 *
 * CRITICAL: Do NOT remove or change these without updating the sitemap
 * and verifying no indexed URLs are orphaned.
 */
import { Request, Response, NextFunction } from "express";

// Map of old URL paths → new URL paths
// All redirects are 301 (permanent) to pass full SEO equity
const REDIRECT_MAP: Record<string, string> = {
  // ── Legacy Wix page slugs ──────────────────────────────────────────────
  "/general-5": "/services",
  "/modernmoments": "/wedding-catering-mesa-az",
  "/copy-of-modern-moments": "/wedding-catering-mesa-az",
  "/modern-moments": "/wedding-catering-mesa-az",
  "/wedding": "/wedding-catering-mesa-az",
  "/weddings": "/wedding-catering-mesa-az",
  "/wedding-catering": "/wedding-catering-mesa-az",
  "/corporate": "/corporate-event-catering",
  "/corporate-catering": "/corporate-event-catering",
  "/corporate-events": "/corporate-event-catering",
  "/private-events": "/private-event-catering",
  "/private-party": "/private-party-catering",
  "/bbq": "/barbecue-catering",
  "/bbq-catering": "/barbecue-catering",
  "/baby-shower": "/baby-shower-catering",
  "/celebration-of-life": "/celebration-of-life-catering",
  "/memorial": "/celebration-of-life-catering",

  // ── Wix location page variants ─────────────────────────────────────────
  "/mesa": "/catering-mesa-az",
  "/mesa-az": "/catering-mesa-az",
  "/phoenix": "/catering-phoenix-az",
  "/phoenix-az": "/catering-phoenix-az",
  "/scottsdale": "/catering-scottsdale-az",
  "/scottsdale-az": "/catering-scottsdale-az",
  "/chandler": "/catering-chandler-az",
  "/chandler-az": "/catering-chandler-az",
  "/gilbert": "/catering-gilbert-az",
  "/gilbert-az": "/catering-gilbert-az",

  // ── Menu page variants ─────────────────────────────────────────────────
  "/menu": "/catering-menu",
  "/menus": "/catering-menu",
  "/our-menu": "/catering-menu",
  "/food-menu": "/catering-menu",
  "/mexican-menu": "/mexican-catering-menu",
  "/italian-menu": "/italian-catering-menu",
  "/lunch-menu": "/lunch-catering-menu",
  "/breakfast-menu": "/breakfast-catering-menu",
  "/asian-menu": "/asian-catering-menu",
  "/desserts": "/dessert-menu",
  "/holiday-menu": "/holiday-menu-2025",
  "/sandwich-bar": "/sandwich-bar-mesa-az",

  // ── About / Contact variants ───────────────────────────────────────────
  "/about-us": "/about",
  "/our-story": "/about",
  "/team": "/about",
  "/chef": "/about",
  "/chef-josh": "/about",
  "/contact-us": "/contact",
  "/get-a-quote": "/contact",
  "/request-quote": "/contact",
  "/quote": "/contact",
  "/book": "/contact",
  "/booking": "/contact",
  "/inquiry": "/contact",

  // ── Gallery / Press variants ───────────────────────────────────────────
  "/photos": "/gallery",
  "/portfolio": "/gallery",
  "/events": "/gallery",
  "/media": "/press",
  "/news": "/press",
  "/featured": "/press",

  // ── Blog variants ──────────────────────────────────────────────────────
  "/blogs": "/blog",
  "/articles": "/blog",
  "/posts": "/blog",

  // ── Legacy Wix blog post slugs → new /post/ structure ─────────────────
  "/post/wedding-catering-east-valley-mesa-chandler-gilbert": "/post/wedding-catering-east-valley-mesa-chandler-gilbert",
  "/post/affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek": "/post/affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek",
  "/post/the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer": "/post/the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer",
  "/post/the-best-catering-companies-in-mesa-az-for-any-event": "/post/the-best-catering-companies-in-mesa-az-for-any-event",
  "/post/the-best-catering-companies-in-mesa-az": "/post/the-best-catering-companies-in-mesa-az",
  "/post/top-catering-companies-in-mesa-az-your-guide-to-the-best-local-caterers": "/post/top-catering-companies-in-mesa-az-your-guide-to-the-best-local-caterers",
  "/post/catering-mesa-az-the-local-caterers-guide-to-unforgettable-events": "/post/catering-mesa-az-the-local-caterers-guide-to-unforgettable-events",
  "/post/catering-in-mesa-az-everything-you-need-to-know": "/post/catering-in-mesa-az-everything-you-need-to-know",
  "/post/best-catering-companies-in-gilbert-az": "/post/best-catering-companies-in-gilbert-az",
  "/post/catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers": "/post/catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers",
  "/post/catering-companies-in-scottsdale-az-your-guide-to-the-best-local-caterers": "/post/catering-companies-in-scottsdale-az-your-guide-to-the-best-local-caterers",
  "/post/catering-companies-in-phoenix-az-your-guide-to-the-best-local-caterers": "/post/catering-companies-in-phoenix-az-your-guide-to-the-best-local-caterers",
  "/post/beautiful-catering-board-mesa-az": "/post/beautiful-catering-board-mesa-az",
  "/post/ultimate-guide-to-selecting-the-best-catering-in-mesa-az-for-your-events": "/post/ultimate-guide-to-selecting-the-best-catering-in-mesa-az-for-your-events",
  "/post/planning-corporate-events-for-2026-here-s-why-early-booking-matters": "/post/planning-corporate-events-for-2026-here-s-why-early-booking-matters",
  "/post/why-summer-2026-weddings-are-booking-earlier-than-ever": "/post/why-summer-2026-weddings-are-booking-earlier-than-ever",
  "/post/alex-special-buttermilk-pancakes": "/post/alex-special-buttermilk-pancakes",

  // ── Wix-style blog paths (without /post/ prefix) ──────────────────────
  "/blog/wedding-catering-east-valley-mesa-chandler-gilbert": "/post/wedding-catering-east-valley-mesa-chandler-gilbert",
  "/blog/affordable-catering-near-me": "/post/affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek",
  "/blog/best-catering-services-mesa-az": "/post/the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer",
  "/blog/best-catering-companies-mesa-az": "/post/the-best-catering-companies-in-mesa-az",
  "/blog/catering-mesa-az": "/post/catering-mesa-az-the-local-caterers-guide-to-unforgettable-events",
  "/blog/catering-in-mesa-az": "/post/catering-in-mesa-az-everything-you-need-to-know",
  "/blog/catering-companies-gilbert-az": "/post/best-catering-companies-in-gilbert-az",
  "/blog/catering-companies-chandler-az": "/post/catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers",
  "/blog/catering-companies-scottsdale-az": "/post/catering-companies-in-scottsdale-az-your-guide-to-the-best-local-caterers",
  "/blog/catering-companies-phoenix-az": "/post/catering-companies-in-phoenix-az-your-guide-to-the-best-local-caterers",

  // ── Wix URL patterns with query strings (handled separately) ──────────
  // These are handled by the regex logic below

  // ── Trailing slash normalization ───────────────────────────────────────
  // Handled by the middleware logic below
};

// Regex-based redirects for dynamic patterns
const REGEX_REDIRECTS: Array<{ pattern: RegExp; destination: string | ((match: RegExpMatchArray) => string) }> = [
  // Wix blog URLs: /blog/post/slug → /post/slug
  {
    pattern: /^\/blog\/post\/(.+)$/,
    destination: (match) => `/post/${match[1]}`,
  },
  // Wix category URLs: /blog/category/slug → /blog
  {
    pattern: /^\/blog\/category\/(.+)$/,
    destination: "/blog",
  },
  // Wix tag URLs: /blog/tag/slug → /blog
  {
    pattern: /^\/blog\/tag\/(.+)$/,
    destination: "/blog",
  },
  // Remove trailing slashes (except root)
  {
    pattern: /^(.+)\/$/,
    destination: (match) => match[1],
  },
];

export function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path.toLowerCase();

  // Check exact match redirects first
  if (REDIRECT_MAP[path]) {
    const destination = REDIRECT_MAP[path];
    // Only redirect if it's actually a different URL (avoid infinite loops)
    if (destination !== path) {
      return res.redirect(301, destination);
    }
  }

  // Check regex-based redirects
  for (const rule of REGEX_REDIRECTS) {
    const match = path.match(rule.pattern);
    if (match) {
      const destination = typeof rule.destination === "function"
        ? rule.destination(match)
        : rule.destination;
      if (destination !== path) {
        return res.redirect(301, destination);
      }
    }
  }

  next();
}
