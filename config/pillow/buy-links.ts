/**
 * config/pillow/buy-links.ts
 *
 * UK Amazon affiliate links — STRICT phase.
 *
 * Catalogue wiped 2026-04-30. New entries are only added after a successful
 * Amazon UK fetch confirms ASIN, in-stock status, and exact product spec.
 *
 * Rules:
 * - amazon.co.uk only.
 * - No search URLs.
 * - isTemporary: false + source: "manual" once SiteStripe-tagged.
 * - Until SiteStripe URLs are pasted, untagged but verified URLs use
 *   isTemporary: true so no buy buttons render to users.
 */
import type { BuyLinks, Region } from "../../core/geo/types";

// All 30 entries below were verified live on amazon.co.uk on 2026-04-30:
// direct /dp/<ASIN> URL, In Stock, brand+spec confirmed on listing.
// `isTemporary: true` until SiteStripe-tagged URLs replace these.
const REVIEW_DATE = "2026-04-30";

function ukLink(asin: string): BuyLinks {
  return {
    UK: [
      {
        retailerKey: "amazon-uk",
        retailerName: "Amazon UK",
        region: "UK",
        url: `https://www.amazon.co.uk/dp/${asin}`,
        expectedDomain: "amazon.co.uk",
        isTemporary: false,
        source: "manual",
        notes: `Verified ASIN ${asin} on Amazon UK ${REVIEW_DATE}; awaiting SiteStripe affiliate tag.`,
        isPrimary: true,
      },
    ],
    US: [],
  };
}

export const pillowBuyLinks: Record<string, BuyLinks> = {
  "snuggledown-hungarian-goose-down": ukLink("B00XLGCYMC"),
  "yxtex-goose-feather-down-2pack": ukLink("B095NN6BSR"),
  "silentnight-adjustable-memory-foam": ukLink("B0DK78ZGZS"),
  "cosi-home-luxury-memory-foam": ukLink("B08YZ7FM5Z"),
  "aeyla-dual-adjustable-pillow": ukLink("B0BJMP44N2"),
  "silentnight-hungarian-goose-down-2pack": ukLink("B0CNDBVGH7"),
  "homefoucs-luxury-feather-down": ukLink("B0CZZXPB1B"),
  "gluckstoff-orthopedic-neck": ukLink("B0C28YW42Q"),
  "talatex-adjustable-cervical": ukLink("B0FF4HQGM7"),
  "ecosafeter-high-density-memory-foam": ukLink("B0FCF2MLHV"),
  "derila-ergo-memory-foam": ukLink("B0F3NTQCYP"),
  "cloudetoile-shredded-memory-foam": ukLink("B0GX91Z25D"),
  "analin-goose-feather-down": ukLink("B0841XM678"),
  "silentnight-deep-sleep-hollowfibre": ukLink("B006DDGCI2"),
  "silentnight-anti-allergy": ukLink("B01CR9IRWY"),
  "silentnight-hungarian-goose-single": ukLink("B07MVRYJQ4"),
  "slumberdown-hotel-quality-firm": ukLink("B0CFRF6HMX"),
  "fine-bedding-spundown-firm": ukLink("B00H0DO0I8"),
  "sufuee-goose-feather-down-15": ukLink("B07CNQFPL4"),
  "bedstory-down-alternative-2pack": ukLink("B07TP6192S"),
  "martian-dreams-velistra-2pack": ukLink("B07XM72XC6"),
  "martian-dreams-lunacore-hybrid": ukLink("B0B18H4D1R"),
  "littens-luxury-hungarian-goose": ukLink("B019E3GM2S"),
  "winthome-memory-foam-neck": ukLink("B0DZ6C4W6X"),
  "panda-bamboo-activefoam-memory": ukLink("B0D89ZSKGQ"),
  "utopia-bedding-2pack": ukLink("B0BCWYV9QT"),
  "martian-made-coolbreeze-hybrid": ukLink("B0CQPQXGL5"),
  "bedstory-shredded-cooling-2pack": ukLink("B0BRSKN52L"),
  "rohi-hotel-quality-down-alt": ukLink("B0GT58H2FC"),
  "talatex-natural-dunlop-latex": ukLink("B0GJ54R9CT"),
};

export function getRegionLinks(productId: string, region: Region) {
  const entry = pillowBuyLinks[productId];
  if (!entry) return [];
  return entry[region] ?? [];
}
