'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Users, ShieldCheck, Globe, ArrowRight, Heart, Zap, Building } from 'lucide-react';
import VideoShowcase from '@/components/VideoShowcase';
import PressSection from '@/components/PressSection';
import EventGallery from '@/components/EventGallery';
import Counter from '@/components/Counter';
import { useLanguage } from '@/i18n/LanguageContext';

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
    { name: 'John Mosha', role: 'CEO & Founder', desc: 'Over 15 years in IT and printing solutions across East Africa.' },
    { name: 'Amina Khalid', role: 'Head of Sales', desc: 'Canon and Epson certified specialist with deep knowledge.' },
    { name: 'David Mkwawa', role: 'Service Manager', desc: 'Factory-trained technician certified by Canon and Epson.' },
    { name: 'Grace Nyerere', role: 'Operations Lead', desc: 'Expert in supply chain and logistics.' },
  ];

  return (
    <>
      <section className="page-hero pt-24 pb-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="max-w-3xl">
            <div className="section-badge bg-white/10 border-white/20 text-white"><Building size={14} className="mr-1" /> {t('aboutPage.badge')}</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-[var(--font-heading)] text-white mb-6">{t('aboutPage.title')} <span className="text-primary-light">{t('aboutPage.titleHighlight')}</span></h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">{t('aboutPage.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* ═══════ WHO WE ARE (Light) ═══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-1 lg:order-2">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary rounded-3xl -z-10" />
              <div className="absolute -bottom-12 -right-6 w-40 h-40 bg-primary rounded-3xl -z-10" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/15">
                <Image src="/images/about-us.jpg" alt="Viab Tech office at Uhuru Heights, Bibi Titi Mohamed Street, Dar es Salaam" width={600} height={450} className="object-cover w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 right-4 left-4 grid grid-cols-3 gap-4">
                <div className="text-center bg-white rounded-2xl py-4 px-2 shadow-xl border border-gray-100 backdrop-blur-md">
                  <div className="text-2xl font-bold text-primary"><Counter end={10} suffix="+" /></div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{t('aboutPage.years')}</div>
                </div>
                <div className="text-center bg-white rounded-2xl py-4 px-2 shadow-xl border border-gray-100 backdrop-blur-md">
                  <div className="text-2xl font-bold text-primary"><Counter end={11} /></div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{t('aboutPage.brands')}</div>
                </div>
                <div className="text-center bg-white rounded-2xl py-4 px-2 shadow-xl border border-gray-100 backdrop-blur-md">
                  <div className="text-2xl font-bold text-primary"><Counter end={2000} suffix="+" formatk /></div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{t('aboutPage.clients')}</div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-1 mt-10 md:mt-0">
              <div className="section-badge bg-primary/10 text-primary border-primary/20">{t('aboutPage.aboutBadge')}</div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e] mb-6">{t('aboutPage.whoWeAre')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">{t('aboutPage.p1')}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">{t('aboutPage.p2')}</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* ═══════ TEAM (White Premium) ═══════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">{t('aboutPage.teamBadge')}</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">{t('aboutPage.teamTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-[0_20px_50px_rgba(0,159,227,0.12)] p-8 text-center group hover:-translate-y-1 transition-all duration-400">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-[#f0f7ff] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Users size={36} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-[#0f1c2e] text-lg mb-1">{m.name}</h4>
                <p className="text-sm text-primary font-bold mb-3">{m.role}</p>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">{m.desc}</p>
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
