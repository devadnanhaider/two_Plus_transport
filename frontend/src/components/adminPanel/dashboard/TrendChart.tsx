import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Clock } from 'lucide-react';
import { Panel, EmptyState } from '../common/Primitives';

export interface TrendPoint {
  label: string;
  bookings: number;
  quotes: number;
}

interface TrendChartProps {
  data: TrendPoint[];
  hasActivity: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, hasActivity }) => (
  <Panel
    title="Bookings & quotes — last 7 days"
    className="xl:col-span-2"
    action={
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
        <Clock className="h-3.5 w-3.5" />
        Live
      </span>
    }
  >
    {!hasActivity ? (
      <EmptyState label="No activity in the last 7 days" />
    ) : (
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="quoteFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A3FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00A3FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#0066FF" strokeWidth={2.5} fill="url(#bookingFill)" />
            <Area type="monotone" dataKey="quotes" name="Quotes" stroke="#00A3FF" strokeWidth={2.5} fill="url(#quoteFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </Panel>
);

export default TrendChart;