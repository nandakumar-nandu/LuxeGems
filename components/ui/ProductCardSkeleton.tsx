/**
 * 📁 components/ui/ProductCardSkeleton.tsx
 * 📁 ProductCard loading state skeleton component.
 * 🎨 Renders gray pulsating boxes mirroring the visual shape of a jewelry product card.
 * 🔗 Imports React.
 */

import React from "react";

/**
 * 🎯 ProductCardSkeleton
 * 🎯 Renders a placeholder card that mirrors the layout outline of a standard ProductCard to prevent visual shifts.
 *
 * @returns The rendered ProductCard skeleton markup
 */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-neutral-100 bg-white p-4 space-y-4 animate-pulse">
      {/* Aspect square placeholder mirroring image frames */}
      <div className="aspect-square w-full rounded-sm bg-neutral-200" />
      
      {/* Category tag, title name, and pricing text lines */}
      <div className="space-y-3 flex-1">
        <div className="h-3.5 w-1/4 rounded bg-neutral-200" />
        <div className="h-5 w-3/4 rounded bg-neutral-200" />
        <div className="h-4 w-1/3 rounded bg-neutral-200" />
      </div>

      {/* Button placeholder block */}
      <div className="h-9 w-full rounded bg-neutral-200" />
    </div>
  );
}
