import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import JsonLd from '@/components/JsonLd';
import { storesSchema } from '@/lib/schema';

// The homepage UI is a client component, so its metadata lives here.
// Title/description come from the root layout defaults; only the canonical is set per page.
export const metadata: Metadata = {
  alternates: { canonical: 'https://www.viabtech.com/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={storesSchema()} />
      <HomePageClient />
    </>
  );
}
