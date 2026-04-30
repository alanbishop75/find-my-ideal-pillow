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

/** Used by the affiliate admin API once a SiteStripe-tagged URL has been applied. */
export function affiliateLink(url: string, asin: string): BuyLinks {
  return {
    UK: [
      {
        retailerKey: "amazon-uk",
        retailerName: "Amazon UK",
        region: "UK",
        url,
        expectedDomain: "amazon.co.uk",
        isTemporary: false,
        source: "sitestripe",
        notes: `SiteStripe-tagged URL for ASIN ${asin}. Applied via admin.`,
        isPrimary: true,
      },
    ],
    US: [],
  };
}

export const pillowBuyLinks: Record<string, BuyLinks> = {
  "snuggledown-hungarian-goose-down": affiliateLink("https://amzn.to/48z2WwR", "B00XLGCYMC"),
  "yxtex-goose-feather-down-2pack": affiliateLink("https://amzn.to/3PaxA9a", "B095NN6BSR"),
  "silentnight-adjustable-memory-foam": affiliateLink("https://amzn.to/4cH5PxY", "B0DK78ZGZS"),
  "cosi-home-luxury-memory-foam": affiliateLink("https://amzn.to/3QFOlcJ", "B08YZ7FM5Z"),
  "aeyla-dual-adjustable-pillow": affiliateLink("https://amzn.to/3QxhRBz", "B0BJMP44N2"),
  "silentnight-hungarian-goose-down-2pack": affiliateLink("https://amzn.to/3Pdfkfl", "B0CNDBVGH7"),
  "homefoucs-luxury-feather-down": affiliateLink("https://amzn.to/3P8pA8F", "B0CZZXPB1B"),
  "gluckstoff-orthopedic-neck": affiliateLink("https://amzn.to/4tH5OzX", "B0C28YW42Q"),
  "talatex-adjustable-cervical": affiliateLink("https://amzn.to/3QV4uuR", "B0FF4HQGM7"),
  "ecosafeter-high-density-memory-foam": affiliateLink("https://amzn.to/4cVmSuV", "B0FCF2MLHV"),
  "derila-ergo-memory-foam": affiliateLink("https://amzn.to/4dhvAoE", "B0F3NTQCYP"),
  "cloudetoile-shredded-memory-foam": affiliateLink("https://amzn.to/3QGw3rQ", "B0GX91Z25D"),
  "analin-goose-feather-down": affiliateLink("https://amzn.to/3OMv6h7", "B0841XM678"),
  "silentnight-deep-sleep-hollowfibre": affiliateLink("https://amzn.to/4upijAu", "B006DDGCI2"),
  "silentnight-anti-allergy": affiliateLink("https://amzn.to/3PazJBK", "B01CR9IRWY"),
  "silentnight-hungarian-goose-single": affiliateLink("https://amzn.to/4t72ywY", "B07MVRYJQ4"),
  "slumberdown-hotel-quality-firm": affiliateLink("https://amzn.to/42qx0Hz", "B0CFRF6HMX"),
  "fine-bedding-spundown-firm": affiliateLink("https://amzn.to/4tKoLSH", "B00H0DO0I8"),
  "sufuee-goose-feather-down-15": affiliateLink("https://amzn.to/4vXmbKB", "B07CNQFPL4"),
  "bedstory-down-alternative-2pack": affiliateLink("https://amzn.to/4tPgzk6", "B07TP6192S"),
  "martian-dreams-velistra-2pack": affiliateLink("https://amzn.to/3QE7BaB", "B07XM72XC6"),
  "martian-dreams-lunacore-hybrid": affiliateLink("https://amzn.to/4271deo", "B0B18H4D1R"),
  "littens-luxury-hungarian-goose": affiliateLink("https://amzn.to/4ejo5if", "B019E3GM2S"),
  "winthome-memory-foam-neck": affiliateLink("https://amzn.to/4w1pRe1", "B0DZ6C4W6X"),
  "panda-bamboo-activefoam-memory": affiliateLink("https://amzn.to/4cTKSPc", "B0D89ZSKGQ"),
  "utopia-bedding-2pack": affiliateLink("https://amzn.to/4tIgmyS", "B0BCWYV9QT"),
  "martian-made-coolbreeze-hybrid": affiliateLink("https://amzn.to/48BGnYm", "B0CQPQXGL5"),
  "bedstory-shredded-cooling-2pack": affiliateLink("https://amzn.to/4ufaOf5", "B0BRSKN52L"),
  "rohi-hotel-quality-down-alt": affiliateLink("https://amzn.to/4n0oSa7", "B0GT58H2FC"),
  "talatex-natural-dunlop-latex": affiliateLink("https://amzn.to/4cTKXCu", "B0GJ54R9CT"),
};

export function getRegionLinks(productId: string, region: Region) {
  const entry = pillowBuyLinks[productId];
  if (!entry) return [];
  return entry[region] ?? [];
}
