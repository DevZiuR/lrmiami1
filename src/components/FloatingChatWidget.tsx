
import React, { useState, useRef, useEffect } from 'react';
import { Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SERVICE_OPTIONS = [
  'Exotic Car Rental',
  'Yacht Charter',
  'Both Car & Yacht',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

type FormFields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const validate = (form: FormFields): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.phone.trim()) errors.phone = 'Phone is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email.';
  if (!form.service) errors.service = 'Please select a service.';
  return errors;
};

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(initialForm);
        setErrors({});
        setSent(false);
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Compose mailto
    const subject = encodeURIComponent('New Booking Inquiry from Website');
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService Interest: ${form.service}\nMessage: ${form.message}`
    );
    window.location.href = `mailto:info@Lrmiami.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  // Animation classes
  const panelClass = isOpen
    ? 'scale-100 opacity-100 pointer-events-auto'
    : 'scale-95 opacity-0 pointer-events-none';

  return (
    <>
      {/* Expandable Contact Form */}
      <div
        ref={formRef}
        className={`fixed bottom-24 right-6 w-80 max-w-[95vw] bg-black/95 border border-gold-1 rounded-xl luxury-shadow z-50 overflow-hidden transition-all duration-300 ${panelClass}`}
        style={{ minHeight: isOpen ? 420 : 0 }}
      >
        <div className="bg-gradient-gold p-4 flex items-center justify-between">
          <h3 className="font-semibold text-black text-lg">Contact Us</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 transition-colors"
            aria-label="Close contact form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-gold-1 text-2xl mb-2 font-bold">Message sent!</div>
              <div className="text-steel-2 mb-2">We'll contact you within 24 hours.</div>
              <Button
                className="mt-4 bg-gradient-gold text-black font-semibold w-full"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className={`w-full bg-black/70 border border-gold-1 rounded-md px-4 py-2 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1 ${errors.name ? 'border-red-500' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  className={`w-full bg-black/70 border border-gold-1 rounded-md px-4 py-2 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1 ${errors.phone ? 'border-red-500' : ''}`}
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={`w-full bg-black/70 border border-gold-1 rounded-md px-4 py-2 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1 ${errors.email ? 'border-red-500' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>
              <div>
                <select
                  name="service"
                  className={`w-full bg-black/70 border border-gold-1 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold-1 ${errors.service ? 'border-red-500' : ''}`}
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Service Interest*</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.service && <div className="text-red-500 text-xs mt-1">{errors.service}</div>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  className="w-full bg-black/70 border border-gold-1 rounded-md px-4 py-2 text-white placeholder:text-gold-1 focus:outline-none focus:ring-2 focus:ring-gold-1 min-h-[60px]"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-gold text-black font-bold hover:scale-105 transition-transform text-lg mt-2"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center luxury-shadow hover:scale-110 transition-transform duration-300 z-50 animate-luxury-pulse border-4 border-black"
        aria-label="Contact us"
        style={{ boxShadow: '0 0 24px 2px #FFD70055' }}
      >
        <Mail className="w-8 h-8 text-black" />
      </button>
    </>
  );
};

export default FloatingChatWidget;
