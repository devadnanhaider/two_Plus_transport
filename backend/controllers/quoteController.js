import { asyncHandler } from '../middleware/asyncHandler.js';
import { quoteService } from '../services/quoteService.js';

export const createQuote = asyncHandler(async (req, res) => {
  const quote = await quoteService.create(req.user, req.body);

  res.status(201).json({
    success: true,
    message: 'Quote request received. Expect a reply within 1 hour.',
    trackingId: quote.trackingId,
    quote,
  });
});

export const listQuotes = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const all = req.query.all === 'true' && req.user.role === 'admin';
  const quotes = await quoteService.list(req.user, { status, all });

  res.json({ success: true, count: quotes.length, quotes });
});

export const getQuote = asyncHandler(async (req, res) => {
  const quote = await quoteService.get(req.params.trackingId, req.user);
  res.json({ success: true, quote });
});

export const respondToQuote = asyncHandler(async (req, res) => {
  const quote = await quoteService.respond(req.user, req.params.trackingId, req.body);
  res.json({ success: true, message: 'Quote updated', quote });
});

export const convertQuote = asyncHandler(async (req, res) => {
  const booking = await quoteService.convertToBooking(req.user, req.params.trackingId);

  res.status(201).json({
    success: true,
    message: `Quote converted to booking ${booking.trackingId}`,
    booking,
  });
});

export default { createQuote, listQuotes, getQuote, respondToQuote, convertQuote };