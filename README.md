# R R Equicons Pvt Ltd — Website

Marketing site for R R Equicons Pvt Ltd (Jamshedpur) — Ready-Mix Concrete,
civil construction, transport, and real estate.

Built with Next.js 16 (App Router) and Tailwind CSS 4.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

To test the contact form locally, copy `.env.example` to `.env.local` and fill
in the SMTP values. Without them the form returns a 503 and shows a friendly
error — everything else still works.

## Scripts

| Command                  | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| `npm run dev`            | Dev server                                           |
| `npm run build`          | Production build                                     |
| `npm start`              | Serve the production build locally                   |
| `npm run lint`           | ESLint                                               |
| `npm run deploy:package` | Build + assemble the upload bundle in `./deploy`     |

## Deployment

The site needs a Node server (the `/api/contact` route sends email), so it
cannot be hosted as static files. See **[DEPLOYMENT.md](DEPLOYMENT.md)** for
the Hostinger setup.

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run deploy:package
```

`NEXT_PUBLIC_SITE_URL` must be set **at build time** — it is inlined into the
prerendered HTML, `robots.txt`, and `sitemap.xml`.

## Project layout

```
src/app/          routes (App Router), plus sitemap.ts / robots.ts
src/components/   shared UI (Navbar, Footer, ContactForm, …)
src/lib/site.ts   single source of truth for contact details + site URL
public/           images
scripts/          deployment packaging
```

## Editing content

- **Contact details / address / phone** — `src/lib/site.ts` (propagates
  everywhere, including the structured data in `src/app/layout.tsx`)
- **New page** — add it under `src/app/`, then register the path in
  `src/app/sitemap.ts`
