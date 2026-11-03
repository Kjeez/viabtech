'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';
import { GENERAL_FAQ, type FaqItem } from '@/data/faqs';

interface FAQAccordionProps {
  /** Which questions to show (translation key pairs). Defaults to the general FAQ. */
  items?: FaqItem[];
  /** Hide the badge/title block, e.g. when the page supplies its own group heading. */
  showHeader?: boolean;
  /** Show a link to the full /faq page under the questions. */
  showViewAll?: boolean;
  /** Prefix for element ids, so several accordions can live on one page. */
  idPrefix?: string;
  /** Use a tighter section (for /faq groups). */
  compact?: boolean;
}

export default function FAQAccordion({
  items = GENERAL_FAQ,
  showHeader = true,
  showViewAll = false,
  idPrefix = 'faq',
  compact = false,
}: FAQAccordionProps) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = items.map((i) => ({ q: t(i.qKey), a: t(i.aKey) }));

  return (
    <section className={`${compact ? 'py-6' : 'py-24'} bg-white relative overflow-hidden`}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {showHeader && (
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto">
              <HelpCircle size={12} /> {t('faq.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary tracking-tight">
              {t('faq.title')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">
                {t('faq.titleHighlight')}
              </span>
            </h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        </AnimatedSection>
        )}

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 60}>
                <div
                  className={`rounded-2xl border transition-all duration-400 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-primary/20 shadow-[0_10px_40px_rgba(0,87,184,0.08)]'
                      : 'bg-[#f8fbff] border-gray-100 hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-2xl transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`${idPrefix}-panel-${index}`}
                  >
                    <span
                      className={`font-semibold text-[15px] leading-snug transition-colors ${
                        isOpen ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary text-white rotate-180'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>
                  <div
                    id={`${idPrefix}-panel-${index}`}
                    role="region"
                    className={`transition-all duration-400 ease-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="w-12 h-0.5 bg-primary/20 rounded-full mb-4" />
                      <p className="text-text-secondary leading-relaxed text-[15px]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        {showViewAll && (
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              {t('faq.viewAll')} &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
