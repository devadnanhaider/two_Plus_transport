import { SERVICE_TYPES, BOOKING_STATUSES } from '../models/Booking.js';
import { QUOTE_STATUSES } from '../models/Quote.js';
import { VEHICLE_CATEGORIES, VEHICLE_STATUSES } from '../models/Vehicle.js';
import { BLOG_STATUSES } from '../models/BlogPost.js';

export const registerRules = {
  name: { required: true, min: 2, max: 80 },
  email: { required: true, type: 'email' },
  password: { required: true, min: 8, max: 128 },
  phone: { max: 25 },
  company: { max: 120 },
};

export const loginRules = {
  email: { required: true, type: 'email' },
  password: { required: true, min: 6 },
};

export const changePasswordRules = {
  currentPassword: { required: true },
  newPassword: { required: true, min: 8, max: 128 },
};

export const profileRules = {
  name: { min: 2, max: 80 },
  phone: { max: 25 },
  company: { max: 120 },
};

export const bookingRules = {
  serviceType: { required: true, enum: SERVICE_TYPES },
  pickupLocation: { required: true, max: 200 },
  dropoffLocation: { required: true, max: 200 },
  pickupDate: { required: true },
  pickupTime: { required: true },
  passengers: { type: 'number', minimum: 1, maximum: 60 },
  vehicleType: { max: 120 },
  specialNotes: { max: 1000 },
  estimatedPrice: { type: 'number', minimum: 0 },
  // Guest details supplied by the public booking form when no account is used.
  customerName: { max: 80 },
  customerPhone: { max: 25 },
  customerEmail: { type: 'email' },
};

export const quoteRules = {
  serviceType: { required: true, enum: SERVICE_TYPES },
  pickupLocation: { required: true, max: 200 },
  dropoffLocation: { max: 200 },
  pickupDate: {},
  pickupTime: {},
  passengers: { type: 'number', minimum: 1, maximum: 60 },
  vehicleType: { max: 120 },
  specialNotes: { max: 1000 },
  // Guest details supplied by the public quote form when no account is used.
  customerName: { max: 80 },
  customerPhone: { max: 25 },
  customerEmail: { type: 'email' },
};

export const bookingStatusRules = {
  status: { required: true, enum: BOOKING_STATUSES },
  note: { max: 500 },
};

export const quoteStatusRules = {
  status: { required: true, enum: QUOTE_STATUSES },
  estimatedPrice: { type: 'number', minimum: 0 },
  adminNotes: { max: 1000 },
};

export const forgotPasswordRules = {
  email: { required: true, type: 'email' },
};

export const resetPasswordRules = {
  token: { required: true, min: 10 },
  password: { required: true, min: 6, max: 128 },
};

export const vehicleRules = {
  name: { required: true, max: 120 },
  category: { required: true, enum: VEHICLE_CATEGORIES },
  capacity: { max: 40 },
  plate: { max: 20 },
  driver: { max: 80 },
  ratePerHour: { type: 'number', minimum: 0 },
  status: { enum: VEHICLE_STATUSES },
  image: { max: 500 },
};

export const blogRules = {
  title: { required: true, max: 200 },
  slug: { max: 220 },
  excerpt: { max: 500 },
  content: { required: true, max: 100000 },
  category: { max: 80 },
  author: { max: 120 },
  status: { enum: BLOG_STATUSES },
  publishedAt: { max: 40 },
  coverImage: { max: 500 },
};

/** PATCH bodies are partial, so the same rules apply without the `required` check. */
const optional = rules =>
  Object.fromEntries(Object.entries(rules).map(([field, rule]) => [field, { ...rule, required: false }]));

export const vehiclePatchRules = optional(vehicleRules);

export const blogPatchRules = optional(blogRules);

export const contactRules = {
  name: { required: true, max: 80 },
  email: { required: true, type: 'email' },
  phone: { max: 25 },
  subject: { required: true, max: 120 },
  message: { required: true, max: 2000 },
};
