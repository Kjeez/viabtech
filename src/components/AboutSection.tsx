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
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Right: Image Stack ── */}
          <div className="relative order-1 lg:order-2 w-full flex flex-col gap-3 h-[480px] sm:h-[540px] lg:h-[580px]">
            {/* Decorative accent */}
            <div className="absolute -top-3 right-0 sm:-right-3 w-[65%] h-[50%] bg-primary/10 rounded-3xl -z-10" />

            {/* Building image — top, full width */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white group">
              <Image
                src="/images/about-us.jpg"
                alt="Viab Tech office at Uhuru Heights, Dar es Salaam"
                width={700}
                height={320}
                className="object-cover object-[80%_0%] w-full h-[200px] sm:h-[240px] lg:h-[260px] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* aboutus_img — bottom, full width, fills remaining height */}
            <div className="relative flex-1 w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border-4 border-white group">
              <Image
                src="/images/aboutus_img.jpg"
                alt="Viab Tech Canon Zone & Service Center"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Stats floating card — bottom right corner of this image */}
              <div className="absolute bottom-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 p-2 sm:p-3 flex gap-3 sm:gap-5">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-primary"><Counter end={10} suffix="+" /></div>
                  <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.years' : 'aboutPage.years')}</div>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-primary"><Counter end={11} /></div>
                  <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.brands' : 'aboutPage.brands')}</div>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-primary"><Counter end={2000} suffix="+" formatk /></div>
                  <div className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.clients' : 'aboutPage.clients')}</div>
                </div>
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
