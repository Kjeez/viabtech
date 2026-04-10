'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, Printer, Star } from 'lucide-react';
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BrandsPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero py-20 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('brandsPage.badge')}</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] mb-4 text-white">{t('brandsPage.title')}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t('brandsPage.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {brandsData.map((brand, index) => {
            const brandProducts = productsData.filter((p) => p.brand === brand.name);
            return (
              <div key={brand.id} id={brand.slug} className="scroll-mt-24">
                <div className={`grid lg:grid-cols-2 gap-10 items-center`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white p-3 shadow-[0_4px_20px_rgba(255,255,255,0.05)] border border-white/10">
                        <Image src={brand.logo} alt={brand.name} width={64} height={64} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-white">{brand.name}</h2>
                        {brand.authorized && (
                          <div className="flex items-center gap-1.5 text-primary text-sm mt-0.5">
                            <ShieldCheck size={14} />{brand.tagline}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">{brand.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {brand.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2 text-sm text-gray-400">
                          <Star size={14} className="text-primary mt-0.5 shrink-0" />{h}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {brand.categories.map((cat) => (
                        <span key={cat} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <Link href={`/products?brand=${brand.name}`} className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant text-sm">
                      {t('brandsPage.viewProducts', { brand: brand.name })} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="grid grid-cols-2 gap-4">
                      {[...brandProducts]
                        .filter(p => p.image && !p.isConsumable)
                        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
                        .slice(0, 4)
                        .map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="kepler-card-dark bg-[#0b1120] border-white/5 p-4 group transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(0,159,227,0.15)]">
                          <div className="h-28 flex items-center justify-center mb-4 bg-white rounded-xl relative overflow-hidden p-2">
                            {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <Printer size={36} className="text-primary/15 group-hover:text-primary/30 transition-colors" />
                            )}
                          </div>
                          <h4 className="text-xs font-medium text-white line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                          <p className="text-xs text-primary font-medium mt-1">{t('brandsPage.viewDetails')}</p>
                        </Link>
                      ))}
                      {brandProducts.length === 0 && (
                        <div className="col-span-2 kepler-card-dark bg-[#0b1120] border-white/5 p-8 text-center">
                          <Printer size={36} className="text-white/10 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">{t('brandsPage.comingSoon')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {index < brandsData.length - 1 && <div className="mt-20 border-t border-white/10" />}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
