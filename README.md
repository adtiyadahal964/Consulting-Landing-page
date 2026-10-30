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

The browser submits to the same-origin `/api/consultation` route. That route validates the payload again and sends the email from the server so provider credentials never reach the browser.
