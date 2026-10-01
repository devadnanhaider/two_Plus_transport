import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { QUOTE_STATUSES, statusTone, type Quote } from '../../../lib/adminTypes';
import { StatusPill } from '../common/Primitives';

export interface QuoteDraft {
  price: string;
  notes: string;
}

interface QuoteCardProps {
  quote: Quote;
  draft: QuoteDraft;
  saving: boolean;
  converting: boolean;
  onDraftChange: (draft: QuoteDraft) => void;
  onRespond: (status: string) => void;
  onConvert: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  draft,
  saving,
  converting,
  onDraftChange,
  onRespond,
  onConvert,
}) => (
  <article className="grid gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 lg:grid-cols-[1.4fr_1fr_auto]">
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-black text-[#0066FF]">{quote.trackingId}</span>
        <StatusPill status={quote.status} tone={statusTone(quote.status)} />
      </div>
      <p className="mt-2 text-sm font-bold text-slate-800">{quote.customerName}</p>
      <p className="text-[11px] text-slate-500">
        {quote.customerEmail} · {quote.customerPhone}
      </p>
      <p className="mt-2 text-xs text-slate-600">
        {quote.serviceType} · {quote.pickupLocation}
        {quote.dropoffLocation ? ` → ${quote.dropoffLocation}` : ''}
      </p>
      {quote.specialNotes && (
        <p className="mt-2 rounded-lg bg-white px-3 py-2 text-[11px] text-slate-500">{quote.specialNotes}</p>
      )}
    </div>

    <div className="space-y-2">
      <div>
        <label className="mb-1 block text-[11px] font-bold text-slate-600">Quoted price (QAR)</label>
        <input
          type="number"
          min={0}
          value={draft.price}
          onChange={event => onDraftChange({ ...draft, price: event.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#0066FF]"
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-bold text-slate-600">Internal note</label>
        <input
          value={draft.notes}
          onChange={event => onDraftChange({ ...draft, notes: event.target.value })}
          placeholder="Optional"
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#0066FF]"
        />
      </div>
    </div>

    <div className="flex flex-row gap-2 lg:flex-col lg:justify-center">
      <select
        value={quote.status}
        disabled={saving}
        onChange={event => onRespond(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-[#0066FF] disabled:opacity-50"
      >
        {QUOTE_STATUSES.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {quote.convertedBooking ? (
        <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
          <CalendarCheck className="h-3.5 w-3.5" />
          {quote.convertedBooking}
        </span>
      ) : (
        <button
          type="button"
          onClick={onConvert}
          disabled={converting || quote.status === 'Declined' || quote.status === 'Expired'}
          title={quote.status === 'Declined' || quote.status === 'Expired' ? 'Closed quotes cannot be converted' : 'Create a confirmed booking from this quote'}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-3 py-2.5 text-[11px] font-bold text-white shadow-md shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          {converting ? 'Converting…' : 'Convert to booking'}
        </button>
      )}
    </div>
  </article>
);

export default QuoteCard;