import React from 'react';
import { Filter, Search } from 'lucide-react';
import { BOOKING_STATUSES } from '../../../lib/adminTypes';

interface BookingFiltersProps {
  query: string;
  status: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
}) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
      <Search className="h-4 w-4 text-slate-400" />
      <input
        value={query}
        onChange={event => onQueryChange(event.target.value)}
        placeholder="Search tracking ID, client, service…"
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>

    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-slate-400" />
      <select
        value={status}
        onChange={event => onStatusChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[#0066FF]"
      >
        {['All', ...BOOKING_STATUSES].map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default BookingFilters;