import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Truck, Headphones, Award,
  Wrench, Package, ChevronRight, Star, Phone, MessageSquare,
  CheckCircle, Monitor, Camera, Tv, Aperture, ShoppingBag,
} from 'lucide-react';
import brandsData from '@/data/brands.json';
import servicesData from '@/data/services.json';
import HeroCarousel from '@/components/HeroCarousel';
import VideoShowcase from '@/components/VideoShowcase';
import PressSection from '@/components/PressSection';
import EventGallery from '@/components/EventGallery';
import AnimatedSection from '@/components/AnimatedSection';

const categories = [
  {
    name: 'Canon Cameras',
    image: '/images/categories/camera.png',
    href: '/products?category=Camera',
    icon: Camera,
    color: '#CC0000',
  },
  {
    name: 'Canon Lenses',
    image: '/images/categories/lens.png',
    href: '/products?category=Lens',
    icon: Aperture,
    color: '#CC0000',
  },
  {
    name: 'Epson Projectors',
    image: '/images/categories/projector.png',
    href: '/products?category=Projector',
    icon: Tv,
    color: '#003399',
  },
  {
    name: 'Office Printers',
    image: '/images/categories/laser-printer.png',
    href: '/products?category=Office+Printer',
    icon: Monitor,
    color: '#0057B8',
  },
  {
    name: 'Inkjet Printers',
    image: '/images/categories/inkjet-printer.png',
    href: '/products?category=Inkjet+Printer',
    icon: Monitor,
    color: '#0f7d8e',
  },
  {
    name: 'Plotters',
    image: '/images/categories/plotter.png',
    href: '/products?category=Plotter',
    icon: Monitor,
    color: '#003399',
  },
  {
    name: 'Photo Printers',
    image: '/images/categories/photo-printer.png',
    href: '/products?category=Photo+Printer',
    icon: Monitor,
    color: '#FF6600',
  },
  {
    name: 'Scanners',
    image: '/images/categories/scanner.png',
    href: '/products?category=Scanner',
    icon: Monitor,
    color: '#007DB8',
  },
  {
    name: 'Accessories',
    image: '/images/categories/consumables.png',
    href: '/products?category=Accessory',
    icon: ShoppingBag,
    color: '#2E3A87',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ══════ HERO CAROUSEL ══════ */}
      <HeroCarousel />

      {/* ══════ CATEGORIES ══════ */}
      <section className="py-20 bg-[#0b1120] relative overflow-hidden">
        {/* Decorative floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#CC0000]/10 to-transparent blur-2xl pointer-events-none animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#003399]/10 to-transparent blur-2xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="mb-12 text-center">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">Categories</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                Browse by <span className="text-primary-light">Category</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                From Canon cameras to Epson projectors — explore our complete product lineup.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <AnimatedSection key={cat.name} animation="scale-in" delay={idx * 80}>
                <Link
                  href={cat.href}
                  className="group category-card-dark rounded-[1.25rem] overflow-hidden shadow-lg"
                >
                  <div className="category-card-image relative rounded-t-[1.25rem] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Color overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ backgroundColor: cat.color }}
                    />
                    {/* Icon badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111827]/90 backdrop-blur-sm flex items-center justify-center shadow-md border border-gray-800 group-hover:scale-110 transition-transform hidden sm:flex">
                      <cat.icon size={18} style={{ color: cat.color }} />
                    </div>
                  </div>
                  <div className="category-card-label flex items-center justify-between p-5 rounded-b-[1.25rem] bg-[#111827]">
                    <h3 className="font-semibold text-white group-hover:text-primary-light transition-colors text-base">
                      {cat.name}
                    </h3>
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-primary-light group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant px-8 py-3.5 inline-flex items-center gap-2 text-sm"
              >
                View All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* â•â•â•â•â•â•â• WHO WE ARE â•â•â•â•â•â•â• */}
      <section className="py-20 bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden">
        {/* Colorful accent blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#CC0000]/[0.03] via-[#003399]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#FF6600]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <AnimatedSection animation="slide-right" className="relative order-1 lg:order-2">
              {/* Decorative blue accent shapes */}
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary rounded-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary rounded-3xl -z-10" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/15">
                <Image
                  src="/images/about-us.jpg"
                  alt="Viab Tech office at Uhuru Heights, Bibi Titi Mohamed Street, Dar es Salaam"
                  width={600}
                  height={450}
                  className="object-cover w-full h-auto"
                />
              </div>
              {/* Stats floating over bottom */}
              <div className="absolute -bottom-6 right-4 left-4 grid grid-cols-3 gap-3">
                <div className="text-center bg-white rounded-xl py-3 px-2 shadow-lg border border-border/50 backdrop-blur-sm">
                  <div className="text-xl font-bold text-primary">10+</div>
                  <div className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center bg-white rounded-xl py-3 px-2 shadow-lg border border-border/50 backdrop-blur-sm">
                  <div className="text-xl font-bold text-primary">11</div>
                  <div className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Brands</div>
                </div>
                <div className="text-center bg-white rounded-xl py-3 px-2 shadow-lg border border-border/50 backdrop-blur-sm">
                  <div className="text-xl font-bold text-primary">2K+</div>
                  <div className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Clients</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection animation="slide-left" className="order-2 lg:order-1">
              <div className="section-badge">About Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-6">
                Who We Are
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Viabtech is a leading technology solutions provider specializing in cameras,
                printers, projectors, scanners, and IT hardware. Founded in 2015, we have
                built our reputation as trusted technology suppliers in Tanzania by delivering
                high-quality products with exceptional customer service.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                We are an authorized partner for major brands including Canon, Epson, HP,
                Lenovo, Dell, DJI, Godox, Unomat, APC, SanDisk, and Lexar â€” offering
                comprehensive solutions from camera and printer sales to repair and maintenance services.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant px-8 py-3.5 inline-flex items-center gap-2 text-sm"
              >
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ BRANDS ═══ */}
      <section className="py-20 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">
                <ShieldCheck size={12} /> Authorized Partners
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                World-Class <span className="text-primary-light">Brands</span> We Represent
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Tanzania&apos;s most trusted distributor for 11 leading technology brands — all backed by
                genuine warranty, expert support, and authorized service.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Infinite scrolling logo marquee ── */}
        <div className="relative mb-16">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-x gap-12 py-6">
            {/* Double the items for seamless loop */}
            {[...brandsData, ...brandsData].map((brand, i) => (
              <Link
                key={`marquee-${brand.id}-${i}`}
                href={`/brands#${brand.slug}`}
                className="flex-shrink-0 w-[140px] h-[64px] mx-2 flex items-center justify-center bg-white/95 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)] opacity-60 hover:opacity-100 transition-all duration-500 overflow-hidden"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={50}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain max-h-[40px] max-w-[100px] mix-blend-multiply"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Featured brand cards grid ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandsData.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands#${brand.slug}`}
                className="group relative bg-[#111827] rounded-3xl border border-gray-800 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-400 overflow-hidden"
              >
                {/* Colored top accent line */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: brand.heroColor }}
                />

                <div className="p-6 sm:p-7 flex flex-col items-center text-center">
                  {/* Modern White Logo Badge */}
                  <div className="relative w-[130px] h-[68px] mb-6 flex flex-col items-center justify-center bg-white rounded-2xl border-4 border-[#111827] shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden inset-ring-inner">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={110}
                      height={44}
                      style={{ width: 'auto', height: 'auto' }}
                      className="object-contain max-h-[44px] max-w-[100px] mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Brand name */}
                  <h3 className="text-base font-bold text-white group-hover:text-primary-light transition-colors mb-1.5">
                    {brand.name}
                  </h3>

                  {/* Category tags */}
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {brand.categories.slice(0, 2).map((cat: string) => (
                      <span key={cat} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                        {cat}
                      </span>
                    ))}
                    {brand.categories.length > 2 && (
                      <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                        +{brand.categories.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Authorized badge */}
                  {brand.authorized && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-primary-light bg-primary/[0.15] px-3 py-1 rounded-full">
                      <ShieldCheck size={11} /> Authorized
                    </div>
                  )}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={13} className="text-primary-light" />
                </div>
              </Link>
            ))}
          </div>

          {/* View all brands CTA */}
          <div className="text-center mt-10">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-7 py-3 btn-vibrant px-7 py-3 inline-flex items-center gap-2 text-sm"
            >
              Explore All Brands <ArrowRight size={16} />
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
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-semibold tracking-widest uppercase mb-4 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Our Services
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary tracking-tight">
                Complete Technology <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">Solutions</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Two feature cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Blue-tinted premium card */}
            <div className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-gradient-to-br from-[#eaf4fe] via-[#f1f8ff] to-[#e0effe] border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.1)] hover:-translate-y-1 transition-all duration-500">
              <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-white/60 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 tracking-tight">Printer Sales & Supply</h3>
                <p className="text-text-secondary leading-relaxed mb-8 text-[15px]">
                  As the leading printer dealers in Tanzania, we offer competitive pricing
                  and a wide selection of genuine products spanning world-class brands.
                </p>
                <ul className="space-y-3.5">
                  {['Canon, Epson, Lenovo & Dell products', 'Volume discounts for bulk orders', 'Simplified procurement process', 'Coordinated delivery and installation'].map((item) => (
                    <li key={item} className="flex items-center gap-3.5 text-[15px] font-medium text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-blue-50">
                        <CheckCircle size={14} className="text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* White premium card */}
            <div className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1 transition-all duration-500 z-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 tracking-tight">Printer Repair Service</h3>
                <p className="text-text-secondary leading-relaxed mb-8 text-[15px]">
                  Need your equipment back up and running? Our professional service team
                  delivers fast, reliable repairs with guaranteed genuine components.
                </p>
                <ul className="space-y-3.5">
                  {['Expert diagnosis of all printer issues', 'Genuine parts replacement for all major brands', 'Quick turnaround times to minimize downtime', 'Transparent pricing with no hidden charges'].map((item) => (
                    <li key={item} className="flex items-center gap-3.5 text-[15px] font-medium text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                        <CheckCircle size={14} className="text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* More services grid (3 column) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 3).map((service, i) => {
              const icons = [Package, Wrench, Monitor];
              const IconComponent = icons[i] || Package;
              return (
                <div key={service.id} className="group relative overflow-hidden rounded-[1.75rem] bg-white p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,50,0.08)] hover:-translate-y-1.5 transition-all duration-500 z-10">
                  {/* Subtle top-right hover light */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="w-16 h-16 rounded-[1.125rem] bg-gradient-to-br from-blue-50 to-[#f1f8ff] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                    <IconComponent size={28} className="text-primary drop-shadow-sm" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-3 text-xl tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-text-primary font-semibold text-[15px] rounded-full border border-gray-200 shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:border-primary/30 hover:shadow-[0_8px_25px_rgb(0,0,255,0.1)] hover:text-primary transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Discover All Our Services 
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY VIABTECH ═══ */}
      <section className="py-20 bg-[#0b1120] relative overflow-hidden">
        {/* Colorful decorative gradient corner */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-[#CC0000]/10 via-[#003399]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/10 via-[#FF6600]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto bg-white/5 text-white border-white/10">Why Choose Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-white">
                Why Businesses <span className="text-primary-light">Trust</span> Viabtech
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Tanzania&apos;s most trusted technology partner, committed to quality, value, and exceptional service.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Authorized Dealer', desc: 'Official Canon & Epson partner with genuine products and full warranty.', color: '#CC0000' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery across Dar es Salaam and nationwide shipping.', color: '#003399' },
              { icon: Headphones, title: 'Expert Support', desc: 'Certified technicians providing professional advice and support.', color: '#0057B8' },
              { icon: Award, title: 'Best Value', desc: 'Competitive pricing, bulk discounts, and flexible financing.', color: '#FF6600' },
            ].map((item, idx) => (
              <AnimatedSection key={item.title} animation="scale-in" delay={idx * 100}>
                <div 
                  className="relative p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/5 hover:border-gray-600 transition-all duration-500 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                  style={{ '--hover-color': item.color } as React.CSSProperties}
                >
                  {/* Background glowing blob */}
                  <div 
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                    style={{ background: item.color }}
                  />
                  
                  {/* Glowing top line */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-b-full opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                  />

                  {/* Icon Container */}
                  <div 
                    className="relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                    style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)` }}
                  >
                    <item.icon size={28} style={{ color: item.color }} className="drop-shadow-lg" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--hover-color)] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* â• â• â• â• â• â• â•  VIDEO SHOWCASE â€” Epson Service Centre â• â• â• â• â• â• â•  */}
      <VideoShowcase />

      {/* â• â• â• â• â• â• â•  EVENT GALLERY â• â• â• â• â• â• â•  */}
      <EventGallery />

      {/* â• â• â• â• â• â• â•  PRESS COVERAGE â• â• â• â• â• â• â•  */}
      <PressSection />

      {/* â• â• â• â• â• â• â•  CTA â€” Deep Blue Variant â• â• â• â• â• â• â•  */}
      <section className="relative py-24 bg-gradient-to-br from-[#003399] to-[#001738] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 border border-white/20 backdrop-blur-sm shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            Get Started
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-[var(--font-heading)] text-white mb-5 drop-shadow-md">
            Ready to Upgrade Your Printing?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us today for a free consultation. Our experts will help you find
            the perfect commercial printing and projection solutions for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#001738] font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all"
            >
              Get a Free Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#0057B8]" />
            </Link>
            <a
              href="tel:+255745700500"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â• Floating CTA buttons â•â•â•â•â•â•â• */}
      <div className="floating-actions">
        <a
          href="tel:+255123456789"
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
          aria-label="Call us"
        >
          <Phone size={22} />
        </a>
        <a
          href="https://wa.me/255123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
          aria-label="WhatsApp"
        >
          <MessageSquare size={22} />
        </a>
      </div>
    </>
  );
}

