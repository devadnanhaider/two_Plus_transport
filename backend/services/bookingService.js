import { bookingRepository } from '../repositories/bookingRepository.js';
import { generateTrackingId } from '../utils/ids.js';
import ApiError from '../utils/ApiError.js';
import { emailService } from './emailService.js';

const withUser = (user, payload) => ({
  ...payload,
  user: user ? user.id : null,
  customerName: payload.customerName || user?.name || 'Website booking',
  customerEmail: payload.customerEmail || user?.email || 'not-provided@twoplus.qa',
  customerPhone: payload.customerPhone || user?.phone || 'Not provided',
});

export const bookingService = {
  async create(user, payload) {
    const data = withUser(user, {
      ...payload,
      trackingId: generateTrackingId('TPT'),
      status: 'Pending',
      statusHistory: [{ status: 'Pending', note: 'Booking received by dispatch team', at: new Date() }],
    });

    const booking = await bookingRepository.create(data);
    // Never let a mail failure break the booking itself.
    emailService.sendBookingReceived(booking).catch(error => console.error('📧 Booking email failed:', error.message));
    return booking;
  },

  async list(user, { status, all = false }) {
    return bookingRepository.findAll({
      userId: all ? null : user.id,
      status: status || null,
    });
  },

  async track(trackingId, user) {
    const booking = await bookingRepository.findByTrackingId(trackingId);
    if (!booking) throw ApiError.notFound('No booking found for that tracking ID');
    // The tracking reference is the credential: whoever holds it can follow the trip,
    // so customers can check status even after signing out.
    return booking;
  },

  async updateStatus(user, trackingId, { status, note }) {
    if (!bookingRepository.statuses.includes(status)) {
      throw ApiError.badRequest(`status must be one of: ${bookingRepository.statuses.join(', ')}`);
    }

    const existing = await bookingRepository.findByTrackingId(trackingId);
    if (!existing) throw ApiError.notFound('Booking not found');

    if (user.role !== 'admin' && user.role !== 'driver') {
      if (status !== 'Cancelled') throw ApiError.forbidden('Only dispatch can change this status');
      const owner = existing.user ? String(existing.user) : null;
      if (owner && owner !== String(user.id)) throw ApiError.forbidden('This booking belongs to another account');
    }

    const updated = await bookingRepository.updateStatus(trackingId, status, note || '');

    const notify = {
      Confirmed: emailService.sendBookingConfirmed,
      'Driver Assigned': emailService.sendDriverAssigned,
      Completed: emailService.sendBookingCompleted,
      Cancelled: () => emailService.sendBookingCancelled(updated, note),
    }[status];

    if (notify) {
      Promise.resolve(notify(updated)).catch(error => console.error('📧 Status email failed:', error.message));
    }

    return updated;
  },
};

export default bookingService;