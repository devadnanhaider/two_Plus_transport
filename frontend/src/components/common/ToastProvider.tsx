import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastKind = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  description?: string;
}

interface ToastApi {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const DURATION: Record<ToastKind, number> = {
  success: 3500,
  info: 4000,
  error: 5500,
};

const STYLES: Record<ToastKind, { icon: React.ElementType; ring: string; iconColor: string; bar: string }> = {
  success: {
    icon: CheckCircle2,
    ring: 'border-emerald-200',
    iconColor: 'text-emerald-500',
    bar: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    ring: 'border-rose-200',
    iconColor: 'text-rose-500',
    bar: 'bg-rose-500',
  },
  info: {
    icon: Info,
    ring: 'border-sky-200',
    iconColor: 'text-sky-500',
    bar: 'bg-sky-500',
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string, description?: string) => {
      counter.current += 1;
      const id = counter.current;

      setToasts(current => [...current.slice(-3), { id, kind, message, description }]);
      timers.current[id] = setTimeout(() => dismiss(id), DURATION[kind]);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (message, description) => push('success', message, description),
      error: (message, description) => push('error', message, description),
      info: (message, description) => push('info', message, description),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-5 sm:top-5 sm:items-end">
        {toasts.map(toast => {
          const style = STYLES[toast.kind];
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role="status"
              aria-live="polite"
              className={`pointer-events-auto w-full max-w-sm animate-[toast-in_240ms_ease-out] overflow-hidden rounded-xl border bg-white shadow-lg ${style.ring}`}
            >
              <div className="flex items-start gap-3 px-4 py-3">
                <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${style.iconColor}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold leading-snug text-slate-800">{toast.message}</p>
                  {toast.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{toast.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className={`h-0.5 w-full ${style.bar} opacity-60`} />
            </div>
          );
        })}
      </div>

      <style>{`@keyframes toast-in {
        from { opacity: 0; transform: translateY(-12px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }`}</style>
    </ToastContext.Provider>
  );
};

/** Returns `{ success, error, info }` and throws if used outside the provider. */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
};

export default ToastProvider;