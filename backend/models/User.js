import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin', 'driver'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
