/*
 * Press Page — Modern Farmhouse Premium
 * Comprehensive hub for all press mentions, awards, profiles, and media features
 * for The Local Caterer, Chef Josh Bakken, and Kasandra Bakken
 */
import { useEffect, useRef } from "react";
import { ExternalLink, Award, Star, Newspaper, Users, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}

const awards = [
  {
    title: "Top 3 Caterer in Mesa — 2025",
    org: "BusinessRate",
    year: "2025",
    description: "Recognized as a Top 3 Caterer in Mesa for 2025 by BusinessRate, an award based entirely on verified Google Review data and customer feedback. This recognition is earned through consistent service, quality food, and the trust of the community — not paid for or applied for.",
    url: "https://www.thelocalcaterer.com/post/the-local-caterer-named-a-top-caterer-in-mesa-for-2025",
    icon: "🏆",
    highlight: true,
  },
  {
    title: "Phoenix 2025 Woman of the Year",
    org: "Phoenix Business Recognition",
    year: "2025",
    description: "Kasandra Bakken, co-founder and operations director of The Local Caterer, was honored as Phoenix 2025 Woman of the Year — a recognition of her leadership, vision, and impact in building a thriving local food business from the ground up.",
    url: "https://www.linkedin.com/in/kasandra-bakken-47848830a",
    icon: "🌟",
    highlight: true,
  },
  {
    title: "Top 30 Women Entrepreneurs of Arizona",
    org: "Soeleish Phoenix Magazine",
    year: "2024",
    description: "Kasandra Bakken was nominated and featured in Soeleish Phoenix Magazine as one of the Top 30 Women Entrepreneurs of Arizona — celebrating her entrepreneurial drive and the growth of The Local Caterer across the East Valley.",
    url: "https://www.facebook.com/Deinastystudios/mentions/",
    icon: "📰",
    highlight: true,
  },
  {
    title: "WeddingWire Couples' Choice Award",
    org: "WeddingWire",
    year: "2024",
    description: "The Local Caterer holds a perfect 5.0 rating on WeddingWire with 100% of couples recommending their services. Recognized with the Couples' Choice Award for outstanding wedding catering in the Phoenix metro area.",
    url: "https://www.weddingwire.com/biz/the-local-caterer/2ea3ce9f43a89862.html",
    icon: "💍",
    highlight: false,
  },
];

const profiles = [
  {
    platform: "WeddingWire",
    rating: "5.0",
    reviews: "4 Reviews",
    badge: "Couples' Choice",
    description: "100% of couples recommend The Local Caterer on WeddingWire. Perfect 5-star rating across all wedding catering categories.",
    url: "https://www.weddingwire.com/biz/the-local-caterer/2ea3ce9f43a89862.html",
    color: "#1A6B8A",
  },
  {
    platform: "The Knot",
    rating: "5.0",
    reviews: "4 Reviews",
    badge: "5-Star Vendor",
    description: "Perfect 5-star rating on The Knot with 100% 5-star reviews from wedding clients across the Phoenix metro area.",
    url: "https://www.theknot.com/marketplace/the-local-caterer-mesa-az-2069298",
    color: "#C9417B",
  },
  {
    platform: "Yelp",
    rating: "4.2",
    reviews: "9 Reviews",
    badge: "Claimed Business",
    description: "Verified and claimed business on Yelp with 32 photos and active community engagement in Mesa, AZ.",
    url: "https://www.yelp.com/biz/the-local-caterer-mesa",
    color: "#D32323",
  },
  {
    platform: "Google Business",
    rating: "5.0",
    reviews: "131+ Reviews",
    badge: "Top 3 in Mesa",
    description: "Over 131 verified Google reviews powering the BusinessRate Top 3 Caterer in Mesa recognition. The foundation of our reputation.",
    url: "https://www.google.com/search?q=The+Local+Caterer+Mesa+AZ",
    color: "#4285F4",
  },
  {
    platform: "LinkedIn — Josh Bakken",
    rating: "16+ Years",
    reviews: "Chef & Founder",
    badge: "Industry Leader",
    description: "Chef Josh Bakken's professional profile — 16+ years in restaurant and hospitality, founder of The Local Caterer and Bakken's Table.",
    url: "https://www.linkedin.com/in/josh-bakken-21b88a1a8",
    color: "#0A66C2",
  },
  {
    platform: "LinkedIn — Kasandra Bakken",
    rating: "Founder",
    reviews: "Woman of the Year",
    badge: "Phoenix 2025",
    description: "Kasandra Bakken's professional profile — co-founder, operations director, and Phoenix 2025 Woman of the Year.",
    url: "https://www.linkedin.com/in/kasandra-bakken-47848830a",
    color: "#0A66C2",
  },
];

const mediaMentions = [
  {
    outlet: "Soeleish Phoenix Magazine",
    headline: "Top 30 Women Entrepreneurs of Arizona",
    summary: "Kasandra Bakken was nominated and featured as one of Arizona's top 30 women entrepreneurs, highlighting her leadership in building The Local Caterer into a premier East Valley catering brand.",
    year: "2024",
    type: "Magazine Feature",
    url: "https://www.facebook.com/Deinastystudios/mentions/",
    image: `${CDN}/kasandra_magazine_7abbdc13.webp`,
  },

  {
    outlet: "Mesa City Lifestyle",
    headline: "Local Business Spotlight — The Local Caterer",
    summary: "Mesa City Lifestyle featured The Local Caterer in their local business spotlight series, highlighting the company's community roots and seasonal menu offerings for Mesa residents.",
    year: "2025",
    type: "Social Feature",
    url: "https://www.instagram.com/mesacitylifestyle/",
    image: null,
  },
  {
    outlet: "Desert Bowler Newspaper",
    headline: "Community Catering Partner",
    summary: "The Local Caterer was featured in the Desert Bowler Newspaper as a community catering partner, providing meals for local events and establishing their presence as a trusted neighborhood food provider.",
    year: "2024",
    type: "Print Feature",
    url: "https://issuu.com/desertbowlernewspaper/docs/db-may-2024-web",
    image: null,
  },
  {
    outlet: "GoGilbert Community Directory",
    headline: "Kasandra Bakken — Featured Food Professional",
    summary: "Kasandra Bakken is featured in the GoGilbert community directory as a leading food professional in Mesa, Arizona, with recognition for The Local Caterer's certified nutritionist-informed menus.",
    year: "2024",
    type: "Community Directory",
    url: "https://www.gogilbert.com/arizona/mesa/food/kasandra-bakken",
    image: null,
  },
  {
    outlet: "Modern Moments Venue",
    headline: "Preferred Catering Partner",
    summary: "The Local Caterer is recognized as a preferred catering partner at Modern Moments Venue in Gilbert, AZ — a Best of Zola 2025 award-winning venue — cementing their reputation in the East Valley wedding market.",
    year: "2024–2025",
    type: "Venue Partnership",
    url: "https://www.facebook.com/modernmomentsvenue/",
    image: null,
  },
  {
    outlet: "ALPFA Phoenix Gala at Warehouse 215",
    headline: "Official Caterer — ALPFA Phoenix Gala",
    summary: "The Local Caterer was selected as the official caterer for the ALPFA Phoenix Gala at Warehouse 215, one of Phoenix's premier nonprofit and professional association events.",
    year: "2025",
    type: "Event Feature",
    url: "https://www.thelocalcaterer.com/post/catering-the-alpfa-phoenix-gala-at-warehouse-215",
    image: null,
  },
  {
    outlet: "BusinessRate",
    headline: "Top 3 Caterer in Mesa for 2025",
    summary: "BusinessRate officially recognized The Local Caterer as a Top 3 Caterer in Mesa for 2025, based entirely on verified Google Review data — a data-driven recognition of consistent excellence.",
    year: "2025",
    type: "Industry Recognition",
    url: "https://www.thelocalcaterer.com/post/the-local-caterer-named-a-top-caterer-in-mesa-for-2025",
    image: null,
  },
];

const teamProfiles = [
  {
    name: "Chef Josh Bakken",
    title: "Executive Chef & Co-Founder",
    photo: `${CDN}/josh_white_chef_c8790cd5.webp`,
    bio: "With over 16 years in the restaurant and hospitality industry, Chef Josh Bakken founded The Local Caterer in 2020 with a mission to bring chef-crafted, scratch-made food to every event in the East Valley. His culinary journey spans diverse cuisines and techniques, and his passion for bringing people together around the dinner table is the heart of everything The Local Caterer does. Josh also founded Bakken's Table, a private dining and chef's table experience.",
    linkedin: "https://www.linkedin.com/in/josh-bakken-21b88a1a8",
    highlights: ["16+ Years Culinary Experience", "Founder of Bakken's Table", "500+ Events Catered"],
  },
  {
    name: "Kasandra Bakken",
    title: "Co-Founder & Operations Director",
    photo: `${CDN}/kasandra_magazine_7abbdc13.webp`,
    bio: "Kasandra Bakken is the operational force behind The Local Caterer — managing client relationships, event logistics, and the team that makes every event run flawlessly. Recognized as Phoenix 2025 Woman of the Year and featured in Soeleish Phoenix Magazine as one of Arizona's Top 30 Women Entrepreneurs, Kasandra brings vision, warmth, and relentless dedication to every event she touches. Her background as a certified nutritionist also informs the health-conscious menu options The Local Caterer offers.",
    linkedin: "https://www.linkedin.com/in/kasandra-bakken-47848830a",
    highlights: ["Phoenix 2025 Woman of the Year", "Top 30 AZ Women Entrepreneurs — Soeleish Magazine", "Certified Nutritionist Background", "Community Leader in Mesa & Gilbert"],
  },
];

export default function Press() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Press & Media | The Local Caterer — Mesa AZ Catering"
        description="The Local Caterer in the press. Media features, awards, and recognition for Mesa Arizona's premier catering company. Contact us for media inquiries."
        canonical="/press"
      />
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20" style={{ backgroundColor: "#1B4332" }}>
        <div className="container">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>
              Media & Recognition
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
              Press, Awards &<br />Recognition
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(245,239,224,0.75)", fontFamily: "'Outfit', sans-serif" }}>
              A comprehensive hub of every mention, award, profile, and feature for The Local Caterer, Chef Josh Bakken, and Kasandra Bakken — built on years of consistent excellence in Arizona catering.
            </p>
          </FadeUp>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {[
              { value: "131+", label: "Google Reviews" },
              { value: "5.0★", label: "WeddingWire & The Knot" },
              { value: "Top 3", label: "Caterer in Mesa 2025" },
              { value: "500+", label: "Events Catered" },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="text-center p-6" style={{ backgroundColor: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.12)" }}>
                  <p className="text-3xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS & RECOGNITION ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <Award size={18} style={{ color: "#C1440E" }} />
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                Awards & Honors
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-14" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              Recognized for Excellence
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, i) => (
              <FadeUp key={i} delay={i * 80}>
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-8 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: award.highlight ? "#2D6A4F" : "#fff",
                    border: award.highlight ? "none" : "1px solid #E8DFC8",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{award.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 uppercase tracking-widest" style={{
                        backgroundColor: award.highlight ? "rgba(245,239,224,0.15)" : "#F5EFE0",
                        color: award.highlight ? "#F5EFE0" : "#2D6A4F",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {award.year}
                      </span>
                      <ExternalLink size={14} style={{ color: award.highlight ? "rgba(245,239,224,0.4)" : "#999" }} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1" style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: award.highlight ? "#F5EFE0" : "#1A1A1A",
                  }}>
                    {award.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{
                    color: award.highlight ? "rgba(245,239,224,0.5)" : "#C1440E",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {award.org}
                  </p>
                  <p className="text-sm leading-relaxed" style={{
                    color: award.highlight ? "rgba(245,239,224,0.8)" : "#555",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {award.description}
                  </p>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEW PLATFORM PROFILES ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <Star size={18} style={{ color: "#C1440E" }} />
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                Platform Profiles & Ratings
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-14" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              Find Us Across the Web
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {profiles.map((p, i) => (
              <FadeUp key={i} delay={i * 70}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ border: "1px solid #E8DFC8" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-2 h-8" style={{ backgroundColor: p.color }} />
                    <ExternalLink size={14} style={{ color: "#999" }} className="group-hover:text-[#2D6A4F] transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}>
                    {p.platform}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: p.color }}>
                      {p.rating}
                    </span>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "#333", fontFamily: "'Outfit', sans-serif" }}>{p.reviews}</p>
                      <p className="text-xs" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>{p.badge}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                    {p.description}
                  </p>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEDIA MENTIONS ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <Newspaper size={18} style={{ color: "#C1440E" }} />
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                Media & Community Features
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-14" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              In the News & Community
            </h2>
          </FadeUp>

          <div className="space-y-4">
            {mediaMentions.map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white hover:shadow-md transition-all duration-300"
                  style={{ border: "1px solid #E8DFC8" }}
                >
                  {/* Optional thumbnail for items that have one */}
                  {item.image && (
                    <div className="flex-shrink-0 w-full md:w-24 h-24 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.headline}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-shrink-0 md:w-48">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>
                      {item.type}
                    </p>
                    <p className="text-xs" style={{ color: "#999", fontFamily: "'Outfit', sans-serif" }}>{item.year}</p>
                  </div>
                  <div className="flex-1 border-l border-[#E8DFC8] md:pl-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                          {item.outlet}
                        </p>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                          {item.headline}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                          {item.summary}
                        </p>
                      </div>
                      <ExternalLink size={16} className="flex-shrink-0 mt-1" style={{ color: "#ccc" }} />
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM PROFILES ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#1B4332" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} style={{ color: "#C1440E" }} />
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>
                The People Behind the Brand
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-14" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
              Meet the Founders
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamProfiles.map((person, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="overflow-hidden h-full" style={{ backgroundColor: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.12)" }}>
                  {/* Photo header */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,25,15,0.90) 0%, rgba(10,25,15,0.2) 60%, transparent 100%)" }} />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                        {person.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>
                        {person.title}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-end mb-4">
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs px-3 py-2 transition-colors hover:bg-white/10"
                        style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif", border: "1px solid rgba(245,239,224,0.2)" }}
                      >
                        LinkedIn <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,239,224,0.75)", fontFamily: "'Outfit', sans-serif" }}>
                      {person.bio}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {person.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#C1440E" }} />
                          <span className="text-xs" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEDIA INQUIRY CTA ===== */}
      <section className="py-20" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10" style={{ backgroundColor: "#F5EFE0", border: "1px solid #E8DFC8" }}>
              <div className="flex items-start gap-4">
                <MapPin size={24} style={{ color: "#2D6A4F", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                    Media Inquiries & Interview Requests
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                    For press inquiries, interview requests, partnership features, or media kit access, please reach out directly. We're happy to speak about catering trends, the Arizona food scene, or our story building The Local Caterer from the ground up.
                  </p>
                </div>
              </div>
              <a
                href="mailto:kasandra@thelocalcaterer.com"
                className="btn-primary flex-shrink-0"
              >
                Contact for Press
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
