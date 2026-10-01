import React from 'react';
import { Bell } from 'lucide-react';
import { Panel } from '../common/Primitives';
import { ADMIN_FIELD_CLASS, type CompanySettings } from './settingsTypes';

interface DispatchRulesCardProps {
  settings: CompanySettings;
  onChange: (settings: CompanySettings) => void;
}

export const DispatchRulesCard: React.FC<DispatchRulesCardProps> = ({ settings, onChange }) => (
  <Panel title="Dispatch rules">
    <div className="space-y-4">
      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Quote response window</span>
        <select
          className={ADMIN_FIELD_CLASS}
          value={settings.responseWindow}
          onChange={e => onChange({ ...settings, responseWindow: e.target.value })}
        >
          {['30 minutes', '1 hour', '2 hours', 'Same day'].map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1.5 block text-xs font-bold text-slate-700">VAT registration</span>
        <input className={ADMIN_FIELD_CLASS} value={settings.vatNumber} onChange={e => onChange({ ...settings, vatNumber: e.target.value })} />
      </label>

      <div className="flex items-start gap-3 rounded-xl bg-sky-50 p-4">
        <Bell className="mt-0.5 h-4 w-4 shrink-0 text-[#0066FF]" />
        <p className="text-[11px] leading-relaxed text-slate-600">
          Dispatch alerts: the dashboard surfaces new quotes, unassigned bookings and cancellations as soon as customers
          submit them.
        </p>
      </div>
    </div>
  </Panel>
);

export default DispatchRulesCard;