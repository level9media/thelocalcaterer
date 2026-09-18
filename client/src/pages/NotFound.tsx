import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5EFE0" }}>
      <Navigation />
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="text-center max-w-lg px-6">
          <p className="text-8xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E0D5C0" }}>404</p>
          <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Page Not Found</h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Back to Home <ArrowRight size={14} /></Link>
            <Link href="/contact" className="btn-outline">Request a Quote</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
