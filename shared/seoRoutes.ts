export const SITE_NAME = "The Local Caterer";
export const SITE_ORIGIN = "https://www.thelocalcaterer.com";

export type SiteSection =
  | "Company"
  | "Catering Services"
  | "Areas We Serve"
  | "Catering Menus"
  | "Planning Resources"
  | "Blog";

export type RouteMeta = {
  path: string;
  label: string;
  section: SiteSection;
  title: string;
  description: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  noindex?: boolean;
};

export type NoindexRouteMeta = Omit<RouteMeta, "section" | "label" | "priority" | "changefreq" | "noindex"> & {
  noindex: true;
};

const phone = "(480) 718-1671";

export const INDEXABLE_ROUTES: RouteMeta[] = [
  {
    path: "/",
    label: "Home",
    section: "Company",
    title: "The Local Caterer | Mesa, AZ Premier Catering",
    description: "Mesa, AZ catering for weddings, corporate events & private parties. Chef-crafted menus served across Mesa, Phoenix, Scottsdale, Chandler & Gilbert.",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/about",
    label: "About Us",
    section: "Company",
    title: "About The Local Caterer | Mesa, AZ Catering Company",
    description: "Meet the team behind Mesa's premier catering company. Chef Josh Bakken and Kasandra Bakken bring passion, creativity, and professionalism to every event.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/careers",
    label: "Careers",
    section: "Company",
    title: "Careers at The Local Caterer | Jobs in Mesa, AZ",
    description: "Join The Local Caterer team in Mesa, AZ. Explore Service Ambassador and Culinary Crew opportunities, then apply online today.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/services",
    label: "Catering Services",
    section: "Company",
    title: "Catering Services | Weddings, Corporate & Private Events — The Local Caterer",
    description: "Full-service catering for weddings, corporate events, private parties, baby showers, BBQ, and more across Mesa and the East Valley.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/contact",
    label: "Contact & Request a Quote",
    section: "Company",
    title: "Contact The Local Caterer | Get a Free Catering Quote in Mesa, AZ",
    description: "Ready to book? Contact The Local Caterer for a wedding, corporate event, or private party quote in Mesa, Phoenix, Scottsdale, Chandler, or Gilbert.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/gallery",
    label: "Catering Gallery",
    section: "Company",
    title: "Catering Gallery | The Local Caterer — Mesa, AZ Event Photos",
    description: "Browse real food presentations and event photos from weddings, corporate catering, and private parties across the East Valley.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/press",
    label: "Press & Media",
    section: "Company",
    title: "Press & Media | The Local Caterer — Mesa, AZ",
    description: "Explore press features, awards, and media coverage for The Local Caterer, a Mesa, Arizona catering company.",
    priority: 0.6,
    changefreq: "monthly",
  },
  {
    path: "/catering-menu",
    label: "Full Catering Menu",
    section: "Catering Menus",
    title: "Catering Menu | The Local Caterer — Mesa, AZ",
    description: "Explore customizable catering menus for weddings, corporate events, and private parties in Mesa, AZ. View menu styles and request a quote.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/blog",
    label: "Catering Blog",
    section: "Planning Resources",
    title: "Catering Blog | Tips, Trends & Event Ideas — The Local Caterer",
    description: "Read catering tips, event planning advice, and local guides from a Mesa, Arizona caterer for weddings, corporate events, and private parties.",
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    path: "/service-agreement",
    label: "Service Agreement",
    section: "Planning Resources",
    title: "Service Agreement | The Local Caterer — Mesa, AZ",
    description: "Review The Local Caterer's service agreement, including payment terms, cancellation policies, delivery fees, staffing rates, and event policies.",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    section: "Planning Resources",
    title: "Privacy Policy | The Local Caterer",
    description: "Read The Local Caterer's privacy policy for website visitors, event inquiries, and online forms.",
    priority: 0.2,
    changefreq: "yearly",
  },
  {
    path: "/wedding-catering-mesa-az",
    label: "Wedding Catering",
    section: "Catering Services",
    title: "Wedding Catering Mesa AZ | The Local Caterer — Custom Wedding Menus",
    description: `Mesa Arizona wedding catering with custom menus, full-service setup, and professional staff. Serving Mesa, Scottsdale, Chandler, Gilbert & Phoenix. Call ${phone}.`,
    priority: 0.95,
    changefreq: "monthly",
  },
  {
    path: "/corporate-event-catering",
    label: "Corporate Event Catering",
    section: "Catering Services",
    title: "Corporate Event Catering Mesa AZ | The Local Caterer",
    description: `Professional corporate catering in Mesa, Phoenix & Scottsdale. Office lunches, conferences, and team events. Call ${phone} for a free quote.`,
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/private-event-catering",
    label: "Private Event Catering",
    section: "Catering Services",
    title: "Private Event Catering Mesa AZ | The Local Caterer",
    description: "Custom private event catering in Mesa, AZ for birthdays, anniversaries, and celebrations. Full-service setup and cleanup across the East Valley.",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    path: "/private-party-catering",
    label: "Private Party Catering",
    section: "Catering Services",
    title: "Private Party Catering Mesa AZ | The Local Caterer",
    description: "Customized private party catering in Mesa, AZ with professional staff, complete setup, and cleanup. Serving Phoenix and the East Valley.",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    path: "/baby-shower-catering",
    label: "Baby Shower Catering",
    section: "Catering Services",
    title: "Baby Shower Catering Mesa AZ | The Local Caterer — Elegant & Delicious",
    description: `Beautiful baby shower catering in Mesa, AZ with themed menus, charcuterie boards, and luncheon spreads. Call ${phone}.`,
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/celebration-of-life-catering",
    label: "Celebration of Life Catering",
    section: "Catering Services",
    title: "Celebration of Life Catering Mesa AZ | The Local Caterer",
    description: "Compassionate, professional catering for memorial services and celebrations of life in Mesa, AZ. We handle the details so families can focus on what matters.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/barbecue-catering",
    label: "BBQ Catering",
    section: "Catering Services",
    title: "BBQ Catering Mesa AZ | The Local Caterer — Outdoor & Corporate BBQ",
    description: `Authentic BBQ catering in Mesa, AZ with smoked brisket, pulled pork, ribs, and sides for parties and corporate events. Call ${phone}.`,
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/catering-mesa-az",
    label: "Catering in Mesa, AZ",
    section: "Areas We Serve",
    title: "Catering in Mesa, AZ | The Local Caterer — Weddings, Corporate & Private Events",
    description: `Mesa, Arizona catering for weddings, corporate events, and private parties. Chef-crafted menus and local service. Call ${phone}.`,
    priority: 0.95,
    changefreq: "monthly",
  },
  {
    path: "/catering-phoenix-az",
    label: "Catering in Phoenix, AZ",
    section: "Areas We Serve",
    title: "Catering in Phoenix, AZ | The Local Caterer — Full-Service Event Catering",
    description: "Professional catering services in Phoenix, AZ for weddings, corporate events, and private parties. Get a free quote from The Local Caterer.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/catering-scottsdale-az",
    label: "Catering in Scottsdale, AZ",
    section: "Areas We Serve",
    title: "Catering in Scottsdale, AZ | The Local Caterer — Upscale Event Catering",
    description: `Upscale catering for Scottsdale weddings, corporate events, and private parties. Premium menus and professional service. Call ${phone}.`,
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/catering-chandler-az",
    label: "Catering in Chandler, AZ",
    section: "Areas We Serve",
    title: "Catering in Chandler, AZ | The Local Caterer — Weddings & Events",
    description: "Reliable catering services in Chandler, AZ for weddings, corporate lunches, and private parties. Free quotes available.",
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    path: "/catering-gilbert-az",
    label: "Catering in Gilbert, AZ",
    section: "Areas We Serve",
    title: "Catering in Gilbert, AZ | The Local Caterer — Local Event Catering",
    description: `Local catering expertise for Gilbert, AZ events, including weddings, baby showers, and corporate gatherings. Call ${phone}.`,
    priority: 0.85,
    changefreq: "monthly",
  },
  {
    path: "/mexican-catering-menu",
    label: "Mexican Catering Menu",
    section: "Catering Menus",
    title: "Mexican Catering Menu Mesa AZ | The Local Caterer — Tacos, Enchiladas & More",
    description: "Explore Mexican catering menus for Mesa events with tacos, enchiladas, fajitas, and more. Ideal for corporate events, weddings, and private parties.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/lunch-catering-menu",
    label: "Lunch Catering Menu",
    section: "Catering Menus",
    title: "Lunch Catering Menu Mesa AZ | The Local Caterer — Corporate & Event Lunches",
    description: "Professional lunch catering menus for corporate events and private gatherings in Mesa, AZ with sandwiches, salads, and hot entrees.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/italian-catering-menu",
    label: "Italian Catering Menu",
    section: "Catering Menus",
    title: "Italian Catering Menu Mesa AZ | The Local Caterer — Pasta, Lasagna & More",
    description: "Delicious Italian catering menus for Mesa events featuring pasta, lasagna, chicken marsala, and classic favorites.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/breakfast-catering-menu",
    label: "Breakfast Catering Menu",
    section: "Catering Menus",
    title: "Breakfast Catering Menu Mesa AZ | The Local Caterer — Corporate Breakfasts",
    description: "Professional breakfast catering in Mesa, AZ with eggs, pastries, fruit, and hot breakfast items for meetings and morning events.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/asian-catering-menu",
    label: "Asian Catering Menu",
    section: "Catering Menus",
    title: "Asian Catering Menu Mesa AZ | The Local Caterer — Asian Fusion & More",
    description: "Asian-inspired catering menus for Mesa events featuring teriyaki, stir-fry, spring rolls, and more.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/dessert-menu",
    label: "Dessert Catering Menu",
    section: "Catering Menus",
    title: "Dessert Catering Menu Mesa AZ | The Local Caterer — Cakes, Pastries & More",
    description: "Beautiful dessert catering for Mesa events with custom cakes, pastries, dessert displays, and more.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/sandwich-bar-mesa-az",
    label: "Sandwich Bar Catering",
    section: "Catering Menus",
    title: "Sandwich Bar Catering Mesa AZ | The Local Caterer — Build-Your-Own Sandwich Bars",
    description: "Interactive sandwich bar catering for Mesa corporate events and parties with fresh ingredients and customizable options.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/holiday-menu-2025",
    label: "Holiday Catering Menu",
    section: "Catering Menus",
    title: "Holiday Catering Menu 2025 | The Local Caterer — Mesa, AZ",
    description: "Holiday catering menus for Mesa, AZ events. Book early for Thanksgiving, Christmas, New Year's, and holiday gatherings.",
    priority: 0.6,
    changefreq: "yearly",
  },
  {
    path: "/blog/categories/wedding-catering",
    label: "Wedding Catering Articles",
    section: "Blog",
    title: "Wedding Catering Articles | The Local Caterer Blog",
    description: "Wedding catering ideas, planning guidance, and East Valley event inspiration from The Local Caterer.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/blog/categories/corporate-catering",
    label: "Corporate Catering Articles",
    section: "Blog",
    title: "Corporate Catering Articles | The Local Caterer Blog",
    description: "Corporate catering advice, office lunch ideas, and event planning tips for Mesa and Phoenix businesses.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/blog/categories/food-blogging-mesa",
    label: "Food & Mesa Articles",
    section: "Blog",
    title: "Food & Mesa Articles | The Local Caterer Blog",
    description: "Mesa food inspiration, local catering ideas, and event planning guidance from The Local Caterer.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/blog/categories/private-event-catering",
    label: "Private Event Catering Articles",
    section: "Blog",
    title: "Private Event Catering Articles | The Local Caterer Blog",
    description: "Private party catering tips and event ideas for celebrations throughout Mesa and the East Valley.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/blog/categories/holiday-catering",
    label: "Holiday Catering Articles",
    section: "Blog",
    title: "Holiday Catering Articles | The Local Caterer Blog",
    description: "Holiday menu inspiration and catering planning tips for Thanksgiving, Christmas, and seasonal Mesa events.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/blog/categories/personal-press-awards",
    label: "Press & Awards Articles",
    section: "Blog",
    title: "Press & Awards Articles | The Local Caterer Blog",
    description: "News, press features, and recognitions from The Local Caterer in Mesa, Arizona.",
    priority: 0.4,
    changefreq: "monthly",
  },
  {
    path: "/post/wedding-catering-east-valley-mesa-chandler-gilbert",
    label: "Wedding Catering in the East Valley",
    section: "Blog",
    title: "Wedding Catering in the East Valley: Mesa, Chandler & Gilbert | The Local Caterer",
    description: "Planning a wedding in Mesa, Chandler, or Gilbert? Explore chef-crafted menus, professional service, and custom wedding catering guidance.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer",
    label: "Best Catering Services in Mesa AZ",
    section: "Blog",
    title: "Best Catering Services in Mesa AZ | Guide to The Local Caterer",
    description: "Discover why The Local Caterer is trusted for weddings, corporate events, and private parties across Mesa and the East Valley.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/catering-mesa-az-the-local-caterers-guide-to-unforgettable-events",
    label: "Mesa Event Catering Guide",
    section: "Blog",
    title: "Catering in Mesa AZ: Complete Event Planning Guide | The Local Caterer",
    description: "A complete guide to planning a catered event in Mesa, Arizona, from menus and timing to service styles and event details.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/best-catering-companies-in-gilbert-az",
    label: "Best Catering Companies in Gilbert AZ",
    section: "Blog",
    title: "Best Catering Companies in Gilbert AZ | The Local Caterer",
    description: "Find chef-crafted catering for Gilbert weddings, parties, and corporate events from The Local Caterer.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers",
    label: "Chandler Catering Companies Guide",
    section: "Blog",
    title: "Catering Companies in Chandler AZ | Best Local Caterers Guide | The Local Caterer",
    description: "Learn how to compare Chandler caterers and plan a memorable wedding, private party, or corporate event.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/planning-corporate-events-for-2026-here-s-why-early-booking-matters",
    label: "Planning Corporate Events for 2026",
    section: "Blog",
    title: "Planning Corporate Events for 2026: Why Early Booking Matters | The Local Caterer",
    description: "Corporate event planning tips for Mesa and Phoenix businesses, including why early catering bookings matter.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/why-summer-2026-weddings-are-booking-earlier-than-ever",
    label: "Why Summer 2026 Weddings Are Booking Earlier",
    section: "Blog",
    title: "Why Summer 2026 Weddings Are Booking Earlier Than Ever | The Local Caterer",
    description: "Why Mesa and East Valley couples are reserving summer wedding caterers early and how to secure the right date.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek",
    label: "Affordable Catering Near Mesa, Gilbert & Queen Creek",
    section: "Blog",
    title: "Affordable Catering Near Me: Mesa, Gilbert & Queen Creek | The Local Caterer",
    description: "Explore budget-conscious catering options in Mesa, Gilbert, and Queen Creek without sacrificing fresh food or professional service.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/corporate-catering-scottsdale-phoenix-mesa-az",
    label: "Corporate Catering in Scottsdale, Phoenix & Mesa",
    section: "Blog",
    title: "Corporate Catering in Scottsdale, Phoenix & Mesa AZ | The Local Caterer",
    description: "Professional corporate catering across Scottsdale, Phoenix, and Mesa for office lunches, conferences, and team events.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/how-to-plan-the-perfect-backyard-bbq-catering-in-arizona",
    label: "Backyard BBQ Catering Guide",
    section: "Blog",
    title: "How to Plan the Perfect Backyard BBQ Catering in Arizona | The Local Caterer",
    description: "Expert guidance for planning a backyard BBQ in Arizona, including menu selection, setup, and hiring a Mesa caterer.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/baby-shower-catering-mesa-az-ideas-menus-and-tips",
    label: "Baby Shower Catering Ideas",
    section: "Blog",
    title: "Baby Shower Catering Mesa AZ: Ideas, Menus & Tips | The Local Caterer",
    description: "Get baby shower catering ideas, menu inspiration, and planning tips from The Local Caterer in Mesa, AZ.",
    priority: 0.75,
    changefreq: "monthly",
  },
  {
    path: "/post/celebration-of-life-catering-mesa-az-honoring-a-loved-one-with-food",
    label: "Celebration of Life Catering Guide",
    section: "Blog",
    title: "Celebration of Life Catering Mesa AZ: Honoring a Loved One | The Local Caterer",
    description: "Learn how thoughtful catering can support a celebration of life in Mesa, Arizona.",
    priority: 0.75,
    changefreq: "monthly",
  },
];

export const NOINDEX_ROUTE_META: Record<string, NoindexRouteMeta> = {
  "/school-lunch": {
    path: "/school-lunch",
    title: "Student Lunch Program | The Local Caterer",
    description: "Order school lunches for your student from The Local Caterer.",
    noindex: true,
  },
  "/admin/lunch-orders": {
    path: "/admin/lunch-orders",
    title: "Lunch Orders Admin | The Local Caterer",
    description: "Admin dashboard for student lunch orders.",
    noindex: true,
  },
  "/admin/leads": {
    path: "/admin/leads",
    title: "Leads Admin | The Local Caterer",
    description: "Admin dashboard for catering leads.",
    noindex: true,
  },
  "/contact/thanks": {
    path: "/contact/thanks",
    title: "Thank You | The Local Caterer",
    description: "Thank you for contacting The Local Caterer.",
    noindex: true,
  },
};

export const FOOTER_SECTIONS: SiteSection[] = [
  "Company",
  "Catering Services",
  "Areas We Serve",
  "Catering Menus",
  "Planning Resources",
  "Blog",
];

export function normalizeRoutePath(urlPath: string): string {
  const path = urlPath.split("?")[0].replace(/\/+$/, "");
  return path || "/";
}

export function getRouteMeta(urlPath: string): RouteMeta | NoindexRouteMeta | undefined {
  const path = normalizeRoutePath(urlPath);
  return INDEXABLE_ROUTES.find((route) => route.path === path) ?? NOINDEX_ROUTE_META[path];
}

export function getFooterLinks(section: SiteSection): RouteMeta[] {
  return INDEXABLE_ROUTES.filter((route) => route.section === section);
}

export function absoluteCanonical(path: string): string {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}
