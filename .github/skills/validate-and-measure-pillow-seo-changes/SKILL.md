---
name: validate-and-measure-pillow-seo-changes
description: "Use after an approved FindYourIdealPillow SEO change to validate routes, inventory, canonicals, sitemap, rendered links, product safeguards, and record a measurement baseline."
argument-hint: "Changed Pillow URLs/files and baseline evidence"
user-invocable: true
---

# Validate and Measure Pillow SEO Changes

## Steps

1. Run `npm run validate:config`, `npm run seo:pillow:inventory`, `npm run seo:pillow:validate-inventory`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` when practical.
2. Verify titles, H1s, canonicals, indexability, sitemap inclusion, Article/FAQ/Breadcrumb schema, rendered links, quiz path, and source-visible date agreement.
3. Verify products, recommendation order, regional affiliate destinations, disclosures, and current product status were unchanged unless separately approved.
4. Record URL, implementation date, query cluster, exact pre-change evidence, and the change in `seo-results/pillow-seo-measurement-log.md`. Distinguish baseline, preliminary, and reliable measurement; do not claim causation when changes overlap.
5. With three newest days excluded, review no earlier than change date plus 17, 31, and 59 days for 14-, 28-, and 56-complete-day checks.
6. Stop for approval before commit, push, publication, or deployment.

## Sitemap Dates

Flag runtime/build-wide dates, future/invalid values, unsupported dates, and unrelated URLs changing on every build. Use a genuine page-level material-change date when supported; otherwise omit `lastmod`. Never change a visible review date only to influence the sitemap.