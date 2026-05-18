'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn, Sparkles } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  event: 'canon' | 'epson';
}

const galleryImages: GalleryImage[] = [
  // ── Canon Store Launch ──
  { src: '/images/gallery/_O6A4349.JPG.jpeg', alt: 'Canon Authorized Dealer storefront with red and white balloon arch and leadership team', caption: 'Canon Authorized Dealer — Leadership at the Storefront', tag: 'Exterior', event: 'canon' },
  { src: '/images/gallery/_O6A4329.JPG.jpeg', alt: 'Full team group photo at Canon Authorized Dealer storefront with red carpet and balloons', caption: 'Canon Store Grand Opening — Team Photo', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4346.JPG.jpeg', alt: 'Team group photo on red carpet at Canon Authorized Dealer entrance', caption: 'Canon Store Team — Red Carpet Moment', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4275.JPG.jpeg', alt: 'Ribbon cutting ceremony at Canon Store with VIP guests and red decorations', caption: 'Grand Inauguration — Ribbon Cutting', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4312.JPG.jpeg', alt: 'Viab Tech and Canon team group photo inside Canon showroom', caption: 'Viab Tech × Canon — Inside the Showroom', tag: 'Team', event: 'canon' },
  { src: '/images/gallery/_O6A4137.JPG.jpeg', alt: 'Canon branded reception desk with Canon logo signage', caption: 'Canon Reception Desk & Service Center', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4195.JPG.jpeg', alt: 'Canon showroom interior with Canon reception desk and photo studio area', caption: 'Canon Store Interior — Full Overview', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4188.JPG.jpeg', alt: 'Canon camera display cabinet with EOS R50, RF lenses, and XA60B', caption: 'Canon Camera & Lens Display Cabinet', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4142.JPG.jpeg', alt: 'Canon toner and consumables display with imageFORMULA products', caption: 'Canon Toner & Consumables Display', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4200.JPG.jpeg', alt: 'Canon imagePROGRAF large format printers and imageFORCE series lineup', caption: 'Canon Printer Lineup — Performance Reimagined', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4245.JPG.jpeg', alt: 'Canon representative presenting imageFORCE series to guests', caption: 'Canon Product Showcase — imageFORCE Series', tag: 'Demo', event: 'canon' },
  { src: '/images/gallery/_O6A4174.JPG.jpeg', alt: 'VIP guests at Canon Store examining EOS R50 camera at product counter', caption: 'VIP Guests — Canon EOS R50 Hands-On', tag: 'Demo', event: 'canon' },
  { src: '/images/gallery/_O6A4138.JPG.jpeg', alt: 'Canon Store showroom with large format printers on display', caption: 'Canon Showroom — Large Format Solutions', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4139.JPG.jpeg', alt: 'Canon Store printer and imaging product displays', caption: 'Canon Product Wall — Printers & Imaging', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4141.JPG.jpeg', alt: 'Canon Store accessories and consumables section', caption: 'Accessories & Consumables Section', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4175_1.JPG.jpeg', alt: 'Canon showroom display area with product lineup', caption: 'Canon Showroom Display Area', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4201.JPG.jpeg', alt: 'Canon printer lineup close-up with wide format plotters', caption: 'Canon Wide Format Plotters On Display', tag: 'Products', event: 'canon' },
  { src: '/images/gallery/_O6A4246.JPG.jpeg', alt: 'Canon product demo for guests at launch event', caption: 'Live Product Demo for Guests', tag: 'Demo', event: 'canon' },
  { src: '/images/gallery/_O6A4277.JPG.jpeg', alt: 'Guests arriving at Canon Authorized Dealer launch event', caption: 'Guests Arriving at the Grand Opening', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4279.JPG.jpeg', alt: 'Red carpet entrance at Canon store launch with balloon decorations', caption: 'Red Carpet Entrance — Balloon Arch', tag: 'Exterior', event: 'canon' },
  { src: '/images/gallery/_O6A4280.JPG.jpeg', alt: 'VIP and leadership at Canon Store grand opening', caption: 'VIP Guests at the Grand Opening', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4282.JPG.jpeg', alt: 'Canon Store launch celebration moment', caption: 'Canon Launch — Celebration Moment', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4285.JPG.jpeg', alt: 'Canon Store launch event guests mingling', caption: 'Launch Event — Networking', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4288.JPG.jpeg', alt: 'Canon Store guests exploring the showroom', caption: 'Guests Exploring the Canon Showroom', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4289.JPG.jpeg', alt: 'Canon Store launch photo opportunity', caption: 'Canon Store — Photo Opportunity', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4290.JPG.jpeg', alt: 'Canon Store product display and demonstration area', caption: 'Product Display & Demo Zone', tag: 'Demo', event: 'canon' },
  { src: '/images/gallery/_O6A4291.JPG.jpeg', alt: 'Canon Store launch event highlights', caption: 'Canon Launch Highlights', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4292.JPG.jpeg', alt: 'Guests at Canon Authorized Dealer storefront', caption: 'Guests at the Canon Storefront', tag: 'Exterior', event: 'canon' },
  { src: '/images/gallery/_O6A4293.JPG.jpeg', alt: 'Canon Store opening day crowd', caption: 'Opening Day — Excited Crowd', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4295.JPG.jpeg', alt: 'Canon Store launch celebration', caption: 'Canon Store — Launch Celebration', tag: 'Ceremony', event: 'canon' },
  { src: '/images/gallery/_O6A4320.JPG.jpeg', alt: 'Canon Store team and guests group photo', caption: 'Canon Team & Guests — Group Photo', tag: 'Team', event: 'canon' },
  { src: '/images/gallery/_O6A4323.JPG.jpeg', alt: 'Canon Store opening day team photo', caption: 'Opening Day — Team Photo', tag: 'Team', event: 'canon' },
  { src: '/images/gallery/_O6A4333.JPG.jpeg', alt: 'Canon Store exterior with Canon branding', caption: 'Canon Authorized Dealer — Exterior View', tag: 'Exterior', event: 'canon' },
  { src: '/images/gallery/_O6A4341.JPG.jpeg', alt: 'Canon Store showroom overview during launch', caption: 'Showroom During the Grand Opening', tag: 'Showroom', event: 'canon' },
  { src: '/images/gallery/_O6A4343.JPG.jpeg', alt: 'Canon Store launch day highlights', caption: 'Launch Day Highlights', tag: 'Ceremony', event: 'canon' },

  // ── Epson Experience Zone Launch ──
  { src: '/images/gallery/1.jpeg', alt: 'Epson Experience Centre showroom with printers and products on display', caption: 'State-of-the-Art Showroom Interior', tag: 'Showroom', event: 'epson' },
  { src: '/images/gallery/2.jpeg', alt: 'Epson Experience Zone & Service Centre exterior with signage', caption: 'Epson Experience Zone — Exterior', tag: 'Exterior', event: 'epson' },
  { src: '/images/gallery/3.jpeg', alt: 'Showroom interior with Epson 50 Years celebration display', caption: 'Celebrating 50 Years of Epson Brand', tag: 'Milestone', event: 'epson' },
  { src: '/images/gallery/4.jpeg', alt: 'Viab Tech and Epson celebrating 50 years with product displays', caption: '50 Years of Epson — 100 Million EcoTank Sold', tag: 'Milestone', event: 'epson' },
  { src: '/images/gallery/5.jpeg', alt: 'Cake cutting ceremony with Epson and Viab Tech team', caption: 'Grand Inauguration — Cake Cutting Ceremony', tag: 'Ceremony', event: 'epson' },
  { src: '/images/gallery/6.jpeg', alt: 'VIP guests and leadership at the Epson service centre launch', caption: 'VIP Guests & Leadership', tag: 'Ceremony', event: 'epson' },
  { src: '/images/gallery/WhatsApp Image 2026-04-04 at 5.53.02 PM.jpeg', alt: 'Celebration cake for Epson 50 Years Brand', caption: 'Epson 50 Years — Celebration Cake', tag: 'Milestone', event: 'epson' },
];

type EventTab = 'canon' | 'epson';

const eventConfig: Record<EventTab, { label: string; badge: string; title: string; titleHighlight: string; subtitle: string; accent: string }> = {
  canon: {
    label: 'Canon Store',
    badge: 'Canon Store Gallery',
    title: 'Canon Store',
    titleHighlight: 'Grand Opening',
    subtitle: 'Explore the highlights from our official Canon Authorized Dealer store launch — from the red-carpet ribbon cutting to the stunning showroom reveal.',
    accent: '#e4002b',
  },
  epson: {
    label: 'Epson Centre',
    badge: 'Grand Opening Gallery',
    title: 'Epson Experience Zone',
    titleHighlight: 'Launch Event',
    subtitle: "Revisit the grand inauguration of East Africa's first Epson Experience Zone & Service Centre.",
    accent: '#0066b3',
  },
};

export default function EventGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeEvent, setActiveEvent] = useState<EventTab>('canon');
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const config = eventConfig[activeEvent];

  const eventImages = galleryImages.filter((img) => img.event === activeEvent);
  const uniqueTags = ['All', ...Array.from(new Set(eventImages.map((img) => img.tag)))];
  const filteredImages = activeFilter === 'All' ? eventImages : eventImages.filter((img) => img.tag === activeFilter);

  // Reset filter when switching events
  const switchEvent = (ev: EventTab) => {
    if (ev === activeEvent) return;
    setActiveEvent(ev);
    setActiveFilter('All');
    setLightboxIndex(null);
    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0 });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reset visibility on filter/event change for animation
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeFilter, activeEvent]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = useCallback(() =>
    setLightboxIndex((prev) => prev !== null ? (prev + 1) % filteredImages.length : null), [filteredImages.length]);
  const goPrev = useCallback(() =>
    setLightboxIndex((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null), [filteredImages.length]);

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

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 450 : 300;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: window.innerWidth > 768 ? 450 : 300, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, lightboxIndex, filteredImages]);

  return (
    <section className="py-20 bg-gradient-to-b from-[#f0f7fa] via-white to-[#f8fbff] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full mx-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ── Event Tab Switcher ── */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {(Object.keys(eventConfig) as EventTab[]).map((ev) => (
              <button
                key={ev}
                onClick={() => switchEvent(ev)}
                className={`relative px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-400 ${
                  ev === activeEvent
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 hover:text-gray-700'
                }`}
                style={
                  ev === activeEvent
                    ? { background: `linear-gradient(135deg, ${eventConfig[ev].accent}dd, ${eventConfig[ev].accent}88)`, boxShadow: `0 4px 24px ${eventConfig[ev].accent}30` }
                    : undefined
                }
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${ev === activeEvent ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                  {eventConfig[ev].label}
                </span>
              </button>
            ))}
          </div>

          {/* ── Header ── */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 transition-colors duration-500"
              style={{ backgroundColor: `${config.accent}15`, color: config.accent }}
            >
              <Sparkles size={13} /> {config.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary leading-tight">
              {config.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${config.accent}, ${activeEvent === 'canon' ? '#ff6b6b' : '#0fbcb3'})` }}>
                {config.titleHighlight}
              </span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto text-base sm:text-lg">{config.subtitle}</p>
          </div>

          {/* ── Filter pills ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {uniqueTags.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'text-white shadow-md'
                    : 'bg-white text-text-secondary border border-border hover:border-primary/30 hover:text-primary'
                }`}
                style={activeFilter === filter ? { backgroundColor: config.accent, boxShadow: `0 4px 12px ${config.accent}30` } : undefined}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative group">
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-primary shadow-xl border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-primary shadow-xl border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 lg:px-12 pb-12 pt-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {filteredImages.map((img, index) => (
              <button
                key={`${img.event}-${img.src}`}
                className="flex-none snap-center gallery-card relative overflow-hidden rounded-2xl group cursor-pointer w-[80vw] sm:w-[350px] md:w-[420px] h-[250px] sm:h-[300px]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
                }}
                onClick={() => openLightbox(index)}
                aria-label={`View: ${img.caption}`}
              >
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 80vw, 420px" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: `${config.accent}20` }} />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {img.tag}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn size={14} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white text-sm sm:text-base font-semibold leading-snug drop-shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-left">
                    {img.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Photo count */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-border" />
            <span className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
              <Camera size={13} /> {filteredImages.length} Photos from the {config.label} Launch
            </span>
            <div className="h-px w-12 bg-border" />
          </div>
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center" onClick={closeLightbox} style={{ animation: 'fadeIn 0.2s ease' }}>
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
            <span className="text-white/60 text-sm font-medium">{lightboxIndex + 1} / {filteredImages.length}</span>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" onClick={closeLightbox} aria-label="Close lightbox"><X size={18} /></button>
          </div>

          <button className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-20 hover:scale-110" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image"><ChevronLeft size={22} /></button>
          <button className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-20 hover:scale-110" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image"><ChevronRight size={22} /></button>

          <div className="flex flex-col items-center w-full max-w-6xl mx-4 gap-4" onClick={(e) => e.stopPropagation()} style={{ animation: 'scaleIn 0.25s ease' }}>
            <div className="relative w-full" style={{ maxHeight: '65vh' }}>
              <Image src={filteredImages[lightboxIndex].src} alt={filteredImages[lightboxIndex].alt} width={1400} height={900} className="object-contain w-full h-full max-h-[65vh] rounded-xl" priority />
            </div>
            <div className="text-center">
              <p className="text-white text-base sm:text-lg font-semibold">{filteredImages[lightboxIndex].caption}</p>
              <p className="text-white/40 text-xs mt-1 flex items-center justify-center gap-1.5"><Camera size={11} /> {filteredImages[lightboxIndex].tag} • Use arrow keys to navigate</p>
            </div>
            <div className="flex justify-center gap-2 px-4 flex-wrap max-h-[80px] overflow-y-auto">
              {filteredImages.slice(Math.max(0, lightboxIndex - 4), Math.min(filteredImages.length, lightboxIndex + 5)).map((img, i) => {
                const realIdx = Math.max(0, lightboxIndex - 4) + i;
                return (
                  <button key={img.src} onClick={(e) => { e.stopPropagation(); setLightboxIndex(realIdx); }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 ${realIdx === lightboxIndex ? 'ring-2 ring-primary scale-110 opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="56px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          `}</style>
        </div>,
        document.body
      )}
    </section>
  );
}
