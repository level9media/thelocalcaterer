/*
 * LocationPage — Reusable template for all 5 location pages
 * Full SEO: meta tags, canonical, JSON-LD LocalBusiness + Service + FAQPage schema, breadcrumbs
 * Internal linking: related services + location cross-links
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SEO from "./SEO";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";

export interface LocationFaq {
  question: string;
  answer: string;
}

interface LocationPageProps {
  city: string;
  state?: string;
  headline: string;
  intro: string;
  body: string;
  services: string[];
  nearbyAreas: string[];
  canonical: string;
  metaTitle?: string;
  metaDesc?: string;
  faqs?: LocationFaq[];
}

const SERVICE_LINKS = [
  { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
  { label: "Corporate Catering", href: "/corporate-event-catering" },
  { label: "Private Events", href: "/private-event-catering" },
];

const LOCATION_LINKS = [
  { label: "Catering in Mesa, AZ", href: "/catering-mesa-az" },
  { label: "Catering in Phoenix, AZ", href: "/catering-phoenix-az" },
  { label: "Catering in Scottsdale, AZ", href: "/catering-scottsdale-az" },
  { label: "Catering in Chandler, AZ", href: "/catering-chandler-az" },
  { label: "Catering in Gilbert, AZ", href: "/catering-gilbert-az" },
];

function FaqItem({ faq }: { faq: LocationFaq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#D4C9A8" }}>
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold pr-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}>
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          style={{ color: "#2D6A4F", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#555" }}>
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export default function LocationPage({
  city,
  state = "AZ",
  headline,
  intro,
  body,
  services,
  nearbyAreas,
  canonical,
  metaTitle,
  metaDesc,
  faqs = [],
}: LocationPageProps) {
  const seoTitle = metaTitle || `Catering in ${city}, ${state} | The Local Caterer — Events & Weddings`;
  const seoDesc = metaDesc || `The Local Caterer provides premium catering in ${city}, ${state}. Weddings, corporate events, private parties & more. Chef-crafted menus, professional service. Call (480) 718-1671.`;

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Catering in ${city}, ${state}`,
    description: seoDesc,
    provider: {
      "@type": "LocalBusiness",
      name: "The Local Caterer",
      url: "https://www.thelocalcaterer.com",
      telephone: "(480) 718-1671",
    },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Arizona" },
    },
    serviceType: "Catering",
  };

  const faqSchema = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const schemas = faqSchema ? [localSchema, faqSchema] : localSchema;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonical}
        schema={schemas}
        breadcrumbs={[
          { name: `Catering in ${city}, ${state}`, url: canonical },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.75)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            {" / "}Catering in {city}, {state}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            {headline}
          </h1>
          <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
            {intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
              Request a Quote <ArrowRight size={16} />
            </a>
            <a href="tel:+14807181671" className="btn-outline" style={{ borderColor: "rgba(245,239,224,0.5)", color: "#F5EFE0" }}>
              <Phone size={14} /> (480) 718-1671
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Premier Catering Services in {city}, {state}
              </h2>
              <div className="prose prose-lg max-w-none" style={{ fontFamily: "'Outfit', sans-serif", color: "#444" }}>
                {body.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-5 leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Services in this area */}
              <h3 className="text-2xl font-semibold mt-10 mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Catering Services Available in {city}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-3 p-4" style={{ backgroundColor: "#EDE6D3" }}>
                    <CheckCircle2 size={16} style={{ color: "#2D6A4F" }} className="shrink-0" />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Internal linking — service pages */}
              <div className="mb-10 p-6" style={{ backgroundColor: "#EDE6D3" }}>
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                  Explore Our Catering Services
                </h3>
                <div className="flex flex-col gap-2">
                  {SERVICE_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                      <ArrowRight size={13} /> {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ section */}
              {faqs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                    Frequently Asked Questions — Catering in {city}
                  </h3>
                  <div>
                    {faqs.map((faq, i) => (
                      <FaqItem key={i} faq={faq} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Quick contact card */}
              <div className="p-8 mb-6" style={{ backgroundColor: "#2D6A4F" }}>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                  Get a Free Quote
                </h3>
                <p className="text-sm mb-5" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
                  Tell us about your event and we'll get back to you within 24 hours.
                </p>
                <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta w-full justify-center mb-4">
                  Request a Quote
                </a>
                <a href="tel:+14807181671" className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
                  <Phone size={14} /> (480) 718-1671
                </a>
              </div>

              {/* Other locations */}
              <div className="p-6 mb-6" style={{ backgroundColor: "#EDE6D3" }}>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                  We Also Serve
                </h4>
                <div className="flex flex-col gap-2">
                  {LOCATION_LINKS.filter((l) => !l.href.includes(city.toLowerCase())).map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm hover:underline" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                      <MapPin size={13} style={{ color: "#C1440E" }} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nearby areas */}
              <div className="p-6" style={{ backgroundColor: "#EDE6D3" }}>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                  Also Serving Nearby
                </h4>
                <div className="flex flex-col gap-2">
                  {nearbyAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-sm" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                      <MapPin size={13} style={{ color: "#C1440E" }} />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#1B4332" }}>
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Ready to Book Your {city} Event?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
            Contact us today for a free, no-obligation catering quote.
          </p>
          <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
            Request a Free Quote <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
