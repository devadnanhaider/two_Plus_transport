import React from 'react';
import {
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  StickyNote,
  User,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { statusTone, type Booking } from '../../../lib/adminTypes';
import { StatusPill } from '../common/Primitives';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
}

const ROW = 'flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3';
const ROW_ICON = 'mt-0.5 h-4 w-4 flex-shrink-0 text-[#0066FF]';
const ROW_LABEL = 'text-[11px] font-bold uppercase tracking-wider text-slate-400';
const ROW_VALUE = 'mt-0.5 text-sm font-semibold text-slate-800';

const Detail: React.FC<{ icon: React.ElementType; label: string; value?: string | number; href?: string }> = ({
  icon: Icon,
  label,
  value,
  href,
}) => {
  if (!value) return null;

  return (
    <div className={ROW}>
      <Icon className={ROW_ICON} aria-hidden="true" />
      <div className="min-w-0">
        <p className={ROW_LABEL}>{label}</p>
        {href ? (
          <a href={href} className="text-sm font-semibold text-[#0066FF] underline-offset-2 hover:underline">
            {value}
          </a>
        ) : (
          <p className={`${ROW_VALUE} break-words`}>{value}</p>
        )}
      </div>
    </div>
  );
};

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {
  const history = [...(booking.statusHistory || [])].reverse();

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative my-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0066FF]">Booking details</p>
            <h3 className="mt-0.5 text-xl font-black tracking-tight text-slate-900">{booking.trackingId}</h3>
            <p className="mt-1 text-xs text-slate-500">
              Created {booking.createdAt ? new Date(booking.createdAt).toLocaleString('en-GB') : '—'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={booking.status} tone={statusTone(booking.status)} />
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-5">
          <section>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Detail icon={User} label="Name" value={booking.customerName} />
              <Detail icon={Mail} label="Email" value={booking.customerEmail} href={`mailto:${booking.customerEmail}`} />
              <Detail icon={Phone} label="Phone" value={booking.customerPhone} href={`tel:${booking.customerPhone}`} />
              <Detail icon={Users} label="Passengers" value={booking.passengers} />
            </div>
          </section>

          <section>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Trip</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Detail icon={MapPin} label="Service" value={booking.serviceType} />
              <Detail icon={Car} label="Vehicle" value={booking.vehicleType} />
              <Detail icon={CalendarDays} label="Pickup date" value={booking.pickupDate} />
              <Detail icon={Clock} label="Pickup time" value={booking.pickupTime} />
              <Detail
                icon={MapPin}
                label="Route"
                value={`${booking.pickupLocation} → ${booking.dropoffLocation}`}
              />
              <Detail icon={Wallet} label="Estimated price" value={booking.estimatedPrice ? `QAR ${booking.estimatedPrice}` : undefined} />
            </div>
          </section>

          {booking.driverInfo && (
            <section>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Assigned driver</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <Detail icon={User} label="Driver" value={booking.driverInfo.name} />
                <Detail icon={Phone} label="Driver phone" value={booking.driverInfo.phone} href={`tel:${booking.driverInfo.phone}`} />
                <Detail icon={Car} label="Vehicle number" value={booking.driverInfo.vehicleNumber} />
              </div>
            </section>
          )}

          {booking.specialNotes && (
            <section>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Notes</p>
              <div className={ROW}>
                <StickyNote className={ROW_ICON} aria-hidden="true" />
                <p className="text-sm leading-relaxed text-slate-700">{booking.specialNotes}</p>
              </div>
            </section>
          )}

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status history</p>
            {history.length === 0 ? (
              <p className="text-sm text-slate-400">No status updates recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {history.map((entry, index) => (
                  <div key={`${entry.status}-${index}`} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div className="flex-1 rounded-xl border border-slate-100 px-4 py-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-800">{entry.status}</p>
                        {entry.at && (
                          <p className="text-[11px] text-slate-400">
                            {new Date(entry.at).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        )}
                      </div>
                      {entry.note && <p className="mt-0.5 text-xs text-slate-500">{entry.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <footer className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BookingDetailModal;