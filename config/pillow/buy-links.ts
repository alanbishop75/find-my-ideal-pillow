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

// ── US Amazon affiliate links ────────────────────────────────────────────────
// Tag is embedded directly into the /dp/ URL. This is fully Associates-compliant
// (the standard `tag=` query parameter is the canonical attribution mechanism).
// No SiteStripe step required.
const US_ASSOCIATE_TAG = "findmyidealpillow-20";

/** US Amazon link with tag embedded directly into /dp/ URL. */
export function usLink(asin: string): BuyLinks {
  return {
    UK: [],
    US: [
      {
        retailerKey: "amazon-us",
        retailerName: "Amazon",
        region: "US",
        url: `https://www.amazon.com/dp/${asin}?tag=${US_ASSOCIATE_TAG}`,
        expectedDomain: "amazon.com",
        isTemporary: false,
        source: "manual",
        notes: `Verified ASIN ${asin} on Amazon US ${REVIEW_DATE}; tag=${US_ASSOCIATE_TAG} embedded.`,
        isPrimary: true,
      },
    ],
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

  // ── US Amazon entries ────────────────────────────────────────────────────
  // Tag findmyidealpillow-20 embedded directly in /dp/ URL via usLink().
  // All 30 ASINs verified live on amazon.com 2026-05-01.
  "beckham-hotel-2pack-us": usLink("B01LYNW421"),
  "utopia-bedding-cooling-2pack-us": usLink("B08DTH86Q2"),
  "coop-original-adjustable-us": usLink("B00EINBSEW"),
  "coop-eden-cooling-us": usLink("B01LYU7V4S"),
  "coop-cool-plus-us": usLink("B0BQRBQ6C5"),
  "coop-essence-down-alt-us": usLink("B0D366787V"),
  "coop-adjustable-latex-us": usLink("B0DKVXC4QG"),
  "tempur-symphony-us": usLink("B07CMK551C"),
  "tempur-cloud-standard-us": usLink("B07CMKX3C7"),
  "tempur-cloud-dual-cooling-us": usLink("B07CNRG34Q"),
  "casper-original-us": usLink("B07KRKFLCT"),
  "casper-essential-cooling-us": usLink("B0C35MFMXJ"),
  "egohome-cooling-gel-us": usLink("B0DB1P81BF"),
  "jollyvogue-cooling-2pack-us": usLink("B07LCKK117"),
  "jollyvogue-soft-2pack-us": usLink("B0D8KLNGKS"),
  "bedsure-hotel-2pack-us": usLink("B08HVJQ2YP"),
  "eiue-hotel-2pack-us": usLink("B097CZCDQG"),
  "sasttie-firm-2pack-us": usLink("B0DPMS4MWR"),
  "amazon-basics-down-alt-2pack-us": usLink("B0835CHHZV"),
  "roumea-gusseted-2pack-us": usLink("B0D1BC1TR5"),
  "huxmeyson-4pack-us": usLink("B0D6R9LGBF"),
  "utopia-bedding-premium-2pack-us": usLink("B071DFDF9N"),
  "qutool-cooling-shredded-2pack-us": usLink("B07T7W7VR3"),
  "dreamyblue-signature-us": usLink("B09ZKFK4JD"),
  "sidney-sleep-curved-contour-us": usLink("B0993G154N"),
  "nuzzle-adjustable-hotel-us": usLink("B0DX793MV8"),
  "tempur-ergo-neck-medium-us": usLink("B07CMFSY97"),
  "royal-therapy-contour-cervical-us": usLink("B07KBVS54W"),
  "blissbury-thin-stomach-us": usLink("B0CG2N4723"),
  "cooling-gel-bamboo-medium-firm-us": usLink("B0CZ7KPBGH"),
};

export function getRegionLinks(productId: string, region: Region) {
  const entry = pillowBuyLinks[productId];
  if (!entry) return [];
  return entry[region] ?? [];
}
