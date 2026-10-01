import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Save } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import { COMPANY_INFO } from '../../data/companyInfo';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Spinner, ErrorNote } from '../../components/adminPanel/common/Primitives';
import { CompanyProfileForm } from '../../components/adminPanel/settings/CompanyProfileForm';
import { DispatchRulesCard } from '../../components/adminPanel/settings/DispatchRulesCard';
import { ServiceRateList } from '../../components/adminPanel/settings/ServiceRateList';
import type { CompanySettings, ServiceRate } from '../../components/adminPanel/settings/settingsTypes';
import { useToast } from '../../components/common/ToastProvider';

const EMPTY_SETTINGS: CompanySettings = {
  name: COMPANY_INFO.name,
  email: COMPANY_INFO.email,
  phone: COMPANY_INFO.mobileDisplay,
  landline: COMPANY_INFO.landlineDisplay,
  whatsapp: COMPANY_INFO.whatsappDisplay,
  address: COMPANY_INFO.address,
  xHandle: COMPANY_INFO.xHandle,
  responseWindow: '',
  vatNumber: '',
  currency: 'QAR',
};

export const SettingsPage: React.FC = () => {
  const toast = useToast();
  useAdminMeta({ title: 'Settings', subtitle: 'Company profile, service catalogue and dispatch rules' });

  const [settings, setSettings] = useState<CompanySettings>(EMPTY_SETTINGS);
  const [rates, setRates] = useState<ServiceRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{
        settings: { profile?: Partial<CompanySettings>; serviceRates?: ServiceRate[] };
      }>('/settings');

      setSettings({ ...EMPTY_SETTINGS, ...(res.data.settings?.profile || {}) });
      setRates(res.data.settings?.serviceRates || []);
    } catch (err) {
      setError(extractError(err, 'Could not load settings'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const persist = async () => {
    setSaving(true);
    setError(null);
    try {
      await api.put('/settings', { profile: settings, serviceRates: rates });
      setSaved(true);
      toast.success('Settings saved', 'Your changes are live across the admin panel.');
      window.setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      const message = extractError(err, 'Could not save settings');
      setError(message);
      toast.error('Save failed', message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="Loading settings…" />;
  if (error && !settings.name) return <ErrorNote message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {error && (
          <p className="mr-auto rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700">
            {error}
          </p>
        )}
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reload
        </button>
        <button
          onClick={persist}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#0066FF]/20 transition hover:brightness-110 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? 'Saved' : saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CompanyProfileForm settings={settings} onChange={setSettings} />

        <div className="space-y-6">
          <DispatchRulesCard settings={settings} onChange={setSettings} />
          <ServiceRateList rates={rates} onChange={setRates} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;