import React from 'react';
import { Link } from 'react-router-dom';
import { statusTone, type Booking } from '../../../lib/adminTypes';
import { Panel, StatusPill, EmptyState } from '../common/Primitives';

interface RecentBookingsTableProps {
  bookings: Booking[];
}

export const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ bookings }) => (
  <Panel
    title="Latest bookings"
    action={
      <Link to="/admin/bookings" className="text-xs font-bold text-[#0066FF] transition hover:text-[#0052CC]">
        View all
      </Link>
    }
  >
    {bookings.length === 0 ? (
      <EmptyState label="No bookings yet" />
    ) : (
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="px-2 py-3 font-bold">Tracking</th>
              <th className="px-2 py-3 font-bold">Client</th>
              <th className="px-2 py-3 font-bold">Service</th>
              <th className="px-2 py-3 font-bold">Pickup</th>
              <th className="px-2 py-3 font-bold">Value</th>
              <th className="px-2 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.trackingId} className="border-b border-slate-50 last:border-0">
                <td className="px-2 py-3.5 font-bold text-[#0066FF]">{booking.trackingId}</td>
                <td className="px-2 py-3.5">
                  <p className="font-semibold text-slate-800">{booking.customerName}</p>
                  <p className="text-[11px] text-slate-500">{booking.customerPhone}</p>
                </td>
                <td className="px-2 py-3.5 text-slate-600">{booking.serviceType}</td>
                <td className="px-2 py-3.5 text-[11px] text-slate-500">
                  {booking.pickupDate} · {booking.pickupTime}
                </td>
                <td className="px-2 py-3.5 font-semibold text-slate-700">QAR {booking.estimatedPrice || 0}</td>
                <td className="px-2 py-3.5">
                  <StatusPill status={booking.status} tone={statusTone(booking.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Panel>
);

export default RecentBookingsTable;