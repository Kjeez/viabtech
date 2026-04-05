'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'All Services', href: '/services' },
      { name: 'Authorized Service Center', href: '/service-center' },
    ],
  },
  { name: 'Products', href: '/products' },
  { name: 'Brands', href: '/brands' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
          ? 'bg-white shadow-lg shadow-black/5'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo1.png"
              alt="Viabtech Limited"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-text-primary hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-xl py-2 min-w-[240px] shadow-xl shadow-black/8 border border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-text-secondary hover:text-primary hover:bg-surface-light transition-colors"
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

          {/* Phone + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+255745700500"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary" />
              +255 745 700 500
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-text-primary hover:text-primary hover:bg-surface-light transition-colors"
              aria-label="Toggle menu"
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
      />

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header — brand teal bar */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <Image
              src="/images/logo1.png"
              alt="Viabtech"
              width={140}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="overflow-y-auto h-[calc(100%-140px)]">
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
                        isExpanded ? 'max-h-[300px]' : 'max-h-0'
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
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            <Phone size={16} />
            +255 745 700 500
          </a>
        </div>
      </div>
    </header>
  );
}
