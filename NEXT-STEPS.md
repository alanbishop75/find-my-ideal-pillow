# Pillow Finder — Next Steps Guide

_Pillow v0.1 shipped April 2026. All items grounded in code review of questionnaire.ts, scoring.ts, products.ts._

---

## ?? Must Fix Before Any Live Traffic

| # | What | Where |
|---|---|---|
| 1 | **Replace all `/placeholder.png`** with real product images — site looks like a dev template. Use brand press-pack images or sourced product photos. | `config/pillow/products.ts` |
| 2 | **Add affiliate disclosure to results page** — required by UK ASA and Amazon Associates. UK pages: _"As an Amazon Associate, we earn from qualifying purchases."_ Keep US wording generic until Amazon.com approval exists. | `app/results/page.tsx` |
| 3 | **Improve result card explanations** — `reasons[]` currently returns raw scoring labels. Write human copy per product keyed to the top 1–2 scoring signals. | `config/pillow/scoring.ts` reason strings |
| 4 | **Replace all temporary buy-links** — all 10 products currently have `isTemporary: true` search URLs. Replace with direct product page ASINs/URLs before any affiliate tracking matters. | `config/pillow/buy-links.ts` |

---

## ?? Fix Soon — Before Promotion / SEO Launch

| # | What | Notes |
|---|---|---|
| 5 | **Build SEO landing pages** (4–6 pages, 500+ words each): `/best-pillow-for-side-sleepers`, `/best-pillow-for-hot-sleepers`, `/best-memory-foam-pillow-uk`, `/best-pillow-for-neck-pain`, `/best-budget-pillow-uk` | `config/pillow/seo-pages.ts` (currently empty stub) |
| 6 | **Add GA4 analytics events** from day one: `quiz_start`, `question_answered`, `quiz_abandoned`, `results_viewed`, `affiliate_click` | `lib/analytics.ts` + questionnaire/results pages |
| 7 | **Add About page content** describing how the algorithm works. Helps Amazon reviewer credibility. | `app/about/AboutPageClient.tsx` |
| 8 | **Add Open Graph / Twitter card meta** — `og:title`, `og:description`, `og:url`, `og:image`. Create a 1200x630 share image. | `app/layout.tsx` |
| 9 | **Verify canonical tags** after first deploy — confirm homepage canonical is `https://www.findmyidealpillow.com/` | Post-deploy check |

---

## ?? Fix Later — Post-Launch

| # | What | Notes |
|---|---|---|
| 10 | **Scoring tuning pass** — once GA4 data shows over/under-recommended products, adjust signal weights. | `config/pillow/scoring.ts` |
| 11 | **Implement results share URL** — encode quiz answers in query string. Share text: _"Found my ideal pillow in 7 questions"_ | `app/results/page.tsx` |
| 12 | **Add email capture on results page** — "Email me my results" builds list, creates second affiliate click | `app/results/page.tsx` |
| 13 | **Expand UK specialist retailers** — Dunelm (direct), John Lewis (direct), Dreams. Commission typically 5-8% vs Amazon 3-5%. Register via Awin. | `config/pillow/buy-links.ts` |
| 14 | **Review product catalogue** — check if any two products score near-identically for most personas. Replace the weaker with a more distinct alternative. | `config/pillow/products.ts` |
| 15 | **Add product descriptions** — all 10 products have empty `description` fields. Add 30-60 word copy per product. | `config/pillow/products.ts` |
| 16 | **Apply for specialist affiliate programmes** — Dunelm, John Lewis via Awin. | External |

---

## Key Known Scoring Behaviours

### Hypoallergenic constraint
Snuggledown (natural-down, not hypoallergenic) correctly scores near-zero for allergy sufferers. The -15 penalty suppresses it without hard-zeroing.

### Budget is a soft signal
Products 1 tier over budget get -5, not a hard block. A premium product can still win for a budget user on sleep position + neck comfort merit.

### Adjustable fill bonus (+4)
Only activates for `combination` sleep position or `no-preference` fill. Rewards Simba Hybrid and Coop Eden for flexible buyers.

### Temperature / cooling
Hot sleepers penalise memory foam without cooling (-5). Panda Bamboo and Purple Harmony Pillow benefit most (+10 cooling match).

---

## Recommended Question Order (current order is correct)

1. Sleep position _(highest signal)_
2. Firmness
3. Fill preference
4. Temperature / cooling
5. Neck/shoulder comfort _(hard constraint for ~30% of users)_
6. Hypoallergenic _(hard constraint for allergy sufferers)_
7. Budget _(last — lowest emotional friction, highest product-impact)_

---

## Vercel Environment Variables (production)

```
NEXT_PUBLIC_SITE_URL=https://www.findmyidealpillow.com
NEXT_PUBLIC_GA4_ID=<pillow GA4 measurement ID>
ADMIN_PASSWORD=<strong random string>
ADMIN_TOKEN_SECRET=<strong random string>
DEFAULT_CATEGORY_ID=pillow
```
