import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required.");
}

const globalWithMongoose = globalThis;

if (!globalWithMongoose._mongoCache) {
  globalWithMongoose._mongoCache = { conn: null, promise: null };
}

async function connectDB() {
  if (globalWithMongoose._mongoCache.conn) {
    return globalWithMongoose._mongoCache.conn;
  }

  if (!globalWithMongoose._mongoCache.promise) {
    globalWithMongoose._mongoCache.promise = mongoose
      .connect(MONGODB_URI, {})
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      })
      .catch((err) => {
        globalWithMongoose._mongoCache.promise = null;
        throw err;
      });
  }

  try {
    const conn = await globalWithMongoose._mongoCache.promise;
    globalWithMongoose._mongoCache.conn = conn;
    console.log("[db] mongoose connected:", conn.host || "[unknown-host]");
    return conn;
  } catch (err) {
    console.error("[db] mongoose connection error:", err);
    throw err;
  }
}

export default connectDB;
