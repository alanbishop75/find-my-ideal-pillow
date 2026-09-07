import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = process.cwd();
const siteUrl = "https://www.findyouridealpillow.com";

function loadTsData(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^[ \t]*import\s[^\n]*\n/gm, "");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiledModule = { exports: {} };
  new Function("exports", "module", "require", output)(compiledModule.exports, compiledModule, require);
  return compiledModule.exports;
}

const { pillowSeoPages } = loadTsData("config/pillow/seo-pages.ts");
const { pillowComparisonPages } = loadTsData("config/pillow/comparison-pages.ts");
const { products } = loadTsData("config/pillow/products.ts");
const productName = new Map(products.map((product) => [product.id, `${product.brand} ${product.name}`]));
const guideLink = (slug) => ({ url: `${siteUrl}/pillow/${slug}`, anchor: pillowSeoPages.find((page) => page.slug === slug)?.breadcrumbLabel ?? slug, category: "contextual" });

const pages = [
  {
    siteId: "pillow", url: `${siteUrl}/pillow/best-pillow`, slug: "best-pillow", pageType: "commercial-hub",
    title: "Best Pillow (2026): Find the Right Pillow for You | FindYourIdeal", h1: "Best Pillow: Find the Right Pillow for How You Sleep",
    canonical: `${siteUrl}/pillow/best-pillow`, indexable: true, sitemapPresent: true, lastUpdated: null, productsReferenced: [], extractionMethod: "source-and-config",
    internalLinksOut: [...pillowSeoPages.map((page) => guideLink(page.slug)), ...pillowComparisonPages.map((page) => ({ url: `${siteUrl}/pillow/compare/${page.slug}`, anchor: page.h1, category: "contextual" })), { url: `${siteUrl}/pillow/questionnaire`, anchor: "personalised fitting", category: "cta" }],
  },
  ...pillowSeoPages.map((page) => ({
    siteId: "pillow", url: `${siteUrl}/pillow/${page.slug}`, slug: page.slug, pageType: "buying-guide", title: page.metaTitle, metaDescription: page.metaDescription, h1: page.h1,
    canonical: `${siteUrl}/pillow/${page.slug}`, indexable: true, sitemapPresent: true, lastUpdated: page.lastReviewed, productsReferenced: [], extractionMethod: "config-driven",
    internalLinksOut: [...page.relatedSlugs.map(guideLink), { url: `${siteUrl}/pillow/questionnaire`, anchor: "personalised result", category: "cta" }],
  })),
  ...pillowComparisonPages.map((page) => ({
    siteId: "pillow", url: `${siteUrl}/pillow/compare/${page.slug}`, slug: page.slug, pageType: "comparison", title: page.metaTitle, metaDescription: page.metaDescription, h1: page.h1,
    canonical: `${siteUrl}/pillow/compare/${page.slug}`, indexable: true, sitemapPresent: true, lastUpdated: null,
    productsReferenced: [productName.get(page.leftProductId), productName.get(page.rightProductId)].filter(Boolean), extractionMethod: "config-and-render-template",
    internalLinksOut: [{ url: `${siteUrl}/`, anchor: "Home", category: "navigation" }, { url: `${siteUrl}/pillow/best-pillow`, anchor: "Best Pillow", category: "navigation" }],
  })),
];
const snapshot = { schemaVersion: 1, siteId: "pillow", siteUrl, generatedAt: new Date().toISOString(), limitations: ["Inventory derives from Pillow-owned routes, configuration, and rendered link mappings.", "It contains no SEO prioritisation or recommendation."], pages };
snapshot.contentHash = crypto.createHash("sha256").update(JSON.stringify({ siteId: snapshot.siteId, siteUrl, pages })).digest("hex");
const outputDirectory = path.join(root, "seo-results", "content-snapshot");
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "pillow.snapshot.json"), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(JSON.stringify({ snapshotFile: "seo-results/content-snapshot/pillow.snapshot.json", pages: pages.length, guides: pillowSeoPages.length, comparisons: pillowComparisonPages.length }, null, 2));