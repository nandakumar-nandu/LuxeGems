/**
 * 📁 components/ui/ProductCard.tsx
 * 📁 ProductCard component for presenting an individual jewelry product.
 * 🎨 Features high-end aspect ratios, hover effects, category tags, and action buttons.
 * 🔗 Imports React utilities, Badge/Button components, and price/classname helper tools.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context/CartContext";

/**
 * 🎯 ProductCard
 * 
 * 🎯 Purpose:
 * Renders a preview card for an individual jewelry item in the shop gallery.
 * Showcases the image, name, category, formatted price, and contains an interactive
 * "Add to Cart" button that updates the global CartContext state.
 *
 * 📦 Props:
 * - `id`: Unique product identifier
 * - `name`: Display name of the jewelry piece
 * - `price`: Price of the item in cents (e.g. 245000 for $2,450.00)
 * - `image`: Public or local image path URL
 * - `category`: Group classification (e.g., "Rings", "Earrings")
 * - `isNew`: Optional flag to render a prominent "New" badge on the product image
 *
 * 🎨 Usage Example:
 * ```tsx
 * <ProductCard
 *   id="prod-1"
 *   name="Aurelia Solitaire Ring"
 *   price={245000}
 *   image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
 *   category="Rings"
 *   isNew={true}
 * />
 * ```
 */
export interface ProductCardProps {
  /** The unique identifier of the product */
  id: string;
  /** The name of the jewelry piece (e.g., "Aurelia Solitaire Ring") */
  name: string;
  /** Price of the item in cents (e.g. 245000 for $2,450.00) */
  price: number;
  /** The primary image URL showcasing the item */
  image: string;
  /** The category grouping for catalog navigation (e.g., "Rings") */
  category: string;
  /** Optional flag indicating if the product is a new arrival */
  isNew?: boolean;
}

import { motion } from "framer-motion";

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
}: ProductCardProps) {
  // ⚙️ Pull addToCart and setCartOpen dispatch functions from context
  const { addToCart, setCartOpen } = useCart();

  return (
    <motion.div
      id={`product-${id}`}
      /**
       * 🎨 Hover Animation Settings:
       * - Scale: 1.015 (very subtle scaling to preserve layout balance).
       * - Y-offset: Shifts the card 4px upward to simulate a tactile depth/shadow lift.
       * - Transition: 0.3s duration using easeOut curve is tuned for a smooth, high-end response on mouse over.
       */
      whileHover={{
        scale: 1.015,
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-neutral-100 bg-white transition-colors duration-300"
    >
      {/* PRODUCT IMAGE CONTAINER */}
      <Link href={`/products/${id}`} className="block relative aspect-square w-full overflow-hidden bg-neutral-50">
        <Image
          src={image}
          alt={name}
          fill // ⚡ Use layout fill to occupy dynamic grid square aspect ratios fluidly.
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // ⚡ Serve downscaled image formats relative to client screen sizes.
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* OVERLAY BADGES */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isNew && (
            <Badge variant="gold" className="shadow-sm">
              New
            </Badge>
          )}
        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          {/* Category Badge/Label */}
          <div className="mb-2">
            <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
              {category}
            </Badge>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-semibold text-neutral-900 leading-snug group-hover:text-amber-600 transition-colors duration-300">
            <Link href={`/products/${id}`}>
              {name}
            </Link>
          </h3>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 flex flex-col gap-3">
          <p className="font-sans text-sm font-semibold text-neutral-900">
            {formatPrice(price)}
          </p>

          {/* ⚙️ Add to Cart button onClick triggers cart addition and opens the slide drawer */}
          <Button
            variant="outline"
            size="sm"
            className="w-full border-neutral-200 hover:border-amber-600 hover:text-amber-600 hover:bg-amber-50/10"
            onClick={() => {
              addToCart({ id, name, price, image });
              setCartOpen(true);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
