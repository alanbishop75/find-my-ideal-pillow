# Homepage Blueprint (Pillow)

Status: Draft for review
Superseded: Use HOMEPAGE-EXACT-REPLICA-SPEC.md as the canonical no-drift standard.
Purpose: Define one consistent homepage format to reuse across future product vertical homepages.
Source of truth: app/page.tsx, app/HomePageClient.tsx, app/layout.tsx.

---

## 1) Page Goal

Each homepage must do three things:
1. Immediately state what the product-fit tool does.
2. Give users two clear conversion paths:
   - personalized fitting path
   - quick-buy preset path
3. Build trust quickly with concrete value cues and guided next clicks.

Tone: advisory, practical, independent.
Avoid over-claim language and medical-outcome promises.

---

## 2) Required Homepage Inputs

Every homepage implementation must define or source:

- canonical route metadata (`/`)
- region-aware intro text (UK/US)
- popularGuides[] link set
- feature cards (4)
- how-it-works steps (3)
- logo asset and alt text

Why: keeps first-impression UX and conversion behavior consistent.

---

## 3) Required Page Order (Body)

Use this exact order for consistency.

1. Hero section
   - logo
   - H1
   - intro
   - primary CTA block
   - Or separator
   - secondary CTA block
2. Feature strip (4 cards)
3. How it works (3 steps)
4. Popular guides (conditional when guides exist)

Outside homepage component (global layout shell):
- Header handling from app/layout + Header component rules
- Footer from app/layout
- Cookie banner from app/layout

Why: this sequence balances clarity, trust, and conversion speed.

---

## 4) Hero Copy and CTA Format

Use this structure in every homepage hero:

- H1 with product noun emphasis.
- Intro paragraph should be concise and action-oriented.
- Dual CTA row:
  - Primary CTA (vertical dictionary):
    - Golf: Start fitting
    - Non-golf: Start Quiz
  - Separator text: Or
  - Secondary CTA: Quick Buy
- Each CTA has a short supporting micro-line.

Why: users with different intent can act immediately.

---

## 5) Component and Behavior Rules

- Keep two-path intent visible above the fold.
- Keep hero centered (logo + H1 + intro + CTA row).
- Preserve feature strip card count at 4.
- Preserve how-it-works card count at 3.
- Keep popular guides populated (minimum 4 when possible).
- Keep top-hero Quick Buy CTA as a direct anchor deep-link to the overview guide quick-buy section.
- Required landing behavior: click must open the overview guide and land on `#quick-buy-starting-points`, not just the top of the overview page.
- Footer and cookie banner are global layout dependencies (provided by app/layout.tsx, not by homepage component).

---

## 6) Content Quality Constraints

- Intro copy should stay concise, plain-English, and conversion-oriented.
- Feature card copy should be concrete, not generic marketing filler.
- Step copy in how-it-works should be action-sequenced and understandable in isolation.
- Popular guide labels should map to real high-intent queries.
- Avoid unsupported medical claims.
- Avoid absolute claims (perfect for everyone, guaranteed result).

---

## 7) Fill-In Template (For New Homepage Clones)

### A) Metadata
- canonical: /

### B) Hero
- H1:
- Intro (UK variant):
- Intro (US variant):
- CTA 1 label (by vertical rule):
- CTA 1 href:
- CTA 1 support line:
- separator: Or
- CTA 2 label: Quick Buy
- CTA 2 href:
- CTA 2 support line:

### C) Feature Strip
- card 1: icon + title + text
- card 2: icon + title + text
- card 3: icon + title + text
- card 4: icon + title + text

### D) How It Works
- step 1 text:
- step 2 text:
- step 3 text:

### E) Popular Guides
- heading label pattern: Popular <product> guides
- guide links (minimum 4):

---

## 8) Implementation Checklist (Before Publish)

- Canonical '/' present in route metadata
- Hero contains logo, H1, intro, and dual CTA row
- Primary CTA label follows vertical dictionary
- Secondary CTA is Quick Buy
- Quick Buy CTA target includes `#quick-buy-starting-points` and lands on that section on first navigation
- Separator text is Or
- Feature strip renders 4 cards
- How it works renders 3 steps
- Popular guides render and links are valid
- Header behavior on homepage matches component rule (hidden on '/')
- Global Footer visible (from app/layout.tsx)
- Cookie banner/consent visible and functional (from app/layout.tsx)

---

## 9) Hero Skeleton Example

H1: Find Your Ideal [Product]

Intro:
Free, personalised [product] recommendations - no sign-up, no hassle. Answer a few quick questions and we match you to options that fit your needs.

CTA row:
- Start Quiz (or Start fitting for golf) -> /<product>/questionnaire
- Or
- Quick Buy -> /<product>/best-<product>#quick-buy-starting-points

---

## 10) Review Decision

If approved, this blueprint becomes the standard for all new homepage builds and refreshes.

---

## Cross-Blueprint Dependency (Best Product Hub)

Homepage Quick Buy CTA must continue to deep-link to the hub quick-buy anchor:

- `/pillow/best-pillow#quick-buy-starting-points`

The hub now includes a direct product-vs-product comparison section and dedicated compare pages. Homepage copy and CTA routing must stay consistent with these downstream hub behaviors:

- Compare section anchor on hub: `#compare-options`
- Compare route pattern: `/pillow/compare/[slug]`
- Hub comparison data source: `config/pillow/comparison-pages.ts`
