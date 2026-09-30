import express from 'express';
import { Quote } from '../models/Quote.js';

const router = express.Router();
const mockQuotes = [];

router.post('/', async (req, res) => {
  try {
    const trackingId = 'TRK-' + Math.floor(100000 + Math.random() * 900000);
    const quoteData = { ...req.body, trackingId };

    try {
      const newQuote = new Quote(quoteData);
      await newQuote.save();
    } catch (dbErr) {
      mockQuotes.push(quoteData);
    }

    res.status(201).json({
      success: true,
      message: 'Quote created successfully',
      trackingId,
      quote: quoteData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    let quotes = [];
    try {
      quotes = await Quote.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      quotes = mockQuotes;
    }
    res.json({ success: true, count: quotes.length, quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
