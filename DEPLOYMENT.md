# Deploying to Hostinger (Business plan)

This site is a **Next.js 16 app with a server-side API route** (`/api/contact`,
which sends email over SMTP). It therefore needs Hostinger's **Node.js
application** hosting — the static-file/`public_html` route cannot run the
contact form.

The build uses `output: "standalone"`, so the uploaded bundle carries its own
trimmed `node_modules` and a `server.js`. **You do not run `npm install` on the
server.**

---

## 1. Build the bundle locally

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run deploy:package
```

This clears `.next`, runs `next build`, and assembles everything to upload into
`./deploy`.

> **Set `NEXT_PUBLIC_SITE_URL` at build time, not on the server.**
> It is baked into the prerendered HTML (canonical tags, Open Graph URLs,
> `robots.txt`, `sitemap.xml`). Setting it only in hPanel has **no effect** —
> you must rebuild to change the domain. Omitting it falls back to
> `https://rrequiconspvtltd.com` and the script prints a warning.

Resulting `./deploy`:

```
.next/          server chunks + hashed static assets
node_modules/   only the traced production dependencies
public/         logo.png, rr-equicons-hq.png
server.js       the entry point
package.json    { "start": "node server.js" }
```

## 2. Create the Node.js app in hPanel

**hPanel → Websites → (your site) → Advanced → Node.js**

| Setting              | Value                                      |
| -------------------- | ------------------------------------------ |
| Node.js version      | 20 LTS or newer (built against Node 24)    |
| Application root     | e.g. `domains/yourdomain.com/app`          |
| Application URL      | your domain                                |
| Application startup  | `server.js`                                |

## 3. Upload

Upload the **contents** of `./deploy` (not the `deploy` folder itself) into the
application root you configured. File Manager → Upload, or SFTP:

```bash
sftp -P 65002 u123456789@yourdomain.com
# then:  put -r deploy/*   →  domains/yourdomain.com/app/
```

Make sure the hidden `.next` directory is included — some FTP clients skip
dot-directories by default. Nothing works without it.

## 4. Environment variables

**hPanel → Node.js → Environment Variables.** These are read at runtime by the
contact form:

| Variable             | Value                                            |
| -------------------- | ------------------------------------------------ |
| `NODE_ENV`           | `production`                                     |
| `SMTP_HOST`          | `smtp.hostinger.com`                             |
| `SMTP_PORT`          | `465`                                            |
| `SMTP_USER`          | `info@yourdomain.com`                            |
| `SMTP_PASS`          | the mailbox password                             |
| `CONTACT_FROM_EMAIL` | `R R Equicons <info@yourdomain.com>`             |
| `CONTACT_TO_EMAIL`   | where enquiries should land                      |

Create the mailbox first under **Emails → Email Accounts**. Do not upload
`.env.local` — keep secrets in hPanel.

If SMTP is not configured, the site still works; the contact form returns a
"Email service is not configured yet" message (HTTP 503) instead of sending.

## 5. Start and verify

Hit **Restart** in the Node.js panel, then check:

- `https://yourdomain.com` loads with styling (if CSS 404s, `.next/static`
  did not upload)
- `https://yourdomain.com/robots.txt` and `/sitemap.xml` show **your** domain
- Submit the contact form and confirm the email arrives

## 6. SSL and domain

**hPanel → Security → SSL** — install the free Let's Encrypt certificate and
enable **Force HTTPS**. The app already sends `Strict-Transport-Security`, so
serve it over HTTPS only.

---

## Redeploying after a change

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run deploy:package
```

Re-upload the contents of `./deploy` (replacing `.next`, `public`, `server.js`,
and `node_modules`) and hit **Restart**. Old hashed files under `.next/static`
can be deleted; filenames are content-hashed so there is no cache conflict.

## Notes

- **Image optimization / `sharp`.** `next build` only traces the native `sharp`
  binary for the machine that ran it, so a Windows- or macOS-built bundle would
  silently serve unoptimized full-size images on Hostinger's Linux server.
  `npm run deploy:package` therefore also downloads `@img/sharp-linux-x64` into
  the bundle. If it prints a warning that it could not fetch them, images still
  render — just unoptimized — and you can fix it by running
  `npm install sharp` in the app root on the server.
- **`compress: false`** in `next.config.ts` — Hostinger's LiteSpeed already
  gzips/brotlis responses; double-compressing wastes CPU. If you ever move to a
  host without a compressing proxy, turn this back on.
- **Security headers** (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS) are set in `next.config.ts`,
  and `poweredByHeader` is disabled.
- **Adding a page?** Add its path to `src/app/sitemap.ts` — the list is manual.
- **Changing contact details?** Edit `src/lib/site.ts`; it feeds the whole site
  plus the structured data in `src/app/layout.tsx`.

## Troubleshooting

| Symptom                        | Cause                                              |
| ------------------------------ | -------------------------------------------------- |
| Unstyled page / CSS 404s       | `.next/static` missing — re-upload the `.next` dir |
| 503 from the contact form      | SMTP env vars not set or wrong                     |
| Wrong domain in sitemap/OG     | Rebuilt without `NEXT_PUBLIC_SITE_URL`             |
| `Cannot find module` on start  | `node_modules` partially uploaded — re-upload      |
| App won't start                | Startup file must be `server.js`, Node 20+         |
