# Amazon UK Affiliate Readiness Plan
> FindMyIdealGolfBall — April 2026
>
> Work through this file top to bottom. Check each item off as it is completed.
> **Do not apply for Amazon UK Associates until all Must Fix items are checked.**

---

## Current Verdict: UK initial approval received — keep deployment checks tight
All Must Fix (Section A) items are complete in code. UK Associates initial approval is in place, but keep production verification tight before treating the site as fully launch-ready.

Region-selection note: the live app now resolves market wording in this order: manual override, Vercel geo header, browser locale fallback, then UK default.

Affiliate disclosure note:
- UK pages can use Amazon-specific wording because Amazon UK initial approval already exists.
- US pages should keep generic affiliate wording until Amazon.com Associates approval exists.
- Current implementation follows that rule: UK trust/results pages mention Amazon Associate status; US pages do not.

---

## A — Must Fix (apply only after all of these are done)

### A1. Crawl infrastructure — robots.txt + sitemap.xml
- [x] Create `app/robots.txt` (or `app/robots.ts`) serving a valid robots.txt on production
- [x] Create `app/sitemap.ts` serving a valid sitemap.xml that includes homepage, SEO landing pages, about, privacy policy
- [ ] Verify `/robots.txt` returns 200 on the live domain _(requires deploy)_
- [ ] Verify `/sitemap.xml` returns 200 on the live domain _(requires deploy)_

### A2. Fix technical QA errors (build/lint pipeline)
- [x] Fix admin golf-ball page: move `PageTable` component definition outside the render function ([app/admin/golf-ball/page.tsx](app/admin/golf-ball/page.tsx))
- [x] Fix unescaped quote entities in admin page ([app/admin/golf-ball/page.tsx](app/admin/golf-ball/page.tsx))
- [x] Fix homepage `<a>` → `<Link>` for internal `/golf-ball/questionnaire` route ([app/page.tsx](app/page.tsx))
- [x] Fix `completedRef.current` mutation inside effect warning in questionnaire ([app/questionnaire/v2-page.tsx](app/questionnaire/v2-page.tsx))
- [x] Fix `Function` type warnings in questionnaire and results pages
- [x] Fix `<img>` → `<Image />` in ResultsCard for LCP/performance ([components/ResultsCard.tsx](components/ResultsCard.tsx))
- [x] Fix `require()` imports in test file ([lib/buy-links.test.ts](lib/buy-links.test.ts))
- [x] Fix admin page `<a>` → `<button onClick>` for `/api/admin-logout` ([app/admin/golf-ball/page.tsx](app/admin/golf-ball/page.tsx))
- [x] Add `"test"` script to `package.json` (jest is installed but no test script exists)
- [ ] Confirm production build passes cleanly with `npm run build` _(verify after deploy)_

### A3. Results page default behaviour
- [x] Add `noindex` metadata to the results route — created `app/golf-ball/results/layout.tsx` and `app/results/layout.tsx`
- [ ] Optionally: add a redirect/gate so `/golf-ball/results` without quiz answers redirects to the questionnaire _(nice-to-have)_

### A4. Legal pages — missing pages
- [x] Create `/terms` page — created [app/terms/page.tsx](app/terms/page.tsx)
- [x] Create `/contact` page — created [app/contact/page.tsx](app/contact/page.tsx)
- [x] Add "Prices and availability may change" disclaimer near results links ([app/results/page.tsx](app/results/page.tsx))
- [x] Add recommendation disclaimer on results page (affiliate disclosure + pricing caveat)
- [x] Show Amazon-specific disclosure on UK monetized/trust pages only; keep US wording generic until US approval exists
- [x] Add Footer links to Terms and Contact pages

### A5. Brand/domain consistency on live trust pages
- [x] `/about` source code references `hello@findmyidealgolfball.com` ✓ _(live site stale — will fix on next deploy)_
- [x] `/privacy-policy` source code references `findmyidealgolfball.com` and `hello@findmyidealgolfball.com` ✓ _(live site stale — will fix on next deploy)_
- [ ] Verify all trust pages reference the correct domain after deploy

---

## B — Should Fix (do before applying, or risk weaker approval)

### B1. SEO landing page content depth
- [ ] Add a "Why this matters" content block to each SEO landing page (2–3 paragraphs of useful player-type advice, not just quiz intro)
- [ ] Add a "What to look for" or "Key factors" section below the CTA
- [ ] Fix content consistency: SEO landing pages say "6 quick questions" but active fitter (v3) has 7 questions — align copy

### B2. Richer metadata
- [ ] Add Open Graph tags to root layout (`og:title`, `og:description`, `og:url`, `og:image`)
- [ ] Add Twitter/X card meta tags to root layout
- [ ] Add `og:image` — create or designate a 1200x630 share image
- [ ] Verify canonical tag is set correctly on homepage

### B3. Affiliate link quality
- [ ] Replace Scottsdale Golf temporary search URLs with direct verified product page URLs for at least the top 5 products
- [ ] Replace American Golf temporary search URLs with direct verified product page URLs for at least the top 5 products
- [ ] Verify all UK Amazon ASINs still resolve correctly on amazon.co.uk

### B4. Test + documentation hygiene
- [ ] Align E2E tests: `e2e-smoke.spec.ts` still asserts "Budget Option" label but live app uses "Best Value"
- [ ] Align E2E tests: `e2e-v2.spec.ts` navigates to `/questionnaire/v2` and expects `results?v=2` — verify this route still works
- [ ] Sync questionnaire version label: config file sets version `"2.0"` for golf-ball but that is still tagged `staging` in `questionnaire.versions.ts` — confirm and align
- [ ] Remove or update README statement about `npm test` command

### B5. "How scoring works" explainer
- [ ] Add a short explainer section to `/about` describing how the algorithm weighs attributes (builds trust, explains independence)
- [ ] Add a "Prices may change" statement to the About or a dedicated FAQ

---

## C — Nice to Have (post-launch improvements)

### C1. Social media minimum viable presence
- [ ] Create Instagram profile with bio linking to `findmyidealgolfball.com`
- [ ] Create Facebook Page
- [ ] Create YouTube Shorts channel
- [ ] Post 1 pinned launch post on each active profile
- [ ] Post 3 educational golf ball posts (swing speed, spin vs distance, beginner ball choice)
- [ ] Post 2 quiz-flow demonstration posts
- [ ] Add social profile links to Footer

### C2. Content expansion
- [ ] Add basic FAQ page targeting "what golf ball should I use" style queries
- [ ] Add product update/last-reviewed timestamps to product cards or about page
- [ ] Consider adding a lightweight "What players like you are choosing" trust signal

### C3. Performance / accessibility
- [ ] Run Lighthouse audit on homepage and SEO landing page and fix any critical accessibility issues
- [ ] Consider lazy-loading product images on results page

### C4. US expansion (post-MVP)
- [ ] Apply for Amazon.com Associates once the US site posture is ready
- [ ] Keep US disclosures generic until Amazon.com Associates approval exists
- [ ] Replace US search placeholder links with real `.com` affiliate links

---

## Amazon UK Application Checklist
Only tick these once the above sections are done:

- [ ] All A-section items above are complete
- [ ] Site is live and indexed (check Google Search Console)
- [ ] `/robots.txt` is accessible and correct
- [ ] `/sitemap.xml` is accessible and contains all public pages
- [ ] `/privacy-policy` references correct domain and email
- [ ] `/about` references correct domain and email
- [ ] `/terms` exists
- [ ] `/contact` exists or contact is prominently visible
- [ ] Affiliate disclosure is visible on results page and in footer
- [ ] All UK Amazon affiliate links use `?tag=findmyideal-21`
- [ ] Admin routes are not publicly indexable
- [ ] Build passes cleanly with no errors
- [ ] Social profile(s) exist and link back to site

---

## Progress Log
_Update this section as items are completed._

| Date | Section | Notes |
|------|---------|-------|
| Apr 2026 | A1 | Created `app/robots.ts` and `app/sitemap.ts` (16 URLs) |
| Apr 2026 | A2 | Fixed all lint/build errors: PageTable hoisted, unescaped entities fixed, `<img>`→`<Image>`, `Function`→`GtagFn`, `require()`→imports, `<a>`→`<button>` for logout, test script added |
| Apr 2026 | A3 | Created noindex layout files for `/golf-ball/results` and `/results` routes |
| Apr 2026 | A4 | Created `/terms` and `/contact` pages; added pricing disclaimer to results; added Footer links |
| Apr 2026 | A5 | Source code already correct; live site was stale — will resolve on next deploy |
|------|---------|-------|
| Apr 26 2026 | — | Audit completed. Plan created. No items checked yet. |
