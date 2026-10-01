import mongoose from 'mongoose';
import { SERVICE_TYPES } from './Booking.js';

export const QUOTE_STATUSES = ['Pending Quote', 'Quoted', 'Accepted', 'Declined', 'Expired'];

const quoteSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true, uppercase: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    serviceType: { type: String, required: true, enum: SERVICE_TYPES },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    pickupLocation: { type: String, required: true, trim: true },
    dropoffLocation: { type: String, default: '', trim: true },
    pickupDate: { type: String, default: '' },
    pickupTime: { type: String, default: '09:00' },
    passengers: { type: Number, default: 1, min: 1, max: 60 },
    vehicleType: { type: String, default: 'Standard Sedan' },
    specialNotes: { type: String, default: '' },
    estimatedPrice: { type: Number, default: 0, min: 0 },
    adminNotes: { type: String, default: '' },
    status: { type: String, enum: QUOTE_STATUSES, default: 'Pending Quote' },
    convertedBooking: { type: String, default: '', uppercase: true },
    respondedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;