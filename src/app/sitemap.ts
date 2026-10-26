import type { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';
import blogData from '@/data/blog.json';
import { categories } from '@/data/categories';

const BASE_URL = 'https://www.viabtech.com';

// lastModified is left out where we don't know a real change date:
// stamping every URL with the build time tells Google nothing and gets ignored.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/printer-shop-dar-es-salaam`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/service-center`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/brands`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/canon-register`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Only categories that have a real page (same list the category route is built from)
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/products/category/${cat.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const brandPages: MetadataRoute.Sitemap = brandsData.map((brand) => ({
    url: `${BASE_URL}/brands/${brand.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogData.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  const productPages: MetadataRoute.Sitemap = productsData.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...brandPages, ...blogPages, ...productPages];
}
