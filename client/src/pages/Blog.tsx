/*
 * Blog Page — Modern Farmhouse Premium
 * 12 SEO-optimized posts targeting Mesa/Phoenix catering keywords
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";
const IMG_WEDDING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_wedding_959be23b.webp";
const IMG_CORPORATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_corporate_36b8d2d9.webp";
const IMG_ABOUT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_about_80832f1b.webp";
const IMG_FOOD1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_6738_7f143df1.webp";
const IMG_FOOD2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_3984_6f626893.webp";

const allPosts = [
  {
    slug: "wedding-catering-east-valley-mesa-chandler-gilbert",
    title: "Wedding Catering in the East Valley: Mesa, Chandler & Gilbert",
    date: "2025-03-15",
    category: "wedding-catering",
    categoryLabel: "Wedding Catering",
    excerpt: "Planning a wedding in the East Valley? Here's everything you need to know about finding the perfect wedding caterer in Mesa, Chandler, and Gilbert, AZ.",
    img: IMG_WEDDING,
  },
  {
    slug: "the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer",
    title: "The Best Catering Services in Mesa, AZ: A Guide to The Local Caterer",
    date: "2025-02-28",
    category: "food-blogging-mesa",
    categoryLabel: "Food & Mesa",
    excerpt: "Looking for the best catering in Mesa, AZ? Discover why The Local Caterer is the East Valley's most trusted catering company for events of all sizes.",
    img: HERO,
  },
  {
    slug: "catering-mesa-az-the-local-caterers-guide-to-unforgettable-events",
    title: "Catering in Mesa, AZ: The Local Caterer's Guide to Unforgettable Events",
    date: "2025-02-10",
    category: "food-blogging-mesa",
    categoryLabel: "Food & Mesa",
    excerpt: "From weddings to corporate events, this comprehensive guide covers everything you need to know about planning a catered event in Mesa, Arizona.",
    img: IMG_FOOD1,
  },
  {
    slug: "best-catering-companies-in-gilbert-az",
    title: "Best Catering Companies in Gilbert, AZ: What to Look For",
    date: "2025-01-20",
    category: "food-blogging-mesa",
    categoryLabel: "Food & Mesa",
    excerpt: "Searching for the best caterers in Gilbert, AZ? We break down what to look for and why The Local Caterer stands out in the East Valley.",
    img: IMG_CORPORATE,
  },
  {
    slug: "catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers",
    title: "Catering Companies in Chandler, AZ: Your Guide to the Best Local Caterers",
    date: "2025-01-08",
    category: "food-blogging-mesa",
    categoryLabel: "Food & Mesa",
    excerpt: "Need a caterer in Chandler, AZ? This guide covers the top catering options in Chandler and what makes The Local Caterer the top choice.",
    img: IMG_FOOD2,
  },
  {
    slug: "planning-corporate-events-for-2026-here-s-why-early-booking-matters",
    title: "Planning Corporate Events for 2026: Why Early Booking Matters",
    date: "2024-12-15",
    category: "corporate-catering",
    categoryLabel: "Corporate Catering",
    excerpt: "Corporate event season is coming. Here's why booking your catering early in 2026 is critical and how The Local Caterer can help you plan ahead.",
    img: IMG_CORPORATE,
  },
  {
    slug: "why-summer-2026-weddings-are-booking-earlier-than-ever",
    title: "Why Summer 2026 Weddings Are Booking Earlier Than Ever",
    date: "2024-11-30",
    category: "wedding-catering",
    categoryLabel: "Wedding Catering",
    excerpt: "Wedding season 2026 is filling up fast. Discover why couples are booking their wedding caterers months earlier and how to secure your date.",
    img: IMG_WEDDING,
  },
  {
    slug: "affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek",
    title: "Affordable Catering Near Me: Budget-Friendly Options in Mesa, Gilbert & Queen Creek",
    date: "2024-11-10",
    category: "food-blogging-mesa",
    categoryLabel: "Food & Mesa",
    excerpt: "Looking for affordable catering in the East Valley? Discover how to get quality catering that fits your budget in Mesa, Gilbert, and Queen Creek.",
    img: IMG_FOOD1,
  },
  {
    slug: "corporate-catering-scottsdale-phoenix-mesa-az",
    title: "Corporate Catering in Scottsdale, Phoenix & Mesa: Elevate Your Next Business Event",
    date: "2024-10-20",
    category: "corporate-catering",
    categoryLabel: "Corporate Catering",
    excerpt: "Professional corporate catering for Scottsdale, Phoenix, and Mesa businesses. Chef-crafted menus for meetings, conferences, and company events.",
    img: IMG_CORPORATE,
  },
  {
    slug: "how-to-plan-the-perfect-backyard-bbq-catering-in-arizona",
    title: "How to Plan the Perfect Backyard BBQ Catering in Arizona",
    date: "2024-09-15",
    category: "bbq-outdoor",
    categoryLabel: "BBQ & Outdoor",
    excerpt: "Planning a backyard BBQ in Arizona? The Local Caterer brings slow-smoked meats, classic sides, and professional service to your outdoor event.",
    img: IMG_ABOUT,
  },
  {
    slug: "baby-shower-catering-mesa-az-ideas-menus-and-tips",
    title: "Baby Shower Catering in Mesa, AZ: Ideas, Menus & Tips for a Memorable Celebration",
    date: "2024-08-20",
    category: "private-event-catering",
    categoryLabel: "Private Events",
    excerpt: "Planning a baby shower in Mesa, AZ? The Local Caterer offers beautiful, customizable catering menus for baby showers of all sizes.",
    img: IMG_FOOD2,
  },
  {
    slug: "celebration-of-life-catering-mesa-az-honoring-a-loved-one-with-food",
    title: "Celebration of Life Catering in Mesa, AZ: Honoring a Loved One Through Food",
    date: "2024-07-10",
    category: "private-event-catering",
    categoryLabel: "Private Events",
    excerpt: "The Local Caterer provides compassionate, professional catering for celebrations of life and memorial services in Mesa, AZ and the East Valley.",
    img: HERO,
  },
];

const categories = [
  { slug: "all", label: "All Posts" },
  { slug: "wedding-catering", label: "Wedding Catering" },
  { slug: "corporate-catering", label: "Corporate Catering" },
  { slug: "food-blogging-mesa", label: "Food & Mesa" },
  { slug: "private-event-catering", label: "Private Events" },
  { slug: "bbq-outdoor", label: "BBQ & Outdoor" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const featured = allPosts[0];
  const rest = filtered.slice(activeCategory === "all" ? 1 : 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Catering Blog | Mesa AZ Event Planning Tips | The Local Caterer"
        description="Expert catering tips, event planning guides, and local insights from The Local Caterer — Mesa Arizona's premier catering company. Weddings, corporate events, BBQ & more."
        canonical="/blog"
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16"
        style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.78)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.55)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link> / Blog
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
          >
            The Local Caterer Blog
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
            Catering tips, event planning guides, and local insights from Mesa's premier catering company.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === "all" && (
        <section className="py-12" style={{ backgroundColor: "#EDE6D3" }}>
          <div className="container">
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
              Featured Post
            </p>
            <Link href={`/post/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <div className="overflow-hidden h-64 lg:h-auto">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span
                  className="text-xs uppercase tracking-widest font-semibold px-3 py-1 mb-4 self-start"
                  style={{ backgroundColor: "#C1440E", color: "white", fontFamily: "'Outfit', sans-serif" }}
                >
                  {featured.categoryLabel}
                </span>
                <h2
                  className="text-3xl font-semibold mb-4 group-hover:text-[#2D6A4F] transition-colors leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                >
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                    <Calendar size={12} /> {formatDate(featured.date)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Posts */}
            <div className="lg:col-span-3">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className="text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-colors"
                    style={{
                      backgroundColor: activeCategory === cat.slug ? "#1B4332" : "#EDE6D3",
                      color: activeCategory === cat.slug ? "#F5EFE0" : "#444",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    className="group block bg-white overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="overflow-hidden h-48">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5"
                          style={{ backgroundColor: "#EDE6D3", color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                        >
                          {post.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                          <Calendar size={11} /> {formatDate(post.date)}
                        </span>
                      </div>
                      <h2
                        className="text-xl font-semibold mb-3 group-hover:text-[#2D6A4F] transition-colors leading-snug"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                        {post.excerpt}
                      </p>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
                        style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                      >
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>No posts in this category yet.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="p-6 mb-6" style={{ backgroundColor: "#2D6A4F" }}>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
                >
                  Get a Quote
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
                  Ready to book your next event?
                </p>
                <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta w-full justify-center text-xs">
                  Request a Quote
                </a>
              </div>

              <div className="p-6" style={{ backgroundColor: "#EDE6D3" }}>
                <h4
                  className="text-xs uppercase tracking-widest font-semibold mb-4"
                  style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                >
                  Categories
                </h4>
                <div className="flex flex-col gap-2">
                  {categories.slice(1).map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className="text-sm flex items-center gap-2 hover:text-[#2D6A4F] transition-colors text-left"
                      style={{ color: activeCategory === cat.slug ? "#2D6A4F" : "#444", fontFamily: "'Outfit', sans-serif" }}
                    >
                      <ArrowRight size={12} /> {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 mt-6" style={{ backgroundColor: "#1B4332" }}>
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
                >
                  Download Our Menu
                </h4>
                <p className="text-xs mb-4" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
                  Browse our full catering menu — 10 categories, 100+ items.
                </p>
                <a
                  href="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/thelocalcaterer-menu-2025_59b757eb.pdf"
                  download="TheLocalCaterer-Menu.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-widest border border-white/30 text-white hover:bg-white/10 transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Download PDF Menu
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
