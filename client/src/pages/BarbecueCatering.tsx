import ServicePage from "@/components/ServicePage";
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_6809_8e13bd53.webp";
export default function BarbecueCatering() {
  return <ServicePage title="BBQ Catering in Mesa, AZ" heroImg={HERO} subtitle="Authentic Arizona BBQ catering for outdoor events, parties, and corporate gatherings." intro="Real BBQ, Real Flavor, Real Service" body={"Nothing brings people together like great BBQ. The Local Caterer's BBQ catering service delivers authentic, slow-cooked flavors to outdoor events, corporate gatherings, and private parties across the East Valley.\n\nOur BBQ menus feature classic favorites — smoked brisket, pulled pork, ribs, chicken, and all the sides — prepared with care and served fresh. We bring the equipment, the food, and the expertise so you can enjoy the party.\n\nPerfect for company picnics, neighborhood events, graduation parties, and any outdoor gathering where great food is the star of the show."} features={["Smoked meats and classic BBQ sides","Full outdoor setup and service","Equipment provided","Flexible guest counts","Corporate and private events","Vegetarian options available","Setup and cleanup included","Serving staff available"]} relatedServices={[{label:"Corporate Catering",href:"/corporate-event-catering"},{label:"Private Party Catering",href:"/private-party-catering"},{label:"Private Events",href:"/private-event-catering"}]}
    metaTitle="BBQ Catering Mesa AZ | The Local Caterer — Outdoor & Corporate BBQ"
    metaDescription="Authentic BBQ catering in Mesa, AZ. Smoked brisket, pulled pork, ribs & all the sides. Perfect for corporate events, parties & outdoor gatherings. Call (480) 718-1671."
    canonical="/barbecue-catering"
    serviceType="BBQ Catering"
  />;
}
