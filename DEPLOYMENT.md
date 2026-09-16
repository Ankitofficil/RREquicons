# Deploying to Hostinger

This site is a **Next.js 16 app with a server-side API route** (`/api/contact`,
which sends email over SMTP). It needs a **Node.js process** — plain static /
PHP hosting cannot run the contact form.

> **Do not use the generic "Custom PHP/HTML website" + Git deploy.** That only
> clones the repo into the document root: nothing builds, nothing runs, and the
> site answers 403 on `/` and 404 everywhere else while serving your source
> files publicly.

There are two supported routes. **Method A is the easy one.**

---

# Method A — Hostinger "Deploy Web App" (recommended)

Hostinger builds from the GitHub repo and runs the app for you, redeploying on
every push.

## 1. Create the app

**hPanel → Add website → Deploy Web App → Continue with GitHub**

Authorize Hostinger, then pick the repository and the `main` branch.

## 2. Build settings

Next.js is normally autodetected. Confirm:

| Setting         | Value           |
| --------------- | --------------- |
| Framework       | Next.js         |
| Install command | `npm install`   |
| Build command   | `npm run build` |
| Start command   | `npm start`     |
| Node version    | 20 or newer     |

`npm run build` produces a normal build and `npm start` (`next start`) serves
it. The standalone bundle is not involved here — `output: "standalone"` is
gated behind `BUILD_STANDALONE=1`, which only Method B sets.

## 3. Environment variables

Set these **before the first build** — see the table in
[§ Environment variables](#environment-variables) below. `NEXT_PUBLIC_SITE_URL`
in particular is compiled into the pages, so it cannot be fixed afterwards
without a rebuild.

## 4. Domain and SSL

Attach the domain to the web app, then install the Let's Encrypt certificate
and enable **Force HTTPS** under **Security → SSL**.

## Redeploying

```bash
git push origin main
```

Hostinger rebuilds automatically. Changing an environment variable requires a
manual redeploy to take effect.

---

# Method B — manual upload of a prebuilt bundle

Use this if you are on a VPS, or if the managed build is unavailable. It needs
Hostinger's **Node.js** app feature (hPanel → Advanced → Node.js).

The bundle is built with `output: "standalone"`, so it carries its own trimmed
`node_modules` and a `server.js`. **You do not run `npm install` on the
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

See [§ Environment variables](#environment-variables) below — set them in
**hPanel → Node.js → Environment Variables**.

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

## Environment variables

Applies to both methods — set them in the platform, never in a committed file.

| Variable               | Value                                  |
| ---------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://rrequicons.com`               |
| `NODE_ENV`             | `production`                           |
| `SMTP_HOST`            | `smtp.hostinger.com`                   |
| `SMTP_PORT`            | `465`                                  |
| `SMTP_USER`            | `info@rrequicons.com`                  |
| `SMTP_PASS`            | the mailbox password                   |
| `CONTACT_FROM_EMAIL`   | `R R Equicons <info@rrequicons.com>`   |
| `CONTACT_TO_EMAIL`     | where enquiries should land            |

**`NEXT_PUBLIC_SITE_URL` is read at build time**, not at runtime — it is
inlined into the prerendered HTML (canonical tags, Open Graph URLs,
`robots.txt`, `sitemap.xml`). Set it before the first build; changing it later
requires a rebuild. If unset it falls back to `https://rrequicons.com`.

The `SMTP_*` values are read at runtime. Create the mailbox first under
**Emails → Email Accounts**. If SMTP is not configured the site still works —
the contact form returns "Email service is not configured yet" (HTTP 503)
rather than sending.

Never commit these: `.env` and `.env*.local` are gitignored.

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

| Symptom                          | Cause                                                |
| -------------------------------- | ---------------------------------------------------- |
| **403 on `/`, 404 elsewhere**    | No app running — the document root is the repo or is empty. The site was created as "Custom PHP/HTML" + Git deploy instead of a Web App. Recreate it with **Deploy Web App** (Method A). |
| Source files readable over HTTP  | Same cause — the repo is being served as static files |
| Unstyled page / CSS 404s         | Method B: `.next/static` missing — re-upload `.next`  |
| 503 from the contact form        | SMTP env vars not set or wrong                       |
| Wrong domain in sitemap/OG       | Built without `NEXT_PUBLIC_SITE_URL`; set it and rebuild |
| `Cannot find module` on start    | Method B: `node_modules` partially uploaded          |
| App won't start                  | Node 20+; Method B's startup file must be `server.js` |
