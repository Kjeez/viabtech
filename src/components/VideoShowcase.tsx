'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface LaunchEvent {
  id: string;
  badge: string;
  title: JSX.Element;
  subtitle: string;
  tags: string[];
  videoSrc: string;
  poster: string;
  overlayLabel: string;
  overlayTitle: string;
  accentColor: string;
}

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const { t } = useLanguage();

  const launches: LaunchEvent[] = [
    {
      id: 'canon',
      badge: 'Canon Store Launch',
      title: (
        <>
          Canon Authorized{' '}
          <span className="text-[#e4002b] block mt-2">Store & Showroom</span>
        </>
      ),
      subtitle:
        'Experience the grand opening of Viab Tech\'s official Canon Store — your destination for cameras, printers, and imaging solutions in Dar es Salaam.',
      tags: ['Grand Opening', 'Canon Products', 'Showroom Tour', 'Live Demo', 'Special Offers'],
      videoSrc: '/videos/launch2.mp4',
      poster: '/images/about-us-team.jpg',
      overlayLabel: 'Viab Tech × Canon',
      overlayTitle: 'Canon Store Grand Opening',
      accentColor: '#e4002b',
    },
    {
      id: 'epson',
      badge: t('video.badge'),
      title: (
        <>
          East Africa&apos;s 1<sup className="text-lg">st</sup> Epson Experience Zone
          <span className="text-primary-light block mt-2"> &amp; Service Centre</span>
        </>
      ),
      subtitle: t('video.subtitle'),
      tags: ['Ribbon Cutting', 'Product Showcase', 'Experience Zone', 'VIP Guests', 'Epson 50 Years'],
      videoSrc: '/videos/launch.mp4',
      poster: '/images/video-poster.jpg',
      overlayLabel: 'Viab Tech × Epson',
      overlayTitle: 'Service Centre Inauguration',
      accentColor: '#0066b3',
    },
  ];

  const current = launches[activeIndex];

  // Reset video state when switching tabs
  const switchTab = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      // Pause current video
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setShowOverlay(true);
      setHasAutoPlayed(false);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Autoplay when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoPlayed && videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setHasAutoPlayed(true);
                setTimeout(() => setShowOverlay(false), 800);
              })
              .catch(() => {
                // Autoplay blocked by browser — that's fine, user can click
              });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAutoPlayed]);

  // Load new source when activeIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setTimeout(() => setShowOverlay(false), 800);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      setShowOverlay(true);
    }
    togglePlay();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-[#0a1628] to-[#0f2039] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: `${current.accentColor}15` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[80px] transition-colors duration-700"
          style={{ backgroundColor: `${current.accentColor}20` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Tab Switcher ── */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {launches.map((launch, idx) => (
            <button
              key={launch.id}
              onClick={() => switchTab(idx)}
              className={`
                relative px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-400
                ${
                  idx === activeIndex
                    ? 'text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
                }
              `}
              style={
                idx === activeIndex
                  ? {
                      background: `linear-gradient(135deg, ${launch.accentColor}dd, ${launch.accentColor}88)`,
                      boxShadow: `0 4px 24px ${launch.accentColor}40`,
                    }
                  : undefined
              }
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-white animate-pulse' : 'bg-gray-500'}`}
                />
                {launch.id === 'canon' ? 'Canon Store' : 'Epson Centre'}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content & Tags */}
          <div className="text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 transition-colors duration-500"
              style={{
                backgroundColor: `${current.accentColor}20`,
                color: current.id === 'canon' ? '#ff6b6b' : 'var(--color-primary-light)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: current.accentColor }}
              />
              {current.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold font-[var(--font-heading)] text-white mb-6 leading-tight">
              {current.title}
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{current.subtitle}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prev/Next nav for mobile */}
            <div className="flex items-center gap-4 mt-8 lg:hidden">
              <button
                onClick={() => switchTab(activeIndex === 0 ? launches.length - 1 : activeIndex - 1)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous launch"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-gray-500 text-sm">
                {activeIndex + 1} / {launches.length}
              </span>
              <button
                onClick={() => switchTab(activeIndex === launches.length - 1 ? 0 : activeIndex + 1)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next launch"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Video player */}
          <div className="relative w-full">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-700"
              style={{ backgroundColor: `${current.accentColor}15` }}
            />

            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border border-white/10"
              style={{ boxShadow: `0 8px 40px ${current.accentColor}25` }}
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-video object-cover"
                poster={current.poster}
                muted={isMuted}
                playsInline
                preload="metadata"
                onEnded={handleVideoEnd}
              >
                <source src={current.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play/Pause Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                style={{ background: showOverlay && !isPlaying ? 'rgba(10,22,40,0.55)' : 'rgba(10,22,40,0.2)' }}
              >
                <button
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPlaying
                      ? 'bg-white/20 backdrop-blur-sm scale-90 hover:scale-100'
                      : 'shadow-lg hover:scale-110 hover:shadow-xl'
                  }`}
                  style={
                    !isPlaying
                      ? {
                          backgroundColor: current.accentColor,
                          boxShadow: `0 4px 20px ${current.accentColor}60`,
                        }
                      : undefined
                  }
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause size={28} className="text-white" />
                  ) : (
                    <Play size={28} className="text-white ml-1" />
                  )}
                </button>

                {/* Video title overlay */}
                {!isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-white text-sm font-semibold tracking-wide uppercase opacity-80">
                      {current.overlayLabel}
                    </p>
                    <p className="text-white text-lg sm:text-xl font-bold">{current.overlayTitle}</p>
                  </div>
                )}
              </div>

              {/* Mute toggle */}
              {isPlaying && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
