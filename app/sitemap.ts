import type { MetadataRoute } from 'next';
import { pillowSeoPages } from '../config/pillow/seo-pages';
import { getRequiredSiteUrl } from '../lib/site-url';

const SITE_URL = getRequiredSiteUrl();
function credibleLastModified(value: string | undefined, now = new Date()): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date > now || date.toISOString().slice(0, 10) !== value) return undefined;
  return date;
}

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
    lastModified: credibleLastModified(page.lastReviewed),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...seoLandingPages];
}
