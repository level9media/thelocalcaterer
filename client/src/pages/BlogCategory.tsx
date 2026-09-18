import { useParams, Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";

const categoryLabels: Record<string, string> = {
  "wedding-catering": "Wedding Catering",
  "corporate-catering": "Corporate Catering",
  "food-blogging-mesa": "Food & Mesa",
  "private-event-catering": "Private Event Catering",
  "holiday-catering": "Holiday Catering",
  "personal-press-awards": "Press & Awards",
};

export default function BlogCategory() {
  const params = useParams<{ category: string }>();
  const category = params.category || "";
  const label = categoryLabels[category] || category;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <Navigation />
      <section className="relative pt-32 pb-16" style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.78)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link> / {label}
          </p>
          <h1 className="text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            {label}
          </h1>
        </div>
      </section>
      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container text-center">
          <p className="text-base mb-8" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
            Browse all posts in the {label} category.
          </p>
          <Link href="/blog" className="btn-primary">
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
