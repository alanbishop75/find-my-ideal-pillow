/**
 * lib/buy-links.test.ts
 *
 * Validates pillow buy-link data integrity.
 *
 * All links are currently marked isTemporary=true (generated search URLs).
 * This suite confirms structural integrity — each product has links, all
 * URLs start with https://, and retailer keys are consistently named.
 */

import { pillowBuyLinks, getRegionLinks } from "../config/pillow/buy-links";
import { products } from "../config/pillow/products";
import { scorePillow } from "../config/pillow/scoring";

describe('pillow buy-links — structural validation', () => {
  it('pillowBuyLinks is importable and is an object', () => {
    expect(typeof pillowBuyLinks).toBe('object');
  });

  it('every product has at least one UK buy-link entry', () => {
    for (const p of products) {
      const ukLinks = pillowBuyLinks[p.id]?.UK ?? [];
      expect(ukLinks.length).toBeGreaterThan(0);
    }
  });

  it('every product has at least one US buy-link entry', () => {
    for (const p of products) {
      const usLinks = pillowBuyLinks[p.id]?.US ?? [];
      expect(usLinks.length).toBeGreaterThan(0);
    }
  });

  it('all link URLs start with https://', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of [...(links.UK ?? []), ...(links.US ?? [])]) {
        expect(link.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('all links have a non-empty retailerKey and retailerName', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of [...(links.UK ?? []), ...(links.US ?? [])]) {
        expect(link.retailerKey).toBeTruthy();
        expect(link.retailerName).toBeTruthy();
      }
    }
  });

  it('getRegionLinks returns an empty array for an unknown product (no crash)', () => {
    expect(getRegionLinks('unknown-product', 'UK')).toEqual([]);
    expect(getRegionLinks('unknown-product', 'US')).toEqual([]);
  });

  it('scoring engine is importable', () => {
    expect(typeof scorePillow).toBe('function');
  });

  it('products list has 10 entries', () => {
    expect(products.length).toBe(10);
  });
});


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
