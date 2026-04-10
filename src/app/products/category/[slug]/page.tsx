/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ChevronRight, Printer, ArrowLeft, Package } from 'lucide-react';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// All valid category slugs
const categoryMap: Record<string, string> = {
  'office-printer': 'Office Printer',
  'plotter': 'Plotter',
  'graphic-printer': 'Graphic Printer',
  'photo-printer': 'Photo Printer',
  'label-printer': 'Label Printer',
  'scanner': 'Scanner',
  'inkjet-media': 'Inkjet Media',
  'ink-cartridges': 'Ink Cartridges',
  'printer-maintenance-box': 'Printer Maintenance Box',
  'camera': 'Camera',
  'lens': 'Lens',
  'accessory': 'Accessory',
  'projector': 'Projector',
};

const categoryDescriptions: Record<string, string> = {
  'Office Printer': 'Discover top-quality office printers from leading brands, designed to enhance productivity and efficiency for businesses of all sizes.',
  'Plotter': 'Professional large format plotters for CAD, engineering, architectural drawings, and technical printing needs.',
  'Graphic Printer': 'High-performance graphic printers for professional photography, fine art reproduction, and commercial printing.',
  'Photo Printer': 'Premium photo printers delivering stunning, gallery-quality prints with exceptional color accuracy.',
  'Label Printer': 'Commercial and industrial label printers for on-demand color label production, barcode printing, and asset management.',
  'Scanner': 'High-speed document and photo scanners for offices, businesses, and professional digitization workflows.',
  'Inkjet Media': 'Premium inkjet media including fine art papers, canvas, and specialty substrates for professional printing.',
  'Ink Cartridges': 'Genuine ink cartridges and consumables for Epson printers — original quality, reliable performance.',
  'Printer Maintenance Box': 'Genuine maintenance boxes and accessories to keep your printers running at peak performance.',
  'Camera': 'Professional Canon cameras for photography and videography — from DSLRs to mirrorless systems.',
  'Lens': 'Canon RF and EF lenses for every shooting scenario — wide-angle, telephoto, macro, and prime.',
  'Accessory': 'Essential printer and camera accessories, parts, and gear for your professional setup.',
  'Projector': 'Epson projectors for boardrooms, classrooms, and home cinema — vivid colors, brilliant presentations.',
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const categoryName = categoryMap[slug];
  if (!categoryName) return {};
  return {
    title: `${categoryName} Collection | Viabtech`,
    description: categoryDescriptions[categoryName] || `Browse our ${categoryName} collection.`,
  };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const categoryName = categoryMap[slug];
  if (!categoryName) notFound();

  const products = productsData.filter((p) => p.category === categoryName);
  const description = categoryDescriptions[categoryName] || `Explore our complete ${categoryName} range.`;

  // Related categories (exclude current)
  const otherCategories = Object.entries(categoryMap)
    .filter(([s]) => s !== slug)
    .slice(0, 6);

  return (
    <>
      {/* ── Hero / Breadcrumb ── */}
      <section className="relative overflow-hidden bg-[#0a1628] py-16 sm:py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">🏠 Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{categoryName}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-white mb-4">
            Our <span className="text-primary-light">{categoryName}</span> Collection
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Package size={16} className="text-primary-light" />
            <span>{products.length} products available</span>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-12 bg-[#f8fbff] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link href="/products" className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to All Products
          </Link>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-[0_20px_50px_rgba(0,159,227,0.12)] hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col"
                >
                  <div className="h-56 m-2 mb-0 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden group-hover:from-white group-hover:to-[#dbeafe] transition-colors">
                    {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Printer size={56} className="text-primary/15 group-hover:text-primary/30 transition-colors" />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider">{product.brand}</span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] uppercase font-bold tracking-wider">{product.type}</span>
                    </div>
                    <h3 className="font-bold text-[#0f1c2e] group-hover:text-primary transition-colors mb-2 line-clamp-2 text-base leading-snug">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-5 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all bg-primary/5 px-4 py-2 rounded-full">
                        View Details <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
              <Printer size={56} className="text-gray-300 mx-auto mb-5" />
              <h3 className="text-xl font-bold text-[#0f1c2e] mb-2">No products in this category</h3>
              <p className="text-gray-500">Check back soon or browse other categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Browse Other Categories ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0f1c2e] mb-6">
            Browse Other Categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map(([catSlug, catName]) => {
              const count = productsData.filter(p => p.category === catName).length;
              return (
                <Link
                  key={catSlug}
                  href={`/products/category/${catSlug}`}
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#f8fbff] border border-gray-100 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                >
                  <div>
                    <span className="font-semibold text-[#0f1c2e] group-hover:text-primary transition-colors">{catName}</span>
                    <span className="block text-xs text-gray-400 mt-0.5">{count} products</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
