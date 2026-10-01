import React from 'react';
import { Bus, Gauge, Users, Wrench } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface FleetCounts {
  total: number;
  available: number;
  onTrip: number;
  hourly: number;
}

interface FleetStatCardsProps {
  counts: FleetCounts;
}

export const FleetStatCards: React.FC<FleetStatCardsProps> = ({ counts }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard label="Fleet Size" value={counts.total} icon={Bus} />
    <StatCard label="Available Now" value={counts.available} icon={Gauge} tone="emerald" />
    <StatCard label="On Trip" value={counts.onTrip} icon={Users} tone="violet" />
    <StatCard label="Combined Hourly Rate" value={`QAR ${counts.hourly.toLocaleString()}`} icon={Wrench} tone="amber" />
  </div>
);

export default FleetStatCards;