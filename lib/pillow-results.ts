import type { Product } from '../core/types';

export type PillowCardType = 'Best Match' | 'Strong Alternative' | 'Best Value';

export type ScoredPillow = Product & {
  _score: number;
  _reasons?: string[];
};

const FIRMNESS_RANK: Record<string, number> = {
  soft: 0,
  'medium-soft': 1,
  medium: 2,
  firm: 3,
};

const FILL_FAMILY: Record<string, string> = {
  'memory-foam': 'foam',
  'natural-down': 'natural',
  'hollow-fibre': 'synthetic',
  'gel-fibre': 'synthetic',
  latex: 'latex',
  hybrid: 'hybrid',
};

function getFirmnessRank(product: ScoredPillow): number {
  const firmness = String(product.attributes.firmness ?? 'medium');
  return FIRMNESS_RANK[firmness] ?? 2;
}

function getFillFamily(product: ScoredPillow): string {
  const fill = String(product.attributes.fill ?? '');
  return FILL_FAMILY[fill] ?? fill;
}

function arePositionsCompatible(candidate: ScoredPillow, best: ScoredPillow): boolean {
  const candidatePosition = String(candidate.attributes.sleepPosition ?? '');
  const bestPosition = String(best.attributes.sleepPosition ?? '');
  if (candidatePosition === bestPosition) return true;
  if (candidatePosition === 'combination' || bestPosition === 'combination') return true;
  if (candidatePosition === 'any' || bestPosition === 'any') return true;
  return (
    (candidatePosition === 'side' && bestPosition === 'back') ||
    (candidatePosition === 'back' && bestPosition === 'side')
  );
}

function isNearDuplicate(candidate: ScoredPillow, best: ScoredPillow): boolean {
  return (
    candidate.brand === best.brand &&
    String(candidate.attributes.sleepPosition ?? '') === String(best.attributes.sleepPosition ?? '') &&
    String(candidate.attributes.firmness ?? '') === String(best.attributes.firmness ?? '') &&
    String(candidate.attributes.fill ?? '') === String(best.attributes.fill ?? '') &&
    String(candidate.attributes.support ?? '') === String(best.attributes.support ?? '') &&
    Boolean(candidate.attributes.adjustable) === Boolean(best.attributes.adjustable) &&
    Boolean(candidate.attributes.cooling) === Boolean(best.attributes.cooling)
  );
}

function adjacentAffinity(candidate: ScoredPillow, best: ScoredPillow): number {
  const scoreGap = Math.abs(candidate._score - best._score);
  let affinity = Math.max(0, 6 - scoreGap);

  if (candidate.brand !== best.brand) affinity += 3;
  if (candidate.attributes.sleepPosition === best.attributes.sleepPosition) affinity += 2;
  else if (arePositionsCompatible(candidate, best)) affinity += 1;
  if (getFirmnessRank(candidate) === getFirmnessRank(best)) affinity += 1.5;
  if (getFillFamily(candidate) === getFillFamily(best)) affinity += 1.5;
  if (String(candidate.attributes.support ?? '') === String(best.attributes.support ?? '')) affinity += 1;
  if (Boolean(candidate.attributes.adjustable) !== Boolean(best.attributes.adjustable)) affinity += 0.5;
  if (Boolean(candidate.attributes.cooling) !== Boolean(best.attributes.cooling)) affinity += 0.5;
  if (isNearDuplicate(candidate, best)) affinity -= 8;

  return affinity;
}

export function isAdjacentFit(candidate: ScoredPillow, best: ScoredPillow): boolean {
  if (!candidate || !best || candidate.id === best.id) return false;

  const scoreGap = Math.abs(candidate._score - best._score);
  if (scoreGap > 5) return false;
  if (!arePositionsCompatible(candidate, best)) return false;
  if (isNearDuplicate(candidate, best)) return false;

  const firmnessGap = Math.abs(getFirmnessRank(candidate) - getFirmnessRank(best));
  const fillFamilyMatch = getFillFamily(candidate) === getFillFamily(best);
  const sharedSupport = String(candidate.attributes.support ?? '') === String(best.attributes.support ?? '');
  return firmnessGap <= 1 || fillFamilyMatch || sharedSupport || candidate.brand !== best.brand;
}

export function pickStrongAlternative(scored: ScoredPillow[], best: ScoredPillow): ScoredPillow {
  const candidates = scored.filter((product) => product.id !== best.id);
  if (candidates.length === 0) return best;

  const adjacentCandidates = candidates.filter((product) => isAdjacentFit(product, best));
  const pool = adjacentCandidates.length > 0 ? adjacentCandidates : candidates;

  return [...pool].sort((a, b) => {
    const affinityDelta = adjacentAffinity(b, best) - adjacentAffinity(a, best);
    if (affinityDelta !== 0) return affinityDelta;
    const scoreDelta = b._score - a._score;
    if (scoreDelta !== 0) return scoreDelta;
    return a.name.localeCompare(b.name);
  })[0] ?? best;
}

function getTier(product: ScoredPillow): 'budget' | 'mid' | 'premium' | '' {
  const tier = String(product.attributes.priceTier ?? '');
  if (tier === 'budget' || tier === 'mid' || tier === 'premium') return tier;
  return '';
}

function getTierRank(product: ScoredPillow): number {
  const tier = getTier(product);
  if (tier === 'budget') return 0;
  if (tier === 'mid') return 1;
  if (tier === 'premium') return 2;
  return 3;
}

function getRrp(product: ScoredPillow): number | null {
  const raw = Number(product.attributes.rrp);
  return Number.isFinite(raw) && raw > 0 ? raw : null;
}

function sortByValueCredibility(candidates: ScoredPillow[]): ScoredPillow[] {
  return [...candidates].sort((a, b) => {
    const rrpA = getRrp(a);
    const rrpB = getRrp(b);
    if (rrpA !== null && rrpB !== null && rrpA !== rrpB) return rrpA - rrpB;
    if (rrpA !== null && rrpB === null) return -1;
    if (rrpA === null && rrpB !== null) return 1;
    const tierDelta = getTierRank(a) - getTierRank(b);
    if (tierDelta !== 0) return tierDelta;
    return b._score - a._score;
  });
}

export function pickBestValue(
  scored: ScoredPillow[],
  best: ScoredPillow,
  alt: ScoredPillow,
  budgetAnswer: string
): ScoredPillow {
  const usedIds = new Set([best.id, alt.id]);
  const uniqueCandidates = scored.filter((product) => !usedIds.has(product.id));
  const uniqueFallback = uniqueCandidates[0] || scored[scored.length - 1];

  const valueFitTolerance = 4;
  const minValueFitScore = Math.max(1, best._score - valueFitTolerance);

  const nonPremiumCandidates = uniqueCandidates.filter((product) => getTier(product) !== 'premium');
  const valueEligibleNonPremium = nonPremiumCandidates.filter((product) => product._score >= minValueFitScore);
  const valueEligibleAll = uniqueCandidates.filter((product) => product._score >= minValueFitScore);

  const valuePool =
    valueEligibleNonPremium.length > 0 ? valueEligibleNonPremium :
    nonPremiumCandidates.length > 0 ? nonPremiumCandidates :
    valueEligibleAll.length > 0 ? valueEligibleAll :
    uniqueCandidates;

  const budgetTierCandidates = uniqueCandidates.filter((product) => getTier(product) === 'budget');
  const budgetTierEligible = budgetTierCandidates.filter((product) => product._score >= minValueFitScore);
  const budgetConstrainedPool =
    budgetTierEligible.length > 0 ? budgetTierEligible :
    budgetTierCandidates.length > 0 ? budgetTierCandidates :
    valuePool;

  const budgetPool = budgetAnswer === 'budget' ? budgetConstrainedPool : valuePool;
  const budgetSorted = sortByValueCredibility(budgetPool);
  const cheapestBudget = budgetSorted[0] || uniqueFallback;

  const budgetTieCandidates = budgetSorted.filter((product) => {
    const rrp = getRrp(product);
    const cheapestRrp = getRrp(cheapestBudget);
    if (rrp !== null && cheapestRrp !== null && rrp === cheapestRrp) return true;
    return product._score === cheapestBudget._score;
  });

  return (
    budgetTieCandidates.find((product) => product.brand !== best.brand && product.brand !== alt.brand) ||
    budgetTieCandidates.find((product) => product.brand !== best.brand) ||
    cheapestBudget
  );
}

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function buildReasonSummary(
  product: ScoredPillow,
  cardType: PillowCardType,
  reasons: string[],
  bestReasons?: string[]
): string {
  const leadIn =
    cardType === 'Best Match'
      ? 'Closest overall fit'
      : cardType === 'Strong Alternative'
      ? 'Strong alternative profile'
      : 'Best value option';

  if (reasons.length === 0) {
    return `${leadIn}: ${product.description ?? 'A strong match based on your answers.'}`;
  }

  const unique = Array.from(new Set(reasons));
  if (bestReasons && bestReasons.length > 0) {
    const bestSet = new Set(bestReasons);
    const exclusive = unique.filter((reason) => !bestSet.has(reason));
    const shared = unique.filter((reason) => bestSet.has(reason));
    if (exclusive.length >= 2) {
      const second = exclusive[1].charAt(0).toLowerCase() + exclusive[1].slice(1);
      return `${leadIn}: ${exclusive[0]} — ${second}.`;
    }
    if (exclusive.length === 1) {
      if (shared.length > 0) {
        const second = shared[0].charAt(0).toLowerCase() + shared[0].slice(1);
        return `${leadIn}: ${exclusive[0]} — ${second}.`;
      }
      return `${leadIn}: ${exclusive[0]}.`;
    }
    return `${leadIn}: ${product.description ?? 'A strong match based on your answers.'}`;
  }

  if (unique.length >= 2) {
    const second = unique[1].charAt(0).toLowerCase() + unique[1].slice(1);
    return `${leadIn}: ${unique[0]} — ${second}.`;
  }
  return `${leadIn}: ${unique[0]}.`;
}

const SUMMARY_VARIANTS: Record<PillowCardType, Array<(detail: string) => string>> = {
  'Best Match': [
    (detail) => `Closest overall fit: ${detail}`,
    (detail) => `Top match for your answers: ${detail}`,
    (detail) => `The strongest all-round pick here: ${detail}`,
  ],
  'Strong Alternative': [
    (detail) => `A strong alternative with a slightly different feel: ${detail}`,
    (detail) => `A credible backup pick: ${detail}`,
    (detail) => `Another well-matched option: ${detail}`,
  ],
  'Best Value': [
    (detail) => `Best value if you want ${detail.toLowerCase()}`,
    (detail) => `A smarter spend: ${detail}`,
    (detail) => `Good value for the comfort and support it offers: ${detail}`,
  ],
};

export function buildPillowSummary(
  product: ScoredPillow,
  cardType: PillowCardType,
  options: {
    reasons?: string[];
    bestReasons?: string[];
    priorCopy?: Set<string>;
  } = {}
): string {
  const reasons = options.reasons ?? product._reasons ?? [];
  const detail = buildReasonSummary(product, cardType, reasons, options.bestReasons);
  const variants = SUMMARY_VARIANTS[cardType];
  const seed = hashString([product.id, cardType, detail].join('|'));
  const startIndex = seed % variants.length;
  const priorCopy = options.priorCopy ?? new Set<string>();

  for (let offset = 0; offset < variants.length; offset += 1) {
    const rendered = variants[(startIndex + offset) % variants.length](detail);
    if (!priorCopy.has(rendered)) {
      return rendered;
    }
  }

  return detail;
}

export function getPillowBullets(product: ScoredPillow, usedReasons?: string[]): string[] {
  if (!product._reasons) return [];
  const all = Array.from(new Set((product._reasons as string[]).map(String)));
  if (!usedReasons || usedReasons.length === 0) return all.slice(0, 3);
  const usedSet = new Set(usedReasons);
  const exclusive = all.filter((reason) => !usedSet.has(reason));
  const shared = all.filter((reason) => usedSet.has(reason));
  return [...exclusive, ...shared].slice(0, 3);
}
