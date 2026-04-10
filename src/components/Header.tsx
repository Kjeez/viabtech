'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, ChevronRight, Printer, ScanLine, Camera, Projector, PenTool, Palette, Droplets, Package, Wrench, ShoppingBag } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';

// Product categories for the dropdown — order matches KeplerTech
const productCategories = [
  { name: 'Office Printer', slug: 'office-printer', icon: Printer },
  { name: 'Plotter', slug: 'plotter', icon: PenTool },
  { name: 'Graphic Printer', slug: 'graphic-printer', icon: Palette },
  { name: 'Photo Printer', slug: 'photo-printer', icon: Camera },
  { name: 'Label Printer', slug: 'label-printer', icon: Printer },
  { name: 'Projector', slug: 'projector', icon: Projector },
  { name: 'Scanner', slug: 'scanner', icon: ScanLine },
  { name: 'Camera', slug: 'camera', icon: Camera },
  { name: 'Lens', slug: 'lens', icon: Camera },
  { name: 'Inkjet Media', slug: 'inkjet-media', icon: ShoppingBag },
  { name: 'Ink Cartridges', slug: 'ink-cartridges', icon: Droplets },
  { name: 'Accessory', slug: 'accessory', icon: Package },
  { name: 'Printer Maintenance Box', slug: 'printer-maintenance-box', icon: Wrench },
];

export default function Header() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    {
      name: t('nav.services'),
      href: '/services',
      children: [
        { name: t('nav.allServices'), href: '/services' },
        { name: t('nav.serviceCenter'), href: '/service-center' },
      ],
    },
    {
      name: t('nav.products'),
      href: '/products',
      isMegaMenu: true,
      children: [
        { name: 'All Products', href: '/products' },
        ...productCategories.map(cat => ({
          name: cat.name,
          href: `/products/category/${cat.slug}`,
          icon: cat.icon,
        })),
      ],
    },
    { name: t('nav.brands'), href: '/brands' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a1628] shadow-lg shadow-black/20'
          : 'bg-[#0a1628]'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Viabtech Home">
            <Image
              src="/images/logo1.png"
              alt="Viabtech Limited"
              width={180}
              height={50}
              className="h-12 w-auto object-contain bg-white/90 p-1.5 rounded-lg"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light/50 ${
                    isActive(item.href)
                      ? 'text-primary-light bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {/* Mega Dropdown for Products */}
                {item.isMegaMenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-2xl py-3 w-[320px] shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden">
                      {/* All Products link */}
                      <Link
                        href="/products"
                        className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-[#0a1628] hover:bg-primary/5 hover:text-primary transition-colors border-b border-gray-100 mx-2 mb-1 rounded-lg"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package size={16} className="text-primary" />
                        </span>
                        All Products
                        <ChevronRight size={14} className="ml-auto text-gray-400" />
                      </Link>

                      {/* Category links */}
                      <div className="max-h-[400px] overflow-y-auto px-2">
                        {productCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link
                              key={cat.slug}
                              href={`/products/category/${cat.slug}`}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors rounded-lg group"
                            >
                              <span className="w-7 h-7 rounded-md bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Icon size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
                              </span>
                              {cat.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Dropdown (Services etc.) */}
                {!item.isMegaMenu && item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-xl py-2 min-w-[240px] shadow-2xl shadow-black/20 border border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light/50"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Language switcher + Phone + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a
              href="tel:+255745700500"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              aria-label="Call Viabtech at +255 745 700 500"
            >
              <Phone size={16} className="text-primary-light" />
              +255 745 700 500
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light/50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer (Right Side Slide-In) ─── */}
      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 0 }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header — brand teal bar */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <Image
              src="/images/logo1.png"
              alt="Viabtech"
              width={140}
              height={40}
              className="h-9 w-auto object-contain bg-white/90 p-1 rounded-md"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language switcher in mobile */}
        <div className="border-b border-gray-100">
          <LanguageSwitcher variant="mobile" />
        </div>

        {/* Navigation links */}
        <nav className="overflow-y-auto h-[calc(100%-200px)]" aria-label="Mobile navigation">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const hasChildren = !!item.children;
            const isExpanded = mobileDropdown === item.name;

            return (
              <div key={item.name} className="border-b border-gray-100">
                {hasChildren ? (
                  <>
                    {/* Parent with dropdown */}
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium transition-colors ${
                        active || isExpanded
                          ? 'bg-primary text-white'
                          : 'text-text-primary hover:bg-surface-light'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {/* Sub-links */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[600px]' : 'max-h-0'
                      }`}
                    >
                      {item.children!.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block pl-8 pr-5 py-3 text-sm text-text-secondary hover:text-primary hover:bg-surface-light transition-colors border-l-2 border-primary/20"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 text-[15px] font-medium transition-colors ${
                      active
                        ? 'bg-primary text-white'
                        : 'text-text-primary hover:bg-surface-light'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-white">
          <a
            href="tel:+255745700500"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Phone size={16} />
            +255 745 700 500
          </a>
        </div>
      </div>
    </header>
  );
}
