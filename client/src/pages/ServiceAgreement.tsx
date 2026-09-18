/*
 * Service Agreement Page — The Local Caterer
 * Full contract content with branded layout and PDF download
 */
import { useEffect } from "react";
import { FileText, Download, Phone, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const sections = [
  {
    number: "1",
    title: "Agreement Overview",
    content: (
      <div className="space-y-3">
        <p>This Service Agreement ("Agreement") is entered into between The Local Caterer ("Company") and the Client. By approving a proposal, signing a contract, or submitting payment, Client agrees to all terms outlined herein.</p>
        <p>All services ("Services") will be executed in accordance with the finalized Banquet Event Order (BEO), which serves as the governing document for the event.</p>
      </div>
    ),
  },
  {
    number: "2",
    title: "Services Provided",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>2.1 Pick-Up Service</h3>
          <p className="mb-2">Client may pick up food from the Company's kitchen either hot or cold.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reheating instructions will be provided for cold items</li>
            <li>Upon pickup, Client assumes full responsibility for food handling, storage, reheating, and food safety</li>
            <li>The Company is not liable for food quality or safety after pickup</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>2.2 Drop-Off Service</h3>
          <p className="mb-2">Food will be delivered to the Client's event location.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Items may be delivered hot or cold</li>
            <li>Reheating instructions provided when applicable</li>
            <li>Disposable chafer kits available for an additional fee</li>
            <li>Upon delivery, Client assumes responsibility for maintaining safe food temperatures</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>2.3 Service Styles</h3>
          <p className="mb-2">Available service formats include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Self-Serve Buffet</li>
            <li>Staffed Buffet</li>
            <li>China Service (Self-Serve or Staffed)</li>
            <li>Family-Style Service</li>
            <li>Fully Plated Service</li>
            <li>Private Chef / Private Dinner</li>
          </ul>
          <p className="mt-2">All service details, staffing levels, and execution plans will be defined in the BEO.</p>
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "Service Charge (Non-Gratuity)",
    content: (
      <div className="space-y-3">
        <p>A <strong>20% service charge</strong> will be added to all events.</p>
        <p>This service charge is a mandatory fee, is not a gratuity, and is not distributed as tips to service staff.</p>
        <p>The service charge supports the operational and administrative work required to execute the event, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Event planning and coordination</li>
          <li>Banquet Event Order (BEO) creation and revisions</li>
          <li>Client communication and consultation</li>
          <li>Menu development and customization</li>
          <li>Front-of-house preparation and event setup planning</li>
          <li>Scheduling and management of service staff</li>
          <li>Office labor and administrative overhead</li>
        </ul>
        <p>Gratuity is not included and not expected, but may be provided at the Client's discretion.</p>
        <p>The Company reserves the right to adjust the service charge based on event complexity, scope, or special requirements.</p>
      </div>
    ),
  },
  {
    number: "4",
    title: "Staffing",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Service staff are billed at <strong>$25 per staff member, per hour</strong>, unless otherwise specified</li>
        <li>Certain service styles require mandatory staffing, which will be outlined in the proposal and BEO</li>
        <li>Once approved, staffing levels are final and required for proper service execution</li>
      </ul>
    ),
  },
  {
    number: "5",
    title: "Delivery Fees",
    content: (
      <div className="space-y-3">
        <p>Delivery fees apply unless explicitly waived in writing:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <thead>
              <tr style={{ backgroundColor: "#2D6A4F" }}>
                <th className="text-left px-4 py-2 text-white font-semibold">Distance</th>
                <th className="text-left px-4 py-2 text-white font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0–10 miles", "$25"],
                ["10–20 miles", "$50"],
                ["20–30 miles", "$75"],
                ["30–40 miles", "$100"],
                ["40–50 miles", "$125"],
              ].map(([dist, fee], i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#F5EFE0" : "#EDE6D3" }}>
                  <td className="px-4 py-2" style={{ color: "#333" }}>{dist}</td>
                  <td className="px-4 py-2 font-semibold" style={{ color: "#2D6A4F" }}>{fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Additional fees may apply for extended distances, limited access locations, stairs, elevators, or multiple delivery points.</p>
      </div>
    ),
  },
  {
    number: "6",
    title: "Banquet Event Order (BEO)",
    content: (
      <div className="space-y-3">
        <p>The finalized BEO supersedes all prior communications and serves as the sole governing document for event execution.</p>
        <p>The BEO includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Menu selections</li>
          <li>Guest count</li>
          <li>Timeline and service schedule</li>
          <li>Staffing requirements</li>
          <li>Setup and breakdown details</li>
        </ul>
        <p>Client approval of the BEO constitutes full acceptance of all event details.</p>
      </div>
    ),
  },
  {
    number: "7",
    title: "Payment Terms",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-base mb-3" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>7.1 Booking & Minimum Guest Count</h3>
          <p className="mb-2">At the time of booking, the Client will provide an initial guest count. This number establishes the minimum guaranteed guest count for billing purposes.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The initial guest count may be increased at any time, subject to availability</li>
            <li>The initial guest count may not be reduced under any circumstances after booking</li>
            <li>All pricing, staffing, and preparation will be based on this minimum guest count and are subject to adjustment based on any increase in guest count</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-3" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>7.2 Deposits & Payment Schedules</h3>
          <p className="mb-3">All payments are based on the total estimated invoice and may be adjusted based on increases to the guest count and approved changes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded" style={{ backgroundColor: "#F5EFE0", border: "1px solid #D4C9A8" }}>
              <p className="font-semibold mb-2" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Events More Than 90 Days From Event Date</p>
              <ul className="space-y-1 text-sm">
                <li>• 25% non-refundable deposit due at booking</li>
                <li>• 50% due 90 days prior to the event</li>
                <li>• Remaining 25% due 14 days prior to the event</li>
              </ul>
            </div>
            <div className="p-4 rounded" style={{ backgroundColor: "#F5EFE0", border: "1px solid #D4C9A8" }}>
              <p className="font-semibold mb-2" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>Events Within 90 Days</p>
              <ul className="space-y-1 text-sm">
                <li>• 50% non-refundable deposit due at booking</li>
                <li>• Remaining 50% due 14 days prior to the event</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>7.3 Final Guest Count</h3>
          <p className="mb-2">The final guest count is due 14 days prior to the event date and becomes the final guaranteed guest count for billing purposes.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Guest count may increase up until this deadline, subject to availability</li>
            <li>After this deadline, the guest count is locked and cannot be reduced or increased</li>
            <li>Client will be billed for the final guest count or actual attendance, whichever is greater</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>7.4 Failure to Pay</h3>
          <p className="mb-2">All payments must be received by stated deadlines.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>No services will be rendered unless the account is paid in full</li>
            <li>Failure to meet payment deadlines may result in:</li>
          </ul>
          <ul className="list-disc pl-10 space-y-1 mt-1">
            <li>Cancellation of services</li>
            <li>Forfeiture of all payments made</li>
            <li>Release of the event date</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: "8",
    title: "Cancellations & Rescheduling",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>All deposits are non-refundable</li>
        <li>Cancellation results in forfeiture of all payments made</li>
        <li>Rescheduling is subject to availability, requires a <strong>25% rescheduling fee</strong>, and must be approved in writing</li>
      </ul>
    ),
  },
  {
    number: "9",
    title: "Billing & Payments",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Accepted payment methods: cash, check, or credit card</li>
        <li>Returned payments incur a <strong>$50 fee</strong> per occurrence</li>
        <li>Late payments may result in additional fees and/or cancellation</li>
      </ul>
    ),
  },
  {
    number: "10",
    title: "Equipment & Rentals",
    content: (
      <div className="space-y-2">
        <p>All Company equipment remains Company property.</p>
        <p>Client is responsible for loss, theft, and damage. Replacement or repair costs will be billed accordingly.</p>
      </div>
    ),
  },
  {
    number: "11",
    title: "Leftovers & Food Safety",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>To-go containers may be provided at Company discretion</li>
        <li>Any food removed is done so at Client's own risk</li>
        <li>The Company is not responsible for food safety after service or after food leaves Company control</li>
      </ul>
    ),
  },
  {
    number: "12",
    title: "Tastings",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Tastings are <strong>$50 per guest</strong></li>
        <li>Credited toward final invoice upon booking</li>
        <li>Pricing may vary based on menu</li>
      </ul>
    ),
  },
  {
    number: "13",
    title: "Uniforms",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Uniform standards are set by the Company</li>
        <li>Themed attire may be available for an additional fee</li>
        <li>Final approval remains with the Company</li>
      </ul>
    ),
  },
  {
    number: "14",
    title: "Holiday Surcharge",
    content: (
      <div className="space-y-2">
        <p>A <strong>25% surcharge</strong> applies to events on the following holidays:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Easter</li>
          <li>Independence Day</li>
          <li>Thanksgiving</li>
          <li>Christmas</li>
          <li>New Year's Eve</li>
          <li>New Year's Day</li>
        </ul>
      </div>
    ),
  },
  {
    number: "15",
    title: "Tax Exemption",
    content: (
      <p>Valid Arizona tax-exempt documentation must be provided prior to invoicing.</p>
    ),
  },
  {
    number: "16",
    title: "Limitation of Liability",
    content: (
      <div className="space-y-2">
        <p>The Company is not liable for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Food safety after pickup or delivery</li>
          <li>Delays outside Company control</li>
          <li>Actions of guests or third parties</li>
          <li>Improper handling of food or equipment</li>
        </ul>
      </div>
    ),
  },
  {
    number: "17",
    title: "Right to Refuse or Terminate Service",
    content: (
      <p>The Company may refuse or terminate service without refund if conditions are unsafe, illegal, or disruptive.</p>
    ),
  },
  {
    number: "18",
    title: "Policy Modifications",
    content: (
      <p>The Company reserves the right to modify these terms. The version in effect at time of agreement governs.</p>
    ),
  },
  {
    number: "19",
    title: "Venue & Site Requirements",
    content: (
      <div className="space-y-2">
        <p>Client is responsible for ensuring the venue provides:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Adequate access for loading/unloading</li>
          <li>Reasonable proximity to service areas</li>
          <li>Necessary utilities (if required)</li>
        </ul>
        <p>Additional labor or equipment required due to site conditions may result in additional charges.</p>
      </div>
    ),
  },
  {
    number: "20",
    title: "Service Timing & Food Quality",
    content: (
      <div className="space-y-2">
        <p>All service times are defined in the BEO. The Company guarantees food quality during the scheduled service window only.</p>
        <p>The Company is not responsible for food condition outside the service window, due to delays caused by Client, venue, or third parties, or after service concludes.</p>
      </div>
    ),
  },
  {
    number: "21",
    title: "Alcohol Service Policy",
    content: (
      <div className="space-y-2">
        <p>The Company does not provide or assume responsibility for alcohol unless specified in the BEO. If requested, the Company may provide or contract a bartender.</p>
        <p>In all cases:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Client provides all alcohol</li>
          <li>Client assumes all liability for alcohol service and consumption</li>
          <li>The Company is not liable for any alcohol-related incidents</li>
        </ul>
        <p>The Company reserves the right to refuse alcohol service if deemed unsafe or unlawful.</p>
      </div>
    ),
  },
  {
    number: "22",
    title: "Agreement Acceptance",
    content: (
      <p>By signing or submitting payment, Client agrees to all terms in this Agreement.</p>
    ),
  },
];

function handleDownloadPDF() {
  window.print();
}

export default function ServiceAgreement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Service Agreement | The Local Caterer — Mesa, AZ"
        description="Review The Local Caterer's full service agreement including payment terms, cancellation policy, delivery fees, and staffing rates for catering events in Mesa, Phoenix, and the East Valley."
        canonical="https://www.thelocalcaterer.com/service-agreement"
      />

      {/* Print-only styles */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { background: white !important; }
          .print-container { max-width: 100% !important; padding: 0 !important; }
          section { break-inside: avoid; }
        }
      `}</style>

      <div style={{ backgroundColor: "#F5EFE0", minHeight: "100vh" }}>
        <Navigation />

        {/* Hero Header */}
        <section className="pt-28 pb-12" style={{ backgroundColor: "#1B4332" }}>
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={28} style={{ color: "#C1440E" }} />
                  <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
                    Legal Document
                  </p>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                  Service Agreement
                </h1>
                <p className="text-base" style={{ color: "rgba(245,239,224,0.75)", fontFamily: "'Outfit', sans-serif" }}>
                  The Local Caterer · Mesa, Arizona · Effective 2026
                </p>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="no-print flex items-center gap-2 px-6 py-3 font-semibold text-sm uppercase tracking-widest transition-all hover:opacity-90"
                style={{ backgroundColor: "#C1440E", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container py-12 print-container">
          <div className="max-w-4xl mx-auto">

            {/* Intro notice */}
            <div className="mb-10 p-5 rounded" style={{ backgroundColor: "#EDE6D3", borderLeft: "4px solid #2D6A4F" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}>
                <strong>Important:</strong> This Service Agreement governs all catering services provided by The Local Caterer. By approving a proposal, signing a contract, or submitting payment, you agree to all terms outlined herein. Please read carefully before booking.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.number}
                  className="p-6 rounded"
                  style={{ backgroundColor: "#fff", border: "1px solid #E8DFC8" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: "#2D6A4F", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {section.number}
                    </div>
                    <h2
                      className="text-xl font-semibold pt-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div
                    className="pl-13 text-sm leading-relaxed"
                    style={{ color: "#444", fontFamily: "'Outfit', sans-serif", paddingLeft: "3.25rem" }}
                  >
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Signature Block */}
            <div className="mt-10 p-6 rounded" style={{ backgroundColor: "#1B4332" }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-1" style={{ color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}>Josh Bakken</p>
                  <p className="text-sm mb-3" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>The Local Caterer</p>
                  <div className="space-y-2">
                    <a href="tel:+14807181671" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                      <Phone size={14} style={{ color: "#C1440E" }} />
                      480.718.1671
                    </a>
                    <a href="https://www.thelocalcaterer.com" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
                      <Globe size={14} style={{ color: "#C1440E" }} />
                      thelocalcaterer.com
                    </a>
                  </div>
                  <p className="text-xs mt-3" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>
                    Office Hours: Monday–Friday, 9am–5pm
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,239,224,0.5)", fontFamily: "'Outfit', sans-serif" }}>Follow Us</p>
                    <p className="text-sm" style={{ color: "rgba(245,239,224,0.75)", fontFamily: "'Outfit', sans-serif" }}>IG / Twitter: @thelocalcaterer</p>
                    <p className="text-sm" style={{ color: "rgba(245,239,224,0.75)", fontFamily: "'Outfit', sans-serif" }}>Facebook: @thelocalcatereraz</p>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="no-print mt-6 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest self-start transition-all hover:opacity-90"
                    style={{ backgroundColor: "#C1440E", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Download size={14} />
                    Save as PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
