import type { MetadataRoute } from 'next';
import { pillowSeoPages } from '../config/pillow/seo-pages';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findyouridealpillow.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pillow/questionnaire`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/pillow/best-pillow`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const seoLandingPages: MetadataRoute.Sitemap = pillowSeoPages.map((page) => ({
    url: `${SITE_URL}/pillow/${page.slug}`,
    lastModified: new Date(page.lastReviewed),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoLandingPages];
}
