import mongoose from 'mongoose';

/** True only when Mongoose holds a live connection to MongoDB. */
export const isDbReady = () => mongoose.connection.readyState === 1;

export const connectDB = async () => {
  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected — using in-memory store until it reconnects'));
  mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected'));

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB unavailable (${error.message}). Using in-memory store so the API stays responsive.`);
    return false;
  }
};

export default connectDB;
