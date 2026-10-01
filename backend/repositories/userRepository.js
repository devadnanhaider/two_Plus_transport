import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { isDbReady, waitForDb } from '../config/db.js';
import { User } from '../models/User.js';

const memoryUsers = [];

const hash = async plain => bcrypt.hash(plain, 10);

const shape = doc => ({
  id: String(doc._id),
  name: doc.name,
  email: doc.email,
  phone: doc.phone,
  company: doc.company,
  role: doc.role,
  isActive: doc.isActive,
  createdAt: doc.createdAt,
});

export const userRepository = {
  /** Creates a user in Mongo, falling back to memory when the DB is offline. */
  async create({ name, email, password, phone = '', company = '', role = 'user' }) {
    await waitForDb();
    const normalisedEmail = String(email).toLowerCase();

    if (isDbReady()) {
      const user = await User.create({ name, email: normalisedEmail, password, phone, company, role });
      return { record: user, public: shape(user) };
    }

    if (memoryUsers.some(u => u.email === normalisedEmail)) {
      const error = new Error('An account with these details already exists');
      error.code = 11000;
      throw error;
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email: normalisedEmail,
      passwordHash: await hash(password),
      phone,
      company,
      role,
      isActive: true,
      createdAt: new Date(),
      lastLoginAt: null,
    };
    memoryUsers.push(record);
    return { record, public: shape(record) };
  },

  async findByEmail(email) {
    await waitForDb();
    const normalisedEmail = String(email).toLowerCase();

    if (isDbReady()) {
      const user = await User.findOne({ email: normalisedEmail }).select('+password');
      if (!user) return null;
      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
        isActive: user.isActive,
        createdAt: user.createdAt,
        comparePassword: candidate => user.comparePassword(candidate),
        toPublicJSON: () => user.toPublicJSON(),
        persist: async ({ lastLoginAt }) => {
          if (lastLoginAt) {
            user.lastLoginAt = lastLoginAt;
            await user.save();
          }
          return shape(user);
        },
      };
    }

    const found = memoryUsers.find(u => u.email === normalisedEmail);
    if (!found) return null;
    return {
      id: found._id,
      name: found.name,
      email: found.email,
      role: found.role,
      phone: found.phone,
      company: found.company,
      isActive: found.isActive,
      createdAt: found.createdAt,
      comparePassword: candidate => bcrypt.compare(candidate, found.passwordHash),
      toPublicJSON: () => shape(found),
      persist: async ({ lastLoginAt }) => {
        if (lastLoginAt) found.lastLoginAt = lastLoginAt;
        return shape(found);
      },
    };
  },

  async findById(id) {
    await waitForDb();
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const user = await User.findById(id);
      return user ? { ...shape(user), toPublicJSON: () => user.toPublicJSON() } : null;
    }

    const found = memoryUsers.find(u => String(u._id) === String(id));
    return found ? { ...shape(found), toPublicJSON: () => shape(found) } : null;
  },

  async findAll() {
    await waitForDb();
    if (isDbReady()) {
      const users = await User.find().sort({ createdAt: -1 });
      return users.map(shape);
    }
    return memoryUsers.map(shape);
  },

  async updateById(id, updates) {
    await waitForDb();
    const allowed = {};
    ['name', 'phone', 'company'].forEach(key => {
      if (updates[key] !== undefined) allowed[key] = updates[key];
    });

    if (isDbReady()) {
      const user = await User.findByIdAndUpdate(id, allowed, { new: true, runValidators: true });
      return user ? shape(user) : null;
    }

    const found = memoryUsers.find(u => String(u._id) === String(id));
    if (!found) return null;
    Object.assign(found, allowed);
    return shape(found);
  },

  /** Stores a short-lived password reset token for a user. */
  async setResetToken(id, token, expiresAt) {
    await waitForDb();
    const fields = { resetPasswordToken: token ?? null, resetPasswordExpires: expiresAt ?? null };

    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const user = await User.findByIdAndUpdate(id, { $set: fields }, { new: true });
      return user ? shape(user) : null;
    }

    const found = memoryUsers.find(u => String(u._id) === String(id));
    if (!found) return null;
    Object.assign(found, fields);
    return shape(found);
  },

  /** Looks up a user by their reset token so the password can be replaced. */
  async findByResetToken(token) {
    if (!token) return null;
    await waitForDb();

    if (isDbReady()) {
      const user = await User.findOne({ resetPasswordToken: token }).select('+resetPasswordToken +resetPasswordExpires');
      if (!user) return null;
      return { id: String(user._id), email: user.email, resetPasswordToken: user.resetPasswordToken, resetPasswordExpires: user.resetPasswordExpires };
    }

    const found = memoryUsers.find(u => u.resetPasswordToken === token);
    if (!found) return null;
    return { id: String(found._id), email: found.email, resetPasswordToken: found.resetPasswordToken, resetPasswordExpires: found.resetPasswordExpires };
  },

  async updatePassword(id, newPassword) {
    await waitForDb();
    if (isDbReady()) {
      const user = await User.findById(id).select('+password');
      if (!user) return null;
      user.password = newPassword;
      await user.save();
      return shape(user);
    }

    const found = memoryUsers.find(u => String(u._id) === String(id));
    if (!found) return null;
    found.passwordHash = await hash(newPassword);
    return shape(found);
  },
};

export default userRepository;