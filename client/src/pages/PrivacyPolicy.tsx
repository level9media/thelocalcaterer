import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <Navigation />
      <div className="container py-32 max-w-3xl">
        <h1 className="text-4xl font-semibold mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Privacy Policy</h1>
        <div className="prose max-w-none" style={{ fontFamily: "'Outfit', sans-serif", color: "#444" }}>
          <p className="mb-5 leading-relaxed">Last updated: January 1, 2025</p>
          <p className="mb-5 leading-relaxed">The Local Caterer ("we," "us," or "our") operates the website thelocalcaterer.com. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Information We Collect</h2>
          <p className="mb-5 leading-relaxed">We collect information you provide directly to us, such as when you fill out a contact form or request a quote. This may include your name, email address, phone number, and event details.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>How We Use Your Information</h2>
          <p className="mb-5 leading-relaxed">We use the information we collect to respond to your inquiries, provide catering quotes, and communicate with you about our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Contact Us</h2>
          <p className="mb-5 leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@thelocalcaterer.com" className="text-[#2D6A4F] underline">info@thelocalcaterer.com</a> or call <a href="tel:+14807181671" className="text-[#2D6A4F] underline">(480) 718-1671</a>.</p>
        </div>
        <Link href="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
      <Footer />
    </div>
  );
}
