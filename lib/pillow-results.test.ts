import { buildPillowSummary, isAdjacentFit, pickStrongAlternative, type ScoredPillow } from './pillow-results';

function makeProduct(overrides: Partial<ScoredPillow> = {}): ScoredPillow {
  return {
    id: 'product-a',
    name: 'Product A',
    brand: 'Brand A',
    description: 'A test pillow',
    imageUrl: '/images/pillow.jpeg',
    affiliateLinks: [],
    attributes: {
      sleepPosition: 'side',
      firmness: 'medium',
      fill: 'memory-foam',
      support: 'enhanced',
      adjustable: false,
      cooling: false,
      priceTier: 'mid',
    },
    _score: 20,
    _reasons: ['Reason one', 'Reason two'],
    ...overrides,
  };
}

describe('pillow results helpers', () => {
  it('treats nearby but distinct products as adjacent fits', () => {
    const best = makeProduct();
    const candidate = makeProduct({
      id: 'product-b',
      brand: 'Brand B',
      _score: 18,
      attributes: {
        sleepPosition: 'side',
        firmness: 'medium',
        fill: 'latex',
        support: 'enhanced',
        adjustable: false,
        cooling: true,
        priceTier: 'mid',
      },
    });

    expect(isAdjacentFit(candidate, best)).toBe(true);
  });

  it('rejects near-duplicate alternatives', () => {
    const best = makeProduct();
    const duplicate = makeProduct({
      id: 'product-b',
      _score: 19,
      brand: 'Brand A',
    });

    expect(isAdjacentFit(duplicate, best)).toBe(false);
  });

  it('prefers the most adjacent alternative in a scored list', () => {
    const best = makeProduct();
    const adjacent = makeProduct({
      id: 'product-b',
      brand: 'Brand B',
      _score: 19,
      attributes: {
        sleepPosition: 'side',
        firmness: 'medium',
        fill: 'latex',
        support: 'enhanced',
        adjustable: false,
        cooling: true,
        priceTier: 'mid',
      },
    });
    const distant = makeProduct({
      id: 'product-c',
      brand: 'Brand C',
      _score: 19,
      attributes: {
        sleepPosition: 'stomach',
        firmness: 'soft',
        fill: 'natural-down',
        support: 'standard',
        adjustable: false,
        cooling: false,
        priceTier: 'budget',
      },
    });

    expect(pickStrongAlternative([best, distant, adjacent], best).id).toBe('product-b');
  });

  it('avoids repeating the same summary when prior copy is provided', () => {
    const product = makeProduct();
    const first = buildPillowSummary(product, 'Best Match', { reasons: product._reasons });
    const second = buildPillowSummary(product, 'Best Match', {
      reasons: product._reasons,
      priorCopy: new Set([first]),
    });

    expect(first).toMatch(/Closest overall fit|Top match for your answers|strongest all-round pick/i);
    expect(second).not.toEqual(first);
  });
});
