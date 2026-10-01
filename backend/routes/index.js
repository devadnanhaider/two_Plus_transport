import express from 'express';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import quoteRoutes from './quoteRoutes.js';
import userRoutes from './userRoutes.js';
import vehicleRoutes from './vehicleRoutes.js';
import blogRoutes from './blogRoutes.js';
import settingRoutes from './settingRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Two Plus Transport API running 24/7', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/quotes', quoteRoutes);
router.use('/users', userRoutes);
router.use('/fleet', vehicleRoutes);
router.use('/blogs', blogRoutes);
router.use('/settings', settingRoutes);
router.use('/contact', contactRoutes);

export default router;