'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Counter from '@/components/Counter';
import { useLanguage } from '@/i18n/LanguageContext';

interface AboutSectionProps {
  showCta?: boolean;
}

export default function AboutSection({ showCta = true }: AboutSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Aerial background */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ariel-background.jpg" alt="Aerial view of Dar es Salaam city" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/70 to-[#e8f4fd]/70" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary/[0.03] to-transparent rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Right: Image Stack ── */}
          <div className="relative order-1 lg:order-2 w-full h-[480px] sm:h-[540px] lg:h-[580px]">

            {/* Back image — upper right */}
            <div className="absolute top-0 right-0 w-[85%] sm:w-[80%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white group z-[1]">
              <Image
                src="/images/epson.jpg"
                alt="Viab Tech Epson Experience & Service Center, Dar es Salaam"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Front image — lower left, overlapping */}
            <div className="absolute bottom-[60px] sm:bottom-[50px] left-0 w-[80%] sm:w-[75%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border-4 border-white group z-[2]">
              <Image
                src="/images/canon.jpg"
                alt="Viab Tech Canon Authorized Dealer showroom, Dar es Salaam"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Stats card — bottom right, separate */}
            <div className="absolute bottom-0 right-0 sm:right-4 z-[3] bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-4 min-w-[120px]">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary"><Counter end={10} suffix="+" /></div>
                <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.years' : 'aboutPage.years')}</div>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary"><Counter end={11} /></div>
                <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.brands' : 'aboutPage.brands')}</div>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary"><Counter end={2000} suffix="+" formatk /></div>
                <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.clients' : 'aboutPage.clients')}</div>
              </div>
            </div>

          </div>


          {/* ── Left: Text Content ── */}
          <div className="order-2 lg:order-1">
            <div className="section-badge bg-primary/10 text-primary border-primary/20">
              {t(showCta ? 'about.badge' : 'aboutPage.aboutBadge')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e] mb-6 leading-tight">
              {t(showCta ? 'about.title' : 'aboutPage.whoWeAre')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-base lg:text-lg">
              {t(showCta ? 'about.p1' : 'aboutPage.p1')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-base lg:text-lg">
              {t(showCta ? 'about.p2' : 'aboutPage.p2')}
            </p>
            {showCta && (
              <Link href="/about" className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant text-sm font-semibold rounded-full">
                {t('about.readMore')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
