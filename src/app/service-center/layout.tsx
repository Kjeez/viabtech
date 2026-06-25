import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Center – Authorized Canon & Epson Repairs',
  description:
    'Viabtech is an authorized service center for Canon and Epson in Tanzania. We offer professional printer, camera, projector, and scanner repairs with genuine parts and fast turnaround in Dar es Salaam.',
  keywords: [
    'printer repair Tanzania',
    'Canon service center Dar es Salaam',
    'Epson service center Tanzania',
    'printer maintenance Tanzania',
    'camera repair Tanzania',
    'projector repair Tanzania',
  ],
  openGraph: {
    title: 'Authorized Canon & Epson Service Center – Viabtech Tanzania',
    description:
      'Professional printer, camera, and projector repairs with genuine parts. Authorized Canon & Epson service center in Dar es Salaam.',
    url: 'https://www.viabtech.com/service-center',
  },
  alternates: {
    canonical: 'https://www.viabtech.com/service-center',
  },
};

export default function ServiceCenterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
