import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { EmptyState } from '../common/Primitives';
import { Pagination, usePagination } from '../common/Pagination';
import { VEHICLE_STATUS_TONE, type FleetVehicle } from './fleetTypes';

interface VehicleTableProps {
  vehicles: FleetVehicle[];
  onEdit: (vehicle: FleetVehicle) => void;
  onDelete: (id: string) => void;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, onEdit, onDelete }) => {
  const { pageItems, page, pageSize, total, setPage, setPageSize } = usePagination(vehicles);

  if (total === 0) return <EmptyState label="No vehicles in this category" />;

  return (
    <div>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
            <th className="px-2 py-3 font-bold">Vehicle</th>
            <th className="px-2 py-3 font-bold">Category</th>
            <th className="px-2 py-3 font-bold">Plate</th>
            <th className="px-2 py-3 font-bold">Driver</th>
            <th className="px-2 py-3 font-bold">Rate / Hr</th>
            <th className="px-2 py-3 font-bold">Status</th>
            <th className="px-2 py-3 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(vehicle => (
            <tr key={vehicle.id} className="border-b border-slate-50 last:border-0">
              <td className="px-2 py-3.5">
                <p className="font-semibold text-slate-800">{vehicle.name}</p>
                <p className="text-[11px] text-slate-500">{vehicle.capacity}</p>
              </td>
              <td className="px-2 py-3.5 text-slate-600">{vehicle.category}</td>
              <td className="px-2 py-3.5 font-mono text-xs text-slate-600">{vehicle.plate}</td>
              <td className="px-2 py-3.5 text-slate-600">{vehicle.driver}</td>
              <td className="px-2 py-3.5 font-semibold text-slate-700">QAR {vehicle.ratePerHour}</td>
              <td className="px-2 py-3.5">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${VEHICLE_STATUS_TONE[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(vehicle)}
                    aria-label={`Edit ${vehicle.name}`}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-[#0066FF] hover:text-[#0066FF]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(vehicle.id)}
                    aria-label={`Delete ${vehicle.name}`}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-rose-300 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        label="vehicles"
      />
    </div>
  );
};

export default VehicleTable;