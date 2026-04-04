import Link from 'next/link';
import { Target, Eye, Users, ShieldCheck, Globe, ArrowRight, Heart, Zap, Building } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us', description: 'Learn about Viabtech – Tanzania\'s authorized Canon and Epson dealer.' };

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Viabtech established in Dar es Salaam as a printer solutions provider.' },
  { year: '2017', title: 'Canon Partnership', desc: 'Became an authorized Canon dealer and service partner.' },
  { year: '2019', title: 'Epson Authorization', desc: 'Added Epson to our authorized dealer portfolio.' },
  { year: '2021', title: 'Expansion', desc: 'Expanded with managed print services and IT support.' },
  { year: '2023', title: 'Service Center', desc: 'Opened our dedicated authorized service and repair center.' },
  { year: '2025', title: 'Regional Growth', desc: 'Serving clients across East Africa with 1,500+ active customers.' },
];

const values = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'We deal only in genuine, authorized products with transparent pricing.' },
  { icon: Zap, title: 'Excellence', desc: 'We strive for the highest quality in every product and service.' },
  { icon: Heart, title: 'Customer First', desc: 'Your success is our success. We go above and beyond.' },
  { icon: Globe, title: 'Innovation', desc: 'We stay ahead of technology trends for the best solutions.' },
];

const team = [
  { name: 'John Mosha', role: 'CEO & Founder', desc: 'Over 15 years in IT and printing solutions across East Africa.' },
  { name: 'Amina Khalid', role: 'Head of Sales', desc: 'Canon and Epson certified specialist with deep knowledge.' },
  { name: 'David Mkwawa', role: 'Service Manager', desc: 'Factory-trained technician certified by Canon and Epson.' },
  { name: 'Grace Nyerere', role: 'Operations Lead', desc: 'Expert in supply chain and logistics.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="max-w-3xl">
            <div className="section-badge"><Building size={12} /> Since 2015</div>
            <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-6">About <span className="text-primary">Viabtech</span></h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Viabtech is Tanzania&apos;s premier authorized dealer for Canon and Epson, providing comprehensive printing solutions including sales, service, managed print, and IT support across East Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div className="kepler-card p-8"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Target size={24} className="text-primary" /></div>
            <h2 className="text-xl font-bold font-[var(--font-heading)] text-text-primary mb-3">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">To be East Africa&apos;s most trusted partner in printing technology by delivering genuine products with exceptional service and competitive pricing.</p>
          </div>
          <div className="kepler-card p-8"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Eye size={24} className="text-primary" /></div>
            <h2 className="text-xl font-bold font-[var(--font-heading)] text-text-primary mb-3">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">To revolutionize the printing industry in East Africa by making world-class printing technology accessible to every business.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="section-badge mx-auto">Core Values</div><h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">Our Values</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="kepler-card p-6 text-center group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors"><v.icon size={22} className="text-primary" /></div>
                <h3 className="font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="section-badge mx-auto">Our Journey</div><h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">Timeline</h2></div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/15" />
            <div className="space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center text-sm font-bold text-primary z-10">{item.year.slice(2)}</div>
                  <h4 className="font-semibold text-text-primary text-lg">{item.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="section-badge mx-auto">Leadership</div><h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">Our Team</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="kepler-card p-6 text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors"><Users size={32} className="text-primary" /></div>
                <h4 className="font-semibold text-text-primary">{m.name}</h4>
                <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
                <p className="text-xs text-text-secondary">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge mx-auto">Partner With Us</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Partner with Viabtech</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">Join 1,500+ businesses that trust Viabtech for their printing needs.</p>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all">
            Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
