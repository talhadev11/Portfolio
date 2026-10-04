import mongoose from 'mongoose';
import { seedDatabase } from './seed.js';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

  // 1. Attempt connection to primary MONGODB_URI (local or Atlas)
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    await seedDatabase();
    return conn;
  } catch (primaryError) {
    console.warn(`⚠️ Primary MongoDB Connection failed (${primaryError.message}).`);
    console.warn(`🚀 Launching In-Memory MongoDB Server for instant zero-config functionality...`);

    // 2. Dynamic Fallback to MongoMemoryServer
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();

      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Server running at: ${memoryUri}`);
      await seedDatabase();
      return conn;
    } catch (fallbackError) {
      console.error(`❌ In-Memory MongoDB Fallback error: ${fallbackError.message}`);
      console.error(`💡 Ensure MongoDB is running locally or provide a valid MONGODB_URI in .env`);
    }
  }
};
