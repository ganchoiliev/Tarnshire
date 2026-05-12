# Tarnshire

Premium dual-product cleaning brand for Greater Manchester.
Domestic instant booking + commercial quote flow under one brand.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion · GSAP + Lenis · Supabase · Stripe · Vercel.

## Design direction

Modernist-clinical. Bone (`#F7F4EE`) base, Ink (`#15171A`) text, Mineral Teal (`#0E5E5A`) accent. Playfair Display + DM Sans.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                   # http://localhost:3000
```

Other scripts:

| Command         | Purpose                                    |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start dev server with Turbopack            |
| `npm run build` | Production build                           |
| `npm run start` | Run the production build locally           |
| `npm run lint`  | ESLint                                     |

## Project structure

```
app/                  # App Router routes (home, business, about, our-cleaners, the-almanac, portal, admin)
  fonts.ts            # next/font declarations (Playfair Display + DM Sans)
  globals.css         # Tailwind v4 entrypoint + @theme design tokens
  layout.tsx          # Root layout, metadata, font wiring
  page.tsx            # Landing placeholder
components/
  brand/              # Wordmark and other brand primitives
  ui/                 # Generic UI atoms
  layout/             # Header, footer, page chrome
  home/, business/    # Route-specific sections
  shared/
lib/
  supabase/           # DB client + queries (slice 3)
  stripe/             # Checkout + webhooks (slice 3)
  utils/
public/
  img/                # Brand photography
types/
```

## Environment

Site URL is set via `NEXT_PUBLIC_SITE_URL`. Supabase, Stripe, and Resend keys land in later slices — see [.env.example](.env.example) for the full list.

The site is currently `noindex,nofollow` via root layout metadata; flip both to `true` in `app/layout.tsx` when going live.
