import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  label?: string;
}

const pageButton =
  'h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  label = 'records',
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pages = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const current = Math.min(Math.max(page, 2), totalPages - 1);
    const visible = new Set<number>([1, totalPages, current - 1, current, current + 1]);
    const sorted = [...visible].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b);

    const result: (number | 'gap')[] = [];
    let previous = 0;
    for (const value of sorted) {
      if (previous && value - previous > 1) result.push('gap');
      result.push(value);
      previous = value;
    }
    return result;
  }, [page, totalPages]);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>
          Showing <span className="font-bold text-slate-700">{from}</span>–
          <span className="font-bold text-slate-700">{to}</span> of{' '}
          <span className="font-bold text-slate-700">{total}</span> {label}
        </span>
        <span className="hidden text-slate-400 sm:inline">
          Page <span className="font-bold text-slate-700">{page}</span> of{' '}
          <span className="font-bold text-slate-700">{totalPages}</span>
        </span>
        <select
          value={pageSize}
          onChange={event => onPageSizeChange(Number(event.target.value))}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-slate-600 outline-none focus:border-[#0066FF]"
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      <nav className="flex items-center gap-1" aria-label="Pagination">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className={`${pageButton} flex items-center gap-1 border border-slate-200 px-3 text-slate-600 hover:border-[#0066FF] hover:text-[#0066FF]`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {pages.map((item, index) =>
            item === 'gap' ? (
              <span key={`gap-${index}`} className="px-1 text-xs font-bold text-slate-400">
                …
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                aria-current={item === page ? 'page' : undefined}
                className={`${pageButton} ${
                  item === page
                    ? 'bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white'
                    : 'border border-slate-200 text-slate-600 hover:border-[#0066FF] hover:text-[#0066FF]'
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className={`${pageButton} flex items-center gap-1 border border-slate-200 px-3 text-slate-600 hover:border-[#0066FF] hover:text-[#0066FF]`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
      </nav>
    </div>
  );
};

/** Client-side slicing + pager state shared by every admin table. */
export const usePagination = <T,>(items: T[], initialPageSize = 15) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  );

  return {
    pageItems,
    page,
    pageSize,
    total,
    setPage: (next: number) => setPage(Math.min(Math.max(next, 1), Math.max(1, Math.ceil(items.length / pageSize)))),
    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(1);
    },
  };
};

export default Pagination;