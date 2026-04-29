# Golf Ball Fitter — Next Steps Guide

_Product review completed 22 April 2026. All items grounded in code review of questionnaire.v2.ts, scoring.ts, products.ts, results/page.tsx._

---

## 🔴 Must Fix Before Any Live Traffic

| # | What | Where |
|---|---|---|
| 1 | **Invert the `spins-back` wedge logic** — currently recommends more spin to players whose wedges already spin back too much. Should reward spin 6–7 (controlled), not spin ≥ 8. | `config/golf-ball/scoring.ts` |
| 2 | **Change Bridgestone e6 compression from `mid` to `low`** — e6 scores zero for its primary audience (180–210y players) because the distance gating only rewards `low` in that band. | `config/golf-ball/products.ts` |
| 3 | **Add affiliate disclosure to results page** — required by UK ASA and Amazon Associates. UK is now initially approved, so UK pages may also include: _"As an Amazon Associate, we earn from qualifying purchases."_ Keep US wording generic until Amazon.com approval exists. | `app/results/page.tsx` |
| 4 | **Create `/privacy-policy` static page** — Amazon Associates application will be rejected without it. Standard UK-compliant policy, ~300 words. | New page |
| 5 | **Replace all `/placeholder.png`** with real product images — site looks like a dev template. Use brand press-pack images or sourced product photos. | `config/golf-ball/products.ts` |
| 6 | **Improve result card explanations** — `getSummary` currently returns the first scoring reason string (e.g. "High forgiveness for fade/slice"). This is a label, not a conversion-worthy sentence. Write human copy per product keyed to key scoring signals. | `app/results/page.tsx` + `config/golf-ball/products.ts` |

---

## 🟡 Fix Soon — Before Promotion / SEO Launch

| # | What | Notes |
|---|---|---|
| 7 | **Add a budget question** (`<£20 / £20–£35 / £35+`) and use it to gate the Best Value slot. Without it, a premium product can land in Best Value. | New question + scoring rule |
| 8 | **Cut `tee-cross` question** — near-identical intent and scoring to `trade-off`. Adds friction for ≤+2 bonus. Redistribute weight. | `questionnaire.v2.ts` + `scoring.ts` |
| 9 | **Cut or re-branch `start-direction` question** — high friction at Q2, low signal return (+1/+2 max). If kept, show only as a branch for confirmed slicers/hookers. | `questionnaire.v2.ts` |
| 10 | **Reduce `iron-distance` to a tiebreaker or cut it** — the middle 80% of users (100–170y range) get zero contribution from this question. Add friction, add nothing. | `questionnaire.v2.ts` + `scoring.ts` |
| 11 | **Add `straightFlight: true` attribute to e6 and e12 Contact** and score it explicitly for `curve-right`/`curve-left` misses (+3). Makes the e6 the clear slicer recommendation and enables a strong result explanation. | `products.ts` + `scoring.ts` |
| 12 | **Separate Q-Star Tour from Tour Response** — both score identically for most users (both: spin 7, forgiveness 7, compression mid, priceTier mid). Adjust Tour Response spin to 6. | `products.ts` |
| 13 | **Raise `feel` weight from 2 to 3** — feel preference is one of the top three stated criteria for ball purchase. Currently underweighted. | `scoring.ts` |
| 14 | **Add GA4 analytics events** from day one: `quiz_start`, `question_answered`, `quiz_abandoned`, `results_viewed`, `affiliate_click`, `start_again_clicked`. | `app/questionnaire/v2-page.tsx` + `app/results/page.tsx` |
| 15 | **Add About page and homepage description** — Amazon reviewers check for site legitimacy. One paragraph explaining the tool is sufficient. | New page |

---

## 🟢 Fix Later — Post-Launch

| # | What | Notes |
|---|---|---|
| 16 | **Implement scoring override rules**: (a) hard gate on premium products for `spins-back` + `driver-distance < 210`; (b) compounding short-game signal when `wedge-behaviour = release` AND `trade-off = control` | `scoring.ts` |
| 17 | **Build SEO landing pages**: `/best-golf-balls-for-slicers`, `/best-golf-balls-for-beginners-uk`, `/best-low-compression-golf-balls-uk`, `/bridgestone-e6-review` | New static pages |
| 18 | **Add email capture on results page** — single field + "Email me my results" — builds list, creates second affiliate click opportunity | `app/results/page.tsx` |
| 19 | **Implement results share URL** with answers encoded in query string. Share text: _"Found my ideal golf ball in 6 questions"_ | `app/results/page.tsx` |
| 20 | **Review the 4 Bridgestone tour balls** (RX, RXS, X, XS) — once scoring fixes are in, check whether they separate cleanly. If RX ≈ Q-Star Tour and XS ≈ Z-Star in results, drop the weaker pairs. | `products.ts` |
| 21 | **Expand to Amazon US** — same quiz, US ASINs, `.com` affiliate tag. Doubles addressable market with minimal rework. | New config variant |
| 22 | **Add retailer diversity** — American Golf UK, Direct Golf. Commission typically 5–8% vs Amazon's 3–5%, and converts well from independent fitters. | `products.ts` + `affiliateLinks` field |

---

## Key Logic Bugs Summary

### Bug 1 — Inverted wedge spins-back (scoring.ts ~line 148)
```ts
// CURRENT (wrong):
if (answers['wedge-behaviour'] === 'spins-back' && n(product.attributes.spin) >= 8) {
  score += WEIGHTS['wedge-behaviour']; // recommends MORE spin to player with too much spin
}

// FIX — reward controlled spin (6–7), not maximum spin:
if (answers['wedge-behaviour'] === 'spins-back') {
  const sp = n(product.attributes.spin);
  if (sp >= 6 && sp <= 7) { score += 2; reasons.push('Controlled spin suits your short game'); }
  else if (sp >= 8) score -= 1; // penalise ultra-high-spin
}
```

### Bug 2 — e6 compression mismatch (products.ts)
```ts
// CURRENT (wrong — scores 0 for 180-210y players):
attributes: { ..., compression: 'mid', ... }

// FIX:
attributes: { ..., compression: 'low', ... }
```

---

## Recommended Question Order (post-cuts)

1. Driver distance _(most important signal — gates compression)_
2. Trade-off priority _(stated intent anchor)_
3. Stock-shot / ball flight _(merged with miss-pattern)_
4. Miss severity _(branch from Q3 if curve answer)_
5. Wedge behaviour / short game
6. Feel preference
7. Budget _(new — gates Best Value slot)_

**7 questions. Cleaner, higher-signal, better mobile completion rate.**

---

## Amazon Affiliate Application Checklist

Before applying:

- [ ] Privacy Policy page exists (`/privacy-policy`)
- [ ] Affiliate disclosure on results page
- [ ] About / homepage description paragraph
- [ ] Real product images (no placeholders)
- [ ] Site has received real traffic (50–100+ sessions)
- [ ] All affiliate links use `?tag=findmyideal-21` format
- [ ] All CTA anchors have `rel="noopener noreferrer sponsored"`

---

## Conversion Priorities (in order of impact)

1. Write human explanation copy per product for the Best Match card
2. Fix scoring bugs (spins-back, e6 compression) before results pages are shared
3. Add affiliate disclosure
4. Add real product images
5. Build one SEO landing page (`/best-golf-balls-for-slicers`) — this is your highest organic revenue path
