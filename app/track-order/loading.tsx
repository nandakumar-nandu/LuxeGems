/**
 * 📁 app/track-order/loading.tsx
 * 📁 Order status search tracking load state template.
 * 🎨 Renders lookup forms alongside OrderStatusSkeleton placeholders.
 * 🔗 Imports React and OrderStatusSkeleton.
 */

import React from "react";
import { OrderStatusSkeleton } from "@/components/ui/OrderStatusSkeleton";

/**
 * 🎯 TrackOrderLoading
 * 🎯 Renders pulsating order status card layouts during lookup log queries.
 *
 * @returns Renders loader steppers and summaries
 */
export default function TrackOrderLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-white min-h-[85vh]">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl font-light text-neutral-900 tracking-wide animate-pulse">
          Track Your Masterpiece
        </h1>
        <p className="text-sm font-light text-neutral-500 max-w-md mx-auto leading-relaxed font-sans">
          Enter your unique fulfillment tracking ID below to follow the journey of your hand-finished jewelry.
        </p>
      </div>

      {/* Lookup Card Form Skeleton */}
      <div className="max-w-md mx-auto flex gap-3 animate-pulse">
        <div className="flex-1 rounded-sm border border-neutral-200 h-10 bg-neutral-50" />
        <div className="w-24 rounded h-10 bg-neutral-200" />
      </div>

      {/* Stepper Dashboard Skeleton */}
      <OrderStatusSkeleton />
    </div>
  );
}
