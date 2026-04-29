/**
 * lib/scoring-regression.test.ts
 *
 * Pillow scoring regression tests — pillow-v1
 *
 * Each test is a realistic buyer persona. The assertions lock in the
 * expected ranking outcome so we can catch any scoring changes immediately.
 *
 * Personas covered:
 *   A. Side sleeper, neck pain, hot, needs hypo, mid budget
 *      → Panda Luxury Bamboo is the top pick
 *   B. Back sleeper, firm preference, no allergies, premium budget
 *      → TEMPUR Original is the top pick
 *   C. Stomach sleeper, soft, synthetic, no pain, budget
 *      → Silentnight Comfort Hollowfibre or Slumberdown Side Sleeper NOT top
 *         (stomach sleeper penalises high-loft/firm side-sleeper pillows)
 *   D. Combination sleeper, no preference, premium, hot sleeper
 *      → Simba Hybrid or Purple Harmony at the top (both cooling + combination)
 *   E. Back sleeper, allergy sufferer presented with natural-down pillow
 *      → Snuggledown score severely penalised
 */
import { products } from '../config/pillow/products';
import { scorePillow } from '../config/pillow/scoring';

function rank(answers: Record<string, string>) {
  return [...products]
    .map((p) => {
      const { score, reasons } = scorePillow(p, answers);
      return { id: p.id, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

// ── Sanity ────────────────────────────────────────────────────────────────────

describe('scoring sanity', () => {
  it('product catalogue has 10 entries', () => {
    expect(products.length).toBe(10);
  });

  it('all products score ≥ 0 for any input', () => {
    const answers = { 'sleep-position': 'side', 'firmness': 'medium', 'fill': 'no-preference', 'temperature': 'normal', 'neck-comfort': 'no', 'hypoallergenic': 'no', 'budget': 'mid' };
    for (const p of products) {
      const { score } = scorePillow(p, answers);
      expect(score).toBeGreaterThanOrEqual(0);
    }
  });

  it('scoring engine returns a number and an array of reasons', () => {
    const { score, reasons } = scorePillow(products[0], { 'sleep-position': 'side' });
    expect(typeof score).toBe('number');
    expect(Array.isArray(reasons)).toBe(true);
  });
});

// ── Persona A: Side sleeper, neck pain, hot, hypo, mid budget ─────────────────
// Expected: Panda Luxury Bamboo tops (cooling + hypo + enhanced support + side-compat)

describe('Persona A — side sleeper with neck pain and hot sleeping', () => {
  const answers = {
    'sleep-position': 'side',
    'firmness':       'medium',
    'fill':           'foam',
    'temperature':    'hot',
    'neck-comfort':   'yes',
    'hypoallergenic': 'yes',
    'budget':         'mid',
  };

  it('Panda Luxury Bamboo ranks in the top 3', () => {
    const ranked = rank(answers);
    const pandaRank = ranked.findIndex((r) => r.id === 'panda-luxury-bamboo');
    expect(pandaRank).toBeLessThan(3);
  });

  it('Snuggledown (non-hypo natural down) scores significantly lower than top pick', () => {
    const ranked = rank(answers);
    const top = ranked[0];
    const snuggle = ranked.find((r) => r.id === 'snuggledown-goose-feather-down')!;
    expect(top.score - snuggle.score).toBeGreaterThanOrEqual(15);
  });

  it('Panda Luxury Bamboo reasons include hypoallergenic and cooling', () => {
    const { reasons } = scorePillow(
      products.find((p) => p.id === 'panda-luxury-bamboo')!,
      answers
    );
    expect(reasons.some((r) => /hypoallergenic/i.test(r))).toBe(true);
    expect(reasons.some((r) => /cooling/i.test(r))).toBe(true);
  });
});

// ── Persona B: Back sleeper, firm, no allergy, premium ────────────────────────
// Expected: TEMPUR Original at the top (back + firm + enhanced support + premium)

describe('Persona B — back sleeper, firm preference, no allergies, premium budget', () => {
  const answers = {
    'sleep-position': 'back',
    'firmness':       'firm',
    'fill':           'foam',
    'temperature':    'normal',
    'neck-comfort':   'yes',
    'hypoallergenic': 'no',
    'budget':         'premium',
  };

  it('TEMPUR Original ranks first or second', () => {
    const ranked = rank(answers);
    const tempur = ranked.findIndex((r) => r.id === 'tempur-original');
    expect(tempur).toBeLessThan(2);
  });

  it('TEMPUR Original score is greater than Slumberdown Side Sleeper score', () => {
    const ranked = rank(answers);
    const tempur = ranked.find((r) => r.id === 'tempur-original')!;
    const slumber = ranked.find((r) => r.id === 'slumberdown-side-sleeper')!;
    expect(tempur.score).toBeGreaterThan(slumber.score);
  });
});

// ── Persona C: Stomach sleeper, soft, budget ─────────────────────────────────
// The side-sleeper pillows (Slumberdown, Emma) must be penalised for stomach sleepers.

describe('Persona C — stomach sleeper, soft preference, budget', () => {
  const answers = {
    'sleep-position': 'stomach',
    'firmness':       'soft',
    'fill':           'synthetic',
    'temperature':    'normal',
    'neck-comfort':   'no',
    'hypoallergenic': 'yes',
    'budget':         'budget',
  };

  it('Slumberdown Side Sleeper (firm, high-loft side-specific) is not in the top 2 for a stomach sleeper', () => {
    const ranked = rank(answers);
    const slumberRank = ranked.findIndex((r) => r.id === 'slumberdown-side-sleeper');
    // A firm, side-optimised pillow should not lead for a soft-preferring stomach sleeper
    expect(slumberRank).toBeGreaterThan(1);
  });

  it('TEMPUR Original (firm, back-focused) is not in the top 2', () => {
    const ranked = rank(answers);
    const tempur = ranked.findIndex((r) => r.id === 'tempur-original');
    expect(tempur).toBeGreaterThan(1);
  });
});

// ── Persona D: Combination sleeper, hot sleeper, premium ─────────────────────
// Simba Hybrid or Purple Harmony should top (both cooling + combination-optimised)

describe('Persona D — combination sleeper, hot, premium', () => {
  const answers = {
    'sleep-position': 'combination',
    'firmness':       'medium',
    'fill':           'no-preference',
    'temperature':    'hot',
    'neck-comfort':   'sometimes',
    'hypoallergenic': 'yes',
    'budget':         'premium',
  };

  it('Simba Hybrid or Purple Harmony ranks first or second', () => {
    const ranked = rank(answers);
    const top2 = ranked.slice(0, 2).map((r) => r.id);
    const hasSimbaOrPurple = top2.includes('simba-hybrid-pillow') || top2.includes('purple-harmony-pillow');
    expect(hasSimbaOrPurple).toBe(true);
  });

  it('both Simba and Purple score above Snuggledown for a hot combination sleeper', () => {
    const ranked = rank(answers);
    const simba   = ranked.find((r) => r.id === 'simba-hybrid-pillow')!;
    const purple  = ranked.find((r) => r.id === 'purple-harmony-pillow')!;
    const snuggle = ranked.find((r) => r.id === 'snuggledown-goose-feather-down')!;
    expect(simba.score).toBeGreaterThan(snuggle.score);
    expect(purple.score).toBeGreaterThan(snuggle.score);
  });
});

// ── Persona E: Natural-down penalty for allergy sufferers ────────────────────

describe('Persona E — allergy sufferer encounters natural-down pillow', () => {
  const answers = {
    'sleep-position': 'back',
    'firmness':       'medium-soft',
    'fill':           'no-preference',
    'temperature':    'normal',
    'neck-comfort':   'no',
    'hypoallergenic': 'yes',
    'budget':         'mid',
  };

  it('Snuggledown (natural down, not hypoallergenic) ranks in the bottom 2 for an allergy sufferer', () => {
    const ranked = rank(answers);
    const snuggleRank = ranked.findIndex((r) => r.id === 'snuggledown-goose-feather-down');
    // -15 hypo penalty means Snuggledown should rank near last despite a good position/firmness match
    expect(snuggleRank).toBeGreaterThan(ranked.length - 3);
  });

  it('Snuggledown reason mentions allergy/hypoallergenic risk', () => {
    const { reasons } = scorePillow(
      products.find((p) => p.id === 'snuggledown-goose-feather-down')!,
      answers
    );
    expect(reasons.some((r) => /allerg/i.test(r))).toBe(true);
  });
});

