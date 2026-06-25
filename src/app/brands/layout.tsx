import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Brands – Authorized Canon, Epson, Lenovo, Dell & More',
  description:
    'Viabtech is an authorized partner for Canon, Epson, Lenovo, Dell, HP, DJI, Godox, APC, SanDisk, and Lexar in Tanzania. Explore genuine products with full warranty and support.',
  keywords: [
    'authorized Canon dealer Tanzania',
    'authorized Epson dealer Tanzania',
    'Lenovo partner Tanzania',
    'Dell partner Tanzania',
    'HP partner Tanzania',
    'DJI dealer Tanzania',
  ],
  openGraph: {
    title: 'Authorized Brand Partners – Viabtech Tanzania',
    description:
      'Explore our authorized partnerships with Canon, Epson, Lenovo, Dell, HP, DJI, Godox, and more. Genuine products, full warranty.',
    url: 'https://www.viabtech.com/brands',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/brands',
  },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
