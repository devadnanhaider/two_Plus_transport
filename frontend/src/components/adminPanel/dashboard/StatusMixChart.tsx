import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Panel, EmptyState } from '../common/Primitives';

export interface Slice {
  name: string;
  value: number;
}

const PIE_COLORS = ['#0066FF', '#00A3FF', '#22C55E', '#F59E0B', '#A855F7', '#F43F5E'];

interface StatusMixChartProps {
  data: Slice[];
}

export const StatusMixChart: React.FC<StatusMixChartProps> = ({ data }) => (
  <Panel title="Booking status mix">
    {data.length === 0 ? (
      <EmptyState label="No bookings yet" />
    ) : (
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={3} stroke="none">
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )}
  </Panel>
);

export default StatusMixChart;