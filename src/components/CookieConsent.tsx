'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Shield } from 'lucide-react';

type ConsentState = 'pending' | 'accepted' | 'declined';

export default function CookieConsent() {
  const [consentState, setConsentState] = useState<ConsentState | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('viabtech_cookie_consent');
    if (stored === 'accepted' || stored === 'declined') {
      setConsentState(stored);
    } else {
      // Show banner after a brief delay for a smoother UX
      const timer = setTimeout(() => {
        setConsentState('pending');
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('viabtech_cookie_consent', 'accepted');
    localStorage.setItem('viabtech_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);
    setTimeout(() => setConsentState('accepted'), 400);
  };

  const handleDecline = () => {
    localStorage.setItem('viabtech_cookie_consent', 'declined');
    localStorage.setItem('viabtech_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);
    setTimeout(() => setConsentState('declined'), 400);
  };

  // Don't render if user already made a choice or state not yet loaded
  if (consentState !== 'pending') return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9998] transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Backdrop blur strip */}
      <div className="bg-[#001738]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={18} className="text-cyan-400" />
              </div>
              <div className="text-sm text-white/80 leading-relaxed">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Shield size={13} className="text-cyan-400" /> Your Privacy Matters
                </p>
                <p>
                  We use cookies to enhance your experience on our website. In compliance with the{' '}
                  <strong className="text-white">Tanzania Personal Data Protection Act (PDPA) 2022</strong>,
                  we require your consent before using non-essential cookies.{' '}
                  <Link href="/privacy#cookie-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-sm font-medium text-white/70 border border-white/20 hover:border-white/40 hover:text-white transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
              >
                Accept All
              </button>
            </div>

            {/* Close (X) button — mobile only */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 sm:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label="Close cookie banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
