'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  User, Phone, Mail, MapPin, Hash, Calendar, CheckCircle,
  Loader2, Shield, Wrench, Truck, FileText, AlertTriangle,
  ChevronDown, Printer, Send,
} from 'lucide-react';

const CANON_RED = '#CC0000';

const MODEL_SUGGESTIONS = [
  'imageRUNNER 2425',
  'imageRUNNER 2625i',
  'imageRUNNER ADVANCE DX 4751i',
  'imageRUNNER ADVANCE DX 6780i',
  'imageFORCE C3226i',
  'MAXIFY GX4050',
  'MAXIFY GX7050',
  'PIXMA G3420',
  'imagePROGRAF TM-300',
  'imagePROGRAF TM-5300',
  'imagePROGRAF GP-300',
  'COLORADO M5W',
  'ARIZONA 135 GT',
  'iSensys LBP236dw',
  'iSensys MF465dw',
  'imageFORMULA DR-C225II',
  'Other',
];

export default function CanonRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', location: '',
    modelNumber: '', serialNumber: '', purchaseDate: '', machineStatus: 'working',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) { setError('Please agree to the service terms before submitting.'); return; }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/canon-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit registration');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-[var(--font-heading)]">Registration Successful!</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Thank you for registering your Canon product with VIAB TECH.
            Our team will review your registration and contact you shortly.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Model</span><span className="font-semibold text-sm">{formData.modelNumber}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Serial</span><span className="font-semibold text-sm">{formData.serialNumber}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 text-sm">Name</span><span className="font-semibold text-sm">{formData.fullName}</span></div>
          </div>
          <a href="/canon-register" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm" style={{ background: CANON_RED }}>
            Register Another Product
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Canon Header ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center">
          <div className="flex items-center gap-4">
            <Image src="/images/logo/canon-seeklogo.png" alt="Canon" width={120} height={40} className="h-8 w-auto object-contain" />
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            <span className="hidden sm:block text-sm font-semibold text-gray-500">Service Center — Tanzania</span>
          </div>
        </div>
      </header>

      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d0000 40%, #CC0000 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5">
          <div className="absolute right-[-10%] top-[50%] translate-y-[-50%] w-[500px] h-[500px] rounded-full border-[40px] border-white/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
              <Printer size={14} /> Product Registration
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-[var(--font-heading)] leading-tight">
              Register Your Canon Product
            </h1>
            <p className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Enjoy <strong className="text-white">3 months of free service</strong> when you register your Canon device with VIAB TECH — your authorized Canon partner in Tanzania.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* ─── Left: Form ─── */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${CANON_RED}, #ff4444, ${CANON_RED})` }} />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${CANON_RED}10` }}>
                  <FileText size={24} style={{ color: CANON_RED }} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)]">Registration Form</h2>
                  <p className="text-sm text-gray-500 font-medium">Fill in your product details below</p>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
                  <AlertTriangle size={18} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <FormField icon={<User size={18} />} label="Full Name" required>
                  <input type="text" required value={formData.fullName} onChange={e => update('fullName', e.target.value)}
                    className="form-input-canon" placeholder="Enter your full name" id="canon-fullname" />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <FormField icon={<Phone size={18} />} label="Mobile Phone" required>
                    <input type="tel" required value={formData.phone} onChange={e => update('phone', e.target.value)}
                      className="form-input-canon" placeholder="+255 xxx xxx xxx" id="canon-phone" />
                  </FormField>
                  {/* Email */}
                  <FormField icon={<Mail size={18} />} label="Email Address" required>
                    <input type="email" required value={formData.email} onChange={e => update('email', e.target.value)}
                      className="form-input-canon" placeholder="you@email.com" id="canon-email" />
                  </FormField>
                </div>

                {/* Location */}
                <FormField icon={<MapPin size={18} />} label="Location (City / Region)">
                  <input type="text" value={formData.location} onChange={e => update('location', e.target.value)}
                    className="form-input-canon" placeholder="e.g., Dar es Salaam" id="canon-location" />
                </FormField>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Model Number */}
                  <FormField icon={<Printer size={18} />} label="Model Number" required>
                    <div className="relative">
                      <select required value={formData.modelNumber} onChange={e => update('modelNumber', e.target.value)}
                        className="form-input-canon appearance-none cursor-pointer pr-10" id="canon-model">
                        <option value="">Select model...</option>
                        {MODEL_SUGGESTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </FormField>
                  {/* Serial Number */}
                  <FormField icon={<Hash size={18} />} label="Serial Number" required>
                    <input type="text" required value={formData.serialNumber} onChange={e => update('serialNumber', e.target.value)}
                      className="form-input-canon" placeholder="Enter serial number" id="canon-serial" />
                  </FormField>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Purchase Date */}
                  <FormField icon={<Calendar size={18} />} label="Date of Purchase (Approx.)">
                    <input type="month" value={formData.purchaseDate} onChange={e => update('purchaseDate', e.target.value)}
                      className="form-input-canon" id="canon-purchase-date" />
                  </FormField>
                  {/* Machine Status */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Machine Status *</label>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => update('machineStatus', 'working')}
                        className={`flex-1 py-3.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.machineStatus === 'working'
                          ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'}`}>
                        ✅ Working
                      </button>
                      <button type="button" onClick={() => update('machineStatus', 'not_working')}
                        className={`flex-1 py-3.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.machineStatus === 'not_working'
                          ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'}`}>
                        ❌ Not Working
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 accent-[#CC0000]" />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I have read and agree to the <strong className="text-gray-900">Service Terms &amp; Conditions</strong> listed below,
                      including the back-to-base service policy and that only labour is covered free of charge.
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={sending || !agreedTerms}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl text-white text-base font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: sending || !agreedTerms ? '#999' : `linear-gradient(135deg, ${CANON_RED}, #990000)` }}>
                  {sending ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><Send size={18} /> Register My Canon Product</>}
                </button>
              </form>
            </div>
          </div>

          {/* ─── Right: Info & Terms ─── */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            {/* Benefits Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h3 className="font-extrabold text-gray-900 text-lg mb-5 font-[var(--font-heading)] flex items-center gap-2">
                <Shield size={20} style={{ color: CANON_RED }} /> Why Register?
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: <Wrench size={16} />, title: '3 Months Free Service', desc: 'Complimentary labour on repairs at our authorized service center' },
                  { icon: <Shield size={16} />, title: 'Extended Warranty Eligibility', desc: 'Extend your Canon warranty from 1 year to 2 years for free' },
                  { icon: <Printer size={16} />, title: 'eMaintenance Support', desc: 'Connect to Canon eMaintenance for proactive device monitoring' },
                  { icon: <FileText size={16} />, title: 'Service Records', desc: 'Maintain a complete service history for your Canon device' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${CANON_RED}10`, color: CANON_RED }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h3 className="font-extrabold text-gray-900 text-lg mb-5 font-[var(--font-heading)] flex items-center gap-2">
                <FileText size={20} style={{ color: CANON_RED }} /> Service Terms &amp; Conditions
              </h3>
              <div className="space-y-4">
                {[
                  { icon: <Truck size={16} />, title: 'Back to Base Service', text: 'The 3-month free service is strictly for products brought to the authorized service center.' },
                  { icon: <MapPin size={16} />, title: 'Onsite Service Charges', text: 'If you require a technician to visit your location, transportation and accommodation costs will be charged to the customer.' },
                  { icon: <FileText size={16} />, title: 'Proof of Purchase', text: 'You may be required to present your purchase receipt to validate the 3-month promotional offer.' },
                  { icon: <Wrench size={16} />, title: 'Labour Only', text: 'Only labour is free. Parts and consumables will be quoted if required, and the client can procure the same upon satisfactory explanation.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${CANON_RED}10`, color: CANON_RED }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, #1a1a1a, ${CANON_RED})` }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <h3 className="font-extrabold text-lg mb-4 font-[var(--font-heading)]">Need Help?</h3>
                <div className="space-y-3">
                  <a href="tel:+255745700500" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors text-sm font-medium">
                    <Phone size={16} /> +255 745 700 500
                  </a>
                  <a href="mailto:info@viabtech.co.tz" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors text-sm font-medium">
                    <Mail size={16} /> info@viabtech.co.tz
                  </a>
                  <div className="flex items-start gap-3 text-white/80 text-sm">
                    <MapPin size={16} className="shrink-0 mt-0.5" />
                    <span>PLOT NO 1357/208, Ground Floor, Next To Peacock Hotel, Bibi Titi Mohamed Road, Dar es Salaam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Canon Warranty Info Section ─── */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)]">
              Canon Warranty &amp; Extended Coverage
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
              Canon offers the opportunity to extend warranty from 1 year to 2 years, ensuring greater peace of mind and continued support for your device.
            </p>
          </div>

          {/* Warranty Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { title: '1+1 Year Warranty', desc: 'Extend your Canon warranty to 2 years for free on eligible products', icon: <Shield size={24} /> },
              { title: 'eMaintenance', desc: 'Register and connect to eMaintenance within the 1st year for extended coverage', icon: <Wrench size={24} /> },
              { title: 'Products Covered', desc: 'iSensysX, imageRUNNER, imageRUNNER ADVANCE DX, imageFORCE, imageFORMULA', icon: <Printer size={24} /> },
              { title: 'Warranty Policy', desc: '1 year for DS Copiers & LFP products. Manufacturing defects only. Spares replacement.', icon: <FileText size={24} /> },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-red-100 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:text-white" style={{ background: `${CANON_RED}10`, color: CANON_RED }}>
                  {card.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* CCNA B2B Warranty Policy Details */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-12">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 font-[var(--font-heading)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${CANON_RED}10` }}>
                <Shield size={20} style={{ color: CANON_RED }} />
              </div>
              CCNA B2B Warranty Policy — Products Covered
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { cat: 'Workspace (DS)', items: ['iSensysX', 'imageRUNNER', 'imageRUNNER ADVANCE DX', 'imageFORCE', 'DIMS SCANNERS', 'imageFORMULA'] },
                { cat: 'Large Format Printers', items: ['imagePROGRAF Series TM, TX, TZ, TC, PRO, GP', 'LFP Print Head – 1 year OR max 4 litres of jetted ink (whichever first)'] },
                { cat: 'LFC (Colorado)', items: ['Spares: 2 Years', 'Print Head: 2 years or 20K SQM or 12 liters ink', 'All LFC products to be connected on Canon PRISMASERVICE'] },
                { cat: 'LFC (Arizona)', items: ['Spares: 2 Years', 'NO Print Heads covered', 'Must be connected on Canon PRISMASERVICE SERVER'] },
              ].map((col, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="px-4 py-3 text-white text-sm font-bold" style={{ background: CANON_RED }}>{col.cat}</div>
                  <ul className="p-4 space-y-2">
                    {col.items.map((item, j) => (
                      <li key={j} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: CANON_RED }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Important Notes:</strong> On-site repair up to 70 km radius from nearest Canon Authorized Warranty Location.
                Travel outside radius will be charged. Print Heads &amp; Printer Warranty will be VOID if non-genuine inks are used.
                WARRANTY does NOT cover consumables, drums, and periodically replaced parts.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ─── Footer ─── */}
      <footer className="bg-[#1a1a1a] text-white/70 py-10 border-t-4" style={{ borderTopColor: CANON_RED }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src="/images/logo/canon-seeklogo.png" alt="Canon" width={80} height={28} className="h-6 w-auto object-contain brightness-200" />
              <span className="text-xs text-white/40">×</span>
              <Image src="/images/viabtechlogo.png" alt="VIAB TECH" width={80} height={28} className="h-6 w-auto object-contain brightness-200 opacity-60" />
            </div>
            <p className="text-xs text-white/40 text-center sm:text-right">
              © {new Date().getFullYear()} VIAB TECH LTD — Authorized Canon Dealer, Tanzania. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Reusable Form Field Wrapper ─── */
function FormField({ icon, label, required, children }: { icon: React.ReactNode; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
        <span style={{ color: CANON_RED }}>{icon}</span> {label} {required && <span style={{ color: CANON_RED }}>*</span>}
      </label>
      {children}
    </div>
  );
}
