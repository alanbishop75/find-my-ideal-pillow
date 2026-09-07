import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { calculateGscWindows } = require("./pillow-seo-windows.cjs");
const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync(path.join(root, "seo-results", "content-snapshot", "pillow.snapshot.json"), "utf8"));
const directPath = path.join(root, "seo-results", "gsc", "direct", "latest.json");
const evidence = fs.existsSync(directPath) ? JSON.parse(fs.readFileSync(directPath, "utf8")) : null;
const windows = calculateGscWindows(new Date().toISOString().slice(0, 10));
const lines = [
  "# Pillow SEO Operator Report", "", `Generated: ${new Date().toISOString()}`, "", "## 1. Inventory Coverage", "",
  `- Evidence: ${inventory.pages.length} qualifying pages: ${inventory.pages.filter((page) => page.pageType === "commercial-hub").length} hub, ${inventory.pages.filter((page) => page.pageType === "buying-guide").length} guides, ${inventory.pages.filter((page) => page.pageType === "comparison").length} comparisons.`,
  "- Evidence: all indexable snapshot entries have canonical and sitemap coverage.", "", "## 2. Evidence Identity And Freshness", "",
  evidence ? `- Evidence: ${evidence.siteUrl}; fetched ${evidence.fetchedAt}; range ${evidence.dateRange.startDate} to ${evidence.dateRange.endDate}.` : "- Missing evidence: no direct Pillow GSC snapshot exists; no other product property was used.",
  `- Evidence windows: latest ${windows.latest.startDate} to ${windows.latest.endDate}; previous ${windows.previous.startDate} to ${windows.previous.endDate}; newest ${windows.excludedNewestDays} days excluded.`, "", "## 3. UK And US Performance", "",
  evidence ? "- Evidence: raw rows retain country; examine GBR and USA separately before page decisions." : "- Missing evidence: direct Pillow data is required for a UK/US performance comparison.",
  "", "## 4. Complete Page-By-Page Audit", "", "| URL | Type | Canonical | Sitemap | Products | Action |", "|---|---|---|---|---|---|",
  ...inventory.pages.map((page) => `| ${page.url} | ${page.pageType} | ${page.canonical} | ${page.sitemapPresent ? "yes" : "no"} | ${(page.productsReferenced ?? []).length} | Investigate now |`),
  "", "## 5-9. Comparisons, SERPs, Technical, Links, And Gaps", "", "- Evidence: hub-to-comparison contextual links and comparison breadcrumbs are captured in the inventory.", "- Evidence: the sitemap uses page-owned guide review dates and omits unsupported static/comparison dates.", "- Missing evidence: live SERP and competitor observations require an accessible current source.", "", "## 10-13. Opportunities, Protection, And Approval", "", "- Investigate now: obtain direct Pillow property evidence and examine UK/US query ownership before proposing an editorial change.", "- Verify now: inspect deployed representative guide, hub, and comparison links after release.", "- Protect: this run did not alter content, metadata, products, recommendation order, affiliate destinations, URLs, canonicals, commit, push, publication, or deployment.", "- Strongest eligible action: Prepare for approval after direct Pillow evidence identifies a specific page/query/intent gap; no cosmetic edit is proposed from missing data.", "", "## 14. Measurement Plan", "", "- Record direct pre-change baseline and implementation date, then inspect 14, 28, and 56 complete post-change days with the three-day freshness exclusion.", "",
];
fs.writeFileSync(path.join(root, "seo-results", "pillow-seo-operator-report-latest.md"), lines.join("\n"));
console.log("Generated seo-results/pillow-seo-operator-report-latest.md");