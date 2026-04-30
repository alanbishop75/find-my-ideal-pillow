/**
 * config/pillow/questionnaire.ts
 *
 * Pillow recommendation questionnaire — pillow-v1
 *
 * Designed with input from three expert perspectives:
 *
 *  • Sleep physiotherapy — sleep position drives loft and support needs more
 *    than any other single factor. Side sleepers need a high-loft pillow
 *    (5–6 cm gap to fill); back sleepers need medium loft (3–4 cm); stomach
 *    sleepers need the lowest loft possible to keep the neck neutral.
 *
 *  • Materials science — memory foam contours and stays put but retains heat.
 *    Latex is naturally breathable and resilient but heavier. Natural down is
 *    luxuriously soft and breathable but not hypoallergenic. Hollow fibre is
 *    affordable, machine-washable, and suitable for allergy sufferers.
 *
 *  • Consumer insight — UK buyers spend on average £20–35 per pillow; premium
 *    spend (£65+) is growing fast, driven by mattress-brand crossovers (Emma,
 *    Simba, Tempur). Adjustable-fill pillows are the fastest-growing segment.
 */
import type { Questionnaire } from "../../core/types";

export const pillowQuestionnaire: Questionnaire = {
  id: "pillow-v1",
  version: "pillow-v1",
  title: "Find Your Ideal Pillow",
  questions: [
    // ── Q1 — Sleep position ──────────────────────────────────────────────────
    // Most important single signal: dictates loft, firmness, and support needs.
    {
      id: "sleep-position",
      text: "How do you mainly sleep?",
      helpText: "Choose the position you spend most of the night in.",
      options: [
        { id: "side",        label: "On my side" },
        { id: "back",        label: "On my back" },
        { id: "stomach",     label: "On my front / stomach" },
        { id: "combination", label: "I switch positions through the night" },
      ],
    },

    // ── Q2 — Firmness preference ─────────────────────────────────────────────
    // Direct comfort signal — aligns with sleep position recommendations
    // but overrides when user has a strong personal preference.
    {
      id: "firmness",
      text: "What firmness do you prefer?",
      helpText: "Think about how your current pillow feels — too soft, too firm, or just right?",
      options: [
        { id: "soft",        label: "Soft — I love sinking in" },
        { id: "medium-soft", label: "Medium-soft — gentle support" },
        { id: "medium",      label: "Medium — balanced feel" },
        { id: "firm",        label: "Firm — I want solid support" },
      ],
    },

    // ── Q3 — Fill preference ─────────────────────────────────────────────────
    // Material drives feel, breathability, washability, and price.
    {
      id: "fill",
      text: "Do you have a preference for what's inside your pillow?",
      helpText: "Each fill has different feel, care, and price trade-offs.",
      options: [
        { id: "natural",        label: "Natural — feather and down" },
        { id: "foam",           label: "Memory foam — contouring support" },
        { id: "latex",          label: "Latex — resilient and cooling" },
        { id: "synthetic",      label: "Synthetic — hypoallergenic and easy to wash" },
        { id: "no-preference",  label: "No preference — just recommend the best" },
      ],
    },

    // ── Q4 — Sleeping temperature ────────────────────────────────────────────
    // Hot sleepers are penalised by dense memory foam and synthetic fills;
    // they benefit from latex, gel-fibre, or bamboo-covered pillows.
    {
      id: "temperature",
      text: "Do you sleep hot or get warm at night?",
      options: [
        { id: "hot",    label: "Yes — I often overheat or throw the covers off" },
        { id: "normal", label: "No — my temperature is generally fine" },
        { id: "cool",   label: "I tend to run cold and like to stay warm" },
      ],
    },

    // ── Q5 — Neck / shoulder comfort ─────────────────────────────────────────
    // Neck pain is the #1 reason people seek a new pillow. Users with ongoing
    // discomfort need pillows with enhanced, consistent support — memory foam
    // or latex, not collapsible hollow fibre or soft down.
    {
      id: "neck-comfort",
      text: "Do you experience neck or shoulder discomfort in the morning?",
      helpText: "This helps us prioritise support level in your recommendation.",
      options: [
        { id: "yes",       label: "Yes — I often wake with neck or shoulder pain" },
        { id: "sometimes", label: "Sometimes, but not every day" },
        { id: "no",        label: "No — no neck or shoulder issues" },
      ],
    },

    // ── Q6 — Allergy needs ───────────────────────────────────────────────────
    // Natural-fill pillows (down, feather) are hard disqualifiers for allergy
    // sufferers. Hypoallergenic fills are latex, hollow fibre, memory foam.
    {
      id: "hypoallergenic",
      text: "Do you need a hypoallergenic pillow?",
      helpText: "Select yes if you have dust mite allergies, asthma, or feather sensitivities.",
      options: [
        { id: "yes", label: "Yes — I have allergies or sensitivities" },
        { id: "no",  label: "No — no allergy concerns" },
      ],
    },

    // ── Q7 — Budget ──────────────────────────────────────────────────────────
    {
      id: "budget",
      text: "What's your budget per pillow?",
      helpText: "We'll show recommendations that fit your budget tier.",
      options: [
        { id: "budget",  label: "Under £30 — good value options" },
        { id: "mid",     label: "£30-£70 — quality mid-range" },
        { id: "premium", label: "£70+ — best-in-class" },
        { id: "any",     label: "No budget limit — show me the best fit" },
      ],
    },
  ],
};

