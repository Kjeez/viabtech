import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';
import BrandContent from './BrandContent';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';

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

  const products = productsData.filter((p) => p.brand === brandData.name);
  const ld = [
    collectionSchema({
      path: `/brands/${brandData.slug}`,
      name: `${brandData.name} products in Tanzania`,
      description: brandData.description,
      items: products.map((p) => ({ id: p.id, name: p.name })),
    }),
    breadcrumbSchema([
      ['Brands', '/brands'],
      [brandData.name, `/brands/${brandData.slug}`],
    ]),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <BrandContent brandData={brandData} />
    </>
  );
}
