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

describe("PillowSeoLandingPage side-sleeper table gating", () => {
  it("renders the comparison only on the canonical side-sleeper page", () => {
    const sideSleepers = renderSlug("best-pillow-for-side-sleepers");
    expect(sideSleepers).toContain("Side Sleeper Pillow Comparison");
    expect(sideSleepers).toContain("Check current price");

    for (const slug of ["best-pillow-for-back-sleepers", "best-pillow-for-neck-pain", "best-cooling-pillow"]) {
      expect(renderSlug(slug)).not.toContain("Side Sleeper Pillow Comparison");
    }
  });
});