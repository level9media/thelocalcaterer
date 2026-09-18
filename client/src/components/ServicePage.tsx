/*
 * ServicePage — Reusable template for all service detail pages
 * Includes SEO meta tags, JSON-LD schema, breadcrumbs, canonical
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SEO from "./SEO";

interface FaqItem {
  q: string;
  a: string;
}

interface ServicePageProps {
  title: string;
  subtitle?: string;
  heroImg: string;
  intro: string;
  body: string;
  features: string[];
  faqs?: FaqItem[];
  relatedServices?: { label: string; href: string }[];
  // SEO props
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  serviceType?: string;
}

export default function ServicePage({
  title,
  subtitle,
  heroImg,
  intro,
  body,
  features,
  faqs,
  relatedServices,
  metaTitle,
  metaDescription,
  canonical,
  serviceType,
}: ServicePageProps) {
  const seoTitle = metaTitle || `${title} in Mesa AZ | The Local Caterer`;
  const seoDesc = metaDescription || `${subtitle || intro} Serving Mesa, Phoenix, Scottsdale, Chandler & Gilbert, AZ. Get a free quote from The Local Caterer.`;

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: seoDesc,
    provider: {
      "@type": "LocalBusiness",
      name: "The Local Caterer",
      url: "https://www.thelocalcaterer.com",
      telephone: "(480) 718-1671",
    },
    areaServed: ["Mesa, AZ", "Phoenix, AZ", "Scottsdale, AZ", "Chandler, AZ", "Gilbert, AZ"],
    serviceType: serviceType || "Catering",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={canonical}
        image={heroImg}
        schema={faqSchema ? [serviceSchema, faqSchema] : serviceSchema}
        breadcrumbs={[
          { name: "Services", url: "/services" },
          { name: title, url: canonical || "" },
        ]}
      />
      <Navigation />
      <section className="relative pt-32 pb-20" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.75)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            {" / "}<Link href="/services" className="hover:text-white/80 transition-colors">Services</Link>
            {" / "}{title}
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>{title}</h1>
          {subtitle && <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>{subtitle}</p>}
          <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">Request a Quote <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>{intro}</h2>
              {body.split("\n\n").map((p, i) => (
                <p key={i} className="text-base leading-relaxed mb-5" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>{p}</p>
              ))}
              <h3 className="text-2xl font-semibold mt-10 mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4" style={{ backgroundColor: "#EDE6D3" }}>
                    <CheckCircle2 size={16} style={{ color: "#2D6A4F" }} className="shrink-0 mt-0.5" />
                    <span className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="p-8 mb-6" style={{ backgroundColor: "#2D6A4F" }}>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>Get a Free Quote</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>Ready to book? Contact us today for a no-obligation quote.</p>
                <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta w-full justify-center">Request a Quote</a>
              </div>
              {relatedServices && relatedServices.length > 0 && (
                <div className="p-6" style={{ backgroundColor: "#EDE6D3" }}>
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Other Services</h4>
                  <div className="flex flex-col gap-2">
                    {relatedServices.map((s) => (
                      <Link key={s.href} href={s.href} className="text-sm flex items-center gap-2 hover:text-[#2D6A4F] transition-colors" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                        <ArrowRight size={12} /> {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {faqs && faqs.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#EDE6D3" }}>
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-10 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Frequently Asked Questions</h2>
              <div className="flex flex-col gap-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6" style={{ backgroundColor: "#fff" }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>{faq.q}</h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#444" }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16" style={{ backgroundColor: "#1B4332" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>Ready to Book Your Event?</h2>
          <p className="mb-8" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>Contact us today for a free, no-obligation catering quote.</p>
          <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">Request a Free Quote <ArrowRight size={16} /></a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
