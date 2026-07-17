import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Phone, MessageCircle, MapPin, Clock, ShieldCheck, Truck,
  Wrench, Printer, Camera, Package, Droplet, ChevronRight, CheckCircle2, Star,
} from 'lucide-react';

const SITE_URL = 'https://www.viabtech.com';
const PATH = '/printer-shop-dar-es-salaam';

export const metadata: Metadata = {
  title: 'Printer Shop in Dar es Salaam | Canon & Epson Dealer & Service Centre',
  description:
    "Viabtech is a leading printer shop in Dar es Salaam, Tanzania — authorized Canon & Epson dealer and service centre. Buy printers, cameras, ink & toner with genuine warranty. Two showrooms on Bibi Titi Mohamed Road. Call +255 745 700 500.",
  keywords: [
    'printer shop Dar es Salaam',
    'printers in Dar es Salaam',
    'printers in Dar es Salaam Tanzania',
    'buy printer Dar es Salaam',
    'Canon dealer Dar es Salaam',
    'Epson dealer Dar es Salaam',
    'printer repair Dar es Salaam',
    'ink and toner Dar es Salaam',
    'printer shop Tanzania',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: 'Printer Shop in Dar es Salaam | Canon & Epson Dealer — Viabtech',
    description:
      "Authorized Canon & Epson printer shop and service centre in Dar es Salaam. Printers, cameras, ink & toner with genuine warranty across Tanzania.",
    url: `${SITE_URL}${PATH}`,
    siteName: 'Viabtech',
    locale: 'en_TZ',
    type: 'website',
  },
};

const locations = [
  {
    name: 'Canon Authorized Showroom',
    address: 'Plot No. 1357/208, Ground Floor, Next to Peacock Hotel, Bibi Titi Mohamed Road, Kisutu, Dar es Salaam',
    map: 'https://maps.google.com/?cid=15635631984227566733',
    accent: '#CC0000',
  },
  {
    name: 'Epson Experience Zone',
    address: 'Ground Floor, Uhuru Heights, Bibi Titi Mohamed Road, P.O. Box 105047, Dar es Salaam',
    map: 'https://maps.google.com/?cid=7711297827740443260',
    accent: '#003399',
  },
];

const categories = [
  { label: 'Office & Laser Printers', href: '/products?category=Office+Printer', icon: Printer },
  { label: 'Ink Tank Printers', href: '/products?category=Inkjet+Printer', icon: Printer },
  { label: 'Wide-Format Plotters', href: '/products?category=Plotter', icon: Printer },
  { label: 'Photo Printers', href: '/products?category=Photo+Printer', icon: Printer },
  { label: 'Canon Cameras & Lenses', href: '/products?category=Camera', icon: Camera },
  { label: 'Projectors & Scanners', href: '/products?category=Projector', icon: Package },
  { label: 'Ink, Toner & Consumables', href: '/products?category=Ink+Cartridges', icon: Droplet },
  { label: 'Accessories', href: '/products?category=Accessory', icon: Package },
];

const services = [
  { title: 'Printer Sales & Supply', desc: 'Authorized Canon, Epson, Lenovo, Dell & HP printers — genuine stock with full warranty, competitive pricing and bulk discounts.', icon: Printer },
  { title: 'Authorized Service Centre', desc: 'Factory-trained technicians repair Canon & Epson printers, copiers and cameras using genuine parts, with fast turnaround.', icon: Wrench },
  { title: 'Genuine Ink & Toner', desc: 'Original Canon and Epson cartridges, ink bottles and toner in stock — protect your printer and your prints.', icon: Droplet },
  { title: 'Managed Print & AMC', desc: 'Print management, leasing and annual maintenance contracts that cut running costs for offices across Dar es Salaam.', icon: ShieldCheck },
];

const whyUs = [
  { title: 'Authorized Dealer', desc: 'Official Canon & Epson partner — every product is genuine with a valid manufacturer warranty.', icon: ShieldCheck },
  { title: 'Fast Delivery', desc: 'Same-city delivery across Dar es Salaam and nationwide shipping across Tanzania.', icon: Truck },
  { title: 'Expert Support', desc: 'Certified technicians and honest advice to match the right printer to your needs and budget.', icon: CheckCircle2 },
  { title: 'Trusted Since 2015', desc: 'Chosen by banks, hospitals and government offices across Tanzania and East Africa.', icon: Star },
];

const faqs = [
  {
    q: 'Where is Viabtech’s printer shop located in Dar es Salaam?',
    a: 'We have two showrooms on Bibi Titi Mohamed Road in Dar es Salaam: our Canon Authorized Showroom (Plot No. 1357/208, next to Peacock Hotel, Kisutu) and our Epson Experience Zone (Ground Floor, Uhuru Heights). Both are open Monday to Saturday.',
  },
  {
    q: 'Are you an authorized Canon and Epson dealer in Tanzania?',
    a: 'Yes. Viabtech is an authorized reseller and authorized service centre for all Canon and Epson products in Tanzania. We are also authorized partners for Lenovo, Dell and HP, so every product comes with genuine warranty and support.',
  },
  {
    q: 'What printers can I buy at your Dar es Salaam shop?',
    a: 'We stock Canon PIXMA, MAXIFY, i-SENSYS/imageCLASS, imageRUNNER and imagePROGRAF printers; Epson EcoTank, WorkForce Pro and SureColor printers; plus Lenovo and Dell printing solutions — from home printers to office copiers and wide-format plotters.',
  },
  {
    q: 'Do you repair Canon and Epson printers in Dar es Salaam?',
    a: 'Yes. Our authorized service centre has factory-trained technicians who repair and maintain Canon and Epson printers, copiers, cameras and projectors using genuine parts, with transparent pricing and fast turnaround.',
  },
  {
    q: 'Do you sell genuine ink and toner?',
    a: 'Yes. We supply original Canon and Epson ink cartridges, ink bottles and toner. Genuine consumables protect your printer’s warranty and deliver reliable, high-quality prints.',
  },
  {
    q: 'Do you deliver across Dar es Salaam and the rest of Tanzania?',
    a: 'Yes. We offer fast delivery across Dar es Salaam and nationwide shipping throughout Tanzania. Contact our sales team on +255 745 700 500 for delivery options.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Our showrooms are open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Store', 'LocalBusiness'],
      '@id': `${SITE_URL}${PATH}#store`,
      name: 'Viabtech — Printer Shop in Dar es Salaam',
      url: `${SITE_URL}${PATH}`,
      image: `${SITE_URL}/images/canon&epson.png`,
      telephone: ['+255745700500', '+255746000786'],
      email: 'info@viabtech.co.tz',
      priceRange: '$$',
      areaServed: { '@type': 'City', name: 'Dar es Salaam' },
      address: locations.map((l) => ({
        '@type': 'PostalAddress',
        streetAddress: l.address,
        addressLocality: 'Dar es Salaam',
        addressCountry: 'TZ',
      })),
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
      ],
      brand: [
        { '@type': 'Brand', name: 'Canon' },
        { '@type': 'Brand', name: 'Epson' },
        { '@type': 'Brand', name: 'Lenovo' },
        { '@type': 'Brand', name: 'Dell' },
        { '@type': 'Brand', name: 'HP' },
      ],
      sameAs: [
        'https://www.instagram.com/viabtechcanon',
        'https://www.facebook.com/profile.php?id=61591455479848',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${PATH}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Printer Shop in Dar es Salaam', item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

export default function PrinterShopDarEsSalaamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <section className="bg-[#f8fbff] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary font-medium">Printer Shop in Dar es Salaam</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1120] via-[#0f1c2e] to-[#003399] text-white">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#CC0000]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-[#0057B8]/30 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm font-medium mb-6">
            <MapPin size={14} /> Dar es Salaam · Tanzania
          </div>
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] max-w-4xl">
            Printer Shop in Dar es Salaam
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl">
            Viabtech is your authorized <strong>Canon &amp; Epson printer dealer and service centre</strong> in
            Dar es Salaam — printers, cameras, ink &amp; toner and expert repairs, all with genuine warranty.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+255745700500" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0f1c2e] font-semibold hover:bg-white/90 transition-all">
              <Phone size={18} /> Call +255 745 700 500
            </a>
            <a href="https://wa.me/255745700500" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-95 transition-all">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <Link href="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all">
              <Package size={18} /> Browse Products
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} /> Authorized Dealer</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={15} /> Genuine Warranty</span>
            <span className="inline-flex items-center gap-1.5"><Truck size={15} /> Fast Delivery</span>
          </div>
        </div>
      </section>

      {/* Intro prose */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-text-secondary leading-relaxed space-y-4">
          <p>
            Looking for a reliable <strong>printer shop in Dar es Salaam</strong>? Viabtech is an authorized Canon
            and Epson reseller and service centre serving businesses and individuals across Tanzania. From our two
            showrooms on Bibi Titi Mohamed Road, we sell genuine printers, cameras, projectors, scanners, ink and
            toner — and repair them too.
          </p>
          <p>
            Whether you need a home ink-tank printer, a high-volume office copier, a wide-format plotter or genuine
            Canon and Epson consumables, our team helps you choose the right solution and backs it with authorized
            service and full warranty. We deliver across Dar es Salaam and ship nationwide.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#f8fbff] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-badge mx-auto">What We Sell</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">Printers &amp; Imaging Products in Dar es Salaam</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((c) => (
              <Link key={c.label} href={c.href} className="group flex items-center gap-3 rounded-xl bg-white border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all">
                <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary shrink-0">
                  <c.icon size={20} />
                </span>
                <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">{c.label}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 btn-vibrant text-sm text-white rounded-full">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-badge mx-auto">Our Services</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">Sales, Service &amp; Support</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border p-7 hover:shadow-md transition-all">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <s.icon size={22} />
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-[#0b1120] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-badge mx-auto bg-white/5 text-white border-white/10">Visit Us</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Two Showrooms in Dar es Salaam</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((l) => (
              <div key={l.name} className="rounded-2xl bg-white/5 border border-white/10 p-7">
                <div className="h-1 w-12 rounded mb-5" style={{ backgroundColor: l.accent }} />
                <h3 className="text-xl font-bold mb-3">{l.name}</h3>
                <p className="flex items-start gap-2 text-white/75 mb-3">
                  <MapPin size={18} className="shrink-0 mt-0.5" /> {l.address}
                </p>
                <p className="flex items-center gap-2 text-white/75 mb-5">
                  <Clock size={16} className="shrink-0" /> Mon–Fri 8:00 AM–5:00 PM · Sat 9:00 AM–1:00 PM
                </p>
                <a href={l.map} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0f1c2e] font-semibold hover:bg-white/90 transition-all">
                  <MapPin size={16} /> Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-badge mx-auto">Why Choose Us</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">The Trusted Printer Shop in Dar es Salaam</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <w.icon size={24} />
                </span>
                <h3 className="font-bold text-text-primary mb-2">{w.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#f8fbff] border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="section-badge mx-auto">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl bg-white border border-border p-5 open:shadow-md transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-text-primary list-none">
                  {f.q}
                  <ChevronRight size={18} className="text-primary shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-text-secondary leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-16 sm:py-20">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10 text-center">
          <div className="section-badge mx-auto">Get In Touch</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Visit Dar es Salaam’s Trusted <span className="text-primary">Canon &amp; Epson Printer Shop</span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Call, WhatsApp or drop by either showroom for pricing, genuine stock and expert advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+255745700500" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
              <Phone size={16} /> Call Now
            </a>
            <a href="https://wa.me/255745700500" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-95 transition-all">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-text-primary font-semibold border-2 border-border hover:border-primary/30 hover:text-primary transition-all">
              <Package size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
