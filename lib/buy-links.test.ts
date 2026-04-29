/**
 * lib/buy-links.test.ts
 *
 * STUB — Pillow buy-link tests pending real product data (Phase 5).
 *
 * Validates:
 *  1. pillowBuyLinks and getRegionLinks are importable.
 *  2. getRegionLinks returns an array for any product ID (no crash).
 *  3. All URLs in the map start with https://.
 *
 * Replace with full per-product assertions once config/pillow/buy-links.ts
 * is populated with real retailer data.
 */

import { pillowBuyLinks, getRegionLinks } from "../config/pillow/buy-links";
import { products } from "../config/pillow/products";
import { scorePillow } from "../config/pillow/scoring";

describe('pillow buy-links — stub validation', () => {
  it('pillowBuyLinks is importable and is an object', () => {
    expect(typeof pillowBuyLinks).toBe('object');
  });

  it('getRegionLinks returns an empty array for an unknown product (no crash)', () => {
    expect(getRegionLinks('unknown-product', 'UK')).toEqual([]);
    expect(getRegionLinks('unknown-product', 'US')).toEqual([]);
  });

  it('all link URLs in the map start with https://', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of [...(links.UK ?? []), ...(links.US ?? [])]) {
        expect(link.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('scoring engine is importable', () => {
    expect(typeof scorePillow).toBe('function');
  });

  it('products list is defined', () => {
    expect(Array.isArray(products)).toBe(true);
  });
});
