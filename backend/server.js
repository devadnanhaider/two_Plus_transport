import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { userRepository } from './repositories/userRepository.js';

dotenv.config();

/**
 * Idempotently makes sure the dispatch admin exists with the configured credentials.
 * Safe to run on every boot (Vercel serverless re-runs it on each cold start).
 */
const ensureAdminAccount = async () => {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin12';
  if (!email) return;

  const existing = await userRepository.findByEmail(email);

  if (existing) {
    // Leaves the stored admin untouched — only fixes role/password when they actually drift.
    let changed = false;

    if (existing.role !== 'admin') {
      await userRepository.updateById(existing.id, { role: 'admin' });
      changed = true;
      console.log(`🛡️  Promoted ${email} to admin`);
    }

    if (!(await existing.comparePassword(password))) {
      await userRepository.updatePassword(existing.id, password);
      changed = true;
      console.log(`🔑 Updated admin password for ${email}`);
    }

    if (changed) console.log(`👤 Admin account verified → ${email}`);
    return;
  }

  await userRepository.create({
    name: process.env.ADMIN_NAME || 'Dispatch Admin',
    email,
    password,
    phone: process.env.COMPANY_PHONE || '+974 71030902',
    company: 'Two Plus Transport',
    role: 'admin',
  });

  console.log(`👤 Admin account ready → ${email}`);
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
  try {
    await ensureAdminAccount();
  } catch (error) {
    console.error('⚠️  Could not prepare admin account:', error.message);
  }

  if (!dbConnected && process.env.NODE_ENV !== 'production' && !process.env.ADMIN_EMAIL) {
    console.warn('⚠️  Running without a database — data will reset on restart');
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