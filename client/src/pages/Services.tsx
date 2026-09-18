import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr";
const HERO = `${CDN}/hero_main_3ee61e07.webp`;
const WEDDING = `${CDN}/hero_wedding_959be23b.webp`;
const CORPORATE = `${CDN}/hero_corporate_36b8d2d9.webp`;
const CORPORATE_BUFFET = `${CDN}/img_6738_7f143df1.webp`;
const SWEET_TABLE = `${CDN}/img_3990_aa9c71eb.webp`;
const MINI_CHEESECAKES = `${CDN}/img_3984_6f626893.webp`;
const ELEGANT_DESSERT = `${CDN}/img_6983_25372b21.webp`;
const CHEF_MEATBALLS = `${CDN}/img_6809_8e13bd53.webp`;

const services = [
  { title: "Wedding Catering", desc: "Unforgettable menus for your most important day. Full-service wedding catering across the East Valley.", href: "/wedding-catering-mesa-az", img: WEDDING },
  { title: "Corporate Catering", desc: "Professional catering for office events, conferences, and corporate gatherings of all sizes.", href: "/corporate-event-catering", img: CORPORATE_BUFFET },
  { title: "Private Events", desc: "Custom catering for private parties, anniversaries, and special celebrations.", href: "/private-event-catering", img: SWEET_TABLE },
  { title: "Private Party Catering", desc: "Backyard parties, family reunions, and neighborhood gatherings done right.", href: "/private-party-catering", img: CORPORATE },
  { title: "Baby Shower Catering", desc: "Beautiful, delicious catering for baby showers and gender reveal parties.", href: "/baby-shower-catering", img: MINI_CHEESECAKES },
  { title: "Celebration of Life", desc: "Compassionate, professional catering for memorial services and celebrations of life.", href: "/celebration-of-life-catering", img: ELEGANT_DESSERT },
  { title: "BBQ Catering", desc: "Authentic Arizona BBQ catering for any outdoor event or gathering.", href: "/barbecue-catering", img: CHEF_MEATBALLS },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Catering Services Mesa AZ | The Local Caterer — Weddings, Corporate & Private Events"
        description="Full-service catering in Mesa, AZ. Wedding catering, corporate events, private parties, BBQ, baby showers & more. Serving Mesa, Phoenix, Scottsdale, Chandler & Gilbert. Get a free quote."
        canonical="/services"
      />
      <Navigation />
      <section className="relative pt-32 pb-20" style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.75)" }} />
        <div className="relative z-10 container">
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>Our Catering Services</h1>
          <p className="text-lg max-w-xl" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>Full-service catering for every occasion across Mesa, Phoenix, Scottsdale, Chandler, and Gilbert.</p>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="group block overflow-hidden bg-white">
                <div className="overflow-hidden h-52"><img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>{s.desc}</p>
                  <span className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Learn More <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: "#1B4332" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>Ready to Book?</h2>
          <p className="mb-8" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>Get a free quote for your event today.</p>
          <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">Request a Free Quote <ArrowRight size={16} /></a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
