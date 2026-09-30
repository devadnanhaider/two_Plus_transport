import React, { useState, useEffect } from 'react';
import { X, Search, Package, MapPin, Clock, CheckCircle, AlertTriangle, Truck } from 'lucide-react';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TrackingStatus = 'idle' | 'loading' | 'found' | 'not_found';

const MOCK_BOOKING = {
  id: 'TPT-2026-1234',
  service: 'Staff Transportation',
  status: 'In Transit',
  driver: 'Ali Hassan',
  driverPhone: '+974 5556 7890',
  vehicle: 'Toyota Coaster – Plate: QAR 2891',
  pickup: 'Industrial Area, Gate 4',
  dropoff: 'West Bay Corporate Hub',
  estimatedArrival: '8:42 AM',
  passengerCount: 18,
  date: 'Sep 29, 2026',
  steps: [
    { label: 'Booking Confirmed', done: true, time: '7:00 AM' },
    { label: 'Driver Dispatched', done: true, time: '7:15 AM' },
    { label: 'Pickup Complete', done: true, time: '7:35 AM' },
    { label: 'In Transit', done: true, time: '7:40 AM', active: true },
    { label: 'Destination Arrived', done: false, time: 'Est. 8:42 AM' },
  ],
};

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [bookingId, setBookingId] = useState('');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [result, setResult] = useState<typeof MOCK_BOOKING | null>(null);

  useEffect(() => {
    if (isOpen) {
      setBookingId('');
      setStatus('idle');
      setResult(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;

    setStatus('loading');
    setTimeout(() => {
      if (bookingId.trim().toUpperCase() === 'TPT-2026-1234' || bookingId.trim() === '1234') {
        setResult(MOCK_BOOKING);
        setStatus('found');
      } else {
        setStatus('not_found');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Track Booking</h2>
                <p className="text-slate-400 text-xs">Real-time transport status</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
            Enter Booking ID or Phone Number
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={bookingId}
              onChange={e => setBookingId(e.target.value)}
              placeholder="e.g. TPT-2026-1234 or try '1234'"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-3 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-60 flex items-center space-x-2"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {status === 'idle' && (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <Package className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">Enter your booking ID above to track your transport in real-time.</p>
              <p className="text-slate-400 text-xs mt-2">You can find your booking ID in your confirmation email or WhatsApp message.</p>
            </div>
          )}

          {status === 'not_found' && (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <AlertTriangle className="w-12 h-12 text-amber-400 mb-3" />
              <p className="text-slate-800 font-bold">Booking Not Found</p>
              <p className="text-slate-500 text-sm mt-2">We couldn't find a booking with ID <strong>"{bookingId}"</strong>. Please check and try again.</p>
              <button
                onClick={() => { setStatus('idle'); setBookingId(''); }}
                className="mt-4 px-5 py-2 text-[#0066FF] border border-[#0066FF] rounded-xl text-sm font-bold hover:bg-sky-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {status === 'found' && result && (
            <div className="px-6 py-5 space-y-5">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Booking ID</p>
                  <p className="font-black text-slate-900 text-lg tracking-tight">{result.id}</p>
                </div>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{result.status}</span>
                </span>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 font-medium">Service</p>
                  <p className="text-sm font-bold text-slate-900">{result.service}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1 font-medium">Date</p>
                  <p className="text-sm font-bold text-slate-900">{result.date}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 col-span-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-[#0066FF]" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Vehicle & Driver</p>
                      <p className="text-sm font-bold text-slate-900">{result.vehicle}</p>
                      <p className="text-xs text-slate-600">{result.driver} · <a href={`tel:${result.driverPhone}`} className="text-[#0066FF] font-semibold">{result.driverPhone}</a></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Pickup</p>
                    <p className="text-sm font-semibold text-slate-800">{result.pickup}</p>
                  </div>
                </div>
                <div className="ml-1.5 w-0.5 h-4 bg-slate-200" />
                <div className="flex items-start space-x-3">
                  <MapPin className="w-3 h-3 text-[#0066FF] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Drop-off</p>
                    <p className="text-sm font-semibold text-slate-800">{result.dropoff}</p>
                  </div>
                </div>
              </div>

              {/* ETA */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Estimated Arrival</p>
                  <p className="text-lg font-black text-[#0066FF]">{result.estimatedArrival}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Journey Progress</p>
                <div className="space-y-3">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        step.done
                          ? (step as any).active
                            ? 'bg-[#0066FF] border-[#0066FF]'
                            : 'bg-emerald-500 border-emerald-500'
                          : 'bg-white border-slate-200'
                      }`}>
                        {step.done ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <p className={`text-sm font-semibold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.label}
                        </p>
                        <p className={`text-xs ${step.done ? 'text-slate-500' : 'text-slate-300'}`}>{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
