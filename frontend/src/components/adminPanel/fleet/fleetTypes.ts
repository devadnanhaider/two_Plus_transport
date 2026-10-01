export type VehicleStatus = 'Available' | 'On Trip' | 'Maintenance';

export interface FleetVehicle {
  id: string;
  name: string;
  category: string;
  capacity: string;
  plate: string;
  ratePerHour: number;
  status: VehicleStatus;
  driver: string;
  features?: string[];
  image?: string;
}

export const VEHICLE_CATEGORIES = ['Bus', 'Van', 'SUV', 'Sedan', 'Flatbed', 'Truck'];
export const VEHICLE_STATUSES: VehicleStatus[] = ['Available', 'On Trip', 'Maintenance'];

export const VEHICLE_STATUS_TONE: Record<VehicleStatus, string> = {
  Available: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'On Trip': 'bg-sky-50 text-sky-700 ring-sky-200',
  Maintenance: 'bg-amber-50 text-amber-700 ring-amber-200',
};

export const ADMIN_FIELD_CLASS =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10';