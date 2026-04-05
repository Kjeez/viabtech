'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle, Printer } from 'lucide-react';

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
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Visit our authorized showrooms or get in touch for a personalized printing consultation and quote.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left Side: Contact Information & Locations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="kepler-card p-7">
                <h3 className="font-semibold text-text-primary mb-6 text-lg">Contact Details</h3>
                <div className="space-y-5">
                  <a href="tel:+255745700500" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Phone Lines</div>
                      <div className="text-sm text-text-secondary group-hover:text-primary transition-colors">+255 745 700 500</div>
                      <div className="text-sm text-text-secondary group-hover:text-primary transition-colors">+255 746 000 786</div>
                    </div>
                  </a>
                  <a href="mailto:info@viabtech.co.tz" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Email</div>
                      <div className="text-sm text-text-secondary group-hover:text-primary transition-colors">info@viabtech.co.tz</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Business Hours</div>
                      <div className="text-sm text-text-secondary">Mon - Fri: 8:00 AM - 5:00 PM<br />Sat: 9:00 AM - 1:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Epson Location */}
              <div className="kepler-card border-l-4 border-l-[#003399] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#003399]/10 flex items-center justify-center shrink-0">
                    <Printer size={16} className="text-[#003399]" />
                  </div>
                  <h4 className="font-semibold text-text-primary">Epson Showroom</h4>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-text-muted shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">
                    VIAB TECH LTD (Epson)<br />
                    P.O.Box 105047, Ground Floor, Uhuru Heights,<br />
                    Bibi Titi Mohamed Road, Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>

              {/* Canon Location */}
              <div className="kepler-card border-l-4 border-l-[#CC0000] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#CC0000]/10 flex items-center justify-center shrink-0">
                    <Printer size={16} className="text-[#CC0000]" />
                  </div>
                  <h4 className="font-semibold text-text-primary">Canon Zone Showroom</h4>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-text-muted shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">
                    PLOT NO 1357/208, Ground Floor,<br />
                    Next To Peacock Hotel,<br />
                    Bibi Titi Mohamed Road, Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>

              <div className="kepler-card p-6">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="https://wa.me/255745700500" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium">
                    <MessageSquare size={18} /> Chat on WhatsApp
                  </a>
                  <a href="tel:+255746000786"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-medium">
                    <Phone size={18} /> Call Us Now
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-3">
              <div className="kepler-card p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Send size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-xl">Send Us a Message</h3>
                    <p className="text-sm text-text-muted mt-1">We&apos;ll respond within 24 hours regarding your printing requirements.</p>
                  </div>
                </div>
                
                {submitted && (
                  <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm animate-slide-up">
                    <CheckCircle size={18} />
                    Thank you! Your message has been sent successfully. We will get back to you shortly.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="John Mosha" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Email Address *</label>
                      <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="john@company.co.tz" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="+255 xxx xxx xxx" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Company</label>
                      <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white" placeholder="Company Ltd" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Inquiry Type</label>
                    <select id="service" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white appearance-none">
                      <option value="">Select an inquiry type...</option>
                      <option value="buy">Printer Sales & Quotes</option>
                      <option value="repair">Service & Repairs</option>
                      <option value="managed">Managed Print Services</option>
                      <option value="consumables">Ink & Toner</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea id="message" required rows={7} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-light border border-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all focus:bg-white resize-none" placeholder="How can we help you today?" />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <Send size={18} /> Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Interactive Maps */}
      <section className="bg-gradient-to-b from-[#f8fbff] to-white pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-[var(--font-heading)] text-text-primary">Visit Our Showrooms</h2>
            <p className="text-text-secondary mt-2">Find our certified Epson and Canon zones in Dar es Salaam.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Epson Map */}
            <div className="kepler-card overflow-hidden">
              <div className="p-4 bg-white border-b border-border flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary flex items-center gap-2">
                    <MapPin size={16} className="text-[#003399]" /> Epson Experience Centre
                  </h4>
                  <p className="text-xs text-text-muted mt-1">Uhuru Heights, Bibi Titi Mohamed Road</p>
                </div>
                <a 
                  href="https://www.google.com/maps?q=-6.8105502,39.2859816&z=17&hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#003399]/10 text-[#003399] text-xs font-semibold hover:bg-[#003399]/20 transition-colors"
                >
                  Directions
                </a>
              </div>
              <div className="w-full h-[350px] relative bg-slate-100">
                <iframe 
                  src="https://maps.google.com/maps?q=-6.8105502,39.2859816&z=17&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Epson Showroom Map"
                  className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>

            {/* Canon Map */}
            <div className="kepler-card overflow-hidden">
              <div className="p-4 bg-white border-b border-border flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary flex items-center gap-2">
                    <MapPin size={16} className="text-[#CC0000]" /> Canon Zone Showroom
                  </h4>
                  <p className="text-xs text-text-muted mt-1">Next To Peacock Hotel, Bibi Titi Mohamed Road</p>
                </div>
                <a 
                  href="https://www.google.com/maps/search/Peacock+Hotel,+Bibi+Titi+Mohamed+Road,+Dar+es+salaam+Tanzania/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#CC0000]/10 text-[#CC0000] text-xs font-semibold hover:bg-[#CC0000]/20 transition-colors"
                >
                  Directions
                </a>
              </div>
              <div className="w-full h-[350px] relative bg-slate-100">
                <iframe 
                  src="https://maps.google.com/maps?q=Peacock+Hotel,+Bibi+Titi+Mohamed+Road,+Dar+es+salaam+Tanzania&z=16&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Canon Showroom Map"
                  className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
