/* eslint-disable no-var */
/**
 * 📁 lib/db/mongoose.ts
 * 📁 MongoDB Connection Manager with caching and local JSON fallback support.
 * ⚙️ Establishes connection pools or switches to a mock database if MongoDB is offline.
 * 🔗 Imports Mongoose library and node filesystem dependencies.
 */

import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// ⚙️ Load Environment Variables manually from `.env` file if process.env.MONGODB_URI is not set
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach((line) => {
        const parts = line.split("=");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
          process.env[key] = value;
        }
      });
    }
  } catch (err) {
    console.error("⚠️ Failed to load environment variables from .env file inside mongoose.ts:", err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// 📦 Extend Node.js global interface to allow attaching a cached mongoose object and fallback states
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
    isMockDb: boolean;
  } | undefined;
}

/**
 * ⚙️ Connection Caching Logic:
 * Attached to Node's global object `global.mongoose` to remain active across Next.js dev server hot-reloads.
 */
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null, isMockDb: false };
}

const cached = global.mongoose!;

/**
 * 🎯 connectToDatabase
 * 🎯 Establishes connection to MongoDB or returns active cached instance.
 * Automatically falls back to file-based mocking if local MongoDB server is down.
 *
 * @returns Connected Mongoose instance
 */
export async function connectToDatabase(): Promise<mongoose.Mongoose> {
  // 1. If connection exists, return it instantly
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If mock database is currently active, return Mongoose mock instance
  if (cached.isMockDb) {
    return mongoose;
  }

  // 3. If no promise is active, establish a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Timeout quickly (2s) if MongoDB server is offline
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log("🔌 Connected to MongoDB successfully.");
      cached.isMockDb = false;
      return mongooseInstance;
    });
  }

  // 4. Await the connection promise and cache it
  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    cached.isMockDb = true;
    console.warn("⚠️ MongoDB server is not running on port 27017. Falling back to local file-based database.");
    return mongoose;
  }

  return cached.conn;
}

/**
 * 🎯 isUsingMockDb
 * 🎯 Helper to inspect if database calls are falling back to JSON storage.
 *
 * @returns Boolean representing mock fallback state
 */
export function isUsingMockDb(): boolean {
  return cached?.isMockDb || false;
}
