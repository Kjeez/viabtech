'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    headline: "Tanzania\u2019s Most Trusted Printer Dealer",
    subtext: 'Authorized sales, service, and repair for Canon and Epson printers in Dar es Salaam.',
    cta1: { label: 'Browse Products', href: '/products' },
    cta2: { label: 'Get a Quote', href: '/contact' },
    image: '/images/canon&epson.png',
    imageAlt: 'Canon and Epson printers — authorized dealer in Tanzania',
    imageWidth: 700,
    imageHeight: 500,
  },
  {
    headline: 'Canon Cameras, Lenses & Accessories',
    subtext: 'From the flagship EOS R1 to the compact EOS R50 — professional mirrorless cameras, RF lenses, and accessories for every photographer.',
    cta1: { label: 'Shop Cameras', href: '/products?category=Camera' },
    cta2: { label: 'Browse Lenses', href: '/products?category=Lens' },
    image: '/images/products/canon-camera.png',
    imageAlt: 'Canon EOS R mirrorless camera system',
    imageWidth: 600,
    imageHeight: 500,
  },
  {
    headline: 'Authorized Canon Dealer in East Africa',
    subtext: 'From high-speed laser printers to versatile all-in-ones — genuine Canon products backed by factory warranty and expert service.',
    cta1: { label: 'Canon Products', href: '/brands#canon' },
    cta2: { label: 'Service Center', href: '/service-center' },
    image: '/images/canon.png',
    imageAlt: 'Canon imageCLASS multifunction printer',
    imageWidth: 600,
    imageHeight: 600,
  },
  {
    headline: 'Epson Projectors & Business Solutions',
    subtext: '3LCD laser and lamp projectors for boardrooms, classrooms, and home cinema — vivid colors, zero maintenance, brilliant presentations.',
    cta1: { label: 'View Projectors', href: '/products?category=Projector' },
    cta2: { label: 'Contact Sales', href: '/contact' },
    image: '/images/products/epson-projector.png',
    imageAlt: 'Epson business and home cinema projectors',
    imageWidth: 600,
    imageHeight: 500,
  },
  {
    headline: 'Official Epson Partner for Business Printing',
    subtext: 'EcoTank, WorkForce Pro, and large-format solutions — reliable Epson printers with industry-leading ink efficiency.',
    cta1: { label: 'Epson Products', href: '/brands#epson' },
    cta2: { label: 'Contact Sales', href: '/contact' },
    image: '/images/epson.png',
    imageAlt: 'Epson WorkForce Pro business printer',
    imageWidth: 600,
    imageHeight: 600,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning],
  );

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f8fbff] to-[#dbeafe]">
      {/* ── Dot-grid pattern overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,159,227,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Animated concentric rings ── */}
      <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-[45px] border-primary/[0.08] pointer-events-none animate-[ringPulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-2%] top-[52%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[32px] border-primary/[0.12] pointer-events-none animate-[ringPulse_8s_ease-in-out_1s_infinite]" />
      <div className="absolute right-[4%] top-[48%] -translate-y-1/2 w-[320px] h-[320px] rounded-full border-[20px] border-primary/[0.06] pointer-events-none animate-[ringPulse_8s_ease-in-out_2s_infinite]" />

      {/* ── Floating accent blobs ── */}
      <div className="absolute bottom-[6%] right-[4%] w-[100px] h-[100px] rounded-full bg-primary/10 pointer-events-none animate-[floatBlob_6s_ease-in-out_infinite]" />
      <div className="absolute top-[12%] right-[32%] w-[50px] h-[50px] rounded-full bg-primary/[0.07] pointer-events-none animate-[floatBlob_7s_ease-in-out_1.5s_infinite]" />
      <div className="absolute top-[70%] left-[5%] w-[70px] h-[70px] rounded-full bg-primary/[0.05] pointer-events-none animate-[floatBlob_9s_ease-in-out_0.5s_infinite]" />

      {/* ── Gradient shimmer stripe ── */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-0 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Left — Text & CTAs */}
          {/* Mobile — Printer image on top */}
          <div className="lg:hidden flex items-center justify-center order-1">
            <div
              key={`img-mob-${current}`}
              className="relative w-full max-w-[340px] animate-[slideInRight_0.65s_cubic-bezier(0.16,1,0.3,1)_both]"
            >
              <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-primary/[0.08] via-primary/[0.04] to-transparent blur-3xl" />
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={slide.imageWidth}
                height={slide.imageHeight}
                className="relative z-10 w-full h-auto drop-shadow-[0_15px_40px_rgba(0,159,227,0.12)] mix-blend-multiply"
                priority={current === 0}
              />
            </div>
          </div>

          <div key={`text-${current}`} className="order-2 animate-[slideInLeft_0.65s_cubic-bezier(0.16,1,0.3,1)_both]">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] text-primary text-xs font-semibold mb-5 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Authorized Dealer
            </div>

            <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.6rem] font-extrabold font-[var(--font-heading)] leading-[1.08] mb-6 text-[#0f1c2e]">
              {slide.headline}
            </h1>
            <p className="text-[1.08rem] text-[#4b5c72] leading-relaxed max-w-lg mb-9">
              {slide.subtext}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={slide.cta1.href}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {slide.cta1.label}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link
                href={slide.cta2.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border-2 border-[#1a2332] text-[#1a2332] font-semibold text-sm hover:bg-[#1a2332] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                {slide.cta2.label}
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <span>Official Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4b5c72]">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Right — Printer image */}
          {/* Desktop — Printer image on right */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div
              key={`img-${current}`}
              className="relative w-full max-w-[580px] animate-[slideInRight_0.65s_cubic-bezier(0.16,1,0.3,1)_both]"
            >
              {/* Glow behind printer */}
              <div className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-primary/[0.08] via-primary/[0.04] to-transparent blur-3xl" />
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={slide.imageWidth}
                height={slide.imageHeight}
                className="relative z-10 w-full h-auto drop-shadow-[0_25px_60px_rgba(0,159,227,0.15)]"
                priority={current === 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Carousel navigation dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-10 h-3 bg-primary shadow-md shadow-primary/30'
                : 'w-3 h-3 bg-primary/20 hover:bg-primary/40'
            }`}
          />
        ))}
      </div>

      {/* ── Keyframe animations ── */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: translate(0, -50%) scale(1); opacity: 1; }
          50%      { transform: translate(0, -50%) scale(1.04); opacity: 0.6; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}
