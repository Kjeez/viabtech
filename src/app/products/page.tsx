'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Printer, ChevronRight, ShieldCheck } from 'lucide-react';
import productsData from '@/data/products.json';

const categories = ['All', ...Array.from(new Set(productsData.map((p) => p.category)))];
const brands = ['All', ...Array.from(new Set(productsData.map((p) => p.brand)))];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      return matchSearch && matchCategory && matchBrand;
    });
  }, [search, selectedCategory, selectedBrand]);

  const activeFilters = [selectedCategory, selectedBrand].filter((f) => f !== 'All').length;

  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge">Products</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Our Products</h1>
          <p className="text-text-secondary text-lg max-w-2xl">Explore our comprehensive range of printers from Canon, Epson, Lenovo, and Dell.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-border text-text-secondary hover:text-primary hover:border-primary/30 transition-all">
              <Filter size={16} /> Filters
              {activeFilters > 0 && <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">{activeFilters}</span>}
            </button>
          </div>

          {showFilters && (
            <div className="kepler-card p-6 mb-8 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">Filter Products</h3>
                <button onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); }} className="text-xs text-primary hover:underline">Clear All</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-light border border-border text-text-secondary hover:text-primary hover:border-primary/30'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Brand</label>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <button key={brand} onClick={() => setSelectedBrand(brand)}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${selectedBrand === brand ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-light border border-border text-text-secondary hover:text-primary hover:border-primary/30'}`}>
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-text-muted mb-6">Showing {filtered.length} of {productsData.length} products</p>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="group kepler-card overflow-hidden">
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-white to-[#f0f7ff]">
                    <Printer size={56} className="text-primary/15 group-hover:text-primary/30 transition-colors" />
                  </div>
                  <div className="px-5 pb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{product.brand}</span>
                      {product.inStock && <span className="px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">In Stock</span>}
                    </div>
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-3">{product.description}</p>
                    <ul className="space-y-1 mb-3">
                      {product.features.slice(0, 2).map((f) => (
                        <li key={f} className="text-xs text-text-muted flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-lg font-bold text-primary">{product.currency} {product.price.toLocaleString()}</span>
                      <Link href="/contact" className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1">
                        Enquire <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Printer size={48} className="text-primary/20 mx-auto mb-4" />
              <p className="text-text-secondary">No products match your filters.</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedBrand('All'); }} className="mt-4 text-primary text-sm hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
