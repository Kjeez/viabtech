'use client';

import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { useLanguage } from '@/i18n/LanguageContext';
import { FAQ_GROUPS } from '@/data/faqs';

export default function FaqContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero py-24 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('faqPage.badge')}</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-white mb-6">{t('faqPage.title')}</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{t('faqPage.subtitle')}</p>
          <nav className="flex flex-wrap gap-3 mt-8" aria-label="FAQ sections">
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors"
              >
                {t(g.titleKey)}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="bg-white py-12">
        {FAQ_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">{t(g.titleKey)}</h2>
            </div>
            <FAQAccordion items={g.items} showHeader={false} compact idPrefix={`faq-${g.id}`} />
          </section>
        ))}
      </div>

      <section className="py-16 bg-[#f8fbff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold font-[var(--font-heading)] text-text-primary mb-3">{t('faqPage.stillQuestions')}</h2>
          <p className="text-text-secondary mb-6">{t('faqPage.stillQuestionsDesc')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 btn-vibrant rounded-xl">
              <MessageCircle size={16} /> {t('faqPage.contactCta')}
            </Link>
            <a href="tel:+255745700500" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/5">
              <Phone size={16} /> +255 745 700 500
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
