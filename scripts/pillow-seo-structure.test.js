/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

describe("Pillow SEO structure", () => {
  const root = process.cwd();
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
  it("does not generate blanket sitemap timestamps and includes comparisons", () => {
    const sitemap = read("app/sitemap.ts");
    expect(sitemap).not.toContain("GENERATED_AT");
    expect(sitemap).not.toContain("latestDate(");
    expect(sitemap).toContain("pillowComparisonPages");
    expect(sitemap).toContain("new Date(page.lastReviewed)");
  });
  it("keeps direct GSC evidence isolated to the Pillow property", () => {
    const fetcher = read("scripts/fetch-pillow-gsc.mjs");
    expect(fetcher).toContain("PILLOW_PROPERTY");
    expect(fetcher).toContain("client.sites.get");
    expect(fetcher).toContain("for (const date of dates)");
    expect(fetcher).toContain("{ date, page:");
    expect(fetcher).toContain("page\", \"query\", \"country\", \"device");
    expect(fetcher).not.toMatch(/findyouridealgolfball|coffee-machine|mattress|solar/i);
  });
});