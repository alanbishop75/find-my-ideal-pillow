/**
 * config/pillow/buy-links.ts
 *
 * STUB — buy links pending product sourcing and retailer verification.
 * Replace with real buy link data before launch (Phase 5).
 */
import type { BuyLinks } from "../../core/geo/types";

export const pillowBuyLinks: Record<string, BuyLinks> = {};

export function getRegionLinks(productId: string, region: "UK" | "US") {
  return pillowBuyLinks[productId]?.[region] ?? [];
}
