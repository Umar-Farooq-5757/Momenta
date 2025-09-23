import mongoose from "mongoose";

const connectDB = async () => {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");

  global._mongoClientPromise = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return global._mongoClientPromise;
};

export default connectDB;
