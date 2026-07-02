# SEO Page Blueprint (Pillow)

Status: Active guardrail
Superseded: Use SEO-PAGE-EXACT-REPLICA-SPEC.md as the canonical no-drift standard.
Purpose: Prevent format drift and enforce exact SEO page rendering parity.
Visual golden source: Golf SEO renderer in app/golf-ball/[slug]/GolfBallSeoLandingPage.tsx.
Pillow implementation target: app/pillow/[slug]/PillowSeoLandingPage.tsx must match the golf renderer structure, layout, and section behavior exactly, with only approved substitutions.

---

## 1) Page Goal

Each SEO page must do three things:
1. Rank for a clear buyer-intent long-tail query.
2. Help users make a better decision (not just push a product).
3. Route users into either:
   - the fitting quiz (personalised), or
   - the quick-buy starting point (preset path).

Tone: advisory, practical, independent.
Do not use over-claim language like guaranteed, perfect for everyone, or medical outcomes.

---

## 1.1) No-Drift Rule (Non-Negotiable)

- Golf SEO page is the golden source for look and feel.
- Pillow SEO pages must preserve the same section order, container widths, card pattern, CTA row pattern, jump-link behavior, and anchor IDs used by golf.
- Allowed substitutions only:
   - Product noun/content (golf ball -> pillow)
   - Route paths (/golf-ball/* -> /pillow/*)
   - Query CTA label token (non-golf uses Start Quiz)
   - Data payload (whoItsFor/sections/keyFactors/faq/relatedSlugs)
- Not allowed:
   - Reordering sections
   - Replacing chip-style jump links with list-style links
   - Removing section IDs used by jump links
   - Changing hero CTA layout pattern (primary CTA + Or + Quick Buy + trust micro-line)

---

## 2) Required SEO Inputs (Content Model)

Every SEO page must define these fields in config/pillow/seo-pages.ts:

- slug
- keyword
- metaTitle
- metaDescription
- h1
- breadcrumbLabel
- intro
- whoItsFor[]
- sections[] (H2 + optional H3 subsections)
- keyFactors[]
- faq[]
- relatedSlugs[]
- lastReviewed

Why: This keeps rendering, metadata, schema, and internal linking standardized.

---

## 3) Required Page Order (Section by Section)

Use this exact order for consistency and parity with golf.

1. Metadata + canonical + robots index/follow
2. Structured data
   - Article schema
   - Breadcrumb schema
   - FAQ schema (if FAQ exists)
3. Hero section
   - Breadcrumb trail
   - Logo
   - H1
   - Intro paragraph (target 75 to 100 words)
   - Primary CTA: Start Quiz (to /pillow/questionnaire?ref=<slug>)
   - OR divider
   - Secondary CTA: Quick Buy (anchor to #quick-buy-starting-point)
   - Trust micro-line under CTAs
4. Mini trust tags row (3 tags)
   - Personalised
   - 2 minutes
   - Independent
5. Is this guide for you? (bullet list)
6. Jump to a section (chip links)
7. Quick verdict
8. Best options at a glance
9. How we ranked these options
10. Quick Buy section (two-column compare card)
   - Quick Buy vs Quiz explainer card
   - Preset recommendation card with affiliate link
11. Hub bridge card
   - Link to /pillow/best-pillow
12. How the matching quiz works (3-step ordered list)
13. Educational content sections (H2/H3 blocks from sections[]; each H2 section must expose a stable id)
14. Mid-page quiz CTA block
15. What our quiz looks at (keyFactors[])
16. FAQ section
17. Last reviewed line + Copilot byline
18. Related guides

Outside SEO component (global layout shell):
- Global Footer (site links, affiliate disclosure line, copyright)
- Cookie banner/consent component

Why: This sequence balances search intent, trust, conversion, and internal linking.

---

## 4) Hero Copy Format (Approved Pattern)

Use this structure in every SEO page hero:

- SEO title intent in H1 (directly reflects target query).
- Intro paragraph: 75 to 100 words.
  - Sentence 1: problem/context for this query.
  - Sentence 2: what matters when choosing.
  - Sentence 3: what this page + quiz helps user do.

CTA row format:
- Button 1 label: Start Quiz
- Button 1 target: /pillow/questionnaire?ref=<slug>
- Separator text: OR
- Button 2 label: Quick Buy
- Button 2 target: #quick-buy-starting-point

Trust line under CTA row:
- Preferred format: Personalised · 2 minutes · Independent

Why: The hero must quickly explain value and provide both user paths.

---

## 5) Component/Behavior Rules

- Keep two-path intent throughout page:
   - Personalised path (quiz)
  - Preset path (quick buy)
- Keep all internal links as Next Link components.
- Keep quick-buy anchor id stable: quick-buy-starting-point.
- Keep quick-verdict, best-options-at-a-glance, and methodology sections with stable IDs.
- Keep educational sections addressable by slugified H2 IDs.
- Keep relatedSlugs populated (minimum 3 when possible).
- Include lastReviewed on every page and update when content changes.
- Footer and cookie banner are not rendered by the SEO page component; they are provided by app/layout.tsx and must remain present on production pages.

Why: These prevent drift in UX and internal link graph.

---

## 6) Content Quality Constraints

- Intro length: 75 to 100 words.
- Educational body: useful, specific, non-fluffy.
- Educational sections pattern (sections[]):
  - Each section is an H2 with an optional intro body paragraph.
  - Sections may contain H3 subsections, each with its own body paragraph.
  - Use H3 subsections for either numbered breakdowns (e.g. "1. Loft", "2. Firmness", "3. Temperature") or grouped sub-points (e.g. named common mistakes).
  - Include at least one section that uses H3 subsections so the page is not a flat wall of H2 blocks.
- FAQ depth: minimum 50 words per answer (aim 50 to 80). Each answer must give a direct answer, the reason or mechanism, and a practical qualifier. One-line answers are not acceptable.
- FAQ count: minimum 3 items; 4 preferred for index-priority pages.
- Avoid unsupported medical claims.
- Avoid absolute claims (best for everyone, guaranteed fix).
- Keep region-appropriate wording where needed (UK/US references handled elsewhere).

Why: Better trust, compliance, and long-term SEO quality.

---

## 7) Fill-In Template (For New SEO Pages)

Use this as the writing brief before implementation.

### A) Metadata Block
- slug:
- keyword:
- metaTitle:
- metaDescription:
- h1:
- breadcrumbLabel:

### B) Hero Block
- Intro paragraph (75 to 100 words):
- CTA 1 label: Start Quiz
- CTA 1 link: /pillow/questionnaire?ref=<slug>
- CTA 2 label: Quick Buy
- CTA 2 link: #quick-buy-starting-point
- Trust tags line: Personalised · 2 minutes · Independent

### C) Core Content
- whoItsFor bullets (3 to 5):
- sections (3 to 6 H2 sections, optional H3 subsections; include at least one section with H3 subsections):
- keyFactors bullets (5 to 7):
- faq items (3 to 5, minimum 4 for index-priority pages; each answer minimum 50 words):
- relatedSlugs (3 to 5):
- lastReviewed (YYYY-MM-DD):

---

## 8) Implementation Checklist (Before Publish)

- Metadata and canonical set
- JSON-LD scripts present
- Hero contains both CTA paths
- Hero CTA row matches golf layout exactly (primary CTA + Or + Quick Buy + trust micro-line)
- Quick Buy anchor works
- Trust tags present
- Jump-link chips render and all targets scroll to existing IDs
- Quick verdict, best-options, and methodology sections are present
- Hub bridge card present
- At least one educational section uses H3 subsections
- FAQ rendered and included in FAQ schema
- Each FAQ answer is 50+ words (direct answer + reason + qualifier)
- Related guides rendered
- lastReviewed visible
- Internal links valid
- Global Footer visible (from app/layout.tsx)
- Cookie banner/consent visible and functional (from app/layout.tsx)

---

## 9) One Example Hero Skeleton

H1: Best Pillow for [Audience]

Intro (75 to 100 words):
If you are [audience/problem], choosing the wrong pillow usually leads to [common pain point]. The right choice depends on [2 to 3 concrete factors], not just brand claims. In this guide, we break down what to look for and where most people go wrong. You can then either start a personalised fitting for a tailored shortlist, or use Quick Buy to jump to a strong preset recommendation for this topic.

CTA row:
- Start Quiz -> /pillow/questionnaire?ref=<slug>
- OR
- Quick Buy -> #quick-buy-starting-point

Trust line:
Personalised · 2 minutes · Independent

---

## 10) Review Decision

If approved, this blueprint becomes the standard for all new SEO pages and refreshes.

---

## Cross-Blueprint Dependency (Hub and Compare)

SEO pages must route users into the current best-product hub and compare architecture without drift:

- Hub bridge target remains `/pillow/best-pillow`.
- Hub compare section anchor remains `#compare-options`.
- Direct product comparison destination pattern is `/pillow/compare/[slug]`.

When adding `relatedSlugs[]` or in-body recommendation links, prefer linking to:

- the most relevant SEO peers,
- the hub,
- and direct comparison pages where user intent is "X vs Y".
