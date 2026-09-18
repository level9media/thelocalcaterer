import { Link } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default function ContactThanks() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5EFE0" }}>
      <Navigation />
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="text-center max-w-lg px-6">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#2D6A4F" }}>
            <CheckCircle2 size={32} color="#F5EFE0" />
          </div>
          <h1 className="text-4xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Thank You!</h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
            We've received your inquiry and will get back to you within 24 hours with a custom quote. We look forward to making your event extraordinary.
          </p>
          <Link href="/" className="btn-primary">Back to Home <ArrowRight size={14} /></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
