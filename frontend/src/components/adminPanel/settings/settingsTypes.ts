export interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  landline: string;
  whatsapp: string;
  address: string;
  xHandle: string;
  responseWindow: string;
  vatNumber: string;
  currency: string;
}

export interface ServiceRate {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  unit: string;
  active: boolean;
}

export interface SettingsPayload {
  profile: Partial<CompanySettings>;
  serviceRates: ServiceRate[];
}

export const ADMIN_FIELD_CLASS =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10';

export const readStore = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};