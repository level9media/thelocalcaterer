import LocationPage from "@/components/LocationPage";
export default function TempeAZ() {
  return (
    <LocationPage
      city="Tempe"
      headline="Tempe Catering — Office Lunches, Corporate Events, Weddings & Parties"
      intro="The Local Caterer delivers chef-crafted catering across Tempe — from office lunches near the lake and ASU to weddings, graduations, and private parties."
      body={`Tempe sits right next door to our Mesa kitchen, which makes it one of the easiest places in the Valley for us to cater well. Food leaves our commercial kitchen and arrives at your Tempe office, venue, or home fresh and on time.

Tempe's business community keeps us busy. We cater office lunches, team meetings, trainings, client lunches, and company holiday parties for businesses around Tempe Town Lake, the ASU Research Park, and the Rio Salado and Broadway corridors. Choose hot buffets, individually boxed lunches, or build-your-own bars, with labeled dietary options and corporate invoicing.

Graduation season is big in Tempe. We cater graduation parties, open houses, and family celebrations with taco bars, BBQ, and party platters that feed a crowd without a lot of fuss.

We also cater Tempe weddings, rehearsal dinners, birthdays, baby showers, church and community events, and celebrations of life — with full-service staff for formal events or drop-off catering for casual ones.

Every menu is customizable and made from scratch: BBQ, Mexican, Italian, Mediterranean, brunch, and chef-designed dinners, with gluten-free, vegan, vegetarian, and allergy-friendly options always available.

Call (480) 718-1671 or request a free quote online for your Tempe event.`}
      services={[
        "Office Lunch Catering in Tempe",
        "Corporate Event Catering",
        "Boxed Lunches & Meeting Catering",
        "Graduation Party Catering",
        "Wedding & Rehearsal Dinner Catering",
        "Birthday & Private Party Catering",
        "Holiday Party Catering",
        "Baby Shower Catering",
        "BBQ & Taco Bar Catering",
        "Brunch & Breakfast Catering",
        "Church & Community Events",
        "Celebration of Life Catering",
      ]}
      nearbyAreas={["Mesa, AZ", "Chandler, AZ", "Phoenix, AZ", "Scottsdale, AZ", "Gilbert, AZ", "Ahwatukee, AZ"]}
      canonical="/catering-tempe-az"
      metaTitle="Catering in Tempe AZ | Office Lunches, Events & Weddings — The Local Caterer"
      metaDesc="Catering in Tempe, AZ: office lunches, boxed lunches, corporate events, graduation parties & weddings. Chef-crafted, delivered on time. Call (480) 718-1671."
      faqs={[
        { question: "Do you deliver office lunches in Tempe?", answer: "Yes. We deliver hot buffet lunches and boxed lunches to offices throughout Tempe. Most orders need 48–72 hours notice." },
        { question: "Do you cater graduation parties in Tempe?", answer: "Yes. Graduation parties are one of our most popular Tempe events each spring. Book early — May dates fill fast." },
        { question: "Can you cater events near ASU and Tempe Town Lake?", answer: "Yes. We cater offices, venues, and private homes all over Tempe, including the Town Lake, ASU, and Rio Salado areas." },
        { question: "Do you offer recurring corporate catering in Tempe?", answer: "Yes. We set up weekly or monthly team lunches with rotating menus and a single corporate invoice." },
      ]}
    />
  );
}
