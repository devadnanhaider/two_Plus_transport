import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import quoteRoutes from './routes/quoteRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Two Plus Transport & Towing Backend API Running 24/7' });
});

// Contact Route
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  res.status(201).json({ success: true, message: 'Message received by dispatch team.' });
});

// Auth Route
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: 'jwt_mock_token_demand_2026',
    user: { name: email.split('@')[0], email, role: 'client' }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  res.json({
    success: true,
    token: 'jwt_mock_token_demand_2026',
    user: { name, email, role: 'client' }
  });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
