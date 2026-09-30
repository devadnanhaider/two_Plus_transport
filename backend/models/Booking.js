import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  serviceType: { 
    type: String, 
    required: true,
    enum: ['Staff Transportation', 'School Transportation', 'Airport Transportation', 'Valet Parking', 'Tour Packages', 'Towing & Breakdown'] 
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  pickupDate: { type: String, required: true },
  pickupTime: { type: String, required: true },
  passengers: { type: Number, default: 1 },
  vehicleType: { type: String, default: 'Standard Sedan' },
  specialNotes: { type: String, default: '' },
  estimatedPrice: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Driver Assigned', 'En Route', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  driverInfo: {
    name: { type: String, default: 'Unassigned' },
    phone: { type: String, default: '' },
    vehicleNumber: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);
