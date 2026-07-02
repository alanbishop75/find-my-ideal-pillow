/**
 * scripts/validate-release-gate.mjs
 *
 * Static release-gate validator for the FindYourIdeal launch blueprint.
 * Checks the repo against the release gate defined in
 * LAUNCH-BLUEPRINT-START-HERE.md — no HTTP requests, safe to run in CI.
 *
 * Usage:
 *   node scripts/validate-release-gate.mjs
 *   npm run validate:release-gate
 *
 * Exit code 0 = all gates pass, 1 = one or more gates failed.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const results = [];
function check(name, passed, detail = "") {
  results.push({ name, passed, detail });
}
function read(rel) {
  const p = path.resolve(root, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}
function exists(rel) {
  return fs.existsSync(path.resolve(root, rel));
}

// ── 1) Footer link set, order, and hrefs ─────────────────────────────────────
const FOOTER_LINKS = [
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/affiliate-disclosure",
  "/terms",
];
const footer = read("components/Footer.tsx");
if (footer === null) {
  check("Footer component exists", false, "components/Footer.tsx not found");
} else {
  const positions = FOOTER_LINKS.map((href) => footer.indexOf(`href="${href}"`));
  const allPresent = positions.every((i) => i !== -1);
  check("Footer contains all utility links", allPresent,
    allPresent ? "" : `missing: ${FOOTER_LINKS.filter((_, i) => positions[i] === -1).join(", ")}`);
  const inOrder = positions.every((p, i) => i === 0 || (positions[i - 1] !== -1 && p > positions[i - 1]));
  check("Footer links are in canonical order", allPresent && inOrder);
  check("Footer has external X (Twitter) link", /x\.com\//.test(footer));
  check("Footer has affiliate disclaimer", /affiliate links/i.test(footer));
}

// ── 2) All six footer-linked utility pages exist ─────────────────────────────
const UTILITY_DIRS = [
  "app/about",
  "app/contact",
  "app/faq",
  "app/privacy-policy",
  "app/affiliate-disclosure",
  "app/terms",
];
for (const dir of UTILITY_DIRS) {
  check(`Utility page exists: ${dir}`, exists(dir));
}

// ── 2b) Utility page section order ───────────────────────────────────────────
// Each page's section headings must appear in the canonical order defined by
// FOOTER-AND-UTILITY-PAGES-EXACT-REPLICA-SPEC.md. Matched as ordered substrings
// so numbered headings (e.g. "1. Who we are") still match "Who we are".
const SECTION_ORDER = [
  ["app/about/AboutPageClient.tsx", [
    "How it works",
    "How scoring stays independent",
    "Our catalogue",
    "Affiliate disclosure",
    "Get in touch",
  ]],
  ["app/contact/ContactPageClient.tsx", [
    "Email",
    "What to include",
  ]],
  ["app/faq/page.tsx", [
    "About The Quiz",
    "Recommendations",
    "Retailers, Pricing, And Affiliate Links",
    "Support",
  ]],
  ["app/privacy-policy/PrivacyPolicyClient.tsx", [
    "Who we are",
    "Data we collect",
    "Affiliate links",
    "Regional privacy notices",
    "Cookies and consent",
    "Changes",
  ]],
  ["app/terms/TermsPageClient.tsx", [
    "About this service",
    "Informational recommendations",
    "Affiliate links and retailer terms",
    "Regional legal notices",
    "Limitation of liability",
    "Contact",
  ]],
  ["app/affiliate-disclosure/page.tsx", [
    "Amazon Associates",
    "Editorial Independence",
    "Price And Availability",
    "Contact",
  ]],
];
for (const [rel, sections] of SECTION_ORDER) {
  const src = read(rel);
  if (src === null) {
    check(`Section order: ${rel}`, false, "file not found");
    continue;
  }
  const positions = sections.map((s) => src.indexOf(s));
  const missing = sections.filter((_, i) => positions[i] === -1);
  if (missing.length > 0) {
    check(`Section order: ${rel}`, false, `missing: ${missing.join(", ")}`);
    continue;
  }
  const ordered = positions.every((p, i) => i === 0 || p > positions[i - 1]);
  check(`Section order: ${rel}`, ordered,
    ordered ? "" : "sections present but out of canonical order");
}

// ── 3) Results route is noindex ──────────────────────────────────────────────
// noindex may be declared in either the route layout or the route page.
const resultsRouteFiles = [
  "app/results/layout.tsx",
  "app/results/page.tsx",
  "app/[category]/results/layout.tsx",
  "app/[category]/results/page.tsx",
  "app/pillow/results/layout.tsx",
  "app/pillow/results/page.tsx",
];
const resultsSources = resultsRouteFiles
  .map((rel) => ({ rel, src: read(rel) }))
  .filter((e) => e.src !== null);
if (resultsSources.length === 0) {
  check("Results route exists", false, "no results layout or page found");
} else {
  const noindexFound = resultsSources.some((e) => /index:\s*false/.test(e.src));
  check("Results route is noindex", noindexFound,
    noindexFound ? "" : "index:false not found in any results layout or page");
}

// ── 4) Robots + sitemap present ──────────────────────────────────────────────
check("robots route exists", exists("app/robots.ts") || exists("public/robots.txt"));
check("sitemap route exists", exists("app/sitemap.ts"));

// ── 5) Indexed utility pages declare canonical metadata ──────────────────────
const CANONICAL_PAGES = [
  ["app/about", "/about"],
  ["app/faq", "/faq"],
  ["app/affiliate-disclosure", "/affiliate-disclosure"],
];
for (const [dir, canonical] of CANONICAL_PAGES) {
  const page = read(`${dir}/page.tsx`);
  const hasCanonical = page !== null && /canonical/.test(page);
  check(`Canonical set for ${canonical}`, hasCanonical,
    hasCanonical ? "" : `canonical missing in ${dir}/page.tsx`);
}

// ── 6) Blueprint specs present ───────────────────────────────────────────────
const SPECS = [
  "LAUNCH-BLUEPRINT-START-HERE.md",
  "HOMEPAGE-EXACT-REPLICA-SPEC.md",
  "BEST-PRODUCT-HUB-EXACT-REPLICA-SPEC.md",
  "SEO-PAGE-EXACT-REPLICA-SPEC.md",
  "FOOTER-AND-UTILITY-PAGES-EXACT-REPLICA-SPEC.md",
  "PRODUCT-ROLLOUT-MASTER-CHECKLIST.md",
];
for (const spec of SPECS) {
  check(`Blueprint spec present: ${spec}`, exists(spec));
}

// ── 7) SEO page search-quality locks ─────────────────────────────────────────
// Static checks on the SEO route + content model that back the Search Quality
// Standard in SEO-PAGE-EXACT-REPLICA-SPEC.md.
const seoRoute = read("app/pillow/[slug]/page.tsx");
if (seoRoute === null) {
  check("SEO route present", false, "app/pillow/[slug]/page.tsx not found");
} else {
  // Article/Breadcrumb/FAQ schema blocks emitted.
  check('SEO route emits Article schema', /"@type":\s*"Article"/.test(seoRoute));
  check('SEO route emits BreadcrumbList schema', /"@type":\s*"BreadcrumbList"/.test(seoRoute));
  check('SEO route emits FAQPage schema', /"@type":\s*"FAQPage"/.test(seoRoute));
  check('SEO route author is GitHub Copilot', /name:\s*SEO_AUTHOR_NAME|name:\s*"GitHub Copilot"/.test(seoRoute));
  check('SEO route shows Copilot byline', /Generated with GitHub Copilot/.test(read("app/pillow/[slug]/PillowSeoLandingPage.tsx") ?? ""));
  // datePublished and dateModified must come from separate fields, not both lastReviewed.
  const usesSeparatePublished = /datePublished:\s*`\$\{page\.datePublished/.test(seoRoute);
  const modifiedFromReviewed = /dateModified:\s*`\$\{page\.lastReviewed/.test(seoRoute);
  check("Article datePublished is separate from dateModified",
    usesSeparatePublished && modifiedFromReviewed,
    usesSeparatePublished && modifiedFromReviewed ? "" : "datePublished must use page.datePublished; dateModified must use page.lastReviewed");
  // SEO route must be a Server Component (never a top-level client component).
  const firstNonEmpty = seoRoute.split("\n").map((l) => l.trim()).find((l) => l.length > 0) ?? "";
  check("SEO route is a Server Component", !/^["']use client["']/.test(firstNonEmpty),
    firstNonEmpty.startsWith('"use client"') ? "page.tsx must not be a client component" : "");
}
// Content model exposes an immutable datePublished field.
const seoConfig = read("config/pillow/seo-pages.ts");
check("SEO content model has datePublished field",
  seoConfig !== null && /datePublished\?:\s*string/.test(seoConfig),
  seoConfig === null ? "config/pillow/seo-pages.ts not found" : "");

// ── Report ───────────────────────────────────────────────────────────────────
const pad = Math.max(...results.map((r) => r.name.length));
let failures = 0;
console.log("\nFindYourIdeal Release Gate\n" + "─".repeat(pad + 12));
for (const r of results) {
  const status = r.passed ? "PASS" : "FAIL";
  if (!r.passed) failures++;
  const detail = r.detail ? `  (${r.detail})` : "";
  console.log(`${r.name.padEnd(pad)}  ${status}${detail}`);
}
console.log("─".repeat(pad + 12));
console.log(`${results.length - failures}/${results.length} checks passed.\n`);

process.exit(failures > 0 ? 1 : 0);
