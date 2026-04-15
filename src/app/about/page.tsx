'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Users, ShieldCheck, Globe, ArrowRight, Heart, Zap, Building, Award, ExternalLink } from 'lucide-react';
import VideoShowcase from '@/components/VideoShowcase';
import PressSection from '@/components/PressSection';
import EventGallery from '@/components/EventGallery';
import Counter from '@/components/Counter';
import AboutSection from '@/components/AboutSection';
import { useLanguage } from '@/i18n/LanguageContext';
import ImageSlider from '@/components/ImageSlider';
import { slider2Images } from '@/data/sliderData';

const certificates = [
  {
    brand: 'Canon',
    title: 'Canon CPP Silver Partner',
    file: '/certificates/Canon CPP Certificate 2024_Silver_EN_WIP_Viab Tech limited.pdf',
    color: '#CC0000',
    logo: '/images/logo/canon-seeklogo.png',
  },
  {
    brand: 'Canon',
    title: 'Canon Authorized Partner',
    file: '/certificates/Canon Partner_Certificate_TANZANIA_Viab Tech.pdf',
    color: '#CC0000',
    logo: '/images/logo/canon-seeklogo.png',
  },
  {
    brand: 'Canon',
    title: 'Canon Silver B2B Certificate',
    file: '/certificates/Silver_Certificate_VIAB TECH LIMITED_EN_WIP B2B.pdf',
    color: '#CC0000',
    logo: '/images/logo/canon-seeklogo.png',
  },
  {
    brand: 'HP',
    title: 'HP Business Partner Certificate',
    file: '/certificates/HP Business Partner Certificate of Partnership - VIAB TECH LIMITED.pdf',
    color: '#0096D6',
    logo: '/images/logo/hp-seeklogo.png',
  },
  {
    brand: 'Dell',
    title: 'Dell Authorized Partner',
    file: '/certificates/DELL certificate partner.pdf',
    color: '#007DB8',
    logo: '/images/logo/dell-seeklogo.png',
  },
  {
    brand: 'Lenovo',
    title: 'Lenovo 360 Authorization',
    file: '/certificates/Lenovo 360 Engage_AuthorizationLetter.pdf',
    color: '#E2231A',
    logo: '/images/logo/lenovo-seeklogo.png',
  },
  {
    brand: 'Lenovo',
    title: 'Lenovo Infrastructure Solutions',
    file: '/certificates/Lenovo 360_Infrastructure Solutions_BusinessCertificate.pdf',
    color: '#E2231A',
    logo: '/images/logo/lenovo-seeklogo.png',
  },
  {
    brand: 'Lenovo',
    title: 'Lenovo Intelligent Devices',
    file: '/certificates/Lenovo 360_Intelligent Devices_BusinessCertificate.pdf',
    color: '#E2231A',
    logo: '/images/logo/lenovo-seeklogo.png',
  },
];

export default function AboutPage() {
  const { t } = useLanguage();

  const timeline = [
    { year: '2015', titleKey: 'aboutPage.t1Title', descKey: 'aboutPage.t1Desc' },
    { year: '2017', titleKey: 'aboutPage.t2Title', descKey: 'aboutPage.t2Desc' },
    { year: '2019', titleKey: 'aboutPage.t3Title', descKey: 'aboutPage.t3Desc' },
    { year: '2021', titleKey: 'aboutPage.t4Title', descKey: 'aboutPage.t4Desc' },
    { year: '2023', titleKey: 'aboutPage.t5Title', descKey: 'aboutPage.t5Desc' },
    { year: '2025', titleKey: 'aboutPage.t6Title', descKey: 'aboutPage.t6Desc' },
  ];

  const values = [
    { icon: ShieldCheck, titleKey: 'aboutPage.v1Title', descKey: 'aboutPage.v1Desc' },
    { icon: Zap, titleKey: 'aboutPage.v2Title', descKey: 'aboutPage.v2Desc' },
    { icon: Heart, titleKey: 'aboutPage.v3Title', descKey: 'aboutPage.v3Desc' },
    { icon: Globe, titleKey: 'aboutPage.v4Title', descKey: 'aboutPage.v4Desc' },
  ];

  const team = [
    {
      name: 'Mumtaz Satchu Shaikh',
      role: 'Director Operations / Finance',
      photo: '/images/team/mumtaz-satchu-shaikh.jpeg',
      expertise: '20+ years experience in ICT Sector',
      tags: ['Operations', 'Finance', 'Strategy'],
    },
    {
      name: 'Holyday Urio',
      role: 'Technical Manager',
      photo: '/images/team/holyday-urio.jpeg',
      expertise: 'Senior Technical & Sales Development Manager | 12+ years in machine repair & maintenance',
      tags: ['Canon Digital Printing', 'Epson', 'Service & Repair'],
    },
    {
      name: 'Ciana Munisi',
      role: 'Support Coordinator',
      photo: '/images/team/ciana-munisi.jpeg',
      expertise: 'Customer service support specialist',
      tags: ['Epson Printers', 'Projectors', 'Plotters'],
    },
    {
      name: 'Musaib Ahmed Masood',
      role: 'Technician',
      photo: '/images/team/musaib-ahmed-masood.jpeg',
      expertise: 'Degree-qualified printer technician',
      tags: ['L3250 Series', 'L15150 Series'],
    },
  ];

  return (
    <>
      <section className="page-hero pt-24 pb-12 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="max-w-3xl">
            <div className="section-badge bg-white/10 border-white/20 text-white"><Building size={14} className="mr-1" /> {t('aboutPage.badge')}</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-[var(--font-heading)] text-white mb-6">{t('aboutPage.title')} <span className="text-primary-light">{t('aboutPage.titleHighlight')}</span></h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">{t('aboutPage.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* ═══════ WHO WE ARE ═══════ */}
      <AboutSection showCta={false} />

      {/* ═══════ CERTIFICATES & AUTHORIZATIONS ═══════ */}
      <section className="py-24 bg-gradient-to-b from-[#f8fbff] to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#CC0000]/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">
              <Award size={12} /> Certifications
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">
              Certificates & <span className="text-primary">Authorizations</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Officially certified and authorized by the world&apos;s leading technology brands to sell, service, and support their products in Tanzania and East Africa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <a
                key={idx}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-[1.75rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />

                {/* Hover glow */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                  style={{ background: cert.color }}
                />

                {/* Brand logo */}
                <div className="relative w-[100px] h-[50px] mb-5 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors overflow-hidden">
                  <Image
                    src={cert.logo}
                    alt={`${cert.brand} logo`}
                    width={80}
                    height={36}
                    className="object-contain max-h-[36px] max-w-[72px] mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>

                {/* Certificate icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  style={{ background: `${cert.color}12` }}
                >
                  <Award size={22} style={{ color: cert.color }} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#0f1c2e] text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{cert.title}</h3>

                {/* View link */}
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: cert.color }}
                >
                  View Certificate <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ImageSlider images={slider2Images} autoPlayInterval={5500} rounded="rounded-none" />

      {/* ═══════ MISSION & VISION (Dark Navy) ═══════ */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div className="kepler-card-dark bg-[#0b1120] border-white/5 p-10 sm:p-12 shadow-[0_15px_40px_rgba(0,159,227,0.08)]">
            <div className="w-16 h-16 rounded-[1.25rem] bg-primary/20 flex items-center justify-center mb-6">
              <Target size={28} className="text-primary-light" />
            </div>
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-white mb-4">{t('aboutPage.mission')}</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{t('aboutPage.missionDesc')}</p>
          </div>
          <div className="kepler-card-dark bg-[#0b1120] border-white/5 p-10 sm:p-12 shadow-[0_15px_40px_rgba(0,159,227,0.08)]">
            <div className="w-16 h-16 rounded-[1.25rem] bg-primary/20 flex items-center justify-center mb-6">
              <Eye size={28} className="text-primary-light" />
            </div>
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-white mb-4">{t('aboutPage.vision')}</h2>
            <p className="text-gray-400 leading-relaxed text-lg">{t('aboutPage.visionDesc')}</p>
          </div>
        </div>
      </section>

      {/* ═══════ CORE VALUES (Light Premium) ═══════ */}
      <section className="py-24 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">{t('aboutPage.valuesBadge')}</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">{t('aboutPage.valuesTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.titleKey} className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-[0_20px_50px_rgba(0,159,227,0.12)] p-8 text-center group hover:-translate-y-1 transition-all duration-400">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#f0f7ff] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <v.icon size={26} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[#0f1c2e] mb-3 text-lg">{t(v.titleKey)}</h3>
                <p className="text-sm font-medium text-gray-500 leading-relaxed px-2">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TIMELINE (Pitch Black) ═══════ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-white/10 text-white border-white/20">{t('aboutPage.journeyBadge')}</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-white">{t('aboutPage.journeyTitle')}</h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-12">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-16 group">
                  <div className="absolute left-0 w-12 h-12 rounded-xl bg-[#0b1120] border border-white/10 shadow-lg flex items-center justify-center text-sm font-black text-primary z-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {item.year.slice(2)}
                  </div>
                  <h4 className="font-bold text-white text-xl mb-1">{t(item.titleKey)}</h4>
                  <p className="text-gray-400 leading-relaxed text-base">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TEAM (Modern Premium) ═══════ */}
      <section className="py-24 bg-gradient-to-b from-white to-[#f4f8ff] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">
              <Users size={12} className="mr-1" /> {t('aboutPage.teamBadge')}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e] mb-4">{t('aboutPage.teamTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">The passionate professionals behind Viab Tech&apos;s commitment to excellence.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, idx) => (
              <div
                key={m.name}
                className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,87,184,0.15)] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* Photo */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent" />
                  
                  {/* Name & role overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="font-bold text-white text-lg leading-tight mb-1">{m.name}</h4>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold backdrop-blur-sm">
                      {m.role}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-4">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{m.expertise}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[#f0f7ff] text-primary text-[11px] font-semibold border border-blue-100/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoShowcase />
      <div className="bg-[#f8fbff]"><PressSection /></div>
      <EventGallery />

      {/* ═══════ CTA (Pitch Black) ═══════ */}
      <section className="py-24 bg-[#0a1628] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge mx-auto bg-white/10 text-white border-white/20 mb-6">{t('aboutPage.ctaBadge')}</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] mb-6 text-white leading-tight">{t('aboutPage.ctaTitle')} <span className="text-primary-light">{t('aboutPage.ctaTitleHighlight')}</span></h2>
          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">{t('aboutPage.ctaDesc')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 btn-vibrant text-base font-bold rounded-full group mx-auto">
            {t('aboutPage.ctaButton')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
