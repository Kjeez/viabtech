'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn, Sparkles } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/gallery/1.jpeg',
    alt: 'Epson Experience Centre showroom with printers and products on display',
    caption: 'State-of-the-Art Showroom Interior',
    tag: 'Showroom',
  },
  {
    src: '/images/gallery/2.jpeg',
    alt: 'Epson Experience & Service Centre exterior with signage',
    caption: 'Epson Experience & Service Centre — Exterior',
    tag: 'Exterior',
  },
  {
    src: '/images/gallery/3.jpeg',
    alt: 'Showroom interior with Epson 50 Years celebration display and product lineup',
    caption: 'Celebrating 50 Years of Epson Brand',
    tag: 'Milestone',
  },
  {
    src: '/images/gallery/4.jpeg',
    alt: 'Viab Tech and Epson celebrating 50 years banner with product displays',
    caption: '50 Years of Epson — 100 Million EcoTank Sold',
    tag: 'Milestone',
  },
  {
    src: '/images/gallery/5.jpeg',
    alt: 'Cake cutting ceremony with Epson and Viab Tech team celebrating the launch',
    caption: 'Grand Inauguration — Cake Cutting Ceremony',
    tag: 'Ceremony',
  },
  {
    src: '/images/gallery/6.jpeg',
    alt: 'VIP guests and leadership at the Epson service centre launch',
    caption: 'VIP Guests & Leadership',
    tag: 'Ceremony',
  },
  {
    src: '/images/gallery/WhatsApp Image 2026-04-04 at 5.53.02 PM.jpeg',
    alt: 'Celebration cake for Epson 50 Years Brand and 100 Million milestone',
    caption: 'Epson 50 Years — Celebration Cake',
    tag: 'Milestone',
  },
];

const filters = ['All', 'Showroom', 'Exterior', 'Milestone', 'Ceremony'];

export default function EventGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.tag === activeFilter);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = useCallback(() =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    ), [filteredImages.length]);
  const goPrev = useCallback(() =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null
    ), [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // Carousel scrolling
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 450 : 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll carousel
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      // If near the end, scroll back to start
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const scrollAmount = window.innerWidth > 768 ? 450 : 300;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, lightboxIndex, filteredImages]);

  return (
    <section className="py-20 bg-gradient-to-b from-[#f0f7fa] via-white to-[#f8fbff] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full mx-auto relative z-10">
        {/* Header (Centered layout wrapper) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={13} /> Grand Opening Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary leading-tight">
                Service Centre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#0fbcb3]">
                Launch Event
                </span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-base sm:text-lg">
                Revisit the grand inauguration of East Africa&apos;s first Epson Experience &amp; Service Centre.
            </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((filter) => (
                <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-white text-text-secondary border border-border hover:border-primary/30 hover:text-primary'
                }`}
                >
                {filter}
                </button>
            ))}
            </div>
        </div>

        {/* Carousel Section */}
        <div className="relative group">
            {/* Nav Arrows */}
            <button 
                onClick={() => scrollCarousel('left')}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-primary shadow-xl border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white transition-all disabled:opacity-0"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button 
                onClick={() => scrollCarousel('right')}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-primary shadow-xl border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white transition-all disabled:opacity-0"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 lg:px-12 pb-12 pt-4 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {filteredImages.map((img, index) => (
                    <button
                        key={img.src}
                        className="flex-none snap-center gallery-card relative overflow-hidden rounded-2xl group cursor-pointer w-[80vw] sm:w-[350px] md:w-[420px] h-[250px] sm:h-[300px]"
                        style={{
                            animationDelay: `${index * 80}ms`,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
                        }}
                        onClick={() => openLightbox(index)}
                        aria-label={`View: ${img.caption}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 80vw, 420px"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />

                        {/* Permanent subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Tag pill */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            {img.tag}
                        </div>

                        {/* Zoom icon */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <ZoomIn size={14} />
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                            <p className="text-white text-sm sm:text-base font-semibold leading-snug drop-shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300text-left">
                                {img.caption}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Photo count strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-border" />
            <span className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                <Camera size={13} /> {galleryImages.length} Photos from the Grand Launch
            </span>
            <div className="h-px w-12 bg-border" />
            </div>
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
            <span className="text-white/60 text-sm font-medium">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-20 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-20 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.25s ease' }}
          >
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              width={1400}
              height={900}
              className="object-contain w-full h-full max-h-[78vh] rounded-xl"
              priority
            />
            {/* Caption bar */}
            <div className="text-center mt-5">
              <p className="text-white text-base sm:text-lg font-semibold">
                {filteredImages[lightboxIndex].caption}
              </p>
              <p className="text-white/40 text-xs mt-2 flex items-center justify-center gap-1.5">
                <Camera size={11} /> {filteredImages[lightboxIndex].tag} • Use arrow keys to navigate
              </p>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-20">
            {filteredImages.map((img, i) => (
              <button
                key={img.src}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === lightboxIndex
                    ? 'ring-2 ring-primary scale-110 opacity-100'
                    : 'opacity-40 hover:opacity-70'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
