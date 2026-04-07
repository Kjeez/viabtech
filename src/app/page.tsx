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
      {/* â•â•â•â•â•â•â• HERO CAROUSEL â•â•â•â•â•â•â• */}
      <HeroCarousel />

      {/* â•â•â•â•â•â•â• ANIMATED GRADIENT BANNER â•â•â•â•â•â•â• */}
      <div className="relative h-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] via-[#003399] via-[#0057B8] via-[#FF6600] to-[#CC0000] bg-[length:200%_100%] animate-[gradientSlide_4s_linear_infinite]" />
      </div>

      {/* â•â•â•â•â•â•â• CATEGORIES â•â•â•â•â•â•â• */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#CC0000]/5 to-transparent blur-2xl pointer-events-none animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#003399]/5 to-transparent blur-2xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="mb-12 text-center">
              <div className="section-badge mx-auto">Categories</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
                Browse by <span className="text-primary">Category</span>
              </h2>
              <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
                From Canon cameras to Epson projectors â€” explore our complete product lineup.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <AnimatedSection key={cat.name} animation="scale-in" delay={idx * 80}>
                <Link
                  href={cat.href}
                  className="group category-card"
                >
                  <div className="category-card-image relative">
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
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <cat.icon size={18} style={{ color: cat.color }} />
                    </div>
                  </div>
                  <div className="category-card-label flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors text-base">
                      {cat.name}
                    </h3>
                    <ArrowRight size={14} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
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

      {/* â•â•â•â•â•â•â• BRANDS â•â•â•â•â•â•â• */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8fbff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">
                <ShieldCheck size={12} /> Authorized Partners
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
                World-Class <span className="text-primary">Brands</span> We Represent
              </h2>
              <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
                Tanzania&apos;s most trusted distributor for 11 leading technology brands â€” all backed by
                genuine warranty, expert support, and authorized service.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* â”€â”€ Infinite scrolling logo marquee â”€â”€ */}
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

        {/* â”€â”€ Featured brand cards grid â”€â”€ */}
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
              className="inline-flex items-center gap-2 px-7 py-3 btn-vibrant px-7 py-3 inline-flex items-center gap-2 text-sm"
            >
              Explore All Brands <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â• COLORFUL DIVIDER â•â•â•â•â•â•â• */}
      <div className="relative h-1.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600] via-[#0057B8] via-[#003399] to-[#CC0000] bg-[length:200%_100%] animate-[gradientSlide_4s_linear_infinite]" />
      </div>

      {/* â•â•â•â•â•â•â• SERVICES â•â•â•â•â•â•â• */}
      <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-up">
            <div className="mb-12">
              <div className="section-badge">Our Services</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
                Complete Technology <span className="text-primary">Solutions</span>
              </h2>
            </div>
          </AnimatedSection>

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
              className="group inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant px-8 py-3.5 inline-flex items-center gap-2 text-sm"
            >
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â• WHY VIABTECH â•â•â•â•â•â•â• */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Colorful decorative gradient corner */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-[#CC0000]/[0.04] via-[#003399]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#0057B8]/[0.04] via-[#FF6600]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <div className="section-badge mx-auto">Why Choose Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-heading)] text-text-primary">
                Why Businesses <span className="text-primary">Trust</span> Viabtech
              </h2>
              <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
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
                <div className="kepler-card p-7 text-center group relative overflow-hidden">
                  {/* Colorful top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: item.color }} />
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon size={28} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â• VIDEO SHOWCASE â€” Epson Service Centre â•â•â•â•â•â•â• */}
      <VideoShowcase />

      {/* â•â•â•â•â•â•â• EVENT GALLERY â•â•â•â•â•â•â• */}
      <EventGallery />

      {/* â•â•â•â•â•â•â• PRESS COVERAGE â•â•â•â•â•â•â• */}
      <PressSection />

      {/* â•â•â•â•â•â•â• CTA â€” Light gradient â•â•â•â•â•â•â• */}
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

