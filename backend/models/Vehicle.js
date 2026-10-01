import mongoose from 'mongoose';

export const VEHICLE_CATEGORIES = ['Bus', 'Van', 'SUV', 'Sedan', 'Flatbed', 'Truck'];
export const VEHICLE_STATUSES = ['Available', 'On Trip', 'Maintenance'];

/** Rewrites `_id` as a plain `id` so API payloads match the rest of the endpoints. */
const transform = (_doc, ret) => {
  ret.id = String(ret._id);
  delete ret._id;
  delete ret.__v;
  return ret;
};

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 120 },
    category: { type: String, enum: VEHICLE_CATEGORIES, trim: true },
    capacity: { type: String, default: '', trim: true },
    plate: { type: String, default: '', trim: true, maxlength: 20 },
    driver: { type: String, default: '', trim: true },
    ratePerHour: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: VEHICLE_STATUSES, default: 'Available' },
    image: { type: String, default: '', trim: true },
  },
  { timestamps: true, toJSON: { transform } },
);

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
