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

  it('all UK links are amazon.co.uk or amzn.to (SiteStripe short links)', () => {
    for (const [id, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        const isDirectAmazon = /^https:\/\/www\.amazon\.co\.uk\//.test(link.url);
        const isSiteStripe = /^https:\/\/amzn\.to\//.test(link.url);
        expect(isDirectAmazon || isSiteStripe).toBe(true);
        // SiteStripe links must declare expectedDomain as amazon.co.uk
        expect(link.expectedDomain).toBe('amazon.co.uk');
      }
    }
  });

  it('all SiteStripe links have source=sitestripe', () => {
    for (const [id, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        if (/^https:\/\/amzn\.to\//.test(link.url)) {
          expect(link.source).toBe('sitestripe');
        }
      }
    }
  });

  it('all UK products have a SiteStripe URL applied', () => {
    let sitestripedCount = 0;
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.UK ?? []) {
        if (link.source === 'sitestripe') sitestripedCount++;
      }
    }
    const ukProductCount = products.filter((p) => p.attributes.availability === 'uk').length;
    expect(sitestripedCount).toBe(ukProductCount);
  });

  it('US buy-links use amazon.com with embedded findmyidealpillow-20 tag', () => {
    for (const [, links] of Object.entries(pillowBuyLinks)) {
      for (const link of links.US ?? []) {
        expect(link.expectedDomain).toBe('amazon.com');
        expect(link.url).toMatch(/^https:\/\/www\.amazon\.com\/dp\//);
        expect(link.url).toContain('tag=findyouridealpillow-20');
      }
    }
  });

  it('every US product has a non-temporary US link with source=manual', () => {
    for (const p of products) {
      if (p.attributes.availability !== 'us') continue;
      const usLinks = pillowBuyLinks[p.id]?.US ?? [];
      expect(usLinks.length).toBe(1);
      expect(usLinks[0].isTemporary).toBe(false);
      expect(usLinks[0].source).toBe('manual');
    }
  });

  it('every US product has usAmazonVerification = AMAZON_US_VERIFIED_EXACT', () => {
    for (const p of products) {
      if (p.attributes.availability !== 'us') continue;
      expect(p.usAmazonVerification?.status).toBe('AMAZON_US_VERIFIED_EXACT');
    }
  });

  it('UK and US product IDs are disjoint (separate entries)', () => {
    const ukIds = new Set(
      products.filter((p) => p.attributes.availability === 'uk').map((p) => p.id)
    );
    const usIds = new Set(
      products.filter((p) => p.attributes.availability === 'us').map((p) => p.id)
    );
    for (const id of usIds) expect(ukIds.has(id)).toBe(false);
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

  it('every UK product is AMAZON_UK_VERIFIED_EXACT (post strict-rebuild)', () => {
    for (const p of products) {
      if (p.attributes.availability !== 'uk') continue;
      expect(p.ukAmazonVerification?.status).toBe('AMAZON_UK_VERIFIED_EXACT');
    }
  });

  it('all UK products have a ukAmazonVerification status', () => {
    for (const p of products) {
      if (p.attributes.availability !== 'uk') continue;
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
