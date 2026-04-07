'use client';

import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'mobile' }) {
  const { locale, setLocale } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2 px-5 py-3.5">
        <button
          onClick={() => setLocale('en')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            locale === 'en'
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label="Switch to English"
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => setLocale('sw')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            locale === 'sw'
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label="Badilisha kwa Kiswahili"
        >
          🇹🇿 SW
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
      <button
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
          locale === 'en'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLocale('sw')}
        className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
          locale === 'sw'
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Badilisha kwa Kiswahili"
      >
        SW
      </button>
    </div>
  );
}
