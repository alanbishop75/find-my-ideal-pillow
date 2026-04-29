/**
 * config/pillow/seo-pages.ts
 *
 * STUB — SEO landing page definitions pending content creation.
 * Replace with real page definitions before launch (Phase 7).
 */

export interface PillowSeoPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whyItMatters: string;
  keyFactors: string[];
  faq: { q: string; a: string }[];
}

export const pillowSeoPages: PillowSeoPage[] = [];

export const pillowSeoPageMap: Record<string, PillowSeoPage> = Object.fromEntries(
  pillowSeoPages.map((p) => [p.slug, p])
);
