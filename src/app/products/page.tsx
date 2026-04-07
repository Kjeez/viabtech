'use client';

/* eslint-disable @next/next/no-img-element */
import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Printer, ChevronRight, X } from 'lucide-react';
import productsData from '@/data/products.json';
import { useLanguage } from '@/i18n/LanguageContext';

const categories = ['All', ...Array.from(new Set(productsData.map((p) => p.category)))];
const brands = ['All', ...Array.from(new Set(productsData.map((p) => p.brand)))];

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

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
      setShowFilters(true);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      return matchSearch && matchCategory && matchBrand;
    });
  }, [search, selectedCategory, selectedBrand]);

  const activeFilters = [selectedCategory, selectedBrand].filter((f) => f !== 'All').length;
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero py-20 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('products.badge')}</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] mb-4 text-white">{t('products.title')}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t('products.subtitle')}</p>
        </div>
      </section>

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
                    {categories.map((cat) => (
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

          <p className="text-sm font-medium text-gray-500 mb-8 px-2">{t('products.showing')} {filtered.length} {t('products.of')} {productsData.length} {t('products.productsLabel')}</p>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product) => (
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
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
              <Printer size={56} className="text-gray-300 mx-auto mb-5" />
              <h3 className="text-xl font-bold text-[#0f1c2e] mb-2">{t('products.noProducts')}</h3>
              <p className="text-gray-500">{t('products.noProductsDesc')}</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedBrand('All'); }} className="mt-6 px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">{t('products.clearFilters')}</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
