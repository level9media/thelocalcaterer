# The Local Caterer — Netlify Deployment Package

This export is prepared for a **Netlify Git or CLI deployment**. It contains the complete source code, the generated static site, a Netlify Functions API adapter, and locally bundled production media.

## What is bundled locally

The package includes the site-used images, the homepage video, logo, and downloadable menu PDF under `client/public/assets/media/`. The Netlify build rewrites the original CloudFront media base to `/assets/media`, so the deployed public website loads these files from the Netlify site rather than the prior CDN.

The `netlify:build` command builds the client, creates the SSR bundle, and pre-renders every indexable marketing page to static HTML. This preserves crawlable text, links, titles, descriptions, and canonical tags on Netlify's static CDN.

## Deploy steps

1. Unzip this folder and upload it to a private Git repository. Deploy from that repository in Netlify, or deploy with the Netlify CLI.
2. In Netlify, choose this repository and use the included `netlify.toml` settings. The build command is `pnpm run netlify:build` and the publish directory is `dist/public`.
3. Configure the custom domain and point DNS to Netlify before switching traffic.
4. Copy the production environment values listed below from the existing live setup. Do not commit them to the repository.
5. In Stripe, change the webhook endpoint to `https://YOUR-NETLIFY-DOMAIN/api/stripe/webhook`, then replace `STRIPE_WEBHOOK_SECRET` in Netlify with that endpoint's signing secret.
6. Test the school-lunch checkout, customer confirmation email, kitchen notification, quote forms, careers applications, and admin OAuth after deploy.

> Dragging only `dist/public` into Netlify's manual deploy screen will publish the complete static marketing site and bundled media, but it does **not** deploy the API function. Use the repository/CLI method above for the operational features.

## Required Netlify environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL/TiDB database for leads, orders, and applications. |
| `JWT_SECRET` | Session signing. |
| `STRIPE_SECRET_KEY` | Live Stripe Checkout and webhook operations. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe publishable key. |
| `STRIPE_WEBHOOK_SECRET` | Signature verification for the Netlify Stripe webhook endpoint. |
| `SMTP_USER` | Outbound email account. |
| `SMTP_PASS` | SMTP app password. |
| `MAILCHIMP_API_KEY` | Mailing list subscriptions. |
| `OAUTH_SERVER_URL` | Existing OAuth provider endpoint for admin access. |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL used by the client. |
| `VITE_APP_ID` | OAuth application identifier. |
| `BUILT_IN_FORGE_API_URL` | Existing chatbot / platform API endpoint, if retained. |
| `BUILT_IN_FORGE_API_KEY` | Server-side chatbot / platform API credential, if retained. |
| `VITE_FRONTEND_FORGE_API_URL` | Browser-accessible platform API endpoint, if retained. |
| `VITE_FRONTEND_FORGE_API_KEY` | Browser-accessible platform API credential, if retained. |

## Operational note

The marketing website, media, static SEO pages, quote form client, careers form client, school-lunch UI, and admin UI are all included. The live operational features require the environment values above because orders, payments, applications, email, CRM activity, and authentication intentionally use a database and third-party services. They are routed through `netlify/functions/api.ts`; they are not mocked or embedded in the static files.
