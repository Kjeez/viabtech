import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Brands – Authorized Canon & Epson Dealer, plus HP, Lenovo, Dell & More',
  description:
    'Viabtech is the authorized Canon and Epson reseller and service center in Tanzania, and also sells HP, Lenovo, Dell, DJI, Godox, Unomat, APC, SanDisk and Lexar. Genuine products with full warranty and support.',
  keywords: [
    'authorized Canon dealer Tanzania',
    'authorized Epson dealer Tanzania',
    'Lenovo partner Tanzania',
    'Dell partner Tanzania',
    'HP partner Tanzania',
    'DJI dealer Tanzania',
  ],
  openGraph: {
    title: 'Our Brands – Viabtech Tanzania',
    description:
      'Authorized Canon and Epson reseller, plus HP, Lenovo, Dell, DJI, Godox and more. Genuine products, full warranty.',
    url: 'https://www.viabtech.com/brands',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/brands',
  },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
