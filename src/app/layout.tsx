import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Viabtech – Authorized Canon & Epson Printer Dealer | Tanzania',
    template: '%s | Viabtech',
  },
  description:
    'Viabtech is Tanzania\'s trusted authorized dealer for Canon and Epson printers. We also supply Lenovo and Dell printing solutions with expert sales, repair, and support services across East Africa.',
  keywords: [
    'printer dealer Tanzania',
    'Canon authorized dealer',
    'Epson authorized dealer',
    'printer repair Dar es Salaam',
    'buy printer Tanzania',
    'managed print services',
    'Lenovo printers',
    'Dell printers',
  ],
  openGraph: {
    title: 'Viabtech – Authorized Canon & Epson Printer Dealer | Tanzania',
    description:
      'Tanzania\'s leading authorized dealer for Canon and Epson printers with expert sales, repair, and managed print services.',
    url: 'https://viabtech.co.tz',
    siteName: 'Viabtech',
    locale: 'en_TZ',
    type: 'website',
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
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
