/**
 * 📁 components/ui/CartDrawer.tsx
 * 📁 Shopping Cart Drawer slide-over UI component.
 * 🎨 Renders a slide-in drawer showing items, quantity selectors, subtotals, and a checkout button.
 * 🔗 Imports React, standard lucide-react icons (optional, or we use SVG paths for safety), button/context hooks.
 */

"use client";

import React, { useRef, useEffect } from "react";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

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
    <>
      {/* 🎨 BACKDROP SCREEN OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* 🎨 SLIDE-OVER DRAWER MAIN PANEL */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out transform border-l border-neutral-100",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
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
            {/* Elegant cross/close SVG */}
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

        {/* DRAWER BODY (SCROLLABLE PRODUCT LIST) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            /* EMPTY STATE VISUAL VIEW */
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              {/* Elegant shopping bag SVG outline */}
              <div className="rounded-full bg-neutral-50 p-6 text-neutral-300">
                <svg
                  className="h-12 w-12"
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
              <p className="font-serif text-lg font-light text-neutral-800">Your cart is empty</p>
              <p className="text-xs text-neutral-400 max-w-[200px]">
                Add some exquisite custom jewelry pieces from our collections to start shopping.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-neutral-300 hover:border-amber-600 hover:text-amber-600"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            /* POPULATED CART ITEMS LOOP */
            <div className="space-y-6 divide-y divide-neutral-100">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex py-6 items-start gap-4",
                    index === 0 && "pt-2"
                  )}
                >
                  {/* Thumbnail Image display */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Product Metadata Info */}
                  <div className="flex flex-1 flex-col space-y-1.5">
                    <div className="flex justify-between text-sm font-medium text-neutral-900">
                      <h3 className="font-serif text-neutral-800 line-clamp-2 pr-2 leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-sans font-semibold text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Toggles */}
                      <div className="flex items-center rounded-sm border border-neutral-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs text-neutral-800 select-none font-sans font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Trash Delete Action button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-neutral-400 hover:text-red-600 transition-colors flex items-center gap-1 focus:outline-none"
                        aria-label="Remove item"
                      >
                        {/* Bin SVG icon */}
                        <svg
                          className="h-4 w-4"
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

        {/* DRAWER FOOTER (PRICING & UNWIRED CHECKOUT ACTION) */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-6 space-y-4">
            <div className="flex justify-between text-base font-medium text-neutral-900">
              <span className="font-serif">Subtotal</span>
              <span className="font-sans font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-light leading-normal">
              Shipping, taxes, and custom adjustments are computed at checkout.
            </p>
            <div className="pt-2">
              {/* 🚧 Proceed to Checkout click action is not yet wired to payment endpoints */}
              <Button
                variant="gold"
                size="lg"
                className="w-full flex items-center justify-center shadow-md font-semibold text-neutral-950 uppercase"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
