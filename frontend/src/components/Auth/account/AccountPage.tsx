import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
  User,
} from 'lucide-react';
import api, { extractError, tokenStore } from '../../../lib/apiClient';
import type { Booking, Quote } from '../../../lib/adminTypes';
import { statusTone } from '../../../lib/adminTypes';
import { useToast } from '../../common/ToastProvider';
import { Spinner, ErrorNote, EmptyState, StatusPill } from '../../adminPanel/common/Primitives';

const card =
  'rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6';

export const AccountPage: React.FC = () => {
  const toast = useToast();
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', company: '' });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [meRes, bookingRes, quoteRes] = await Promise.all([
        api.get<{ user: typeof profile }>('/auth/me'),
        api.get<{ bookings: Booking[] }>('/bookings'),
        api.get<{ quotes: Quote[] }>('/quotes'),
      ]);

      setProfile(meRes.data.user);
      setBookings(bookingRes.data.bookings || []);
      setQuotes(quoteRes.data.quotes || []);
    } catch (err) {
      setError(extractError(err, 'Could not load your account'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logout = () => {
    tokenStore.clear();
    toast.success('Signed out', 'See you next time.');
    window.location.href = '/';
  };

  if (loading) return <div className="min-h-[60vh]"><Spinner label="Loading your account…" /></div>;
  if (error) return <div className="min-h-[60vh]"><ErrorNote message={error} onRetry={load} /></div>;

  const activeBookings = bookings.filter(b => !['Completed', 'Cancelled'].includes(b.status));
  const upcoming = [...activeBookings].sort((a, b) => a.pickupDate.localeCompare(b.pickupDate))[0];

  return (
    <div className="min-h-screen bg-[#F5F8FF] py-10">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <section className={`${card} flex flex-wrap items-center justify-between gap-4`}>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#00A3FF] to-[#0055FF] text-xl font-black text-white">
              {profile.name?.charAt(0).toUpperCase() || 'U'}
            </span>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">{profile.name}</h1>
              <p className="text-xs text-slate-500">{profile.company || 'Individual customer'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </section>

        {/* Contact details */}
        <section className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Mail, label: 'Email', value: profile.email },
            { icon: Phone, label: 'Phone', value: profile.phone || 'Not provided' },
            { icon: User, label: 'Company', value: profile.company || 'Individual' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className={`${card} flex items-center gap-3`}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-[#0066FF]">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                <p className="truncate text-sm font-bold text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Quick stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total bookings', value: bookings.length, icon: CalendarCheck, tone: 'text-[#0066FF] bg-[#0066FF]/10' },
            { label: 'Active trips', value: activeBookings.length, icon: Truck, tone: 'text-emerald-600 bg-emerald-50' },
            { label: 'Quote requests', value: quotes.length, icon: FileText, tone: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className={card}>
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-2xl font-black text-slate-900">{value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {upcoming && (
          <section className="rounded-2xl border border-[#0066FF]/25 bg-gradient-to-r from-[#0066FF]/[0.06] to-transparent p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0066FF]">Next trip</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-black text-slate-900">{upcoming.serviceType}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-[#0066FF]" />
                  {upcoming.pickupLocation} → {upcoming.dropoffLocation}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {upcoming.pickupDate} at {upcoming.pickupTime} · Reference {upcoming.trackingId}
                </p>
              </div>
              <StatusPill status={upcoming.status} tone={statusTone(upcoming.status)} />
            </div>
          </section>
        )}

        {/* Bookings */}
        <section className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">My bookings</h2>
            <Link to="/" className="text-xs font-bold text-[#0066FF] hover:underline">Book another trip</Link>
          </div>

          {bookings.length === 0 ? (
            <EmptyState label="No bookings yet — book your first trip" />
          ) : (
            <div className="space-y-3">
              {bookings.map(booking => (
                <article key={booking.trackingId} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#0066FF]">{booking.trackingId}</p>
                      <p className="mt-0.5 text-sm font-bold text-slate-800">{booking.serviceType}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {booking.pickupLocation} → {booking.dropoffLocation}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {booking.pickupDate} · {booking.pickupTime}
                        {booking.vehicleType ? ` · ${booking.vehicleType}` : ''}
                      </p>
                    </div>
                    <StatusPill status={booking.status} tone={statusTone(booking.status)} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Quotes */}
        <section className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">My quote requests</h2>
            <span className="text-[11px] text-slate-400">Prices appear once dispatch responds</span>
          </div>

          {quotes.length === 0 ? (
            <EmptyState label="No quote requests yet" />
          ) : (
            <div className="space-y-3">
              {quotes.map(quote => (
                <article key={quote.trackingId} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#0066FF]">{quote.trackingId}</p>
                      <p className="mt-0.5 text-sm font-bold text-slate-800">{quote.serviceType}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {quote.pickupLocation}
                        {quote.dropoffLocation ? ` → ${quote.dropoffLocation}` : ''}
                      </p>
                      {(quote.estimatedPrice || 0) > 0 && (
                        <p className="mt-1 text-xs font-bold text-slate-700">Quoted price: QAR {quote.estimatedPrice}</p>
                      )}
                      {quote.convertedBooking && (
                        <p className="mt-1 text-[11px] font-bold text-emerald-700">
                          Converted to booking {quote.convertedBooking}
                        </p>
                      )}
                    </div>
                    <StatusPill status={quote.status} tone={statusTone(quote.status)} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountPage;