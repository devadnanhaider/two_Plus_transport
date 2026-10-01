import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { userRepository } from './repositories/userRepository.js';

dotenv.config();

/** Creates a dispatcher account so the admin panel stays usable when Mongo is offline. */
const ensureFallbackAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@two-plus.qa';
  const password = process.env.ADMIN_PASSWORD || 'TwoPlus@2026';

  const existing = await userRepository.findByEmail(email);
  if (existing) return;

  await userRepository.create({
    name: process.env.ADMIN_NAME || 'Dispatch Admin',
    email,
    password,
    phone: process.env.COMPANY_PHONE || '+974 71030902',
    company: 'Two Plus Transport',
    role: 'admin',
  });

  console.log(`👤 Fallback admin ready → ${email} / ${password}`);
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(async dbConnected => {
  if (!dbConnected && process.env.NODE_ENV !== 'production') {
    await ensureFallbackAdmin();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   Database: ${dbConnected ? `MongoDB (${mongoose.connection.host})` : 'in-memory fallback'}`);
    console.log(
      process.env.SMTP_HOST
        ? `   Email: SMTP via ${process.env.SMTP_HOST}`
        : '   Email: disabled (set SMTP_HOST / SMTP_USER / SMTP_PASS in .env to enable)',
    );
  });
});

export default app;