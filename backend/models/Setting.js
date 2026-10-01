import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'company', unique: true, trim: true },
    value: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { strict: false, timestamps: true },
);

export const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
