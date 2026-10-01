import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Panel, EmptyState } from '../common/Primitives';

export interface ServiceDemand {
  name: string;
  value: number;
}

interface ServiceDemandChartProps {
  data: ServiceDemand[];
}

export const ServiceDemandChart: React.FC<ServiceDemandChartProps> = ({ data }) => (
  <Panel title="Demand by service" className="xl:col-span-2">
    {data.length === 0 ? (
      <EmptyState label="No service demand recorded" />
    ) : (
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-12}
              height={54}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
            <Bar dataKey="value" name="Bookings" radius={[8, 8, 0, 0]} fill="#0066FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </Panel>
);

export default ServiceDemandChart;