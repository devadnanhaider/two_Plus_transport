import React from 'react';
import { CalendarCheck, FileText, TrendingUp, Wallet } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface DashboardStats {
  total: number;
  active: number;
  completed: number;
  revenue: number;
  pendingQuotes: number;
}

interface StatCardsRowProps {
  stats: DashboardStats;
  bookingTrend?: { value: number; label: string };
}

export const StatCardsRow: React.FC<StatCardsRowProps> = ({ stats, bookingTrend }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
      label="Total Bookings"
      value={stats.total}
      hint="All time"
      icon={CalendarCheck}
      trend={bookingTrend}
    />
    <StatCard label="Active Trips" value={stats.active} hint="Pending to en route" icon={TrendingUp} tone="violet" />
    <StatCard label="Pending Quotes" value={stats.pendingQuotes} hint="Awaiting dispatch" icon={FileText} tone="amber" />
    <StatCard
      label="Booked Value"
      value={`QAR ${stats.revenue.toLocaleString()}`}
      hint="Sum of estimates"
      icon={Wallet}
      tone="emerald"
    />
  </div>
);

export default StatCardsRow;