# AI Marketing Consultation Landing Page

A mobile-first Next.js landing page and thank-you flow for a free AI-powered digital marketing consultation.

## Local setup

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Production build

Run `npm run build` to create and verify the production build. No environment variables are required.

## Deploy to Vercel

Import this repository into Vercel and keep the detected Next.js defaults. Vercel will install dependencies and run `npm run build` automatically.

## Before launch

- Add the supplied logo in `components/Header.tsx` at the marked comment.
- Add the real Vimeo embed in `app/thank-you/page.tsx` at the marked comment and keep autoplay disabled.
- Connect the form to a real backend when one is available. The current form intentionally simulates submission before redirecting to `/thank-you`.
