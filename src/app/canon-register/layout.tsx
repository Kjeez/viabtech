import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canon Product Registration | VIAB TECH – Authorized Canon Dealer Tanzania',
  description:
    'Register your Canon product with VIAB TECH, the authorized Canon dealer in Tanzania. Get 3 months free service on your Canon printer, copier, or imaging device.',
  keywords: [
    'Canon product registration',
    'Canon warranty Tanzania',
    'Canon printer registration',
    'Canon service center Dar es Salaam',
    'Canon authorized dealer Tanzania',
    'VIAB TECH Canon',
    'Canon eMaintenance',
    'Canon warranty policy',
  ],
  openGraph: {
    title: 'Canon Product Registration | VIAB TECH Tanzania',
    description:
      'Register your Canon product and enjoy 3 months of free service. Authorized Canon dealer in Dar es Salaam, Tanzania.',
    url: 'https://viabtech.co.tz/canon-register',
    siteName: 'VIAB TECH – Canon Authorized Dealer',
    locale: 'en_TZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://viabtech.co.tz/canon-register',
  },
};

export default function CanonRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
