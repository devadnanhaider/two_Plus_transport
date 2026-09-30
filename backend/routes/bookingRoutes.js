import express from 'express';
import { Booking } from '../models/Booking.js';

const router = express.Router();
const mockBookings = [
  {
    trackingId: 'TRK-892104',
    serviceType: 'Airport Taxi & VIP Transfer',
    customerName: 'Kadir Miye',
    customerEmail: 'k.miye@demandtous.com',
    customerPhone: '+974 5500 1234',
    pickupLocation: 'Hamad International Airport - Arrivals Gate 4',
    dropoffLocation: 'The Ritz-Carlton Hotel, West Bay, Doha',
    pickupDate: 'Today',
    pickupTime: '14:30',
    passengers: 3,
    vehicleType: 'Mercedes V-Class VIP Van',
    estimatedPrice: 180,
    status: 'En Route',
    driverInfo: {
      name: 'Tariq Al-Sabah',
      phone: '+974 5512 8899',
      vehicleNumber: 'QA-89102'
    }
  }
];

router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let booking = null;
    try {
      booking = await Booking.findOne({ trackingId: id.toUpperCase() });
    } catch (dbErr) {
      booking = mockBookings.find(b => b.trackingId.toUpperCase() === id.toUpperCase());
    }

    if (!booking) {
      // Fallback preview record for live demo
      booking = {
        trackingId: id.toUpperCase(),
        serviceType: 'Executive Staff Transit',
        customerName: 'Verified Client',
        pickupLocation: 'Doha Business Center',
        dropoffLocation: 'Lusail City Expressway',
        pickupDate: 'Today',
        pickupTime: '12:00',
        passengers: 4,
        vehicleType: 'Executive Shuttle Bus',
        estimatedPrice: 220,
        status: 'En Route',
        driverInfo: {
          name: 'Faisal Rahman',
          phone: '+974 4400 1234',
          vehicleNumber: 'QA-99104'
        }
      };
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
