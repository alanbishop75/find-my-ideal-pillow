import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findyouridealpillow.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/pillow/questionnaire',
          '/pillow/results',
          '/questionnaire',
          '/results',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
