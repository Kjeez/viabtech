import Link from 'next/link';
import { ShieldCheck, Wrench, Clock, Award, Phone, ArrowRight, CheckCircle, Printer, Headphones } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { 
  title: 'Authorized Service Center', 
  description: 'Viabtech is an authorized Canon and Epson service center in Tanzania.' 
};

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
      <section className="page-hero pt-24 pb-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white mx-auto"><ShieldCheck size={14} className="mr-1" /> Certified Service Center</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-[var(--font-heading)] text-white mb-6">Authorized <span className="text-primary-light">Service Center</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">Factory-certified repair and maintenance by trained technicians using genuine parts. Protect your investment.</p>
        </div>
      </section>

      {/* Navy extension for Certifications */}
      <section className="py-20 bg-[#0a1628] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {certifications.map((cert) => (
              <div key={cert.brand} className="kepler-card-dark bg-[#0b1120] border-white/5 p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,159,227,0.1)] hover:border-primary/30 transition-all duration-500">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: cert.color }}>
                    {cert.brand.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-[var(--font-heading)] text-white">{cert.brand}</h3>
                    <p className="text-sm font-medium text-primary flex items-center gap-1.5 mt-1">
                      <ShieldCheck size={16} /> Authorized Service Partner
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {cert.services.map((s) => (
                    <li key={s} className="flex items-start gap-4 text-sm font-medium text-gray-300">
                      <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">Process</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">Our Service Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((item, i) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-16 h-16 mx-auto rounded-[1.25rem] bg-white shadow-md border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 z-10 relative">
                  <span className="text-xl font-bold text-primary group-hover:text-white transition-colors duration-300">{item.step}</span>
                </div>
                <h4 className="font-bold text-[#0f1c2e] mb-3 text-lg">{item.title}</h4>
                <p className="text-sm font-medium text-gray-500 leading-relaxed px-2">{item.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-[2px] bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Certified Technicians', desc: 'Factory-trained experts.' },
              { icon: Wrench, title: 'Genuine Parts', desc: 'Only authentic parts used.' },
              { icon: Clock, title: 'Fast Turnaround', desc: 'Most repairs in 24-48 hours.' },
              { icon: Headphones, title: 'Warranty Protected', desc: 'All repairs backed by warranty.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-[0_20px_50px_rgba(0,159,227,0.12)] p-8 text-center group hover:-translate-y-1 transition-all duration-400">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f0f7ff] flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <item.icon size={26} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-[#0f1c2e] mb-3 text-lg">{item.title}</h4>
                <p className="text-sm font-medium text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
            <Printer size={32} className="text-primary-light" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] text-white mb-6">Need a Repair?</h2>
          <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">Bring your printer to our authorized service center at Uhuru Heights, or call us to arrange a pickup for corporate clients.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 btn-vibrant rounded-full font-bold">
              Book a Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+255123456789" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
              <Phone size={16} /> +255 123 456 789
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
