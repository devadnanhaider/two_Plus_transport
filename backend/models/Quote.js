import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  serviceType: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  pickupDate: { type: String, required: true },
  pickupTime: { type: String, default: '09:00' },
  passengers: { type: Number, default: 1 },
  vehicleType: { type: String, default: 'Standard Sedan' },
  specialNotes: { type: String, default: '' },
  estimatedPrice: { type: Number, default: 0 },
  status: { type: String, default: 'Pending Quote' },
  createdAt: { type: Date, default: Date.now }
});

export const Quote = mongoose.model('Quote', quoteSchema);
