import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ElementType;
  tone?: 'blue' | 'emerald' | 'amber' | 'violet';
  trend?: { value: number; label: string };
}

const TONES = {
  blue: 'from-[#00A3FF] to-[#0055FF] shadow-[#0066FF]/25',
  emerald: 'from-emerald-400 to-emerald-600 shadow-emerald-500/25',
  amber: 'from-amber-400 to-orange-500 shadow-orange-500/25',
  violet: 'from-violet-500 to-purple-600 shadow-violet-500/25',
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'blue',
  trend,
}) => (
  <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
        {hint && <p className="mt-1 truncate text-xs text-slate-500">{hint}</p>}
      </div>

      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${TONES[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
    </div>

    {trend && (
      <p
        className={`mt-4 inline-flex items-center gap-1 text-[11px] font-bold ${
          trend.value >= 0 ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        <ArrowUpRight className={`h-3.5 w-3.5 ${trend.value < 0 ? 'rotate-90' : ''}`} />
        {Math.abs(trend.value)}% {trend.label}
      </p>
    )}

    <span className="pointer-events-none absolute -right-8 -bottom-10 h-24 w-24 rounded-full bg-slate-900/[0.03] transition group-hover:bg-[#0066FF]/[0.07]" />
  </article>
);

export default StatCard;
