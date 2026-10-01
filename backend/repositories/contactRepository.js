import { isDbReady } from '../config/db.js';
import { ContactMessage, CONTACT_STATUSES } from '../models/ContactMessage.js';

const memoryMessages = [];

const serialise = doc => (typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc, id: String(doc._id) });

export const contactRepository = {
  async create(data) {
    if (isDbReady()) {
      const message = await ContactMessage.create(data);
      return serialise(message);
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      phone: '',
      status: 'New',
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryMessages.push(record);
    return { ...record, id: String(record._id) };
  },

  async findAll({ status = null } = {}) {
    const filter = {};
    if (status) filter.status = status;

    if (isDbReady()) {
      const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
      return messages.map(serialise);
    }

    return memoryMessages
      .filter(m => !status || m.status === status)
      .map(m => ({ ...m, id: String(m._id) }));
  },

  statuses: CONTACT_STATUSES,
};

export default contactRepository;
