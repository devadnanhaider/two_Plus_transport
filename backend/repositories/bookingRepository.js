import { isDbReady } from '../config/db.js';
import { Booking, BOOKING_STATUSES } from '../models/Booking.js';

const memoryBookings = [];

const serialise = doc =>
  typeof doc.toObject === 'function' ? doc.toObject() : { ...doc, id: String(doc._id) };

export const bookingRepository = {
  async create(data) {
    if (isDbReady()) {
      const booking = await Booking.create(data);
      return serialise(booking);
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryBookings.push(record);
    return { ...record };
  },

  async findByTrackingId(trackingId) {
    const id = String(trackingId).toUpperCase();
    if (isDbReady()) {
      const booking = await Booking.findOne({ trackingId: id });
      return booking ? serialise(booking) : null;
    }
    const found = memoryBookings.find(b => b.trackingId === id);
    return found ? { ...found } : null;
  },

  async findAll({ userId = null, status = null } = {}) {
    const filter = {};
    if (userId) filter.user = userId;
    if (status) filter.status = status;

    if (isDbReady()) {
      const bookings = await Booking.find(filter).sort({ createdAt: -1 });
      return bookings.map(serialise);
    }

    return memoryBookings
      .filter(b => (!userId || String(b.user) === String(userId)) && (!status || b.status === status))
      .map(b => ({ ...b }));
  },

  async updateByTrackingId(trackingId, updates) {
    const id = String(trackingId).toUpperCase();
    if (isDbReady()) {
      const booking = await Booking.findOneAndUpdate(
        { trackingId: id },
        { $set: updates },
        { new: true, runValidators: true },
      );
      return booking ? serialise(booking) : null;
    }

    const found = memoryBookings.find(b => b.trackingId === id);
    if (!found) return null;
    Object.assign(found, updates, { updatedAt: new Date() });
    return { ...found };
  },

  async updateStatus(trackingId, status, note = '') {
    const id = String(trackingId).toUpperCase();
    if (isDbReady()) {
      const booking = await Booking.findOne({ trackingId: id });
      if (!booking) return null;
      booking.status = status;
      if (note) booking.specialNotes = note;
      booking.statusHistory.push({ status, note });
      await booking.save();
      return serialise(booking);
    }

    const found = memoryBookings.find(b => b.trackingId === id);
    if (!found) return null;
    found.status = status;
    found.statusHistory = [...(found.statusHistory || []), { status, note, at: new Date() }];
    found.updatedAt = new Date();
    return { ...found };
  },

  statuses: BOOKING_STATUSES,
};

export default bookingRepository;