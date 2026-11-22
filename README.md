# Simplicity Hair & Beauty

Website for **Simplicity Hair & Beauty**, a London hair studio for custom wigs, wig installs and hair styling, with UK delivery and online booking.

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**. It is exported as a fully static site, so it runs on GitHub Pages or any static host.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

To build for a sub-path (as on GitHub Pages), run:

```bash
NEXT_PUBLIC_BASE_PATH=/simplicity-hair npm run build
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, featured custom wigs, signature services, recent work |
| `/shop` | Full catalogue with category filter and sort |
| `/shop/[slug]` | Gallery and variant configurator (colour, length, HD lace +£100, quantity) |
| `/services` | Price list by category, each with a **Book** action |
| `/booking` | Step-by-step booking: service → date & time → details → confirmation |
| `/portfolio` | Filterable gallery with lightbox (keyboard ← → Esc) |
| `/contact` | Studio details, hours and contact form |
| `/client-agreement` | Booking, deposit, cancellation and custom-order terms |
| `/checkout` | Order request form, reached from the cart drawer |

The cart is a slide-over drawer available on every page and saved in `localStorage`.

## Folder structure

```
src/
  app/                  routes (one folder per page; client logic sits next to each page)
  components/           Header, Footer, CartDrawer, ProductCard, ServiceRow, SmartImage, ui
  data/                 mock data: site.ts, products.ts, services.ts, portfolio.ts, images.ts
  lib/                  cart.tsx (cart context), storage.ts (localStorage store), format.ts
.github/workflows/      GitHub Pages deploy
```

## Things to replace before launch

- **Contact details** (`src/data/site.ts`): email, phone, address and Instagram handle are placeholders.
- **Photos** (`src/data/images.ts`): these are Unsplash stock images. Put real photos in `public/images/` and reference them with `asset("/images/…")`.
- **Prices and services** (`src/data/services.ts`, `src/data/products.ts`): check them against the studio's real price list.
- **Backend**: bookings, orders and messages are kept in the browser's `localStorage`. To connect a real API or database, swap the helpers in `src/lib/storage.ts`.

## Deployment

Every push to `main` builds the site and publishes `out/` to the `gh-pages` branch.
To turn the site on, open **Settings → Pages** in the repo and set **Source** to *Deploy from a branch*, branch **gh-pages**, folder **/ (root)**.
