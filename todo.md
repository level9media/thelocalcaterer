# The Local Caterer — Project TODO

## Core Site Build
- [x] Homepage with hero video, services grid, testimonials, locations, CTA
- [x] Navigation component (desktop + mobile responsive)
- [x] Footer with sitemap links, social, contact info
- [x] About page with chef bio, values, team
- [x] Services overview page
- [x] Contact page with inquiry form
- [x] Gallery page with masonry grid, lightbox, category filter
- [x] Press/media page
- [x] Privacy policy page
- [x] 404 Not Found page (branded)
- [x] Contact Thanks page (post-submission confirmation)

## Service Pages
- [x] Wedding Catering (/wedding-catering-mesa-az)
- [x] Corporate Catering (/corporate-event-catering)
- [x] Private Event Catering (/private-event-catering)
- [x] Private Party Catering (/private-party-catering)
- [x] Baby Shower Catering (/baby-shower-catering)
- [x] Celebration of Life (/celebration-of-life-catering)
- [x] BBQ Catering (/barbecue-catering)

## Location Pages
- [x] Mesa AZ (/catering-mesa-az)
- [x] Phoenix AZ (/catering-phoenix-az)
- [x] Scottsdale AZ (/catering-scottsdale-az)
- [x] Chandler AZ (/catering-chandler-az)
- [x] Gilbert AZ (/catering-gilbert-az)

## Menu Pages
- [x] Catering Menu overview (/catering-menu)
- [x] Mexican Catering Menu (/mexican-catering-menu)
- [x] Lunch Catering Menu (/lunch-catering-menu)
- [x] Italian Catering Menu (/italian-catering-menu)
- [x] Breakfast Catering Menu (/breakfast-catering-menu)
- [x] Asian Catering Menu (/asian-catering-menu)
- [x] Dessert Menu (/dessert-menu)
- [x] Sandwich Bar (/sandwich-bar-mesa-az)
- [x] Holiday Menu (/holiday-menu-2025)

## Blog System
- [x] Blog listing page with category filter and featured post
- [x] Dynamic blog post page (10+ SEO-optimized posts)
- [x] Blog category filter page

## SEO Infrastructure
- [x] SEO component (react-helmet-async) with title, meta, OG, JSON-LD schema
- [x] HelmetProvider in main.tsx
- [x] SEO on Homepage
- [x] SEO on About page
- [x] SEO on Services page
- [x] SEO on Gallery page
- [x] SEO on Contact page
- [x] SEO on Press page
- [x] SEO on Blog listing page
- [x] SEO on BlogPost page (dynamic per-post meta)
- [x] SEO on all service pages (via ServicePage component)
- [x] SEO on all location pages (via LocationPage component)
- [x] sitemap.xml (all pages, lastmod, priority)
- [x] robots.txt (allow all, disallow /api/, sitemap reference)

## 301 Redirects
- [x] redirects.ts middleware (60+ legacy Wix URL mappings)
- [x] Regex-based redirects for blog/post patterns
- [x] Trailing slash normalization
- [x] Registered in Express server before tRPC routes

## Backend / Forms
- [x] Mailchimp helper (server/mailchimp.ts)
- [x] Contact form tRPC router (server/contactRouter.ts)
- [x] Contact form wired to tRPC mutation (Contact.tsx)
- [x] Owner notification on form submission
- [x] Mailchimp list subscription on form submission

## Pre-Launch Polish
- [x] Per-route SEO metadata for all CateringMenu sub-pages (dynamic useLocation)
- [x] Fixed wrong phone number in Home.tsx (638-9126 → 665-5577)
- [x] Fixed Level Nine Media URL typo in Footer (levenninemedia → levelninemedia)
- [x] Removed duplicate barbecue-catering route in App.tsx
- [x] Updated sitemap.xml lastmod to 2026-04-12
- [x] Favicon created from caterer logo + added to index.html
- [x] index.html with apple-touch-icon, font preloads, proper meta viewport
- [x] All tests passing (2/2)
- [x] TypeScript clean (0 errors)
- [x] No browser console errors
- [x] No network 404s or 500s

## Completed — Final Production Tasks
- [x] Real menu PDF upload — 2025 Catering Menu PDF uploaded to CDN, wired to all download buttons
- [x] AI chatbot — built-in LLM, FAQ + lead capture, floating button on all pages
- [x] Built-in leads dashboard — /admin/leads with status management, filters, stats, auto-refresh
- [x] DB leads table — every form submission stored in database (caterer, wedding, mealprep, charcuterie, bakken, chatbot)
- [x] GA4 analytics (G-PLKEP3P8TM) — gtag.js in index.html + page view tracking on every route change
- [x] Image optimization — hero images converted to WebP and re-uploaded to CDN
- [x] All tests passing (2/2), TypeScript clean (0 errors)

## In Progress
- [x] Upload 5 real team photos to CDN (Josh black coat, Josh white coat, Kasandra black shirt, Kasandra magazine cover, Josh kitchen)
- [x] Update About page: replace chef image with Josh in white chef coat
- [x] Update Press page: use Kasandra magazine cover as press feature, use other photos for team section
- [x] Audit all CDN image URLs — all 20 gallery images + all hero/content images confirmed 200 OK
- [x] Fixed broken hero_about URL in Blog.tsx and BlogPost.tsx
- [x] Regenerate sitemap.xml — 52 URLs, all with lastmod 2026-04-12, correct domain thelocalcaterer.com
- [x] Fix navigation dropdown hover delay — added 250ms close delay so mouse can reach dropdown items
- [x] Fix chatbot system prompt: replace all Tripleseat URL references with /contact page link

## Pending / Future
- [ ] Google Search Console verification meta tag (need GSC verification code)
- [ ] Submit sitemap in Google Search Console post-launch
- [ ] thelocalmealprep.com build
- [ ] thelocalcharcuterie.com build
- [ ] thelocalwedding.com build
- [ ] bakkenhospitality.com build

## Email Notification Fixes
- [x] Send inquiry notifications to both josh@thelocalcaterer.com and kasandra@thelocalcaterer.com
- [x] Change notification sender/app name from "Manus Team" to "The Local Caterer"
- [x] Remove "This is a notification from the website you created" footer text from emails

## Leads Dashboard Access
- [x] Grant josh@thelocalcaterer.com and kasandra@thelocalcaterer.com access to /admin/leads dashboard
- [x] Remove all "Manus" references from client-facing pages and components
- [x] Grant josh@thelocalcaterer.com and kasandra@thelocalcaterer.com admin access to leads dashboard (email-based whitelist bypass)

## URGENT: SEO Emergency Fix
- [x] Implement server-side SEO meta tag injection (seoMeta.ts + vite.ts) — Google now sees unique titles/descriptions without JS
- [x] Audit all page meta titles and descriptions — 20+ pages with unique, keyword-rich tags
- [x] Add canonical tags to every page pointing to the correct URL (server-injected)
- [x] Verify robots.txt is not blocking Googlebot
- [x] Verify sitemap.xml exists and is complete with all URLs
- [x] Add LocalBusiness + Catering JSON-LD schema to homepage and service pages
- [x] Add Open Graph and Twitter meta tags for social sharing (server-injected)
- [ ] Verify page load speed and Core Web Vitals
- [ ] Google Search Console: request re-crawl of all pages after fix deployment

## Homepage Testimonial Section
- [x] Add premium testimonial section to homepage with real quotes, reviewer photos, star ratings, and platform badges

## SEO Blog Posts & Schema Markup
- [x] Add AggregateRating JSON-LD schema to homepage (5.0 stars, 500+ reviews)
- [x] Add AggregateRating schema to all pages via server-side injection in seoMeta.ts
- [x] Build/verify blog system infrastructure (routes, index page, post template) — 12 posts active
- [x] 12 SEO blog posts already published and active with unique server-side meta tags
- [x] Add server-side SEO meta tags for all 12 blog post URLs in seoMeta.ts
- [x] Internal links from blog posts to service and location pages (existing content)

## Service Agreement Page
- [x] Build /service-agreement page with full contract content and branded layout
- [x] Add PDF download button using browser print-to-PDF (window.print) with print stylesheet
- [x] Add Service Agreement link to footer
- [x] Register /service-agreement route in App.tsx
- [x] Add SEO meta tags for service agreement page in seoMeta.ts

## Student Lunch Ordering System
- [x] Add Stripe integration to the project (v22.1.0, sandbox provisioned)
- [x] Create lunchOrders database table (schema + migration pushed)
- [x] Build /school-lunch hidden page with August menu, meal checkboxes, order form, running total, Friday cutoff logic, and Stripe checkout
- [x] Build /admin/lunch-orders admin page with sortable table, kitchen view (portions by meal), and CSV export
- [x] Add server-side tRPC procedures: getMenu, createCheckout, getOrders, getOrdersByMeal
- [x] Stripe webhook handler at /api/stripe/webhook — marks orders paid on checkout.session.completed
- [x] Add noindex SEO meta for /school-lunch and /admin/lunch-orders (hidden from Google)
- [x] Register both routes in App.tsx

## Student Portal (Multi-Student Lunch Ordering)
- [ ] DB: Add parentAccounts table (id, email, passwordHash, name, phone, createdAt)
- [ ] DB: Add students table (id, parentAccountId FK, name, allergies, createdAt)
- [ ] DB: Add lunchOrderItems table (id, orderId, studentId, mealId) for per-student per-meal tracking
- [ ] DB: Update lunchOrders to link to parentAccountId
- [ ] Server: Parent auth procedures — register, login (JWT cookie), me, logout
- [ ] Server: Student procedures — addStudent, removeStudent, getStudents
- [ ] Server: Portal order procedures — createPortalCheckout (per-student meal map), getMyOrders
- [ ] Server: Update Stripe webhook to handle new portal order structure
- [ ] Server: Update admin getOrders + getOrdersByMeal for new schema
- [ ] Frontend: /school-lunch — updated landing with Login / Create Account CTAs
- [ ] Frontend: /school-lunch/login — email + password login form
- [ ] Frontend: /school-lunch/register — parent registration form
- [ ] Frontend: /school-lunch/portal — ordering dashboard (student list, per-student meal checkboxes, running total, checkout)
- [ ] Frontend: /school-lunch/portal/students — manage students (add/remove/edit)
- [ ] Frontend: /school-lunch/portal/orders — parent order history
- [ ] Admin: Update /admin/lunch-orders to show per-student breakdown

## School Lunch — Quantity Per Meal
- [x] Frontend: Replace checkbox with +/- quantity selector per meal (0–10), show per-meal subtotal
- [x] Frontend: Update running total to reflect quantities
- [x] Server: Update createCheckout — collapses duplicate IDs into Stripe quantity field
- [x] Server: Pass quantity to Stripe line items
- [x] Admin: mealCount field already reflects total portions; selectedMeals JSON stores per-meal quantities

## School Lunch — Order Confirmation Emails
- [x] Parent confirmation email on paid order (order summary, meals, total)
- [x] Kitchen notification email to josh@ + kasandra@ on paid order

## SEO Recovery Build — Blog, Internal Linking, Schema
- [ ] Blog post: "Baby Shower Catering in Mesa AZ" (targeting trending keyword +200%)
- [ ] Blog post: "Wedding Catering in Mesa AZ — Complete Planning Guide"
- [ ] Blog post: "Corporate Lunch Catering Mesa AZ — Office Catering Ideas"
- [ ] Blog post: "How to Choose a Caterer in Phoenix AZ"
- [ ] Blog post: "Charcuterie Boards & Grazing Tables for Events in Scottsdale"
- [ ] Internal linking: Add "Related Services" section to all 5 location pages
- [ ] Internal linking: Add "Service Areas" section to all 3 main service pages
- [ ] Enhanced LocalBusiness schema on homepage (reviews, hours, service areas, social links including TheKnot/WeddingWire/Yelp)
- [ ] FAQ schema on all 5 location pages (Mesa, Phoenix, Scottsdale, Chandler, Gilbert)
- [ ] Add TheKnot, WeddingWire, Yelp links to footer and About page

## Careers Page
- [x] Add jobApplications table to drizzle/schema.ts and run db:push
- [x] Add sendJobApplicationEmail helper to server/email.ts
- [x] Add careersRouter.ts with submitApplication tRPC procedure
- [x] Build /careers page UI with open positions and application form
- [x] Add /careers route to App.tsx
- [x] Add Careers link to Footer
- [x] Add /careers to seoMeta.ts

## SEO Crawlability and Server Rendering
- [x] Audit every public route, title, description, canonical, sitemap, and crawlable anchor
- [x] Build a single route registry for public metadata, sitemap, footer links, and SSR verification
- [x] Ensure every public internal navigation element renders a crawlable anchor with href
- [x] Expand the site-wide footer with grouped links to every indexable page
- [x] Convert public routes to server-rendered HTML with hydration for client navigation
- [x] Add per-route client navigation metadata updates and self-referencing canonical tags
- [x] Validate robots.txt and sitemap.xml against the public route registry
- [x] Add crawler verification coverage and confirm Googlebot receives content-rich deep-route HTML

## Netlify Export Package
- [ ] Audit remote images, video, and runtime dependencies for the deployable export
- [ ] Build a Netlify-compatible static site bundle with local image and video assets
- [ ] Include source, configuration, deployment instructions, and backend integration notes in a ZIP archive
- [ ] Validate the archive contents, local asset references, and production build output
