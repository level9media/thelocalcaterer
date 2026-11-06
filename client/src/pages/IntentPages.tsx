/*
 * Search-intent landing pages (Nov 2026)
 * Built from Google Search Console query data: each page targets a cluster of
 * searches The Local Caterer already gets impressions for but had no dedicated page.
 */
import ServicePage from "@/components/ServicePage";

const M = "/assets/media";
const QUOTE_NOTE = "Call (480) 718-1671 or request a free quote online — we reply fast, and most quotes go out the same day.";

/* ───────────────────────── Event Catering ───────────────────────── */
export function EventCatering() {
  return (
    <ServicePage
      title="Event Catering in Mesa & the East Valley"
      heroImg={`${M}/0M6A0098_97c6aea4.webp`}
      subtitle="Chef-crafted food and professional service for special events of every size — from 25-guest dinners to 500-guest galas."
      intro="Event Catering Built Around Your Event, Not a Template"
      body={`When you search for event catering, you want one thing: a caterer who shows up on time, feeds every guest well, and makes the whole day easier. That is what The Local Caterer has done for East Valley events for more than a decade.

We are a Mesa-based, chef-led catering company. Every menu is prepared in our own commercial kitchen, then delivered, finished, and served at your venue — so food arrives hot, fresh, and looking the way it should. Chef Josh Bakken and Kasandra Bakken run every event personally, from the first quote to the last plate cleared.

We cater special events of every kind: weddings, corporate events, galas and fundraisers, milestone birthdays, anniversaries, graduations, holiday parties, church and community events, celebrations of life, and family reunions. Indoor ballroom or backyard lawn, 25 guests or 500, the standard is the same.

${QUOTE_NOTE}`}
      features={[
        "Custom menus for any event type",
        "Buffet, family-style, plated or stations",
        "Professional serving staff",
        "Delivery, setup and cleanup",
        "Appetizers, grazing tables and desserts",
        "Gluten-free, vegan and allergy-friendly options",
        "Venues, homes, offices and outdoor sites",
        "Serving Mesa, Phoenix, Scottsdale, Chandler, Gilbert, Tempe & Queen Creek",
      ]}
      sections={[
        { heading: "Event Catering Services We Offer", body: `Full-service event catering: our team handles the food, the serving staff, the buffet or station setup, and the cleanup. This is the most popular choice for weddings, galas, and any event where you want to be a guest at your own party.

Drop-off event catering: for casual gatherings and office events, we deliver hot, ready-to-serve food in disposable or chafing-dish setups. It is the simplest and most budget-friendly way to cater an event.

Appetizer and cocktail receptions, grazing tables, dessert tables, brunch buffets, taco bars, BBQ, Italian, and Mexican menus — all customizable, all made from scratch.` },
        { heading: "How to Book Event Catering", body: `1. Tell us about your event — date, location, guest count, and the style of food you have in mind.

2. We build a custom menu and quote. Tastings are available on request.

3. We confirm the details, timeline, and staffing a week before your event.

4. Event day: we deliver, set up, serve, and clean up. You enjoy your guests.` },
      ]}
      faqs={[
        { q: "How far in advance should I book event catering?", a: "For most events, 3–6 weeks is ideal. Weddings and large events in peak season (October–April in Arizona) should book 3–6 months out. We sometimes have short-notice availability, so it is always worth calling." },
        { q: "Do you provide servers and staff for events?", a: "Yes. Full-service event catering includes professional serving staff. Staffing is quoted based on guest count and service style." },
        { q: "What is the minimum guest count for event catering?", a: "We cater events of almost any size. Small gatherings are often best served with drop-off catering, while larger events usually choose full service. Ask us and we will recommend the best fit." },
        { q: "Do you cook on site?", a: "Most food is prepared in our commercial kitchen and then finished and served at your venue. That keeps quality consistent and means your venue needs very little kitchen space." },
        { q: "What areas do you cater events in?", a: "We are based in Mesa and cater events across Phoenix, Scottsdale, Tempe, Chandler, Gilbert, Queen Creek, San Tan Valley, and the rest of the Valley." },
      ]}
      relatedServices={[
        { label: "Full-Service Catering", href: "/full-service-catering" },
        { label: "Corporate Event Catering", href: "/corporate-event-catering" },
        { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
        { label: "Small Party Catering", href: "/small-party-catering" },
        { label: "Holiday Catering", href: "/holiday-catering" },
      ]}
      metaTitle="Event Catering Mesa AZ | Special Events Caterer — The Local Caterer"
      metaDescription="Event catering in Mesa, Phoenix & the East Valley. Chef-crafted menus, servers, setup & cleanup for weddings, galas, parties & corporate events. Free quote: (480) 718-1671."
      canonical="/event-catering"
      serviceType="Event Catering"
    />
  );
}

/* ───────────────────────── Small Party Catering ───────────────────────── */
export function SmallPartyCatering() {
  return (
    <ServicePage
      title="Small Party Catering"
      heroImg={`${M}/1L7A9350_d7d4c8fe.webp`}
      subtitle="Big-event quality for small gatherings — birthdays, dinner parties, showers, and get-togethers of 10 to 50 guests."
      intro="Small Party? We'd Love to Cater It."
      body={`A lot of caterers chase big weddings and quietly turn down small parties. We don't. Some of our favorite events are 15-person dinner parties, backyard birthdays, intimate showers, and family get-togethers across Mesa and the East Valley.

For small parties we keep it simple. Most small gatherings are served with our drop-off catering: hot, ready-to-serve trays or a beautiful grazing spread delivered to your door and set up for you. If you would rather not lift a finger, we can add a server or two for the evening.

Every small party menu is prepared from scratch in our Mesa commercial kitchen by the same chef-led team that caters 300-guest weddings. You get the same food, scaled to your guest list.

${QUOTE_NOTE}`}
      features={[
        "Ideal for 10–50 guests",
        "Drop-off trays or full service",
        "Grazing boards and charcuterie spreads",
        "Taco bars, pasta, BBQ and brunch",
        "Appetizer-only menus available",
        "Dessert add-ons",
        "Dietary accommodations",
        "Homes, backyards, offices and small venues",
      ]}
      sections={[
        { heading: "Popular Small Party Catering Ideas", body: `Backyard birthday: a taco bar or BBQ spread that feeds a crowd without a lot of fuss.

Dinner party: a family-style Italian or Mediterranean menu served right at the table.

Shower or brunch: a brunch buffet with a grazing board and a small dessert display.

Game day or casual get-together: party platters, sliders, wings, and appetizers.

Office celebration: a small lunch spread for a team birthday, retirement, or milestone.` },
        { heading: "Small Party Catering Near You", body: `We cater small parties in Mesa, Gilbert, Chandler, Queen Creek, San Tan Valley, Tempe, Scottsdale, and Phoenix. Because we are local and prep everything in our own kitchen, small orders are no trouble at all.` },
      ]}
      faqs={[
        { q: "Do you cater parties for under 20 people?", a: "Yes. Small parties are welcome. For very small groups, drop-off catering or party platters are usually the best value." },
        { q: "Can I get a server for a small party?", a: "Yes. Any small party can be upgraded to include a server or bartender so you can relax and enjoy your guests." },
        { q: "How much notice do you need for a small party?", a: "We recommend 1–2 weeks, but we can often handle small orders with just a few days' notice. Call (480) 718-1671 to check availability." },
        { q: "Do you deliver small party catering?", a: "Yes. We deliver throughout Mesa and the East Valley and set the food up so it is ready to serve." },
      ]}
      relatedServices={[
        { label: "Birthday Party Catering", href: "/birthday-party-catering" },
        { label: "Affordable Catering", href: "/affordable-catering" },
        { label: "Private Party Catering", href: "/private-party-catering" },
        { label: "Baby Shower Catering", href: "/baby-shower-catering" },
        { label: "Event Catering", href: "/event-catering" },
      ]}
      metaTitle="Small Party Catering Near Mesa AZ | 10–50 Guests — The Local Caterer"
      metaDescription="Catering for small parties of 10–50 guests in Mesa, Gilbert, Chandler & Queen Creek. Drop-off trays, grazing boards, taco bars & more. Free quote: (480) 718-1671."
      canonical="/small-party-catering"
      serviceType="Small Party Catering"
    />
  );
}

/* ───────────────────────── Affordable Catering ───────────────────────── */
export function AffordableCatering() {
  return (
    <ServicePage
      title="Affordable Catering in Mesa & the East Valley"
      heroImg={`${M}/_DSC0268_127ded6e.webp`}
      subtitle="Chef-made food that fits a real budget — with honest advice on how to feed more guests for less."
      intro="Great Catering Doesn't Have to Break the Budget"
      body={`Plenty of people searching for affordable or cheap catering assume a chef-led caterer is out of reach. Often it isn't. The biggest cost drivers in catering are staffing, service style, and menu complexity — not the quality of the food. Adjust those, and a from-scratch menu can fit a surprisingly modest budget.

At The Local Caterer we will tell you straight how to get the most food for your money, and we build menus around your number instead of forcing you into a package. Everything is still prepared fresh in our Mesa commercial kitchen.

${QUOTE_NOTE}`}
      features={[
        "Budget-first custom menus",
        "Drop-off catering (no staffing cost)",
        "Buffet and taco bar options",
        "Boxed lunches for offices",
        "Party platters and trays",
        "Family-style comfort food menus",
        "Transparent, itemized quotes",
        "No pressure, free consultations",
      ]}
      sections={[
        { heading: "7 Ways to Make Catering More Affordable", body: `1. Choose drop-off instead of full service. Skipping on-site staff is the single biggest saving.

2. Go buffet or taco bar. Self-serve formats cost less than plated or family-style service.

3. Pick one hero dish. A great main with simple, hearty sides goes further than five proteins.

4. Serve lunch or brunch. Daytime menus are typically lighter and lower cost than dinner.

5. Use disposable serviceware for casual events instead of rentals.

6. Get an accurate headcount. Ordering for the guests who actually come avoids waste.

7. Book on a weekday or off-peak date when you have flexibility.` },
        { heading: "Budget-Friendly Menus Our Clients Love", body: `Taco and fajita bars, BBQ with classic sides, pasta and salad buffets, sandwich and wrap platters, breakfast burrito bars, and boxed lunches are all crowd-pleasers that keep cost per guest low. Browse ideas on our full catering menu, then tell us your budget and guest count.` },
      ]}
      faqs={[
        { q: "What is the cheapest way to cater a party?", a: "Drop-off catering with a self-serve buffet or taco bar is usually the most affordable option. You avoid staffing costs and still get hot, chef-made food." },
        { q: "Can you work with my budget?", a: "Yes. Tell us your budget and guest count and we will build a menu that fits, along with honest suggestions for stretching it further." },
        { q: "Is affordable catering lower quality?", a: "Not with us. Budget menus are made from scratch in the same kitchen, by the same team, as our wedding menus. We save money with service style and menu choices, not ingredients." },
        { q: "Do you charge a delivery fee?", a: "Delivery fees depend on distance and order size and are always shown on your quote. Our service agreement page lists our standard policies." },
      ]}
      relatedServices={[
        { label: "Small Party Catering", href: "/small-party-catering" },
        { label: "Office Lunch Catering", href: "/office-lunch-catering" },
        { label: "BBQ Catering", href: "/barbecue-catering" },
        { label: "Full Catering Menu", href: "/catering-menu" },
        { label: "Affordable Catering Guide (Blog)", href: "/post/affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek" },
      ]}
      metaTitle="Affordable Catering Near Mesa AZ | Budget-Friendly Caterer — The Local Caterer"
      metaDescription="Affordable catering in Mesa, Gilbert, Chandler & Queen Creek. Chef-made drop-off, buffet & taco bar menus built around your budget. Free quote: (480) 718-1671."
      canonical="/affordable-catering"
      serviceType="Catering"
    />
  );
}

/* ───────────────────────── Office Lunch Catering ───────────────────────── */
export function OfficeLunchCatering() {
  return (
    <ServicePage
      title="Office Lunch Catering"
      heroImg={`${M}/img_6738_7f143df1.webp`}
      subtitle="Team lunches, meeting catering, and boxed lunches delivered on time to offices across Mesa, Tempe, Chandler, Gilbert, Scottsdale and Phoenix."
      intro="Lunch Catering Your Team Will Actually Look Forward To"
      body={`Office lunch catering has one job: arrive on time, feed everyone well, and make the person who ordered look great. The Local Caterer handles recurring team lunches, meeting catering, training-day meals, client lunches, and all-hands events for East Valley businesses.

Choose hot buffet-style lunches delivered in chafing dishes, individually labeled boxed lunches for meetings and trainings, or a build-your-own bar (tacos, pasta, rice bowls, salads). Everything is cooked in our Mesa commercial kitchen and delivered ready to serve.

We make ordering easy for office managers: clear quotes, labeled dietary items, corporate invoicing, and recurring weekly or monthly schedules.

${QUOTE_NOTE}`}
      features={[
        "Hot buffet lunches",
        "Individually boxed lunches",
        "Breakfast and coffee service",
        "Meeting and training-day catering",
        "Labeled vegan, vegetarian and gluten-free meals",
        "Recurring weekly or monthly orders",
        "Corporate invoicing",
        "On-time delivery and setup",
      ]}
      sections={[
        { heading: "Popular Office Lunch Menus", body: `Taco and fajita bar, Italian pasta buffet, BBQ lunch, Mediterranean bowls, gourmet sandwich and wrap platters, salad bars, and boxed lunches with a sandwich or salad, side, and dessert. Breakfast options include burrito bars, pastry and fruit spreads, and hot breakfast buffets.` },
        { heading: "Team Lunches, Meetings and Office Parties", body: `Weekly team lunch: rotate menus so nobody gets bored, on one simple recurring order.

Board and client meetings: elevated boxed lunches or a plated-style spread that makes a good impression.

Trainings and all-day sessions: breakfast, lunch, and an afternoon snack break handled in one order.

Office parties: holiday parties, retirements, and milestone celebrations — see our holiday catering and corporate event catering pages for larger events.` },
      ]}
      faqs={[
        { q: "How much notice do you need for office lunch catering?", a: "48–72 hours is ideal for most office lunches. Larger orders (100+) should book 1–2 weeks out. Call (480) 718-1671 for short-notice requests." },
        { q: "Do you offer boxed lunches?", a: "Yes. Individually boxed and labeled lunches are perfect for meetings, trainings, and offices that prefer grab-and-go." },
        { q: "Can you set up recurring office lunches?", a: "Yes. Many businesses book weekly or monthly team lunches with rotating menus and a single invoice." },
        { q: "Which areas do you deliver office lunches to?", a: "We deliver throughout Mesa, Tempe, Chandler, Gilbert, Scottsdale, Phoenix, and Queen Creek." },
      ]}
      relatedServices={[
        { label: "Corporate Event Catering", href: "/corporate-event-catering" },
        { label: "Lunch Catering Menu", href: "/lunch-catering-menu" },
        { label: "Breakfast Catering Menu", href: "/breakfast-catering-menu" },
        { label: "Holiday Catering", href: "/holiday-catering" },
        { label: "Affordable Catering", href: "/affordable-catering" },
      ]}
      metaTitle="Office Lunch Catering Mesa AZ | Team & Meeting Lunches — The Local Caterer"
      metaDescription="Office lunch catering in Mesa, Tempe, Chandler, Gilbert & Phoenix. Hot buffets, boxed lunches, team & meeting catering delivered on time. Call (480) 718-1671."
      canonical="/office-lunch-catering"
      serviceType="Corporate Catering"
    />
  );
}

/* ───────────────────────── Holiday Catering ───────────────────────── */
export function HolidayCatering() {
  return (
    <ServicePage
      title="Holiday Catering 2026"
      heroImg={`${M}/ChickenSataySkewersw_PeanutSauce_107c68ef.webp`}
      subtitle="Thanksgiving, Christmas, office holiday parties and New Year's catering across Mesa, Phoenix and the East Valley. Dates are filling — book now."
      intro="Holiday Catering for Families, Offices and Every Party in Between"
      body={`The holidays are the busiest season of the year for East Valley caterers, and our December dates go quickly. Whether you're hosting a company holiday party, a family Christmas dinner, a Thanksgiving feast, or a New Year's Eve celebration, The Local Caterer will handle the food so you can enjoy the season.

Every holiday menu is made from scratch in our Mesa kitchen and can be delivered ready to serve or fully staffed with servers and bartenders. See our current 2026–27 Catering Collection on the catering menu page for menu ideas.

${QUOTE_NOTE}`}
      features={[
        "Office and company holiday parties",
        "Thanksgiving dinner catering",
        "Christmas dinner and Christmas Eve catering",
        "New Year's Eve parties",
        "Holiday appetizers and grazing tables",
        "Holiday dessert tables",
        "Drop-off or full service with staff",
        "Dietary accommodations",
      ]}
      sections={[
        { heading: "Office Holiday Party Catering", body: `Company holiday parties are our specialty in November and December. We cater in-office lunches, evening parties at venues, and client appreciation events — with buffets, stations, passed appetizers, and dessert displays. Corporate invoicing is available. Popular dates (the first three Fridays in December) book out first, so reserve early.` },
        { heading: "Thanksgiving and Christmas Dinner Catering", body: `Skip the all-day cooking. We prepare complete holiday dinners — roasted proteins, classic sides, breads, and desserts — delivered ready to serve for family gatherings large and small. Christmas Eve and Christmas Day availability is limited, so order early.` },
        { heading: "Holiday Parties, Open Houses and New Year's Eve", body: `From neighborhood open houses to church holiday events and New Year's Eve parties, we offer appetizer receptions, grazing tables, and full dinners. Add a dessert table or hot cocoa and coffee service to round it out.` },
      ]}
      faqs={[
        { q: "When should I book holiday catering?", a: "As soon as possible. December weekends and Christmas week fill first. For office parties we recommend booking 4–8 weeks ahead; for family dinners, 1–3 weeks." },
        { q: "Do you cater Thanksgiving dinner?", a: "Yes. We offer Thanksgiving dinner catering for families and offices, delivered ready to serve. Order early — capacity is limited." },
        { q: "Can you cater an office holiday party at our workplace?", a: "Yes. We cater holiday lunches and parties at offices throughout Mesa, Tempe, Chandler, Gilbert, Scottsdale, and Phoenix, including setup, service, and cleanup." },
        { q: "Do you offer holiday catering packages?", a: "We build custom holiday menus for each event so you only pay for what you need. Share your guest count and budget and we will put together a quote." },
      ]}
      relatedServices={[
        { label: "Holiday Catering Menu", href: "/holiday-menu-2025" },
        { label: "Office Lunch Catering", href: "/office-lunch-catering" },
        { label: "Corporate Event Catering", href: "/corporate-event-catering" },
        { label: "Dessert Catering Menu", href: "/dessert-menu" },
        { label: "Holiday Catering Articles", href: "/blog/categories/holiday-catering" },
      ]}
      metaTitle="Holiday Catering 2026 Mesa & Phoenix AZ | Office Parties & Christmas — The Local Caterer"
      metaDescription="2026 holiday catering in Mesa, Phoenix & the East Valley: office holiday parties, Thanksgiving & Christmas dinners, New Year's Eve. Dates filling — (480) 718-1671."
      canonical="/holiday-catering"
      serviceType="Holiday Catering"
    />
  );
}

/* ───────────────────────── Birthday Party Catering ───────────────────────── */
export function BirthdayPartyCatering() {
  return (
    <ServicePage
      title="Birthday Party Catering"
      heroImg={`${M}/IMG_3356_f4c0eba1.webp`}
      subtitle="Kids' parties, milestone birthdays, quinceañeras and surprise parties — catered across Mesa and the East Valley."
      intro="Make the Birthday About the Guest of Honor, Not the Kitchen"
      body={`From a first birthday to a 50th, 60th, or 80th, birthday parties should be fun for the host too. The Local Caterer takes care of the food — from a backyard taco bar for 30 to a fully staffed milestone dinner for 150.

We cater kids' birthday parties, sweet 16s, quinceañeras, milestone birthdays, surprise parties, and birthday brunches. Every menu is made from scratch in our Mesa kitchen, delivered, and set up so you can focus on celebrating.

${QUOTE_NOTE}`}
      features={[
        "Kids' and adult birthday menus",
        "Milestone birthdays (30th, 40th, 50th and beyond)",
        "Quinceañeras and sweet 16s",
        "Taco bars, BBQ, pasta and sliders",
        "Grazing tables and appetizers",
        "Dessert tables and sweet displays",
        "Drop-off or full service",
        "Backyards, homes and venues",
      ]}
      sections={[
        { heading: "Birthday Party Catering Ideas", body: `Backyard birthday BBQ with all the sides. A taco or fajita bar that keeps the line moving. Sliders, wings, and party platters for an easy grazing party. A brunch buffet for a daytime celebration. A plated or family-style dinner for a milestone birthday. Finish with a dessert table of mini desserts and treats.` },
      ]}
      faqs={[
        { q: "Do you cater kids' birthday parties?", a: "Yes. We offer kid-friendly menus alongside options for the adults, served buffet-style or as party platters." },
        { q: "Can you cater a surprise birthday party?", a: "Absolutely. We coordinate timing and setup discreetly so the food is ready when the guest of honor walks in." },
        { q: "What size birthday parties do you cater?", a: "Any size — from intimate dinners for 15 to milestone celebrations of 150+. See our small party catering page for smaller gatherings." },
      ]}
      relatedServices={[
        { label: "Small Party Catering", href: "/small-party-catering" },
        { label: "Private Party Catering", href: "/private-party-catering" },
        { label: "Dessert Catering Menu", href: "/dessert-menu" },
        { label: "BBQ Catering", href: "/barbecue-catering" },
        { label: "Mexican Catering Menu", href: "/mexican-catering-menu" },
      ]}
      metaTitle="Birthday Party Catering Mesa AZ | Kids & Milestone Birthdays — The Local Caterer"
      metaDescription="Birthday party catering in Mesa, Gilbert, Chandler & Queen Creek. Taco bars, BBQ, grazing tables & dessert tables for kids' and milestone birthdays. (480) 718-1671."
      canonical="/birthday-party-catering"
      serviceType="Party Catering"
    />
  );
}

/* ───────────────────────── Full-Service Catering ───────────────────────── */
export function FullServiceCatering() {
  return (
    <ServicePage
      title="Full-Service Catering"
      heroImg={`${M}/0M6A0157_2a659271.webp`}
      subtitle="Food, staff, setup, service and cleanup — handled start to finish by one East Valley team."
      intro="What Full-Service Catering Means at The Local Caterer"
      body={`Full-service catering means you don't manage anything on event day. We bring the food, the serving staff, the equipment, and the plan. We set up the buffet or stations, serve your guests, keep everything stocked and looking beautiful, and leave the space clean when we go.

It is the right choice for weddings, corporate events, galas, fundraisers, celebrations of life, and any event where you want to be fully present. Our team is led personally by Chef Josh Bakken and Kasandra Bakken, and every menu is prepared in our Mesa commercial kitchen.

${QUOTE_NOTE}`}
      features={[
        "Custom chef-designed menu",
        "Professional servers and captains",
        "Bartending staff available",
        "Buffet, stations, family-style or plated",
        "Chafing dishes and display equipment",
        "Setup, replenishment and cleanup",
        "Timeline coordination with your venue",
        "Dietary accommodations",
      ]}
      sections={[
        { heading: "Full-Service vs. Drop-Off Catering", body: `Drop-off catering: we deliver ready-to-serve food and set it up, then you take it from there. Best for casual parties and office lunches on a budget.

Full-service catering: our staff stays for the event to serve, replenish, and clean up. Best for weddings, formal events, larger guest counts, and anyone who wants a hands-off experience.

Not sure which you need? Tell us about your event and we will recommend the right fit — honestly.` },
      ]}
      faqs={[
        { q: "What is included in full-service catering?", a: "Menu planning, food preparation, delivery, setup, professional serving staff, buffet or station equipment, replenishment during the event, and cleanup. Rentals and bar service can be added." },
        { q: "How many servers will my event need?", a: "It depends on guest count and service style. We include a staffing recommendation on every full-service quote." },
        { q: "Do you provide full-service catering for weddings?", a: "Yes. Weddings are one of our most-booked full-service events. See our wedding catering page for details." },
      ]}
      relatedServices={[
        { label: "Event Catering", href: "/event-catering" },
        { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
        { label: "Corporate Event Catering", href: "/corporate-event-catering" },
        { label: "Private Event Catering", href: "/private-event-catering" },
        { label: "Service Agreement", href: "/service-agreement" },
      ]}
      metaTitle="Full-Service Catering Mesa AZ | Staff, Setup & Cleanup — The Local Caterer"
      metaDescription="Full-service catering in Mesa, Phoenix, Scottsdale & the East Valley. Chef-made food, servers, setup and cleanup for weddings & events. Call (480) 718-1671."
      canonical="/full-service-catering"
      serviceType="Full-Service Catering"
    />
  );
}
