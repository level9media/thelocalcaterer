/*
 * Navigation — Modern Farmhouse Premium
 * Transparent on hero, solid cream on scroll
 * Services dropdown, mobile hamburger menu
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const services = [
  { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
  { label: "Corporate Catering", href: "/corporate-event-catering" },
  { label: "Private Events", href: "/private-event-catering" },
  { label: "Private Parties", href: "/private-party-catering" },
  { label: "Baby Shower Catering", href: "/baby-shower-catering" },
  { label: "Celebration of Life", href: "/celebration-of-life-catering" },
  { label: "BBQ Catering", href: "/barbecue-catering" },
];

const locations = [
  { label: "Mesa, AZ", href: "/catering-mesa-az" },
  { label: "Phoenix, AZ", href: "/catering-phoenix-az" },
  { label: "Scottsdale, AZ", href: "/catering-scottsdale-az" },
  { label: "Chandler, AZ", href: "/catering-chandler-az" },
  { label: "Gilbert, AZ", href: "/catering-gilbert-az" },
];

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [location] = useLocation();
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locationsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = useCallback(() => {
    if (servicesTimer.current) clearTimeout(servicesTimer.current);
    setServicesOpen(true);
  }, []);
  const closeServices = useCallback(() => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 250);
  }, []);
  const openLocations = useCallback(() => {
    if (locationsTimer.current) clearTimeout(locationsTimer.current);
    setLocationsOpen(true);
  }, []);
  const closeLocations = useCallback(() => {
    locationsTimer.current = setTimeout(() => setLocationsOpen(false), 250);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setLocationsOpen(false);
  }, [location]);

  const isTransparent = transparent && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-[#F5EFE0] shadow-sm border-b border-[#E0D5C0]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/thelocalcaterer-logo-transparent_51476b02.png"
              alt="The Local Caterer"
              className="h-12 md:h-14 w-auto object-contain"
              style={{
                filter: isTransparent ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium uppercase tracking-widest transition-colors ${
                  isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
              >
                Services <ChevronDown size={14} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#F5EFE0] border border-[#E0D5C0] shadow-lg z-50">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#2D6A4F] hover:text-white transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/catering-menu"
              className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
            >
              Menu
            </Link>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={openLocations}
              onMouseLeave={closeLocations}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium uppercase tracking-widest transition-colors ${
                  isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
              >
                Locations <ChevronDown size={14} />
              </button>
              {locationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#F5EFE0] border border-[#E0D5C0] shadow-lg z-50">
                  {locations.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#2D6A4F] hover:text-white transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
            >
              About
            </Link>

            <Link
              href="/gallery"
              className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
            >
              Gallery
            </Link>

            <Link
              href="/press"
              className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-[#1A1A1A] hover:text-[#2D6A4F]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem" }}
            >
              Press
            </Link>
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+14807181671"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-[#2D6A4F] hover:text-[#1A1A1A]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <Phone size={14} />
              (480) 718-1671
            </a>
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
              Request a Quote
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isTransparent ? "text-white" : "text-[#1A1A1A]"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F5EFE0] border-t border-[#E0D5C0] shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-widest text-[#2D6A4F] font-semibold px-2 py-1 mt-2">
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {s.label}
              </Link>
            ))}
            <hr className="border-[#E0D5C0] my-2" />
            <Link href="/catering-menu" className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium">
              Menu
            </Link>
            <Link href="/about" className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium">
              About
            </Link>
            <Link href="/gallery" className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium">
              Gallery
            </Link>
            <Link href="/press" className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium">
              Press
            </Link>
            <p className="text-[10px] uppercase tracking-widest text-[#2D6A4F] font-semibold px-2 py-1 mt-2">
              Locations
            </p>
            {locations.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-2 py-2 text-sm text-[#1A1A1A] hover:text-[#2D6A4F] font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-[#E0D5C0] my-2" />
            <a href="tel:+14807181671" className="px-2 py-2 text-sm text-[#2D6A4F] font-semibold flex items-center gap-2">
              <Phone size={14} /> (480) 718-1671
            </a>
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-primary text-center mt-2">
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
