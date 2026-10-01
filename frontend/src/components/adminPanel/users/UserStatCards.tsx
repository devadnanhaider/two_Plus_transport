import React from 'react';
import { Building2, ShieldCheck, Users } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface UserCounts {
  total: number;
  admins: number;
  corporate: number;
}

interface UserStatCardsProps {
  counts: UserCounts;
}

export const UserStatCards: React.FC<UserStatCardsProps> = ({ counts }) => (
  <div className="grid gap-4 sm:grid-cols-3">
    <StatCard label="Total Accounts" value={counts.total} icon={Users} />
    <StatCard label="Administrators" value={counts.admins} icon={ShieldCheck} tone="violet" />
    <StatCard label="Corporate Clients" value={counts.corporate} icon={Building2} tone="emerald" />
  </div>
);

export default UserStatCards;