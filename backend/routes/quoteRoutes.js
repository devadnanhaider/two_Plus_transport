import express from 'express';
import { createQuote, listQuotes, getQuote, respondToQuote, convertQuote } from '../controllers/quoteController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { quoteRules, quoteStatusRules } from '../validators/index.js';

const router = express.Router();

// Public website users may request a quote without an account.
router.post('/', optionalAuth, validate(quoteRules), createQuote);
router.get('/:trackingId/track', optionalAuth, getQuote);

router.post('/', protect, validate(quoteRules), createQuote);
router.get('/', protect, listQuotes);
router.get('/:trackingId', protect, getQuote);
router.patch('/:trackingId', protect, validate(quoteStatusRules), respondToQuote);
router.post('/:trackingId/convert', protect, authorize('admin'), convertQuote);

export default router;