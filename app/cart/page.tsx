/**
 * 📁 app/cart/page.tsx
 * 📁 Full Shopping Cart page.
 * 🎨 Renders cart items in a structured table layout with adjustment controls and pricing sidebar.
 * 🔗 Imports React, context hooks, and atomic buttons.
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

/**
 * 🎯 CartPage
 * 
 * 🎯 Purpose:
 * Renders a full shopping cart page showing detailed catalog list and totals summary.
 * Gives options to adjust order volumes, discard items, or navigate to checkout.
 *
 * @returns The rendered Cart Page markup
 */
export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  // ⚙️ Constant placeholder for high-end complimentary shipping
  const shippingCharge = 0; // Complimentary standard shipping for luxury jewelry
  const estimatedTax = 0; // Tax calculated during final checkout steps
  const orderTotal = totalPrice + shippingCharge + estimatedTax;

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}
        <div className="mb-10 text-left border-b border-neutral-100 pb-6">
          <h1 className="font-serif text-3xl font-light tracking-wide text-neutral-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-xs font-light text-neutral-400">
            Review and adjust your selected masterpieces before finalizing your purchase order.
          </p>
        </div>

        {items.length === 0 ? (
          /* EMPTY CART VIEW SCREEN */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="rounded-full bg-neutral-50 p-8 text-neutral-300">
              <svg
                className="h-16 w-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-light text-neutral-800">Your cart is currently empty</h2>
              <p className="text-xs text-neutral-400 max-w-sm">
                Add exquisite items from our diamond and gold catalogs to begin your checkout journey.
              </p>
            </div>
            <Link href="/shop" className="pt-2">
              <Button variant="gold" size="md">
                Explore Collections
              </Button>
            </Link>
          </div>
        ) : (
          /* POPULATED CART WORKSPACE GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT AREA: TABLE VIEW OF PRODUCTS */}
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-neutral-900">
                <thead>
                  <tr className="border-b border-neutral-200 pb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">
                    <th className="py-4 pr-4">Product Details</th>
                    <th className="py-4 px-4 text-center">Quantity</th>
                    <th className="py-4 px-4 text-right">Price</th>
                    <th className="py-4 pl-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <tr key={item.id} className="align-middle">
                      {/* Product Thumbnail & Title details */}
                      <td className="py-6 pr-4 flex items-center gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50">
                          {/* ⚡ Fixed 80×80px dimensions eliminate CLS in table cell context */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-sm font-semibold text-neutral-800 leading-snug">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-neutral-400 hover:text-red-600 transition-colors flex items-center gap-1 focus:outline-none pt-1"
                            aria-label="Remove item"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </td>

                      {/* Quantity Incrementor controls */}
                      <td className="py-6 px-4">
                        <div className="flex items-center justify-center rounded-sm border border-neutral-200 w-24 mx-auto bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-neutral-800 select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-6 px-4 text-right font-sans text-sm text-neutral-600">
                        {formatPrice(item.price)}
                      </td>

                      {/* Total price for line item */}
                      <td className="py-6 pl-4 text-right font-sans text-sm font-semibold text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT AREA: ORDER SUMMARY SIDEBAR PANEL */}
            <div className="lg:col-span-4 rounded-sm border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                {/* Subtotal tally */}
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(totalPrice)}</span>
                </div>

                {/* Complimentary standard shipping placeholder */}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-amber-600 font-medium">Complimentary</span>
                </div>

                {/* Estimated tax placeholder */}
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Tax</span>
                  <span>Calculated in Next Step</span>
                </div>

                {/* Grand Order Total */}
                <div className="flex justify-between text-base font-medium text-neutral-900 border-t border-neutral-200 pt-4">
                  <span className="font-serif">Total</span>
                  <span className="font-bold">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/checkout">
                  <Button variant="gold" size="lg" className="w-full font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link href="/shop" className="text-center">
                  <Button variant="outline" size="lg" className="w-full border-neutral-300 text-neutral-600 hover:text-neutral-900 bg-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
