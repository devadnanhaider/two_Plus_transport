import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRepository } from './repositories/userRepository.js';
import { bookingRepository } from './repositories/bookingRepository.js';
import { quoteRepository } from './repositories/quoteRepository.js';
import { generateTrackingId } from './utils/ids.js';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@two-plus.qa';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TwoPlus@2026';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Dispatch Admin';

const SERVICES = [
  'Staff Transportation',
  'School Transportation',
  'Airport Transportation',
  'Valet Parking',
  'Tour Packages',
  'Towing & Breakdown',
];

const ROUTES = [
  ['Hamad International Airport', 'The Ritz-Carlton, West Bay'],
  ['Doha Business Center', 'Lusail City'],
  ['Al Rayyan School', 'Al Wakrah Residence'],
  ['Msheireb Downtown', 'Katara Cultural Village'],
  ['Al Wakrah Camp', 'Doha Industrial Area'],
  ['Aspire Zone', 'Katara Towers'],
];

const STATUSES = ['Pending', 'Confirmed', 'Driver Assigned', 'En Route', 'Completed', 'Completed'];

const daysAgo = days => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

const seed = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error('❌ Seeding requires a live MongoDB connection.');
    process.exit(1);
  }

  try {
    const existing = await userRepository.findByEmail(ADMIN_EMAIL);
    if (!existing) {
      await userRepository.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        phone: '+974 71030902',
        company: 'Two Plus Transport',
        role: 'admin',
      });
      console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
    } else {
      console.log(`ℹ️  Admin already exists: ${ADMIN_EMAIL}`);
    }

    const client = await userRepository.create({
      name: 'Demo Client',
      email: 'client@two-plus.qa',
      password: 'Client@2026',
      phone: '+974 5555 1234',
      company: 'Aspire Holdings',
    }).catch(() => null);

    for (let i = 0; i < 12; i += 1) {
      const [pickup, dropoff] = ROUTES[i % ROUTES.length];
      await bookingRepository.create({
        trackingId: generateTrackingId('TPT'),
        user: client ? client.public.id : null,
        serviceType: SERVICES[i % SERVICES.length],
        customerName: ['Fatima Al-Sada', 'Ahmed Kurdi', 'Sara Nasser', 'Vikram Rao', 'Noor Haddad'][i % 5],
        customerEmail: `client${i + 1}@example.com`,
        customerPhone: `+974 55${100000 + i}`,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        pickupDate: daysAgo(i).slice(0, 10),
        pickupTime: '09:30',
        passengers: 2 + (i % 6),
        vehicleType: 'Mercedes V-Class VIP Van',
        estimatedPrice: 180 + i * 25,
        status: STATUSES[i % STATUSES.length],
        statusHistory: [{ status: STATUSES[i % STATUSES.length], at: daysAgo(i), note: 'Seeded record' }],
        createdAt: daysAgo(i),
      });
    }

    for (let i = 0; i < 6; i += 1) {
      const [pickup, dropoff] = ROUTES[i % ROUTES.length];
      await quoteRepository.create({
        trackingId: generateTrackingId('QTE'),
        user: client ? client.public.id : null,
        serviceType: SERVICES[i % SERVICES.length],
        customerName: ['Omar Al-Nuaimi', 'Layla Ibrahim', 'James Whitfield'][i % 3],
        customerEmail: `quote${i + 1}@example.com`,
        customerPhone: `+974 33${100000 + i}`,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        pickupDate: daysAgo(i).slice(0, 10),
        passengers: 2 + (i % 4),
        vehicleType: 'Luxury Executive Coach (50-Seater)',
        specialNotes: 'Awaiting confirmation from dispatch.',
        status: i < 3 ? 'Pending Quote' : 'Quoted',
        estimatedPrice: i < 3 ? 0 : 320 + i * 40,
        createdAt: daysAgo(i),
      });
    }

    console.log('✅ Seeded 12 bookings and 6 quotes');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
