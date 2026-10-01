import React from 'react';
import { Building2, Percent } from 'lucide-react';
import { Panel } from '../common/Primitives';
import type { ServiceRate } from './settingsTypes';

interface ServiceRateListProps {
  rates: ServiceRate[];
  onChange: (rates: ServiceRate[]) => void;
}

export const ServiceRateList: React.FC<ServiceRateListProps> = ({ rates, onChange }) => (
  <Panel title="Service catalogue & rates">
    <div className="space-y-3">
      {rates.map(rate => (
        <div key={rate.id} className="rounded-xl border border-slate-200/80 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Building2 className="h-4 w-4 text-[#0066FF]" />
                {rate.name}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{rate.description}</p>
            </div>

            <label className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <input
                type="checkbox"
                checked={rate.active}
                onChange={e =>
                  onChange(rates.map(item => (item.id === rate.id ? { ...item, active: e.target.checked } : item)))
                }
                className="h-4 w-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
              />
              Active
            </label>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2">
              <Percent className="h-4 w-4 text-slate-400" />
              <input
                type="number"
                min={0}
                value={rate.baseRate}
                onChange={e =>
                  onChange(
                    rates.map(item => (item.id === rate.id ? { ...item, baseRate: Number(e.target.value) } : item)),
                  )
                }
                className="w-full bg-transparent text-sm font-semibold outline-none"
              />
            </div>
            <span className="whitespace-nowrap text-[11px] font-semibold text-slate-500">{rate.unit}</span>
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

export default ServiceRateList;