import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import type { Quote } from '../../lib/adminTypes';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Panel, Spinner, ErrorNote, EmptyState } from '../../components/adminPanel/common/Primitives';
import { Pagination, usePagination } from '../../components/adminPanel/common/Pagination';
import { QuoteStatCards, type QuoteCounts } from '../../components/adminPanel/quotes/QuoteStatCards';
import { QuoteCard, type QuoteDraft } from '../../components/adminPanel/quotes/QuoteCard';
import { useToast } from '../../components/common/ToastProvider';

export const QuotesPage: React.FC = () => {
  const toast = useToast();
  useAdminMeta({ title: 'Quotes', subtitle: 'Respond to quote requests and lock in pricing' });

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [converting, setConverting] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, QuoteDraft>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ quotes: Quote[] }>('/quotes?all=true');
      setQuotes(res.data.quotes || []);
    } catch (err) {
      setError(extractError(err, 'Could not load quotes'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const respond = async (quote: Quote, status: string) => {
    const draft = drafts[quote.trackingId] || { price: String(quote.estimatedPrice || ''), notes: '' };
    setSaving(quote.trackingId);

    try {
      await api.patch(`/quotes/${quote.trackingId}`, {
        status,
        estimatedPrice: Number(draft.price) || 0,
        adminNotes: draft.notes,
      });
      setQuotes(current =>
        current.map(item =>
          item.trackingId === quote.trackingId
            ? { ...item, status, estimatedPrice: Number(draft.price) || 0, adminNotes: draft.notes }
            : item,
        ),
      );
      toast.success('Quote updated', `${quote.trackingId} marked as ${status}.`);
    } catch (err) {
      const message = extractError(err, 'Could not update quote');
      setError(message);
      toast.error('Update failed', message);
    } finally {
      setSaving(null);
    }
  };

  const convert = async (quote: Quote) => {
    setConverting(quote.trackingId);

    try {
      const res = await api.post<{ booking: { trackingId: string } }>(`/quotes/${quote.trackingId}/convert`);
      const trackingId = res.data.booking.trackingId;

      setQuotes(current =>
        current.map(item =>
          item.trackingId === quote.trackingId
            ? { ...item, status: 'Accepted', convertedBooking: trackingId }
            : item,
        ),
      );
      toast.success('Converted to booking', `${quote.trackingId} → ${trackingId}. Find it under Bookings.`);
    } catch (err) {
      const message = extractError(err, 'Could not convert this quote');
      setError(message);
      toast.error('Convert failed', message);
    } finally {
      setConverting(null);
    }
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return quotes;
    return quotes.filter(quote =>
      [quote.trackingId, quote.customerName, quote.customerEmail, quote.serviceType].join(' ').toLowerCase().includes(needle),
    );
  }, [quotes, query]);

  const counts: QuoteCounts = useMemo(
    () => ({
      total: quotes.length,
      pending: quotes.filter(q => q.status === 'Pending Quote').length,
      quoted: quotes.filter(q => q.status === 'Quoted').length,
      value: quotes.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0),
    }),
    [quotes],
  );

  const { pageItems, page, pageSize, total, setPage, setPageSize } = usePagination(filtered);

  if (loading) return <Spinner label="Loading quotes…" />;
  if (error && quotes.length === 0) return <ErrorNote message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <QuoteStatCards counts={counts} />

      <Panel
        title="Quote requests"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search quotes…"
                className="w-44 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <EmptyState label="No quote requests yet" />
        ) : (
          <div className="space-y-4">
            {pageItems.map(quote => (
              <QuoteCard
                key={quote.trackingId}
                quote={quote}
                saving={saving === quote.trackingId}
                draft={drafts[quote.trackingId] || { price: String(quote.estimatedPrice || ''), notes: '' }}
                converting={converting === quote.trackingId}
                onDraftChange={draft =>
                  setDrafts(current => ({ ...current, [quote.trackingId]: draft }))
                }
                onRespond={status => respond(quote, status)}
                onConvert={() => convert(quote)}
              />
            ))}

            <Pagination
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              label="quotes"
            />
          </div>
        )}
      </Panel>
    </div>
  );
};

export default QuotesPage;