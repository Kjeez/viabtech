'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                    item.name === 'Home'
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
              href="tel:+255123456789"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary" />
              +255 123 456 789
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] border-t border-border' : 'max-h-0'
        }`}
      >
        <div className="bg-white px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-text-primary hover:text-primary hover:bg-surface-light rounded-lg transition-colors"
              >
                {item.name}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className="block pl-8 pr-4 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-surface-light rounded-lg transition-colors"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          ))}
          <a
            href="tel:+255123456789"
            className="flex items-center gap-2 mx-4 mt-3 px-4 py-3 text-sm font-semibold text-primary"
          >
            <Phone size={16} />
            +255 123 456 789
          </a>
        </div>
      </div>
    </header>
  );
}
