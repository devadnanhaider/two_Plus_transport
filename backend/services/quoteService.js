import { quoteRepository } from '../repositories/quoteRepository.js';
import { bookingRepository } from '../repositories/bookingRepository.js';
import { generateTrackingId } from '../utils/ids.js';
import ApiError from '../utils/ApiError.js';

const withUser = (user, payload) => ({
  ...payload,
  user: user ? user.id : null,
  customerName: payload.customerName || user?.name || 'Website enquiry',
  customerEmail: payload.customerEmail || user?.email || 'not-provided@twoplus.qa',
  customerPhone: payload.customerPhone || user?.phone || 'Not provided',
});

export const quoteService = {
  async create(user, payload) {
    const data = withUser(user, {
      ...payload,
      trackingId: generateTrackingId('QTE'),
      status: 'Pending Quote',
    });
    return quoteRepository.create(data);
  },

  async list(user, { status, all = false }) {
    return quoteRepository.findAll({
      userId: all ? null : user.id,
      status: status || null,
    });
  },

  async get(trackingId, user) {
    const quote = await quoteRepository.findByTrackingId(trackingId);
    if (!quote) throw ApiError.notFound('No quote found for that reference');
    // Public lookup: the QTE reference itself is the credential.
    return quote;
  },

  async respond(user, trackingId, { status, estimatedPrice, adminNotes }) {
    if (!quoteRepository.statuses.includes(status)) {
      throw ApiError.badRequest(`status must be one of: ${quoteRepository.statuses.join(', ')}`);
    }
    if (!['admin'].includes(user.role)) {
      throw ApiError.forbidden('Only dispatch can price a quote');
    }

    const existing = await quoteRepository.findByTrackingId(trackingId);
    if (!existing) throw ApiError.notFound('Quote not found');

    return quoteRepository.updateByTrackingId(trackingId, {
      status,
      estimatedPrice: estimatedPrice ?? existing.estimatedPrice,
      adminNotes: adminNotes ?? existing.adminNotes,
      respondedAt: new Date(),
    });
  },

  /** Turns an accepted quote into a confirmed booking so dispatch never retypes it. */
  async convertToBooking(user, trackingId) {
    if (user?.role !== 'admin') throw ApiError.forbidden('Only dispatch can convert a quote');

    const quote = await quoteRepository.findByTrackingId(trackingId);
    if (!quote) throw ApiError.notFound('Quote not found');
    if (quote.convertedBooking) {
      throw ApiError.badRequest(`This quote was already converted to booking ${quote.convertedBooking}`);
    }

    const booking = await bookingRepository.create({
      trackingId: generateTrackingId('TPT'),
      user: quote.user || null,
      serviceType: quote.serviceType,
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      pickupLocation: quote.pickupLocation,
      dropoffLocation: quote.dropoffLocation || 'To be confirmed',
      pickupDate: quote.pickupDate || new Date().toISOString().slice(0, 10),
      pickupTime: quote.pickupTime || '09:00',
      passengers: quote.passengers,
      vehicleType: quote.vehicleType,
      specialNotes: [quote.specialNotes, `Converted from quote ${quote.trackingId}`].filter(Boolean).join(' | '),
      estimatedPrice: quote.estimatedPrice || 0,
      status: 'Confirmed',
      statusHistory: [
        { status: 'Pending', note: 'Booking received from website', at: new Date() },
        { status: 'Confirmed', note: `Converted from accepted quote ${quote.trackingId}`, at: new Date() },
      ],
    });

    await quoteRepository.updateByTrackingId(trackingId, {
      status: 'Accepted',
      convertedBooking: booking.trackingId,
      respondedAt: quote.respondedAt || new Date(),
    });

    return booking;
  },
};

export default quoteService;