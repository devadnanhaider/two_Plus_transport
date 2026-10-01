import React from 'react';
import { BOOKING_STATUSES, statusTone, type Booking } from '../../../lib/adminTypes';
import { EmptyState, StatusPill } from '../common/Primitives';
import { Pagination, usePagination } from '../common/Pagination';

interface BookingTableProps {
  bookings: Booking[];
  updatingId: string | null;
  onStatusChange: (trackingId: string, status: string) => void;
  onSelect?: (booking: Booking) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({ bookings, updatingId, onStatusChange, onSelect }) => {
  const { pageItems, page, pageSize, total, setPage, setPageSize } = usePagination(bookings);

  if (total === 0) return <EmptyState label="No bookings match this filter" />;

  return (
    <div>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
            <th className="px-2 py-3 font-bold">Tracking</th>
            <th className="px-2 py-3 font-bold">Client</th>
            <th className="px-2 py-3 font-bold">Service</th>
            <th className="px-2 py-3 font-bold">Route</th>
            <th className="px-2 py-3 font-bold">Schedule</th>
            <th className="px-2 py-3 font-bold">Status</th>
            <th className="px-2 py-3 font-bold">Update</th>
            <th className="px-2 py-3 font-bold">Details</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(booking => (
            <tr
              key={booking.trackingId}
              onClick={() => onSelect?.(booking)}
              className={`border-b border-slate-50 align-top last:border-0 ${
                onSelect ? 'cursor-pointer transition hover:bg-[#0066FF]/[0.04]' : ''
              }`}
            >
              <td className="px-2 py-3.5 font-bold text-[#0066FF]">{booking.trackingId}</td>
              <td className="px-2 py-3.5">
                <p className="font-semibold text-slate-800">{booking.customerName}</p>
                <p className="text-[11px] text-slate-500">{booking.customerEmail}</p>
                <p className="text-[11px] text-slate-400">{booking.customerPhone}</p>
              </td>
              <td className="px-2 py-3.5 text-slate-600">{booking.serviceType}</td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">
                {booking.pickupLocation}
                <span className="block">→ {booking.dropoffLocation}</span>
              </td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">
                {booking.pickupDate}
                <span className="block">{booking.pickupTime}</span>
              </td>
              <td className="px-2 py-3.5">
                <StatusPill status={booking.status} tone={statusTone(booking.status)} />
              </td>
              <td className="px-2 py-3.5">
                <select
                  value={booking.status}
                  disabled={updatingId === booking.trackingId}
                  onClick={event => event.stopPropagation()}
                  onChange={event => onStatusChange(booking.trackingId, event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-600 outline-none focus:border-[#0066FF] disabled:opacity-50"
                >
                  {BOOKING_STATUSES.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-2 py-3.5">
                <button
                  type="button"
                  onClick={event => { event.stopPropagation(); onSelect?.(booking); }}
                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        label="bookings"
      />
    </div>
  );
};

export default BookingTable;