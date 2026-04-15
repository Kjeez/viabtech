'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Printer, ChevronRight, X, Package, Droplets, Wrench } from 'lucide-react';
import productsData from '@/data/products.json';
import { useLanguage } from '@/i18n/LanguageContext';
import ImageSlider from '@/components/ImageSlider';
import { slider1Images, slider2Images, slider3Images } from '@/data/sliderData';

// Separate main products from consumables
const mainProducts = productsData.filter((p) => !p.isConsumable);
const consumableProducts = productsData.filter((p) => p.isConsumable);

const mainCategories = ['All', ...Array.from(new Set(mainProducts.map((p) => p.category)))];
const brands = ['All', ...Array.from(new Set(mainProducts.map((p) => p.brand)))];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fbff]"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showConsumables, setShowConsumables] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const observerTarget = useRef<HTMLDivElement>(null);
  const BATCH_SIZE = 24;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && mainCategories.includes(cat)) {
      setSelectedCategory(cat);
      setShowFilters(true);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return mainProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      return matchSearch && matchCategory && matchBrand;
    });
  }, [search, selectedCategory, selectedBrand]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search, selectedCategory, selectedBrand]);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filtered.length) {
          setVisibleCount((prev) => prev + BATCH_SIZE);
        }
      },
      { rootMargin: '300px' } // Load well before the user hits the absolute bottom
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


  const filteredConsumables = useMemo(() => {
    if (!search) return consumableProducts;
    return consumableProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const activeFilters = [selectedCategory, selectedBrand].filter((f) => f !== 'All').length;
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero py-20 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('products.badge')}</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] mb-4 text-white">{t('products.title')}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t('products.subtitle')}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <Package size={16} className="text-primary-light" />
            <span>{mainProducts.length} products + {consumableProducts.length} consumables</span>
          </div>
        </div>
      </section>

      <ImageSlider images={slider1Images} autoPlayInterval={5000} rounded="rounded-none" />

      {/* ── Browse by Category ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-[#0f1c2e]">
              Browse by <span className="text-primary">Category</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Select a category to explore our full range</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[
              { name: 'Office Printer', slug: 'office-printer', img: '/images/products/epson_africa/Epson_EcoTank_L6170_c5ff4507.webp' },
              { name: 'Plotter', slug: 'plotter', img: '/images/products/epson_africa/Epson_SureColor_SC-T3100_-_Wireless_Printer_with_stand_d0e2f1db.webp' },
              { name: 'Projector', slug: 'projector', img: '/images/products/epson_africa/Epson_EB-1485Fi_c232ddcc.webp' },
              { name: 'Scanner', slug: 'scanner', img: '/images/products/canon-scanner.webp' },
              { name: 'Camera', slug: 'camera', img: '/images/products/canon-camera.webp' },
              { name: 'Lens', slug: 'lens', img: '/images/products/canon-lens.webp' },
              { name: 'Label Printer', slug: 'label-printer', img: '/images/products/epson_africa/Epson_ColorWorks_C3500_Series_0c5af10d.webp' },
              { name: 'Photo Printer', slug: 'photo-printer', img: '/images/products/keplertech/Citizen_CX-02W_8_Large_Photo_Printer_b91599f6.webp' },
              { name: 'Graphic Printer', slug: 'graphic-printer', img: '/images/products/keplertech/C13T49N100_Epson_Dye_Sublimation_Black_Ink_b7b10976.webp' },
              { name: 'Ink Cartridges', slug: 'ink-cartridges', img: '/images/products/keplertech/C13S090013_Epson_Printer_Cleaning_Stick_50_pcs_8ae2c8e8.webp' },
            ].map((cat) => {
              const count = productsData.filter(p => p.category === cat.name).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/products/category/${cat.slug}`}
                  className="group relative flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full h-32 sm:h-36 bg-gradient-to-br from-[#f0f6ff] to-[#e4effc] flex items-center justify-center p-4 relative overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <span className="font-bold text-[#0f1c2e] text-sm leading-tight group-hover:text-primary transition-colors">{cat.name}</span>
                    <span className="block text-[11px] text-gray-400 mt-1 font-medium">{count} products</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ImageSlider images={slider2Images} autoPlayInterval={5500} rounded="rounded-none" />

      <section className="py-12 bg-[#f8fbff] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder={t('products.search')} value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none font-medium text-text-primary hover:text-primary transition-all">
              <Filter size={18} className={showFilters ? "text-primary" : ""} /> {t('products.filters')}
              {activeFilters > 0 && <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shadow-md shadow-primary/30">{activeFilters}</span>}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,159,227,0.06)] p-8 mb-10 animate-slide-up border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-[var(--font-heading)] text-[#0f1c2e]">{t('products.filterOptions')}</h3>
                <button onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); }} className="text-sm font-semibold text-primary hover:underline">{t('products.clearAll')}</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-10">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">{t('products.category')}</label>
                  <div className="flex flex-wrap gap-2">
                    {mainCategories.map((cat) => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 border border-gray-100 text-gray-600 hover:bg-white hover:border-primary/30 hover:text-primary hover:shadow-md'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">{t('products.brand')}</label>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <button key={brand} onClick={() => setSelectedBrand(brand)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedBrand === brand ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 border border-gray-100 text-gray-600 hover:bg-white hover:border-primary/30 hover:text-primary hover:shadow-md'}`}>
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm font-medium text-gray-500 mb-8 px-2">{t('products.showing')} {visibleProducts.length} {t('products.of')} {filtered.length} {t('products.productsLabel')}</p>

          {filtered.length > 0 ? (
            <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-[0_20px_50px_rgba(0,159,227,0.12)] hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col">
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
                        {t('products.viewDetails')} <ChevronRight size={14} />
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
              <Printer size={56} className="text-gray-300 mx-auto mb-5" />
              <h3 className="text-xl font-bold text-[#0f1c2e] mb-2">{t('products.noProducts')}</h3>
              <p className="text-gray-500">{t('products.noProductsDesc')}</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedBrand('All'); }} className="mt-6 px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">{t('products.clearFilters')}</button>
            </div>
          )}

          {/* ── Consumables Section ── */}
          <div className="mt-16 pt-12 border-t-2 border-dashed border-gray-200">
            <ImageSlider images={slider3Images} autoPlayInterval={6000} rounded="rounded-none" className="mb-12" />
            <button
              onClick={() => setShowConsumables(!showConsumables)}
              className="w-full flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Droplets size={22} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-[#0f1c2e] group-hover:text-primary transition-colors">
                    Ink Cartridges & Maintenance Supplies
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {filteredConsumables.length} consumable products — genuine Epson ink cartridges, maintenance boxes & more
                  </p>
                </div>
              </div>
              <ChevronRight
                size={20}
                className={`text-gray-400 group-hover:text-primary transition-all duration-300 ${showConsumables ? 'rotate-90' : ''}`}
              />
            </button>

            {showConsumables && (
              <div className="mt-6 animate-slide-up">
                {/* Sub-category chips */}
                <div className="flex gap-3 mb-6">
                  <Link
                    href="/products/category/ink-cartridges"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    <Droplets size={14} /> Ink Cartridges ({consumableProducts.filter(p => p.category === 'Ink Cartridges').length})
                  </Link>
                  <Link
                    href="/products/category/printer-maintenance-box"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    <Wrench size={14} /> Maintenance Boxes ({consumableProducts.filter(p => p.category === 'Printer Maintenance Box').length})
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredConsumables.slice(0, 20).map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                      <div className="h-36 flex items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden">
                        {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-400"
                          />
                        ) : (
                          <Droplets size={32} className="text-primary/15" />
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

                {filteredConsumables.length > 20 && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/products/category/ink-cartridges"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      View All {filteredConsumables.length} Consumables <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
