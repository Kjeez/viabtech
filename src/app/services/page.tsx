import Link from 'next/link';
import { ShoppingCart, Wrench, Monitor, Clock, Package, Wifi, ArrowRight, CheckCircle, CalendarCheck, ShieldCheck, Cog } from 'lucide-react';
import servicesData from '@/data/services.json';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Services', description: 'Professional printer services in Tanzania.' };

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { ShoppingCart, Wrench, Monitor, Clock, Package, Wifi, CalendarCheck, ShieldCheck, Cog };

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge">Services</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Our Services</h1>
          <p className="text-text-secondary text-lg max-w-2xl">Complete printing solutions from sales to support. We handle every aspect of your printing infrastructure.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Package;
            return (
              <div key={service.id} id={service.slug} className="scroll-mt-24 kepler-card p-8 sm:p-10">
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"><IconComponent size={26} className="text-primary" /></div>
                      <div><h2 className="text-xl sm:text-2xl font-bold font-[var(--font-heading)] text-text-primary">{service.title}</h2><p className="text-sm text-text-muted">{service.shortDescription}</p></div>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                    <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25">
                      Get This Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="lg:col-span-2">
                    <h4 className="text-xs uppercase tracking-wider text-text-muted mb-4">What&apos;s Included</h4>
                    <ul className="space-y-3">
                      {service.features.map((f) => (<li key={f} className="flex items-start gap-3 text-sm text-text-secondary"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />{f}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-section py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge mx-auto">Custom Solutions</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Need a Custom Solution?</h2>
          <p className="text-text-secondary mb-8">Contact our team for a tailored printing solution designed for your needs.</p>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all">
            Schedule a Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
