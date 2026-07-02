# Best Product Hub Blueprint (Pillow)

Status: Active blueprint
Purpose: Keep pillow best-product hub behavior aligned with the upgraded golf hub pattern that shipped to production.
Source of truth:
- app/pillow/best-pillow/page.tsx
- app/pillow/best-pillow/HubQuickBuySectionClient.tsx
- config/pillow/comparison-pages.ts
- app/pillow/compare/[slug]/page.tsx

---

## 1) Page Goal

Each best-product hub page must do four things:

1. Explain there is no universal best product.
2. Route users into either personalized fitting or quick-buy starting points.
3. Bridge users into detailed long-tail guides.
4. Support direct product-vs-product decision intent through dedicated comparison pages.

Tone: advisory, practical, independent.
Avoid over-claim language and medical-outcome promises.

---

## 2) Required Hub Inputs

Every hub must define:

- metadata (title, description, canonical, robots)
- FAQ JSON-LD payload
- guideCards source list (mapped slugs)
- quick-buy mapping (product, bestFor, reason, button)
- direct comparison source list (product-vs-product)
- hub FAQ content

Why: keeps discovery, conversion, and comparison behavior consistent.

---

## 3) Required Page Order (Canonical)

Use this exact order.

1. Hero
   - breadcrumb
   - H1
   - two intro paragraphs
   - personalised fitting CTA panel
   - OR divider
   - quick-buy CTA panel
2. On this page jump-link tray
3. Quick answer
4. How we rank
5. Decision matrix (2x2)
6. How to think card
7. Quick Buy starting points block
8. Browse guides grid
9. Compare before you pick (direct product-vs-product cards)
10. Bottom decision CTA card
11. FAQ section

Outside hub component (global layout shell):
- Footer from app/layout.tsx
- Cookie banner from app/layout.tsx

---

## 4) Jump-Link Contract

Jump links must include:

- Quick answer -> #quick-answer
- Compare products -> #compare-options
- How we rank -> #how-we-rank
- Decision matrix -> #decision-matrix
- Quick Buy -> #quick-buy-starting-points
- Browse guides -> #browse-guides
- FAQ -> #faq

---

## 5) Direct Comparison Contract

Hub section requirements:

- Section id: compare-options
- Placement: below browse guides, above bottom CTA
- Card layout: 2x2 on desktop
- Each card must include:
  - comparison label
  - two product image tiles
  - short comparison summary
  - CTA to dedicated comparison route

Route requirements:

- Path: /pillow/compare/[slug]
- Static params generated from config/pillow/comparison-pages.ts
- Comparison page includes:
  - key differences table
  - both product cards
  - UK and US buy-link areas for both products
  - clear bottom-line verdict

---

## 6) Hero Copy and CTA Pattern

Use this structure in every hub hero:

- H1 states best-overview intent.
- Paragraph 1: no universal best, context factors.
- Paragraph 2: practical contrast and how this page helps.
- Panel A: personalised fitting route.
- OR divider row.
- Panel B: quick-buy route.

CTA dictionary:
- Golf: Start fitting now
- Pillow and other non-golf categories: Start Quiz now or Start fitting now (site standard)
- Secondary panel button: See options

---

## 7) Component and Behavior Rules

- Keep hero with two CTA panels and OR divider.
- Keep quick-answer, ranking, and how-to-think lists in concise 3-bullet form.
- Keep decision matrix in 2x2 profile cards.
- Keep quick-buy cards generated from mapped guide slug list.
- Keep guide grid generated from mapped guideCards.
- Keep compare cards generated from comparison-pages config.
- Keep bottom CTA linked to questionnaire with hub-bottom ref.
- Keep FAQ section as paragraph blocks.

---

## 8) Content Quality Constraints

- Intro paragraphs must be specific and non-generic.
- Comparison summaries must explain practical choice differences.
- Quick-buy reason lines must explain why the preset exists.
- FAQ answers must be plain-English and actionable.
- Avoid unsupported medical claims.
- Avoid absolute claims (best for everyone, guaranteed result).

---

## 9) Implementation Checklist (Before Publish)

- Metadata set (title, description, canonical, robots)
- FAQ JSON-LD script present
- Hero includes two CTA panels and OR divider
- Jump-link tray is present and complete
- Quick answer section present
- How we rank section present
- Decision matrix is 2x2
- Quick-buy starting points block renders
- Browse guides links are valid
- Compare section uses direct product-vs-product cards
- Compare card CTAs route to /pillow/compare/[slug]
- Comparison pages render key differences + both-product buy-link areas
- Bottom CTA present and linked
- FAQ section present and readable

---

## 10) Review Decision

This blueprint is now aligned to the upgraded golf-pattern architecture and is the required standard for pillow best-product hub updates.
