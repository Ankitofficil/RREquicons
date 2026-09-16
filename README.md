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
cannot be served as static files. See **[DEPLOYMENT.md](DEPLOYMENT.md)**.

Deployed via Hostinger's **Deploy Web App**, which builds from this repo on
every push to `main` (`npm install` → `npm run build` → `npm start`).

`npm run deploy:package` is the fallback: it produces a self-contained bundle
in `./deploy` for manual upload, and is the only thing that turns on
`output: "standalone"` (via `BUILD_STANDALONE=1`).

`NEXT_PUBLIC_SITE_URL` is read **at build time** — it is inlined into the
prerendered HTML, `robots.txt`, and `sitemap.xml`, so it must be set in the
host's environment before the build.

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
