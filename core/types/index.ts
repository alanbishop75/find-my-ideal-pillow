
import type { BuyLinks } from '../geo/types';

export type Product = {
  id: string;
  name: string;
  brand: string;
  /** Human-readable description used on results cards. */
  description?: string;
  attributes: Record<string, string | number | boolean>;
  imageUrl: string;
  /**
   * @deprecated Use `buyLinks.UK[amazonKey]` instead.
   * Retained for backward-compat while the migration to buyLinks is in progress.
   */
  amazonAffiliateUrl?: string;
  /** @deprecated Use `buyLinks` instead. Retained for backward-compat. */
  affiliateLinks: { label: string; url: string }[];
  /** Region-aware buy links — the authoritative source for retailer CTAs. */
  buyLinks?: BuyLinks;
};

export type AnswerOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  options: AnswerOption[];
  type?: string;
  condition?: (answers: Record<string, string>) => boolean;
  helpText?: string;
  branch?: {
    dependsOn: string;
    values: string[];
  };
};

export type Questionnaire = {
  id: string;
  version: string;
  title: string;
  questions: Question[];
};

export type RecommendationResult = {
  productId: string;
  label: 'Best Match' | 'Strong Alternative' | 'Best Value';
  reasons: string[];
};

export type ThemeConfig = {
  id: string;
  name: string;
  colors: Record<string, string>;
};
