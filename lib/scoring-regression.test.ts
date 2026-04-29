/**
 * lib/scoring-regression.test.ts
 *
 * STUB — Pillow scoring regression tests pending:
 *   1. Real product data in config/pillow/products.ts (Phase 5)
 *   2. Scoring model validated offline in spreadsheet (Phase 6)
 *   3. Real scoring logic in config/pillow/scoring.ts (Phase 7)
 *
 * Replace this file with persona-based regression tests before launch.
 */
import { products } from '../config/pillow/products';
import { scorePillow } from '../config/pillow/scoring';

describe('pillow scoring stubs', () => {
  it('product catalogue is defined (may be empty pre-launch)', () => {
    expect(Array.isArray(products)).toBe(true);
  });

  it('scoring engine returns valid shape for any product and answers', () => {
    if (products.length === 0) return; // No products yet — skip
    const result = scorePillow(products[0], { 'sleep-position': 'side' });
    expect(typeof result.score).toBe('number');
    expect(Array.isArray(result.reasons)).toBe(true);
  });
});
