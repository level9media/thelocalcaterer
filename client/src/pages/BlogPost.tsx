/*
 * BlogPost — Dynamic blog post page
 * Modern Farmhouse Premium design system
 * 10 SEO-optimized posts targeting Mesa/Phoenix catering keywords
 */
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, ArrowRight, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const IMG_HERO_MAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_main_3ee61e07.webp";
const IMG_WEDDING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_wedding_959be23b.webp";
const IMG_CORPORATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_corporate_36b8d2d9.webp";
const IMG_ABOUT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/hero_about_80832f1b.webp";
const IMG_FOOD1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_6738_7f143df1.webp";
const IMG_FOOD2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_3984_6f626893.webp";

type Post = {
  title: string;
  metaTitle: string;
  metaDesc: string;
  date: string;
  category: string;
  img: string;
  content: string;
};

const posts: Record<string, Post> = {
  // ─── POST 1 ──────────────────────────────────────────────────────────────────
  "wedding-catering-east-valley-mesa-chandler-gilbert": {
    title: "Wedding Catering in the East Valley: Mesa, Chandler & Gilbert",
    metaTitle: "Wedding Catering Mesa, Chandler & Gilbert AZ | The Local Caterer",
    metaDesc: "Planning a wedding in the East Valley? The Local Caterer delivers chef-crafted wedding menus for Mesa, Chandler, and Gilbert, AZ. Get a free quote today.",
    date: "2025-03-15",
    category: "Wedding Catering",
    img: IMG_WEDDING,
    content: `Planning a wedding in the East Valley is one of the most exciting — and most detail-intensive — experiences a couple can go through. Among all the decisions you'll make, choosing the right wedding caterer may be the single most impactful one. The food, the service, and the overall dining experience are what your guests will talk about long after the flowers have wilted and the venue has been returned to its everyday state.

The Local Caterer has been serving weddings across Mesa, Chandler, and Gilbert for years. We've worked in rustic desert venues, elegant ballrooms, private estate backyards, and everything in between. What we've learned is this: great wedding catering is equal parts exceptional food and flawless execution.

## What Makes East Valley Wedding Catering Unique

The East Valley has a character all its own. The desert landscape, the warm evenings, the blend of modern and traditional Arizona culture — all of it shapes what a great wedding looks and feels like here. Our menus reflect that. We offer everything from elegant plated dinners to relaxed Southwest-style stations, from classic Italian experiences to backyard BBQ spreads that feel genuinely festive.

When couples come to us, the first thing we do is listen. What's the vibe? Formal or relaxed? Intimate or large-scale? Indoor or outdoor? Those answers shape every menu decision we make. We don't offer a one-size-fits-all package because no two weddings are the same.

## Our Wedding Catering Services in Mesa, Chandler & Gilbert

For weddings in Mesa, Chandler, and Gilbert, The Local Caterer provides full-service catering that covers every detail. Our wedding packages include custom menu design, professional serving staff, full setup and breakdown, and coordination with your venue and wedding planner. We handle the logistics so you can be fully present on your wedding day.

Our most popular wedding menu options include plated dinner service with a choice of chicken, beef, or seafood entrées; buffet-style service with multiple stations; and cocktail-hour hors d'oeuvres followed by a seated dinner. We also offer bar service coordination and dessert displays.

Every menu can be customized to accommodate dietary restrictions, cultural preferences, and personal tastes. We've catered weddings with fully gluten-free menus, vegan options, and culturally specific dishes that reflect the couple's heritage.

## How to Choose the Right Wedding Caterer in the East Valley

Start by asking for references from couples who had similar-sized weddings. A caterer who excels at intimate 50-person dinners may not have the infrastructure for a 200-person reception. Ask about their staffing ratios, their experience with your specific venue, and whether they carry liability insurance.

Next, schedule a tasting. Any reputable wedding caterer should offer a tasting so you can experience the food before committing. At The Local Caterer, we believe the tasting is one of the most important steps in the process — it's where the menu truly comes to life.

Finally, look at their communication style. Wedding catering requires close coordination with multiple vendors. You want a caterer who is responsive, organized, and proactive — not one you have to chase down for answers.

## Popular East Valley Wedding Venues We've Served

The East Valley has a remarkable selection of wedding venues, and we've had the privilege of catering at many of them. From the rustic elegance of outdoor desert venues in Gilbert to the polished ballrooms of Chandler's event centers, we know how to work within each venue's specific requirements and make the most of each space.

We're experienced at coordinating with venue coordinators, wedding planners, and other vendors to ensure the catering integrates seamlessly into the overall event flow. If you're working with a planner, we'll coordinate directly with them. If you're planning independently, we'll guide you through the catering logistics step by step.

## Wedding Catering Trends in the East Valley

Couples in Mesa, Chandler, and Gilbert are increasingly choosing interactive food stations over traditional plated dinners. Taco bars, carving stations, pasta stations, and grazing tables create a more social, festive atmosphere and give guests the freedom to eat what they love. We've built our menu around these trends while still offering classic plated service for couples who prefer a more formal experience.

Another growing trend is late-night snack stations — a small food station that opens during dancing, offering sliders, fries, or desserts. It's a crowd-pleaser that keeps energy high through the end of the night.

## What to Ask Your Wedding Caterer Before Booking

Before you commit to any wedding caterer, ask these questions: Do you carry liability insurance? What is your staffing ratio per guest? Have you worked at our venue before? What is your policy on dietary accommodations? What is included in your pricing — setup, breakdown, serving staff?

At The Local Caterer, we're happy to answer all of these questions and more. We believe in complete transparency throughout the planning process, and we want you to feel fully confident in your decision before you sign anything.

## Book Your East Valley Wedding Caterer Today

Summer 2025 and 2026 wedding dates are filling up quickly across Mesa, Chandler, and Gilbert. If you have a date in mind, the best time to reach out is now. We'll schedule a free consultation, walk you through our menu options, and put together a custom quote based on your guest count and vision.

Contact The Local Caterer today at (480) 718-1671 or fill out our online inquiry form to get started. We'd be honored to be part of your wedding day.`,
  },

  // ─── POST 2 ──────────────────────────────────────────────────────────────────
  "the-best-catering-services-in-mesa-az-a-guide-to-the-local-caterer": {
    title: "The Best Catering Services in Mesa, AZ: A Guide to The Local Caterer",
    metaTitle: "Best Catering Services in Mesa AZ | The Local Caterer",
    metaDesc: "Looking for the best catering in Mesa, AZ? Discover why The Local Caterer is the East Valley's most trusted catering company for weddings, corporate events, and private parties.",
    date: "2025-02-28",
    category: "Food & Mesa",
    img: IMG_HERO_MAIN,
    content: `Mesa, Arizona has grown into one of the most vibrant cities in the Southwest, and with that growth has come a thriving events industry. From corporate headquarters to wedding venues, from private estates to community centers, Mesa hosts thousands of events every year — and all of them need food. But finding a caterer that consistently delivers exceptional quality, reliable service, and genuine hospitality is harder than it looks.

The Local Caterer has built its reputation in Mesa one event at a time. We're not the biggest catering company in the Phoenix metro, and we don't try to be. What we are is the most dedicated — to the quality of our food, the professionalism of our team, and the satisfaction of every client we serve.

## What Sets The Local Caterer Apart in Mesa

The difference starts in the kitchen. Our culinary team approaches every event menu with the same care and technique you'd expect from a high-end restaurant. We source quality ingredients, prepare everything fresh, and plate or serve with attention to detail that shows. Guests notice the difference between catering that's been thrown together and food that's been genuinely crafted.

Beyond the food, our service model is built around making your event stress-free. We coordinate directly with your venue, arrive on time, set up efficiently, and manage the entire food service from start to finish. When the event is over, we break down and clean up completely. You shouldn't have to think about the catering — you should just be able to enjoy your event.

## Catering Services We Offer in Mesa, AZ

The Local Caterer serves a wide range of events in Mesa and across the East Valley. Our most popular services include wedding catering, corporate event catering, private party catering, baby shower catering, celebration of life catering, and BBQ catering for outdoor events.

We offer multiple service styles to fit any event format: plated dinner service, buffet-style service, cocktail-hour stations, boxed lunch delivery for corporate meetings, and live action stations for interactive dining experiences. Whatever your event requires, we can build a menu and service plan around it.

## Our Most Popular Menu Categories

Our menu spans ten major categories, from appetizers and hors d'oeuvres to full dinner entrées and desserts. We offer a Southwest Experience menu that's perfect for Arizona-themed events, a Backyard BBQ Experience for outdoor gatherings, and an Italian Experience for more formal occasions.

For corporate clients, our boxed lunch program and breakfast catering options are particularly popular. For weddings, our plated dinner service with a choice of chicken, beef, or seafood entrées is consistently the top choice. And for private parties, our taco bar and BBQ stations are always crowd-pleasers.

## Why Mesa Clients Trust The Local Caterer

We've catered hundreds of events in Mesa, and our repeat client rate speaks for itself. Clients come back to us because we deliver what we promise, every time. We're responsive, organized, and genuinely invested in making your event a success.

## Our Reputation Across Review Platforms

The Local Caterer has earned a 5-star reputation across Google, WeddingWire, and The Knot. Our clients consistently highlight three things in their reviews: the quality of the food, the professionalism of our team, and how easy we are to work with. We don't take that reputation lightly — every event we cater is an opportunity to reinforce it.

You can read our reviews on Google, WeddingWire (where we're listed as a preferred wedding vendor), and The Knot. We're also happy to provide direct references from past clients with similar event types.

## Serving All of Mesa and the Greater East Valley

The Local Caterer is based in Mesa and serves the entire East Valley, including Chandler, Gilbert, Scottsdale, Tempe, Phoenix, Queen Creek, Apache Junction, and San Tan Valley. We're a genuinely local company with deep roots in this community, and we take pride in serving the events that matter most to the people who live here.

Our service area extends throughout Maricopa County. If you're unsure whether we serve your location, just ask — the answer is almost certainly yes.

## Book Your Mesa Catering Today

If you're planning an event in Mesa, AZ, we'd love to be your caterer. Contact us today for a free consultation and custom quote. Call (480) 718-1671 or submit an inquiry online. We'll respond within 24 hours with availability and a preliminary proposal tailored to your event.`,
  },

  // ─── POST 3 ──────────────────────────────────────────────────────────────────
  "catering-mesa-az-the-local-caterers-guide-to-unforgettable-events": {
    title: "Catering in Mesa, AZ: The Local Caterer's Guide to Unforgettable Events",
    metaTitle: "Catering in Mesa AZ | Complete Event Planning Guide | The Local Caterer",
    metaDesc: "From weddings to corporate events, this comprehensive guide covers everything you need to know about planning a catered event in Mesa, Arizona.",
    date: "2025-02-10",
    category: "Food & Mesa",
    img: IMG_FOOD1,
    content: `Planning a catered event in Mesa, Arizona involves more moving parts than most people realize. Whether you're organizing a wedding reception for 200 guests, a corporate luncheon for 50 employees, or a private birthday party for 30 close friends, the catering decision will shape the entire experience. This guide walks you through everything you need to know — from choosing the right caterer to planning the perfect menu.

## Step 1: Define Your Event Type and Guest Count

Before you contact a single caterer, get clear on the basics. How many guests are you expecting? Is this a seated dinner or a cocktail-style event? Will it be indoors or outdoors? Daytime or evening? These answers will immediately narrow your options and help caterers give you accurate pricing.

In Mesa, outdoor events are extremely popular, especially in the fall and spring months when the desert weather is at its most beautiful. If you're planning an outdoor event, make sure your caterer has experience with outdoor service — including proper food safety protocols for warm weather.

## Step 2: Choose Your Service Style

There are several service styles to consider, each with different implications for cost, flow, and guest experience.

Plated dinner service is the most formal option. Guests are seated, and servers bring individual plates to each table. This style works best for weddings and formal corporate dinners where you want a structured, elegant experience.

Buffet service is more relaxed and allows guests to choose their own portions. It's excellent for larger events where you want variety and flexibility. Buffets also tend to be more cost-effective per person than plated service.

Station-style service creates an interactive, social dining experience. Guests move between different food stations — a taco bar, a carving station, a pasta station — and build their own plates. This style is perfect for casual events and parties where you want guests to mingle.

## Step 3: Build Your Menu Around Your Guests

The best catering menus are built with the guests in mind, not just the host's preferences. Consider the age range of your guests, any known dietary restrictions, and the overall tone of the event. A corporate luncheon calls for different food than a backyard birthday party.

At The Local Caterer, we always ask about dietary restrictions during the planning process. We can accommodate gluten-free, vegetarian, vegan, and other dietary needs without sacrificing quality or flavor. We believe every guest deserves a great meal, regardless of their dietary requirements.

## Step 4: Understand What's Included in Your Catering Quote

When comparing catering quotes in Mesa, make sure you're comparing apples to apples. Some caterers include serving staff in their pricing; others charge separately. Some include setup and breakdown; others don't. Ask specifically about what's included before making a decision based on price alone.

The Local Caterer provides transparent, all-inclusive quotes that cover food, professional serving staff, setup, service, and cleanup. We don't believe in surprise fees or add-ons that inflate your final bill.

## Step 5: Book Early — Mesa's Best Caterers Fill Up Fast

Mesa's event calendar is packed year-round, but especially during the fall wedding season (October through December) and the spring corporate event season (March through May). If you have a specific date in mind, don't wait to book your caterer. The best catering companies in Mesa are often booked 3-6 months in advance for peak dates.

Ready to start planning your Mesa event? Contact The Local Caterer at (480) 718-1671 for a free consultation and custom quote.`,
  },

  // ─── POST 4 ──────────────────────────────────────────────────────────────────
  "best-catering-companies-in-gilbert-az": {
    title: "Best Catering Companies in Gilbert, AZ: What to Look For",
    metaTitle: "Best Catering Companies in Gilbert AZ | The Local Caterer",
    metaDesc: "Searching for the best caterers in Gilbert, AZ? We break down what to look for and why The Local Caterer is the top choice for events in Gilbert and the East Valley.",
    date: "2025-01-20",
    category: "Food & Mesa",
    img: IMG_CORPORATE,
    content: `Gilbert, Arizona has transformed from a small farming community into one of the fastest-growing cities in the United States — and with that growth has come a booming events industry. From the Heritage District to the sprawling new residential neighborhoods, Gilbert hosts thousands of events every year. Finding the right catering company to serve those events is a decision that deserves careful consideration.

## What Makes a Great Catering Company in Gilbert

The best catering companies in Gilbert share several key characteristics. First, they have genuine experience with the types of events common in Gilbert — family celebrations, corporate gatherings, community events, and weddings at the area's many beautiful venues. Experience matters because catering requires logistical expertise that only comes from doing it repeatedly.

Second, great caterers in Gilbert are responsive and communicative. Event planning is stressful enough without having to chase down your caterer for answers. Look for a company that responds quickly, provides clear quotes, and keeps you informed throughout the planning process.

Third, look for a caterer with a diverse menu that can be customized to your event. Gilbert's population is diverse, and the best caterers reflect that with menus that span multiple cuisines and service styles.

## The Local Caterer: Serving Gilbert Events with Excellence

The Local Caterer has established itself as one of the most trusted catering companies serving Gilbert and the broader East Valley. Our team brings the same level of dedication to a Gilbert corporate luncheon as we do to a Mesa wedding reception — because we believe every event deserves our best.

We serve Gilbert events of all sizes, from intimate private dinners of 20 guests to large-scale corporate events of 500 or more. Our flexible menu options include everything from casual BBQ and Southwest-style spreads to elegant plated dinners with multiple courses.

## Popular Catering Options for Gilbert Events

For corporate events in Gilbert, our boxed lunch program and breakfast catering options are consistently popular. Many of Gilbert's tech companies and healthcare organizations use us for regular team lunches, client meetings, and company events.

For weddings in Gilbert, our wedding catering packages include custom menu design, professional serving staff, and full coordination with your venue. We've worked at many of Gilbert's top wedding venues and know how to navigate each one efficiently.

For private parties and family celebrations, our taco bar, BBQ, and Italian Experience menus are perennial favorites. These service styles create a festive, social atmosphere that gets guests talking and keeps them coming back for seconds.

## How to Get a Quote for Your Gilbert Event

Getting a catering quote from The Local Caterer is simple. Contact us at (480) 718-1671 or submit an inquiry through our website. We'll ask about your event date, guest count, venue, and the type of service you're looking for, then put together a custom quote within 24 hours.

We serve Gilbert, Mesa, Chandler, Scottsdale, Phoenix, and the broader East Valley. If you're planning an event in Gilbert, we'd love to be your caterer.`,
  },

  // ─── POST 5 ──────────────────────────────────────────────────────────────────
  "catering-companies-in-chandler-az-your-guide-to-the-best-local-caterers": {
    title: "Catering Companies in Chandler, AZ: Your Guide to the Best Local Caterers",
    metaTitle: "Catering Companies in Chandler AZ | The Local Caterer",
    metaDesc: "Need a caterer in Chandler, AZ? This guide covers what to look for in a Chandler catering company and why The Local Caterer is the top choice in the East Valley.",
    date: "2025-01-08",
    category: "Food & Mesa",
    img: IMG_FOOD2,
    content: `Chandler, Arizona is home to some of the most dynamic corporate campuses, beautiful event venues, and vibrant communities in the Phoenix metro area. Whether you're planning a corporate event at one of Chandler's tech company headquarters, a wedding at a desert resort, or a private party in one of the city's upscale neighborhoods, finding the right catering company is essential to your event's success.

## The Chandler Catering Landscape

Chandler's event scene is diverse. The city hosts everything from Fortune 500 corporate events to intimate family gatherings, from large-scale wedding receptions to casual outdoor parties. This diversity means that the best catering companies in Chandler need to be versatile — capable of delivering excellence across a wide range of event types, sizes, and styles.

When evaluating catering companies in Chandler, look for evidence of that versatility. A company that only does weddings may not have the operational capacity for a 300-person corporate event. A company that focuses primarily on corporate catering may not have the elegance and attention to detail that a wedding requires. The best caterers in Chandler can do both — and do both well.

## Corporate Catering in Chandler

Chandler is home to major employers including Intel, PayPal, Wells Fargo, and dozens of other large corporations. These companies regularly host internal events, client entertainment, and team-building activities that require professional catering. The Local Caterer has extensive experience serving Chandler's corporate community.

Our corporate catering services in Chandler include breakfast and lunch delivery for meetings and conferences, full-service catering for company events and holiday parties, and ongoing catering programs for companies that host regular events. We understand that corporate catering requires precision, reliability, and the ability to accommodate large groups efficiently.

## Wedding Catering in Chandler

Chandler's wedding venue scene is exceptional, with options ranging from desert resort settings to elegant ballrooms to intimate garden venues. The Local Caterer has worked at many of Chandler's top wedding venues and understands the unique requirements of each.

Our Chandler wedding catering packages include custom menu design, professional serving staff, full setup and breakdown, and coordination with your venue and wedding planner. We work closely with couples to create menus that reflect their personal tastes and the overall vision for their wedding day.

## Private Events and Parties in Chandler

For private events in Chandler — birthday parties, anniversary celebrations, graduation parties, baby showers, and more — The Local Caterer offers flexible catering options that can be tailored to any size and style. Our taco bar, BBQ, and Italian Experience menus are particularly popular for private parties, creating a festive atmosphere that guests love.

## Getting Started with The Local Caterer in Chandler

Ready to plan your Chandler event? Contact The Local Caterer at (480) 718-1671 or submit an inquiry through our website. We serve Chandler, Mesa, Gilbert, Scottsdale, Phoenix, and the entire East Valley. Our team will work with you to create a custom catering plan that fits your event, your guests, and your budget.`,
  },

  // ─── POST 6 ──────────────────────────────────────────────────────────────────
  "planning-corporate-events-for-2026-here-s-why-early-booking-matters": {
    title: "Planning Corporate Events for 2026: Why Early Booking Matters",
    metaTitle: "Corporate Event Catering Mesa AZ 2026 | Book Early | The Local Caterer",
    metaDesc: "Corporate event season is coming. Here's why booking your Mesa AZ catering early in 2026 is critical and how The Local Caterer can help you plan ahead.",
    date: "2024-12-15",
    category: "Corporate Catering",
    img: IMG_CORPORATE,
    content: `Corporate event season is approaching fast, and if you haven't started planning your 2026 events, now is the time to act. The best caterers in the Phoenix metro area — including Mesa, Chandler, Scottsdale, and Gilbert — book up quickly, especially for Q1 and Q4 events. Here's why early booking matters and how to get ahead of the competition.

## The Corporate Catering Calendar in Phoenix

The Phoenix metro area has two distinct corporate event peaks. The first runs from January through May, when companies host Q1 kickoffs, client entertainment events, and spring conferences. The second runs from September through December, when holiday parties, year-end celebrations, and Q4 business events dominate the calendar.

During these peak periods, the best catering companies in Mesa and Phoenix are often booked 3-6 months in advance. If you wait until October to book your December holiday party, you may find that your first-choice caterer is already committed elsewhere. Early booking isn't just about securing a date — it's about securing the quality you want.

## Why Early Booking Leads to Better Events

When you book your corporate caterer months in advance, you create space for a better planning process. There's time for a thorough consultation, menu development, and a tasting if needed. There's time to coordinate with your venue, confirm dietary restrictions for your team, and fine-tune the service logistics.

Last-minute corporate catering often means accepting whatever menu is available rather than building the ideal one for your event. It means less time for the caterer to source specialty ingredients, staff appropriately, and prepare thoroughly. The result is almost always a less polished event than what early booking would have produced.

## What to Look for in a Corporate Caterer in Mesa

The best corporate caterers in Mesa combine food quality with operational excellence. Corporate events have zero tolerance for delays, disorganization, or food quality issues — your company's reputation is on the line. Look for a caterer with proven corporate experience, strong references from similar companies, and a clear, professional planning process.

The Local Caterer has served hundreds of corporate events across Mesa, Chandler, Scottsdale, and the broader Phoenix metro. Our corporate clients include technology companies, healthcare organizations, financial services firms, and professional services companies. We understand the standards that corporate events require.

## Our Corporate Catering Services

For corporate clients, The Local Caterer offers a full range of services: breakfast and lunch delivery for meetings and conferences, full-service catering for company events and holiday parties, executive dining experiences for client entertainment, and ongoing catering programs for companies with regular event needs.

Our corporate menus are designed to impress without being pretentious. We offer everything from casual working lunches to elegant multi-course dinners, always with the same commitment to quality and professionalism.

## Book Your 2026 Corporate Events Now

Don't wait until your event is a month away to start thinking about catering. Contact The Local Caterer today at (480) 718-1671 to discuss your 2026 corporate event calendar. We'll help you plan ahead, lock in your dates, and ensure that every event you host reflects the quality your company deserves.`,
  },

  // ─── POST 7 ──────────────────────────────────────────────────────────────────
  "why-summer-2026-weddings-are-booking-earlier-than-ever": {
    title: "Why Summer 2026 Weddings Are Booking Earlier Than Ever",
    metaTitle: "Wedding Catering Mesa AZ 2026 | Book Early | The Local Caterer",
    metaDesc: "Wedding season 2026 is filling up fast. Discover why couples in Mesa and the East Valley are booking their wedding caterers months earlier and how to secure your date.",
    date: "2024-11-30",
    category: "Wedding Catering",
    img: IMG_WEDDING,
    content: `If you're planning a 2026 wedding in Mesa, Chandler, Gilbert, or anywhere in the East Valley, there's one thing you need to know: the best wedding vendors are booking up faster than ever. Wedding caterers, photographers, florists, and venues are all seeing demand that outpaces supply — and the couples who wait are the ones who end up with their second or third choice.

## Why Wedding Bookings Are Accelerating

Several factors are driving earlier wedding bookings across the Phoenix metro area. First, the post-pandemic wedding surge is still working its way through the system. Couples who postponed 2020 and 2021 weddings have created a backlog of demand that continues to affect availability years later.

Second, social media has made couples more aware of the best local vendors — and more eager to secure them early. When you see a caterer's work on Instagram and fall in love with it, you don't want to risk losing them to another couple. The result is that couples are reaching out to vendors earlier in their planning process than ever before.

Third, Arizona's fall wedding season (October through December) is particularly competitive. The weather is perfect, the desert landscapes are stunning, and every couple wants to get married in that window. The demand for quality catering during fall weekends in the East Valley is extraordinary.

## What Happens When You Wait

Couples who wait too long to book their wedding caterer face a difficult choice: accept a less experienced or less capable caterer, or pay premium rush pricing to secure a top-tier caterer who has a last-minute opening. Neither option is ideal.

The most common regret we hear from couples who come to us late is that they wish they'd reached out sooner. Not because we turned them away — we do our best to accommodate every inquiry — but because the planning process is better, the menu is more refined, and the overall experience is more enjoyable when there's adequate time to do it right.

## What to Expect When You Book Early

When you book The Local Caterer for your 2026 wedding, you get the full planning experience. We start with a detailed consultation to understand your vision, your venue, and your guests. From there, we develop a custom menu proposal that reflects your tastes and the overall tone of your wedding.

If you'd like a tasting, we schedule that next — giving you the chance to experience the food before committing. We then finalize the menu, confirm staffing, and coordinate with your venue and wedding planner to ensure seamless execution on your wedding day.

This process takes time to do well. When couples book 6-12 months in advance, we can give every step the attention it deserves. When couples book 6 weeks out, we're working against the clock.

## Securing Your 2026 Wedding Date

If you have a 2026 wedding date in mind, the best time to reach out is now. Contact The Local Caterer at (480) 718-1671 or submit an inquiry through our website. We'll check availability for your date, schedule a consultation, and start building the menu that will make your wedding reception unforgettable.

We serve weddings throughout Mesa, Chandler, Gilbert, Scottsdale, Phoenix, and the greater East Valley. We'd be honored to be part of your wedding day.`,
  },

  // ─── POST 8 ──────────────────────────────────────────────────────────────────
  "affordable-catering-near-me-discover-budget-friendly-options-in-mesa-gilbert-and-queen-creek": {
    title: "Affordable Catering Near Me: Budget-Friendly Options in Mesa, Gilbert & Queen Creek",
    metaTitle: "Affordable Catering Mesa Gilbert Queen Creek AZ | The Local Caterer",
    metaDesc: "Looking for affordable catering in the East Valley? Discover how to get quality catering that fits your budget in Mesa, Gilbert, and Queen Creek, AZ.",
    date: "2024-11-10",
    category: "Food & Mesa",
    img: IMG_FOOD1,
    content: `"Affordable catering near me" is one of the most common searches people make when planning an event in the East Valley. And it makes sense — catering can be one of the largest line items in an event budget, and finding quality food at a price that doesn't break the bank is a legitimate challenge. This guide breaks down how to find affordable catering in Mesa, Gilbert, and Queen Creek without sacrificing quality.

## Redefining "Affordable" in Catering

The first thing to understand is that affordable catering doesn't mean cheap catering. It means catering that delivers genuine value — quality food, professional service, and a positive guest experience at a price point that makes sense for your budget. The goal isn't to spend as little as possible; it's to spend wisely.

In Mesa, Gilbert, and Queen Creek, catering prices vary widely based on service style, menu complexity, guest count, and the level of staffing required. Understanding these variables helps you make smarter decisions about where to invest and where to economize.

## Service Styles That Maximize Value

Buffet-style service is typically more cost-effective than plated dinner service because it requires less serving staff and allows guests to control their own portions. For events where elegance is less critical than abundance and variety, buffet service is an excellent choice.

Station-style service — taco bars, BBQ stations, pasta stations — is another great value option. These formats create an interactive, festive atmosphere that guests love, and they tend to cost less per person than formal plated service while still delivering impressive food quality.

For corporate events and daytime gatherings, boxed lunch service is one of the most cost-effective options available. Individual boxed lunches eliminate the need for serving staff and can be priced very competitively while still delivering quality food.

## Menu Choices That Stretch Your Budget

Certain menu categories offer excellent value without compromising on taste or presentation. Our Southwest Experience menu — featuring proteins like pollo asado, carne asada, and carnitas with rice, beans, and all the accompaniments — is one of our most popular and most cost-effective options. It's festive, filling, and universally loved.

Our Backyard BBQ Experience is similarly excellent value. Slow-smoked brisket, pulled pork, BBQ chicken, and classic sides create a generous, satisfying spread that feels abundant without requiring the premium pricing of a formal plated dinner.

## Getting the Most from Your Catering Budget in Mesa, Gilbert & Queen Creek

The best way to maximize your catering budget is to be transparent with your caterer about what you're working with. A good caterer will help you build the best possible menu within your budget rather than trying to upsell you beyond what you need.

At The Local Caterer, we work with budgets of all sizes. We'll tell you honestly what we can deliver at your price point and make recommendations that maximize value. We'd rather build a long-term relationship with a client who's had a great experience than oversell someone and leave them disappointed.

Contact us at (480) 718-1671 to discuss your event and budget. We serve Mesa, Gilbert, Queen Creek, Chandler, and the entire East Valley.`,
  },

  // ─── POST 9 ──────────────────────────────────────────────────────────────────
  "corporate-catering-scottsdale-phoenix-mesa-az": {
    title: "Corporate Catering in Scottsdale, Phoenix & Mesa: Elevate Your Next Business Event",
    metaTitle: "Corporate Catering Scottsdale Phoenix Mesa AZ | The Local Caterer",
    metaDesc: "Professional corporate catering for Scottsdale, Phoenix, and Mesa businesses. The Local Caterer delivers chef-crafted menus for meetings, conferences, and company events.",
    date: "2024-10-20",
    category: "Corporate Catering",
    img: IMG_CORPORATE,
    content: `Corporate events in the Phoenix metro area — whether in Scottsdale's resort corridor, downtown Phoenix's business district, or Mesa's growing corporate campuses — share a common requirement: the food and service need to be exceptional. In a business context, catering is a direct reflection of your company's standards and attention to detail. Mediocre catering at a corporate event sends a message you don't want to send.

The Local Caterer has built a strong reputation serving corporate clients across Scottsdale, Phoenix, and Mesa. We understand what business events require: punctuality, professionalism, consistent quality, and the ability to execute flawlessly for groups ranging from 20 to 500 people.

## Types of Corporate Events We Cater

Our corporate catering services cover the full spectrum of business events. We regularly cater executive team meetings and working lunches, client appreciation events and business dinners, company-wide all-hands meetings and town halls, holiday parties and year-end celebrations, product launches and press events, and training sessions and multi-day conferences.

Each of these event types has different requirements, and we tailor our approach accordingly. A working lunch for 25 people needs to be efficient and unobtrusive. A client appreciation dinner for 50 needs to be impressive and memorable. A holiday party for 300 needs to be festive, abundant, and smoothly executed. We've done all of these — and we know the difference.

## Our Corporate Catering Menu Options

For corporate events, we offer a range of menu options designed to impress without being overly formal. Our most popular corporate catering choices include:

Our Signature Protein Bowl Experience is perfect for working lunches and health-conscious teams. Guests build their own bowls with a choice of base, protein, and toppings — it's fresh, customizable, and always well-received.

Our Boxed Sandwich Lunch program is ideal for meetings and training sessions where efficiency matters. Individual boxed lunches with a sandwich, side, and beverage can be prepared for any group size and delivered on a precise schedule.

For evening corporate events, our Dinner Entrées menu offers elegant options including herb roasted chicken, braised short rib, beef tenderloin medallions, and citrus butter salmon — all served with a salad course, bread service, and sides.

## Why Scottsdale and Phoenix Businesses Choose The Local Caterer

Our corporate clients choose us for three primary reasons: consistency, communication, and quality. Consistency means that the food tastes the same at your tenth event with us as it did at your first. Communication means you always know exactly what to expect and can reach us when you need to. Quality means that every dish we serve reflects genuine culinary skill and care.

We also understand the unique demands of corporate catering in Scottsdale and Phoenix. Many of our corporate clients host events at resort properties, conference centers, or office campuses with specific vendor requirements. We're experienced at navigating these environments and working within their parameters.

## Corporate Catering for Recurring Events

Many of our corporate clients work with us on a recurring basis — monthly team lunches, quarterly all-hands meetings, annual holiday parties. We offer preferred client pricing for recurring bookings and assign a dedicated coordinator to your account so you're never starting from scratch with each event.

If your company hosts regular events, ask us about our corporate account program. We'll build a standing menu rotation, maintain your dietary restriction records, and make the ordering process as streamlined as possible.

## Dietary Accommodations for Corporate Groups

Corporate groups are diverse, and dietary needs vary widely. We're experienced at building menus that accommodate gluten-free, dairy-free, vegan, vegetarian, halal, and kosher requirements alongside standard options. We label all dishes clearly at service so guests can make informed choices without having to ask.

When you submit your inquiry, let us know about any dietary requirements in your group. We'll factor them into your menu proposal from the start, rather than treating them as an afterthought.

## Serving Scottsdale's Resort Corridor and Phoenix's Business Districts

Scottsdale's resort and conference corridor — from Old Town through North Scottsdale — hosts some of the most significant corporate events in the Southwest. We're experienced at catering in resort properties, conference centers, and private event spaces throughout this area. We understand the vendor requirements, loading dock logistics, and service standards that these venues expect.

In Phoenix, we regularly serve clients in the downtown business district, Tempe's tech corridor, and the growing corporate campuses along the Loop 101. Wherever your event is located in the Phoenix metro, we can get there and execute at the highest level.

## Book Your Corporate Catering Today

Ready to elevate your next corporate event in Scottsdale, Phoenix, or Mesa? Contact The Local Caterer at (480) 718-1671 or submit an inquiry online. We'll respond within 24 hours with availability and a preliminary quote.`,
  },

  // ─── POST 10 ──────────────────────────────────────────────────────────────────
  "how-to-plan-the-perfect-backyard-bbq-catering-in-arizona": {
    title: "How to Plan the Perfect Backyard BBQ Catering in Arizona",
    metaTitle: "Backyard BBQ Catering Arizona Mesa Phoenix | The Local Caterer",
    metaDesc: "Planning a backyard BBQ in Arizona? The Local Caterer's BBQ catering service brings slow-smoked meats, classic sides, and professional service to your outdoor event.",
    date: "2024-09-15",
    category: "BBQ & Outdoor",
    img: IMG_ABOUT,
    content: `There's something uniquely satisfying about a great backyard BBQ in Arizona. The warm evenings, the smell of smoke in the air, the sound of friends and family gathering around tables loaded with food — it's one of the most quintessentially Arizona experiences there is. And when you hire a professional caterer to handle the food, you get all of that without any of the stress.

The Local Caterer's Backyard BBQ Experience is one of our most popular catering options, and for good reason. We bring everything: the slow-smoked meats, the classic sides, the bread service, the setup, and the cleanup. You provide the backyard; we provide the feast.

## What's Included in Our BBQ Catering Experience

Our Backyard BBQ Experience is built around the proteins that define great American BBQ. Our hickory-smoked beef brisket is the centerpiece — slow-smoked to perfection and sliced tableside, it's the kind of brisket that stops conversations. We also offer BBQ pulled pork, grilled BBQ chicken quarters, and smoked sausage, giving your guests plenty of options.

On the sides, we serve the classics that belong at every great BBQ: creamy baked mac and cheese, slow-cooked baked beans, traditional potato salad, classic macaroni salad, and Southern-style green beans. We also offer honey butter cornbread and buttermilk biscuits for bread service.

For salads, we offer a garden salad and our BBQ chopped salad — mixed greens with corn, black beans, tomatoes, cheese, and bold BBQ ranch dressing. It's a crowd-pleaser that balances out the richness of the smoked meats.

## Planning Your Arizona Backyard BBQ

Arizona's climate creates some unique considerations for outdoor catering. In the summer months (June through September), evening events are essential — the desert heat during the day is simply too intense for comfortable outdoor dining. Plan your BBQ to start at 6pm or later, when temperatures begin to drop and the evening becomes genuinely pleasant.

In the fall and spring, Arizona outdoor events are spectacular. October through April is prime outdoor catering season in the East Valley, and our BBQ Experience is perfectly suited to these months. If you're planning a fall or spring BBQ, book early — these months fill up quickly.

Food safety is also important for outdoor events. Our team is trained in proper food handling and temperature management for outdoor service. We bring the right equipment to keep hot foods hot and cold foods cold, regardless of the ambient temperature.

## How Many Guests Can We Serve?

Our BBQ catering experience scales from intimate gatherings of 20 guests to large outdoor events of 300 or more. The service style can be adapted based on your guest count and the layout of your space. For smaller gatherings, we often set up a single buffet line. For larger events, we may use multiple stations to manage flow and reduce wait times.

We'll work with you during the planning process to determine the right setup for your event. We'll also discuss the layout of your outdoor space to ensure we can set up efficiently and serve your guests comfortably.

## Add-Ons That Elevate Your BBQ Experience

Beyond the core BBQ spread, we offer several add-ons that can take your event to the next level. Our charcuterie and grazing boards make a stunning pre-event appetizer station. Our dessert displays — featuring brownies, cookies, and seasonal fruit — are the perfect sweet finish to a savory BBQ feast.

For larger events, we can add a live carving station where our chef slices the brisket tableside. It's a dramatic presentation that guests always love, and it keeps the brisket at perfect serving temperature throughout the event.

## BBQ Catering for Neighborhood Events and HOA Gatherings

The East Valley is home to hundreds of HOA communities and neighborhood associations that host annual events, holiday parties, and community gatherings. Our BBQ catering is perfectly suited to these events — it's crowd-pleasing, scalable, and easy to serve in an open outdoor setting.

We've catered neighborhood events ranging from 50 to 400 guests across Mesa, Gilbert, Chandler, and Queen Creek. If you're organizing a community event, reach out early — spring and fall weekends fill up quickly.

## Book Your Arizona BBQ Catering Today

Ready to take your backyard BBQ to the next level? Contact The Local Caterer at (480) 718-1671 or submit an inquiry online. We serve Mesa, Chandler, Gilbert, Scottsdale, Phoenix, Queen Creek, and the entire East Valley. Our team will put together a custom BBQ catering plan that fits your guest count, your space, and your budget.

Don't settle for doing it all yourself. Let us handle the food so you can enjoy your own party.`,
  },

  // ─── POST 11 ──────────────────────────────────────────────────────────────────
  "baby-shower-catering-mesa-az-ideas-menus-and-tips": {
    title: "Baby Shower Catering in Mesa, AZ: Ideas, Menus & Tips for a Memorable Celebration",
    metaTitle: "Baby Shower Catering Mesa AZ | The Local Caterer",
    metaDesc: "Planning a baby shower in Mesa, AZ? The Local Caterer offers beautiful, customizable catering menus for baby showers of all sizes. Get ideas and book your date.",
    date: "2024-08-20",
    category: "Private Events",
    img: IMG_FOOD2,
    content: `A baby shower is one of the most joyful celebrations a family can host. It's a gathering of the people who love the parents-to-be most, coming together to celebrate the new life that's about to arrive. The food at a baby shower should reflect that joy — beautiful, delicious, and thoughtfully presented.

The Local Caterer has catered dozens of baby showers across Mesa, Chandler, Gilbert, and the East Valley. We understand what makes baby shower catering special, and we bring that understanding to every event we serve.

## Baby Shower Catering Styles That Work

Baby showers typically call for lighter, more elegant fare than a wedding reception or corporate dinner. The most popular catering styles for baby showers in Mesa include:

Brunch catering is a perennial favorite for baby showers. Our brunch menu includes buttermilk pancakes, Belgian waffles, French toast, fluffy scrambled eggs, herb breakfast potatoes, fresh seasonal fruit displays, assorted pastries and muffins, and yogurt parfaits. A beautifully presented brunch spread is visually stunning and universally loved.

Lunch catering is another excellent option, particularly for afternoon showers. Our boxed sandwich lunches, protein bowl experience, and salad and protein options are all well-suited to baby shower settings. Light, fresh, and elegant — exactly what a baby shower calls for.

For cocktail-style baby showers, our cold appetizer selection is perfect. Caprese skewers, shrimp cocktail shooters, stuffed mini sweet peppers, and smoked salmon cucumber rounds create a sophisticated spread that guests will love.

## Menu Customization for Baby Showers

One of the things that makes baby shower catering special is the opportunity to customize the menu around the theme and the parents' preferences. If the parents love Southwest food, we can build a lighter, more elegant version of our Southwest Experience. If they're Italian food lovers, our Italian Experience can be adapted for a daytime shower setting.

We can also accommodate dietary restrictions for guests, which is particularly important for baby showers where the guest of honor may have pregnancy-related dietary needs. We're experienced at building menus that work for everyone at the table.

## Presentation Matters at Baby Showers

Baby showers are highly visual events — guests are taking photos constantly, and the food display is often a centerpiece of those photos. Our team pays careful attention to the presentation of every dish we serve, arranging food displays in ways that are both beautiful and functional.

Our fresh seasonal fruit display, for example, is always arranged with visual impact in mind — vibrant colors, careful placement, and a presentation that looks as good as it tastes. The same attention goes into our charcuterie boards, pastry displays, and every other element of our baby shower menus.

## Popular Baby Shower Venues in Mesa, AZ

Mesa has a wonderful selection of venues that work beautifully for baby showers. The Mesa Arts Center and its surrounding gardens offer a sophisticated setting for larger showers. Private event rooms at Mesa Country Club and Dobson Ranch Golf Club provide elegant indoor options. Many families also choose to host in their own backyard or a family member's home — and our team is equally comfortable catering in any of these settings.

If you're hosting at a venue, we'll coordinate directly with the venue coordinator to ensure our setup and service align with their requirements. If you're hosting at home, we'll handle everything from setup to cleanup so you can focus entirely on your guests.

## Charcuterie and Grazing Tables for Baby Showers

One of the most popular additions to baby shower catering right now is a custom grazing table or charcuterie board. These visually stunning displays of cured meats, cheeses, fresh fruits, crackers, nuts, and accompaniments serve as both a food station and a centerpiece. Guests love them, and they photograph beautifully.

The Local Caterer builds custom grazing tables for baby showers of all sizes. We can scale from a single large board for an intimate gathering to a full 8-foot grazing table for a larger event. We incorporate colors and elements that complement your shower's theme, making it a true focal point of the celebration.

## Planning Your Mesa Baby Shower

If you're planning a baby shower in Mesa, Chandler, Gilbert, or anywhere in the East Valley, The Local Caterer would love to help. We'll work with you to build a menu that fits your theme, your guest count, and your budget. We also offer same-week availability for smaller showers when our schedule permits.

Our service area covers all of Mesa, Chandler, Gilbert, Scottsdale, Phoenix, Queen Creek, and the surrounding East Valley communities. No matter where your shower is located, we can get there.

Contact us at (480) 718-1671 or submit an inquiry online. We typically recommend booking at least 4-6 weeks in advance for baby showers to ensure we can accommodate your date and give your menu the attention it deserves.`,
  },

  // ─── POST 12 ──────────────────────────────────────────────────────────────────
  "celebration-of-life-catering-mesa-az-honoring-a-loved-one-with-food": {
    title: "Celebration of Life Catering in Mesa, AZ: Honoring a Loved One Through Food",
    metaTitle: "Celebration of Life Catering Mesa AZ | The Local Caterer",
    metaDesc: "The Local Caterer provides compassionate, professional catering for celebrations of life and memorial services in Mesa, AZ and the East Valley. We handle every detail.",
    date: "2024-07-10",
    category: "Private Events",
    img: IMG_HERO_MAIN,
    content: `A celebration of life is one of the most meaningful events a family can host. It's a gathering of the people who loved someone, coming together to share memories, find comfort in each other's presence, and honor a life well-lived. The food at a celebration of life should reflect that meaning — warm, generous, and thoughtfully prepared.

The Local Caterer approaches celebration of life catering with the care and sensitivity these events deserve. We understand that families planning these gatherings are often dealing with grief while simultaneously managing the logistics of a significant event. Our goal is to take the catering completely off your plate so you can focus on what matters most: being present with your family and friends.

## What Makes Celebration of Life Catering Different

Celebration of life events have a different emotional texture than weddings or corporate events. The food should be comforting and generous — the kind of food that feels like a warm embrace. It should be easy to eat in a social setting where guests are moving around, sharing stories, and connecting with each other.

For this reason, we often recommend buffet-style or station-style service for celebrations of life. These formats allow guests to eat at their own pace, return for seconds when they're ready, and focus on the social experience rather than waiting for formal service.

## Our Most Popular Menus for Celebrations of Life

Our Backyard BBQ Experience is one of the most popular choices for celebrations of life, particularly for events honoring someone who loved outdoor gatherings and comfort food. Slow-smoked brisket, pulled pork, BBQ chicken, and classic sides create a warm, generous spread that feels like home.

Our Italian Experience is another excellent choice, with its emphasis on comfort and abundance. Chicken marsala, Italian meatballs, pasta, and roasted vegetables create a satisfying spread that works well for both indoor and outdoor events.

For more formal celebrations of life, our Dinner Entrées menu offers elegant options that honor the significance of the occasion while still providing the warmth and comfort that these events call for.

## Handling Every Detail with Care

When you hire The Local Caterer for a celebration of life, we handle every detail of the food service. We arrive early to set up, manage the entire service period, and clean up completely before we leave. We work quietly and efficiently, staying in the background so the focus remains on the people gathered and the life being honored.

We're also experienced at coordinating with venues, funeral homes, and event spaces that host these gatherings. We know how to navigate these environments with the appropriate sensitivity and professionalism.

## Reaching Out During a Difficult Time

We know that reaching out to a caterer while planning a celebration of life can feel like one more difficult task during an already challenging time. We want to make that process as easy as possible. Contact us at (480) 718-1671 or submit an inquiry online, and we'll respond promptly and compassionately.

We serve Mesa, Chandler, Gilbert, Scottsdale, Phoenix, and the entire East Valley. We're honored to help families honor their loved ones through food.`,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
        <Navigation />
        <div className="container py-40 text-center">
          <h1 className="text-4xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>Post Not Found</h1>
          <p className="mb-8 text-base" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>This post may have moved. Browse all our articles below.</p>
          <Link href="/blog" className="btn-primary">Back to Blog <ArrowRight size={14} /></Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse content into sections with H2 headings
  const sections = post.content.split(/\n\n(?=##\s)/).map((block) => {
    if (block.startsWith("## ")) {
      const lines = block.split("\n");
      const heading = lines[0].replace("## ", "");
      const body = lines.slice(1).join("\n").trim();
      return { type: "section" as const, heading, body };
    }
    return { type: "intro" as const, body: block.trim() };
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title={post.metaTitle}
        description={post.metaDesc}
        canonical={`/post/${slug}`}
        type="article"
        breadcrumbs={[
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/post/${slug}` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16"
        style={{ backgroundImage: `url(${post.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.80)" }} />
        <div className="relative z-10 container max-w-4xl">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-6 hover:text-white/80 transition-colors"
            style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs uppercase tracking-widest font-semibold px-3 py-1"
              style={{ backgroundColor: "#C1440E", color: "white", fontFamily: "'Outfit', sans-serif" }}
            >
              {post.category}
            </span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}
            >
              <Calendar size={12} /> {formatDate(post.date)}
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-semibold max-w-3xl leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2">
              {sections.map((section, i) => (
                <div key={i} className="mb-6">
                  {section.type === "section" && (
                    <h2
                      className="text-2xl font-semibold mt-10 mb-4"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1B4332" }}
                    >
                      {section.heading}
                    </h2>
                  )}
                  {section.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed mb-5"
                      style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}

              <hr className="my-10" style={{ borderColor: "#E0D5C0" }} />

              {/* CTA Block */}
              <div className="p-8 mb-8" style={{ backgroundColor: "#1B4332" }}>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
                >
                  Ready to Book Your Event?
                </h3>
                <p className="text-sm mb-5" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
                  Get a free, no-obligation quote for your next event in Mesa, Chandler, Gilbert, or anywhere in the East Valley.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
                    Request a Quote <ArrowRight size={14} />
                  </a>
                  <a
                    href="tel:+14807181671"
                    className="flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest border border-white/30 text-white hover:bg-white/10 transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Phone size={13} /> (480) 718-1671
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                >
                  <ArrowLeft size={14} /> Back to Blog
                </Link>
                <Link href="/catering-menu" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                  View Our Menu <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="p-8 mb-6 sticky top-24" style={{ backgroundColor: "#2D6A4F" }}>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}
                >
                  Get a Free Quote
                </h3>
                <p className="text-sm mb-5" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
                  We serve Mesa, Chandler, Gilbert, Scottsdale, Phoenix, and the entire East Valley.
                </p>
                <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta w-full justify-center mb-3">
                  Request a Quote
                </a>
                <a
                  href="tel:+14807181671"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-widest border border-white/30 text-white hover:bg-white/10 transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Phone size={13} /> (480) 718-1671
                </a>
              </div>

              <div className="p-6" style={{ backgroundColor: "#EDE6D3" }}>
                <h4
                  className="text-xs uppercase tracking-widest font-semibold mb-4"
                  style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                >
                  Our Services
                </h4>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Wedding Catering", href: "/wedding-catering-mesa-az" },
                    { label: "Corporate Catering", href: "/corporate-event-catering" },
                    { label: "Private Events", href: "/private-event-catering" },
                    { label: "BBQ Catering", href: "/barbecue-catering" },
                    { label: "Baby Shower Catering", href: "/baby-shower-catering" },
                    { label: "View Full Menu", href: "/catering-menu" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm flex items-center gap-2 hover:text-[#2D6A4F] transition-colors"
                      style={{ color: "#444", fontFamily: "'Outfit', sans-serif" }}
                    >
                      <ArrowRight size={12} /> {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
