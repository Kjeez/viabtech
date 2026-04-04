'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  };

  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge">Contact</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Contact <span className="text-primary">Us</span></h1>
          <p className="text-text-secondary text-lg max-w-2xl">Ready to upgrade your printing? Get in touch for a personalized consultation and quote.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="kepler-card p-7">
                <h3 className="font-semibold text-text-primary mb-6 text-lg">Get in Touch</h3>
                <div className="space-y-5">
                  <a href="tel:+255123456789" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Phone size={18} className="text-primary" /></div>
                    <div><div className="text-sm font-medium text-text-primary">Phone</div><div className="text-sm text-text-secondary group-hover:text-primary transition-colors">+255 123 456 789</div></div>
                  </a>
                  <a href="mailto:info@viabtech.co.tz" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-primary" /></div>
                    <div><div className="text-sm font-medium text-text-primary">Email</div><div className="text-sm text-text-secondary group-hover:text-primary transition-colors">info@viabtech.co.tz</div></div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-primary" /></div>
                    <div><div className="text-sm font-medium text-text-primary">Address</div><div className="text-sm text-text-secondary">Posta / Kisutu Street<br />Dar es Salaam, Tanzania</div></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Clock size={18} className="text-primary" /></div>
                    <div><div className="text-sm font-medium text-text-primary">Hours</div><div className="text-sm text-text-secondary">Mon - Fri: 8:00 AM - 5:00 PM<br />Sat: 9:00 AM - 1:00 PM</div></div>
                  </div>
                </div>
              </div>
              <div className="kepler-card p-7">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="https://wa.me/255123456789" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium">
                    <MessageSquare size={18} /> Chat on WhatsApp
                  </a>
                  <a href="tel:+255123456789"
                    className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-medium">
                    <Phone size={18} /> Call Now
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="kepler-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Send size={18} className="text-primary" /></div>
                  <div><h3 className="font-semibold text-text-primary text-lg">Send Us a Message</h3><p className="text-xs text-text-muted">We&apos;ll respond within 24 hours</p></div>
                </div>
                {submitted && (<div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm animate-slide-up"><CheckCircle size={18} />Thank you! We&apos;ll get back to you shortly.</div>)}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="name" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all" placeholder="John Mosha" /></div>
                    <div><label htmlFor="email" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Email *</label>
                      <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all" placeholder="john@company.co.tz" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="phone" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Phone</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all" placeholder="+255 xxx xxx xxx" /></div>
                    <div><label htmlFor="company" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Company</label>
                      <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all" placeholder="Company Ltd" /></div>
                  </div>
                  <div><label htmlFor="service" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Service</label>
                    <select id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all">
                      <option value="">Select a service...</option><option value="buy">Buy a Printer</option><option value="repair">Printer Repair</option>
                      <option value="managed">Managed Print</option><option value="rental">Rental</option><option value="bulk">Bulk Order</option><option value="other">Other</option>
                    </select></div>
                  <div><label htmlFor="message" className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none" placeholder="Tell us about your printing needs..." /></div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="h-80 flex items-center justify-center">
          <div className="text-center"><MapPin size={48} className="text-primary/20 mx-auto mb-4" /><p className="text-text-muted text-sm">Interactive Map</p><p className="text-text-secondary text-xs mt-1">Posta / Kisutu Street, Dar es Salaam</p></div>
        </div>
      </section>
    </>
  );
}
