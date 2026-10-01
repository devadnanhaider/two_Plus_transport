import React from 'react';
import { Loader2 } from 'lucide-react';
import { X } from 'lucide-react';
import { ADMIN_FIELD_CLASS, VEHICLE_CATEGORIES, VEHICLE_STATUSES, type FleetVehicle, type VehicleStatus } from './fleetTypes';

export type VehicleDraft = Omit<FleetVehicle, 'features'> & { features: string };

interface VehicleFormModalProps {
  draft: VehicleDraft;
  onChange: (draft: VehicleDraft) => void;
  onClose: () => void;
  onSave: () => void;
  saving?: boolean;
}

export const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ draft, onChange, onClose, onSave, saving }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900">{draft.id ? 'Edit vehicle' : 'Add vehicle'}</h3>
        <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Vehicle name</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.name} onChange={e => onChange({ ...draft, name: e.target.value })} />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Category</span>
          <select className={ADMIN_FIELD_CLASS} value={draft.category} onChange={e => onChange({ ...draft, category: e.target.value })}>
            {VEHICLE_CATEGORIES.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Capacity</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.capacity} onChange={e => onChange({ ...draft, capacity: e.target.value })} />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Plate number</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.plate} onChange={e => onChange({ ...draft, plate: e.target.value })} />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Rate per hour (QAR)</span>
          <input
            type="number"
            min={0}
            className={ADMIN_FIELD_CLASS}
            value={draft.ratePerHour}
            onChange={e => onChange({ ...draft, ratePerHour: Number(e.target.value) })}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Assigned driver</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.driver} onChange={e => onChange({ ...draft, driver: e.target.value })} />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Status</span>
          <select
            className={ADMIN_FIELD_CLASS}
            value={draft.status}
            onChange={e => onChange({ ...draft, status: e.target.value as VehicleStatus })}
          >
            {VEHICLE_STATUSES.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Features (comma separated)</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.features} onChange={e => onChange({ ...draft, features: e.target.value })} />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!draft.name.trim() || saving}
          className="rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-5 py-2.5 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {saving && <Loader2 className="mr-1.5 inline h-3.5 w-3.5 animate-spin" />}
          {draft.id ? 'Save changes' : 'Add vehicle'}
        </button>
      </div>
    </div>
  </div>
);

export default VehicleFormModal;