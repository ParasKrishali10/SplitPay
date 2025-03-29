import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedConnection: mongoose.Mongoose | null = null;
let cachedPromise: Promise<mongoose.Mongoose> | null = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => {
      cachedConnection = mongoose;
      return cachedConnection;
    });
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}

export default connectToDatabase;