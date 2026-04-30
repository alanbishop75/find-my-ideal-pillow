/**
 * config/pillow/products.ts
 *
 * Pillow product catalogue.
 *
 * Catalogue rebuilt 2026-04-30 via the autonomous CPP (Strict Product
 * Building) pipeline. Every entry below was verified live on Amazon UK:
 *  - direct /dp/<ASIN> URL (no search URLs)
 *  - "In Stock" at the time of verification
 *  - brand and product spec confirmed on the listing
 *
 * Attribute key reference (used by the scoring engine):
 *
 *  sleepPosition  'side' | 'back' | 'stomach' | 'combination' | 'any'
 *  firmness       'soft' | 'medium-soft' | 'medium' | 'firm'
 *  fill           'memory-foam' | 'natural-down' | 'hollow-fibre' |
 *                 'latex' | 'gel-fibre' | 'hybrid'
 *  cooling        boolean
 *  hypoallergenic boolean
 *  support        'standard' | 'enhanced'
 *  adjustable     boolean
 *  priceTier      'budget' | 'mid' | 'premium'
 *  rrp            UK RRP in GBP
 *  rrpUs          US RRP in USD (unused in UK-only phase)
 *  availability   'uk' | 'us' | 'both'
 *
 * Schema-mapping notes for this rebuild:
 *  - "down alternative" filled pillows are mapped to fill='hollow-fibre'
 *    (the schema's microfibre/synthetic family).
 *  - Listings advertised as "medium-firm" are mapped to firmness='firm'
 *    (the closest valid value in the current schema).
 */
import type { Product } from "../../core/types";

const REVIEW_DATE = "2026-04-30";

function ukVerified(asin: string, evidence: string) {
  return {
    status: "AMAZON_UK_VERIFIED_EXACT" as const,
    notes: evidence,
    amazonUkCandidateUrl: `https://www.amazon.co.uk/dp/${asin}`,
    lastReviewed: REVIEW_DATE,
  };
}

const US_REVIEW_DATE = "2026-05-01";

function usVerified(asin: string, evidence: string) {
  return {
    status: "AMAZON_US_VERIFIED_EXACT" as const,
    notes: evidence,
    amazonUsCandidateUrl: `https://www.amazon.com/dp/${asin}`,
    lastReviewed: US_REVIEW_DATE,
  };
}

export const products: Product[] = [
  {
    id: "snuggledown-hungarian-goose-down",
    name: "Snuggledown Hungarian Goose Down Pillow",
    brand: "Snuggledown",
    description:
      "100% Hungarian goose down pillow with cotton cover, sized 48x74cm, naturally breathable.",
    imageUrl: "https://m.media-amazon.com/images/I/71geVhytj4L._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B00XLGCYMC",
      "In Stock at £58.25. Page shows Brand: Snuggledown, Fill: Goose Down, Size: 48x74cm, suitable for back/front sleepers."
    ),
    attributes: {
      sleepPosition: "back",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "premium",
      rrp: 58.25,
      availability: "uk",
    },
  },
  {
    id: "yxtex-goose-feather-down-2pack",
    name: "YXTEX Goose Feather and Down Pillows 2 Pack",
    brand: "YXTEX",
    description:
      "2-pack pillows with 40% goose down and 60% goose feather, hypoallergenic cotton cover, 1200GSM filling.",
    imageUrl: "https://m.media-amazon.com/images/I/51QoBxgqwaL._AC_SL1024_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B095NN6BSR",
      "In Stock £28.89 for 2-pack (£14.45 each). Page shows hypoallergenic, 1200GSM filling, all sleep positions."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrp: 14.45,
      availability: "uk",
    },
  },
  {
    id: "silentnight-adjustable-memory-foam",
    name: "Silentnight Adjustable Memory Foam Pillow",
    brand: "Silentnight",
    description:
      "Adjustable memory foam pillow with internal zip for custom firmness, cooling gel technology.",
    imageUrl: "https://m.media-amazon.com/images/I/71Y09P-tLTL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0DK78ZGZS",
      "In Stock at £44.99. Page confirms adjustable fill, memory foam, cooling gel, Silentnight brand."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrp: 44.99,
      availability: "uk",
    },
  },
  {
    id: "cosi-home-luxury-memory-foam",
    name: "Cosi Home Luxury Memory Foam Pillow with Cooling Gel",
    brand: "Cosi Home",
    description:
      "Memory foam pillow with cooling gel infused, breathable microfibre cover.",
    imageUrl: "https://m.media-amazon.com/images/I/81WZ4VHWlAL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B08YZ7FM5Z",
      "In Stock at £20.99. Brand: Cosi Home, Fill: Memory Foam with cooling gel, 50x75cm."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium-soft",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrp: 20.99,
      availability: "uk",
    },
  },
  {
    id: "aeyla-dual-adjustable-pillow",
    name: "Aeyla Dual Pillow Adjustable 2-in-1",
    brand: "Aeyla",
    description:
      "2-in-1 dual-sided pillow with CloudAlign support, cooling breathable cover, adjustable loft. Down-alternative fill.",
    imageUrl: "https://m.media-amazon.com/images/I/61oONj+27cL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0BJMP44N2",
      "In Stock at £58.74. Adjustable, cooling technology, suitable for all positions, hypoallergenic. Fill material: Down Alternative (mapped to hollow-fibre in schema)."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrp: 58.74,
      availability: "uk",
    },
  },
  {
    id: "silentnight-hungarian-goose-down-2pack",
    name: "Silentnight Hungarian Goose Down Pillows 2 Pack",
    brand: "Silentnight",
    description:
      "2-pack 100% Hungarian goose down pillows, front/back sleeper optimised, premium cotton cover.",
    imageUrl: "https://m.media-amazon.com/images/I/71xexoKfebL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0CNDBVGH7",
      "In Stock £54.99 for 2-pack (£27.50 each). Brand: Silentnight, Fill: 100% Hungarian Goose Down."
    ),
    attributes: {
      sleepPosition: "back",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "premium",
      rrp: 27.50,
      availability: "uk",
    },
  },
  {
    id: "homefoucs-luxury-feather-down",
    name: "HOMEFOUCS Luxury Feather Down Pillows",
    brand: "HOMEFOUCS",
    description:
      "Luxury goose feather and down pillows, striped cotton cover, 1200GSM filling.",
    imageUrl: "https://m.media-amazon.com/images/I/81QIM5C+vdL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0CZZXPB1B",
      "In Stock £36.78 for 2-pack (£18.39 each). Feather and down filling, hypoallergenic, all positions."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrp: 18.39,
      availability: "uk",
    },
  },
  {
    id: "gluckstoff-orthopedic-neck",
    name: "Glückstoff Orthopedic Neck Pillow",
    brand: "Glückstoff",
    description:
      "Certified orthopedic memory foam neck pillow for anti-snore and cervical support, suitable for all sleep positions.",
    imageUrl: "https://m.media-amazon.com/images/I/81hP8aHHnSL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0C28YW42Q",
      "In Stock at £69.90. Orthopedic-grade memory foam, suitable for all sleep positions, specialist design. 6,221 reviews / 4.2 stars."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "firm",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrp: 69.90,
      availability: "uk",
    },
  },
  {
    id: "talatex-adjustable-cervical",
    name: "Talatex Adjusted Cervical Pillow",
    brand: "Talatex",
    description:
      "Dunlop latex cervical pillow with adjustable fill, washable cover, pressure-relieving support.",
    imageUrl: "https://m.media-amazon.com/images/I/61cbwSSLDbL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0FF4HQGM7",
      "In Stock at £59.99. Brand: Talatex, Fill: Latex, adjustable, side/back sleeper design."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "latex",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrp: 59.99,
      availability: "uk",
    },
  },
  {
    id: "ecosafeter-high-density-memory-foam",
    name: "Ecosafeter High Density Memory Foam Pillow",
    brand: "Ecosafeter",
    description:
      "Ergonomic high-density memory foam pillow with removable cover, hypoallergenic design.",
    imageUrl: "https://m.media-amazon.com/images/I/619sQKtN2uL._AC_SL1315_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0FCF2MLHV",
      "In Stock at £26.99. Memory foam, all sleep positions, removable and washable cover."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrp: 26.99,
      availability: "uk",
    },
  },
  {
    id: "derila-ergo-memory-foam",
    name: "Derila ERGO Pillow Memory Foam",
    brand: "Derila",
    description:
      "Ergonomic memory foam pillow with cooling gel, cervical neck support, all sleep positions.",
    imageUrl: "https://m.media-amazon.com/images/I/71j7iI+vviL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0F3NTQCYP",
      "In Stock at £50.99. Memory foam with cooling, ergonomic design, all sleep positions."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrp: 50.99,
      availability: "uk",
    },
  },
  {
    id: "cloudetoile-shredded-memory-foam",
    name: "CloudÉtoile Shredded Memory Foam Pillow",
    brand: "CloudÉtoile",
    description:
      "Adjustable shredded memory foam pillow with cooling gel, CertiPUR-US certified, washable cover.",
    imageUrl: "https://m.media-amazon.com/images/I/71exMzKAwAL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0GX91Z25D",
      "In Stock at £39.99. Shredded memory foam, adjustable fill, cooling technology, CertiPUR-US certified. 202 reviews / 4.4 stars."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrp: 39.99,
      availability: "uk",
    },
  },
  {
    id: "analin-goose-feather-down",
    name: "ANALIN Goose Feather Pillows 2 Pack",
    brand: "ANALIN",
    description:
      "2-pack goose feather pillows with 50% down, non-allergenic cotton cover.",
    imageUrl: "https://m.media-amazon.com/images/I/51MG0FUAQOL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0841XM678",
      "In Stock £50 for 2-pack (£25 each). 50% goose down, 50% feather, hypoallergenic."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrp: 25.00,
      availability: "uk",
    },
  },
  {
    id: "silentnight-deep-sleep-hollowfibre",
    name: "Silentnight Deep Sleep Pillow 2 Pack",
    brand: "Silentnight",
    description:
      "2-pack hollowfibre pillows, anti-allergy treatment, washable design.",
    imageUrl: "https://m.media-amazon.com/images/I/71t-9HMgotL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B006DDGCI2",
      "In Stock £16.70 for 2-pack (£8.35 each). Hollowfibre fill, hypoallergenic."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrp: 8.35,
      availability: "uk",
    },
  },
  {
    id: "silentnight-anti-allergy",
    name: "Silentnight Anti Allergy Pillow 2 Pack",
    brand: "Silentnight",
    description:
      "2-pack anti-bacterial hollowfibre pillows, hypoallergenic, side sleeper optimised.",
    imageUrl: "https://m.media-amazon.com/images/I/712COeF6hEL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B01CR9IRWY",
      "In Stock £16 for 2-pack (£8 each). Anti-allergy treatment, hollowfibre, hypoallergenic."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrp: 8.00,
      availability: "uk",
    },
  },
  {
    id: "silentnight-hungarian-goose-single",
    name: "Silentnight Hungarian Goose Down Pillow Single",
    brand: "Silentnight",
    description:
      "Single Hungarian goose down pillow, front/back sleeper design, premium cotton.",
    imageUrl: "https://m.media-amazon.com/images/I/71HM8Ax3MSL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B07MVRYJQ4",
      "In Stock at £29.99. Hungarian goose down, suitable for front and back sleepers."
    ),
    attributes: {
      sleepPosition: "back",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "premium",
      rrp: 29.99,
      availability: "uk",
    },
  },
  {
    id: "slumberdown-hotel-quality-firm",
    name: "Slumberdown Hotel Quality Pillows 2 Pack",
    brand: "Slumberdown",
    description:
      "2-pack firm, plump rebound hollowfibre pillows, soft-touch microfibre cover, UK-made, hypoallergenic, machine washable, 48x74cm.",
    imageUrl: "https://m.media-amazon.com/images/I/817KvS7ZRZL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0CFRF6HMX",
      "In Stock £16.75 for 2-pack (£8.38 each). 4.4 stars / 7,698 reviews. Polyester hollowfibre, firm, back & side sleepers, hypoallergenic, UK Made. Amazon's Choice."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "budget",
      rrp: 8.38,
      availability: "uk",
    },
  },
  {
    id: "fine-bedding-spundown-firm",
    name: "The Fine Bedding Company Spundown Pillow Firm",
    brand: "The Fine Bedding Company",
    description:
      "Hotel-quality firm pillow with Smartfil microfibre fill (down-alternative), 100% cotton cover, hypoallergenic, machine washable at 60°C, used in InterContinental hotels.",
    imageUrl: "https://m.media-amazon.com/images/I/817WcxXSigL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B00H0DO0I8",
      "In Stock at £25.00 (RRP £27.00). 4.4 stars / 179 reviews. Smartfil microfibre (down-alternative, mapped to hollow-fibre in schema), firm, back & side sleepers, hypoallergenic, machine washable."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrp: 25.00,
      availability: "uk",
    },
  },
  {
    id: "sufuee-goose-feather-down-15",
    name: "SUFUEE Goose Feather and Down Pillows 2 Pack 15%",
    brand: "SUFUEE",
    description:
      "2-pack goose feather and down (85/15 blend) pillows, 100% cotton cover, 48x74cm. Oeko-Tex certified.",
    imageUrl: "https://m.media-amazon.com/images/I/51kQCP9SY2L._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B07CNQFPL4",
      "In Stock £33.99 for 2-pack (£17 each). 85% goose feather, 15% down, Oeko-Tex certified."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrp: 17.00,
      availability: "uk",
    },
  },
  {
    id: "bedstory-down-alternative-2pack",
    name: "BedStory Hotel Quality Pillows 2 Pack",
    brand: "BedStory",
    description:
      "2-pack down-alternative pillows, hotel quality fibres, microfibre cover, 42x70cm.",
    imageUrl: "https://m.media-amazon.com/images/I/61jr9c6dOeL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B07TP6192S",
      "In Stock £29.99 for 2-pack (£15 each). Down alternative, all sleep positions, hypoallergenic. (Down-alternative mapped to hollow-fibre in schema.)"
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrp: 15.00,
      availability: "uk",
    },
  },
  {
    id: "martian-dreams-velistra-2pack",
    name: "Martian Dreams Velistra Luxury Hotel Pillows 2 Pack",
    brand: "Martian Dreams",
    description:
      "2-pack ultra-soft microfibre pillows with adjustable fill, bamboo cover, hypoallergenic.",
    imageUrl: "https://m.media-amazon.com/images/I/71VeMRwyUyL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B07XM72XC6",
      "In Stock £47.99 for 2-pack (£24 each). Adjustable fill, microfibre, all positions."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium-soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: true,
      priceTier: "mid",
      rrp: 24.00,
      availability: "uk",
    },
  },
  {
    id: "martian-dreams-lunacore-hybrid",
    name: "Martian Dreams LunaCore Hybrid Pillow 2 Pack",
    brand: "Martian Dreams",
    description:
      "2-pack hybrid pillow with shredded memory foam and microfibre, adjustable, hypoallergenic.",
    imageUrl: "https://m.media-amazon.com/images/I/81AxiOUzQFL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0B18H4D1R",
      "In Stock £46.99 for 2-pack (£23.50 each). Hybrid fill, adjustable, neck and shoulder support. (Listing 'medium-firm' mapped to firm in schema.)"
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "hybrid",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrp: 23.50,
      availability: "uk",
    },
  },
  {
    id: "littens-luxury-hungarian-goose",
    name: "Littens Luxury Ultimate Collection Hungarian Goose Down 2 Pack",
    brand: "Littens",
    description:
      "Premium 100% Hungarian goose down pillows, 300TC cotton cover, gold piping, 48x74cm.",
    imageUrl: "https://m.media-amazon.com/images/I/61Ux9VunxTL._AC_SL1418_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B019E3GM2S",
      "In Stock £169.95 for 2-pack (£84.98 each). 100% Hungarian goose down, luxury collection."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "natural-down",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "premium",
      rrp: 84.98,
      availability: "uk",
    },
  },
  {
    id: "winthome-memory-foam-neck",
    name: "Winthome Memory Foam Pillow Two-Sided",
    brand: "Winthome",
    description:
      "Two-sided memory foam pillow (soft and firm sides), neck pain relief, cooling effect, 60x40x10cm.",
    imageUrl: "https://m.media-amazon.com/images/I/61-XBSyoqXL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0DZ6C4W6X",
      "In Stock £21.24. Memory foam, two-sided design, neck support, cooling properties."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "budget",
      rrp: 21.24,
      availability: "uk",
    },
  },
  {
    id: "panda-bamboo-activefoam-memory",
    name: "Panda Bamboo ActiveFoam+ Memory Foam Pillow",
    brand: "Panda",
    description:
      "Orthopaedic memory foam pillow with bamboo cover, thermoregulating, 10-year guarantee, 60x40x12cm.",
    imageUrl: "https://m.media-amazon.com/images/I/6198lGwW81L._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0D89ZSKGQ",
      "In Stock at £44.95. Orthopaedic-grade memory foam, bamboo cover, all positions, cooling. (Listing 'medium-firm' mapped to firm in schema.)"
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "firm",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrp: 44.95,
      availability: "uk",
    },
  },
  {
    id: "utopia-bedding-2pack",
    name: "Utopia Bedding Pillows 2 Pack",
    brand: "Utopia Bedding",
    description:
      "2-pack microfibre hotel quality pillows, double-needle stitching, 50x75cm, all sleep positions.",
    imageUrl: "https://m.media-amazon.com/images/I/71AFNEtoeJL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0BCWYV9QT",
      "In Stock £12.99 for 2-pack (£6.50 each). Polyester filling, all sleep positions, affordable."
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrp: 6.50,
      availability: "uk",
    },
  },
  {
    id: "martian-made-coolbreeze-hybrid",
    name: "Martian Made CoolBreeze Cooling Pillow",
    brand: "Martian Made",
    description:
      "Hybrid cooling pillow with gel-infused memory foam, adjustable fill, bamboo cover, 50x75cm.",
    imageUrl: "https://m.media-amazon.com/images/I/81GK+3wxSaL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0CQPQXGL5",
      "In Stock at £20.99. Cooling gel-infused shredded memory foam, adjustable, hypoallergenic."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "gel-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "budget",
      rrp: 20.99,
      availability: "uk",
    },
  },
  {
    id: "bedstory-shredded-cooling-2pack",
    name: "BedStory Shredded Memory Foam Pillow 2 Pack",
    brand: "BedStory",
    description:
      "2-pack shredded memory foam pillows with cooling gel, adjustable fill, 3D ice fabric cover.",
    imageUrl: "https://m.media-amazon.com/images/I/614g2qpZMjL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0BRSKN52L",
      "In Stock £37.99 for 2-pack (£19 each). Cooling gel memory foam, adjustable, neck/shoulder support."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrp: 19.00,
      availability: "uk",
    },
  },
  {
    id: "rohi-hotel-quality-down-alt",
    name: "Rohi Hotel Quality Pillows 2 Pack",
    brand: "Rohi",
    description:
      "2-pack down-alternative pillows, breathable cotton blend cover, all sleep positions, 45x66cm.",
    imageUrl: "https://m.media-amazon.com/images/I/51alENJPfxL._AC_SL1200_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0GT58H2FC",
      "In Stock £27.99 for 2-pack (£14 each). Down alternative, cotton cover, soft support. (Down-alternative mapped to hollow-fibre in schema.)"
    ),
    attributes: {
      sleepPosition: "combination",
      firmness: "medium-soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrp: 14.00,
      availability: "uk",
    },
  },
  {
    id: "talatex-natural-dunlop-latex",
    name: "Talatex Natural Dunlop Latex Pillow",
    brand: "Talatex",
    description:
      "100% pure natural Dunlop latex pillow, neck pain relief, breathable ventilation, 60x40x13cm.",
    imageUrl: "https://m.media-amazon.com/images/I/61zKVRuS0XL._AC_SL1500_.jpg",
    affiliateLinks: [],
    ukAmazonVerification: ukVerified(
      "B0GJ54R9CT",
      "In Stock at £69.99. Pure Thai latex, medium-firm, cooling breathable design, specialist support. (Listing 'medium-firm' mapped to firm in schema.)"
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "latex",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrp: 69.99,
      availability: "uk",
    },
  },

  // ── US Amazon catalogue ────────────────────────────────────────────────────
  // 30 products verified live on amazon.com via direct /dp/<ASIN> on 2026-05-01.
  // Sources: Best Sellers in Bed Pillows & Positioners (cat 1199122) +
  // Coop Home Goods, Tempur-Pedic, and cooling-pillow search result pages.
  // All entries: availability="us" so the UK questionnaire/scoring excludes them
  // and vice versa via region routing.

  {
    id: "beckham-hotel-2pack-us",
    name: "Beckham Hotel Collection Bed Pillows 2-Pack",
    brand: "Beckham Hotel Collection",
    description:
      "Standard/Queen 2-pack down-alternative pillows with soft hotel feel. Suitable for back, stomach, and side sleepers.",
    imageUrl: "https://m.media-amazon.com/images/I/71329CVoVDL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B01LYNW421",
      "Best Sellers #2 in Bed Pillows & Positioners. 4.4★, 259,973 ratings. Down-alternative, soft, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 44.99,
      availability: "us",
    },
  },
  {
    id: "utopia-bedding-cooling-2pack-us",
    name: "Utopia Bedding Cooling Bed Pillows 2-Pack",
    brand: "Utopia Bedding",
    description:
      "Queen 2-pack down-alternative pillows, soft & fluffy with cooling cover and gusseted edges. Hotel quality.",
    imageUrl: "https://m.media-amazon.com/images/I/61xfSz+1KOL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B08DTH86Q2",
      "Best Sellers #1 in Bed Pillows & Positioners. 4.5★, 76,455 ratings. Down-alternative, cooling, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "soft",
      fill: "hollow-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 29.99,
      availability: "us",
    },
  },
  {
    id: "coop-original-adjustable-us",
    name: "Coop Home Goods Original Adjustable Pillow",
    brand: "Coop Home Goods",
    description:
      "Cross-cut memory foam adjustable pillow, medium-firm. Removable Lulltra cover. CertiPUR-US/GREENGUARD Gold certified. Add or remove fill to customise loft.",
    imageUrl: "https://m.media-amazon.com/images/I/61hiruVCYbL._AC_SL1000_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B00EINBSEW",
      "Best Sellers #16 in Bed Pillows & Positioners. 4.5★, 65,675 ratings. Adjustable cross-cut memory foam, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrpUs: 79.99,
      availability: "us",
    },
  },
  {
    id: "coop-eden-cooling-us",
    name: "Coop Home Goods Eden Cooling Adjustable Pillow",
    brand: "Coop Home Goods",
    description:
      "Cross-cut gel-infused memory foam with microfibre fill, medium-soft. Cooling Lulltra cover. CertiPUR-US/GREENGUARD Gold. Adjustable loft.",
    imageUrl: "https://m.media-amazon.com/images/I/6165SNHE5KL._AC_SL1000_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B01LYU7V4S",
      "Top result for 'Coop Home Goods pillow'. Memory foam + microfibre hybrid, cooling gel, adjustable, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium-soft",
      fill: "hybrid",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrpUs: 99.99,
      availability: "us",
    },
  },
  {
    id: "coop-cool-plus-us",
    name: "Coop Home Goods Cool+ Adjustable Pillow",
    brand: "Coop Home Goods",
    description:
      "Plus-shaped memory foam pillow with cooling gel infusion and ergonomic neck cut-out. Adjustable loft for any sleep position.",
    imageUrl: "https://m.media-amazon.com/images/I/51M5GEYaFOL._AC_SL1005_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0BQRBQ6C5",
      "From Coop Home Goods search. Cool+ Plus-shaped memory foam with cooling gel, adjustable, neck support."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrpUs: 109.99,
      availability: "us",
    },
  },
  {
    id: "coop-essence-down-alt-us",
    name: "Coop Home Goods Essence Down-Alternative Pillow Set of 2",
    brand: "Coop Home Goods",
    description:
      "Queen 2-pack adjustable down-alternative pillows. Luxury hotel feel with the option to remove fill for custom firmness.",
    imageUrl: "https://m.media-amazon.com/images/I/51-DfoMka6L._AC_SL1000_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0D366787V",
      "From Coop Home Goods search. Adjustable down-alternative 2-pack, all-position, luxury hotel feel."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium-soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrpUs: 79.99,
      availability: "us",
    },
  },
  {
    id: "coop-adjustable-latex-us",
    name: "Coop Home Goods Adjustable Latex Pillow",
    brand: "Coop Home Goods",
    description:
      "Talalay latex shreds blended with microfibre, medium-firm. Naturally cooling and breathable. Eco-friendly. Adjustable loft.",
    imageUrl: "https://m.media-amazon.com/images/I/51JFDpiIgcL._AC_SL1000_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0DKVXC4QG",
      "From Coop Home Goods search. Talalay latex + microfibre, medium-firm, naturally cooling, adjustable, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "firm",
      fill: "latex",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "premium",
      rrpUs: 119.99,
      availability: "us",
    },
  },
  {
    id: "tempur-symphony-us",
    name: "Tempur-Pedic TEMPUR-Symphony Pillow",
    brand: "Tempur-Pedic",
    description:
      "Reversible TEMPUR memory foam pillow, luxury soft feel. Standard size. Made in the USA.",
    imageUrl: "https://m.media-amazon.com/images/I/81S4OZJthtL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07CMK551C",
      "Tempur-Pedic search result #8. Reversible TEMPUR memory foam pillow, soft feel, back/side sleepers."
    ),
    attributes: {
      sleepPosition: "back",
      firmness: "soft",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrpUs: 99.0,
      availability: "us",
    },
  },
  {
    id: "tempur-cloud-standard-us",
    name: "Tempur-Pedic TEMPUR-Cloud Pillow",
    brand: "Tempur-Pedic",
    description:
      "Adaptive TEMPUR memory foam pillow with washable cover. Standard profile, medium feel.",
    imageUrl: "https://m.media-amazon.com/images/I/61NodvtQc-L._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07CMKX3C7",
      "Tempur-Pedic search result #5. TEMPUR memory foam, washable cover, medium feel."
    ),
    attributes: {
      sleepPosition: "back",
      firmness: "medium",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrpUs: 89.0,
      availability: "us",
    },
  },
  {
    id: "tempur-cloud-dual-cooling-us",
    name: "Tempur-Pedic TEMPUR-Cloud Dual Cooling Pillow",
    brand: "Tempur-Pedic",
    description:
      "Queen size TEMPUR memory foam pillow with dual cooling cover for hot sleepers. Made in the USA.",
    imageUrl: "https://m.media-amazon.com/images/I/71KeXuoonoL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07CNRG34Q",
      "Tempur-Pedic search result. TEMPUR memory foam with dual cooling cover, queen size."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrpUs: 129.0,
      availability: "us",
    },
  },
  {
    id: "casper-original-us",
    name: "Casper Sleep Original Pillow",
    brand: "Casper",
    description:
      "Standard size down-alternative pillow with medium-soft feel. Supports side, back, and stomach sleepers. Machine washable.",
    imageUrl: "https://m.media-amazon.com/images/I/61oijjmB6QL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07KRKFLCT",
      "Coop Home Goods search result #19. Casper down-alternative, medium-soft, all-position, machine washable."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium-soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 65.0,
      availability: "us",
    },
  },
  {
    id: "casper-essential-cooling-us",
    name: "Casper Sleep Essential Cooling Foam Pillow",
    brand: "Casper",
    description:
      "King size firm memory foam pillow with cooling cover. Designed for side sleepers. Breathable and pressure-relieving.",
    imageUrl: "https://m.media-amazon.com/images/I/71GVBlthfOL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0C35MFMXJ",
      "Cooling search result #59. Firm memory foam with cooling cover, supports side sleepers."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 89.0,
      availability: "us",
    },
  },
  {
    id: "egohome-cooling-gel-us",
    name: "EGOHOME Cooling Gel Memory Foam Pillow",
    brand: "EGOHOME",
    description:
      "Reversible cooling gel memory foam pillow with neck support for all sleep positions. Removable & machine-washable cover.",
    imageUrl: "https://m.media-amazon.com/images/I/61ZNTUEnVzL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0DB1P81BF",
      "Cooling Gel Memory Foam search result #6 & frequently shopped brand. Reversible cooling cover, neck support, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 49.99,
      availability: "us",
    },
  },
  {
    id: "jollyvogue-cooling-2pack-us",
    name: "JOLLYVOGUE Standard Cooling Pillows 2-Pack",
    brand: "JOLLYVOGUE",
    description:
      "Standard 2-pack down-alternative pillows with cooling fabric. Hypoallergenic. Suited to side and back sleepers.",
    imageUrl: "https://m.media-amazon.com/images/I/61pRymTJgRL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07LCKK117",
      "Best Sellers #3 in Bed Pillows & Positioners. 4.4★, 21,986 ratings. Hypoallergenic down-alternative, cooling, side/back."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 22.99,
      availability: "us",
    },
  },
  {
    id: "jollyvogue-soft-2pack-us",
    name: "JOLLYVOGUE Queen Soft Pillows 2-Pack",
    brand: "JOLLYVOGUE",
    description:
      "Queen 2-pack soft down-alternative pillows. Luxury fluffy hotel quality for side, back, and stomach sleepers.",
    imageUrl: "https://m.media-amazon.com/images/I/61yOarbMUxL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0D8KLNGKS",
      "Best Sellers #13 in Bed Pillows & Positioners. 4.4★, 7,563 ratings. Soft down-alternative, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 19.99,
      availability: "us",
    },
  },
  {
    id: "bedsure-hotel-2pack-us",
    name: "Bedsure Hotel Collection Pillows 2-Pack",
    brand: "Bedsure",
    description:
      "Queen 2-pack hotel-collection down-alternative pillows. Soft support for back, stomach, and side sleepers. Hypoallergenic.",
    imageUrl: "https://m.media-amazon.com/images/I/71y2-IRPMEL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B08HVJQ2YP",
      "Best Sellers #29 in Bed Pillows & Positioners. 4.4★, 16,829 ratings. Hypoallergenic down-alternative, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 24.99,
      availability: "us",
    },
  },
  {
    id: "eiue-hotel-2pack-us",
    name: "EIUE Hotel Collection Pillows 2-Pack",
    brand: "EIUE",
    description:
      "Queen 2-pack super-soft down-alternative microfibre pillows for side and back sleepers, 20x30 inches.",
    imageUrl: "https://m.media-amazon.com/images/I/51gpc1r1PGL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B097CZCDQG",
      "Best Sellers #8 in Bed Pillows & Positioners. 4.4★, 36,712 ratings. Super-soft down-alternative, side/back."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "soft",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 22.99,
      availability: "us",
    },
  },
  {
    id: "sasttie-firm-2pack-us",
    name: "Sasttie Firm Pillows Queen 2-Pack",
    brand: "Sasttie",
    description:
      "Queen 2-pack firm down-alternative pillows for side, back, and stomach sleepers. Oeko-Tex certified, machine washable.",
    imageUrl: "https://m.media-amazon.com/images/I/61MLDfny75L._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0DPMS4MWR",
      "Best Sellers #11 in Bed Pillows & Positioners. 4.5★, 5,376 ratings. Oeko-Tex down-alternative, firm, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "firm",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 24.99,
      availability: "us",
    },
  },
  {
    id: "amazon-basics-down-alt-2pack-us",
    name: "Amazon Basics Down-Alternative Pillow 2-Pack",
    brand: "Amazon Basics",
    description:
      "Standard size 2-pack down-alternative pillows, medium density, for side and back sleepers, 26x20 inches.",
    imageUrl: "https://m.media-amazon.com/images/I/51ergTbpNlL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0835CHHZV",
      "Best Sellers #9 in Bed Pillows & Positioners. 4.2★, 6,159 ratings. Medium-density down-alternative, side/back."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 19.99,
      availability: "us",
    },
  },
  {
    id: "roumea-gusseted-2pack-us",
    name: "ROUMEA Gusseted Bed Pillows 2-Pack",
    brand: "ROUMEA",
    description:
      "Queen 2-pack gusseted down-alternative pillows. Luxury hotel quality, supportive, machine washable.",
    imageUrl: "https://m.media-amazon.com/images/I/61jw9Y3WggL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0D1BC1TR5",
      "Best Sellers #30 in Bed Pillows & Positioners. 4.4★, 2,016 ratings. Gusseted down-alternative, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 27.99,
      availability: "us",
    },
  },
  {
    id: "huxmeyson-4pack-us",
    name: "HUXMEYSON Standard Pillows 4-Pack",
    brand: "HUXMEYSON",
    description:
      "Standard 4-pack down-alternative luxury hotel pillows for side and back sleepers. Bulk-pack value.",
    imageUrl: "https://m.media-amazon.com/images/I/61oVz3nnlkL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0D6R9LGBF",
      "Best Sellers #21 in Bed Pillows & Positioners. 4.4★, 2,557 ratings. Down-alternative 4-pack, side/back."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 29.99,
      availability: "us",
    },
  },
  {
    id: "utopia-bedding-premium-2pack-us",
    name: "Utopia Bedding Premium Down-Alternative Pillows 2-Pack",
    brand: "Utopia Bedding",
    description:
      "Queen 2-pack premium down-alternative pillows with cooling cover. Hotel quality for back, stomach, or side sleepers.",
    imageUrl: "https://m.media-amazon.com/images/I/71pbS7L1IgL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B071DFDF9N",
      "Best Sellers #14 in Bed Pillows & Positioners. 4.5★, 43,021 ratings. Cooling down-alternative, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "budget",
      rrpUs: 32.99,
      availability: "us",
    },
  },
  {
    id: "qutool-cooling-shredded-2pack-us",
    name: "QUTOOL Cooling Shredded Memory Foam Pillows Queen 2-Pack",
    brand: "QUTOOL",
    description:
      "Queen 2-pack CertiPUR-US shredded memory foam pillows with cooling cover. Adjustable firmness via zip.",
    imageUrl: "https://m.media-amazon.com/images/I/81tcywwgQHL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07T7W7VR3",
      "Best Sellers #7 in Bed Pillows & Positioners. 4.4★, 21,586 ratings. CertiPUR-US shredded foam, cooling, adjustable."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrpUs: 49.99,
      availability: "us",
    },
  },
  {
    id: "dreamyblue-signature-us",
    name: "DreamyBlue Signature Adjustable Pillow",
    brand: "DreamyBlue",
    description:
      "Queen size shredded memory foam adjustable loft pillow with washable bamboo rayon cover. CertiPUR-US certified foam.",
    imageUrl: "https://m.media-amazon.com/images/I/61kV0vZosLL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B09ZKFK4JD",
      "Tempur-Pedic and Cooling search results. CertiPUR-US shredded foam, adjustable, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrpUs: 49.99,
      availability: "us",
    },
  },
  {
    id: "sidney-sleep-curved-contour-us",
    name: "Sidney Sleep Adjustable Curved Contour Pillow",
    brand: "Sidney Sleep",
    description:
      "Queen size curved-contour adjustable fill pillow for side and back sleepers. Neck and shoulder comfort with extra fill included.",
    imageUrl: "https://m.media-amazon.com/images/I/71cAU-fBr7L._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0993G154N",
      "Best Sellers #27 in Bed Pillows & Positioners. 4.3★, 11,502 ratings. Curved-contour adjustable, side/back."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrpUs: 49.99,
      availability: "us",
    },
  },
  {
    id: "nuzzle-adjustable-hotel-us",
    name: "Nuzzle Adjustable Firm Hotel Pillow",
    brand: "Nuzzle",
    description:
      "Standard size luxury hotel-collection adjustable pillow. Soft cooling design with adjustable height for all sleep positions.",
    imageUrl: "https://m.media-amazon.com/images/I/71UAIPBtI-L._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0DX793MV8",
      "Best Sellers #6 in Bed Pillows & Positioners. 4.3★, 6,998 ratings. Adjustable hotel feel, cooling, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "medium",
      fill: "hollow-fibre",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: true,
      priceTier: "mid",
      rrpUs: 59.99,
      availability: "us",
    },
  },
  {
    id: "tempur-ergo-neck-medium-us",
    name: "Tempur-Pedic TEMPUR-Ergo Neck Pillow Medium",
    brand: "Tempur-Pedic",
    description:
      "Ergonomic TEMPUR memory foam contour neck pillow, medium profile. Designed for cervical neck and shoulder support.",
    imageUrl: "https://m.media-amazon.com/images/I/71rTYUIoQ3L._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07CMFSY97",
      "Tempur-Pedic search result #6. Ergonomic contour memory foam neck pillow, medium profile."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "firm",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "premium",
      rrpUs: 89.0,
      availability: "us",
    },
  },
  {
    id: "royal-therapy-contour-cervical-us",
    name: "Royal Therapy Memory Foam Contour Cervical Pillow",
    brand: "Royal Therapy",
    description:
      "Queen size memory foam contour cervical pillow for neck pain relief. Designed for side, back, and stomach sleepers.",
    imageUrl: "https://m.media-amazon.com/images/I/71PIlZ6QKLL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B07KBVS54W",
      "Tempur-Pedic search result #25. Contour cervical memory foam, queen size, neck pain relief, all-position."
    ),
    attributes: {
      sleepPosition: "side",
      firmness: "medium",
      fill: "memory-foam",
      cooling: false,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 49.99,
      availability: "us",
    },
  },
  {
    id: "blissbury-thin-stomach-us",
    name: "BLISSBURY Thin Cooling Memory Foam Pillow",
    brand: "BLISSBURY",
    description:
      "Queen size 2.6-inch thin memory foam pillow for stomach and back sleepers. Removable cool-tech cover. CertiPUR-US certified.",
    imageUrl: "https://m.media-amazon.com/images/I/81CCR6UwFUL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0CG2N4723",
      "Cooling search result #30. Thin (2.6\") memory foam for stomach/back sleepers, CertiPUR-US, cooling cover."
    ),
    attributes: {
      sleepPosition: "stomach",
      firmness: "soft",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "standard",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 39.99,
      availability: "us",
    },
  },
  {
    id: "cooling-gel-bamboo-medium-firm-us",
    name: "Cooling Gel Memory Foam Bamboo Pillow (Standard)",
    brand: "Generic",
    description:
      "Standard size cooling gel memory foam bed pillow with bamboo viscose cover. Medium-firm, suitable for all sleep positions.",
    imageUrl: "https://m.media-amazon.com/images/I/71sNH1l+ZyL._AC_SL1500_.jpg",
    affiliateLinks: [],
    usAmazonVerification: usVerified(
      "B0CZ7KPBGH",
      "Cooling search result #9 & also Beckham search #58. Medium-firm cooling gel foam, bamboo viscose cover, all-position."
    ),
    attributes: {
      sleepPosition: "any",
      firmness: "firm",
      fill: "memory-foam",
      cooling: true,
      hypoallergenic: true,
      support: "enhanced",
      adjustable: false,
      priceTier: "mid",
      rrpUs: 39.99,
      availability: "us",
    },
  },
];
