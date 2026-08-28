import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PillowSeoLandingPage from "./PillowSeoLandingPage";
import { pillowSeoPageMap } from "../../../config/pillow/seo-pages";
import { RegionProvider } from "../../../core/geo/RegionContext";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt = "", src = "", ...rest }: { alt?: string; src?: string }) => React.createElement("img", { alt, src, ...rest }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href = "", children, ...rest }: { href?: string; children: React.ReactNode }) => React.createElement("a", { href, ...rest }, children),
}));

function renderSlug(slug: string): string {
  const page = pillowSeoPageMap[slug];
  if (!page) throw new Error(`Missing SEO page: ${slug}`);
  return renderToStaticMarkup(
    <RegionProvider>
      <PillowSeoLandingPage page={page} />
    </RegionProvider>
  );
}

describe("PillowSeoLandingPage comparison table gating", () => {
  it.each([
    ["best-pillow-for-side-sleepers", "Side Sleeper Pillow Comparison"],
    ["best-pillow-for-back-sleepers", "Best Pillows for Back Sleepers Compared"],
    ["best-cooling-pillow", "Best Cooling Pillows Compared"],
    ["best-pillow-for-snoring", "Snoring Pillow Comparison"],
    ["best-pillow-for-shoulder-pain", "Best Pillows for Neck and Shoulder Pain Compared"],
  ])("renders the decision comparison for %s", (slug, heading) => {
    const guide = renderSlug(slug);
    expect(guide).toContain(heading);
    expect(guide).toContain("Fill");
    expect(guide).toContain("Firmness");
    expect(guide).toContain("Price Check");
  });

  it("does not render decision comparisons on unrelated guides", () => {
    const guide = renderSlug("best-pillow-for-back-sleepers");
    expect(guide).not.toContain("Pillows Compared");
    expect(guide).not.toContain("Pillow Comparison");
  });
});