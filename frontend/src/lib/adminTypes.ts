export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: 'user' | 'admin' | 'driver';
  isActive?: boolean;
  createdAt?: string;
}

export interface Booking {
  _id?: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers?: number;
  vehicleType?: string;
  estimatedPrice?: number;
  status: string;
  specialNotes?: string;
  statusHistory?: { status: string; at?: string; note?: string }[];
  driverInfo?: { name: string; phone: string; vehicleNumber: string };
  createdAt?: string;
}

export interface Quote {
  _id?: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate?: string;
  passengers?: number;
  vehicleType?: string;
  specialNotes?: string;
  estimatedPrice?: number;
  adminNotes?: string;
  status: string;
  convertedBooking?: string;
  createdAt?: string;
}

export const SERVICE_TYPES = [
  'Staff Transportation',
  'School Transportation',
  'Airport Transportation',
  'Valet Parking',
  'Tour Packages',
  'Towing & Breakdown',
];

export const BOOKING_STATUSES = [
  'Pending',
  'Confirmed',
  'Driver Assigned',
  'En Route',
  'Completed',
  'Cancelled',
];

export const QUOTE_STATUSES = ['Pending Quote', 'Quoted', 'Accepted', 'Declined', 'Expired'];

export const statusTone = (status: string) => {
  const map: Record<string, string> = {
    Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
    'Pending Quote': 'bg-amber-50 text-amber-700 ring-amber-200',
    Confirmed: 'bg-sky-50 text-sky-700 ring-sky-200',
    'Driver Assigned': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    'En Route': 'bg-[#0066FF]/10 text-[#0066FF] ring-[#0066FF]/25',
    Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 ring-rose-200',
    Quoted: 'bg-sky-50 text-sky-700 ring-sky-200',
    Accepted: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Declined: 'bg-rose-50 text-rose-700 ring-rose-200',
    Expired: 'bg-slate-100 text-slate-600 ring-slate-200',
  };
  return map[status] || 'bg-slate-100 text-slate-600 ring-slate-200';
};
