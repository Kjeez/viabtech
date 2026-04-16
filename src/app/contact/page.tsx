'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle, Printer, Loader2 } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          source: 'contact_page',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="page-hero pt-24 pb-16 bg-[#0a1628]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge bg-white/10 border-white/20 text-[#ffffff]">{t('contact.badge')}</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-[var(--font-heading)] text-[#ffffff] mb-6 shadow-none">
            {t('contact.title')} <span className="text-primary-light">{t('contact.titleHighlight')}</span>
          </h1>
          <p className="text-[#d1d5db] text-lg max-w-2xl leading-relaxed font-medium">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-24 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left Side: Contact Information & Locations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-lg transition-all">
                <h3 className="font-bold text-[#0f1c2e] mb-6 text-xl">{t('contact.details')}</h3>
                <div className="space-y-6">
                  <a href="tel:+255745700500" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Phone size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f1c2e] mb-1">{t('contact.phone')}</div>
                      <div className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">+255 745 700 500</div>
                      <div className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">+255 746 000 786</div>
                    </div>
                  </a>
                  <a href="mailto:info@viabtech.co.tz" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Mail size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f1c2e] mb-1">{t('contact.email')}</div>
                      <div className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">info@viabtech.co.tz</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Clock size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f1c2e] mb-1">{t('contact.hours')}</div>
                      <div className="text-sm font-medium text-gray-500">{t('contact.hoursMF')}<br />{t('contact.hoursSat')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Epson Location */}
              <div className="relative bg-white rounded-[2rem] px-8 py-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-lg transition-all overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#003399]" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#003399]/10 flex items-center justify-center shrink-0 group-hover:bg-[#003399] transition-colors duration-300">
                    <Printer size={18} className="text-[#003399] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-bold text-[#0f1c2e]">Epson Experience Zone</h4>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  <a href="https://www.google.com/maps/place/VIAB+Tech/@-6.8106149,39.2836107,17z" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 leading-relaxed hover:text-[#003399] transition-colors">
                    VIAB TECH LTD (Epson)<br />
                    P.O.Box 105047, Ground Floor, Uhuru Heights,<br />
                    Bibi Titi Mohamed Road, Dar es Salaam, Tanzania
                  </a>
                </div>
              </div>

              {/* Canon Location */}
              <div className="relative bg-white rounded-[2rem] px-8 py-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)] hover:shadow-lg transition-all overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#CC0000]" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#CC0000]/10 flex items-center justify-center shrink-0 group-hover:bg-[#CC0000] transition-colors duration-300">
                    <Printer size={18} className="text-[#CC0000] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-bold text-[#0f1c2e]">Canon Authorised Showroom</h4>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  <a href="https://www.google.com/maps/place/Viabtech+canon/@-6.8180867,39.2806048,17z" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 leading-relaxed hover:text-[#CC0000] transition-colors">
                    PLOT NO 1357/208, Ground Floor,<br />
                    Next To Peacock Hotel,<br />
                    Bibi Titi Mohamed Road, Dar es Salaam, Tanzania
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,159,227,0.04)]">
                <h3 className="font-bold text-[#0f1c2e] mb-5 text-lg">{t('contact.quickActions')}</h3>
                <div className="space-y-4">
                  <a href="https://wa.me/255745700500" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition-all text-sm font-bold">
                    <MessageSquare size={18} /> {t('contact.whatsapp')}
                  </a>
                  <a href="tel:+255746000786"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#0a1628] text-white hover:bg-black hover:shadow-lg transition-all text-sm font-bold">
                    <Phone size={18} /> {t('contact.callNow')}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2rem] p-8 sm:p-12 h-full border border-gray-100 shadow-[0_20px_50px_rgba(0,159,227,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Send size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-extrabold font-[var(--font-heading)] text-[#0f1c2e] text-2xl mb-1">{t('contact.sendMessage')}</h3>
                    <p className="text-sm font-medium text-gray-500">{t('contact.sendMessageDesc')}</p>
                  </div>
                </div>
                
                {submitted && (
                  <div className="flex items-center gap-3 p-5 mb-8 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold animate-slide-up relative z-10">
                    <CheckCircle size={20} />
                    {t('contact.thankYou')}
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-3 p-5 mb-8 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold relative z-10">
                    ⚠️ {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.name')} *</label>
                      <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="John Mosha" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.emailLabel')} *</label>
                      <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="john@company.co.tz" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.phoneLabel')}</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="+255 xxx xxx xxx" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.company')}</label>
                      <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="Company Ltd" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.inquiryType')}</label>
                    <select id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white appearance-none cursor-pointer">
                      <option value="">{t('contact.selectInquiry')}</option>
                      <option value="buy">{t('contact.printerSales')}</option>
                      <option value="repair">{t('contact.serviceRepairs')}</option>
                      <option value="managed">{t('contact.managedPrint')}</option>
                      <option value="consumables">{t('contact.inkToner')}</option>
                      <option value="other">{t('contact.generalInquiry')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{t('contact.message')} *</label>
                    <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-[#f8fbff] border border-transparent text-[#0f1c2e] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white resize-none" placeholder={t('contact.messagePlaceholder')} />
                  </div>
                  <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 btn-vibrant rounded-xl text-[1rem] shadow-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={18} /> {t('contact.sendInquiry')}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Interactive Maps */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto bg-primary/10 text-primary border-primary/20">{t('contact.locations')}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[var(--font-heading)] text-[#0f1c2e]">{t('contact.visitShowrooms')}</h2>
            <p className="text-gray-500 mt-3 font-medium text-lg">{t('contact.visitShowroomsDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Epson Map */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(0,159,227,0.06)] hover:shadow-[0_25px_50px_rgba(0,159,227,0.12)] transition-all duration-500 group">
              <div className="p-6 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0f1c2e] text-lg flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#003399]/10 flex items-center justify-center">
                      <MapPin size={16} className="text-[#003399]" />
                    </div>
                    Epson Experience Zone
                  </h4>
                  <p className="text-sm text-gray-500 font-medium mt-2 pl-11">VIAB TECH LTD (Epson)<br />P.O.Box 105047, Ground Floor, Uhuru Heights, Bibi Titi Mohamed Road, Dar es Salaam, Tanzania</p>
                </div>
                <a href="https://www.google.com/maps/place/VIAB+Tech/@-6.8106149,39.2836107,17z" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#003399]/10 text-[#003399] text-sm font-bold hover:bg-[#003399] hover:text-white transition-colors duration-300">
                  {t('contact.directions')}
                </a>
              </div>
              <div className="w-full h-[400px] relative bg-slate-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.664385876534!2d39.28361067483434!3d-6.810614993186932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b582f4019cd%3A0x6b040884a3b5e27c!2sVIAB%20Tech!5e0!3m2!1sen!2sin!4v1776238691897!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Epson Showroom Map"
                  className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover"></iframe>
              </div>
            </div>

            {/* Canon Map */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(0,159,227,0.06)] hover:shadow-[0_25px_50px_rgba(0,159,227,0.12)] transition-all duration-500 group">
              <div className="p-6 bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#0f1c2e] text-lg flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#CC0000]/10 flex items-center justify-center">
                      <MapPin size={16} className="text-[#CC0000]" />
                    </div>
                    Canon Authorised Showroom
                  </h4>
                  <p className="text-sm text-gray-500 font-medium mt-2 pl-11">PLOT NO 1357/208, Ground Floor, Next To Peacock Hotel, Bibi Titi Mohamed Road, Dar es Salaam, Tanzania</p>
                </div>
                <a href="https://www.google.com/maps/place/Viabtech+canon/@-6.8180867,39.2806048,17z" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#CC0000]/10 text-[#CC0000] text-sm font-bold hover:bg-[#CC0000] hover:text-white transition-colors duration-300">
                  {t('contact.directions')}
                </a>
              </div>
              <div className="w-full h-[400px] relative bg-slate-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.41218348842733!2d39.28060482480949!3d-6.818086744152009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b0051cbf787%3A0xd8fcec72d29ec48d!2sViabtech%20canon!5e0!3m2!1sen!2sin!4v1776238635983!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Canon Showroom Map"
                  className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ Section ═══ */}
      <FAQAccordion />
    </>
  );
}
