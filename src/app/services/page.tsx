'use client';

import Link from 'next/link';
import { ShoppingCart, Wrench, Monitor, Clock, Package, Wifi, ArrowRight, CheckCircle, CalendarCheck, ShieldCheck, Cog } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ShoppingCart, Wrench, Monitor, Clock, Package, Wifi, CalendarCheck, ShieldCheck, Cog
};

const services = [
  { id: 'printer-sales', slug: 'printer-sales', icon: 'ShoppingCart', key: 'printerSales' },
  { id: 'managed-print', slug: 'managed-print', icon: 'Monitor', key: 'managedPrint' },
  { id: 'amc', slug: 'annual-maintenance-contract', icon: 'CalendarCheck', key: 'amc' },
  { id: 'warranty-registration', slug: 'warranty-registration', icon: 'ShieldCheck', key: 'warranty' },
  { id: 'printer-repair', slug: 'printer-repair', icon: 'Wrench', key: 'repair' },
  { id: 'consumables', slug: 'consumables', icon: 'Package', key: 'consumables' },
  { id: 'spares', slug: 'spares', icon: 'Cog', key: 'spares' },
  { id: 'it-support', slug: 'it-support', icon: 'Wifi', key: 'itSupport' },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero py-24 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('servicesPage.badge')}</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-white mb-6">{t('servicesPage.title')}</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{t('servicesPage.subtitle')}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Package;
            const featureKeys = [1, 2, 3, 4, 5, 6];
            return (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-24 group bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,159,227,0.06)] hover:shadow-[0_25px_50px_rgba(0,159,227,0.15)] border border-gray-100 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="grid lg:grid-cols-5 gap-10 items-start">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-5 mb-6">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-[#f0f7ff] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <IconComponent size={28} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-[#0f1c2e]">{t(`svc.${service.key}.title`)}</h2>
                        <p className="text-sm font-medium text-gray-500 tracking-wide mt-1 uppercase">{t(`svc.${service.key}.short`)}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-[1.05rem]">{t(`svc.${service.key}.desc`)}</p>

                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant text-sm font-semibold rounded-full">
                      {t('servicesPage.getService')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="lg:col-span-2 lg:pl-8 lg:border-l lg:border-gray-100 pt-6 lg:pt-0">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-primary" /> {t('servicesPage.included')}
                    </h4>
                    <ul className="space-y-4">
                      {featureKeys.map((n) => (
                        <li key={n} className="flex items-start gap-3 text-[0.95rem] font-medium text-[#4b5c72]">
                          <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                          {t(`svc.${service.key}.f${n}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-[#0a1628] text-white relative flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white mx-auto mb-6">{t('servicesPage.ctaBadge')}</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] mb-6 text-white leading-tight">{t('servicesPage.ctaTitle')}<br/><span className="text-primary-light">{t('servicesPage.ctaTitleHighlight')}</span></h2>
          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">{t('servicesPage.ctaDesc')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 btn-vibrant text-base font-bold rounded-full group mx-auto">
            {t('servicesPage.ctaButton')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
