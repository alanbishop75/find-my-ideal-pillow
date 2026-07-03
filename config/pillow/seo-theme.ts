/**
 * config/pillow/seo-theme.ts
 *
 * SINGLE SOURCE OF TRUTH for the pillow SEO/hub/compare visual palette.
 *
 * Per the SEO Page Blueprint (Option B — shared structure, per-site palette):
 * every SEO/hub/compare component (detail renderer, hub page, hub quick-buy
 * client, compare route, and any future SEO surface) MUST import these values
 * instead of declaring local colour constants or reading `useTheme()` tokens.
 *
 * To re-skin the entire pillow SEO surface (hero, hub, cards, CTAs, compare)
 * change ONLY the hex values below. Do NOT change structure, spacing, or
 * layout — those are locked by the blueprint and shared with the golf golden
 * source.
 *
 * These values are the pillow brand LAVENDER palette. The whole pillow site —
 * homepage, hub, SEO detail, and compare — uses these exact colours so every
 * surface renders in one consistent lavender. The `navy`/`lime` key NAMES are
 * kept for structural parity with the golf/mattress blueprint; only the values
 * differ.
 */
export const seoPalette = {
  /** Primary brand/ink colour (brand INK) — headings, dark hero gradient base. */
  navy: "#1a1a3e",
  /** Accent colour (brand LAVENDER) — pill CTAs, card left-border, buy buttons. */
  lime: "#9b87bc",
  /** Text colour placed on top of the accent (ink for contrast on lavender). */
  limeDark: "#1a1a3e",
  /** Softer accent used for hub card left-borders and hero CTA panels. */
  softLime: "#c4b3dd",
  /** Pure white surfaces. */
  white: "#ffffff",
  /** Page background + neutral image backdrop (brand SURFACE). */
  surface: "#f5f3f8",
  /** Hairline border colour (brand BORDER). */
  border: "#e6e1ec",
  /** Primary body text on light surfaces (brand INK). */
  text: "#1a1a3e",
  /** Secondary/muted body text (brand muted). */
  text2: "#5a5478",
} as const;

export type SeoPalette = typeof seoPalette;
