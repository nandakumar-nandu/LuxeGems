/**
 * 📁 lib/db/seed.ts
 * 📁 Database Seeder Script with JSON file fallback support.
 * ⚙️ Connects to MongoDB, wipes existing product tables, and inserts 8 high-end jewelry items.
 * ⚙️ If MongoDB is offline, seeds products to a local JSON file-based database (`lib/db/db.json`).
 * 🔗 Imports filesystem utilities, mongoose connector, Product schema model, and JSON mockDb helpers.
 */

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { connectToDatabase, isUsingMockDb } from "./mongoose";
import { Product } from "../models/Product";
import { writeMockProducts } from "./mockDb";

// ⚙️ Load Environment Variables manually from `.env` file for standalone execution (e.g. npx tsx)
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
      console.log("📝 Loaded MONGODB_URI environment variable from .env file successfully.");
    }
  } catch (err) {
    console.error("⚠️ Failed to load environment variables from .env file:", err);
  }
}

// 📦 Sample high-end catalog products to populate the database
const SAMPLE_PRODUCTS = [
  {
    name: "Aurelia Solitaire Diamond Ring",
    price: 245000,
    category: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    description: "An elegant solitaire ring featuring a 1.5 carat conflict-free diamond set in a flawless 18k yellow gold and platinum band.",
    stock: 12,
    isNew: true,
    isFeatured: true,
  },
  {
    name: "Seraphina Pearl Droplet Necklace",
    price: 480000,
    category: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    description: "A breathtaking drop necklace showcasing a rare South Sea white pearl suspended from a diamond-accented platinum chain.",
    stock: 5,
    isNew: true,
    isFeatured: true,
  },
  {
    name: "Celeste Diamond Stud Earrings",
    price: 185000,
    category: "Earrings",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
    description: "Classic brilliant-cut diamond stud earrings totaling 1.0 carat, mounted on secure 18k white gold settings.",
    stock: 20,
    isNew: false,
    isFeatured: false,
  },
  {
    name: "Elysian Emerald Band",
    price: 320000,
    category: "Rings",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    description: "A luxurious eternity ring set with alternating step-cut emeralds and round diamonds in solid 18k yellow gold.",
    stock: 8,
    isNew: false,
    isFeatured: true,
  },
  {
    name: "Helena Gold Pendant Necklace",
    price: 125000,
    category: "Necklaces",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a3055641?q=80&w=600&auto=format&fit=crop",
    description: "A clean minimalist pendant featuring a polished solid 18k yellow gold coin medallion suspended on an adjustable chain.",
    stock: 15,
    isNew: false,
    isFeatured: false,
  },
  {
    name: "Athena Diamond Drop Earrings",
    price: 210000,
    category: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    description: "Elegant drop earrings featuring interlocking diamond halos dangling from brilliant 18k white gold links.",
    stock: 7,
    isNew: true,
    isFeatured: false,
  },
  {
    name: "Aura Rose Gold Ring",
    price: 155000,
    category: "Rings",
    image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=600&auto=format&fit=crop",
    description: "A warm and inviting 18k rose gold band featuring intricate hand-carved floral scrolls and channel-set diamond micro-pavé.",
    stock: 10,
    isNew: true,
    isFeatured: false,
  },
  {
    name: "Classic Diamond Choker",
    price: 850000,
    category: "Necklaces",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    description: "An statement collar necklace paved with 5.5 carats of round brilliant-cut diamonds linked in solid 18k white gold.",
    stock: 3,
    isNew: false,
    isFeatured: true,
  },
];

/**
 * 🎯 seedDatabase
 * 🎯 Main execution handler to drop current records and insert mock products.
 */
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding process...");

    // 1. Establish connection (handles internal error to trigger cached fallback)
    try {
      await connectToDatabase();
    } catch {
      console.log("⚠️ Connection check bypassed to initialize fallback checks.");
    }

    // 2. Perform seed insertion depending on DB status
    if (isUsingMockDb()) {
      console.log("📝 MongoDB offline. Seeding products into local JSON file store...");
      
      const seeded = SAMPLE_PRODUCTS.map((product, index) => ({
        _id: `mock-prod-${index + 1}`,
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      writeMockProducts(seeded);
      console.log(`✨ Successfully seeded ${seeded.length} items to local JSON database.`);
    } else {
      console.log("🔌 MongoDB online. Wiping collection and inserting seeds...");
      
      // Wipe current products
      const deleteResult = await Product.deleteMany({});
      console.log(`🗑️ Successfully deleted ${deleteResult.deletedCount} old products.`);

      // Insert mock products
      const insertedProducts = await Product.insertMany(SAMPLE_PRODUCTS);
      console.log(`✨ Successfully seeded ${insertedProducts.length} premium jewelry items.`);
    }

    console.log("🎉 Database seeding complete!");
  } catch (error) {
    console.error("❌ Seeding database failed:", error);
  } finally {
    // 3. Close connection if it was opened
    if (!isUsingMockDb()) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed.");
    }
    process.exit(0);
  }
}

// Execute the seeder function
seedDatabase();
