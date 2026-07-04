import { Questionnaire, Product } from '../core/types';
import { ThemeName } from '../core/theme/tokens';
import { ScoringEngine } from '../lib/scoring';
import { pillowQuestionnaire } from './pillow/questionnaire';
import { products as pillowProducts } from './pillow/products';
import { scorePillow } from './pillow/scoring';
export { defaultCategoryId } from './domain-map';

export interface CategoryMeta {
  title: string;
  description: string;
  /** Brand name shown in the site header, e.g. "FindMyIdealPillow" */
  brandName: string;
  hero: string;
  subhero: string;
  ctaText: string;
  resultsHeading: string;
}

export interface CategoryConfig {
  id: string;
  meta: CategoryMeta;
  theme: ThemeName;
  questionnaire: Questionnaire;
  products: Product[];
  scoringEngine: ScoringEngine;
}

export const categoryRegistry: Record<string, CategoryConfig> = {
  'pillow': {
    id: 'pillow',
    meta: {
      title: 'Free Pillow Quiz | Find Your Ideal Pillow',
      description: 'Answer a few quick questions and get a free, personalised pillow recommendation tailored to how you sleep.',
      brandName: 'FindYourIdealPillow',
      hero: 'Answer a few questions.\nGet your ideal pillow.',
      subhero: 'Free, instant recommendations tailored to how you sleep.',
      ctaText: 'Start fitting →',
      resultsHeading: 'Your best-fit pillows',
    },
    theme: 'blue',
    questionnaire: pillowQuestionnaire,
    products: pillowProducts,
    scoringEngine: scorePillow,
  },
};

export type CategoryId = keyof typeof categoryRegistry;
