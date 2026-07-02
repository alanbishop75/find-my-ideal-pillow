# FindYourIdeal Launch Blueprint (Start Here)

This is the entry point for building a new FindYourIdeal site. One line of input should produce a production-ready, exact-replica site with no manual intervention.

## The One-Line Input

Say:

> Build me a FindYourIdeal site for <product>.

That single line is the whole request. Everything else is derived from the input contract and the locked specs below. Do not ask for options — the output is fixed.

## Input Contract

From the one-line input, resolve these values. Only these may vary between builds:

| Field | Example (golf ball) | How it is derived |
| --- | --- | --- |
| Product noun | `golf ball` | From the input |
| Route namespace | `golf-ball` | Slugified product noun |
| Brand name | `FindYourIdealGolfBall` | `FindYourIdeal` + product |
| Display brand | `Find Your Ideal Golf Ball` | Spaced brand |
| Domain | `findyouridealgolfball.com` | Brand, lowercased |
| Support email | `hello@findyouridealgolfball.com` | `hello@` + domain |
| Social handle | `x.com/FMIdealGolfBall` | Brand initials |
| Accent token | theme `tokens.accent` | Product theme |
| Region policy | UK first, US variant | Default unless specified |

Everything not in this table is fixed by the specs. If a value is missing, derive it from the rules above rather than asking.

## Data-In Requirements (must exist before any page is built)

- Product catalogue conforming to the Catalogue Contract (see PRODUCT-ROLLOUT-MASTER-CHECKLIST.md, section 2).
- Region-aware buy links for each product.
- Quick-buy mapping: each target guide slug -> preset product + bestFor reason.
- Guide slug set for homepage popular guides, hub grid, and SEO pages.
- Scoring profile / attribute weights for the vertical.

No page build starts until this data exists.

## Build Order (read specs in this sequence)

1. Catalogue + data — PRODUCT-ROLLOUT-MASTER-CHECKLIST.md (sections 2-4)
2. Homepage — HOMEPAGE-EXACT-REPLICA-SPEC.md
3. Product hub — BEST-PRODUCT-HUB-EXACT-REPLICA-SPEC.md
4. SEO pages — SEO-PAGE-EXACT-REPLICA-SPEC.md
5. Quiz + results — quiz routing where the source pattern uses it (checklist section 8)
6. Footer + utility pages — FOOTER-AND-UTILITY-PAGES-EXACT-REPLICA-SPEC.md
7. Global layout + internal linking — checklist sections 9-10
8. Release gate — see below

## Release Gate (build is "done" only when all pass)

- Metadata and canonical correct on every route.
- Results route is `noindex, follow`.
- Footer link set, order, and hrefs match the canonical spec.
- Internal link graph has no orphan pages.
- FAQ / schema JSON-LD generated from visible content.
- Affiliate links valid and compliant, with region wording correct.
- Route renders cleanly on desktop and mobile.
- Only allowed substitutions were made; no unapproved variation.

## Handoff Standard

A rollout is complete only when "Build me a FindYourIdeal site for <product>" produces a production-ready build generated from these specs without manual intervention.

## Blueprint Alignment Note (2026-07-02)

Best-product hub behavior is now locked to the upgraded comparison pattern used in production:

- Direct product-vs-product compare section on the hub (not category/profile compare cards).
- Compare section anchor in jump links: `#compare-options`.
- Dedicated comparison route: `/pillow/compare/[slug]`.
- Comparison data source: `config/pillow/comparison-pages.ts`.
- Comparison pages must include both-product buy-link areas for UK and US.

Use these files as implementation authority for that pattern:

- `BEST-PRODUCT-HUB-BLUEPRINT.md`
- `app/pillow/best-pillow/page.tsx`
- `app/pillow/compare/[slug]/page.tsx`
