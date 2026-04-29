/**
 * config/pillow/products.ts
 *
 * Initial product catalogue — 10 pillows spanning budget, mid, and premium
 * tiers across the UK and US markets.
 *
 * Attribute key reference (used by the scoring engine):
 *
 *  sleepPosition  'side' | 'back' | 'stomach' | 'combination' | 'any'
 *                 Primary designed sleep position. 'any' = works for all.
 *  firmness       'soft' | 'medium-soft' | 'medium' | 'firm'
 *  fill           'memory-foam' | 'natural-down' | 'hollow-fibre' |
 *                 'latex' | 'gel-fibre' | 'hybrid'
 *  cooling        boolean  — true when the pillow has active cooling tech
 *                           (gel layer, open-cell foam, bamboo cover, etc.)
 *  hypoallergenic boolean  — true if safe for dust-mite / feather allergies
 *  support        'standard' | 'enhanced'
 *                 'enhanced' = specifically engineered for neck/spinal support
 *  adjustable     boolean  — fill volume can be added or removed by the user
 *  priceTier      'budget' | 'mid' | 'premium'
 *  rrp            UK RRP in GBP (per pillow)
 *  rrpUs          US RRP in USD (per pillow)
 *  availability   'uk' | 'us' | 'both'
 *
 * Image note: placeholder images are used until product images are sourced
 * and licensed. Replace /images/placeholder.png before launch.
 *
 * Buy-link note: all links are in config/pillow/buy-links.ts and marked
 * isTemporary=true until URLs are manually verified.
 */
import type { Product } from "../../core/types";

export const products: Product[] = [

  // ── UK BUDGET ──────────────────────────────────────────────────────────────

  {
    id: "silentnight-comfort-hollowfibre",
    name: "Comfort Hollowfibre Pillow",
    brand: "Silentnight",
    description:
      "A washable, allergy-friendly hollow-fibre pillow that suits back and combination sleepers well. Trusted UK household name — widely available in supermarkets and online.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "back",
      firmness:       "medium-soft",
      fill:           "hollow-fibre",
      cooling:        false,
      hypoallergenic: true,
      support:        "standard",
      adjustable:     false,
      priceTier:      "budget",
      rrp:            9,
      rrpUs:          12,
      availability:   "both",
    },
  },

  {
    id: "slumberdown-side-sleeper",
    name: "Big Hugs Extra Support Side Sleeper Pillow",
    brand: "Slumberdown",
    description:
      "A firm, high-loft hollow-fibre pillow specifically shaped to bridge the shoulder-to-head gap for side sleepers. One of Amazon UK's consistent bestsellers. Machine washable.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "side",
      firmness:       "firm",
      fill:           "hollow-fibre",
      cooling:        false,
      hypoallergenic: true,
      support:        "standard",
      adjustable:     false,
      priceTier:      "budget",
      rrp:            14,
      rrpUs:          18,
      availability:   "both",
    },
  },

  // ── UK MID ────────────────────────────────────────────────────────────────

  {
    id: "silentnight-impress-memory-foam",
    name: "Impress Memory Foam Pillow",
    brand: "Silentnight",
    description:
      "A contoured memory-foam pillow with a breathable cover. Provides consistent neck support throughout the night — particularly good for side and back sleepers who wake with neck stiffness.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "side",
      firmness:       "medium",
      fill:           "memory-foam",
      cooling:        false,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     false,
      priceTier:      "mid",
      rrp:            22,
      rrpUs:          28,
      availability:   "both",
    },
  },

  {
    id: "snuggledown-goose-feather-down",
    name: "Hungarian Goose Feather & Down Pillow",
    brand: "Snuggledown",
    description:
      "A classic natural-fill pillow — soft, breathable, and luxuriously comfortable. Best for back sleepers and those who enjoy a traditional feather-and-down feel. Not suitable for allergy sufferers.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "back",
      firmness:       "medium-soft",
      fill:           "natural-down",
      cooling:        false,
      hypoallergenic: false,
      support:        "standard",
      adjustable:     false,
      priceTier:      "mid",
      rrp:            28,
      rrpUs:          35,
      availability:   "both",
    },
  },

  {
    id: "panda-luxury-bamboo",
    name: "Luxury Bamboo Pillow",
    brand: "Panda",
    description:
      "A shredded memory-foam pillow with a Oeko-Tex certified bamboo cover. Naturally cooling, hypoallergenic, and adjustable — you can remove fill to dial in your preferred loft. A strong all-rounder for hot sleepers.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "any",
      firmness:       "medium",
      fill:           "memory-foam",
      cooling:        true,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     true,
      priceTier:      "mid",
      rrp:            40,
      rrpUs:          50,
      availability:   "both",
    },
  },

  {
    id: "emma-premium-pillow",
    name: "Premium Pillow",
    brand: "Emma",
    description:
      "A three-layer adaptive-foam pillow from the mattress brand Emma. A comfort layer, a support layer, and a responsive transition layer work together to maintain neutral neck alignment. Particularly well-suited to side and back sleepers.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "side",
      firmness:       "medium",
      fill:           "memory-foam",
      cooling:        false,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     false,
      priceTier:      "mid",
      rrp:            55,
      rrpUs:          65,
      availability:   "both",
    },
  },

  // ── UK / INTERNATIONAL PREMIUM ────────────────────────────────────────────

  {
    id: "simba-hybrid-pillow",
    name: "Hybrid Pillow",
    brand: "Simba",
    description:
      "Simba's flagship pillow combines responsive Nanocube fill with a temperature-regulating Stratos cover. Individually adjustable Nanocubes let you tune the height precisely. Excellent for combination sleepers and hot sleepers.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "combination",
      firmness:       "medium",
      fill:           "hybrid",
      cooling:        true,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     true,
      priceTier:      "premium",
      rrp:            85,
      rrpUs:          100,
      availability:   "both",
    },
  },

  {
    id: "tempur-original",
    name: "Original Pillow",
    brand: "TEMPUR",
    description:
      "Tempur's iconic viscoelastic memory foam mould precisely to the shape of your head and neck — and stays there all night. Firm and dense: ideal for back sleepers and anyone with persistent neck pain. Hospital-grade pressure relief.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "back",
      firmness:       "firm",
      fill:           "memory-foam",
      cooling:        false,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     false,
      priceTier:      "premium",
      rrp:            120,
      rrpUs:          145,
      availability:   "both",
    },
  },

  // ── US MARKET HIGHLIGHTS ──────────────────────────────────────────────────
  // Available via Amazon US; Coop also ships to UK.

  {
    id: "coop-eden-pillow",
    name: "Eden Pillow",
    brand: "Coop Home Goods",
    description:
      "An adjustable pillow filled with a proprietary blend of shredded memory foam and microfibre. Remove or add fill to hit your exact comfort level. Consistently rated as the best adjustable pillow in North American independent reviews. GREENGUARD Gold certified.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "any",
      firmness:       "medium",
      fill:           "hybrid",
      cooling:        false,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     true,
      priceTier:      "mid",
      rrp:            80,
      rrpUs:          80,
      availability:   "both",
    },
  },

  {
    id: "purple-harmony-pillow",
    name: "Harmony Pillow",
    brand: "Purple",
    description:
      "Purple's signature hex grid sits over a Talalay latex core, creating a uniquely springy and cooling pillow that never traps heat. The grid flexes under pressure but bounces back instantly — exceptional for hot sleepers and combination sleepers who need a pillow that adapts as they move.",
    imageUrl: "/images/placeholder.png",
    affiliateLinks: [],
    attributes: {
      sleepPosition:  "combination",
      firmness:       "medium",
      fill:           "latex",
      cooling:        true,
      hypoallergenic: true,
      support:        "enhanced",
      adjustable:     false,
      priceTier:      "premium",
      rrp:            155,
      rrpUs:          155,
      availability:   "both",
    },
  },
];

