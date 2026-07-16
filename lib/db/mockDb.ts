/**
 * 📁 lib/db/mockDb.ts
 * 📁 Local JSON file fallback database utility.
 * ⚙️ Used when a local MongoDB instance is not running.
 * 🔗 Imports filesystem and path utilities.
 */

import fs from "fs";
import path from "path";

const MOCK_DB_PATH = path.resolve(process.cwd(), "lib/db/db.json");

export interface MockProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 🎯 ensureMockDb
 * 🎯 Verifies and ensures the JSON database file exists.
 */
export function ensureMockDb() {
  const dir = path.dirname(MOCK_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(MOCK_DB_PATH)) {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

/**
 * 🎯 readMockProducts
 * 🎯 Reads product records from the local file storage.
 *
 * @returns Array of MockProduct items
 */
export function readMockProducts(): MockProduct[] {
  ensureMockDb();
  try {
    const data = fs.readFileSync(MOCK_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Failed to read mock JSON database:", error);
    return [];
  }
}

/**
 * 🎯 writeMockProducts
 * 🎯 Writes product records back to the local file storage.
 *
 * @param products - Array of MockProduct items to persist
 */
export function writeMockProducts(products: MockProduct[]) {
  ensureMockDb();
  try {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Failed to write mock JSON database:", error);
  }
}

const MOCK_ORDERS_PATH = path.resolve(process.cwd(), "lib/db/orders.json");

export interface MockOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface MockOrder {
  _id?: string;
  trackingId: string;
  items: MockOrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  totalAmount: number;
  status: "Pending" | "Paid" | "Failed" | "Shipped" | "Delivered";
  stripeSessionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 🎯 ensureMockOrders
 * 🎯 Verifies and ensures the JSON orders database file exists.
 */
export function ensureMockOrders() {
  const dir = path.dirname(MOCK_ORDERS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(MOCK_ORDERS_PATH)) {
    fs.writeFileSync(MOCK_ORDERS_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

/**
 * 🎯 readMockOrders
 * 🎯 Reads customer orders from the local JSON file storage.
 *
 * @returns Array of MockOrder records
 */
export function readMockOrders(): MockOrder[] {
  ensureMockOrders();
  try {
    const data = fs.readFileSync(MOCK_ORDERS_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Failed to read mock orders JSON database:", error);
    return [];
  }
}

/**
 * 🎯 writeMockOrders
 * 🎯 Writes customer orders back to the local JSON file storage.
 *
 * @param orders - Array of MockOrder records to persist
 */
export function writeMockOrders(orders: MockOrder[]) {
  ensureMockOrders();
  try {
    fs.writeFileSync(MOCK_ORDERS_PATH, JSON.stringify(orders, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Failed to write mock orders JSON database:", error);
  }
}

