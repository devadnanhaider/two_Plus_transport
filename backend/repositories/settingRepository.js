import { isDbReady } from '../config/db.js';
import { Setting } from '../models/Setting.js';

const memorySettings = new Map();

const serialise = doc => (typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc });

export const settingRepository = {
  async get(key = 'company') {
    if (isDbReady()) {
      const setting = await Setting.findOne({ key });
      return setting ? serialise(setting) : null;
    }
    return memorySettings.get(key) ?? null;
  },

  async set(key, value) {
    if (isDbReady()) {
      const setting = await Setting.findOneAndUpdate(
        { key },
        { $set: { key, value } },
        { new: true, upsert: true, runValidators: true },
      );
      return serialise(setting);
    }

    const record = { key, value, createdAt: new Date(), updatedAt: new Date() };
    memorySettings.set(key, record);
    return { ...record };
  },
};

export default settingRepository;
