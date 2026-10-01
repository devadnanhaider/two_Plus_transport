import React from 'react';
import { Panel } from '../common/Primitives';
import { ADMIN_FIELD_CLASS, type CompanySettings } from './settingsTypes';

interface CompanyProfileFormProps {
  settings: CompanySettings;
  onChange: (settings: CompanySettings) => void;
}

export const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ settings, onChange }) => (
  <Panel title="Company profile">
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Company name</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.name} onChange={e => onChange({ ...settings, name: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Booking email</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.email} onChange={e => onChange({ ...settings, email: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Mobile</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.phone} onChange={e => onChange({ ...settings, phone: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Landline</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.landline} onChange={e => onChange({ ...settings, landline: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">WhatsApp</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.whatsapp} onChange={e => onChange({ ...settings, whatsapp: e.target.value })} />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Depot address</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.address} onChange={e => onChange({ ...settings, address: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">X handle</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.xHandle} onChange={e => onChange({ ...settings, xHandle: e.target.value })} />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Currency</span>
        <select className={ADMIN_FIELD_CLASS} value={settings.currency} onChange={e => onChange({ ...settings, currency: e.target.value })}>
          {['QAR', 'USD', 'SAR', 'AED'].map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  </Panel>
);

export default CompanyProfileForm;