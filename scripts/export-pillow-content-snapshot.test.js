/* eslint-disable @typescript-eslint/no-require-imports */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

describe("Pillow SEO content inventory", () => {
  const root = process.cwd();
  const snapshotPath = path.join(root, "seo-results", "content-snapshot", "pillow.snapshot.json");
  beforeAll(() => execFileSync(process.execPath, ["scripts/export-pillow-content-snapshot.mjs"], { cwd: root, stdio: "pipe" }));
  it("includes every qualifying page and rendered comparison link", () => {
    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
    expect(snapshot.pages).toHaveLength(20);
    expect(snapshot.pages.filter((page) => page.pageType === "comparison")).toHaveLength(4);
    expect(snapshot.pages.every((page) => page.canonical && page.indexable && page.sitemapPresent)).toBe(true);
    const hub = snapshot.pages.find((page) => page.slug === "best-pillow");
    expect(hub.internalLinksOut).toEqual(expect.arrayContaining([expect.objectContaining({ url: "https://www.findyouridealpillow.com/pillow/compare/talatex-adjustable-cervical-vs-gluckstoff-orthopedic-neck", category: "contextual" })]));
    const comparison = snapshot.pages.find((page) => page.pageType === "comparison");
    expect(comparison.internalLinksOut).toEqual(expect.arrayContaining([expect.objectContaining({ url: "https://www.findyouridealpillow.com/pillow/best-pillow", category: "navigation" })]));
  });
});