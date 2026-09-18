/*
 * Contact Page — Lead Capture Form
 * Modern Farmhouse Premium design
 * Wired to tRPC contact.caterer → Mailchimp + owner notification
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import SEO from "@/components/SEO";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";

export default function Contact() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "", eventDate: "", guestCount: "", message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitContact = trpc.contact.caterer.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitContact.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate,
        guestCount: form.guestCount,
        message: form.message,
      });
      navigate("/contact/thanks");
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please call us at (480) 718-1671 or try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors bg-white";
  const labelClass = "block text-xs uppercase tracking-widest font-semibold mb-1.5";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Contact The Local Caterer | Request a Catering Quote in Mesa AZ"
        description="Request a free catering quote from The Local Caterer in Mesa, AZ. Weddings, corporate events, private parties & more. We respond within 24 hours. Call (480) 718-1671."
        canonical="/contact"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16" style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.78)" }} />
        <div className="relative z-10 container">
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Request a Quote
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
            Tell us about your event and we'll get back to you within 24 hours with a custom quote.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10">
                <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                  Event Inquiry Form
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }} placeholder="(480) 000-0000" />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Event Type *</label>
                    <select name="eventType" required value={form.eventType} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: form.eventType ? "#1A1A1A" : "#999", fontFamily: "'Outfit', sans-serif" }}>
                      <option value="">Select event type</option>
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Private Party</option>
                      <option>Baby Shower</option>
                      <option>Celebration of Life</option>
                      <option>BBQ / Outdoor Event</option>
                      <option>Holiday Party</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Event Date</label>
                    <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Estimated Guest Count</label>
                    <input type="number" name="guestCount" value={form.guestCount} onChange={handleChange} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }} placeholder="e.g. 50" min="1" />
                  </div>
                </div>
                <div className="mb-8">
                  <label className={labelClass} style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Tell Us About Your Event</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} className={inputClass} style={{ borderColor: "#E0D5C0", color: "#1A1A1A", fontFamily: "'Outfit', sans-serif", resize: "vertical" }} placeholder="Share any details about your event, venue, dietary restrictions, or special requests..." />
                </div>
                {error && (
                  <p className="text-sm mb-4 p-3 bg-red-50 border border-red-200 text-red-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {error}
                  </p>
                )}
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-sm">
                  {submitting ? "Sending..." : (<>Submit Inquiry <ArrowRight size={16} /></>)}
                </button>
                <p className="text-xs mt-4 text-center" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                  We respond to all inquiries within 24 hours.
                </p>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="p-8" style={{ backgroundColor: "#2D6A4F" }}>
                <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>Contact Information</h3>
                <div className="flex flex-col gap-5">
                  <a href="tel:+14807181671" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                    <Phone size={16} className="mt-0.5 shrink-0" style={{ color: "#C1440E" }} />
                    (480) 718-1671
                  </a>
                  <a href="mailto:josh@thelocalcaterer.com" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                    <Mail size={16} className="mt-0.5 shrink-0" style={{ color: "#C1440E" }} />
                    josh@thelocalcaterer.com
                  </a>
                  <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                    <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#C1440E" }} />
                    Mesa, Arizona<br />Serving the Greater Phoenix Area
                  </div>
                  <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                    <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "#C1440E" }} />
                    Mon–Sat: 8am – 8pm<br />Sun: 10am – 5pm
                  </div>
                </div>
              </div>

              <div className="p-8" style={{ backgroundColor: "#EDE6D3" }}>
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>What Happens Next?</h3>
                <ol className="flex flex-col gap-4">
                  {["We review your inquiry within 24 hours", "We reach out to discuss your event details", "We send you a custom, no-obligation quote", "You book and we handle the rest"].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: "#2D6A4F", color: "#F5EFE0" }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
