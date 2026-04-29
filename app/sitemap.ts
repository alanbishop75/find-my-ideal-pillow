import type { MetadataRoute } from 'next';
import { pillowSeoPages } from '../config/pillow/seo-pages';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findmyidealpillow.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pillow/questionnaire`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2026-04-26'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const seoLandingPages: MetadataRoute.Sitemap = pillowSeoPages.map((page) => ({
    url: `${SITE_URL}/pillow/${page.slug}`,
    lastModified: new Date('2026-04-26'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoLandingPages];
}
