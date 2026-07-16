/**
 * 📁 components/ui/OrderStatusSkeleton.tsx
 * 📁 Order status search tracking details loading skeleton.
 * 🎨 Renders gray pulsating sections mirroring lookup headers, steppers, and product cards.
 * 🔗 Imports React.
 */

import React from "react";

/**
 * 🎯 OrderStatusSkeleton
 * 🎯 Renders placeholder logs matching the Track Order query dashboard layout.
 *
 * @returns The rendered Order status skeleton markup
 */
export function OrderStatusSkeleton() {
  return (
    <div className="border border-neutral-100 bg-white p-6 sm:p-8 rounded-sm shadow-sm space-y-10 animate-pulse">
      {/* Lookup Card Top Header block */}
      <div className="flex justify-between border-b border-neutral-100 pb-6">
        <div className="space-y-2">
          <div className="h-3.5 w-24 rounded bg-neutral-200" />
          <div className="h-5 w-40 rounded bg-neutral-200" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-3.5 w-20 rounded bg-neutral-200" />
          <div className="h-5 w-24 rounded bg-neutral-200" />
        </div>
      </div>

      {/* Visual Stepper timeline shapes */}
      <div className="space-y-4">
        <div className="h-4 w-32 rounded bg-neutral-200" />
        <div className="h-16 w-full rounded bg-neutral-200" />
      </div>

      {/* Grid columns section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Left Column: Line items list placeholders */}
        <div className="space-y-4">
          <div className="h-4 w-28 rounded bg-neutral-200" />
          <div className="space-y-3">
            <div className="h-12 w-full rounded bg-neutral-200" />
            <div className="h-12 w-full rounded bg-neutral-200" />
          </div>
        </div>

        {/* Right Column: Customer + Courier address placeholders */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-36 rounded bg-neutral-200" />
            <div className="space-y-2">
              <div className="h-4 w-1/2 rounded bg-neutral-200" />
              <div className="h-4 w-3/4 rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
