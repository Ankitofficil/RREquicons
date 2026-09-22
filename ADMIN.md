# Admin panel

Add and edit projects, case studies, insights and team members — including
photos — at **`/admin`**, without touching code. The Leadership tab controls
who appears on `/about/leadership`.

## How it works

Content lives as JSON in `content/` and photos in `public/uploads/`. Saving in
the panel **commits those files to GitHub**, which triggers Hostinger's
auto-deploy. The repository is the database.

That has two consequences worth knowing:

- Changes survive redeploys, because the repo *is* the source of truth.
- Changes appear on the live site **one to two minutes after saving**, once the
  rebuild finishes — not instantly.

Every edit is also a normal commit, so the history shows who changed what, and
anything can be reverted with git.

## Setup

Set these in **hPanel → your web app → Environment Variables**:

| Variable               | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| `ADMIN_PASSWORD`       | a long random password — the only credential          |
| `ADMIN_SESSION_SECRET` | 16+ random chars, signs the session cookie            |
| `GITHUB_TOKEN`         | fine-grained PAT, **Contents: Read and write**        |
| `GITHUB_REPO`          | `Ankitofficil/RREquicons`                             |
| `GITHUB_BRANCH`        | `main`                                                |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Create the token at **GitHub → Settings → Developer settings → Personal access
tokens → Fine-grained tokens**, scoped to this repository only, with
**Contents: Read and write**. Nothing else is needed.

**Settings → Storage** in the panel tells you whether the token works. If it
says GitHub is not configured, edits are saved locally and lost on the next
deploy.

## Photos

Uploads are cropped and re-encoded server-side to fixed sizes, so cards never
end up with mismatched heights and a 12 MP phone photo does not ship to
visitors at full size:

| Where            | Ratio  | Stored size |
| ---------------- | ------ | ----------- |
| Project photos   | 16:9   | 1600×900    |
| Team portraits   | 3:4    | 900×1200    |
| Case study photos| 4:3    | 1600×1200   |
| Article images   | 16:9   | 1600×900    |
| Social previews  | 1.91:1 | 1200×630    |

The uploader shows a locked crop box at the target ratio with a slider to
reposition it, so you choose which part is kept. Output is WebP. JPEG, PNG,
WebP and AVIF are accepted, up to 12 MB.

## Security

- `/admin` and `/api/admin/*` are gated in `src/proxy.ts`, which runs **before**
  any page renders — an unauthenticated request never reaches the panel.
- The session is an HMAC-signed, httpOnly cookie that expires after 12 hours.
  A forged or tampered cookie is rejected.
- Login is rate-limited to 8 attempts per 10 minutes per IP.
- The panel sets `noindex`, so it stays out of search results.

The password is the only credential — treat it accordingly, and use a
different one from your GitHub or hosting logins.

## Day to day

- **Reorder** with the up/down arrows. The public pages render in this order,
  so the top item appears first. (Hidden while searching, since moving a
  filtered row would be ambiguous.)
- **Duplicate** copies an entry as a starting point for a similar one.
- **Search** filters the current tab.
- **Delete** asks for confirmation and cannot be undone from the panel, though
  the commit history still has it.

## Adding a new field

1. Add it to the interface in `src/lib/content-types.ts`
2. Add it to the relevant `FIELDS` list in `src/app/admin/ItemForm.tsx`
3. Render it on the public page

Existing records simply lack the field until edited, so nothing breaks.
