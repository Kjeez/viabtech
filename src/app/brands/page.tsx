import Link from 'next/link';
import { ShieldCheck, ArrowRight, Printer, Star } from 'lucide-react';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Brands', description: 'Explore our authorized brand partnerships with Canon, Epson, Lenovo, and Dell.' };

export default function BrandsPage() {
  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge">Brands</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Our Brands</h1>
          <p className="text-text-secondary text-lg max-w-2xl">Authorized partners for the world&apos;s leading printer manufacturers. Genuine products, full warranty.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {brandsData.map((brand, index) => {
            const brandProducts = productsData.filter((p) => p.brand === brand.name);
            return (
              <div key={brand.id} id={brand.slug} className="scroll-mt-24">
                <div className={`grid lg:grid-cols-2 gap-10 items-center`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md" style={{ background: brand.heroColor }}>{brand.name.charAt(0)}</div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">{brand.name}</h2>
                        {brand.authorized && <div className="flex items-center gap-1.5 text-primary text-sm mt-0.5"><ShieldCheck size={14} />{brand.tagline}</div>}
                      </div>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-6">{brand.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {brand.highlights.map((h) => (<div key={h} className="flex items-start gap-2 text-sm text-text-secondary"><Star size={14} className="text-primary mt-0.5 shrink-0" />{h}</div>))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {brand.categories.map((cat) => (<span key={cat} className="px-3 py-1.5 rounded-full bg-surface-light border border-border text-xs text-text-muted font-medium">{cat}</span>))}
                    </div>
                    <Link href={`/products?brand=${brand.name}`} className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25">
                      View {brand.name} Products <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="grid grid-cols-2 gap-4">
                      {brandProducts.slice(0, 4).map((product) => (
                        <div key={product.id} className="kepler-card p-4 group">
                          <div className="h-24 flex items-center justify-center mb-3 bg-gradient-to-br from-white to-[#f0f7ff] rounded-xl"><Printer size={36} className="text-primary/15 group-hover:text-primary/30 transition-colors" /></div>
                          <h4 className="text-xs font-medium text-text-primary line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                          <p className="text-xs text-primary font-bold mt-1">{product.currency} {product.price.toLocaleString()}</p>
                        </div>
                      ))}
                      {brandProducts.length === 0 && <div className="col-span-2 kepler-card p-8 text-center"><Printer size={36} className="text-primary/15 mx-auto mb-3" /><p className="text-sm text-text-muted">Products coming soon</p></div>}
                    </div>
                  </div>
                </div>
                {index < brandsData.length - 1 && <div className="mt-20 border-t border-border" />}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
