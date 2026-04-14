'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Truck, Headphones, Award,
  Wrench, Package, ChevronRight, Star, Phone, MessageSquare,
  CheckCircle, Monitor, Camera, Tv, Aperture, ShoppingBag,
  MapPin, PlayCircle, FileText,
} from 'lucide-react';
import brandsData from '@/data/brands.json';
import servicesData from '@/data/services.json';
import HeroCarousel from '@/components/HeroCarousel';
import VideoShowcase from '@/components/VideoShowcase';
import PressSection from '@/components/PressSection';
import EventGallery from '@/components/EventGallery';
import AnimatedSection from '@/components/AnimatedSection';
import Counter from '@/components/Counter';
import Testimonials from '@/components/Testimonials';
import ServiceInquiryModal from '@/components/ServiceInquiryModal';
import AboutSection from '@/components/AboutSection';
import { useLanguage } from '@/i18n/LanguageContext';

const categories = [
  { nameKey: 'categories.canonCameras', image: '/images/categories/camera.png', href: '/products?category=Camera', icon: Camera, color: '#CC0000' },
  { nameKey: 'categories.canonLenses', image: '/images/categories/lens.png', href: '/products?category=Lens', icon: Aperture, color: '#CC0000' },
  { nameKey: 'categories.epsonProjectors', image: '/images/categories/projector-product.png', href: '/products?category=Projector', icon: Tv, color: '#003399' },
  { nameKey: 'categories.laserPrinters', image: '/images/categories/laser-printer.png', href: '/products?category=Office+Printer', icon: Monitor, color: '#0057B8' },
  { nameKey: 'categories.inkTankPrinters', image: '/images/categories/inkjet-printer.png', href: '/products?category=Inkjet+Printer', icon: Monitor, color: '#0f7d8e' },
  { nameKey: 'categories.wideFormat', image: '/images/categories/plotter.png', href: '/products?category=Plotter', icon: Monitor, color: '#003399' },
  { nameKey: 'categories.photoprinters', image: '/images/categories/photo-printer.png', href: '/products?category=Photo+Printer', icon: Monitor, color: '#FF6600' },
  { nameKey: 'categories.scanners', image: '/images/categories/scanner.png', href: '/products?category=Scanner', icon: Monitor, color: '#007DB8' },
  { nameKey: 'categories.accessories', image: '/images/categories/consumables.png', href: '/products?category=Accessory', icon: ShoppingBag, color: '#2E3A87' },
];

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('');
  const [modalSubSubject, setModalSubSubject] = useState('');

  const openInquiry = (subject: string, subSubject: string) => {
    setModalSubject(subject);
    setModalSubSubject(subSubject);
    setModalOpen(true);
  };

  return (
    <>
      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        subject={modalSubject}
        subSubject={modalSubSubject}
      />
      {/* ══════ HERO CAROUSEL ══════ */}
      <HeroCarousel />

      {/* ══════ CATEGORIES ══════ */}
      <section className="py-20 bg-[#0b1120] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#CC0000]/10 to-transparent blur-2xl pointer-events-none animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#003399]/10 to-transparent blur-2xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="mb-12 text-center">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">{t('categories.badge')}</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                {t('categories.title')} <span className="text-primary-light">{t('categories.titleHighlight')}</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                {t('categories.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const catName = t(cat.nameKey) !== cat.nameKey ? t(cat.nameKey) : cat.nameKey;
              return (
                <AnimatedSection key={cat.nameKey} animation="scale-in" delay={idx * 80}>
                  <Link 
                    href={cat.href} 
                    className="group category-card-dark rounded-[1.25rem] overflow-hidden shadow-lg border-2 border-transparent hover:border-[#0057B8] transition-all duration-300"
                  >
                    <div className="category-card-image relative rounded-t-[1.25rem] overflow-hidden">
                      <Image src={cat.image} alt={catName} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[#0057B8]" />
                    </div>
                    <div className="category-card-label flex items-center justify-between p-5 rounded-b-[1.25rem] bg-[#111827]">
                      <h3 className="font-semibold text-white group-hover:text-[#0057B8] transition-colors text-base">{catName}</h3>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-[#0057B8] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link href="/products" className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant text-sm">
                {t('categories.viewAll')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════ WHO WE ARE ══════ */}
      <AboutSection />

      {/* ═══ BRANDS ═══ */}
      <section className="py-20 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">
                <ShieldCheck size={12} /> {t('brands.badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                {t('brands.title')} <span className="text-primary-light">{t('brands.titleHighlight')}</span> {t('brands.titleEnd')}
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">{t('brands.subtitle')}</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Infinite scrolling logo marquee */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-x sm:animate-scroll-x-slow gap-12 py-6">
            {[...brandsData, ...brandsData].map((brand, i) => (
              <Link key={`marquee-${brand.id}-${i}`} href={`/brands#${brand.slug}`} className="flex-shrink-0 w-[140px] h-[64px] mx-2 flex items-center justify-center bg-white/95 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)] opacity-60 hover:opacity-100 transition-all duration-500 overflow-hidden">
                <Image src={brand.logo} alt={brand.name} width={120} height={50} style={{ width: 'auto', height: 'auto' }} className="object-contain max-h-[40px] max-w-[100px] mix-blend-multiply" />
              </Link>
            ))}
          </div>
        </div>

        {/* Featured brand cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandsData.map((brand) => (
              <Link key={brand.id} href={`/brands#${brand.slug}`} className="group relative bg-[#111827] rounded-3xl border border-gray-800 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-400 overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: brand.heroColor }} />
                <div className="p-6 sm:p-7 flex flex-col items-center text-center">
                  <div className="relative w-[130px] h-[68px] mb-6 flex flex-col items-center justify-center bg-white rounded-2xl border-4 border-[#111827] shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden inset-ring-inner">
                    <Image src={brand.logo} alt={`${brand.name} logo`} width={110} height={44} style={{ width: 'auto', height: 'auto' }} className="object-contain max-h-[44px] max-w-[100px] mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary-light transition-colors mb-1.5">{brand.name}</h3>
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {brand.categories.slice(0, 2).map((cat: string) => (
                      <span key={cat} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">{cat}</span>
                    ))}
                    {brand.categories.length > 2 && (
                      <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">+{brand.categories.length - 2}</span>
                    )}
                  </div>
                  {brand.authorized && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-primary-light bg-primary/[0.15] px-3 py-1 rounded-full">
                      <ShieldCheck size={11} /> {t('brands.authorized')}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={13} className="text-primary-light" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/brands" className="inline-flex items-center gap-2 px-7 py-3 btn-vibrant text-sm">
              {t('brands.exploreAll')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ COLORFUL DIVIDER ══════ */}
      <div className="relative h-1.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600] via-[#0057B8] via-[#003399] to-[#CC0000] bg-[length:200%_100%] animate-[gradientSlide_4s_linear_infinite]" />
      </div>

      {/* ══════ SERVICES ══════ */}
      <section className="py-24 bg-gradient-to-b from-[#f8fbff] to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-semibold tracking-widest uppercase mb-4 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('services.badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary tracking-tight">
                {t('services.title')} <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">{t('services.titleHighlight')}</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Two feature cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Product Sales & Supply card */}
            <div className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-gradient-to-br from-[#eaf4fe] via-[#f1f8ff] to-[#e0effe] border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={() => openInquiry('Product Sales & Supply', 'Get a quote for genuine Canon, Epson, HP, Dell, and Lenovo products.')}
            >
              <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-white/60 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 tracking-tight">{t('services.printerSales')}</h3>
                <p className="text-text-secondary leading-relaxed mb-8 text-[15px]">{t('services.printerSalesDesc')}</p>
                <ul className="space-y-3.5 mb-8">
                  {[t('services.sales.item1'), t('services.sales.item2'), t('services.sales.item3'), t('services.sales.item4')].map((item) => (
                    <li key={item} className="flex items-center gap-3.5 text-[15px] font-medium text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-blue-50">
                        <CheckCircle size={14} className="text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); openInquiry('Product Sales & Supply', 'Get a quote for genuine Canon, Epson, HP, Dell, and Lenovo products.'); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0057B8] to-[#003399] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <FileText size={16} /> Get Quote
                </button>
              </div>
            </div>

            {/* Authorized Service Center card */}
            <div className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1 transition-all duration-500 z-10 cursor-pointer"
              onClick={() => router.push('/service-center')}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 tracking-tight">{t('services.printerRepair')}</h3>
                <p className="text-text-secondary leading-relaxed mb-8 text-[15px]">{t('services.printerRepairDesc')}</p>
                <ul className="space-y-3.5 mb-8">
                  {[t('services.repair.item1'), t('services.repair.item2'), t('services.repair.item3'), t('services.repair.item4')].map((item) => (
                    <li key={item} className="flex items-center gap-3.5 text-[15px] font-medium text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                        <CheckCircle size={14} className="text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/service-center"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold text-sm border-2 border-primary/20 shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <MapPin size={16} /> Get Location
                </Link>
              </div>
            </div>
          </div>

          {/* Three more services with CTAs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Printer Sales & Consulting */}
            <div
              className="group relative overflow-hidden rounded-[1.75rem] bg-white p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1.5 transition-all duration-500 z-10 cursor-pointer flex flex-col"
              onClick={() => openInquiry('Printer Sales & Consulting', 'Expert guidance to find the perfect printer for your business needs and budget.')}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-16 h-16 rounded-[1.125rem] bg-gradient-to-br from-blue-50 to-[#f1f8ff] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                <Package size={28} className="text-primary drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-text-primary mb-3 text-xl tracking-tight">Printer Sales & Consulting</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6 flex-grow">Expert guidance to help you choose the right printer for your business needs and budget.</p>
              <button
                onClick={(e) => { e.stopPropagation(); openInquiry('Printer Sales & Consulting', 'Expert guidance to find the perfect printer for your business needs and budget.'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0057B8] to-[#003399] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all self-start"
              >
                <PlayCircle size={15} /> Start Now
              </button>
            </div>

            {/* Managed Print Services & Leasing */}
            <div
              className="group relative overflow-hidden rounded-[1.75rem] bg-white p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1.5 transition-all duration-500 z-10 cursor-pointer flex flex-col"
              onClick={() => openInquiry('Managed Print Services & Leasing', 'Comprehensive print management, rental, and leasing solutions to reduce costs and optimize your fleet.')}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-16 h-16 rounded-[1.125rem] bg-gradient-to-br from-blue-50 to-[#f1f8ff] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                <Wrench size={28} className="text-primary drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-text-primary mb-3 text-xl tracking-tight">Managed Print Services & Leasing</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6 flex-grow">Comprehensive print management, rental, and leasing solutions to reduce costs and optimize your fleet.</p>
              <button
                onClick={(e) => { e.stopPropagation(); openInquiry('Managed Print Services & Leasing', 'Comprehensive print management, rental, and leasing solutions to reduce costs and optimize your fleet.'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0057B8] to-[#003399] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all self-start"
              >
                <PlayCircle size={15} /> Start Now
              </button>
            </div>

            {/* Annual Maintenance Contract (AMC) */}
            <div
              className="group relative overflow-hidden rounded-[1.75rem] bg-white p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1.5 transition-all duration-500 z-10 cursor-pointer flex flex-col"
              onClick={() => router.push('/contact')}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-16 h-16 rounded-[1.125rem] bg-gradient-to-br from-blue-50 to-[#f1f8ff] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                <Monitor size={28} className="text-primary drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-text-primary mb-3 text-xl tracking-tight">Annual Maintenance Contract (AMC)</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6 flex-grow">Protect your investment with comprehensive annual maintenance contracts for all your printers.</p>
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary font-semibold text-sm border-2 border-primary/20 shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all self-start"
              >
                <ArrowRight size={15} /> Get More Info
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/services" className="group relative inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-text-primary font-semibold text-[15px] rounded-full border border-gray-200 shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:border-primary/30 hover:shadow-[0_8px_25px_rgb(0,0,255,0.1)] hover:text-primary transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                {t('services.discoverAll')}
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY VIABTECH ═══ */}
      <section className="py-20 bg-[#0b1120] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-[#CC0000]/10 via-[#003399]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 via-[#FF6600]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">{t('why.badge')}</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                {t('why.title')} <span className="text-primary-light">{t('why.titleHighlight')}</span> {t('why.titleEnd')}
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">{t('why.subtitle')}</p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, titleKey: 'why.dealer', descKey: 'why.dealerDesc', color: '#CC0000' },
              { icon: Truck, titleKey: 'why.delivery', descKey: 'why.deliveryDesc', color: '#003399' },
              { icon: Headphones, titleKey: 'why.support', descKey: 'why.supportDesc', color: '#0057B8' },
              { icon: Award, titleKey: 'why.value', descKey: 'why.valueDesc', color: '#FF6600' },
            ].map((item, idx) => (
              <AnimatedSection key={item.titleKey} animation="scale-in" delay={idx * 100}>
                <div
                  className="relative p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/5 hover:border-gray-600 transition-all duration-500 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                  style={{ '--hover-color': item.color } as React.CSSProperties}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ background: item.color }} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-b-full opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
                  <div className="relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)` }}>
                    <item.icon size={28} style={{ color: item.color }} className="drop-shadow-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--hover-color)] transition-colors">{t(item.titleKey)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{t(item.descKey)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Testimonials />

      {/* ═══ VIDEO SHOWCASE ═══ */}
      <VideoShowcase />

      {/* ═══ EVENT GALLERY ═══ */}
      <EventGallery />

      {/* ═══ PRESS COVERAGE ═══ */}
      <PressSection />

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 bg-gradient-to-br from-[#003399] to-[#001738] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 border border-white/20 backdrop-blur-sm shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            {t('cta.badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-[var(--font-heading)] text-white mb-5 drop-shadow-md">
            {t('cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#001738] font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all">
              {t('cta.quote')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#0057B8]" />
            </Link>
            <a href="tel:+255745700500" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all">
              <Phone size={18} />
              {t('cta.call')}
            </a>
          </div>
        </div>
      </section>


    </>
  );
}
