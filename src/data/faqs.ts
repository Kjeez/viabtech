import { translations } from '@/i18n/translations';

/** An FAQ entry = a pair of translation keys, so the visible text and the FAQPage schema always match. */
export interface FaqItem {
  qKey: string;
  aKey: string;
}

/** The general FAQ (contact page and service center). */
export const GENERAL_FAQ: FaqItem[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ qKey: `faq.q${n}`, aKey: `faq.a${n}` }));

/** English text for schema (the server-rendered page is English). */
export function faqText(items: FaqItem[]) {
  return items.map((i) => ({ q: translations.en[i.qKey], a: translations.en[i.aKey] }));
}
