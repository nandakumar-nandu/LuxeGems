/**
 * 📁 app/shop/loading.tsx
 * 📁 Shop catalog loading state template.
 * 🎨 Renders filter selectors and grid layout of 6 ProductCardSkeleton placeholders.
 * 🔗 Imports React and ProductCardSkeleton.
 */

import React from "react";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";

/**
 * 🎯 ShopLoading
 * 🎯 Renders pulsating placeholders during dynamic shop catalog listings data fetches.
 *
 * @returns Renders skeleton products cards grid layout
 */
export default function ShopLoading() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 bg-white">
      {/* Search/Catalog Header */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl font-light text-neutral-900 tracking-wide animate-pulse">
          Our Collections
        </h1>
        <p className="text-sm font-light text-neutral-500 max-w-md mx-auto leading-relaxed font-sans">
          Browse our signature collections of hand-finished ethical diamonds and recycled precious metals.
        </p>
      </div>

      {/* Static skeleton filter bar selectors placeholder */}
      <div className="flex flex-wrap justify-center gap-3 border-b border-neutral-100 pb-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-8 w-20 rounded bg-neutral-100 animate-pulse" />
        ))}
      </div>

      {/* Skeletons catalog grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skeletons.map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
