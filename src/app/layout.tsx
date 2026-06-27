import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import StickyQuoteBar from '@/components/StickyQuoteBar';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import CookieConsent from '@/components/CookieConsent';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TDCVVC3M');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1041313038421119');
          fbq('track', 'PageView');`}
        </Script>
        {/* End Meta Pixel */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TDCVVC3M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1041313038421119&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}
        {/* JSON-LD Structured Data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Viabtech',
              legalName: 'VIAB TECH LIMITED',
              url: 'https://www.viabtech.com',
              logo: 'https://www.viabtech.com/images/logo/viabtech-logo.png',
              image: 'https://www.viabtech.com/images/logo/viabtech-logo.png',
              description:
                "Tanzania's trusted authorized reseller for Canon and Epson printers with expert sales, repair, and managed print services.",
              telephone: ['+255745700500', '+255746000786'],
              email: 'info@viabtech.co.tz',
              address: [
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ground Floor, Uhuru Heights, Bibi Titi Mohamed Road',
                  addressLocality: 'Dar es Salaam',
                  addressCountry: 'TZ',
                  postalCode: '105047',
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Plot No 1357/208, Next To Peacock Hotel, Bibi Titi Mohamed Road',
                  addressLocality: 'Dar es Salaam',
                  addressCountry: 'TZ',
                },
              ],
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -6.8106149,
                longitude: 39.2836107,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:30',
                  closes: '17:30',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '14:00',
                },
              ],
              sameAs: [],
              priceRange: '$$',
              areaServed: {
                '@type': 'Country',
                name: 'Tanzania',
              },
              brand: [
                { '@type': 'Brand', name: 'Canon' },
                { '@type': 'Brand', name: 'Epson' },
                { '@type': 'Brand', name: 'Lenovo' },
                { '@type': 'Brand', name: 'Dell' },
                { '@type': 'Brand', name: 'HP' },
              ],
            }),
          }}
        />
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
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
