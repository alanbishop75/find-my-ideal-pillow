import type { MetadataRoute } from 'next';
import { pillowSeoPages } from '../config/pillow/seo-pages';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findyouridealpillow.com').replace(/\/$/, '');
const SITE_CHROME_LAST_MODIFIED = new Date('2026-06-18');

function latestDate(dateA: Date, dateB: Date): Date {
  return dateA > dateB ? dateA : dateB;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pillow/best-pillow`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      lastModified: SITE_CHROME_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const seoLandingPages: MetadataRoute.Sitemap = pillowSeoPages.map((page) => ({
    url: `${SITE_URL}/pillow/${page.slug}`,
    lastModified: latestDate(new Date(page.lastReviewed), SITE_CHROME_LAST_MODIFIED),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoLandingPages];
}
