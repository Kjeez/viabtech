'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const { t } = useLanguage();

  // Autoplay when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoPlayed && videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              setHasAutoPlayed(true);
              setTimeout(() => setShowOverlay(false), 800);
            }).catch(() => {
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/15 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content & Tags */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary-light text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('video.badge')}
            </div>
            
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold font-[var(--font-heading)] text-white mb-6 leading-tight">
              East Africa&apos;s 1<sup className="text-lg">st</sup> Epson Experience
              <span className="text-primary-light block mt-2"> &amp; Service Centre</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('video.subtitle')}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {['Ribbon Cutting', 'Product Showcase', 'Experience Zone', 'VIP Guests', 'Epson 50 Years'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Video player */}
          <div className="relative w-full">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 cursor-pointer group border border-white/10" onClick={handleVideoClick}>
              <video
                ref={videoRef}
                className="w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-video object-cover"
                poster="/images/video-poster.jpg"
                muted={isMuted}
                playsInline
                preload="metadata"
                onEnded={handleVideoEnd}
              >
                <source src="/videos/launch.mp4" type="video/mp4" />
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
                      : 'bg-primary shadow-lg shadow-primary/40 hover:scale-110 hover:shadow-xl hover:shadow-primary/50'
                  }`}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
                </button>

                {/* Video title overlay */}
                {!isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-white text-sm font-semibold tracking-wide uppercase opacity-80">Viab Tech × Epson</p>
                    <p className="text-white text-lg sm:text-xl font-bold">Service Centre Inauguration</p>
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
