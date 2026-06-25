import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Our Story, Mission & Team',
  description:
    'Learn about Viabtech – Tanzania\'s authorized Canon & Epson dealer since 2015. Meet our team, see our certifications, and discover our mission to deliver world-class printing solutions across East Africa.',
  keywords: [
    'about Viabtech',
    'printer company Tanzania',
    'Canon authorized dealer Tanzania',
    'Epson authorized dealer Tanzania',
    'printing solutions East Africa',
  ],
  openGraph: {
    title: 'About Viabtech – Authorized Printer Dealer in Tanzania',
    description:
      'Tanzania\'s trusted authorized reseller for Canon and Epson. Certified, experienced, and committed to excellence since 2015.',
    url: 'https://www.viabtech.com/about',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
