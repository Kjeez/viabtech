'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Newspaper, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const pressItems = [
  {
    id: 1,
    newspaper: 'The Citizen',
    date: 'July 14, 2023',
    headline: 'Epson opens EA\'s service centre in Dar',
    excerpt:
      'Dar es Salaam. A Global dealer in printing and projectors, Epson, has launched East Africa\'s state-of-the-art service centre in Dar es Salaam as it expands its footprint in the African market.',
    highlight:
      'Officials from Epson and the managing director for Viab Tech Ltd, Shaikh Abdul Baqi, cut a ribbon to launch Epson\'s state-of-the-art service centre.',
    color: '#1a7a3d',
    imagePath: '/images/press/1.png',
  },
  {
    id: 2,
    newspaper: 'The Guardian',
    date: 'July 2023',
    headline: 'Epson opens EA\'s first experience, service centre in Tanzania',
    excerpt:
      'Epson, a leading global leader in printing and projectors, has launched East Africa\'s first Experience and additional Service Center in Dar es Salaam, Tanzania. The new center is a significant milestone for Epson.',
    highlight:
      'Epson\'s new Experience and Service Center in Dar es Salaam is a game-changer in the African printing industry.',
    color: '#0055a5',
    imagePath: '/images/press/2.png',
  },
  {
    id: 3,
    newspaper: 'Mwananchi',
    date: 'July 2023',
    headline: 'Watanzania kunufaika ajira kituo kipya cha Epson',
    excerpt:
      'Watanzania watanufaika na ajira katika duka jipya la kampuni ya uuzaji vifaa vya kuchapisha na projectors la Epson. Kituo hiki kimeundwa ili kuwapatia wateja duka moja la huduma kwa mahitaji yao.',
    highlight:
      '"Kituo hiki kimeundwa ili kuwapatia wateja duka moja la huduma kwa mahitaji yao yote ya uchapishaji."',
    color: '#c41e3a',
    imagePath: '/images/press/6.png',
  },
  {
    id: 4,
    newspaper: 'Daily News',
    date: 'July 2023',
    headline: 'Why office equipment matters in reducing carbon emission',
    excerpt:
      'Tanzanians have been advised to use environmentally friendly office equipment to reduce carbon emissions. EcoTank pigment ink technology delivers sharp text while cutting heat emission by over 80 per cent.',
    highlight:
      'The opening of the first experience and service centre is a significant milestone for Epson in Africa.',
    color: '#1a1a6e',
    imagePath: '/images/press/5.png',
  },
];

export default function PressSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % pressItems.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + pressItems.length) % pressItems.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goNext]);

  const current = pressItems[activeIndex];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30 dot-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge mx-auto">
            <Newspaper size={12} /> Media Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
            In The <span className="text-primary">Press</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Our Epson Experience &amp; Service Centre launch made headlines across Tanzania&apos;s leading newspapers.
          </p>
        </div>

        {/* Desktop: cards with newspaper images */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {pressItems.map((item) => (
            <div
              key={item.id}
              className="press-card group kepler-card p-0 overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Colored header bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: item.color }}
              />

              <div className="grid sm:grid-cols-[200px_1fr] gap-0">
                {/* Newspaper image */}
                <div className="relative h-48 sm:h-full bg-gray-50">
                  <Image
                    src={item.imagePath}
                    alt={`${item.newspaper} newspaper coverage`}
                    fill
                    className="object-cover sm:object-contain p-2"
                    sizes="200px"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Newspaper + Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-sm font-bold tracking-wide"
                      style={{ color: item.color }}
                    >
                      {item.newspaper}
                    </span>
                    <span className="text-xs text-text-muted">{item.date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-base font-bold text-text-primary mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    &ldquo;{item.headline}&rdquo;
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* Quote highlight */}
                  <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-3 border-l-3 border-primary/30">
                    <Quote size={12} className="text-primary mb-1 opacity-60" />
                    <p className="text-xs text-text-secondary italic leading-relaxed line-clamp-2">
                      {item.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div
            className="press-card kepler-card p-0 overflow-hidden"
            onTouchStart={() => setIsAutoPlaying(false)}
            onTouchEnd={() => setIsAutoPlaying(true)}
          >
            <div
              className="h-1.5 w-full transition-colors duration-500"
              style={{ background: current.color }}
            />

            {/* Newspaper image */}
            <div className="relative h-48 bg-gray-50">
              <Image
                src={current.imagePath}
                alt={`${current.newspaper} newspaper coverage`}
                fill
                className="object-contain p-2"
                sizes="100vw"
              />
            </div>

            <div className="p-7">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-sm font-bold tracking-wide"
                  style={{ color: current.color }}
                >
                  {current.newspaper}
                </span>
                <span className="text-xs text-text-muted">{current.date}</span>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-3 leading-snug">
                &ldquo;{current.headline}&rdquo;
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {current.excerpt}
              </p>

              <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-4 border-l-3 border-primary/30">
                <Quote size={14} className="text-primary mb-1 opacity-60" />
                <p className="text-xs text-text-secondary italic leading-relaxed">
                  {current.highlight}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {pressItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-primary w-8'
                      : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
