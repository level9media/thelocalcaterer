import ServicePage from "@/components/ServicePage";
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_corporate_36b8d2d9.webp";
export default function CorporateCatering() {
  return <ServicePage
    title="Corporate Event Catering in Mesa, AZ"
    heroImg={HERO}
    subtitle="Reliable, professional catering for office events, conferences, and corporate gatherings across the East Valley."
    intro="The East Valley's Most Trusted Corporate Caterer"
    body={`The Local Caterer is the preferred corporate catering partner for businesses across Mesa, Phoenix, Scottsdale, Chandler, and Gilbert. We understand that corporate events require precision, professionalism, and reliability — and we deliver on all three, every time.

Whether you're hosting a weekly office lunch for 20 employees, a client appreciation dinner for 50, or a large-scale corporate conference for 500+, our team brings the same level of culinary excellence and professional service to every event. We are experienced with the unique demands of corporate catering: strict timelines, dietary diversity, professional presentation, and the ability to scale up or down on short notice.

Our corporate catering menus are fully customizable and built around your event's needs. We offer breakfast and brunch catering for morning meetings and training sessions, lunch buffets and box lunches for office events and team gatherings, dinner service for client entertainment and formal corporate dinners, and full-scale catering for conferences, product launches, and company celebrations.

Mesa and the East Valley are home to a thriving business community, and The Local Caterer has built strong relationships with many of the area's leading companies. We offer recurring catering contracts for businesses that need regular food service, flexible invoicing and corporate billing, and dedicated account management so your events are always handled with care.

We work with companies of all sizes — from small local businesses to large corporations with multiple locations. Our team is familiar with Mesa's major corporate campuses and office parks, and we coordinate directly with your office manager or event coordinator to ensure seamless logistics.

Dietary accommodations are always available and handled professionally. We regularly prepare gluten-free, vegan, vegetarian, nut-free, and allergy-conscious menus for corporate clients. We understand that your team is diverse and we take dietary needs seriously.

When you hire The Local Caterer for your corporate event, you get a full-service partner. We handle setup, service, and cleanup. We bring all equipment and staffing. Your team focuses on the meeting or event — we handle the food.

Call (480) 718-1671 or request a free corporate catering quote online. Same-day quotes available for most events.`}
    features={[
      "Flexible menus for any corporate event size",
      "Breakfast, lunch, dinner & full-day catering",
      "Reliable, on-time delivery and setup",
      "Professional serving staff available",
      "Dietary accommodations always included",
      "Corporate invoicing and billing available",
      "Recurring catering contracts available",
      "Large-scale event catering (500+ guests)",
      "Serving Mesa, Phoenix, Scottsdale, Chandler & Gilbert",
      "Dedicated account management",
      "Same-day quotes available",
      "Free consultation for new corporate clients",
    ]}
    faqs={[
      { q: "Do you offer recurring corporate catering contracts?", a: "Yes. We offer recurring catering contracts for businesses that need regular food service — weekly office lunches, monthly team events, or any other schedule. We provide flexible invoicing and dedicated account management for corporate clients." },
      { q: "How much lead time do you need for corporate catering?", a: "For most corporate events, we ask for at least 48–72 hours notice. For large-scale events (100+ guests), we recommend booking 1–2 weeks in advance. We can often accommodate same-day or next-day requests depending on availability." },
      { q: "Can you handle large corporate events and conferences?", a: "Absolutely. We regularly cater corporate events for 200–500+ guests. We have the staffing, equipment, and logistics experience to handle large-scale conferences, product launches, and company-wide events." },
      { q: "Do you provide corporate invoicing and billing?", a: "Yes. We offer corporate invoicing with net payment terms for established business clients. We can work with your accounts payable department and provide itemized invoices for expense reporting." },
      { q: "What types of corporate catering menus do you offer?", a: "We offer breakfast and brunch catering, box lunches, buffet-style lunch and dinner service, plated formal dinners, cocktail receptions, and full-day conference catering. All menus are fully customizable to fit your event and budget." },
    ]}
    relatedServices={[
      { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
      { label: "Private Events", href: "/private-event-catering" },
      { label: "BBQ Catering", href: "/barbecue-catering" },
    ]}
    metaTitle="Corporate Event Catering Mesa AZ | The Local Caterer"
    metaDescription="Professional corporate catering in Mesa, Phoenix & Scottsdale. Office lunches, conferences, team events. Reliable, on-time, delicious. 500+ events served. Call (480) 718-1671."
    canonical="/corporate-event-catering"
    serviceType="Corporate Catering"
  />;
}
