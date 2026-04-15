'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SliderImage {
  src: string;
  alt: string;
  /** Natural width of the image (used for sizing) */
  width?: number;
  /** Natural height of the image (used for sizing) */
  height?: number;
}

interface ImageSliderProps {
  images: SliderImage[];
  /** Auto-play interval in ms (default: 5000, set 0 to disable) */
  autoPlayInterval?: number;
  /** Show navigation arrows (default: true) */
  showArrows?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Rounded corners class (default: 'rounded-2xl') */
  rounded?: string;
  /** Additional container className */
  className?: string;
  /** Unique ID for accessibility */
  id?: string;
}

export default function ImageSlider({
  images,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  rounded = 'rounded-2xl',
  className = '',
  id,
}: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused || total <= 1) return;
    timerRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval, isPaused, total, next]);

  // Touch/swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipe = 50;
    if (Math.abs(distance) >= minSwipe) {
      distance > 0 ? next() : prev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  if (!images || images.length === 0) return null;

  // Use the first image's dimensions to determine the natural aspect ratio
  const refImage = images[0];
  const imgW = refImage.width || 1920;
  const imgH = refImage.height || 886;

  return (
    <div
      id={id}
      className={`image-slider group relative w-full overflow-hidden ${rounded} ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image slider"
    >
      {/* Slides container — height set by the first (visible) image naturally */}
      <div className="relative w-full">
        {images.map((img, i) => {
          const w = img.width || imgW;
          const h = img.height || imgH;
          return (
            <div
              key={img.src}
              className={`${i === 0 ? 'relative' : 'absolute inset-0'} w-full transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                i === current
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-100 z-0'
              }`}
              aria-hidden={i !== current}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={w}
                height={h}
                sizes="100vw"
                className="w-full h-auto block"
                priority={i === 0}
              />
            </div>
          );
        })}

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Navigation arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Slide counter badge */}
      {total > 1 && (
        <div className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {current + 1} / {total}
        </div>
      )}
    </div>
  );
}
