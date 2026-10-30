'use client';

import { useEffect } from 'react';
import { trackContactClick } from '@/lib/analytics';

/**
 * Listens for clicks on any WhatsApp, phone or email link anywhere on the site
 * (header, footer, floating buttons, product pages…) and reports them to Analytics.
 * One listener covers every current and future link, so no component needs changing.
 */
export default function LeadTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const text = (link.textContent || link.getAttribute('aria-label') || '').trim();
      if (/^(https?:)?\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href) || href.startsWith('whatsapp:')) {
        trackContactClick('whatsapp', href, text);
      } else if (href.startsWith('tel:')) {
        trackContactClick('phone', href, text);
      } else if (href.startsWith('mailto:')) {
        trackContactClick('email', href, text);
      }
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
