import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – Get a Quote or Service Request',
  description:
    'Reach Viabtech for printer sales, repairs, and managed print services in Tanzania. Visit our Canon & Epson showrooms in Dar es Salaam or request a quote online. Call +255 745 700 500.',
  keywords: [
    'contact Viabtech',
    'printer repair Dar es Salaam',
    'buy printer Tanzania',
    'Canon showroom Tanzania',
    'Epson showroom Dar es Salaam',
    'printer quote Tanzania',
  ],
  openGraph: {
    title: 'Contact Viabtech – Printer Sales & Service in Tanzania',
    description:
      'Get in touch for printer sales, repairs, and managed print services. Visit our showrooms in Dar es Salaam or send an inquiry online.',
    url: 'https://www.viabtech.com/contact',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
