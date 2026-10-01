import { isDbReady } from '../config/db.js';
import { Quote, QUOTE_STATUSES } from '../models/Quote.js';

const memoryQuotes = [];

const serialise = doc => (typeof doc.toObject === 'function' ? doc.toObject() : { ...doc });

export const quoteRepository = {
  async create(data) {
    if (isDbReady()) {
      const quote = await Quote.create(data);
      return serialise(quote);
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryQuotes.push(record);
    return { ...record };
  },

  async findByTrackingId(trackingId) {
    const id = String(trackingId).toUpperCase();
    if (isDbReady()) {
      const quote = await Quote.findOne({ trackingId: id });
      return quote ? serialise(quote) : null;
    }
    const found = memoryQuotes.find(q => q.trackingId === id);
    return found ? { ...found } : null;
  },

  async findAll({ userId = null, status = null } = {}) {
    const filter = {};
    if (userId) filter.user = userId;
    if (status) filter.status = status;

    if (isDbReady()) {
      const quotes = await Quote.find(filter).sort({ createdAt: -1 });
      return quotes.map(serialise);
    }

    return memoryQuotes
      .filter(q => (!userId || String(q.user) === String(userId)) && (!status || q.status === status))
      .map(q => ({ ...q }));
  },

  async updateByTrackingId(trackingId, updates) {
    const id = String(trackingId).toUpperCase();
    if (isDbReady()) {
      const quote = await Quote.findOneAndUpdate(
        { trackingId: id },
        { $set: updates },
        { new: true, runValidators: true },
      );
      return quote ? serialise(quote) : null;
    }

    const found = memoryQuotes.find(q => q.trackingId === id);
    if (!found) return null;
    Object.assign(found, updates, { updatedAt: new Date() });
    return { ...found };
  },

  statuses: QUOTE_STATUSES,
};

export default quoteRepository;