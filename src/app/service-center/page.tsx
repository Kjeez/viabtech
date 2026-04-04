import Link from 'next/link';
import { ShieldCheck, Wrench, Clock, Award, Phone, ArrowRight, CheckCircle, Printer, Headphones } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Authorized Service Center', description: 'Viabtech is an authorized Canon and Epson service center in Tanzania.' };

const certifications = [
  { brand: 'Canon', color: '#CC0000', services: ['Warranty repairs and claims', 'Out-of-warranty repairs', 'Genuine Canon parts only', 'Firmware updates & calibration', 'Annual maintenance contracts'] },
  { brand: 'Epson', color: '#003399', services: ['Warranty repairs and claims', 'Out-of-warranty repairs', 'Genuine Epson parts only', 'Print head cleaning & alignment', 'EcoTank system servicing'] },
];

const process = [
  { step: '01', title: 'Contact Us', desc: 'Call or visit with your printer issue.' },
  { step: '02', title: 'Diagnosis', desc: 'Thorough diagnosis by certified technicians.' },
  { step: '03', title: 'Quote', desc: 'Transparent quote with no hidden charges.' },
  { step: '04', title: 'Repair', desc: 'Repair with genuine parts and full testing.' },
  { step: '05', title: 'Delivery', desc: 'Pickup or delivery back to your doorstep.' },
];

export default function ServiceCenterPage() {
  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge mx-auto"><ShieldCheck size={12} /> Certified Service Center</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Authorized <span className="text-primary">Service Center</span></h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Factory-certified repair and maintenance by trained technicians using genuine parts.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="section-badge mx-auto">Certifications</div><h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">Certified by Manufacturers</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <div key={cert.brand} className="kepler-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-md" style={{ background: cert.color }}>{cert.brand.charAt(0)}</div>
                  <div><h3 className="text-xl font-bold text-text-primary">{cert.brand}</h3><p className="text-sm text-primary flex items-center gap-1.5"><ShieldCheck size={14} /> Authorized Service Partner</p></div>
                </div>
                <ul className="space-y-3">
                  {cert.services.map((s) => (<li key={s} className="flex items-start gap-3 text-sm text-text-secondary"><CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />{s}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><div className="section-badge mx-auto">Process</div><h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary">Our Service Process</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><span className="text-lg font-bold text-primary">{item.step}</span></div>
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                {i < process.length - 1 && <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-primary/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Certified Technicians', desc: 'Factory-trained experts.' },
              { icon: Wrench, title: 'Genuine Parts', desc: 'Only authentic parts used.' },
              { icon: Clock, title: 'Fast Turnaround', desc: 'Most repairs in 24-48 hours.' },
              { icon: Headphones, title: 'Warranty Protected', desc: 'All repairs backed by warranty.' },
            ].map((item) => (
              <div key={item.title} className="kepler-card p-6 text-center group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors"><item.icon size={22} className="text-primary" /></div>
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <Printer size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Need a Repair?</h2>
          <p className="text-text-secondary mb-8">Bring your printer to our service center or call us for a pickup.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all">Book a Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
            <a href="tel:+255123456789" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-text-primary text-text-primary font-semibold hover:bg-text-primary hover:text-white transition-all"><Phone size={16} /> +255 123 456 789</a>
          </div>
        </div>
      </section>
    </>
  );
}
