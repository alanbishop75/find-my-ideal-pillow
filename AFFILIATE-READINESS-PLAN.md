# Amazon UK Affiliate Readiness Plan
> FindYourIdealPillow — May 2026
>
> Work through this file top to bottom. Check each item off as it is completed.
> **Do not apply for Amazon UK Associates until all Must Fix items are checked.**

---

## Current Verdict: UK initial approval received — keep deployment checks tight
All Must Fix (Section A) items are complete in code. UK Associates initial approval is in place, but keep production verification tight before treating the site as fully launch-ready.

Region-selection note: the live app now resolves market wording in this order: manual override, Vercel geo header, browser locale fallback, then UK default.

Affiliate disclosure note:
- UK pages can use Amazon-specific wording because Amazon UK initial approval already exists.
- US privacy/legal copy already references Amazon.com Associate participation, so US pages no longer need placeholder generic wording.
- Current implementation is region-aware: UK trust/results pages mention Amazon Associate status, and the results/footer disclosure remains visible across the live site.

---

## A — Must Fix (apply only after all of these are done)

### A1. Crawl infrastructure — robots.txt + sitemap.xml
- [x] Create `app/robots.txt` (or `app/robots.ts`) serving a valid robots.txt on production
- [x] Create `app/sitemap.ts` serving a valid sitemap.xml that includes homepage, SEO landing pages, about, privacy policy
- [x] Verify `/robots.txt` returns 200 on the live domain
- [x] Verify `/sitemap.xml` returns 200 on the live domain

### A2. Fix technical QA errors (build/lint pipeline)
- [x] Fix admin pillow page: move `PageTable` component definition outside the render function ([app/admin/pillow/page.tsx](app/admin/pillow/page.tsx))
- [x] Fix unescaped quote entities in admin page ([app/admin/pillow/page.tsx](app/admin/pillow/page.tsx))
- [x] Fix homepage `<a>` → `<Link>` for internal `/pillow/questionnaire` route ([app/page.tsx](app/page.tsx))
- [x] Fix questionnaire flow warnings and type issues in the active pillow fitter
- [x] Fix `Function` type warnings in questionnaire and results pages
- [x] Fix `<img>` → `<Image />` in ResultsCard for LCP/performance ([components/ResultsCard.tsx](components/ResultsCard.tsx))
- [x] Fix `require()` imports in test file ([lib/buy-links.test.ts](lib/buy-links.test.ts))
- [x] Fix admin page `<a>` → `<button onClick>` for `/api/admin-logout` ([app/admin/pillow/page.tsx](app/admin/pillow/page.tsx))
- [x] Add `"test"` script to `package.json` (jest is installed but no test script exists)
- [x] Confirm production build passes cleanly with `npm run build`

### A3. Results page default behaviour
- [x] Add `noindex` metadata to the results route — created `app/pillow/results/layout.tsx` and `app/results/layout.tsx`
- [x] Add a redirect/gate so `/pillow/results` without quiz answers redirects to the questionnaire with a visible fallback state

### A4. Legal pages — missing pages
- [x] Create `/terms` page — created [app/terms/page.tsx](app/terms/page.tsx)
- [x] Create `/contact` page — created [app/contact/page.tsx](app/contact/page.tsx)
- [x] Add "Prices and availability may change" disclaimer near results links ([app/results/page.tsx](app/results/page.tsx))
- [x] Add recommendation disclaimer on results page (affiliate disclosure + pricing caveat)
- [x] Show region-appropriate affiliate disclosure on monetized and trust pages
- [x] Add Footer links to Terms and Contact pages

### A5. Brand/domain consistency on live trust pages
- [x] `/about` source code references `hello@findyouridealpillow.com`
- [x] `/privacy-policy` source code references `findyouridealpillow.com` and `hello@findyouridealpillow.com`
- [x] Verify all trust pages reference the correct domain on the live site

---

## B — Should Fix (do before applying, or risk weaker approval)

### B1. SEO landing page content depth
- [x] Add a "Why this matters" content block to each SEO landing page (2–3 paragraphs of useful player-type advice, not just quiz intro)
- [x] Add a "What to look for" or "Key factors" section below the CTA
- [x] Fix content consistency: pillow SEO landing pages now match the live 7-question quiz

### B2. Richer metadata
- [x] Add Open Graph tags to root layout (`og:title`, `og:description`, `og:url`)
- [x] Add Twitter/X card meta tags to root layout
- [x] Add `og:image` — designated the `/opengraph-image` 1200x630 share image route
- [x] Verify canonical tag is set correctly on homepage

### B3. Affiliate link quality
- [x] Use direct verified Amazon UK product URLs in the catalogue (no search URLs)
- [x] Use direct `.com` affiliate links for the US catalogue where applicable
- [x] Verify all UK Amazon ASINs still resolve correctly on amazon.co.uk

### B4. Test + documentation hygiene
- [x] Align E2E tests: `e2e-smoke.spec.ts` asserts "Best Value"
- [x] Align E2E tests: `e2e-v2.spec.ts` navigates to `/questionnaire/v2` and expects the live results flow
- [x] Sync questionnaire version label: active client state defaults to `1.0`
- [x] README already documents `npm test`

### B5. "How scoring works" explainer
- [x] Add a short explainer section to `/about` describing how the algorithm weighs attributes (builds trust, explains independence)
- [x] Add a "Prices may change" statement to the About or a dedicated FAQ

---

## C — Nice to Have (post-launch improvements)

### C1. Social media minimum viable presence
- [ ] Create Instagram profile with bio linking to `findyouridealpillow.com`
- [ ] Create Facebook Page
- [ ] Create YouTube Shorts channel
- [ ] Post 1 pinned launch post on each active profile
- [ ] Post 3 educational pillow posts (sleep position, loft vs firmness, cooling vs fill type)
- [ ] Post 2 quiz-flow demonstration posts
- [ ] Add social profile links to Footer

### C2. Content expansion
- [x] Add basic FAQ page targeting "what pillow should I use" style queries
- [ ] Add product update/last-reviewed timestamps to product cards or about page
- [ ] Consider adding a lightweight "What players like you are choosing" trust signal

### C3. Performance / accessibility
- [ ] Run Lighthouse audit on homepage and SEO landing page and fix any critical accessibility issues
- [ ] Consider lazy-loading product images on results page

### C4. US expansion (post-MVP)
- [ ] Apply for Amazon.com Associates once the US site posture is ready
- [x] US disclosures no longer need to stay generic; the live privacy policy already states Amazon.com Associate participation
- [x] Replace US search placeholder links with real `.com` affiliate links

---

## Amazon UK Application Checklist
Only tick these once the above sections are done:

- [ ] All A-section items above are complete
- [ ] Site is live and indexed (check Google Search Console)
- [x] `/robots.txt` is accessible and correct
- [x] `/sitemap.xml` is accessible and contains all public pages
- [x] `/privacy-policy` references correct domain and email
- [x] `/about` references correct domain and email
- [x] `/terms` exists
- [x] `/contact` exists or contact is prominently visible
- [x] Affiliate disclosure is visible on results page and in footer
- [x] All UK Amazon affiliate links use `?tag=findyouridealpillow-21` (spot-checked May 2 2026)
- [x] Admin routes are not publicly indexable
- [x] Build passes cleanly with no errors
- [ ] Social profile(s) exist and link back to site

---

## Progress Log
_Update this section as items are completed._

| Date | Section | Notes |
|------|---------|-------|
| Apr 2026 | A1 | Created `app/robots.ts` and `app/sitemap.ts` (16 URLs) |
| Apr 2026 | A2 | Fixed all lint/build errors: PageTable hoisted, unescaped entities fixed, `<img>`→`<Image>`, `Function`→`GtagFn`, `require()`→imports, `<a>`→`<button>` for logout, test script added |
| Apr 2026 | A3 | Created noindex layout files for `/pillow/results` and `/results` routes |
| Apr 2026 | A4 | Created `/terms` and `/contact` pages; added pricing disclaimer to results; added Footer links |
| Apr 2026 | A5 | Source code already correct; live trust pages now show the correct pillow domain and email |
| May 2 2026 | A1/A2/A5 | Verified live `/robots.txt` and `/sitemap.xml`; confirmed live `/about` and `/privacy-policy`; confirmed the app is serving from a successful production build |
| May 2 2026 | B1/B2/B3/B4/B5/C2/C4 | Marked completed pillow-specific SEO depth, metadata, direct Amazon link, test, About-page explainer, FAQ, and US `.com` link items that were already true in code/live site |
| May 2 2026 | Checklist | Spot-checked 5 UK `amzn.to` links; final Amazon UK redirects include `tag=findyouridealpillow-21` and the expected ASIN |
| May 2 2026 | B2/B5 | Wired root metadata to the `/opengraph-image` route and added a permanent price/availability caveat to `/about` |
| May 2 2026 | A3/SEO | Added an explicit empty-results gate and switched sitemap static pages to dynamic `lastModified` timestamps |
|------|---------|-------|
| Apr 26 2026 | — | Audit completed. Plan created. No items checked yet. |
