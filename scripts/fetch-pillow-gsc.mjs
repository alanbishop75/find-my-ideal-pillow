import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { google } from "googleapis";

const require = createRequire(import.meta.url);
const { PILLOW_PROPERTY, assertPillowProperty } = require("./pillow-seo-policy.cjs");
const root = process.cwd();
const args = process.argv.slice(2);
const option = (name) => args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const endDate = option("--end-date") ?? new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
const startDate = option("--start-date") ?? new Date(new Date(`${endDate}T00:00:00Z`).getTime() - 89 * 86400000).toISOString().slice(0, 10);

if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate) || startDate > endDate) throw new Error("Use valid YYYY-MM-DD --start-date and --end-date values.");
assertPillowProperty(PILLOW_PROPERTY);
if (args.includes("--dry-run")) {
  console.log(JSON.stringify({ mode: "dry-run", siteUrl: PILLOW_PROPERTY, startDate, endDate, dimensions: ["date", "page", "query", "country", "device"] }, null, 2));
  process.exit(0);
}

const inline = process.env.GSC_PILLOW_SERVICE_ACCOUNT_JSON ?? process.env.GSC_SERVICE_ACCOUNT_JSON;
const keyFile = process.env.GSC_PILLOW_SERVICE_ACCOUNT_KEY_FILE ?? process.env.GSC_SERVICE_ACCOUNT_KEY_FILE;
if (!inline && !keyFile) {
  throw new Error("Missing Pillow GSC credentials. Grant the existing service-account email access to sc-domain:findyouridealpillow.com in Search Console Settings > Users and permissions as Full user, then set GSC_PILLOW_SERVICE_ACCOUNT_JSON or GSC_PILLOW_SERVICE_ACCOUNT_KEY_FILE and rerun npm run seo:pillow:gsc-fetch.");
}
const credentials = inline ? JSON.parse(inline) : JSON.parse(await fs.readFile(path.resolve(root, keyFile), "utf8"));
const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/webmasters.readonly"] });
const client = google.searchconsole({ version: "v1", auth });
await client.sites.get({ siteUrl: PILLOW_PROPERTY });

const dates = [];
for (let date = new Date(`${startDate}T00:00:00Z`); date <= new Date(`${endDate}T00:00:00Z`); date.setUTCDate(date.getUTCDate() + 1)) {
  dates.push(date.toISOString().slice(0, 10));
}

const rows = [];
for (const date of dates) {
  const response = await client.searchanalytics.query({
    siteUrl: PILLOW_PROPERTY,
    requestBody: { startDate: date, endDate: date, dimensions: ["page", "query", "country", "device"], type: "web", rowLimit: 25000 },
  });
  rows.push(...(response.data.rows ?? []).map((row) => ({ date, page: row.keys?.[0] ?? "", query: row.keys?.[1] ?? "", country: row.keys?.[2] ?? "", device: row.keys?.[3] ?? "", clicks: row.clicks ?? 0, impressions: row.impressions ?? 0, ctr: row.ctr ?? 0, averagePosition: row.position ?? 0 })));
}
const snapshot = {
  schemaVersion: 1, source: "direct-google-search-console", siteUrl: PILLOW_PROPERTY, fetchedAt: new Date().toISOString(),
  dateRange: { startDate, endDate, excludedNewestDays: 3 }, dimensions: ["page", "query", "country", "device"],
  limitations: ["API output is subject to Search Console row limits.", "This raw evidence makes no SEO recommendation."],
  rows,
};
const outputDirectory = path.join(root, "seo-results", "gsc", "direct");
await fs.mkdir(outputDirectory, { recursive: true });
const output = path.join(outputDirectory, `pillow-gsc-${startDate}-to-${endDate}.json`);
await fs.writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
await fs.writeFile(path.join(outputDirectory, "latest.json"), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(JSON.stringify({ mode: "write", siteUrl: PILLOW_PROPERTY, rows: snapshot.rows.length, snapshotFile: path.relative(root, output) }, null, 2));