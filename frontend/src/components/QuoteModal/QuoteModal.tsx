import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Send, Phone, Mail, Calendar, Users, Car, CheckCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const SERVICES = [
  'Staff Transportation',
  'School Transportation',
  'Airport Taxi & VIP Transfers',
  'Valet Parking Services',
  'Tour & Sightseeing Packages',
  'Towing & Roadside Assistance',
];

const VEHICLE_TYPES = [
  'Luxury Executive Coach (50-Seater)',
  'Mercedes-Benz V-Class VIP Van',
  'Cadillac Escalade Platinum SUV',
  'Toyota Coaster Commuter Shuttle (22-Seater)',
  'Heavy Duty Flatbed Tow Truck',
  'Not Sure – Let Expert Advise',
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialService }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    service: initialService || '',
    vehicleType: '',
    passengers: '',
    date: '',
    duration: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    if (initialService) setForm(f => ({ ...f, service: initialService }));
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0066FF] to-[#00A3FF] px-6 pt-6 pb-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sky-200 mb-1">Free • No Obligation</p>
              <h2 className="text-2xl font-black text-white leading-tight">Get Your Instant Quote</h2>
              <p className="text-sky-100 text-sm mt-1">Tailored transport proposal within 30 minutes</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Indicators */}
          {!submitted && (
            <div className="flex items-center mt-4 space-x-2">
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black border-2 transition-all ${
                    step >= s ? 'bg-white text-[#0066FF] border-white' : 'bg-transparent text-white border-white/40'
                  }`}>{s}</div>
                  {s < 2 && <div className={`h-0.5 flex-1 rounded transition-all ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />}
                </React.Fragment>
              ))}
              <span className="text-white/80 text-xs ml-2 font-medium">
                {step === 1 ? 'Service Details' : 'Contact Info'}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Quote Request Sent!</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-6">
                Our dispatch team will contact you within <strong>30 minutes</strong> with a detailed proposal for <strong>{form.service || 'your service'}</strong>.
              </p>
              <div className="space-y-2 text-left w-full max-w-xs bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">What happens next</p>
                {['Team reviews your requirements', 'Custom proposal prepared', 'You receive quote via email/WhatsApp'].map((t, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-[#0066FF] text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {step === 1 && (
                <>
                  {/* Service Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pr-10"
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Vehicle Preference */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                      Preferred Vehicle
                    </label>
                    <div className="relative">
                      <select
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={handleChange}
                        className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pr-10"
                      >
                        <option value="">Select vehicle type…</option>
                        {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <Car className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Passengers & Date Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                        Passengers
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="passengers"
                          value={form.passengers}
                          onChange={handleChange}
                          placeholder="e.g. 25"
                          min="1"
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                        />
                        <Users className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                        />
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                      Duration / Contract Period
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      placeholder="e.g. 3 months, 1 year, single event…"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+974 XXXX XXXX"
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                        />
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] pl-10"
                        />
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Special requirements, pickup location, route details…"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] resize-none"
                    />
                  </div>

                  {/* Summary Card */}
                  {form.service && (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">Quote Summary</p>
                      <div className="space-y-1">
                        {[
                          ['Service', form.service],
                          form.vehicleType && ['Vehicle', form.vehicleType],
                          form.passengers && ['Passengers', form.passengers],
                          form.date && ['Date', new Date(form.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })],
                        ].filter(Boolean).map(([k, v], i) => (
                          <div key={i} className="flex justify-between text-xs text-slate-700">
                            <span className="text-slate-500">{k}:</span>
                            <span className="font-semibold">{v as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-2 pb-2">
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => { if (form.service) setStep(2); }}
                    disabled={!form.service}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white rounded-xl font-black text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white rounded-xl font-black text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-md shadow-blue-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Quote Request</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
