'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, CheckCircle, User, Phone, Mail, MessageSquare, Loader2, ChevronDown } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Product Sales & Supply',
  'Printer Sales & Consulting',
  'Authorized Service Center',
  'Managed Print Services & Leasing',
  'Annual Maintenance Contract (AMC)',
  'Toner & Consumables',
  'Spare Parts Inquiry',
  'Other',
];

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  subSubject: string;
  showSubjectSelect?: boolean;
}

export default function ServiceInquiryModal({ isOpen, onClose, subject, subSubject, showSubjectSelect = false }: ServiceInquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subject || '');
  const [customSubject, setCustomSubject] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const computedSubject = showSubjectSelect
    ? (selectedSubject === 'Other' ? customSubject : selectedSubject)
    : subject;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: computedSubject,
          subSubject,
          message,
          source: 'inquiry_modal',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send inquiry');
      }

      setSending(false);
      setSubmitted(true);

      // Auto-close after 3s
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setSelectedSubject('');
        setCustomSubject('');
        setError('');
        onClose();
      }, 3000);
    } catch (err) {
      setSending(false);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  // Keep selectedSubject in sync when subject prop changes
  useEffect(() => {
    if (subject) setSelectedSubject(subject);
  }, [subject]);


  // Format Tanzania phone: +255 7XX XXX XXX
  const formatTzPhone = (value: string) => {
    // Strip non-digits
    let digits = value.replace(/\D/g, '');
    
    // If starts with 0, replace with 255
    if (digits.startsWith('0')) {
      digits = '255' + digits.slice(1);
    }
    // If doesn't start with 255, prepend it
    if (digits.length > 0 && !digits.startsWith('255')) {
      digits = '255' + digits;
    }
    
    // Format: +255 XXX XXX XXX
    if (digits.length <= 3) return '+' + digits;
    if (digits.length <= 6) return '+' + digits.slice(0, 3) + ' ' + digits.slice(3);
    if (digits.length <= 9) return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
    return '+' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 9) + ' ' + digits.slice(9, 12);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setPhone(formatTzPhone(raw));
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ padding: '1rem' }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease-out' }} />

      {/* Modal — centred via flexbox */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl z-10"
        style={{
          animation: 'modalIn 0.25s ease-out',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient bar */}
        <div className="h-1 bg-gradient-to-r from-[#0057B8] via-[#003399] to-[#CC0000]" />

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-20"
          aria-label="Close"
        >
          <X size={16} className="text-gray-500" />
        </button>

        {submitted ? (
          /* Success state */
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Thank You!</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your inquiry for <strong>{computedSubject}</strong> has been submitted. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-text-primary mb-0.5">{showSubjectSelect ? 'Request a Quote' : subject}</h3>
              <p className="text-xs text-text-secondary">{showSubjectSelect ? 'Tell us what you need and we\'ll get back to you.' : subSubject}</p>
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+255 7XX XXX XXX"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">Tanzania format: +255 7XX XXX XXX</p>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            {/* Subject — dropdown or read-only */}
            {showSubjectSelect ? (
              <div className="mb-3">
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a subject...</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {selectedSubject === 'Other' && (
                  <input
                    type="text"
                    required
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Type your subject..."
                    className="w-full mt-2 pl-3 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  />
                )}
              </div>
            ) : (
              <div className="mb-3 p-2.5 rounded-lg bg-blue-50/80 border border-blue-100">
                <div className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">Service Type</div>
                <div className="text-xs font-medium text-text-primary">{subject}</div>
              </div>
            )}

            {/* Message (optional) */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Message <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MessageSquare size={14} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your requirements..."
                  rows={2}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#0057B8] to-[#003399] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={14} /> Submit Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
}
