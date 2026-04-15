'use client';

import { useState } from 'react';
import { Settings, CheckCircle, MapPin, Send, Cpu, ShieldCheck, PenTool, Search } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { useLanguage } from '@/i18n/LanguageContext';
import Image from 'next/image';

export default function ServiceCenterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', brand: '', productType: '', model: '', serialNumber: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', brand: '', productType: '', model: '', serialNumber: '', message: '' });
  };

  const capabilities = [
    { textKey: 'serviceCenter.cap.diag', icon: Search },
    { textKey: 'serviceCenter.cap.parts', icon: Cpu },
    { textKey: 'serviceCenter.cap.warranty', icon: ShieldCheck },
    { textKey: 'serviceCenter.cap.maintenance', icon: PenTool },
  ];

  return (
    <>
      <section className="page-hero pt-24 pb-16 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-white">{t('serviceCenter.badge')}</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-[var(--font-heading)] text-white mb-6">
            {t('serviceCenter.title')} <span className="text-primary-light">{t('serviceCenter.titleHighlight')}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{t('serviceCenter.subtitle')}</p>
        </div>
      </section>

      {/* Brand Zones */}
      <section className="py-20 bg-[#f8fbff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* EPSON Zone */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border-2 border-[#003399]/20 shadow-[0_15px_40px_rgba(0,51,153,0.08)] hover:shadow-[0_25px_50px_rgba(0,51,153,0.15)] transition-all relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#003399]/10 rounded-full blur-2xl group-hover:bg-[#003399]/20 transition-colors" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 flex items-center shrink-0">
                  <Image src="/images/epson.png" alt="Epson" width={100} height={40} className="h-8 w-auto object-contain" />
                </div>
                <h3 className="font-bold text-[#0f1c2e] text-2xl">{t('serviceCenter.epsonTitle')}</h3>
              </div>
              <p className="text-gray-600 mb-8">{t('serviceCenter.epsonDesc')}</p>
              
              <ul className="space-y-4">
                {capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#003399]/10 flex items-center justify-center shrink-0">
                      <cap.icon size={16} className="text-[#003399]" />
                    </div>
                    <span className="font-semibold text-[#0f1c2e]">{t(cap.textKey)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CANON Zone */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 border-2 border-[#CC0000]/20 shadow-[0_15px_40px_rgba(204,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(204,0,0,0.15)] transition-all relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#CC0000]/10 rounded-full blur-2xl group-hover:bg-[#CC0000]/20 transition-colors" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 flex items-center shrink-0">
                  <Image src="/images/canon.png" alt="Canon" width={100} height={40} className="h-8 w-auto object-contain" />
                </div>
                <h3 className="font-bold text-[#0f1c2e] text-2xl">{t('serviceCenter.canonTitle')}</h3>
              </div>
              <p className="text-gray-600 mb-8">{t('serviceCenter.canonDesc')}</p>
              
              <ul className="space-y-4">
                {capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#CC0000]/10 flex items-center justify-center shrink-0">
                      <cap.icon size={16} className="text-[#CC0000]" />
                    </div>
                    <span className="font-semibold text-[#0f1c2e]">{t(cap.textKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request & Locations Layered Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-[0_20px_50px_rgba(0,159,227,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Settings size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-extrabold font-[var(--font-heading)] text-[#0f1c2e] text-2xl mb-1">{t('serviceCenter.form.title')}</h3>
                    <p className="text-sm font-medium text-gray-500">{t('serviceCenter.form.subtitle')}</p>
                  </div>
                </div>
                
                {submitted && (
                  <div className="flex items-center gap-3 p-5 mb-8 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold animate-slide-up relative z-10">
                    <CheckCircle size={20} />
                    {t('contact.thankYou')}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.name')} *</label>
                      <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all" placeholder="John Mosha" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.phoneLabel')} *</label>
                      <input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all" placeholder="+255 xxx xxx xxx" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="brand" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('serviceCenter.form.brand')} *</label>
                      <select id="brand" required value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select Brand</option>
                        <option value="canon">Canon</option>
                        <option value="epson">Epson</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productType" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('serviceCenter.form.productType')} *</label>
                      <select id="productType" required value={formData.productType} onChange={(e) => setFormData({...formData, productType: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select Type</option>
                        <option value="printer">Printer / Plotter</option>
                        <option value="camera">Camera / Lens</option>
                        <option value="projector">Projector</option>
                        <option value="scanner">Scanner</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="model" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('serviceCenter.form.model')}</label>
                      <input type="text" id="model" required value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all" placeholder="e.g., EcoTank L3250" />
                    </div>
                    <div>
                      <label htmlFor="serialNumber" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('serviceCenter.form.serial')}</label>
                      <input type="text" id="serialNumber" value={formData.serialNumber} onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all" placeholder="S/N" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('serviceCenter.form.issue')}</label>
                    <textarea id="message" required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none" placeholder="..." />
                  </div>
                  
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 btn-vibrant rounded-xl text-[1rem] shadow-xl mt-4">
                    <Send size={18} /> {t('contact.sendInquiry')}
                  </button>
                </form>
              </div>
            </div>

            {/* Maps Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="mb-6">
                <div className="section-badge bg-primary/10 text-primary border-primary/20">{t('serviceCenter.dropoff.title')}</div>
                <h2 className="text-2xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">{t('serviceCenter.dropoff.title')}</h2>
                <p className="text-gray-500 mt-2 font-medium">{t('serviceCenter.dropoff.subtitle')}</p>
              </div>

              {/* Epson Map */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md group">
                <div className="p-5 bg-white flex flex-col gap-2">
                  <h4 className="font-bold text-[#003399] flex items-center gap-2 text-lg">
                    <MapPin size={18} /> Epson Experience Zone
                  </h4>
                  <a href="https://www.google.com/maps/place/VIAB+Tech/@-6.8106149,39.2836107,17z" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 font-medium leading-relaxed hover:text-[#003399] transition-colors block">
                    Uhuru Heights, Ground Floor<br/>Bibi Titi Mohamed Road
                  </a>
                </div>
                <div className="w-full h-[220px] relative bg-slate-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.664385876534!2d39.28361067483434!3d-6.810614993186932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b582f4019cd%3A0x6b040884a3b5e27c!2sVIAB%20Tech!5e0!3m2!1sen!2sin!4v1776238691897!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Epson Showroom Map" className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover"></iframe>
                </div>
              </div>

              {/* Canon Map */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md group">
                <div className="p-5 bg-white flex flex-col gap-2">
                  <h4 className="font-bold text-[#CC0000] flex items-center gap-2 text-lg">
                    <MapPin size={18} /> Canon Authorised Showroom
                  </h4>
                  <a href="https://www.google.com/maps/place/Viabtech+canon/@-6.8180867,39.2806048,17z" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 font-medium leading-relaxed hover:text-[#CC0000] transition-colors block">
                    Next To Peacock Hotel<br/>Bibi Titi Mohamed Road
                  </a>
                </div>
                <div className="w-full h-[220px] relative bg-slate-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.41218348842733!2d39.28060482480949!3d-6.818086744152009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b0051cbf787%3A0xd8fcec72d29ec48d!2sViabtech%20canon!5e0!3m2!1sen!2sin!4v1776238635983!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Canon Showroom Map" className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover"></iframe>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />
    </>
  );
}
