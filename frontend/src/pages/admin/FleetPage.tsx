import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Panel, Spinner, ErrorNote, EmptyState } from '../../components/adminPanel/common/Primitives';
import { FleetStatCards, type FleetCounts } from '../../components/adminPanel/fleet/FleetStatCards';
import { VehicleTable } from '../../components/adminPanel/fleet/VehicleTable';
import { VehicleFormModal, type VehicleDraft } from '../../components/adminPanel/fleet/VehicleFormModal';
import { VEHICLE_CATEGORIES, type FleetVehicle } from '../../components/adminPanel/fleet/fleetTypes';
import { useToast } from '../../components/common/ToastProvider';

const EMPTY_DRAFT: VehicleDraft = {
  id: '',
  name: '',
  category: 'Bus',
  capacity: '',
  plate: '',
  ratePerHour: 0,
  status: 'Available',
  driver: '',
  features: '',
};

export const FleetPage: React.FC = () => {
  const toast = useToast();
  useAdminMeta({ title: 'Fleet', subtitle: 'Vehicles, drivers, rates and availability' });

  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('All');
  const [draft, setDraft] = useState<VehicleDraft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ vehicles: FleetVehicle[] }>('/fleet');
      setFleet(res.data.vehicles || []);
    } catch (err) {
      setError(extractError(err, 'Could not load the fleet'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => (filter === 'All' ? fleet : fleet.filter(vehicle => vehicle.category === filter)),
    [fleet, filter],
  );

  const counts: FleetCounts = useMemo(
    () => ({
      total: fleet.length,
      available: fleet.filter(v => v.status === 'Available').length,
      onTrip: fleet.filter(v => v.status === 'On Trip').length,
      hourly: fleet.filter(v => v.status !== 'Maintenance').reduce((sum, v) => sum + v.ratePerHour, 0),
    }),
    [fleet],
  );

  const openCreate = () => {
    setDraft(EMPTY_DRAFT);
    setEditing(true);
  };

  const openEdit = (vehicle: FleetVehicle) => {
    setDraft({ ...vehicle, features: (vehicle.features || []).join(', ') });
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);

    const payload = {
      name: draft.name.trim(),
      category: draft.category,
      capacity: draft.capacity.trim(),
      plate: draft.plate.trim().toUpperCase(),
      ratePerHour: Number(draft.ratePerHour) || 0,
      status: draft.status,
      driver: draft.driver.trim(),
    };

    try {
      if (draft.id) {
        await api.patch(`/fleet/${draft.id}`, payload);
      } else {
        await api.post('/fleet', payload);
      }
      setEditing(false);
      toast.success(draft.id ? 'Vehicle updated' : 'Vehicle added', payload.name);
      await load();
    } catch (err) {
      const message = extractError(err, 'Could not save this vehicle');
      setError(message);
      toast.error('Save failed', message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await api.delete(`/fleet/${id}`);
      toast.success('Vehicle removed');
      await load();
    } catch (err) {
      const message = extractError(err, 'Could not delete this vehicle');
      setError(message);
      toast.error('Delete failed', message);
    }
  };

  return (
    <div className="space-y-6">
      <FleetStatCards counts={counts} />

      <Panel
        title="Vehicles"
        action={
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={event => setFilter(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none focus:border-[#0066FF]"
            >
              {['All', ...VEHICLE_CATEGORIES].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={load}
              aria-label="Refresh fleet"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0066FF] px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-[#0052CC]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add vehicle
            </button>
          </div>
        }
      >
        {loading && <Spinner label="Loading fleet…" />}
        {!loading && error && fleet.length === 0 && <ErrorNote message={error} onRetry={load} />}
        {!loading && error && fleet.length > 0 && (
          <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700">
            {error}
          </p>
        )}
        {!loading && !error && fleet.length === 0 && <EmptyState label="No vehicles yet — add your first vehicle" />}
        {!loading && fleet.length > 0 && (
          <VehicleTable vehicles={filtered} onEdit={openEdit} onDelete={remove} />
        )}
      </Panel>

      {editing && (
        <VehicleFormModal
          draft={draft}
          onChange={setDraft}
          onClose={() => setEditing(false)}
          onSave={save}
          saving={saving}
        />
      )}
    </div>
  );
};

export default FleetPage;