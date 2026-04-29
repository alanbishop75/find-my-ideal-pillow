/**
 * config/pillow/buy-links.ts
 *
 * Region-aware buy links for pillow products.
 *
 * ── UK retailers ────────────────────────────────────────────────────────────
 *   amazon      — Amazon.co.uk  (tag=findmyideal-21, pending Associates approval)
 *   johnlewis   — John Lewis & Partners (johnlewis.com)
 *   dunelm      — Dunelm (dunelm.com)
 *
 * ── US retailers ────────────────────────────────────────────────────────────
 *   amazon      — Amazon.com  (tag=findmyideal-20, US Associates pending)
 *
 * ── Source / status legend ──────────────────────────────────────────────────
 *   generated   — Auto-generated search URL; must be replaced with a direct
 *                 product page URL before launch. isTemporary = true.
 *   manual      — Hand-entered verified product URL. isTemporary = false.
 *
 * All links are currently 'generated' / isTemporary=true.
 * TODO before launch: replace each search URL with a direct product page URL
 * and update source → 'manual', isTemporary → false, notes → 'verified [date]'.
 */
import type { BuyLinks } from "../../core/geo/types";

export const pillowBuyLinks: Record<string, BuyLinks> = {

  // ── silentnight-comfort-hollowfibre ────────────────────────────────────────
  "silentnight-comfort-hollowfibre": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Silentnight+comfort+hollowfibre+pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — replace with direct ASIN before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Silentnight+hollowfibre+pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Silentnight has limited US availability",
      },
    ],
  },

  // ── slumberdown-side-sleeper ───────────────────────────────────────────────
  "slumberdown-side-sleeper": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Slumberdown+Big+Hugs+Side+Sleeper+pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — replace with ASIN before launch",
      },
      {
        retailerKey:    "dunelm",
        retailerName:   "Dunelm",
        region:         "UK",
        url:            "https://www.dunelm.com/search?query=slumberdown+side+sleeper+pillow",
        expectedDomain: "dunelm.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify direct product URL before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Slumberdown+side+sleeper+pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Slumberdown primarily UK brand",
      },
    ],
  },

  // ── silentnight-impress-memory-foam ───────────────────────────────────────
  "silentnight-impress-memory-foam": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Silentnight+Impress+Memory+Foam+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — replace with ASIN before launch",
      },
      {
        retailerKey:    "johnlewis",
        retailerName:   "John Lewis",
        region:         "UK",
        url:            "https://www.johnlewis.com/search?search-term=silentnight+impress+memory+foam+pillow",
        expectedDomain: "johnlewis.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify direct product URL before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Silentnight+Impress+Memory+Foam+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify US availability before launch",
      },
    ],
  },

  // ── snuggledown-goose-feather-down ────────────────────────────────────────
  "snuggledown-goose-feather-down": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Snuggledown+Hungarian+Goose+Feather+Down+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — replace with ASIN before launch",
      },
      {
        retailerKey:    "johnlewis",
        retailerName:   "John Lewis",
        region:         "UK",
        url:            "https://www.johnlewis.com/search?search-term=snuggledown+goose+feather+down+pillow",
        expectedDomain: "johnlewis.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify direct product URL before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Hungarian+Goose+Feather+Down+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Snuggledown primarily UK — search for equivalent",
      },
    ],
  },

  // ── panda-luxury-bamboo ────────────────────────────────────────────────────
  "panda-luxury-bamboo": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Panda+Luxury+Bamboo+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — replace with ASIN before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Panda+Bamboo+Memory+Foam+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify US availability",
      },
    ],
  },

  // ── emma-premium-pillow ────────────────────────────────────────────────────
  "emma-premium-pillow": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Emma+Premium+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Emma sells direct at emma-sleep.co.uk too",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Emma+Sleep+Premium+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify US availability",
      },
    ],
  },

  // ── simba-hybrid-pillow ────────────────────────────────────────────────────
  "simba-hybrid-pillow": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Simba+Hybrid+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Simba also sells direct at simbasleep.com",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Simba+Hybrid+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Simba has growing US presence",
      },
    ],
  },

  // ── tempur-original ────────────────────────────────────────────────────────
  "tempur-original": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=TEMPUR+Original+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — also available at John Lewis and tempur.co.uk",
      },
      {
        retailerKey:    "johnlewis",
        retailerName:   "John Lewis",
        region:         "UK",
        url:            "https://www.johnlewis.com/search?search-term=TEMPUR+original+pillow",
        expectedDomain: "johnlewis.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — John Lewis carries the full Tempur range",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Tempur-Pedic+Original+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Tempur-Pedic is the US brand name",
      },
    ],
  },

  // ── coop-eden-pillow ───────────────────────────────────────────────────────
  "coop-eden-pillow": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Coop+Home+Goods+Eden+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — verify UK availability before launch",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Coop+Home+Goods+Eden+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — #1 bestseller in US adjustable pillows",
      },
    ],
  },

  // ── purple-harmony-pillow ─────────────────────────────────────────────────
  "purple-harmony-pillow": {
    UK: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon UK",
        region:         "UK",
        url:            "https://www.amazon.co.uk/s?k=Purple+Harmony+Pillow&tag=findmyideal-21",
        expectedDomain: "amazon.co.uk",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — Purple has limited direct UK retail presence",
      },
    ],
    US: [
      {
        retailerKey:    "amazon",
        retailerName:   "Amazon US",
        region:         "US",
        url:            "https://www.amazon.com/s?k=Purple+Harmony+Pillow&tag=findmyideal-20",
        expectedDomain: "amazon.com",
        isTemporary:    true,
        source:         "generated",
        notes:          "Search URL — also available direct at purple.com",
      },
    ],
  },
};

export function getRegionLinks(productId: string, region: "UK" | "US") {
  return pillowBuyLinks[productId]?.[region] ?? [];
}

