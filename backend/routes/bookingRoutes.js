import express from 'express';
import { createBooking, listMyBookings, getBooking, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { bookingRules, bookingStatusRules } from '../validators/index.js';

const router = express.Router();

// Public tracking by reference (account bookings stay restricted to their owner)
router.get('/track/:trackingId', optionalAuth, getBooking);

router.post('/', optionalAuth, validate(bookingRules), createBooking);
router.get('/', protect, listMyBookings);
router.patch('/:trackingId/status', protect, validate(bookingStatusRules), updateBookingStatus);

export default router;