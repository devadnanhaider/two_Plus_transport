import mongoose from 'mongoose';

/** True only when Mongoose holds a live connection to MongoDB. */
export const isDbReady = () => mongoose.connection.readyState === 1;

let connectionPromise = null;

/**
 * Awaits the initial connection attempt so a request can never race a cold start.
 * On serverless the module is imported per cold start, so without this an early
 * request sees readyState !== 1 and silently falls back to the empty in-memory
 * store, which surfaces as a bogus 401 on login.
 */
export const waitForDb = async (timeoutMs = 8000) => {
  if (isDbReady()) return true;
  if (!connectionPromise) return isDbReady();
  let timer;
  const timeout = new Promise(resolve => {
    timer = setTimeout(() => resolve(isDbReady()), timeoutMs);
  });
  try {
    return await Promise.race([connectionPromise.then(() => isDbReady()), timeout]);
  } finally {
    clearTimeout(timer);
  }
};

export const connectDB = async () => {
  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected — using in-memory store until it reconnects'));
  mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected'));

  connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    const conn = await connectionPromise;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB unavailable (${error.message}). Using in-memory store so the API stays responsive.`);
    return false;
  }
};

export default connectDB;
