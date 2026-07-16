/**
 * 📁 components/ui/CartDrawer.tsx
 * 📁 Shopping Cart Drawer slide-over UI component.
 * 🎨 Renders a slide-in drawer showing items, quantity selectors, subtotals, and a checkout button.
 * 🔗 Imports React, Framer Motion, Next.js Link, button/context hooks.
 */

"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

/**
 * 🎯 CartDrawer
 * 
 * 🎯 Purpose:
 * Renders the shopping cart slide-over panel. Listens to the CartContext state to show
 * products, control quantity increments/decrements, discard items, and display pricing totals.
 *
 * @returns The rendered CartDrawer component markup
 */
export function CartDrawer() {
  const {
    items,
    totalPrice,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // ⚙️ Close drawer on pressing the ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling when cart drawer is active
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 🎨 BACKDROP SCREEN OVERLAY */}
          <motion.div
            /**
             * 🎨 Overlay Animation:
             * Visual action: Fades the backdrop blur overlay on/off screen.
             * Duration: 0.25 seconds matches the slide-out duration.
             */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          {/* 🎨 SLIDE-OVER DRAWER MAIN PANEL */}
          <motion.div
            ref={drawerRef}
            /**
             * 🎨 Drawer Slide-in animation:
             * Visual action: Panel slides horizontally from 100% (off screen right) to 0 (aligned right).
             * Easing: Custom cubic-bezier (0.16, 1, 0.3, 1) provides a smooth ease-out slide that feels elegant.
             * Duration: 0.35 seconds is swift but clear.
             */
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-neutral-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
              <h2 id="cart-title" className="font-serif text-xl font-medium text-neutral-900">
                Your Cart
              </h2>
              
              {/* Close trigger button */}
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-neutral-400 hover:text-neutral-900 transition-colors focus:outline-none"
                aria-label="Close cart"
              >
                {/* Close checkmark cross/icon SVG */}
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* SCROLLABLE ITEMS CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  {/* Shopping bag outline SVG */}
                  <svg
                    className="h-16 w-16 text-neutral-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                    />
                  </svg>
                  <p className="font-serif text-lg text-neutral-500">Your bag is empty</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-200"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 border-b border-neutral-50 pb-5"
                    >
                      {/* Product Thumbnail image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80} // ⚡ Define explicit width mapping to parent bounds (80px / h-20) to skip layout recalculation.
                          height={80} // ⚡ Define explicit height to protect visual alignment structures from layout shift.
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Detail controls */}
                      <div className="flex flex-1 flex-col space-y-1.5">
                        <div className="flex justify-between text-sm font-medium text-neutral-900">
                          <h3 className="font-serif">{item.name}</h3>
                          <span className="font-sans font-bold">{formatPrice(item.price)}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          {/* Quantity selector control block */}
                          <div className="flex items-center border border-neutral-300 rounded-sm bg-neutral-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-0.5 text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-neutral-800 bg-white border-x border-neutral-200 font-mono font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-0.5 text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Discard item trash button */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center text-red-500 hover:text-red-700 transition-colors font-medium"
                          >
                            <svg
                              className="mr-1 h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DRAWER FOOTER (PRICING & LINKED CHECKOUT ACTION) */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-6 space-y-4">
                <div className="flex justify-between text-base font-medium text-neutral-900">
                  <span className="font-serif">Subtotal</span>
                  <span className="font-sans font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 font-light leading-normal font-sans">
                  Shipping, taxes, and custom adjustments are computed at checkout.
                </p>
                <div className="pt-2">
                  <Link href="/checkout" onClick={() => setCartOpen(false)}>
                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full flex items-center justify-center shadow-md font-semibold text-neutral-950 uppercase"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
