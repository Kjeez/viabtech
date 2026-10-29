import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ must stay crawlable: it holds the JS, CSS and optimized images Google needs to render pages.
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.viabtech.com/sitemap.xml',
  };
}
