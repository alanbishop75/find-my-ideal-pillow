/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { assertPillowProperty, classifyAction } = require("./pillow-seo-policy.cjs");
const { calculateGscWindows } = require("./pillow-seo-windows.cjs");

describe("Pillow SEO agent policy", () => {
  const root = process.cwd();
  const policy = fs.readFileSync(path.join(root, ".github/agents/pillow-seo.agent.md"), "utf8");
  it("isolates the exact Pillow property and rejects cross-product contamination", () => {
    expect(assertPillowProperty("sc-domain:findyouridealpillow.com")).toBe("sc-domain:findyouridealpillow.com");
    ["sc-domain:findyouridealgolfball.com", "sc-domain:coffee.example", "sc-domain:mattress.example", "sc-domain:solar.example"].forEach((property) => expect(() => assertPillowProperty(property)).toThrow());
  });
  it("uses complete non-overlapping evidence windows and separates action classes", () => {
    expect(calculateGscWindows("2026-09-07")).toMatchObject({ latest: { startDate: "2026-08-08", endDate: "2026-09-04" }, previous: { startDate: "2026-07-11", endDate: "2026-08-07" }, excludedNewestDays: 3 });
    ["Implement now", "Prepare for approval", "Investigate now", "Verify now", "Monitor", "Protect", "Reject"].forEach(classifyAction);
  });
  it("requires scoped protection, approval boundaries, and non-monitoring work", () => {
    ["Protecting a recently changed Pillow page must not freeze the rest of the site", "Five monitoring entries are not five opportunities", "Stop for approval before changing content", "affiliate destinations"].forEach((phrase) => expect(policy).toContain(phrase));
  });
});