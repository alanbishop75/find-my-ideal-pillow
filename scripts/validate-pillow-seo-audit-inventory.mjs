import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshotPath = path.join(root, "seo-results", "content-snapshot", "pillow.snapshot.json");
if (!fs.existsSync(snapshotPath)) throw new Error("Run npm run seo:pillow:inventory first.");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const expected = { "commercial-hub": 1, "buying-guide": 15, comparison: 4 };
for (const [pageType, count] of Object.entries(expected)) {
  const found = snapshot.pages.filter((page) => page.pageType === pageType).length;
  if (found !== count) throw new Error(`Expected ${count} ${pageType} pages but found ${found}.`);
}
const missing = snapshot.pages.filter((page) => page.indexable && !page.sitemapPresent);
if (missing.length) throw new Error(`Indexable pages missing from sitemap inventory: ${missing.map((page) => page.url).join(", ")}`);
const duplicateUrls = snapshot.pages.map((page) => page.url).filter((url, index, values) => values.indexOf(url) !== index);
if (duplicateUrls.length) throw new Error(`Duplicate inventory URLs: ${duplicateUrls.join(", ")}`);
console.log(JSON.stringify({ status: "pass", qualifyingPages: snapshot.pages.length, pageTypes: expected }, null, 2));