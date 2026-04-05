'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/gallery/1.jpeg',
    alt: 'Epson Experience Centre showroom with printers and products on display',
    caption: 'State-of-the-Art Showroom Interior',
  },
  {
    src: '/images/gallery/2.jpeg',
    alt: 'Epson Experience & Service Centre exterior with signage',
    caption: 'Epson Experience & Service Centre — Exterior',
  },
  {
    src: '/images/gallery/3.jpeg',
    alt: 'Showroom interior with Epson 50 Years celebration display and product lineup',
    caption: 'Celebrating 50 Years of Epson Brand',
  },
  {
    src: '/images/gallery/4.jpeg',
    alt: 'Viab Tech and Epson celebrating 50 years banner with product displays',
    caption: '50 Years of Epson — 100 Million EcoTank Sold',
  },
  {
    src: '/images/gallery/5.jpeg',
    alt: 'Cake cutting ceremony with Epson and Viab Tech team celebrating the launch',
    caption: 'Grand Inauguration — Cake Cutting Ceremony',
  },
  {
    src: '/images/gallery/6.jpeg',
    alt: 'VIP guests and leadership at the Epson service centre launch',
    caption: 'VIP Guests & Leadership',
  },
  {
    src: '/images/gallery/WhatsApp Image 2026-04-04 at 5.53.02 PM.jpeg',
    alt: 'Celebration cake for Epson 50 Years Brand and 100 Million milestone',
    caption: 'Epson 50 Years — Celebration Cake',
  },
];

export default function EventGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );

  return (
    <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge mx-auto">
            <Camera size={12} /> Event Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
            Service Centre <span className="text-primary">Launch</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Highlights from the grand inauguration of East Africa&apos;s first Epson Experience &amp; Service Centre.
          </p>
        </div>

        {/* Gallery grid — masonry-style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((img, index) => (
            <button
              key={img.src}
              className={`gallery-item relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0
                  ? 'col-span-2 row-span-2'
                  : ''
              }`}
              onClick={() => openLightbox(index)}
              aria-label={`View: ${img.caption}`}
            >
              <div
                className={`relative w-full ${
                  index === 0 ? 'aspect-square' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    index === 0
                      ? '(max-width: 768px) 100vw, 50vw'
                      : '(max-width: 768px) 50vw, 25vw'
                  }
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-sm font-medium p-4 leading-snug">
                  {img.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-white text-base font-medium">
                {galleryImages[lightboxIndex].caption}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
