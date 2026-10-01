import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, Car, CheckCircle, Clock, Loader2, MapPin, Phone, Send, Users, X } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import { useToast } from '../common/ToastProvider';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const SERVICES = [
  'Staff Transportation',
  'School Transportation',
  'Airport Transportation',
  'Valet Parking',
  'Tour Packages',
  'Towing & Breakdown',
];

const VEHICLE_TYPES = [
  'Luxury Executive Coach (50-Seater)',
  'Mercedes-Benz V-Class VIP Van',
  'Cadillac Escalade Platinum SUV',
  'Toyota Coaster Commuter Shuttle (22-Seater)',
  'Heavy Duty Flatbed Tow Truck',
  'Not Sure – Let Expert Advise',
];

const field =
  'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]';

const label = 'block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5';

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService }) => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState('');
  const [form, setForm] = useState({
    service: initialService || '',
    vehicleType: '',
    passengers: '',
    date: '',
    time: '',
    pickup: '',
    dropoff: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    if (initialService) setForm(current => ({ ...current, service: initialService }));
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setError(null);
      setTrackingId('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post<{ booking: { trackingId: string } }>('/bookings', {
        serviceType: form.service,
        vehicleType: form.vehicleType || undefined,
        passengers: form.passengers ? Number(form.passengers) : undefined,
        pickupLocation: form.pickup,
        dropoffLocation: form.dropoff,
        pickupDate: form.date,
        pickupTime: form.time,
        specialNotes: form.notes || undefined,
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email || undefined,
      });

      setTrackingId(res.data.booking?.trackingId || '');
      setSubmitted(true);
      toast.success('Booking confirmed', `Reference ${res.data.booking?.trackingId || ''}. Our dispatch team will call to verify.`);
    } catch (err) {
      const message = extractError(err, 'Could not create your booking. Please try again.');
      setError(message);
      toast.error('Booking failed', message);
    } finally {
      setLoading(false);
    }
  };

  const canContinue = Boolean(form.service && form.pickup && form.dropoff && form.date && form.time);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex-shrink-0 bg-gradient-to-r from-[#0B1B33] to-[#13345c] px-6 pb-5 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-sky-300">Confirmed Dispatch</p>
              <h2 className="text-2xl font-black leading-tight text-white">Book Your Transport</h2>
              <p className="mt-1 text-sm text-sky-100">Get an instant booking reference in under a minute</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 flex-shrink-0 rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!submitted && (
            <div className="mt-4 flex items-center gap-2">
              {[1, 2].map(item => (
                <React.Fragment key={item}>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-black transition-all ${
                    step >= item ? 'border-white bg-white text-[#0B1B33]' : 'border-white/40 bg-transparent text-white'
                  }`}>
                    {item}
                  </div>
                  {item < 2 && <div className={`h-0.5 flex-1 rounded transition-all ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />}
                </React.Fragment>
              ))}
              <span className="ml-2 text-xs font-medium text-white/80">
                {step === 1 ? 'Trip Details' : 'Contact Info'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-2xl font-black text-slate-900">Booking Confirmed!</h3>
              <p className="mb-5 max-w-xs text-sm text-slate-500">
                Your transport is scheduled for{' '}
                <strong>{new Date(form.date).toLocaleDateString('en-GB')}</strong> at <strong>{form.time}</strong>.
              </p>

              <div className="mb-5 w-full max-w-xs rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Your booking reference</p>
                <p className="mt-1 text-lg font-black text-emerald-800">{trackingId}</p>
                <p className="mt-1 text-[11px] text-emerald-700">Use this ID to track your trip status anytime.</p>
              </div>

              <div className="w-full max-w-xs space-y-2 rounded-xl bg-slate-50 p-4 text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">What happens next</p>
                {['Dispatch verifies your booking', 'Driver and vehicle assigned', 'Pickup confirmation on WhatsApp'].map((label, index) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="mt-8 rounded-xl bg-[#0066FF] px-8 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {step === 1 && (
                <>
                  <div>
                    <label className={label}>
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <select name="service" value={form.service} onChange={handleChange} required className={field}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(service => <option key={service}>{service}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className={label}>
                        Pickup <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="pickup"
                          value={form.pickup}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Najma, Doha"
                          className={`${field} pl-10`}
                        />
                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={label}>
                        Destination <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="dropoff"
                          value={form.dropoff}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Hamad Int'l Airport"
                          className={`${field} pl-10`}
                        />
                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={label}>
                        Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input type="date" name="date" value={form.date} onChange={handleChange} required className={`${field} pl-10`} />
                        <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={label}>
                        Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input type="time" name="time" value={form.time} onChange={handleChange} required className={`${field} pl-10`} />
                        <Clock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={label}>Passengers</label>
                      <div className="relative">
                        <input type="number" name="passengers" min={1} max={60} value={form.passengers} onChange={handleChange} placeholder="e.g. 25" className={`${field} pl-10`} />
                        <Users className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={label}>Vehicle</label>
                      <div className="relative">
                        <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className={`${field} pl-10`}>
                          <option value="">Auto-assign</option>
                          {VEHICLE_TYPES.map(vehicle => <option key={vehicle}>{vehicle}</option>)}
                        </select>
                        <Car className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className={label}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={field} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={label}>
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+974 XXXX XXXX" className={`${field} pl-10`} />
                        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={label}>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={field} />
                    </div>
                  </div>

                  <div>
                    <label className={label}>Notes for the driver</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Child seats, luggage count, meet-and-greet, attendant needed…"
                      className={`${field} resize-none`}
                    />
                  </div>

                  <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-700">Booking summary</p>
                    <div className="space-y-1">
                      {[
                        ['Service', form.service],
                        ['Route', `${form.pickup} → ${form.dropoff}`],
                        ['When', `${new Date(form.date).toLocaleDateString('en-GB')} · ${form.time}`],
                        form.vehicleType && ['Vehicle', form.vehicleType],
                        form.passengers && ['Passengers', form.passengers],
                      ].filter(Boolean).map(([key, value]) => (
                        <div key={key as string} className="flex justify-between text-xs text-slate-700">
                          <span className="text-slate-500">{key}:</span>
                          <span className="font-semibold">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pb-2 pt-1">
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!canContinue}
                    onClick={() => { if (canContinue) setStep(2); }}
                    className="rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00A3FF] px-6 py-2.5 text-sm font-black text-white shadow-md shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00A3FF] px-6 py-2.5 text-sm font-black text-white shadow-md shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    <span>{loading ? 'Confirming…' : 'Confirm Booking'}</span>
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

export default BookingModal;