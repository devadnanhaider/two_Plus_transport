import mongoose from 'mongoose';
import { isDbReady } from '../config/db.js';
import { Vehicle, VEHICLE_CATEGORIES, VEHICLE_STATUSES } from '../models/Vehicle.js';

const memoryVehicles = [];

const serialise = doc => (typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc, id: String(doc._id) });

export const vehicleRepository = {
  async findAll() {
    if (isDbReady()) {
      const vehicles = await Vehicle.find().sort({ createdAt: -1 });
      return vehicles.map(serialise);
    }
    return memoryVehicles.map(v => ({ ...v, id: String(v._id) }));
  },

  async findById(id) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const vehicle = await Vehicle.findById(id);
      return vehicle ? serialise(vehicle) : null;
    }
    const found = memoryVehicles.find(v => String(v._id) === String(id));
    return found ? { ...found, id: String(found._id) } : null;
  },

  async create(data) {
    if (isDbReady()) {
      const vehicle = await Vehicle.create(data);
      return serialise(vehicle);
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      capacity: '',
      plate: '',
      driver: '',
      ratePerHour: 0,
      status: 'Available',
      image: '',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryVehicles.push(record);
    return { ...record, id: String(record._id) };
  },

  async updateById(id, updates) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const vehicle = await Vehicle.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
      return vehicle ? serialise(vehicle) : null;
    }

    const found = memoryVehicles.find(v => String(v._id) === String(id));
    if (!found) return null;
    Object.assign(found, updates, { updatedAt: new Date() });
    return { ...found, id: String(found._id) };
  },

  async deleteById(id) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return false;
      const removed = await Vehicle.findByIdAndDelete(id);
      return Boolean(removed);
    }

    const index = memoryVehicles.findIndex(v => String(v._id) === String(id));
    if (index === -1) return false;
    memoryVehicles.splice(index, 1);
    return true;
  },

  categories: VEHICLE_CATEGORIES,
  statuses: VEHICLE_STATUSES,
};

export default vehicleRepository;
