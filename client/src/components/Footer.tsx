/*
 * Site-wide Footer — crawlable link directory for every indexable public route.
 */
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_SECTIONS, getFooterLinks } from "@shared/seoRoutes";

const phoneDisplay = "(480) 718-1671";
const phoneHref = "tel:+14807181671";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1B4332", color: "#F5EFE0" }}>
      <section style={{ backgroundColor: "#C1440E" }} className="py-5">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-lg font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>
            Ready to book your event?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#C1440E] transition-colors hover:bg-[#F5EFE0]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Request a Quote
            </a>
            <a
              href={phoneHref}
              className="flex items-center gap-2 border border-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <Phone size={13} /> Call Now
            </a>
          </div>
        </div>
      </section>

      <div className="container py-14">
        <div className="mb-12 grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_2fr]">
          <section>
            <a href="/" className="inline-block" aria-label="The Local Caterer home">
              <h2 className="mb-3 text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                The Local Caterer
              </h2>
            </a>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(245,239,224,0.72)", fontFamily: "'Outfit', sans-serif" }}>
              Chef-crafted catering for weddings, corporate events, and private gatherings throughout Mesa and the East Valley.
            </p>
            <div className="mb-6 flex gap-3">
              <a href="https://www.instagram.com/thelocalcaterer" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 transition-colors hover:border-white/60 hover:bg-white/10" aria-label="The Local Caterer on Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/thelocalcatereraz" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/20 transition-colors hover:border-white/60 hover:bg-white/10" aria-label="The Local Caterer on Facebook">
                <Facebook size={16} />
              </a>
            </div>
            <address className="not-italic" style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(245,239,224,0.82)" }}>
              <a href={phoneHref} className="mb-3 flex items-start gap-3 text-sm transition-colors hover:text-white">
                <Phone size={15} className="mt-0.5 shrink-0" /> {phoneDisplay}
              </a>
              <a href="mailto:info@thelocalcaterer.com" className="mb-3 flex items-start gap-3 text-sm transition-colors hover:text-white">
                <Mail size={15} className="mt-0.5 shrink-0" /> info@thelocalcaterer.com
              </a>
              <span className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0" /> Mesa, Arizona
              </span>
            </address>
          </section>

          <nav aria-label="Complete site directory" className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => {
              const links = getFooterLinks(section);
              return (
                <section key={section}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,239,224,0.52)", fontFamily: "'Outfit', sans-serif" }}>
                    {section}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {links.map((link) => (
                      <li key={link.path}>
                        <a href={link.path} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(245,239,224,0.76)", fontFamily: "'Outfit', sans-serif" }}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs" style={{ color: "rgba(245,239,224,0.45)", fontFamily: "'Outfit', sans-serif" }}>
            © {year} The Local Caterer. All rights reserved.
          </p>
          <p className="text-xs text-center" style={{ color: "rgba(245,239,224,0.45)", fontFamily: "'Outfit', sans-serif" }}>
            Part of the <a href="https://bakkenhospitality.com" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white/70">Bakken Hospitality</a> family of brands · Site built &amp; managed by <a href="https://levelninemedia.com" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white/70">Level Nine Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
