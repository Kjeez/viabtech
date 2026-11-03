import type { MetadataRoute } from 'next';

// Search engines and AI assistants we want to read the site.
// Listing them explicitly makes the intent clear even though "*" already allows them.
const NAMED_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ must stay crawlable: it holds the JS, CSS and optimized images Google needs to render pages.
        disallow: ['/api/'],
      },
      {
        userAgent: NAMED_CRAWLERS,
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.viabtech.com/sitemap.xml',
    host: 'https://www.viabtech.com',
  };
}
