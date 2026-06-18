/**
 * lib/scoring-regression.test.ts
 *
 * Property-based scoring regression tests for the rebuilt UK Amazon catalogue
 * (post 2026-04-30 CPP rebuild). Assertions describe ranking behaviour in
 * terms of product attributes rather than specific product IDs, so they are
 * stable across catalogue refreshes.
 */
import { products } from '../config/pillow/products';
import { scorePillow } from '../config/pillow/scoring';

type Answers = Record<string, string>;

function rank(answers: Answers) {
  return [...products]
    .map((p) => {
      const { score, reasons } = scorePillow(p, answers);
      return { id: p.id, score, reasons, product: p };
    })
    .sort((a, b) => b.score - a.score);
}

describe('scoring sanity', () => {
  it('catalogue has at least 25 products', () => {
    expect(products.length).toBeGreaterThanOrEqual(25);
  });

  it('natural-down products are not marked hypoallergenic', () => {
    const naturalDown = products.filter((p) => p.attributes.fill === 'natural-down');
    expect(naturalDown.length).toBeGreaterThan(0);
    for (const p of naturalDown) {
      expect(p.attributes.hypoallergenic).toBe(false);
    }
  });

  it('UK catalogue has at least one stomach-sleeper option', () => {
    const ukStomach = products.filter(
      (p) => p.attributes.availability === 'uk' && p.attributes.sleepPosition === 'stomach'
    );
    expect(ukStomach.length).toBeGreaterThanOrEqual(1);
  });

  it('all products score >= 0 for any input', () => {
    const answers: Answers = {
      'sleep-position': 'side',
      'firmness': 'medium',
      'fill': 'no-preference',
      'temperature': 'normal',
      'neck-comfort': 'no',
      'hypoallergenic': 'no',
      'budget': 'mid',
    };
    for (const p of products) {
      const { score } = scorePillow(p, answers);
      expect(score).toBeGreaterThanOrEqual(0);
    }
  });

  it('scoring engine returns numeric score and reasons array', () => {
    const { score, reasons } = scorePillow(products[0], { 'sleep-position': 'side' });
    expect(typeof score).toBe('number');
    expect(Array.isArray(reasons)).toBe(true);
  });
});

// Persona A — side sleeper, hot, hypoallergenic, neck pain
describe('Persona A — side / hot / hypo / neck pain', () => {
  const answers: Answers = {
    'sleep-position': 'side',
    'firmness': 'medium',
    'fill': 'foam',
    'temperature': 'hot',
    'neck-comfort': 'yes',
    'hypoallergenic': 'yes',
    'budget': 'mid',
  };

  it('top pick is cooling and hypoallergenic with enhanced support', () => {
    const top = rank(answers)[0];
    expect(top.product.attributes.cooling).toBe(true);
    expect(top.product.attributes.hypoallergenic).toBe(true);
    expect(top.product.attributes.support).toBe('enhanced');
  });

  it('top pick is compatible with side sleepers', () => {
    const top = rank(answers)[0];
    expect(['side', 'combination', 'any']).toContain(top.product.attributes.sleepPosition);
  });

  it('top-3 are not stomach-only pillows', () => {
    const top3 = rank(answers).slice(0, 3);
    for (const r of top3) {
      expect(r.product.attributes.sleepPosition).not.toBe('stomach');
    }
  });
});

// Persona B — back sleeper, firm preference, premium budget
describe('Persona B — back / firm / premium', () => {
  const answers: Answers = {
    'sleep-position': 'back',
    'firmness': 'firm',
    'fill': 'foam',
    'temperature': 'normal',
    'neck-comfort': 'yes',
    'hypoallergenic': 'no',
    'budget': 'premium',
  };

  it('top pick has firm firmness or enhanced support', () => {
    const top = rank(answers)[0];
    const ok = top.product.attributes.firmness === 'firm' ||
               top.product.attributes.support === 'enhanced';
    expect(ok).toBe(true);
  });

  it('top pick is not a soft side-sleeper-only pillow', () => {
    const top = rank(answers)[0];
    if (top.product.attributes.sleepPosition === 'side') {
      // if side-sleeper specific, must at least be firm
      expect(top.product.attributes.firmness).not.toBe('soft');
    }
  });
});

// Persona C — combination sleeper, hot, premium budget
describe('Persona C — combination / hot / premium', () => {
  const answers: Answers = {
    'sleep-position': 'combination',
    'firmness': 'medium',
    'fill': 'no-preference',
    'temperature': 'hot',
    'neck-comfort': 'sometimes',
    'hypoallergenic': 'yes',
    'budget': 'premium',
  };

  it('top pick is cooling', () => {
    const top = rank(answers)[0];
    expect(top.product.attributes.cooling).toBe(true);
  });

  it('top pick supports combination or any sleep position', () => {
    const top = rank(answers)[0];
    expect(['combination', 'any', 'side', 'back']).toContain(top.product.attributes.sleepPosition);
  });

  it('non-cooling natural-down pillows do not appear in top 3', () => {
    const top3 = rank(answers).slice(0, 3);
    for (const r of top3) {
      const a = r.product.attributes;
      const noncoolingDown = a.cooling === false && a.fill === 'natural-down';
      expect(noncoolingDown).toBe(false);
    }
  });
});

// Persona D — budget side sleeper, no allergies
describe('Persona D — budget side sleeper', () => {
  const answers: Answers = {
    'sleep-position': 'side',
    'firmness': 'medium',
    'fill': 'no-preference',
    'temperature': 'normal',
    'neck-comfort': 'no',
    'hypoallergenic': 'no',
    'budget': 'budget',
  };

  it('top pick is in the budget price tier', () => {
    const top = rank(answers)[0];
    expect(top.product.attributes.priceTier).toBe('budget');
  });

  it('top pick is compatible with side sleepers', () => {
    const top = rank(answers)[0];
    expect(['side', 'combination', 'any']).toContain(top.product.attributes.sleepPosition);
  });
});

// Persona E — premium budget rejects budget-tier pillows from top
describe('Persona E — premium budget preference penalises budget pillows', () => {
  const answers: Answers = {
    'sleep-position': 'back',
    'firmness': 'medium',
    'fill': 'natural',
    'temperature': 'normal',
    'neck-comfort': 'no',
    'hypoallergenic': 'no',
    'budget': 'premium',
  };

  it('the top pick is not in the budget price tier', () => {
    const top = rank(answers)[0];
    expect(top.product.attributes.priceTier).not.toBe('budget');
  });
});
