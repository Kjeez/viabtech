import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';
import BrandContent from './BrandContent';

const SITE_URL = 'https://www.viabtech.com';

// Unknown brand slugs return a real 404 instead of an empty 200 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return brandsData.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const brandData = brandsData.find((b) => b.slug === slug);
  if (!brandData) return {};
  const url = `${SITE_URL}/brands/${brandData.slug}`;
  const count = productsData.filter((p) => p.brand === brandData.name).length;
  const title = brandData.authorized
    ? `Authorized ${brandData.name} Dealer in Tanzania | Viabtech`
    : `${brandData.name} in Tanzania – Shop at Viabtech, Dar es Salaam`;
  const description = `${brandData.authorized ? `Authorized ${brandData.name} dealer` : `${brandData.name} products`} in Dar es Salaam${count ? ` — ${count} genuine models` : ''} with warranty and delivery across Tanzania. ${brandData.description}`.slice(0, 300);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Viabtech', locale: 'en_TZ' },
  };
}

export default async function BrandSlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const brandData = brandsData.find((b) => b.slug === slug);

  if (!brandData) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${SITE_URL}/brands` },
      { '@type': 'ListItem', position: 3, name: brandData.name, item: `${SITE_URL}/brands/${brandData.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BrandContent brandData={brandData} />
    </>
  );
}
