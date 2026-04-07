'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useLanguage } from '@/i18n/LanguageContext';

const testimonials = [
  {
    name: 'James Mwangi',
    role: 'IT Director',
    company: 'National Bank of Commerce',
    text: 'Viabtech transformed our entire print infrastructure. Their managed print service reduced our costs by 40% while improving reliability across 12 branches.',
    textSw: 'Viabtech ilibadilisha miundombinu yetu yote ya uchapishaji. Huduma yao ya uchapishaji ilipunguza gharama zetu kwa 40% huku ikiboresha uaminika katika matawi 12.',
    rating: 5,
    avatar: 'JM',
    color: '#CC0000',
  },
  {
    name: 'Dr. Fatma Hassan',
    role: 'Operations Manager',
    company: 'Muhimbili National Hospital',
    text: 'The Epson projectors from Viabtech have been outstanding in our training rooms. Their after-sales support is truly world-class — fast response and genuine parts.',
    textSw: 'Projekta za Epson kutoka Viabtech zimekuwa bora katika vyumba vyetu vya mafunzo. Msaada wao baada ya mauzo ni wa kimataifa — majibu ya haraka na vipuri halisi.',
    rating: 5,
    avatar: 'FH',
    color: '#003399',
  },
  {
    name: 'Robert Kimaro',
    role: 'Procurement Head',
    company: 'Tanzania Revenue Authority',
    text: 'We switched to Viabtech for all Canon printer supplies and repairs. Their pricing is competitive, delivery is prompt, and the service quality is unmatched in Tanzania.',
    textSw: 'Tulibadili kwenda Viabtech kwa vifaa vyote vya printa za Canon na ukarabati. Bei zao ni shindani, usafirishaji ni wa haraka, na ubora wa huduma hauna kifani Tanzania.',
    rating: 5,
    avatar: 'RK',
    color: '#0057B8',
  },
  {
    name: 'Amara Ndulele',
    role: 'Studio Director',
    company: 'Dar Creative Studios',
    text: 'The Canon EOS R5 kit we purchased from Viabtech has elevated our production quality. The team helped us choose the perfect setup for our commercial work.',
    textSw: 'Seti ya Canon EOS R5 tuliyonunua kutoka Viabtech imeboresha ubora wa uzalishaji wetu. Timu ilikusaidia kuchagua usanidi bora kwa kazi yetu ya kibiashara.',
    rating: 5,
    avatar: 'AN',
    color: '#FF6600',
  },
  {
    name: 'Sarah Mushi',
    role: 'Office Manager',
    company: 'PwC Tanzania',
    text: 'Viabtech has been our trusted printing partner for 5 years. Their managed print solutions keep our offices running smoothly without us ever worrying about supplies.',
    textSw: 'Viabtech imekuwa mshirika wetu wa uchapishaji anayeaminika kwa miaka 5. Suluhisho zao za uchapishaji zinaweka ofisi zetu zikifanya kazi vizuri bila kujishughulisha na vifaa.',
    rating: 5,
    avatar: 'SM',
    color: '#2E3A87',
  },
  {
    name: 'Patrick Lyimo',
    role: 'Head of IT',
    company: 'CRDB Bank',
    text: 'When we needed 50+ Epson printers deployed across our branches, Viabtech handled everything — procurement, setup, training, and ongoing maintenance. True enterprise-level service.',
    textSw: 'Tulipohitaji printa 50+ za Epson zisambazwe katika matawi yetu, Viabtech walishughulikia kila kitu — ununuzi, usanidi, mafunzo, na matengenezo ya mara kwa mara.',
    rating: 5,
    avatar: 'PL',
    color: '#007DB8',
  },
];

export default function Testimonials() {
  const { locale, t } = useLanguage();
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show 3 cards at a time, paginate in groups of 3
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setPage((prev) =>
        direction === 'next'
          ? (prev + 1) % totalPages
          : (prev - 1 + totalPages) % totalPages,
      );
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, totalPages],
  );

  useEffect(() => {
    const timer = setInterval(() => navigate('next'), 8000);
    return () => clearInterval(timer);
  }, [navigate]);

  const visibleTestimonials = testimonials.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage,
  );

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8fbff] to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto">{t('testimonials.badge')}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary tracking-tight">
              {t('testimonials.title')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">
                {t('testimonials.titleHighlight')}
              </span>{' '}
              {t('testimonials.titleEnd')}
            </h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        {/* 3-card grid */}
        <div
          key={page}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[testimonialIn_0.5s_ease-out]"
        >
          {visibleTestimonials.map((item) => {
            const displayText = locale === 'sw' ? item.textSw : item.text;
            return (
              <div
                key={item.name}
                className="relative bg-white rounded-[2rem] p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,87,184,0.06)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,87,184,0.1)] hover:-translate-y-1 transition-all duration-400 flex flex-col"
              >
                {/* Quote icon */}
                <div
                  className="absolute -top-4 left-8 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: item.color }}
                >
                  <Quote size={16} className="text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5 pt-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-amber-400 text-amber-400 drop-shadow-sm"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-[15px] sm:text-base text-text-primary leading-relaxed mb-6 font-medium flex-1">
                  &ldquo;{displayText}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)` }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-text-primary text-sm">{item.name}</div>
                    <div className="text-xs text-text-secondary">
                      {item.role},{' '}
                      <span className="font-semibold" style={{ color: item.color }}>
                        {item.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => navigate('prev')}
            className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setPage(i);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-8 h-2.5 bg-primary shadow-md shadow-primary/30'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate('next')}
            className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Next testimonials"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes testimonialIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
