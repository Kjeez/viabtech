import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import { LanguageProvider } from '@/i18n/LanguageContext';

export const metadata: Metadata = {
  title: {
    default: 'Viabtech – Authorized Canon & Epson Printer Dealer | Tanzania',
    template: '%s | Viabtech',
  },
  description:
    "Viabtech is Tanzania's trusted authorized reseller for Canon and Epson printers. We also supply Lenovo and Dell printing solutions with expert sales, repair, and support services across East Africa.",
  keywords: [
    'printer dealer Tanzania',
    'Canon authorized reseller',
    'Epson authorized reseller',
    'printer repair Dar es Salaam',
    'buy printer Tanzania',
    'managed print services',
    'Lenovo printers',
    'Dell printers',
    'Canon cameras Tanzania',
    'Epson projectors Tanzania',
  ],
  openGraph: {
    title: 'Viabtech – Authorized Canon & Epson Printer Dealer | Tanzania',
    description:
      "Tanzania's leading authorized reseller for Canon and Epson printers with expert sales, repair, and managed print services.",
    url: 'https://viabtech.co.tz',
    siteName: 'Viabtech',
    locale: 'en_TZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://viabtech.co.tz',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0057B8" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1" role="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingContactButtons />
          <StickyQuoteBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
