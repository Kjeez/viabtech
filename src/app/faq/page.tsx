import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { FAQ_GROUPS, faqText } from '@/data/faqs';
import FaqContent from './FaqContent';

export const metadata: Metadata = {
  title: 'FAQ – Buying, Repairs, Delivery & Leasing in Tanzania',
  description:
    'Answers to common questions about Viabtech: authorized Canon and Epson products, quotes, repairs and warranty, delivery across Tanzania, payment methods, opening hours, leasing and AMC.',
  alternates: { canonical: 'https://www.viabtech.com/faq' },
  openGraph: {
    title: 'Viabtech FAQ – Printers, Repairs & Leasing in Tanzania',
    description:
      'Buying, repairs and warranty, delivery and payment, and leasing questions answered by Viabtech, the authorized Canon and Epson dealer in Dar es Salaam.',
    url: 'https://www.viabtech.com/faq',
    siteName: 'Viabtech',
    locale: 'en_TZ',
    type: 'website',
  },
};

export default function FaqPage() {
  const all = FAQ_GROUPS.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={[faqSchema(faqText(all), '/faq'), breadcrumbSchema([['FAQ', '/faq']])]} />
      <FaqContent />
    </>
  );
}
