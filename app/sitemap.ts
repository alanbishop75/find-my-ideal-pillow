import type { MetadataRoute } from 'next';
import { pillowComparisonPages } from '../config/pillow/comparison-pages';
import { pillowSeoPages } from '../config/pillow/seo-pages';
import { getRequiredSiteUrl } from '../lib/site-url';

const SITE_URL = getRequiredSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pillow/best-pillow`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const seoLandingPages: MetadataRoute.Sitemap = pillowSeoPages.map((page) => ({
    url: `${SITE_URL}/pillow/${page.slug}`,
    lastModified: new Date(page.lastReviewed),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = pillowComparisonPages.map((page) => ({
    url: `${SITE_URL}/pillow/compare/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...seoLandingPages, ...comparisonPages];
}
