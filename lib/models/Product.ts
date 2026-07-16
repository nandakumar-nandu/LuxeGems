/**
 * 📁 lib/models/Product.ts
 * 📁 Mongoose Product Schema model.
 * 🎨 Defines structural database properties for custom jewelry items.
 * 🔗 Imports Mongoose schema declaration tools.
 */

import mongoose, { Schema } from "mongoose";

/**
 * 📦 IProduct
 * 📦 Plain TypeScript type definition for Product schema.
 * We do not extend mongoose.Document to avoid type clashes with the reserved key 'isNew'.
 */
export interface IProduct {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    /** 
     * JSDoc: The display name of the fine jewelry item (e.g. "Aurelia Solitaire Ring").
     * Required to index and present products in collections.
     */
    name: { type: String, required: true, trim: true },

    /** 
     * JSDoc: Price of the product in cents (e.g. 245000 for $2,450.00).
     * Stored as integer cents to avoid JavaScript float precision rounding errors during calculations.
     */
    price: { type: Number, required: true, min: 0 },

    /** 
     * JSDoc: Catalog category of the product (e.g., "Rings", "Necklaces", "Earrings").
     * Used for grouping, filtering, and catalog navigation.
     */
    category: { type: String, required: true, trim: true },

    /** 
     * JSDoc: Image URL representing the main preview cover of the product.
     * Serves as the primary visual display asset for the item.
     */
    image: { type: String, required: true },

    /** 
     * JSDoc: Detailed text explaining materials, craftsmanship, gemstones, and design stories.
     * Required to provide buyers with rich information.
     */
    description: { type: String, required: true },

    /** 
     * JSDoc: Active stock inventory levels.
     * Used to prevent selling items that are sold out.
     */
    stock: { type: Number, required: true, default: 0, min: 0 },

    /** 
     * JSDoc: Boolean status flag indicating if the product is a new arrival.
     * Triggers the "New" badge display overlays. Note: isNew is a reserved key in Mongoose,
     * so we suppress its warning.
     */
    isNew: { type: Boolean, required: true, default: false },

    /** 
     * JSDoc: Boolean status flag indicating if the product should be featured on the homepage.
     * Used to display signature products in premium highlights sections.
     */
    isFeatured: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true, // Suppress Mongoose's internal warning for clashing isNew
  }
);

// ⚙️ Compile or retrieve compiling model cleanly to avoid duplicate declarations in Next.js hot-reload
export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
