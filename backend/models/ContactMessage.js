import mongoose from 'mongoose';

export const CONTACT_STATUSES = ['New', 'Read'];

/** Rewrites `_id` as a plain `id` so API payloads match the rest of the endpoints. */
const transform = (_doc, ret) => {
  ret.id = String(ret._id);
  delete ret._id;
  delete ret.__v;
  return ret;
};

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please provide a valid email address'],
    },
    phone: { type: String, default: '', trim: true, maxlength: 25 },
    subject: { type: String, required: [true, 'Subject is required'], trim: true, maxlength: 120 },
    message: { type: String, required: [true, 'Message is required'], maxlength: 2000 },
    status: { type: String, enum: CONTACT_STATUSES, default: 'New' },
  },
  { timestamps: true, toJSON: { transform } },
);

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
