/**
 * config/pillow/scoring.ts
 *
 * STUB — scoring model pending offline spreadsheet validation.
 * Replace with validated scoring logic before launch (Phase 6).
 */
import type { ScoringEngine } from "../../lib/scoring";

export const scorePillow: ScoringEngine = (_product, _answers) => ({
  score: 0,
  reasons: [],
});
