/**
 * 📁 lib/models/Order.ts
 * 📁 Mongoose Order Schema model.
 * 🎨 Defines database properties for customer orders and Stripe transaction references.
 * 🔗 Imports Mongoose schema declaration tools.
 */

import mongoose, { Schema } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IOrder {
  trackingId: string;
  items: IOrderItem[];
  customerInfo: ICustomerInfo;
  shippingAddress: IShippingAddress;
  totalAmount: number;
  status: "Pending" | "Paid" | "Failed" | "Shipped" | "Delivered";
  stripeSessionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    /**
     * JSDoc: Unique auto-generated customer tracking ID (format: LG-XXXX-XXXX).
     * Used as the client-facing code for tracking purchase status.
     */
    trackingId: { type: String, required: true, unique: true, index: true },

    /**
     * JSDoc: Collection of purchased catalog items, prices, names, and images.
     * Captures order snapshots to prevent dynamic catalog price updates from mutating historical transactions.
     */
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    /**
     * JSDoc: Client contact info metadata (Name, Email, Phone).
     * Used for order confirmations and courier updates.
     */
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    /**
     * JSDoc: Delivery location coordinates mapping residential shipping info.
     * Required to dispatch physically crafted jewelry.
     */
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },

    /**
     * JSDoc: Total monetary amount charged in integer cents.
     * Includes all items, shipping premiums, and estimated taxes.
     */
    totalAmount: { type: Number, required: true, min: 0 },

    /**
     * JSDoc: Active fulfillment status parameter of the order lifecycle.
     * Enums: Pending, Paid, Failed, Shipped, Delivered.
     */
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Failed", "Shipped", "Delivered"],
      default: "Pending",
    },

    /**
     * JSDoc: Unique reference ID linking the checkout intent to Stripe Session APIs.
     * Required to process event triggers on payment webhooks.
     */
    stripeSessionId: { type: String, index: true },
  },
  {
    timestamps: true,
  }
);

// ⚙️ Compile or retrieve model cleanly to avoid duplicate declaration conflicts in dev reloads
export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
