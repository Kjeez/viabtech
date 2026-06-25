import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services – Printer Sales, Repair & Managed Print',
  description:
    'Explore Viabtech\'s full range of services: printer sales & consulting, managed print services, annual maintenance contracts, authorized repair center, toner & consumables, and IT support in Tanzania.',
  keywords: [
    'printer services Tanzania',
    'managed print services',
    'printer repair Tanzania',
    'annual maintenance contract printers',
    'toner consumables Tanzania',
    'IT support Dar es Salaam',
  ],
  openGraph: {
    title: 'Printer Services by Viabtech – Sales, Repair & Managed Print',
    description:
      'From printer sales and repairs to managed print services and AMC contracts — Viabtech offers comprehensive printing solutions across Tanzania.',
    url: 'https://www.viabtech.com/services',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
