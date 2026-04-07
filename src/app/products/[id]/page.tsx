import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { ArrowLeft, ChevronRight, ShieldCheck, Truck, Headphones, Package, CheckCircle2, Printer, Star, Phone, Mail, MessageCircle, ArrowRight, Zap, Award, Settings } from 'lucide-react';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return productsData.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const product = productsData.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} | Viabtech`,
    description: product.description,
  };
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product = productsData.find((p) => p.id === id);
  if (!product) notFound();

  const related = productsData
    .filter((p) => p.id !== id && p.category === product.category)
    .slice(0, 4);

  const brandColor: Record<string, string> = {
    Epson: 'text-[#003399]',
    Canon: 'text-[#cc0000]',
    Citizen: 'text-[#1a1a1a]',
    Lenovo: 'text-[#e2231a]',
    Dell: 'text-[#007db8]',
  };

  return (
    <>
      {/* ── Breadcrumb ── */}
      <section className="bg-[#f8fbff] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* ── Product Hero ── */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/products" className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Area */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-white via-[#f8fbff] to-[#e8f4fd] border border-border overflow-hidden flex items-center justify-center group">
                {product.image && product.image.startsWith('http') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-primary/20">
                    <Printer size={80} />
                    <span className="text-sm text-text-muted">Product Image</span>
                  </div>
                )}
                {/* Brand Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold shadow-sm border border-border ${brandColor[product.brand] || 'text-text-primary'}`}>
                    {product.brand.toUpperCase()}
                  </span>
                </div>
                {product.inStock && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold flex items-center gap-1.5 border border-success/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      In Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{product.category}</span>
                <span className="px-3 py-1 rounded-full bg-[#f0f4fa] text-text-secondary text-xs font-medium">{product.type}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-text-secondary text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap size={14} className="text-primary" /> Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-[#f8fbff] border border-border/50">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  <Phone size={16} /> Request Quote
                </Link>
                <a href="https://wa.me/255123456789" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20b858] shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5">
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border-2 border-border text-text-secondary font-semibold hover:text-primary hover:border-primary/30 transition-all">
                  <Mail size={16} /> Email Us
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Authorized Dealer' },
                  { icon: Truck, label: 'Fast Delivery' },
                  { icon: Headphones, label: 'Expert Support' },
                  { icon: Award, label: 'Warranty Included' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-[#f8fbff] border border-border/50 text-center">
                    <badge.icon size={18} className="text-primary" />
                    <span className="text-[11px] font-medium text-text-muted">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      <section className="py-12 sm:py-16 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Specs Table */}
            <div className="kepler-card p-6 sm:p-8">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-text-primary mb-6 flex items-center gap-2">
                <Settings size={20} className="text-primary" /> Technical Specifications
              </h2>
              <div className="divide-y divide-border">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3.5 gap-4">
                    <span className="text-sm text-text-muted capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm text-text-primary font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="kepler-card p-6 sm:p-8">
              <h2 className="text-xl font-bold font-[var(--font-heading)] text-text-primary mb-6 flex items-center gap-2">
                <Star size={20} className="text-primary" /> Why Choose Viabtech?
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Authorized Dealer', desc: 'We are an authorized dealer, ensuring 100% genuine products with full manufacturer warranty and support.' },
                  { title: 'Expert Consultation', desc: 'Our certified printing specialists help you select the perfect product for your unique business requirements.' },
                  { title: 'Professional Setup', desc: 'We provide complete installation, configuration, driver setup, and staff training — included with your purchase.' },
                  { title: 'Ongoing Support', desc: 'From routine maintenance to emergency repairs, our service team keeps your equipment running at peak performance.' },
                  { title: 'Competitive Pricing', desc: 'We offer transparent, competitive pricing with flexible purchasing options to match any budget.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f0f7ff] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="section-badge">Related Products</div>
                <h2 className="text-2xl font-bold font-[var(--font-heading)] text-text-primary">
                  More from <span className="text-primary">{product.category}</span>
                </h2>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group kepler-card overflow-hidden">
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-white to-[#f0f7ff] relative overflow-hidden">
                    {p.image && p.image.startsWith('http') ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Printer size={48} className="text-primary/15 group-hover:text-primary/30 transition-colors" />
                    )}
                  </div>
                  <div className="px-5 pb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{p.brand}</span>
                    </div>
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1 line-clamp-2 text-sm">{p.name}</h3>
                    <p className="text-xs text-text-muted line-clamp-2">{p.description}</p>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        View Details <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="cta-section py-16 sm:py-20">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10 text-center">
          <div className="section-badge mx-auto">Get In Touch</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">
            Interested in the <span className="text-primary">{product.name}</span>?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Contact our sales team for pricing, availability, and expert advice on choosing the right printing solution for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              <Phone size={16} /> Contact Sales Team
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-text-primary font-semibold border-2 border-border hover:border-primary/30 hover:text-primary transition-all">
              <Package size={16} /> Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
