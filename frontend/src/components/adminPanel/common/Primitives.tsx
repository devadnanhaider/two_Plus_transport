import React from 'react';
import { Loader2, Inbox } from 'lucide-react';

export const Panel: React.FC<{ title?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }> = ({
  title,
  action,
  className = '',
  children,
}) => (
  <section className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
    {(title || action) && (
      <header className="mb-5 flex items-center justify-between gap-4">
        {title && <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">{title}</h2>}
        {action}
      </header>
    )}
    {children}
  </section>
);

export const Spinner: React.FC<{ label?: string }> = ({ label = 'Loading…' }) => (
  <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
    <Loader2 className="h-5 w-5 animate-spin text-[#0066FF]" />
    {label}
  </div>
);

export const ErrorNote: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
    <p className="text-sm font-semibold text-rose-700">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
      >
        Try again
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{ label?: string }> = ({ label = 'Nothing to show yet' }) => (
  <div className="flex flex-col items-center gap-2 py-14 text-center text-slate-400">
    <Inbox className="h-8 w-8" />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export const StatusPill: React.FC<{ status: string; tone: string }> = ({ status, tone }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${tone}`}>
    {status}
  </span>
);
