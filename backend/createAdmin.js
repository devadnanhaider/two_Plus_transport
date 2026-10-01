import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRepository } from './repositories/userRepository.js';

dotenv.config();

const ADMIN_NAME = process.env.ADMIN_NAME || 'Dispatch Admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12';

const createAdmin = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('❌ Creating an admin requires a live MongoDB connection.');
    process.exit(1);
  }

  try {
    const existing = await userRepository.findByEmail(ADMIN_EMAIL);

    if (existing) {
      await userRepository.updatePassword(existing.id, ADMIN_PASSWORD);
      await userRepository.updateById(existing.id, { name: ADMIN_NAME, company: 'Two Plus Transport' });
      console.log(`✅ Updated existing admin: ${ADMIN_EMAIL}`);
    } else {
      await userRepository.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        phone: '+974 71030902',
        company: 'Two Plus Transport',
        role: 'admin',
      });
      console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
    }

    console.log(`   Password: ${ADMIN_PASSWORD}`);
  } catch (error) {
    console.error('❌ Could not create admin:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();