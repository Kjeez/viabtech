/**
 * Lead tracking helpers for Google Analytics 4 (gtag) and the Meta Pixel.
 * Never pass personal data (names, emails, phone numbers typed into forms) to these.
 */

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function send(eventName: string, params: Params, metaEvent?: 'Contact' | 'Lead') {
  if (typeof window === 'undefined') return;
  const payload = { page_path: window.location.pathname, ...params };
  try {
    window.gtag?.('event', eventName, payload);
  } catch {
    /* analytics must never break the page */
  }
  if (metaEvent) {
    try {
      window.fbq?.('track', metaEvent, { content_name: eventName });
    } catch {
      /* ignore */
    }
  }
}

/** A click on a WhatsApp, phone or email link. */
export function trackContactClick(method: 'whatsapp' | 'phone' | 'email', linkUrl: string, linkText?: string) {
  const eventName = method === 'whatsapp' ? 'whatsapp_click' : method === 'phone' ? 'phone_click' : 'email_click';
  send(eventName, { method, link_url: linkUrl, link_text: linkText?.slice(0, 100) }, 'Contact');
}

/** A form that was submitted successfully (contact form, quote/inquiry modal, Canon registration). */
export function trackLead(formName: string, params: Params = {}) {
  send('generate_lead', { form_name: formName, ...params }, 'Lead');
}
