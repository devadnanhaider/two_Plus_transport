import React from 'react';
import { Ban, CalendarCheck, CheckCircle2, Truck } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface BookingCounts {
  total: number;
  active: number;
  completed: number;
  cancelled: number;
}

interface BookingStatCardsProps {
  counts: BookingCounts;
}

export const BookingStatCards: React.FC<BookingStatCardsProps> = ({ counts }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard label="All Bookings" value={counts.total} icon={CalendarCheck} />
    <StatCard label="In Progress" value={counts.active} icon={Truck} tone="violet" />
    <StatCard label="Completed" value={counts.completed} icon={CheckCircle2} tone="emerald" />
    <StatCard label="Cancelled" value={counts.cancelled} icon={Ban} tone="amber" />
  </div>
);

export default BookingStatCards;