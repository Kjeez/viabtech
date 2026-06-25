import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products – Canon, Epson, Lenovo & Dell Printers',
  description:
    'Browse Viabtech\'s complete catalog of printers, plotters, projectors, cameras, scanners, and consumables from Canon, Epson, Lenovo, Dell, and HP. Authorized genuine products with warranty in Tanzania.',
  keywords: [
    'buy printer Tanzania',
    'Canon printers Tanzania',
    'Epson printers Tanzania',
    'office printer Dar es Salaam',
    'plotter Tanzania',
    'projector Tanzania',
    'camera Tanzania',
    'ink cartridges Tanzania',
  ],
  openGraph: {
    title: 'Shop Printers & Imaging Products – Viabtech Tanzania',
    description:
      'Explore our full range of authorized Canon, Epson, Lenovo, Dell, and HP products. Printers, plotters, projectors, cameras, and more.',
    url: 'https://www.viabtech.com/products',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
