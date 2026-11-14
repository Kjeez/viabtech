'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Truck, Headphones, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const socialLinks = [
  // Official accounts confirmed by Viabtech. Add LinkedIn here once the company page exists.
  { name: 'Viabtech on Facebook', href: 'https://www.facebook.com/profile.php?id=61591455479848', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Viabtech on Instagram', href: 'https://www.instagram.com/viabtechltd/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'Viabtech Canon store on Instagram', href: 'https://www.instagram.com/viabtechcanon/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    products: [
      { name: t('footer.printers'), href: '/products/category/office-printer' },
      { name: t('footer.cameras'), href: '/products/category/camera' },
      { name: t('footer.projectors'), href: '/products/category/projector' },
      { name: t('footer.scanners'), href: '/products/category/scanner' },
      { name: t('footer.accessories'), href: '/products/category/accessory' },
    ],
    services: [
      { name: t('footer.printerRepair'), href: '/services' },
      { name: t('footer.managedPrint'), href: '/services' },
      { name: t('footer.consultation'), href: '/services' },
      { name: t('footer.maintenance'), href: '/services' },
      { name: t('footer.serviceCenter'), href: '/service-center' },
      { name: 'Printer Shop in Dar es Salaam', href: '/printer-shop-dar-es-salaam' },
    ],
    help: [
      { name: t('footer.contactUs'), href: '/contact' },
      { name: t('footer.faq'), href: '/faq' },
      { name: t('footer.warranty'), href: '/services' },
      { name: t('footer.callUs'), href: 'tel:+255745700500' },
    ],
  };

  const trustBadges = [
    { icon: ShieldCheck, textKey: 'footer.dedicatedCare' },
    { icon: Truck, textKey: 'footer.fastDelivery' },
    { icon: Headphones, textKey: 'footer.proSupport' },
  ];

  return (
    <footer>
      {/* Trust badges bar */}
      <div className="bg-white py-6 border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.textKey} className="flex items-center gap-3 text-sm text-[#0f1c2e]">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                  <badge.icon size={20} className="text-primary drop-shadow-sm" />
                </div>
                <span className="font-bold tracking-wide">{t(badge.textKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#001738] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center mb-6 bg-white/95 px-[10px] py-[5px] rounded-xl shadow-sm border border-white/10">
                <Image src="/images/viabtechlogo.png" alt="Viabtech Logo" width={180} height={80} className="h-14 w-auto object-contain" />
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">{t('footer.desc')}</p>
              <div className="space-y-4 text-sm">
                <a href="tel:+255745700500" className="flex items-center gap-3 text-white/80 hover:text-cyan-400 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Phone size={14} className="text-cyan-400 shrink-0" /></div>
                  +255 745 700 500 / +255 746 000 786
                </a>
                <a href="mailto:sales@viabtech.com" className="flex items-center gap-3 text-white/80 hover:text-cyan-400 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Mail size={14} className="text-cyan-400 shrink-0" /></div>
                  sales@viabtech.com
                </a>
                <div className="flex items-start gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0"><MapPin size={14} className="text-cyan-400" /></div>
                  <div className="flex flex-col space-y-2 mt-1.5">
                    <a href="https://maps.google.com/?cid=7711297827740443260&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=IN&source=embed" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      <strong className="text-white">Epson Experience Zone:</strong> VIAB TECH LTD (Epson), P.O.Box 105047, Ground Floor, Uhuru Heights, Bibi Titi Mohamed Rd, Dar es Salaam, Tanzania
                    </a>
                    <a href="https://maps.google.com/?cid=15635631984227566733&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en&gl=IN&source=embed" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      <strong className="text-white">Canon Authorized Showroom:</strong> PLOT NO 1357/208A, Ground Floor, Next To Peacock Hotel, Bibi Titi Mohamed Rd, Dar es Salaam, Tanzania
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} aria-label={social.name} title={social.name} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">{t('footer.products')}</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}><Link href={link.href} className="text-sm text-white/70 hover:text-cyan-400 hover:translate-x-1 inline-block transition-all">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">{t('footer.services')}</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}><Link href={link.href} className="text-sm text-white/70 hover:text-cyan-400 hover:translate-x-1 inline-block transition-all">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">{t('footer.needHelp')}</h4>
              <div className="space-y-4 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0"><Clock size={14} className="text-cyan-400" /></div>
                  <div className="mt-1.5">
                    <p className="mb-1">{t('contact.hoursMF')}</p>
                    <p>{t('contact.hoursSat')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {footerLinks.help.map((link) => (
                  <Link key={link.name} href={link.href} className="block text-sm text-white/70 hover:text-cyan-400 hover:translate-x-1 transition-all">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <Link href="/privacy" className="hover:text-cyan-400 transition-colors">{t('footer.privacy')}</Link>
              <Link href="/terms" className="hover:text-cyan-400 transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
