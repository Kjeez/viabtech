/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Printer, ArrowLeft, Package, Search, X } from 'lucide-react';
import productsData from '@/data/products.json';

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

export default function CategoryContent({ slug }: { slug: string }) {
  const [search, setSearch] = useState('');

  const categoryName = categoryMap[slug] ?? '';
  const description = categoryDescriptions[categoryName] ?? `Explore our complete ${categoryName} range.`;

  const allProducts = useMemo(
    () => productsData.filter((p) => p.category === categoryName),
    [categoryName]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allProducts;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [search, allProducts]);

  const otherCategories = Object.entries(categoryMap)
    .filter(([s]) => s !== slug)
    .slice(0, 6);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0a1628] py-16 sm:py-20">
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
            <span>{allProducts.length} products available</span>
          </div>
        </div>
      </section>

      {/* ── Search + Grid ── */}
      <section className="py-12 bg-[#f8fbff] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Back + Search row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm transition-colors group shrink-0">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to All Products
            </Link>

            {/* Search bar */}
            <div className="relative w-full sm:max-w-sm ml-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search ${categoryName}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-gray-400 mb-6 px-1">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {allProducts.length} products
            {search && <span> for &ldquo;<span className="text-primary">{search}</span>&rdquo;</span>}
          </p>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product) => (
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
              <Search size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0f1c2e] mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">No products match &ldquo;{search}&rdquo; in {categoryName}</p>
              <button
                onClick={() => setSearch('')}
                className="px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Browse Other Categories ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold font-[var(--font-heading)] text-[#0f1c2e] mb-6">Browse Other Categories</h2>
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
