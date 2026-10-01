import React, { useEffect, useMemo, useState } from 'react';
import api, { extractError } from '../../lib/apiClient';
import type { Booking, Quote, AdminUser } from '../../lib/adminTypes';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Spinner, ErrorNote } from '../../components/adminPanel/common/Primitives';
import { StatCardsRow, type DashboardStats } from '../../components/adminPanel/dashboard/StatCardsRow';
import { TrendChart, type TrendPoint } from '../../components/adminPanel/dashboard/TrendChart';
import { StatusMixChart, type Slice } from '../../components/adminPanel/dashboard/StatusMixChart';
import { ServiceDemandChart, type ServiceDemand } from '../../components/adminPanel/dashboard/ServiceDemandChart';
import { AccountsCard } from '../../components/adminPanel/dashboard/AccountsCard';
import { RecentBookingsTable } from '../../components/adminPanel/dashboard/RecentBookingsTable';

const ACTIVE_STATUSES = ['Pending', 'Confirmed', 'Driver Assigned', 'En Route'];

const dayKey = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

export const Dashboard: React.FC = () => {
  useAdminMeta({ title: 'Dashboard', subtitle: 'Live overview of bookings, quotes and revenue' });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersNote, setUsersNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const [bookingRes, quoteRes] = await Promise.all([
        api.get<{ bookings: Booking[] }>('/bookings?all=true'),
        api.get<{ quotes: Quote[] }>('/quotes?all=true'),
      ]);

      setBookings(bookingRes.data.bookings || []);
      setQuotes(quoteRes.data.quotes || []);

      try {
        const userRes = await api.get<{ users: AdminUser[] }>('/users');
        setUsers(userRes.data.users || []);
        setUsersNote(null);
      } catch (userErr) {
        setUsers([]);
        setUsersNote(extractError(userErr, 'Admin role required to view users'));
      }
    } catch (err) {
      setError(extractError(err, 'Could not load dashboard data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats: DashboardStats = useMemo(() => {
    const active = bookings.filter(b => ACTIVE_STATUSES.includes(b.status)).length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const revenue = bookings.reduce((sum, b) => sum + (b.estimatedPrice || 0), 0);
    const pendingQuotes = quotes.filter(q => q.status === 'Pending Quote').length;

    return { total: bookings.length, active, completed, revenue, pendingQuotes };
  }, [bookings, quotes]);

  const bookingTrend = useMemo(() => {
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;

    const countSince = (from: number) =>
      bookings.filter(b => {
        const time = new Date(b.createdAt || b.pickupDate).getTime();
        return !Number.isNaN(time) && time >= from;
      }).length;

    const thisWeek = countSince(now - week);
    const lastWeek = countSince(now - 2 * week) - thisWeek;

    if (thisWeek === 0 && lastWeek === 0) return undefined;

    const value = lastWeek === 0 ? (thisWeek > 0 ? 100 : 0) : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
    return { value, label: 'vs previous 7 days' };
  }, [bookings]);

  const trend: TrendPoint[] = useMemo(() => {
    const days: TrendPoint[] = [];
    const counts = new Map<string, { bookings: number; quotes: number }>();

    [...bookings, ...quotes].forEach(item => {
      const key = dayKey(item.createdAt);
      if (!key) return;
      const entry = counts.get(key) || { bookings: 0, quotes: 0 };
      if (item.trackingId.startsWith('QTE')) entry.quotes += 1;
      else entry.bookings += 1;
      counts.set(key, entry);
    });

    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10);
      const entry = counts.get(key) || { bookings: 0, quotes: 0 };
      days.push({ label: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), ...entry });
    }

    return days;
  }, [bookings, quotes]);

  const serviceSplit: ServiceDemand[] = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach(b => map.set(b.serviceType, (map.get(b.serviceType) || 0) + 1));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [bookings]);

  const statusSplit: Slice[] = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach(b => map.set(b.status, (map.get(b.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [bookings]);

  if (loading) return <Spinner label="Loading operations data…" />;
  if (error) return <ErrorNote message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <StatCardsRow stats={stats} bookingTrend={bookingTrend} />

      <div className="grid gap-6 xl:grid-cols-3">
        <TrendChart data={trend} hasActivity={bookings.length + quotes.length > 0} />
        <StatusMixChart data={statusSplit} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ServiceDemandChart data={serviceSplit} />
        <AccountsCard users={users} note={usersNote} />
      </div>

      <RecentBookingsTable bookings={bookings.slice(0, 6)} />
    </div>
  );
};

export default Dashboard;