/*
 * Home Page — Modern Farmhouse Premium
 * Full-bleed hero with Arizona desert catering image
 * Services grid, social proof, locations, blog preview, CTA
 */
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, CheckCircle2, Phone, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";
const WEDDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_wedding_959be23b.webp";
const CORPORATE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_corporate_36b8d2d9.webp";
const CHEF_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_about_80832f1b.webp";
const CATERING_REAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_6738_7f143df1.webp";
const DESSERT_REAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_3984_6f626893.webp";

const services = [
  {
    title: "Wedding Catering",
    desc: "Unforgettable menus crafted for your most important day. From intimate ceremonies to grand receptions across the East Valley.",
    href: "/wedding-catering-mesa-az",
    img: WEDDING_IMG,
  },
  {
    title: "Corporate Catering",
    desc: "Professional, punctual, and delicious. We handle everything from office lunches to large-scale corporate events.",
    href: "/corporate-event-catering",
    img: CORPORATE_IMG,
  },
  {
    title: "Private Events",
    desc: "Birthdays, anniversaries, celebrations of life — every gathering deserves exceptional food and flawless service.",
    href: "/private-event-catering",
    img: CATERING_REAL,
  },
];

const testimonials = [
  {
    name: "Alexis R.",
    initials: "AR",
    color: "#C1440E",
    event: "Wedding",
    platform: "WeddingWire",
    platformColor: "#7B5EA7",
    location: "Mesa, AZ",
    text: "Josh and his team were absolutely incredible. The food was beyond delicious and every single guest complimented the meal. The communication throughout the entire planning process was seamless. We could not have asked for a better caterer for our wedding day.",
    stars: 5,
  },
  {
    name: "Morgan T.",
    initials: "MT",
    color: "#2D6A4F",
    event: "Wedding",
    platform: "WeddingWire",
    platformColor: "#7B5EA7",
    location: "Chandler, AZ",
    text: "Josh and Kasandra are so kind, professional, and talented. The food was phenomenal — our guests are still talking about it. They made our wedding day stress-free and absolutely perfect. 10/10 would recommend to anyone.",
    stars: 5,
  },
  {
    name: "Sarah M.",
    initials: "SM",
    color: "#1B4332",
    event: "Corporate Event",
    platform: "Google",
    platformColor: "#4285F4",
    location: "Phoenix, AZ",
    text: "Huge shout out to Josh Bakken and The Local Caterer. If anyone is looking to hire a caterer, this is your person. We have been so impressed with Josh's professionalism, creativity, and the quality of food. He went above and beyond for our event.",
    stars: 5,
  },
  {
    name: "Jennifer L.",
    initials: "JL",
    color: "#C1440E",
    event: "Birthday Party",
    platform: "Google",
    platformColor: "#4285F4",
    location: "Scottsdale, AZ",
    text: "We hired The Local Caterer for my mother's 70th birthday party and it was absolutely perfect. The food presentation was stunning, the staff was professional and friendly, and every dish was delicious. Our guests kept asking who catered the event. Will definitely book again!",
    stars: 5,
  },
  {
    name: "David K.",
    initials: "DK",
    color: "#2D6A4F",
    event: "Corporate Lunch",
    platform: "Yelp",
    platformColor: "#D32323",
    location: "Mesa, AZ",
    text: "We use The Local Caterer for all our company events now. The food is consistently excellent, delivery is always on time, and the setup is always professional. Our team looks forward to every catered lunch. Josh and his crew are the best in the East Valley.",
    stars: 5,
  },
  {
    name: "Amanda W.",
    initials: "AW",
    color: "#1B4332",
    event: "Baby Shower",
    platform: "Google",
    platformColor: "#4285F4",
    location: "Gilbert, AZ",
    text: "I cannot say enough good things about The Local Caterer. They catered my baby shower and everything was absolutely beautiful and delicious. The charcuterie board was a work of art and the food was fresh and flavorful. Kasandra was so helpful with the planning. Highly recommend!",
    stars: 5,
  },
];

const locations = [
  { city: "Mesa", href: "/catering-mesa-az", desc: "Our home base. Premium catering throughout Mesa and the East Valley." },
  { city: "Phoenix", href: "/catering-phoenix-az", desc: "Full-service catering for Phoenix metro events of all sizes." },
  { city: "Scottsdale", href: "/catering-scottsdale-az", desc: "Upscale catering for Scottsdale's most discerning clients." },
  { city: "Chandler", href: "/catering-chandler-az", desc: "Reliable catering services throughout Chandler and surrounding areas." },
  { city: "Gilbert", href: "/catering-gilbert-az", desc: "Local catering expertise for Gilbert events and celebrations." },
];

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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

// Platform badge SVG icons
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function WeddingWireIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#7B5EA7">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  );
}

function YelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#D32323">
      <path d="M21.111 18.226c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09-.154-.12-.314-.365-2.447-3.827l-.633-1.032c-.21-.336-.147-.78.15-1.075.297-.294.74-.38 1.085-.21l1.073.527c3.44 1.668 3.67 1.836 3.793 1.992.199.26.226.589.858-.132zM12.16 13.01c-.148-.47-.592-.753-1.075-.69l-1.168.155c-3.835.508-4.095.576-4.274.693-.28.183-.409.5-.34.82.277 1.25 2.564 4.084 3.493 4.568.31.16.638.145.888-.044.165-.124.33-.36 1.574-4.21l.37-1.148c.12-.37.06-.77-.468-.144zm8.31-3.273c-.187-.938-3.18-3.097-4.17-3.22-.334-.042-.63.085-.815.338-.12.167-.2.44-.2 4.5v1.21c0 .396.275.742.664.834.39.09.79-.09.99-.44l.543-.93c1.78-3.05 1.93-3.31 1.97-3.502.063-.3-.013-.606-.982-.79zM10.59 11.3c.39-.09.664-.44.664-.834V9.256c0-4.06-.08-4.333-.2-4.5-.185-.253-.48-.38-.815-.338-.99.123-3.983 2.282-4.17 3.22-.07.302.007.606.185.79.04.19.19.45 1.97 3.502l.543.93c.2.35.6.53.99.44z"/>
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Google") return <GoogleIcon />;
  if (platform === "WeddingWire") return <WeddingWireIcon />;
  if (platform === "Yelp") return <YelpIcon />;
  return null;
}

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#1B4332" }}>
      <div className="container">
        {/* Header with aggregate rating */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>
                Client Reviews
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                What Our Clients Say
              </h2>
            </div>
            {/* Aggregate rating badge */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col items-center" style={{ backgroundColor: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.12)", padding: "1rem 1.5rem" }}>
                <p className="text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>5.0</p>
                <div className="flex gap-0.5 my-1">
                  {[1,2,3,4,5].map(j => <Star key={j} size={12} fill="#C1440E" stroke="none" />)}
                </div>
                <p className="text-xs" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>500+ Reviews</p>
              </div>
              <div className="flex flex-col gap-2">
                {["Google", "WeddingWire", "Yelp"].map(platform => (
                  <div key={platform} className="flex items-center gap-2">
                    <PlatformIcon platform={platform} />
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(j => <Star key={j} size={10} fill="#C1440E" stroke="none" />)}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Testimonial cards — desktop: 3-col grid, mobile: carousel */}
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="p-7 h-full flex flex-col" style={{ backgroundColor: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.12)" }}>
                {/* Quote icon */}
                <Quote size={24} style={{ color: "#C1440E", opacity: 0.6 }} className="mb-4" />
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="#C1440E" stroke="none" />)}
                </div>
                {/* Review text */}
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                  "{t.text}"
                </p>
                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  {/* Avatar circle with initials */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>{t.event} · {t.location}</p>
                  </div>
                  {/* Platform badge */}
                  <div className="flex items-center gap-1 flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "3px 8px", borderRadius: "2px" }}>
                    <PlatformIcon platform={t.platform} />
                    <span className="text-xs" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>{t.platform}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="p-7 flex flex-col"
            style={{ backgroundColor: "rgba(245,239,224,0.06)", border: "1px solid rgba(245,239,224,0.12)", minHeight: "280px" }}
          >
            <Quote size={24} style={{ color: "#C1440E", opacity: 0.6 }} className="mb-4" />
            <div className="flex gap-0.5 mb-4">
              {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="#C1440E" stroke="none" />)}
            </div>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
              "{testimonials[activeIdx].text}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: testimonials[activeIdx].color }}
              >
                {testimonials[activeIdx].initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}>{testimonials[activeIdx].name}</p>
                <p className="text-xs" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>{testimonials[activeIdx].event} · {testimonials[activeIdx].location}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "3px 8px", borderRadius: "2px" }}>
                <PlatformIcon platform={testimonials[activeIdx].platform} />
                <span className="text-xs" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>{testimonials[activeIdx].platform}</span>
              </div>
            </div>
          </div>
          {/* Dot navigation */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIdx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === activeIdx ? "#C1440E" : "rgba(245,239,224,0.3)",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?q=The+Local+Caterer+Mesa+AZ+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              Read All Reviews <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="The Local Caterer | Mesa, AZ Premier Catering"
        description="Mesa, AZ catering for weddings, corporate events & private parties. Chef-crafted menus served across Mesa, Phoenix, Scottsdale, Chandler & Gilbert."
        canonical="/"
        keywords="catering mesa az, caterer mesa arizona, wedding catering mesa, corporate catering mesa az, catering near me, event catering arizona"
      />
      <Navigation transparent />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video background — muted autoplay loop */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/teaservideo1_c28b914d.mp4"
          poster={HERO_IMG}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,25,15,0.82) 0%, rgba(10,25,15,0.45) 60%, rgba(10,25,15,0.2) 100%)" }} />

        <div className="relative z-10 container pt-24 pb-16">
          <div className="max-w-2xl">
            <FadeUp delay={0}>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
                Mesa, Arizona's Premier Caterer
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
              >
                Food That Makes<br />
                <em style={{ color: "#C1440E" }}>Every Moment</em><br />
                Unforgettable
              </h1>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                From intimate weddings to large corporate events, The Local Caterer brings chef-crafted menus and flawless service to Mesa, Phoenix, Scottsdale, Chandler, and Gilbert.
              </p>
            </FadeUp>
            <FadeUp delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-terracotta">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <Link href="/catering-menu" className="btn-outline" style={{ borderColor: "rgba(245,239,224,0.6)", color: "#F5EFE0" }}>
                  View Our Menu
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={400}>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white/30 bg-green-900/60 flex items-center justify-center text-xs text-white font-bold">
                      {["S","J","M","R","A"][i-1]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#C1440E" stroke="none" />)}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
                    500+ events catered · 5-star rated
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-white/30" />
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section style={{ backgroundColor: "#2D6A4F" }} className="py-5">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "500+ Events Catered",
              "5-Star Google Reviews",
              "Mesa, AZ Based",
              "Weddings · Corporate · Private",
              "Same-Day Quotes Available",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: "#C1440E" }} />
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(245,239,224,0.9)", fontFamily: "'Outfit', sans-serif" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                  What We Do
                </p>
                <h2 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                  Catering for Every<br />Occasion
                </h2>
              </div>
              <Link href="/services" className="btn-outline self-start md:self-auto">
                All Services <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeUp key={s.href} delay={i * 100}>
                <Link href={s.href} className="group block overflow-hidden" style={{ backgroundColor: "#fff" }}>
                  <div className="overflow-hidden h-56">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                      {s.desc}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                      Learn More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SPLIT SECTION ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp className="relative">
              <img
                src={CHEF_IMG}
                alt="Chef preparing food at The Local Caterer"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 hidden lg:block" style={{ backgroundColor: "#2D6A4F", padding: "1.5rem 2rem" }}>
                <p className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>500+</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>Events Catered</p>
              </div>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Rooted in Mesa.<br />Passionate About Food.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                The Local Caterer was born from a simple belief: that every event deserves food that's made with care, served with pride, and remembered long after the last bite. We're a Mesa-based catering company with deep roots in the East Valley community.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                From intimate backyard gatherings to 500-person corporate galas, our team brings the same level of dedication and culinary craft to every event we serve. We source fresh, quality ingredients and build every menu around your vision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Meet the Team <ArrowRight size={14} />
                </Link>
                <a href="tel:+14807181671" className="btn-outline flex items-center gap-2">
                  <Phone size={14} /> (480) 718-1671
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== GALLERY STRIP ===== */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-8 text-center" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
              Recent Events
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: WEDDING_IMG, alt: "Wedding catering setup" },
              { src: CATERING_REAL, alt: "Corporate catering buffet" },
              { src: DESSERT_REAL, alt: "Dessert catering" },
              { src: CHEF_IMG, alt: "Chef plating food" },
            ].map((img, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="overflow-hidden aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                Service Area
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Serving the Greater<br />Phoenix Metro
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {locations.map((loc, i) => (
              <FadeUp key={loc.href} delay={i * 80}>
                <Link href={loc.href} className="group block p-6 text-center hover:shadow-md transition-shadow" style={{ backgroundColor: "#F5EFE0" }}>
                  <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#2D6A4F" }}>
                    <span className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{loc.city[0]}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                    {loc.city}, AZ
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                    {loc.desc}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.78)" }} />
        <div className="relative z-10 container text-center">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
              Let's Work Together
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 max-w-3xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
              Ready to Make Your Event Extraordinary?
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
              Get a free, no-obligation quote in 24 hours. We serve Mesa, Phoenix, Scottsdale, Chandler, and Gilbert.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-terracotta text-sm">
                Request a Free Quote <ArrowRight size={16} />
              </Link>
              <a href="tel:+14807181671" className="btn-outline text-sm" style={{ borderColor: "rgba(245,239,224,0.5)", color: "#F5EFE0" }}>
                <Phone size={14} /> (480) 718-1671
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
