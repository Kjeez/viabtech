import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryContent from './CategoryContent';
import { categories, categoryBySlug, brandList } from '@/data/categories';

const SITE_URL = 'https://www.viabtech.com';

// Only categories that exist in products.json are valid; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = categoryBySlug[slug];
  if (!cat) return {};
  const url = `${SITE_URL}/products/category/${cat.slug}`;
  const brands = brandList(cat.brands);
  const title = `${cat.plural} in Tanzania – ${brands} | Viabtech`;
  const description = `${cat.description} ${cat.count} models available at our Dar es Salaam showrooms.`.slice(0, 300);
  return {
    // absolute: the brand is already in the title, skip the "| Viabtech" template
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Viabtech', locale: 'en_TZ' },
  };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const cat = categoryBySlug[slug];
  if (!cat) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: cat.plural, item: `${SITE_URL}/products/category/${cat.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <CategoryContent slug={slug} />
    </>
  );
}
