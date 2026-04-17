/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Printer, ChevronRight, X, ShieldCheck, Star } from 'lucide-react';
import productsData from '@/data/products.json';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BrandContent({ brandData }: { brandData: any }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const BATCH_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const observerTarget = useRef<HTMLDivElement>(null);

  const brandName = brandData.name;
  
  const allProducts = useMemo(
    () => productsData.filter((p) => p.brand === brandName && !p.isConsumable),
    [brandName]
  );
  
  const consumableProducts = useMemo(
    () => productsData.filter((p) => p.brand === brandName && p.isConsumable),
    [brandName]
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

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search, allProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filtered.length) {
          setVisibleCount((prev) => prev + BATCH_SIZE);
        }
      },
      { rootMargin: '300px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    const currentTarget = observerTarget.current;
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [visibleCount, filtered.length]);

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <>
      <section className="page-hero py-20 bg-[#0a1628] relative overflow-hidden" style={{ backgroundColor: brandData.heroColor ? `${brandData.heroColor}15` : '#0a1628' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] to-transparent z-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 flex flex-col md:flex-row items-center gap-8 text-white mt-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-4 flex items-center justify-center shrink-0 shadow-xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brandData.logo} alt={brandData.name} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light mb-4 text-sm font-semibold border border-primary/20">
              <ShieldCheck size={16} /> {brandData.tagline || `${brandData.name} Authorized Dealer`}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] mb-4 text-white">{brandData.name}</h1>
            <p className="text-gray-300 text-lg max-w-3xl mb-6">{brandData.description}</p>
            
            <div className="flex flex-wrap gap-4">
               {brandData.highlights?.map((h: string) => (
                 <div key={h} className="flex items-center gap-2 text-sm text-gray-300">
                   <Star size={16} className="text-primary shrink-0" /> {h}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Grid ── */}
      <section className="py-12 bg-[#f8fbff] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="relative w-full">
              <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search ${brandName} products...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-10 py-4 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <p className="text-sm font-medium text-gray-500 mb-8 px-2">
            Showing <span className="font-semibold text-gray-700">{visibleProducts.length}</span> of {filtered.length} products
            {search && <span> for &ldquo;<span className="text-primary">{search}</span>&rdquo;</span>}
          </p>

          {filtered.length > 0 ? (
            <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProducts.map((product) => (
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
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] uppercase font-bold tracking-wider">{product.category}</span>
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
            {visibleCount < filtered.length && (
              <div ref={observerTarget} className="mt-12 flex justify-center py-10 w-full col-span-full">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
              <Printer size={56} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0f1c2e] mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">No products match &ldquo;{search}&rdquo; in {brandName}</p>
              <button
                onClick={() => setSearch('')}
                className="px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Consumables for this brand if any */}
          {!search && consumableProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f1c2e]">{brandName} Consumables</h3>
                  <p className="text-gray-500 mt-1">Genuine {brandName} ink, supplies and accessories</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {consumableProducts.slice(0, 10).map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                    <div className="h-36 flex items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden">
                      {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-400"
                        />
                      ) : (
                        <Printer size={32} className="text-primary/15" />
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <h4 className="font-semibold text-[#0f1c2e] group-hover:text-primary transition-colors text-xs leading-snug line-clamp-2">{product.name}</h4>
                      <span className="mt-2 text-[10px] text-primary font-bold flex items-center gap-1">
                        View <ChevronRight size={10} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {consumableProducts.length > 10 && (
                <div className="mt-8 text-center">
                  <Link href={`/products?category=Ink%20Cartridges&brand=${brandName}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                    View All {consumableProducts.length} Consumables <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
