import ServicePage from "@/components/ServicePage";
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_wedding_959be23b.webp";
export default function WeddingCatering() {
  return <ServicePage
    title="Wedding Catering Mesa AZ"
    heroImg={HERO}
    subtitle="Unforgettable wedding menus crafted for your most important day. Serving Mesa, Scottsdale, Chandler, Gilbert & Phoenix."
    intro="Your Wedding Day Deserves Exceptional Food"
    body={`Your wedding day is the most important celebration of your life, and the food you serve will be one of the most memorable parts of the experience for you and your guests. The Local Caterer specializes in wedding catering across Mesa, Scottsdale, Chandler, Gilbert, and the greater Phoenix area — bringing chef-crafted menus, professional service, and meticulous attention to detail to every wedding we cater.

Founded by Chef Josh Bakken, our team has catered hundreds of weddings across the East Valley. We've served intimate ceremonies with 30 guests and grand receptions with 500+. No matter the size, we bring the same level of care, creativity, and culinary excellence to every wedding we touch.

Our wedding catering process starts with a free consultation where we learn about your vision, your venue, your guest count, and your dietary needs. From there, we design a custom menu that reflects your taste and complements the tone of your wedding. Whether you want a formal plated dinner, a relaxed family-style feast, an elegant buffet, or a cocktail-style reception with passed appetizers, we build the menu around you — not the other way around.

We are experienced with all of the East Valley's top wedding venues, including Saguaro Lake Ranch, The Paseo, Superstition Manor, and dozens of private estates and outdoor venues throughout Mesa, Scottsdale, and Chandler. We coordinate directly with your venue coordinator and wedding planner to ensure seamless logistics from setup through cleanup.

Our wedding catering packages include professional serving staff, all equipment (chafing dishes, serving stations, linens, and more), setup and breakdown, and full cleanup. We handle every detail so you and your family can be fully present on your wedding day.

Dietary accommodations are always available and handled with care. We regularly prepare gluten-free, vegan, vegetarian, nut-free, and allergy-conscious menus without compromising on flavor or presentation. We also coordinate bar service and can work with your licensed bartender or bar service provider.

Our wedding clients consistently rate us 5 stars on Google, WeddingWire, and The Knot. We are proud of the relationships we build with couples throughout the planning process and the memories we help create on their wedding day.

Call (480) 718-1671 or request a free wedding catering consultation online. We book up quickly during peak wedding season (October–May), so we recommend reaching out as early as possible.`}
    features={[
      "Custom wedding menus tailored to your vision",
      "Plated, buffet, family-style & cocktail options",
      "Full-service setup and cleanup included",
      "Professional, uniformed wedding catering staff",
      "Dietary accommodations (GF, vegan, nut-free)",
      "Serving Mesa, Scottsdale, Chandler, Gilbert & Phoenix",
      "Free wedding catering consultation",
      "Bar service coordination available",
      "Experienced with East Valley's top venues",
      "500+ weddings and events catered",
      "5-star rated on Google, WeddingWire & The Knot",
      "Same-day quotes available",
    ]}
    faqs={[
      { q: "How far in advance should I book wedding catering?", a: "We recommend booking at least 6–12 months in advance for weddings, especially for peak season dates (October through May). However, we do accommodate last-minute bookings when availability allows. Contact us as soon as possible to check your date." },
      { q: "Do you offer tastings before the wedding?", a: "Yes, we offer menu tastings for wedding clients. This is a great opportunity to finalize your menu, confirm portion sizes, and ensure everything meets your expectations before the big day." },
      { q: "Can you accommodate dietary restrictions and food allergies?", a: "Absolutely. We regularly prepare gluten-free, vegan, vegetarian, nut-free, dairy-free, and other allergy-conscious menus. Please let us know about any dietary needs during your consultation and we will design the menu accordingly." },
      { q: "What areas do you serve for wedding catering?", a: "We serve Mesa, Phoenix, Scottsdale, Chandler, Gilbert, Queen Creek, Tempe, and the greater East Valley. We also travel to select venues outside the Phoenix metro area — contact us to confirm availability for your location." },
      { q: "What is included in your wedding catering packages?", a: "Our wedding catering packages include custom menu design, professional serving staff, all equipment (chafing dishes, serving stations, linens), setup, service throughout the event, and full cleanup. We bring everything needed for a seamless experience." },
    ]}
    relatedServices={[{label:"Corporate Catering",href:"/corporate-event-catering"},{label:"Private Events",href:"/private-event-catering"},{label:"Baby Shower Catering",href:"/baby-shower-catering"}]}
    metaTitle="Wedding Catering Mesa AZ | The Local Caterer — Custom Wedding Menus"
    metaDescription="Mesa Arizona's top wedding caterer. Custom menus, full-service setup, professional staff. Serving Mesa, Scottsdale, Chandler, Gilbert & Phoenix. Free consultation — call (480) 718-1671."
    canonical="/wedding-catering-mesa-az"
    serviceType="Wedding Catering"
  />;
}
