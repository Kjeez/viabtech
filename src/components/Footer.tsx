import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Truck, Headphones, ShieldCheck } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Laser Printers', href: '/products?category=Laser+Printer' },
    { name: 'Inkjet Printers', href: '/products?category=Inkjet+Printer' },
    { name: 'Large Format', href: '/products?category=Large+Format' },
    { name: 'All Products', href: '/products' },
  ],
  services: [
    { name: 'Printer Sales', href: '/services' },
    { name: 'Repair & Maintenance', href: '/services' },
    { name: 'Managed Print Services', href: '/services' },
    { name: 'Service Center', href: '/service-center' },
  ],
  brands: [
    { name: 'Canon', href: '/brands#canon' },
    { name: 'Epson', href: '/brands#epson' },
    { name: 'Lenovo', href: '/brands#lenovo' },
    { name: 'Dell', href: '/brands#dell' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Instagram', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'LinkedIn', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

const trustBadges = [
  { icon: ShieldCheck, text: 'Dedicated Customer Care' },
  { icon: Truck, text: 'Fast & Secure Delivery' },
  { icon: Headphones, text: 'Pro Quality Support' },
];

export default function Footer() {
  return (
    <footer>
      {/* Trust badges bar */}
      <div className="bg-gradient-to-r from-[#e8f4fd] via-[#dbeafe] to-[#e8f4fd] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2.5 text-sm text-text-primary">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <badge.icon size={18} className="text-primary" />
                </div>
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer — light theme */}
      <div className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-5">
                <Image
                  src="/images/logo2.png"
                  alt="Viabtech Limited"
                  width={140}
                  height={140}
                  className="h-24 w-auto object-contain"
                />
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                Tanzania&apos;s trusted authorized dealer for Canon and Epson printers.
                Expert sales, service, and support across East Africa.
              </p>
              <div className="space-y-3 text-sm">
                <a href="tel:+255745700500" className="flex items-center gap-2.5 text-text-secondary hover:text-primary transition-colors">
                  <Phone size={15} className="text-primary shrink-0" />
                  +255 745 700 500 / +255 746 000 786
                </a>
                <a href="mailto:info@viabtech.co.tz" className="flex items-center gap-2.5 text-text-secondary hover:text-primary transition-colors">
                  <Mail size={15} className="text-primary shrink-0" />
                  info@viabtech.co.tz
                </a>
                <div className="flex items-start gap-2.5 text-text-secondary">
                  <MapPin size={15} className="text-primary mt-1 shrink-0" />
                  <div className="flex flex-col space-y-2">
                    <div><strong className="text-text-primary">Epson Showroom:</strong> Uhuru Heights, Bibi Titi Mohamed Rd</div>
                    <div><strong className="text-text-primary">Canon Showroom:</strong> Next to Peacock Hotel, Bibi Titi Mohamed Rd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-surface-light border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Need Help</h4>
              <div className="space-y-3 text-sm text-text-secondary">
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p>Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <a href="mailto:info@viabtech.co.tz" className="block hover:text-primary transition-colors">
                  info@viabtech.co.tz
                </a>
              </div>
              <div className="mt-6 space-y-2">
                {footerLinks.company.map((link) => (
                  <Link key={link.name} href={link.href} className="block text-sm text-text-secondary hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Viabtech. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
