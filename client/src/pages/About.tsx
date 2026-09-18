/*
 * About Page — Modern Farmhouse Premium
 */
import { Link } from "wouter";
import { ArrowRight, Award, Users, Heart, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CHEF_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/josh_white_chef_c8790cd5.webp";
const JOSH_KITCHEN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/josh_kitchen_aa6ffd18.webp";
const KASANDRA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/kasandra_black_07014803.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";
const CATERING_REAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_6738_7f143df1.webp";

const values = [
  { icon: <Heart size={22} />, title: "Passion for Food", desc: "Every dish we create is made with genuine love for the craft of cooking and a commitment to quality ingredients." },
  { icon: <Users size={22} />, title: "Community First", desc: "We're proud to be a Mesa-based business serving our neighbors across the East Valley and greater Phoenix area." },
  { icon: <Award size={22} />, title: "Excellence Always", desc: "From the first inquiry to the final cleanup, we hold ourselves to the highest standards of service and professionalism." },
  { icon: <Star size={22} />, title: "5-Star Experience", desc: "Our hundreds of five-star reviews reflect our unwavering commitment to making every client's event extraordinary." },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="About The Local Caterer | Mesa AZ Catering Company"
        description="Meet Chef Josh Bakken and the team behind The Local Caterer — Mesa Arizona's premier catering company. 500+ events catered, 5-star rated. Our story, values, and commitment to excellence."
        canonical="/about"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.75)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link> / About
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            About The Local Caterer
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
            Mesa's premier catering company, built on a passion for food and a commitment to community.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Our Story</p>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Born in Mesa.<br />Built on Flavor.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                The Local Caterer was founded with a simple mission: to bring restaurant-quality food and hospitality to events of all sizes across the East Valley. What started as a passion project has grown into Mesa's most trusted catering company, with hundreds of events under our belt and thousands of satisfied guests.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                Our team is made up of experienced culinary professionals who share a love for great food and exceptional service. We believe that catering is about more than just feeding people — it's about creating an experience that enhances your event and leaves a lasting impression.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                As part of the Bakken Hospitality family of brands, we bring institutional knowledge and operational excellence to every event, while maintaining the personal touch and community focus that makes us uniquely local.
              </p>
              <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Work With Us <ArrowRight size={14} />
              </a>
            </div>
            <div className="relative">
              <img src={CHEF_IMG} alt="Chef at The Local Caterer" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 hidden lg:block p-6" style={{ backgroundColor: "#C1440E" }}>
                <p className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}>500+</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif" }}>Events Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>What We Stand For</p>
            <h2 className="text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-8 text-center" style={{ backgroundColor: "#F5EFE0" }}>
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "#2D6A4F", color: "#F5EFE0" }}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img src={CHEF_IMG} alt="Chef Josh Bakken, The Local Caterer" className="w-full h-64 object-cover" loading="lazy" />
            <img src={KASANDRA_IMG} alt="Kasandra Bakken, The Local Caterer" className="w-full h-64 object-cover" loading="lazy" />
            <img src={JOSH_KITCHEN_IMG} alt="Chef Josh in the kitchen" className="w-full h-64 object-cover hidden md:block" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#1B4332" }}>
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Let's Create Something Memorable
          </h2>
          <p className="mb-8" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
            Contact us today to start planning your next event.
          </p>
          <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
            Request a Quote <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
