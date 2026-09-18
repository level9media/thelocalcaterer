/**
 * Careers Page — The Local Caterer
 * Open positions + application form
 */
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Clock, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main-2NrdsAxk2mxoCbjbUW6KXF.webp";

const openPositions = [
  {
    id: "service-ambassador",
    title: "Service Ambassador (Service Staff)",
    type: "Part-Time / On-Call",
    location: "Mesa, AZ (East Valley)",
    pay: "Pay Based on Experience",
    description:
      "Join our front-of-house team and help create exceptional guest experiences at weddings, corporate events, and private gatherings throughout the Valley. As a Service Ambassador, you'll represent The Local Caterer with professionalism, hospitality, and attention to detail while ensuring every guest feels genuinely cared for.",
    responsibilities: [
      "Set up, maintain, and break down event spaces according to event plans",
      "Provide professional food and beverage service",
      "Deliver warm, attentive hospitality to every guest",
      "Maintain cleanliness and organization throughout the event",
      "Communicate effectively with the Culinary Crew and Event Lead",
      "Represent The Local Caterer with professionalism and integrity",
    ],
    requirements: [
      "Previous hospitality, banquet, or restaurant experience preferred",
      "Reliable transportation to event locations",
      "Ability to stand, walk, and carry trays for extended periods",
      "Flexible availability, including evenings and weekends",
      "Food Handler's Card (or willingness to obtain)",
      "Positive attitude with a heart for serving others",
    ],
  },
  {
    id: "culinary-crew",
    title: "Culinary Crew (Prep Cook)",
    type: "Part-Time / On-Call",
    location: "Mesa, AZ (East Valley)",
    pay: "Pay Based on Experience",
    description:
      "Join our back-of-house team and help prepare exceptional food for weddings, corporate events, and private gatherings across the Valley. As a member of the Culinary Crew, you'll work alongside experienced chefs in a fast-paced, high-standard kitchen where consistency, teamwork, and excellence matter.",
    responsibilities: [
      "Prepare ingredients and complete daily prep assignments",
      "Follow recipes and chef instructions with consistency",
      "Maintain cleanliness and organization throughout the kitchen",
      "Properly label, rotate, and store food according to food safety standards",
      "Assist with event packing and production as needed",
      "Support the team in delivering exceptional catering experiences",
    ],
    requirements: [
      "Previous kitchen or food preparation experience preferred",
      "Ability to work efficiently in a fast-paced environment",
      "Strong attention to detail and organization",
      "Ability to stand for extended periods and lift up to 50 pounds",
      "Food Handler's Card (or willingness to obtain)",
      "Positive attitude, reliability, and willingness to learn",
    ],
  },
];

const perks = [
  "Competitive hourly pay + tips",
  "Flexible scheduling — work events that fit your life",
  "Work alongside a passionate, tight-knit team",
  "Gain experience at high-end weddings and corporate events",
  "Opportunities to grow into leadership roles",
  "Free meals at events",
];

function PositionCard({ position }: { position: typeof openPositions[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#E8DFC8] bg-white overflow-hidden transition-shadow hover:shadow-md"
      style={{ borderRadius: 0 }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex-1">
          <h3
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
          >
            {position.title}
          </h3>
          <div className="flex flex-wrap gap-4 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="flex items-center gap-1.5" style={{ color: "#2D6A4F" }}>
              <Clock size={13} /> {position.type}
            </span>
            <span className="flex items-center gap-1.5" style={{ color: "#555" }}>
              <MapPin size={13} /> {position.location}
            </span>
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#C1440E" }}>
              <DollarSign size={13} /> {position.pay}
            </span>
          </div>
        </div>
        <div className="mt-1 flex-shrink-0" style={{ color: "#2D6A4F" }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[#E8DFC8]">
          <p className="text-sm leading-relaxed mt-4 mb-5" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
            {position.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                Responsibilities
              </h4>
              <ul className="space-y-2">
                {position.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#2D6A4F" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                Requirements
              </h4>
              <ul className="space-y-2">
                {position.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#C1440E" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={`#apply`}
            onClick={() => {
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
              // Pre-select this position in the form
              const select = document.getElementById("position-select") as HTMLSelectElement;
              if (select) select.value = position.title;
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest px-6 py-3 transition-colors"
            style={{ backgroundColor: "#2D6A4F", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
          >
            Apply for This Position <ArrowRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Careers() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    availability: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.careers.submitApplication.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", position: "", experience: "", availability: "", message: "" });
    },
    onError: (err: { message?: string }) => {
      setError(err.message || "Something went wrong. Please try again.");
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.position) {
      setError("Please fill in your name, email, and the position you're applying for.");
      return;
    }
    submitMutation.mutate(form);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Careers at The Local Caterer | Jobs in Mesa, AZ"
        description="Join The Local Caterer team. We're hiring event servers, prep cooks, and catering coordinators in Mesa, AZ. Apply online today."
        canonical="/careers"
        keywords="catering jobs mesa az, event server jobs arizona, catering staff hiring, food service jobs east valley"
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="The Local Caterer team at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,25,15,0.78) 0%, rgba(10,25,15,0.4) 100%)" }} />
        <div className="relative z-10 container pt-20">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
            Join Our Team
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Careers at The Local Caterer
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
            Why Work With Us
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
            Be Part of Something Delicious
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
            At The Local Caterer, we believe great food starts with great people. We're a Mesa-based team that takes pride in every event we serve — from intimate backyard dinners to 500-person corporate galas. If you love food, people, and the energy of live events, we want to hear from you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#2D6A4F" }} />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
            Now Hiring
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
            Open Positions
          </h2>
          <div className="space-y-4">
            {openPositions.map((pos) => (
              <PositionCard key={pos.id} position={pos} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="py-16 md:py-24" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
            Apply Now
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
            Submit Your Application
          </h2>
          <p className="text-sm mb-8" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
            Fill out the form below and our team will be in touch within 2–3 business days.
          </p>

          {submitted ? (
            <div className="p-8 text-center" style={{ backgroundColor: "#2D6A4F" }}>
              <CheckCircle2 size={40} className="mx-auto mb-4" style={{ color: "#F5EFE0" }} />
              <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                Application Received!
              </h3>
              <p className="text-sm" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                Thank you for your interest in joining The Local Caterer team. We'll review your application and reach out within 2–3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@email.com"
                    className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(480) 555-0100"
                    className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                    Position Applying For *
                  </label>
                  <select
                    id="position-select"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif", color: form.position ? "#1A1A1A" : "#999" }}
                  >
                    <option value="">Select a position…</option>
                    {openPositions.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="General Application">General Application (no specific role)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                  Years of Experience in Food Service / Events
                </label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif", color: form.experience ? "#1A1A1A" : "#999" }}
                >
                  <option value="">Select…</option>
                  <option value="No experience (willing to learn)">No experience (willing to learn)</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1–2 years">1–2 years</option>
                  <option value="3–5 years">3–5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                  Availability
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif", color: form.availability ? "#1A1A1A" : "#999" }}
                >
                  <option value="">Select…</option>
                  <option value="Weekends only">Weekends only</option>
                  <option value="Weekdays only">Weekdays only</option>
                  <option value="Weekdays + weekends">Weekdays + weekends</option>
                  <option value="Evenings and weekends">Evenings and weekends</option>
                  <option value="Flexible / open availability">Flexible / open availability</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                  Tell Us About Yourself
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share a bit about your background, why you want to join our team, or anything else you'd like us to know…"
                  className="w-full px-4 py-3 border border-[#D4C9B0] bg-white text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors resize-none"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}
                />
              </div>

              {error && (
                <p className="text-sm" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-4 text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{ backgroundColor: "#2D6A4F", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
              >
                {submitMutation.isPending ? "Submitting…" : <>Submit Application <ArrowRight size={14} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
