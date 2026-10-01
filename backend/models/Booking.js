import mongoose from 'mongoose';

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

const bookingSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true, uppercase: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    serviceType: { type: String, required: true, enum: SERVICE_TYPES },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    pickupLocation: { type: String, required: true, trim: true },
    dropoffLocation: { type: String, required: true, trim: true },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    passengers: { type: Number, default: 1, min: 1, max: 60 },
    vehicleType: { type: String, default: 'Standard Sedan' },
    specialNotes: { type: String, default: '' },
    estimatedPrice: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: BOOKING_STATUSES, default: 'Pending' },
    driverInfo: {
      name: { type: String, default: 'Unassigned' },
      phone: { type: String, default: '' },
      vehicleNumber: { type: String, default: '' },
    },
    statusHistory: [
      {
        status: String,
        at: { type: Date, default: Date.now },
        note: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true },
);

export const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;