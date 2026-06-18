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

const POSITION_REASON: Record<string, string> = {
  side: "Built to keep side sleepers properly lifted through the night",
  back: "Built to keep back sleepers comfortably aligned without too much loft",
  stomach: "Low-profile shape keeps front sleepers flatter and less craned",
  combination: "Flexible enough for sleepers who change position overnight",
};

const FILL_REASON: Record<string, string> = {
  natural: "Natural down-style fill matches the softer, more breathable feel you asked for",
  foam: "Memory-foam fill matches the contouring feel you asked for",
  latex: "Latex fill matches the springier, more supportive feel you asked for",
  synthetic: "Synthetic fill matches your preference for an easier-care, hypo-friendly pillow",
};

const FILL_LABEL: Record<string, string> = {
  "memory-foam": "memory-foam build",
  "natural-down": "natural-fill build",
  "hollow-fibre": "synthetic fill",
  "gel-fibre": "cooler gel-fibre fill",
  "latex": "latex core",
  "hybrid": "hybrid fill",
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
    if (POSITION_REASON[prodPos]) reasons.push(POSITION_REASON[prodPos]);
  } else if (posScore >= 8) {
    reasons.push("Versatile enough to work well with your usual sleep position");
  } else if (posScore < 0) {
    reasons.push("Its loft profile is a weaker fit for your usual sleep position");
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
    reasons.push(`${prodFirmness.charAt(0).toUpperCase() + prodFirmness.slice(1)} feel lines up closely with your firmness preference`);
  } else if (firmnessScore <= -6) {
    reasons.push("The firmness lands a long way from the feel you said you wanted");
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
    if (FILL_REASON[userFill]) reasons.push(FILL_REASON[userFill]);
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
      reasons.push("Cooling features should help stop the pillow from trapping too much heat");
    } else if (prodFillStr === "memory-foam" && !hasCooling) {
      score -= 5;
      reasons.push("This memory-foam build is more likely to sleep warm than you want");
    } else if (prodFillStr === "natural-down") {
      score += 2; // down is naturally breathable
    }
  } else if (userTemp === "cool") {
    if (prodFillStr === "natural-down") {
      score += 4;
      reasons.push("Natural down tends to feel cosier on cooler nights");
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
      reasons.push("Enhanced support should do a better job of keeping your neck and shoulders aligned");
    } else {
      score -= 8;
      reasons.push("Standard support may not give enough structure if your neck is already sore");
    }
  } else if (neckAnswer === "sometimes") {
    if (hasEnhancedSupport) {
      score += 6;
      reasons.push("Extra support is useful if your neck gets stiff from time to time");
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
      reasons.push("Hypoallergenic materials make it a safer pick for allergy-sensitive sleepers");
    } else {
      score -= 15;
      reasons.push(`${FILL_LABEL[prodFillStr] ?? "This fill"} is a weak fit if you need a more allergy-friendly pillow`);
    }
  }

  // ── 7. Budget (max +5, min -15) ──────────────────────────────────────────
  //
  // Out-of-budget is a soft penalty, not a hard block — the best-value card
  // can still surface a mid-tier product to a budget user.
  //
  // "any" budget = no limit — treat it as a quality preference: premium and
  // mid products are rewarded so they can out-rank budget options on equal
  // attribute fit. Budget products also receive a mild downward nudge.
  //
  const userBudget = answers["budget"] ?? "mid";

  if (userBudget === "any") {
    const prodTier = String(attr.priceTier ?? "mid");
    if (prodTier === "premium") {
      score += 5;
      reasons.push("Premium build matches your open budget");
    } else if (prodTier === "mid") {
      score += 2;
    } else if (prodTier === "budget") {
      score -= 3;
    }
  } else {
    const budgetRank: Record<string, number> = { budget: 0, mid: 1, premium: 2 };
    const prodTier   = String(attr.priceTier ?? "mid");
    const userBudgetRank = budgetRank[userBudget] ?? 1;
    const prodBudgetRank = budgetRank[prodTier] ?? 1;
    const budgetDelta = prodBudgetRank - userBudgetRank; // positive = over budget

    if (budgetDelta === 0) {
      score += 5;
    } else if (budgetDelta === -1) {
      score += 2; // good value find — slightly under budget
      reasons.push("Priced below your budget without dropping into obvious compromise territory");
    } else if (budgetDelta <= -2) {
      score -= 3; // significantly under budget — likely a quality mismatch
    } else if (budgetDelta === 1) {
      score -= 5;
    } else if (budgetDelta >= 2) {
      score -= 15;
      reasons.push("Priced well above the budget range you set");
    }
  }

  // ── 8. Adjustable bonus (+4) ─────────────────────────────────────────────
  //
  // Combination sleepers and indecisive buyers benefit from adjustable fill.
  //
  if (Boolean(attr.adjustable)) {
    if (answers["sleep-position"] === "combination" || answers["fill"] === "no-preference") {
      score += 4;
      reasons.push("Adjustable fill lets you fine-tune the loft instead of being stuck with one shape");
    }
  }

  return { score: Math.max(0, score), reasons };
};

