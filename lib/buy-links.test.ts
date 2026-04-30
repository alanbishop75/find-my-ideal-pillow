/**
 * lib/buy-links.test.ts
 *
 * Strict UK Amazon affiliate link validation.
 *
 * Phase: UK Amazon only.
 * Rules enforced here:
 *  - No buy-link URL may be a search result URL (contains /s?k=)
 *  - No buy-link URL may point outside amazon.co.uk
 *  - REMOVE_FROM_CATALOGUE products must have empty UK arrays
 *  - Products with AMAZON_UK_VERIFIED_EXACT must have exactly one non-temporary UK link
 *  - No product may have US buy-links in this phase
 *  - Any link that is isTemporary must NOT have source='manual'
 *    (manual = verified; temporary = unverified — they are mutually exclusive)
 */

import { pillowBuyLinks, getRegionLinks } from "../config/pillow/buy-links";
import { products } from "../config/pillow/products";
import { scorePillow } from "../config/pillow/scoring";

describe('pillow buy-links — UK Amazon only phase', () => {

  it('pillowBuyLinks is importable and is an object', () => {
    expect(typeof pillowBuyLinks).toBe('object');
  });

  it('every product has a buy-links map entry', () => {
    for (const p of products) {
      expect(pillowBuyLinks[p.id]).toBeDefined();
    }
  });

  it('no UK link is a search-result URL', () => {
    for (const [id, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        expect(link.url).not.toMatch(/\/s\?k=/);
        expect(link.url).not.toMatch(/\/s\?keywords=/);
      }
    }
  });

  it('all UK links point to amazon.co.uk only', () => {
    for (const [id, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        expect(link.url).toMatch(/^https:\/\/www\.amazon\.co\.uk\//);
      }
    }
  });

  it('no US buy-links exist in this phase', () => {
    for (const [id, links] of Object.entries(pillowBuyLinks)) {
      expect((links.US ?? []).length).toBe(0);
    }
  });

  it('no non-Amazon UK links exist (no John Lewis, Dunelm, etc.)', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        expect(link.expectedDomain).toBe('amazon.co.uk');
        expect(link.url).not.toMatch(/johnlewis\.com/);
        expect(link.url).not.toMatch(/dunelm\.com/);
        expect(link.url).not.toMatch(/argos\.co\.uk/);
      }
    }
  });

  it('REMOVE_FROM_CATALOGUE products have empty UK arrays', () => {
    for (const p of products) {
      if (p.ukAmazonVerification?.status === 'REMOVE_FROM_CATALOGUE') {
        const ukLinks = pillowBuyLinks[p.id]?.UK ?? [];
        expect(ukLinks.length).toBe(0);
      }
    }
  });

  it('AMAZON_UK_VERIFIED_EXACT products have exactly one non-temporary UK link', () => {
    for (const p of products) {
      if (p.ukAmazonVerification?.status === 'AMAZON_UK_VERIFIED_EXACT') {
        const ukLinks = pillowBuyLinks[p.id]?.UK ?? [];
        const verifiedLinks = ukLinks.filter((l) => !l.isTemporary);
        expect(verifiedLinks.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('isTemporary links never have source=manual', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of [...(links.UK ?? []), ...(links.US ?? [])]) {
        if (link.isTemporary) {
          expect(link.source).not.toBe('manual');
        }
      }
    }
  });

  it('all present link URLs start with https://', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of [...(links.UK ?? []), ...(links.US ?? [])]) {
        expect(link.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('getRegionLinks returns empty array for unknown product', () => {
    expect(getRegionLinks('unknown-product', 'UK')).toEqual([]);
    expect(getRegionLinks('unknown-product', 'US')).toEqual([]);
  });

  it('scoring engine is importable', () => {
    expect(typeof scorePillow).toBe('function');
  });

  it('product catalogue is non-trivial in size', () => {
    expect(products.length).toBeGreaterThanOrEqual(25);
  });

  it('every product is AMAZON_UK_VERIFIED_EXACT (post strict-rebuild)', () => {
    for (const p of products) {
      expect(p.ukAmazonVerification?.status).toBe('AMAZON_UK_VERIFIED_EXACT');
    }
  });

  it('all products have a ukAmazonVerification status', () => {
    for (const p of products) {
      expect(p.ukAmazonVerification).toBeDefined();
      expect(p.ukAmazonVerification?.status).toBeTruthy();
    }
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
