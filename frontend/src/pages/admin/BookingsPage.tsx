import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import type { Booking } from '../../lib/adminTypes';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { useToast } from '../../components/common/ToastProvider';
import { Panel, Spinner, ErrorNote } from '../../components/adminPanel/common/Primitives';
import { BookingStatCards, type BookingCounts } from '../../components/adminPanel/bookings/BookingStatCards';
import { BookingFilters } from '../../components/adminPanel/bookings/BookingFilters';
import { BookingTable } from '../../components/adminPanel/bookings/BookingTable';
import { BookingDetailModal } from '../../components/adminPanel/bookings/BookingDetailModal';

export const BookingsPage: React.FC = () => {
  const toast = useToast();
  useAdminMeta({ title: 'Bookings', subtitle: 'Track, confirm and update every reservation' });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ bookings: Booking[] }>('/bookings?all=true');
      setBookings(res.data.bookings || []);
    } catch (err) {
      setError(extractError(err, 'Could not load bookings'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (trackingId: string, nextStatus: string) => {
    setUpdatingId(trackingId);
    try {
      await api.patch(`/bookings/${trackingId}/status`, { status: nextStatus });
      setBookings(current =>
        current.map(booking =>
          booking.trackingId === trackingId
            ? {
                ...booking,
                status: nextStatus,
                statusHistory: [...(booking.statusHistory || []), { status: nextStatus, at: new Date().toISOString() }],
              }
            : booking,
        ),
      );
      setSelected(current =>
        current && current.trackingId === trackingId
          ? {
              ...current,
              status: nextStatus,
              statusHistory: [...(current.statusHistory || []), { status: nextStatus, at: new Date().toISOString() }],
            }
          : current,
      );
      toast.success('Booking updated', `${trackingId} is now ${nextStatus}.`);
    } catch (err) {
      const message = extractError(err, 'Could not update booking status');
      setError(message);
      toast.error('Update failed', message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return bookings.filter(booking => {
      const matchesStatus = status === 'All' || booking.status === status;
      const matchesQuery =
        !needle ||
        [booking.trackingId, booking.customerName, booking.customerEmail, booking.serviceType, booking.pickupLocation]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, status]);

  const counts: BookingCounts = useMemo(
    () => ({
      total: bookings.length,
      active: bookings.filter(b => ['Pending', 'Confirmed', 'Driver Assigned', 'En Route'].includes(b.status)).length,
      completed: bookings.filter(b => b.status === 'Completed').length,
      cancelled: bookings.filter(b => b.status === 'Cancelled').length,
    }),
    [bookings],
  );

  if (loading) return <Spinner label="Loading bookings…" />;
  if (error && bookings.length === 0) return <ErrorNote message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <BookingStatCards counts={counts} />

      <Panel
        title="Reservation queue"
        action={
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        }
      >
        <BookingFilters query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} />
        <BookingTable
          bookings={filtered}
          updatingId={updatingId}
          onStatusChange={changeStatus}
          onSelect={setSelected}
        />
      </Panel>

      {selected && (
        <BookingDetailModal
          booking={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default BookingsPage;