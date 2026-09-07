---
name: analyse-pillow-gsc-performance
description: "Use when analysing FindYourIdealPillow GSC exports or direct API snapshots to find evidence-backed Pillow SEO opportunities across buying guides, comparison pages, reviews, and the commercial hub."
argument-hint: "Path to a Pillow-only GSC snapshot or export"
user-invocable: true
---

# Analyse Pillow GSC Performance

## Purpose

Interpret genuine Pillow evidence without editing or auto-prioritising it.

## Required Inputs

- `npm run seo:pillow:inventory` output and `npm run seo:pillow:validate-inventory` result.
- Latest and previous non-overlapping 28 complete days plus 90 complete days, excluding the newest three days.
- Page, query, date, country, device, clicks, impressions, CTR, and average position where available.

## Steps

1. Audit every inventory page, including zero-data pages, and reconcile routes, config, sitemap, snapshot, products referenced, and rendered links.
2. Verify `sc-domain:findyouridealpillow.com`, fetch date, country/device coverage, and limitations. Analyse UK first and US separately; never infer unavailable query-to-page relationships.
3. For every page, assess intent, title/H1/canonical/indexability/sitemap, observed queries, visibility change, low-data status, internal links, recent changes, and exact action label.
4. Assess guides, comparisons, and product-review pages separately. Check query ownership, wrong-page rankings, cannibalisation, named brand/product searches, and whether a gap belongs in an existing page, comparison, FAQ, new page, or nowhere.
5. Separate promising signals from noise using position context, intent fit, complete evidence windows, and commercial usefulness. Assess content, technical, discovery, links, comparison, review, new-guide, SERP, and measurement work even when a rewrite is protected.
6. Return at least five meaningfully distinct opportunities where evidence permits, one strongest eligible action, and protected/rejected actions. Monitoring items do not count as several opportunities.

## Guardrails

- Label every conclusion **evidence**, **hypothesis**, or **missing evidence**.
- Do not diagnose medical conditions or promise relief from neck/shoulder discomfort.
- Do not edit, alter product order, affiliate links, URLs, or metadata. Stop for approval.