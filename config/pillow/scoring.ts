/**
 * config/pillow/scoring.ts
 *
 * Pillow recommendation scoring engine — pillow-v1
 *
 * Scoring philosophy (validated against domain expertise):
 *
 *  Sleep position is the primary signal — it dictates loft and support needs
 *  above all other factors. A stomach sleeper handed a firm, high-loft pillow
 *  will have neck pain regardless of fill or budget.
 *
 *  Neck/shoulder pain is a hard qualifier — users with existing discomfort
 *  must be steered toward enhanced-support pillows and away from soft/
 *  collapsible fills that fail to maintain neutral cervical alignment.
 *
 *  Allergies are a hard disqualifier — natural-fill pillows (down, feather)
 *  receive a large negative penalty when the user needs hypoallergenic.
 *
 *  Budget is gating, not boosting — a product that is out of range receives
 *  a penalty; a product within range receives no extra score boost.
 *
 * Maximum possible raw score (all signals aligned): ~70 points.
 * A score ≥ 45 is a very strong match. A score ≤ 10 is a poor fit.
 */
import type { ScoringEngine } from "../../lib/scoring";

// ── Helpers ──────────────────────────────────────────────────────────────────

const FIRMNESS_RANK: Record<string, number> = {
  "soft":        0,
  "medium-soft": 1,
  "medium":      2,
  "firm":        3,
};

// ── Main scoring function ─────────────────────────────────────────────────────

export const scorePillow: ScoringEngine = (product, answers) => {
  const attr = product.attributes;
  const reasons: string[] = [];
  let score = 0;

  // ── 1. Sleep position (max +15) ───────────────────────────────────────────
  //
  // Compatibility matrix:
  //   side     → side=15, combination=10, back=4, any=10, stomach=-6
  //   back     → back=15, combination=10, side=6, any=10, stomach=-4
  //   stomach  → stomach=15, combination=6, any=8, back=-4, side=-10
  //   combination → combination=15, any=12, side=8, back=8, stomach=2
  //
  const userPos   = answers["sleep-position"] ?? "";
  const prodPos   = String(attr.sleepPosition ?? "any");

  const posScore = ((): number => {
    if (prodPos === "any") {
      if (userPos === "stomach") return 6; // 'any' pillows are rarely optimal for stomach
      return 10;
    }
    if (prodPos === userPos) return 15;
    const compat: Record<string, Record<string, number>> = {
      side:        { combination: 10, back: 4, stomach: -6 },
      back:        { combination: 10, side: 6, stomach: -4 },
      stomach:     { combination: 6,  back: -4, side: -10 },
      combination: { side: 8, back: 8, stomach: 2 },
    };
    return compat[prodPos]?.[userPos] ?? 0;
  })();

  score += posScore;

  if (posScore >= 15) {
    const labels: Record<string, string> = {
      side:        "Designed for side sleepers",
      back:        "Designed for back sleepers",
      stomach:     "Designed for front sleepers",
      combination: "Works for combination sleepers",
    };
    if (labels[prodPos]) reasons.push(labels[prodPos]);
  } else if (posScore >= 8) {
    reasons.push("Compatible with your sleep position");
  } else if (posScore < 0) {
    reasons.push("Not ideal for your sleep position");
  }

  // ── 2. Firmness match (max +12) ───────────────────────────────────────────
  //
  // Exact match: +12. One step off: +6. Two steps off: 0. Three steps: -6.
  //
  const userFirmness = answers["firmness"] ?? "";
  const prodFirmness = String(attr.firmness ?? "medium");
  const userRank = FIRMNESS_RANK[userFirmness] ?? 2;
  const prodRank = FIRMNESS_RANK[prodFirmness] ?? 2;
  const delta = Math.abs(userRank - prodRank);
  const firmnessScore = delta === 0 ? 12 : delta === 1 ? 6 : delta === 2 ? 0 : -6;
  score += firmnessScore;

  if (firmnessScore >= 12) {
    reasons.push(`${prodFirmness.charAt(0).toUpperCase() + prodFirmness.slice(1)} firmness — matches your preference`);
  } else if (firmnessScore <= -6) {
    reasons.push("Firmness differs from your preference");
  }

  // ── 3. Fill preference (max +8) ───────────────────────────────────────────
  //
  // Maps questionnaire answer IDs to product fill attribute values.
  //
  const userFill  = answers["fill"] ?? "no-preference";
  const prodFill  = String(attr.fill ?? "");
  const fillMap: Record<string, string[]> = {
    "natural":   ["natural-down"],
    "foam":      ["memory-foam"],
    "latex":     ["latex"],
    "synthetic": ["hollow-fibre", "gel-fibre"],
  };
  const fillScore = ((): number => {
    if (userFill === "no-preference") return 0;
    const preferred = fillMap[userFill] ?? [];
    if (preferred.includes(prodFill)) return 8;
    if (userFill !== "no-preference" && prodFill === "hybrid") return 3; // hybrid partially satisfies any specific preference
    return 0;
  })();
  score += fillScore;

  if (fillScore >= 8) {
    const fillLabels: Record<string, string> = {
      "natural":   "Natural feather and down fill",
      "foam":      "Memory foam fill",
      "latex":     "Natural latex fill",
      "synthetic": "Synthetic hypo-friendly fill",
    };
    if (fillLabels[userFill]) reasons.push(fillLabels[userFill]);
  }

  // ── 4. Temperature / cooling (max +10, min -5) ───────────────────────────
  //
  // Hot sleepers need cooling properties; dense synthetic/memory foam hurts them.
  //
  const userTemp    = answers["temperature"] ?? "normal";
  const hasCooling  = Boolean(attr.cooling);
  const prodFillStr = String(attr.fill ?? "");

  if (userTemp === "hot") {
    if (hasCooling) {
      score += 10;
      reasons.push("Cooling properties — great for hot sleepers");
    } else if (prodFillStr === "memory-foam" && !hasCooling) {
      score -= 5;
      reasons.push("Dense foam may retain heat");
    } else if (prodFillStr === "natural-down") {
      score += 2; // down is naturally breathable
    }
  } else if (userTemp === "cool") {
    if (prodFillStr === "natural-down") {
      score += 4;
      reasons.push("Natural down — warm and insulating");
    }
  }

  // ── 5. Neck / shoulder support (max +12, min -8) ─────────────────────────
  //
  // Persistent neck pain requires enhanced support. Soft, collapsible fills
  // provide insufficient spinal alignment and are penalised for pain sufferers.
  //
  const neckAnswer = answers["neck-comfort"] ?? "no";
  const hasEnhancedSupport = String(attr.support) === "enhanced";

  if (neckAnswer === "yes") {
    if (hasEnhancedSupport) {
      score += 12;
      reasons.push("Enhanced neck and shoulder support");
    } else {
      score -= 8;
      reasons.push("May not provide enough neck support");
    }
  } else if (neckAnswer === "sometimes") {
    if (hasEnhancedSupport) {
      score += 6;
      reasons.push("Good neck support");
    }
  }

  // ── 6. Hypoallergenic (max +10, min -15) ─────────────────────────────────
  //
  // Natural down/feather is the primary allergen in pillows (dust mites live
  // in natural-fill products). Hard disqualifier when user has allergies.
  //
  const needsHypo    = answers["hypoallergenic"] === "yes";
  const isHypo       = Boolean(attr.hypoallergenic);

  if (needsHypo) {
    if (isHypo) {
      score += 10;
      reasons.push("Hypoallergenic — suitable for allergy sufferers");
    } else {
      score -= 15;
      reasons.push("Not hypoallergenic — may trigger allergies");
    }
  }

  // ── 7. Budget (max +5, min -15) ──────────────────────────────────────────
  //
  // Out-of-budget is a soft penalty, not a hard block — the best-value card
  // can still surface a mid-tier product to a budget user.
  //
  const userBudget = answers["budget"] ?? "mid";

  if (userBudget !== "any") {
    const budgetRank: Record<string, number> = { budget: 0, mid: 1, premium: 2 };
    const prodTier   = String(attr.priceTier ?? "mid");
    const userBudgetRank = budgetRank[userBudget] ?? 1;
    const prodBudgetRank = budgetRank[prodTier] ?? 1;
    const budgetDelta = prodBudgetRank - userBudgetRank; // positive = over budget

    if (budgetDelta === 0) {
      score += 5;
    } else if (budgetDelta === -1) {
      score += 2; // good value find — slightly under budget
      reasons.push("Good value for money");
    } else if (budgetDelta === 1) {
      score -= 5;
    } else if (budgetDelta >= 2) {
      score -= 15;
      reasons.push("Above your budget");
    }
  }

  // ── 8. Adjustable bonus (+4) ─────────────────────────────────────────────
  //
  // Combination sleepers and indecisive buyers benefit from adjustable fill.
  //
  if (Boolean(attr.adjustable)) {
    if (answers["sleep-position"] === "combination" || answers["fill"] === "no-preference") {
      score += 4;
      reasons.push("Adjustable fill — dial in your perfect loft");
    }
  }

  return { score: Math.max(0, score), reasons };
};

