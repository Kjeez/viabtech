'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import ServiceInquiryModal from '@/components/ServiceInquiryModal';

const HIDDEN_PATHS = ['/canon-register', '/services', '/service-center'];

export default function StickyQuoteBar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past 600px (past hero section)
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <>
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        subject=""
        subSubject=""
        showSubjectSelect
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <p className="text-white/80 text-sm font-medium hidden sm:block">
              {t('sticky.text')}
            </p>
            <div className="flex items-center gap-3 mr-auto sm:ml-auto sm:mr-0">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0a1628] font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {t('sticky.cta')}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Dismiss quote bar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
