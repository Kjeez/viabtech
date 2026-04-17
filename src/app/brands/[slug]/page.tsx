import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import brandsData from '@/data/brands.json';
import BrandContent from './BrandContent';

export function generateStaticParams() {
  return brandsData.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const brandData = brandsData.find((b) => b.slug === slug);
  if (!brandData) return {};
  return {
    title: `${brandData.name} | Viabtech`,
    description: brandData.description,
  };
}

export default async function BrandSlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const brandData = brandsData.find((b) => b.slug === slug);
  
  if (!brandData) notFound();

  return <BrandContent brandData={brandData} />;
}
