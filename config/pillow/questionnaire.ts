/**
 * config/pillow/questionnaire.ts
 *
 * STUB — questionnaire questions are pending domain-expert input.
 * Replace this file with real questions before launch (Phase 7).
 */
import type { Questionnaire } from "../../core/types";

export const pillowQuestionnaire: Questionnaire = {
  id: "pillow-v1",
  version: "pillow-v1",
  title: "Find Your Ideal Pillow",
  questions: [
    {
      id: "sleep-position",
      text: "What is your primary sleep position?",
      options: [
        { id: "side", label: "Side sleeper" },
        { id: "back", label: "Back sleeper" },
        { id: "front", label: "Front sleeper" },
        { id: "varies", label: "It varies" },
      ],
    },
  ],
};
