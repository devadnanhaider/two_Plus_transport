import React from 'react';
import { BadgeCheck, Clock3, FileText } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface QuoteCounts {
  total: number;
  pending: number;
  quoted: number;
  value: number;
}

interface QuoteStatCardsProps {
  counts: QuoteCounts;
}

export const QuoteStatCards: React.FC<QuoteStatCardsProps> = ({ counts }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard label="Total Quotes" value={counts.total} icon={FileText} />
    <StatCard label="Awaiting Response" value={counts.pending} icon={Clock3} tone="amber" />
    <StatCard label="Priced" value={counts.quoted} icon={BadgeCheck} tone="violet" />
    <StatCard label="Quoted Value" value={`QAR ${counts.value.toLocaleString()}`} icon={BadgeCheck} tone="emerald" />
  </div>
);

export default QuoteStatCards;