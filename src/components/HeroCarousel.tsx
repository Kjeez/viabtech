'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';

type SlideLayout = 'single' | 'dual-stagger' | 'dual-stagger-large' | 'camera-gear' | 'side-by-side';

interface SlideData {
  headlineKey: string;
  subtextKey: string;
  cta1LabelKey: string; cta1Href: string;
  cta2LabelKey: string; cta2Href: string;
  image: string;
  imageAlt: string;
  imageWidth: number; imageHeight: number;
  layout?: SlideLayout;
  extraImages?: { src: string; alt: string; w: number; h: number }[];
}

const slides: SlideData[] = [
  {
    headlineKey: 'hero.slide1.headline',
    subtextKey: 'hero.slide1.subtext',
    cta1LabelKey: 'hero.slide1.cta1', cta1Href: '/products',
    cta2LabelKey: 'hero.slide1.cta2', cta2Href: '/contact',
    image: '/images/canon&epson.png',
    imageAlt: 'Canon and Epson printers — authorized reseller in Tanzania',
    imageWidth: 700, imageHeight: 500,
  },
  {
    headlineKey: 'hero.slide2.headline',
    subtextKey: 'hero.slide2.subtext',
    cta1LabelKey: 'hero.slide2.cta1', cta1Href: '/products',
    cta2LabelKey: 'hero.slide2.cta2', cta2Href: '/brands',
    image: '/images/camera.png',
    imageAlt: 'Canon EOS R5 camera with lenses',
    imageWidth: 600, imageHeight: 500,
    layout: 'camera-gear',
    extraImages: [
      { src: '/images/lens1.png', alt: 'Canon RF lens', w: 400, h: 400 },
      { src: '/images/lens2.png', alt: 'Canon RF telephoto lens', w: 400, h: 400 },
    ],
  },
  {
    headlineKey: 'hero.slide3.headline',
    subtextKey: 'hero.slide3.subtext',
    cta1LabelKey: 'hero.slide3.cta1', cta1Href: '/brands#canon',
    cta2LabelKey: 'hero.slide3.cta2', cta2Href: '/service-center',
    image: '/images/canon.png',
    imageAlt: 'Canon imageCLASS multifunction printer',
    imageWidth: 600, imageHeight: 600,
  },
  {
    headlineKey: 'hero.slide4.headline',
    subtextKey: 'hero.slide4.subtext',
    cta1LabelKey: 'hero.slide4.cta1', cta1Href: '/products?category=Projector',
    cta2LabelKey: 'hero.slide4.cta2', cta2Href: '/contact',
    image: '/images/projector.png',
    imageAlt: 'Epson business projectors',
    imageWidth: 600, imageHeight: 500,
    layout: 'dual-stagger-large',
    extraImages: [
      { src: '/images/projector2.png', alt: 'Epson home cinema projector', w: 600, h: 500 },
    ],
  },
  {
    headlineKey: 'hero.slide5.headline',
    subtextKey: 'hero.slide5.subtext',
    cta1LabelKey: 'hero.slide5.cta1', cta1Href: '/brands#epson',
    cta2LabelKey: 'hero.slide5.cta2', cta2Href: '/contact',
    image: '/images/epsonprinter2.png',
    imageAlt: 'Epson WorkForce Enterprise AM-C6000',
    imageWidth: 371, imageHeight: 800,
    layout: 'dual-stagger',
    extraImages: [
      { src: '/images/epson-am-c4000.png', alt: 'Epson WorkForce Enterprise AM-C4000', w: 371, h: 800 },
    ],
  },
  {
    headlineKey: 'hero.slide6.headline',
    subtextKey: 'hero.slide6.subtext',
    cta1LabelKey: 'hero.slide6.cta1', cta1Href: '/products?brand=Canon',
    cta2LabelKey: 'hero.slide6.cta2', cta2Href: '/contact',
    image: '/images/canonprinter1.png',
    imageAlt: 'Canon enterprise business printer',
    imageWidth: 500, imageHeight: 500,
    layout: 'side-by-side',
    extraImages: [
      { src: '/images/canonprinter2.png', alt: 'Canon high-volume multifunction printer', w: 500, h: 600 },
    ],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  const renderSlideImages = (s: SlideData, isMobile: boolean) => {
    const layout = s.layout || 'single';
    const shadow = isMobile
      ? 'drop-shadow-[0_15px_40px_rgba(0,159,227,0.12)]'
      : 'drop-shadow-[0_25px_60px_rgba(0,159,227,0.15)]';
    const shadowLight = isMobile
      ? 'drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]'
      : 'drop-shadow-[0_15px_40px_rgba(0,0,0,0.08)]';

    if (layout === 'camera-gear' && s.extraImages) {
      // Camera centered with lenses floating around it
      const h = isMobile ? 'h-[280px]' : 'h-[420px]';
      return (
        <div className={`relative z-10 w-full ${h}`}>
          {/* Camera — center, hero (increased by 15%) */}
          <div className={`absolute ${isMobile ? 'top-4 left-1/2 -translate-x-1/2 w-[80%]' : 'top-2 left-1/2 -translate-x-1/2 w-[75%]'} z-20`}>
            <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} className={`w-full h-auto ${shadow}`} priority={current === 0} />
          </div>
          {/* Lens 1 — bottom left (reduced by 25%, pulled further out) */}
          <div className={`absolute ${isMobile ? '-bottom-4 -left-8 w-[40%]' : '-bottom-8 -left-12 w-[40%]'} z-10`}>
            <Image src={s.extraImages[0].src} alt={s.extraImages[0].alt} width={s.extraImages[0].w} height={s.extraImages[0].h} className={`w-full h-auto ${shadowLight}`} />
          </div>
          {/* Lens 2 — top right, tall telephoto (moved down 25px, right 25px) */}
          <div className={`absolute ${isMobile ? '-top-[23px] -right-[73px] w-[80%]' : '-top-[71px] -right-[121px] w-[80%]'} z-10`}>
            <Image src={s.extraImages[1].src} alt={s.extraImages[1].alt} width={s.extraImages[1].w} height={s.extraImages[1].h} className={`w-full h-auto ${shadowLight}`} />
          </div>
        </div>
      );
    }

    if (layout === 'side-by-side' && s.extraImages) {
      // Two items side by side at the same level — separated with gap
      const h = isMobile ? 'h-[300px]' : 'h-[460px]';
      return (
        <div className={`relative z-10 w-full ${h} flex items-end`}>
          {/* Left printer — shifted left as much as possible */}
          <div className={`absolute bottom-0 ${isMobile ? '-left-[40px] w-[70%]' : '-left-[150px] w-[75%]'} z-10`}>
            <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} className={`w-full h-auto ${shadow}`} priority={current === 0} />
          </div>
          {/* Right printer — shifted right as much as possible */}
          <div className={`absolute bottom-0 ${isMobile ? '-right-[80px] w-[85%]' : '-right-[180px] w-[100%]'}`}>
            <Image src={s.extraImages[0].src} alt={s.extraImages[0].alt} width={s.extraImages[0].w} height={s.extraImages[0].h} className={`w-full h-auto ${shadow}`} />
          </div>
        </div>
      );
    }

    if (layout === 'dual-stagger-large' && s.extraImages) {
      // Larger dual items (projectors) increased by 25%
      const h = isMobile ? 'h-[280px]' : 'h-[440px]';
      return (
        <div className={`relative z-10 w-full ${h} flex items-center`}>
          {/* Back — offset right, larger */}
          <div className={`absolute top-0 ${isMobile ? 'right-0 w-[68%]' : '-right-4 w-[70%]'}`}>
            <Image src={s.extraImages[0].src} alt={s.extraImages[0].alt} width={s.extraImages[0].w} height={s.extraImages[0].h} className={`w-full h-auto ${shadowLight}`} />
          </div>
          {/* Front — offset left, largest */}
          <div className={`absolute ${isMobile ? 'top-10 -left-2 w-[75%]' : 'top-12 -left-6 w-[80%]'} z-10`}>
            <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} className={`w-full h-auto ${shadow}`} priority={current === 0} />
          </div>
        </div>
      );
    }

    if (layout === 'dual-stagger' && s.extraImages) {
      // Two Epson printers at same level with gap (reduced by 25% scale)
      const h = isMobile ? 'h-[260px]' : 'h-[400px]';
      return (
        <div className={`relative z-10 w-full ${h} flex justify-center items-end`}>
          {/* Back (Now right printer, same level) */}
          <div className={`absolute bottom-0 ${isMobile ? 'right-[10%] w-[32%]' : 'right-[15%] w-[32%]'}`}>
            <Image src={s.extraImages[0].src} alt={s.extraImages[0].alt} width={s.extraImages[0].w} height={s.extraImages[0].h} className={`w-full h-auto ${shadowLight}`} />
          </div>
          {/* Front (Now left printer, same level) */}
          <div className={`absolute bottom-0 ${isMobile ? 'left-[10%] w-[34%]' : 'left-[15%] w-[34%]'} z-10`}>
            <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} className={`w-full h-auto ${shadow}`} priority={current === 0} />
          </div>
        </div>
      );
    }

    // Single image — default
    return (
      <Image src={s.image} alt={s.imageAlt} width={s.imageWidth} height={s.imageHeight} className={`relative z-10 w-full h-auto ${shadow} mix-blend-multiply`} priority={current === 0} />
    );
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f8fbff] to-[#dbeafe]">
      {/* Dot-grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,159,227,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Animated concentric rings */}
      <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-[45px] border-primary/[0.08] pointer-events-none animate-[ringPulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-2%] top-[52%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[32px] border-primary/[0.12] pointer-events-none animate-[ringPulse_8s_ease-in-out_1s_infinite]" />
      <div className="absolute right-[4%] top-[48%] -translate-y-1/2 w-[320px] h-[320px] rounded-full border-[20px] border-primary/[0.06] pointer-events-none animate-[ringPulse_8s_ease-in-out_2s_infinite]" />

      {/* Floating accent blobs */}
      <div className="absolute bottom-[6%] right-[4%] w-[100px] h-[100px] rounded-full bg-primary/10 pointer-events-none animate-[floatBlob_6s_ease-in-out_infinite]" />
      <div className="absolute top-[12%] right-[32%] w-[50px] h-[50px] rounded-full bg-primary/[0.07] pointer-events-none animate-[floatBlob_7s_ease-in-out_1.5s_infinite]" />
      <div className="absolute top-[70%] left-[5%] w-[70px] h-[70px] rounded-full bg-primary/[0.05] pointer-events-none animate-[floatBlob_9s_ease-in-out_0.5s_infinite]" />

      {/* Gradient shimmer stripe */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-0 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Mobile — image on bottom (was top) */}
          <div className="lg:hidden flex items-center justify-center order-2">
            <div key={`img-mob-${current}`} className="relative w-full max-w-[340px] animate-[slideInRight_0.65s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-primary/[0.08] via-primary/[0.04] to-transparent blur-3xl" />
              {renderSlideImages(slide, true)}
            </div>
          </div>

          <div key={`text-${current}`} className="order-1 lg:order-1 animate-[slideInLeft_0.65s_cubic-bezier(0.16,1,0.3,1)_both]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] text-primary text-xs font-semibold mb-5 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('hero.badge')}
            </div>

            <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.6rem] font-extrabold font-[var(--font-heading)] leading-[1.08] mb-6 text-[#0f1c2e]">
              {t(slide.headlineKey)}
            </h1>
            <p className="text-[1.08rem] text-[#4b5c72] leading-relaxed max-w-lg mb-9">
              {t(slide.subtextKey)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={slide.cta1Href} className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                {t(slide.cta1LabelKey)}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href={slide.cta2Href} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border-2 border-[#1a2332] text-[#1a2332] font-semibold text-sm hover:bg-[#1a2332] hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                {t(slide.cta2LabelKey)}
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>{t('hero.genuine')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <span>{t('hero.warranty')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span>{t('hero.delivery')}</span>
              </div>
            </div>
          </div>

          {/* Desktop — image on right */}
          <div className="relative hidden lg:flex items-center justify-center lg:order-2">
            <div key={`img-${current}`} className="relative w-full max-w-[580px] animate-[slideInRight_0.65s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-primary/[0.08] via-primary/[0.04] to-transparent blur-3xl" />
              {renderSlideImages(slide, false)}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel nav dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className={`rounded-full transition-all duration-300 ${i === current ? 'w-10 h-3 bg-primary shadow-md shadow-primary/30' : 'w-3 h-3 bg-primary/20 hover:bg-primary/40'}`} />
        ))}
      </div>

    </section>
  );
}
