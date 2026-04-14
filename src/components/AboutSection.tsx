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

          {/* ── Right: Image Collage ── */}
          <div className="relative order-1 lg:order-2 h-[440px] sm:h-[500px] w-full">
            {/* Decorative accent */}
            <div className="absolute -top-3 right-0 sm:-right-3 w-[65%] h-[70%] bg-primary/10 rounded-3xl -z-10" />

            {/* Building image — top right, larger */}
            <div className="absolute top-0 right-0 sm:-right-4 w-[85%] sm:w-[78%] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white group">
              <Image
                src="/images/about-us.jpg"
                alt="Viab Tech office at Uhuru Heights, Dar es Salaam"
                width={500}
                height={380}
                className="object-cover object-[80%_0%] w-full h-[220px] sm:h-[260px] lg:h-[280px] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Team image — bottom left, overlapping */}
            <div className="absolute bottom-20 sm:bottom-0 left-0 w-[70%] sm:w-[62%] rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border-4 border-white group z-10">
              <Image
                src="/images/about-us-team.jpg"
                alt="Viab Tech team at Epson Experience Zone & Service Centre"
                width={500}
                height={380}
                className="object-cover w-full h-[200px] sm:h-[260px] lg:h-[280px] group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Stats floating card — center right */}
            <div className="absolute bottom-0 right-0 sm:bottom-6 sm:right-0 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 sm:p-5 w-[140px] sm:w-[42%] sm:max-w-[180px]">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary"><Counter end={10} suffix="+" /></div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.years' : 'aboutPage.years')}</div>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary"><Counter end={11} /></div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.brands' : 'aboutPage.brands')}</div>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary"><Counter end={2000} suffix="+" formatk /></div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(showCta ? 'about.clients' : 'aboutPage.clients')}</div>
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
