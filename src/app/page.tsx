import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Truck, Headphones, Award,
  Wrench, Package, ChevronRight, Star, Phone, MessageSquare,
  CheckCircle, Monitor,
} from 'lucide-react';
import brandsData from '@/data/brands.json';
import servicesData from '@/data/services.json';
import HeroCarousel from '@/components/HeroCarousel';
import VideoShowcase from '@/components/VideoShowcase';
import PressSection from '@/components/PressSection';
import EventGallery from '@/components/EventGallery';

const categories = [
  {
    name: 'Office Printers',
    image: '/images/categories/laser-printer.png',
    href: '/products?category=Laser+Printer',
  },
  {
    name: 'Inkjet Printers',
    image: '/images/categories/inkjet-printer.png',
    href: '/products?category=Inkjet+Printer',
  },
  {
    name: 'Plotters',
    image: '/images/categories/plotter.png',
    href: '/products?category=Large+Format',
  },
  {
    name: 'Color Printers',
    image: '/images/categories/color-printer.png',
    href: '/products',
  },
  {
    name: 'Photo Printers',
    image: '/images/categories/photo-printer.png',
    href: '/products',
  },
  {
    name: 'Scanners',
    image: '/images/categories/scanner.png',
    href: '/products',
  },
  {
    name: 'Multifunction Printers',
    image: '/images/categories/multifunction.png',
    href: '/products',
  },
  {
    name: 'Printer Consumables',
    image: '/images/categories/consumables.png',
    href: '/products',
  },
  {
    name: 'Printer Paper & Media',
    image: '/images/categories/printer-paper.png',
    href: '/products',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO CAROUSEL ═══════ */}
      <HeroCarousel />

      {/* ═══════ CATEGORIES ═══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="section-badge">Categories</div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
              Browse by Category
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group category-card"
              >
                <div className="category-card-image relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="category-card-label">
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors text-base">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              View All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ WHO WE ARE ═══════ */}
      <section className="py-20 bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="relative order-1 lg:order-2">
              {/* Decorative blue accent shape */}
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary rounded-3xl -z-10" />
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
            </div>

            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="section-badge">About Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-6">
                Who We Are
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Viabtech is a leading printing solutions provider specializing in printer
                supplies, IT hardware, and managed print services. Founded in 2015, we have
                built our reputation as trusted printer suppliers in Tanzania by delivering
                high-quality products with exceptional customer service.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                We are an authorized partner for major brands including Canon, Epson, HP,
                Lenovo, Dell, DJI, Godox, Unomat, APC, SanDisk, and Lexar — offering
                comprehensive solutions from printer sales to repair and maintenance services.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BRANDS ═══════ */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8fbff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto">
              <ShieldCheck size={12} /> Authorized Partners
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
              World-Class <span className="text-primary">Brands</span> We Represent
            </h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              Tanzania&apos;s most trusted distributor for 11 leading technology brands — all backed by
              genuine warranty, expert support, and authorized service.
            </p>
          </div>
        </div>

        {/* ── Infinite scrolling logo marquee ── */}
        <div className="relative mb-16">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8fbff] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-x gap-12 py-6">
            {/* Double the items for seamless loop */}
            {[...brandsData, ...brandsData].map((brand, i) => (
              <Link
                key={`marquee-${brand.id}-${i}`}
                href={`/brands#${brand.slug}`}
                className="flex-shrink-0 w-[140px] h-[70px] flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={50}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain max-h-[50px]"
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
                className="group relative bg-white rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 overflow-hidden"
              >
                {/* Colored top accent line */}
                <div
                  className="h-1 w-full"
                  style={{ background: brand.heroColor }}
                />

                <div className="p-6 sm:p-7 flex flex-col items-center text-center">
                  {/* Logo */}
                  <div className="relative w-full h-14 mb-5 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={140}
                      height={56}
                      style={{ width: 'auto', height: 'auto' }}
                      className="object-contain max-h-[56px] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Brand name */}
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors mb-1.5">
                    {brand.name}
                  </h3>

                  {/* Category tags */}
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {brand.categories.slice(0, 2).map((cat: string) => (
                      <span key={cat} className="text-[10px] bg-gray-100 text-text-muted px-2 py-0.5 rounded-full">
                        {cat}
                      </span>
                    ))}
                    {brand.categories.length > 2 && (
                      <span className="text-[10px] bg-gray-100 text-text-muted px-2 py-0.5 rounded-full">
                        +{brand.categories.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Authorized badge */}
                  {brand.authorized && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/[0.06] px-3 py-1 rounded-full">
                      <ShieldCheck size={11} /> Authorized
                    </div>
                  )}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={13} className="text-primary" />
                </div>
              </Link>
            ))}
          </div>

          {/* View all brands CTA */}
          <div className="text-center mt-10">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Explore All Brands <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="section-badge">Our Services</div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
              Complete Printing Solutions
            </h2>
          </div>

          {/* Two feature cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Blue-tinted card */}
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#e8f4fd] to-[#d0ecfa] border border-primary/10">
              <div className="absolute top-[-30%] right-[-15%] w-[250px] h-[250px] rounded-full bg-primary/[0.06] pointer-events-none" />
              <h3 className="text-2xl font-bold text-text-primary mb-3 relative z-10">Printer Sales & Supply</h3>
              <p className="text-text-secondary leading-relaxed mb-6 relative z-10">
                As the leading printer dealers in Tanzania, we offer competitive pricing
                and a wide selection of genuine products.
              </p>
              <ul className="space-y-3 relative z-10">
                {['Canon, Epson, Lenovo & Dell products', 'Volume discounts for bulk orders', 'Simplified procurement process', 'Coordinated delivery and installation'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* White card */}
            <div className="kepler-card p-8 sm:p-10 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-text-primary mb-3">Printer Repair Service</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Need your printer back up and running? Our professional service team
                delivers fast, reliable repairs:
              </p>
              <ul className="space-y-3">
                {['Expert diagnosis of all printer issues', 'Genuine parts replacement for all major brands', 'Quick turnaround times to minimize downtime', 'Transparent pricing with no hidden charges'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* More services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 3).map((service, i) => {
              const icons = [Package, Wrench, Monitor];
              const IconComponent = icons[i] || Package;
              return (
                <div key={service.id} className="kepler-card p-7 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <IconComponent size={26} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-2 text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ WHY VIABTECH ═══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto">Why Choose Us</div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
              Why Businesses Trust Viabtech
            </h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              Tanzania&apos;s most trusted printing partner, committed to quality, value, and exceptional service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Authorized Dealer', desc: 'Official Canon & Epson partner with genuine products and full warranty.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery across Dar es Salaam and nationwide shipping.' },
              { icon: Headphones, title: 'Expert Support', desc: 'Certified technicians providing professional advice and support.' },
              { icon: Award, title: 'Best Value', desc: 'Competitive pricing, bulk discounts, and flexible financing.' },
            ].map((item) => (
              <div key={item.title} className="kepler-card p-7 text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VIDEO SHOWCASE — Epson Service Centre ═══════ */}
      <VideoShowcase />

      {/* ═══════ EVENT GALLERY ═══════ */}
      <EventGallery />

      {/* ═══════ PRESS COVERAGE ═══════ */}
      <PressSection />

      {/* ═══════ CTA — Light gradient ═══════ */}
      <section className="cta-section py-20">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge mx-auto">Get Started</div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary mb-4">
            Ready to Upgrade Your Printing?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Contact us today for a free consultation. Our experts will help you find
            the perfect printing solution for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Get a Free Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+255123456789"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-text-primary text-text-primary font-semibold hover:bg-text-primary hover:text-white transition-all"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ Floating CTA buttons ═══════ */}
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
          className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageSquare size={22} />
        </a>
      </div>
    </>
  );
}
