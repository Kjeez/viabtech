import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/schema';
import servicesData from '@/data/services.json';
import { GENERAL_FAQ, faqText } from '@/data/faqs';

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
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([['Service Center', '/service-center']]),
          ...serviceSchema(
            servicesData
              .filter((s) => ['printer-repair', 'warranty-registration', 'spares'].includes(s.id))
              .map((s) => ({ id: s.slug, name: s.title, description: s.description, path: '/service-center' })),
          ),
          faqSchema(faqText(GENERAL_FAQ), '/service-center'),
        ]}
      />
      {children}
    </>
  );
}
