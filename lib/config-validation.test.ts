import { products } from '../config/pillow/products';
import { pillowBuyLinks } from '../config/pillow/buy-links';
import { pillowQuestionnaire } from '../config/pillow/questionnaire';
import { pillowSeoPages } from '../config/pillow/seo-pages';
import { themeNames } from '../core/theme/tokens';
import globalThemeConfig from '../config/global-theme.json';

function asArray<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

describe('config validation', () => {
  it('product IDs are unique and required fields are present', () => {
    const ids = new Set<string>();

    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.brand).toBeTruthy();
      expect(p.imageUrl).toBeTruthy();
      expect(p.attributes).toBeDefined();
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);
    }
  });

  it('buy-links map has an entry for each product with valid URL structure', () => {
    for (const p of products) {
      const links = pillowBuyLinks[p.id];
      expect(links).toBeDefined();

      for (const link of [...asArray(links?.UK), ...asArray(links?.US)]) {
        expect(link.url).toMatch(/^https:\/\//);
        expect(link.retailerName).toBeTruthy();
        expect(link.expectedDomain).toBeTruthy();
      }
    }
  });

  it('questionnaire is internally valid (unique IDs and valid branches)', () => {
    const questionnaire = pillowQuestionnaire;
    expect(questionnaire.id).toBeTruthy();
    expect(questionnaire.questions.length).toBeGreaterThan(0);

    const questionIds = new Set<string>();
    for (const q of questionnaire.questions) {
      expect(q.id).toBeTruthy();
      expect(questionIds.has(q.id)).toBe(false);
      questionIds.add(q.id);

      const optionIds = new Set<string>();
      for (const opt of q.options) {
        expect(opt.id).toBeTruthy();
        expect(optionIds.has(opt.id)).toBe(false);
        optionIds.add(opt.id);
      }

      if (q.branch) {
        expect(questionIds.has(q.branch.dependsOn)).toBe(true);
        const parent = questionnaire.questions.find((x) => x.id === q.branch?.dependsOn);
        const parentOptionIds = new Set((parent?.options ?? []).map((o) => o.id));
        for (const value of q.branch.values) {
          expect(parentOptionIds.has(value)).toBe(true);
        }
      }
    }
  });

  it('theme config values are known theme names', () => {
    const valid = new Set(themeNames);
    const themes = (globalThemeConfig as { themes?: Record<string, string>; theme?: string }).themes ?? {};

    for (const value of Object.values(themes)) {
      expect(valid.has(value as (typeof themeNames)[number])).toBe(true);
    }
  });

  it('SEO page slugs are unique and metadata is populated', () => {
    const slugs = new Set<string>();

    for (const page of pillowSeoPages) {
      expect(page.slug).toBeTruthy();
      expect(page.metaTitle).toBeTruthy();
      expect(page.metaDescription).toBeTruthy();
      expect(page.h1).toBeTruthy();
      expect(page.intro).toBeTruthy();
      expect(slugs.has(page.slug)).toBe(false);
      slugs.add(page.slug);
    }
  });

  it('products include valid and fresh RRP metadata', () => {
    const maxAgeDays = 180;
    const now = new Date();

    for (const p of products) {
      const rrp = Number(p.attributes.rrp);
      expect(Number.isFinite(rrp)).toBe(true);
      expect(rrp).toBeGreaterThan(0);

      const lastCheckedRaw = String(p.attributes.rrpLastChecked ?? '');
      expect(lastCheckedRaw).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      const lastChecked = new Date(`${lastCheckedRaw}T00:00:00.000Z`);
      expect(Number.isNaN(lastChecked.getTime())).toBe(false);

      const ageMs = now.getTime() - lastChecked.getTime();
      const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
      expect(ageDays).toBeLessThanOrEqual(maxAgeDays);
    }
  });
});
