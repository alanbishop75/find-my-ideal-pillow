# FindMyIdealPillow

Free, personalised pillow recommendations — no sign-up, no faff.  
Live at: **[findmyidealpillow.com](https://www.findmyidealpillow.com)**

---

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Deployed on [Vercel](https://vercel.com)
- No database — all scoring runs client-side in the browser

---

## Local development

```bash
npm install
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001).

---

## Key commands

| Command | Purpose |
|---|---|
| `npm run dev -- -p 3001` | Start local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm test` | Jest unit tests |
| `npx playwright test` | E2E smoke tests (requires local server running) |

---

## Project structure

```
app/                  Pages (Next.js App Router)
  pillow/
    questionnaire/    Questionnaire page
    results/          Results page
    [slug]/           SEO landing pages (generated from seo-pages.ts)
  about/              About page
  privacy-policy/     Privacy policy
  admin/              Admin UI
components/           Shared UI components
config/
  pillow/
    products.ts       Product catalogue
    questionnaire.ts  Single active questionnaire (v1)
    scoring.ts        Single active scoring engine
    seo-pages.ts      SEO landing page definitions
  registry.ts         Single-product config wiring
  domain-map.ts       Domain → product mapping
  global-theme.json   Active theme config
core/                 Shared types, theme, context
lib/                  Scoring engine types and tests
pages/api/            Admin API routes (login, set-theme)
tests/                Playwright E2E smoke tests
```

---

## Questionnaire policy

The pillow fitter uses a single questionnaire and scoring model (`pillow-v1`).
Seven questions cover: sleep position, firmness preference, fill preference,
sleeping temperature, neck/shoulder comfort, allergy needs, and budget.

---

## Region handling

The app resolves region-specific wording and legal views in this order:

1. Manual region override selected by the visitor
2. Server-side geo detection from Vercel's `x-vercel-ip-country` header
3. Browser locale fallback when the geo country is missing
4. Default to UK if none of the above is available

Current locale mappings:
- `en-US` -> `US`
- `en-GB` -> `UK`

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full production URL, e.g. `https://www.findmyidealpillow.com` |
| `NEXT_PUBLIC_GA4_ID` | No | Google Analytics 4 Measurement ID |
| `ADMIN_PASSWORD` | Yes | Password for the `/admin` route |

Set these in Vercel → Project → Settings → Environment Variables.

---

## Deploy

Use a pull request for every production release. Vercel deploys production only after the PR is merged to `main`.

Before going live, verify:
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://www.findmyidealpillow.com` in Vercel
- [ ] `/robots.txt` and `/sitemap.xml` visible on production host
- [ ] Canonical tag correct on homepage
- [ ] Admin login works at `/admin/login`
- [ ] Questionnaire → results flow works end to end
- [ ] Amazon UK affiliate tag (`findmyideal-21`) is live
- [ ] Amazon US affiliate tag set once Associates approved

---

## Architecture note

Built on the FindMyIdeal foundation (golf-ball v1.0.0). Each FindMyIdeal product is
an independent repo — no shared runtime code. Product-specific config lives entirely
in `config/pillow/`.


---

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Deployed on [Vercel](https://vercel.com)
- No database — all scoring runs client-side in the browser

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm test` | Jest unit tests |
| `npx playwright test` | E2E smoke tests (requires local server running) |

---

## Project structure

```
app/                  Pages (Next.js App Router)
  golf-ball/
    questionnaire/    Questionnaire page
    results/          Results page
    [slug]/           SEO landing pages (generated from seo-pages.ts)
  about/              About page
  privacy-policy/     Privacy policy
  admin/              Admin UI
components/           Shared UI components
config/
  golf-ball/
    products.ts       Product catalogue
    questionnaire.ts  Single active questionnaire (v1)
    scoring.ts        Single active scoring engine
    seo-pages.ts      SEO landing page definitions
  registry.ts         Single-product config wiring
  domain-map.ts       Domain → product mapping
  global-theme.json   Active theme config
core/                 Shared types, theme, context
lib/                  Scoring engine types and tests
pages/api/            Admin API routes (login, set-theme)
tests/                Playwright E2E smoke tests
```

---

## Questionnaire policy

The golf-ball fitter now uses a single questionnaire and scoring model (`v1`).
Version switching has been removed from the admin UI and API routes.

---

## Region handling

The app resolves region-specific wording and legal views in this order:

1. Manual region override selected by the visitor
2. Server-side geo detection from Vercel's `x-vercel-ip-country` header
3. Browser locale fallback when the geo country is missing
4. Default to UK if none of the above is available

Current locale mappings:
- `en-US` -> `US`
- `en-GB` -> `UK`

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full production URL, e.g. `https://www.findmyidealgolfball.com` |
| `ADMIN_PASSWORD` | Yes | Password for the `/admin` route |

Set these in Vercel → Project → Settings → Environment Variables.

---

## Deploy

Use a pull request for every production release. Vercel deploys production only after the PR is merged to `main`.

Before going live, verify:
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain in Vercel
- [ ] `/robots.txt` and `/sitemap.xml` visible on production host
- [ ] Canonical tag correct on homepage (`<link rel="canonical" href="https://www.findmyidealgolfball.com/">`)
- [ ] Admin login works at `/admin/login`
- [ ] Questionnaire → results flow works end to end
- [ ] Amazon affiliate tag (`findmyideal-21`) is your live Associates tag

---

## This repo is the FindMyIdeal runbook

This is the reference architecture for all future FindMyIdeal single-product sites.  
See the copy-paste scaffold prompt in the team notes for how to bootstrap a new product site from this pattern.
