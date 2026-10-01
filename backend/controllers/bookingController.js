import { asyncHandler } from '../middleware/asyncHandler.js';
import { bookingService } from '../services/bookingService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.create(req.user, req.body);

  res.status(201).json({
    success: true,
    message: 'Booking created. Our team will confirm shortly.',
    trackingId: booking.trackingId,
    booking,
  });
});

export const listMyBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const all = req.query.all === 'true' && req.user.role === 'admin';
  const bookings = await bookingService.list(req.user, { status, all });

  res.json({ success: true, count: bookings.length, bookings });
});

export const getBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.track(req.params.trackingId, req.user);
  res.json({ success: true, booking });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await bookingService.updateStatus(req.user, req.params.trackingId, req.body);
  res.json({ success: true, message: 'Booking status updated', booking });
});

export default { createBooking, listMyBookings, getBooking, updateBookingStatus };