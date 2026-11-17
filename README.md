# AI Marketing Consultation Landing Page

A mobile-first Next.js landing page and thank-you flow for a free AI-powered digital marketing consultation.

## Local setup

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add the server-only email settings.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Production build

Run `npm run build` to create and verify the production build.

## Deploy to Vercel

Import this repository into Vercel and keep the detected Next.js defaults. Add these Production environment variables before deploying:

- `RESEND_API_KEY`: server-only Resend API key.
- `CONSULTATION_FROM_EMAIL`: sender using a domain verified in Resend.
- `CONSULTATION_TO_EMAIL`: recipient for consultation requests (defaults to `adtiyadahal964@gmail.com`).

Vercel will install dependencies and run `npm run build` automatically. Do not prefix any of these variables with `NEXT_PUBLIC_`.

## Consultation form

The consultation form posts directly to the configured Flodesk inline form. Its Flodesk form ID is `6afc66a255c0e21c9329e9e0`, which adds subscribers to the assigned segment and starts its workflow. The existing landing-page layout is retained while the following data is sent to Flodesk:

- Full Name
- Email Address
- Phone / WhatsApp Number
- Business Name
- Website or Social Media Link
- Main Business Challenge

Keep the Flodesk form published, assigned to the intended segment, and connected to the intended workflow. The success behavior configured in Flodesk redirects visitors to `/thank-you/`.
