/**
 * Gallery Page — The Local Caterer
 * Design: Modern Farmhouse Premium
 * All 23 real photos from actual events, uploaded to CDN
 * Masonry grid, category filter, lightbox with Book This Look CTA
 */
import { useState } from "react";
import { Link } from "wouter";
import { X, ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr";
const HERO_BG = `${CDN}/0M6A0036_f419999a.webp`;

const photos = [
  // ── WEDDINGS ──────────────────────────────────────────────────────────────
  {
    id: 1,
    src: `${CDN}/0M6A0036_f419999a.webp`,
    alt: "Elegant outdoor wedding reception with long tables, white florals, and string lights",
    title: "Outdoor Wedding Reception",
    category: "weddings",
    tag: "Weddings",
  },
  {
    id: 2,
    src: `${CDN}/0M6A0098_97c6aea4.webp`,
    alt: "Wedding reception guests dining under string lights in a lush garden",
    title: "Garden Wedding Dinner",
    category: "weddings",
    tag: "Weddings",
  },
  {
    id: 3,
    src: `${CDN}/1L7A9333_894f7412.webp`,
    alt: "Elegant wedding table with white anemone florals and black place settings",
    title: "Wedding Table Design",
    category: "weddings",
    tag: "Weddings",
  },
  {
    id: 4,
    src: `${CDN}/0M6A0157_2a659271.webp`,
    alt: "Catering staff serving a wedding buffet line at an outdoor evening event",
    title: "Wedding Buffet Service",
    category: "weddings",
    tag: "Weddings",
  },
  {
    id: 5,
    src: `${CDN}/1L7A9377_64afe89e.webp`,
    alt: "Two professional catering staff in bow ties carrying appetizer trays",
    title: "White Glove Service",
    category: "weddings",
    tag: "Weddings",
  },
  // ── CORPORATE ─────────────────────────────────────────────────────────────
  {
    id: 6,
    src: `${CDN}/1top_32cff390.webp`,
    alt: "Abundant poolside grazing table with charcuterie, fruits, and pastries",
    title: "Corporate Poolside Spread",
    category: "corporate",
    tag: "Corporate",
  },
  {
    id: 7,
    src: `${CDN}/1L7A9350_d7d4c8fe.webp`,
    alt: "Stunning charcuterie and grazing table with strawberries, nuts, meats, and dips",
    title: "Executive Grazing Table",
    category: "corporate",
    tag: "Corporate",
  },
  {
    id: 8,
    src: `${CDN}/0M6A0007(1)_ba260848.webp`,
    alt: "Colorful charcuterie spread with fruits, meats, cheeses, and crackers on white linen",
    title: "Corporate Charcuterie Board",
    category: "corporate",
    tag: "Corporate",
  },
  // ── CHARCUTERIE ───────────────────────────────────────────────────────────
  {
    id: 9,
    src: `${CDN}/IMG_9159_d81ad391.webp`,
    alt: "Artisan charcuterie board with meats, cheeses, fruits, and garnishes",
    title: "Artisan Charcuterie Board",
    category: "charcuterie",
    tag: "Charcuterie",
  },
  {
    id: 10,
    src: `${CDN}/IMG_7425_4444ff98.webp`,
    alt: "Charcuterie and appetizer spread with seasonal ingredients",
    title: "Seasonal Charcuterie Spread",
    category: "charcuterie",
    tag: "Charcuterie",
  },
  {
    id: 12,
    src: `${CDN}/IMG_6667_8c4b40c3.webp`,
    alt: "Colorful charcuterie arrangement with fresh fruits and specialty cheeses",
    title: "Charcuterie & Fruit Display",
    category: "charcuterie",
    tag: "Charcuterie",
  },
  // ── APPETIZERS ────────────────────────────────────────────────────────────
  {
    id: 13,
    src: `${CDN}/_DSC0119_5168426a.webp`,
    alt: "Chef arranging caprese skewers with cherry tomatoes and fresh mozzarella",
    title: "Caprese Skewers",
    category: "appetizers",
    tag: "Appetizers",
  },
  {
    id: 14,
    src: `${CDN}/_DSC0268_127ded6e.webp`,
    alt: "Jalapeño cornbread squares in a red-checkered basket",
    title: "Jalapeño Cornbread",
    category: "appetizers",
    tag: "Appetizers",
  },
  {
    id: 15,
    src: `${CDN}/ChickenSataySkewersw_PeanutSauce_107c68ef.webp`,
    alt: "Chicken satay skewers with peanut dipping sauce",
    title: "Chicken Satay Skewers",
    category: "appetizers",
    tag: "Appetizers",
  },
  {
    id: 16,
    src: `${CDN}/sdfsf_60e8de7d.webp`,
    alt: "Outdoor appetizer table with bruschetta, roll-ups, and fresh garnishes in sunlight",
    title: "Outdoor Appetizer Station",
    category: "appetizers",
    tag: "Appetizers",
  },
  {
    id: 17,
    src: `${CDN}/dfsdf_ed2ec854.webp`,
    alt: "Bruschetta and crostini appetizer station with menu signage and fresh herbs",
    title: "Bruschetta Station",
    category: "appetizers",
    tag: "Appetizers",
  },
  // ── PRIVATE EVENTS ────────────────────────────────────────────────────────
  {
    id: 18,
    src: `${CDN}/IMG_3356_f4c0eba1.webp`,
    alt: "Beautifully plated private dinner course with fresh ingredients",
    title: "Private Dinner Plating",
    category: "private",
    tag: "Private Events",
  },
  {
    id: 19,
    src: `${CDN}/IMG_4037_1d1228d9.webp`,
    alt: "Elegant private event food display with seasonal dishes",
    title: "Private Event Display",
    category: "private",
    tag: "Private Events",
  },
  {
    id: 20,
    src: `${CDN}/IMG_4120_b02ace67.webp`,
    alt: "Private party catering setup with beautifully arranged dishes",
    title: "Private Party Spread",
    category: "private",
    tag: "Private Events",
  },
  // ── BEHIND THE SCENES ─────────────────────────────────────────────────────
  {
    id: 21,
    src: `${CDN}/0M6A3242_2dbdb45d.webp`,
    alt: "Chef Josh Bakken in his kitchen, confident pose at the counter",
    title: "Chef Josh Bakken",
    category: "bts",
    tag: "Behind the Scenes",
  },
  {
    id: 22,
    src: `${CDN}/0M6A3259_604a42cf.webp`,
    alt: "Chef Josh Bakken precision-cutting ingredients in a professional kitchen",
    title: "Precision in the Kitchen",
    category: "bts",
    tag: "Behind the Scenes",
  },
  {
    id: 23,
    src: `${CDN}/0M6A9953_f5c3d3d4.webp`,
    alt: "Line cook grilling fresh vegetables on an outdoor grill with Arizona mountains in background",
    title: "Live Fire Cooking",
    category: "bts",
    tag: "Behind the Scenes",
  },
];

const CATEGORIES = [
  { slug: "all", label: "All Events" },
  { slug: "weddings", label: "Weddings" },
  { slug: "corporate", label: "Corporate" },
  { slug: "charcuterie", label: "Charcuterie" },
  { slug: "appetizers", label: "Appetizers" },
  { slug: "private", label: "Private Events" },
  { slug: "bts", label: "Behind the Scenes" },
];

type Photo = typeof photos[0];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Catering Gallery | The Local Caterer — Real Events in Mesa AZ"
        description="Browse our catering gallery — real photos from weddings, corporate events, and private parties across Mesa, Phoenix, and Scottsdale, AZ. See our work and book your event today."
        canonical="/gallery"
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.82)" }} />
        <div className="relative z-10 container">
          <p
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-4"
            style={{ color: "rgba(245,239,224,0.55)", fontFamily: "'Outfit', sans-serif" }}
          >
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link> / Gallery
          </p>
          <h1
            className="text-5xl md:text-7xl font-semibold mb-5 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
          >
            Every Event,<br />
            <em style={{ color: "#C8A97E" }}>Beautifully Executed</em>
          </h1>
          <p
            className="text-lg max-w-xl mb-8"
            style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}
          >
            Real photos from real events — weddings, corporate galas, private dinners, and more
            across Mesa, Phoenix, Scottsdale, Chandler, and Gilbert, AZ.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer">
              <button
                className="flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200"
                style={{ backgroundColor: "#C1440E" }}
              >
                Book Your Event <ArrowRight size={14} />
              </button>
            </a>
            <a
              href="tel:+14807181671"
              className="flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-widest border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
            >
              <Phone size={13} /> (480) 718-1671
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{ backgroundColor: "#1B4332", borderColor: "rgba(245,239,224,0.1)" }}
      >
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className="shrink-0 text-xs font-semibold uppercase tracking-widest px-5 py-2 transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat.slug ? "#C1440E" : "transparent",
                  color:
                    activeCategory === cat.slug ? "white" : "rgba(245,239,224,0.65)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          {/* Stats */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <p className="text-sm" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
              Showing{" "}
              <strong style={{ color: "#1B4332" }}>{filtered.length}</strong> photos
              {activeCategory !== "all" && (
                <>
                  {" "}in{" "}
                  <strong style={{ color: "#1B4332" }}>
                    {CATEGORIES.find((c) => c.slug === activeCategory)?.label}
                  </strong>
                </>
              )}
            </p>
            <Link
              href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
              style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}
            >
              Book Your Event <ArrowRight size={12} />
            </Link>
          </div>

          {/* CSS Columns Masonry */}
          <style>{`
            .gallery-masonry { column-count: 1; column-gap: 1rem; }
            @media (min-width: 640px) { .gallery-masonry { column-count: 2; } }
            @media (min-width: 1024px) { .gallery-masonry { column-count: 3; } }
          `}</style>
          <div className="gallery-masonry">
            {filtered.map((photo, idx) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden mb-4 cursor-pointer"
                style={{ breakInside: "avoid" }}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
                  }}
                >
                  <span
                    className="text-xs uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "#C8A97E", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {photo.tag}
                  </span>
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {photo.title}
                  </h3>
                  <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <span
                      className="inline-block text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-colors duration-200"
                      style={{ backgroundColor: "#C1440E" }}
                    >
                      Book This Look →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "#6b6b6b", fontFamily: "'Outfit', sans-serif" }}>
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-white text-center" style={{ backgroundColor: "#1B4332" }}>
        <div className="container max-w-3xl">
          <p
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "#C8A97E", fontFamily: "'Outfit', sans-serif" }}
          >
            Ready to Create Your Own Moment?
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Let's Build Your Perfect Event
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Outfit', sans-serif" }}
          >
            Every event in this gallery started with a single conversation. Tell us about your
            vision and we'll make it happen — from menu design to white-glove service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer">
              <button
                className="px-10 py-4 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                style={{ backgroundColor: "#C1440E" }}
              >
                Request a Quote →
              </button>
            </a>
            <Link href="/menu">
              <button
                className="px-10 py-4 text-white text-sm font-semibold uppercase tracking-widest border transition-all duration-300 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                View Our Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors rounded-full p-2"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image + info */}
          <div
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="max-h-[70vh] w-auto object-contain rounded"
            />
            <div className="text-center">
              <span
                className="text-xs uppercase tracking-widest font-semibold block mb-1"
                style={{ color: "#C8A97E", fontFamily: "'Outfit', sans-serif" }}
              >
                {currentPhoto.tag}
              </span>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {currentPhoto.title}
              </h3>
              <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" onClick={closeLightbox}>
                <button
                  className="px-8 py-3 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                  style={{ backgroundColor: "#C1440E" }}
                >
                  Book This Look →
                </button>
              </a>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors rounded-full p-2"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
