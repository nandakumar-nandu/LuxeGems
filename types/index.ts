/**
 * 📁 types/index.ts
 * 📁 Core TypeScript type definitions and interfaces for the LuxeGems Store.
 * 📦 This module contains data structures representing jewelry products, categories, users, cart, and orders.
 */

/**
 * 📦 Represents a luxury jewelry product in the store database.
 */
export interface Product {
  /** The unique identifier of the product */
  id: string;
  /** The name of the jewelry piece (e.g., "Classic Solitaire Diamond Ring") */
  name: string;
  /** Detailed description of the piece, materials, and craftsmanship */
  description: string;
  /** Price of the item in cents (e.g., 299900 for $2,999.00) */
  price: number;
  /** Array of image URLs showcasing the item */
  images: string[];
  /** The category grouping for catalog navigation */
  category: string;
  /** Current stock level in the inventory */
  stock: number;
  /** Metal type (e.g., "18k Yellow Gold", "Platinum") */
  metal?: string;
  /** Gemstone details (e.g., "Diamond 1.5 Carat", "Blue Sapphire") */
  gemstone?: string;
  /** Size options if applicable (e.g., Ring sizes "6", "7", "8") */
  sizes?: string[];
  /** High-level rating summary */
  rating?: number;
  /** Date the product was added to the database */
  createdAt: string;
}

/**
 * 📦 Represents a category for catalog organization.
 */
export interface Category {
  /** Unique category identifier */
  id: string;
  /** Name of the category (e.g., "Rings", "Necklaces") */
  name: string;
  /** Slug used in routing URL (e.g., "rings") */
  slug: string;
  /** Optional cover image for the category card */
  image?: string;
}

/**
 * 📦 Represents a single line item in the shopping cart.
 */
export interface CartItem {
  /** The full product details */
  product: Product;
  /** Selected quantity of this item */
  quantity: number;
  /** Selected size, if applicable */
  selectedSize?: string;
}

/**
 * 📦 Represents a registered user.
 */
export interface User {
  /** The unique user ID */
  id: string;
  /** User's email address */
  email: string;
  /** User's full name */
  name?: string;
  /** Role for permissions ("user" | "admin") */
  role: "user" | "admin";
}

/**
 * 📦 Represents a customer order.
 */
export interface Order {
  /** Unique order identifier */
  id: string;
  /** Associated user ID or guest checkout marker */
  userId?: string;
  /** List of ordered items and quantities */
  items: CartItem[];
  /** Total price in cents including taxes and shipping */
  totalAmount: number;
  /** Status of the order lifecycle */
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  /** Shipping address details */
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  /** Stripe payment intent ID for verification */
  paymentIntentId?: string;
  /** Timestamp when order was placed */
  createdAt: string;
}
