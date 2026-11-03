import { translations } from '@/i18n/translations';

/** An FAQ entry = a pair of translation keys, so the visible text and the FAQPage schema always match. */
export interface FaqItem {
  qKey: string;
  aKey: string;
}

const legacy = (n: number): FaqItem => ({ qKey: `faq.q${n}`, aKey: `faq.a${n}` });
const named = (id: string): FaqItem => ({ qKey: `faq.${id}.q`, aKey: `faq.${id}.a` });

export const FAQ = {
  brands: legacy(1),
  repairs: legacy(2),
  delivery: legacy(3),
  payment: legacy(4),
  warranty: legacy(5),
  bulk: legacy(6),
  showroom: legacy(7),
  repairTime: legacy(8),
  authorized: named('authorized'),
  quote: named('quote'),
  hours: named('hours'),
  genuineInk: named('genuineInk'),
  repairWhat: named('repairWhat'),
  dropoff: named('dropoff'),
  canonRegister: named('canonRegister'),
  leasing: named('leasing'),
  amc: named('amc'),
};

/** The original 8 general questions (default for FAQAccordion). */
export const GENERAL_FAQ: FaqItem[] = [1, 2, 3, 4, 5, 6, 7, 8].map(legacy);

/** All questions, grouped, for /faq. */
export const FAQ_GROUPS: Array<{ id: string; titleKey: string; items: FaqItem[] }> = [
  {
    id: 'buying',
    titleKey: 'faqPage.group.buying',
    items: [FAQ.brands, FAQ.authorized, FAQ.quote, FAQ.bulk, FAQ.showroom, FAQ.genuineInk],
  },
  {
    id: 'repairs',
    titleKey: 'faqPage.group.repairs',
    items: [FAQ.repairs, FAQ.repairWhat, FAQ.repairTime, FAQ.dropoff, FAQ.warranty, FAQ.canonRegister],
  },
  {
    id: 'delivery',
    titleKey: 'faqPage.group.delivery',
    items: [FAQ.delivery, FAQ.payment, FAQ.hours],
  },
  {
    id: 'leasing',
    titleKey: 'faqPage.group.leasing',
    items: [FAQ.leasing, FAQ.amc],
  },
];

/** Short, page-specific FAQ blocks (each page asks different questions; /faq has them all). */
export const CONTACT_FAQ: FaqItem[] = [FAQ.quote, FAQ.showroom, FAQ.hours, FAQ.payment, FAQ.delivery];
export const SERVICE_CENTER_FAQ: FaqItem[] = [FAQ.repairWhat, FAQ.repairTime, FAQ.dropoff, FAQ.warranty, FAQ.canonRegister];

/** English text for schema (the server-rendered page is English). */
export function faqText(items: FaqItem[]) {
  return items.map((i) => ({ q: translations.en[i.qKey], a: translations.en[i.aKey] }));
}
