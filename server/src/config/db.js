import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI not detected in environment. Using in-memory fallback store for development.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Error:', error.message);
    console.warn('⚠️  Continuing with in-memory dataset fallback so the app remains fully functional.');
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState,
  status: isConnected ? 'Connected to MongoDB Atlas' : 'In-Memory Fallback Active',
});
