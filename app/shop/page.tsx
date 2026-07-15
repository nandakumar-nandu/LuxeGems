/**
 * 📁 app/shop/page.tsx
 * 📁 Shop Page component for LuxeGems Store.
 * 🎨 Renders a premium Product Gallery layout with responsive grid layout and filter navigation UI.
 * 🔗 Imports React hooks, UI Button, ProductCard atomic component, and mock data types.
 */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";

/**
 * 🎯 ShopPage
 * 
 * 🎯 Purpose:
 * Renders the primary storefront shop gallery. Features an interactive filter navigation bar
 * and displays a premium responsive grid of fine jewelry items.
 *
 * @returns The rendered Shop page markup
 */
export default function ShopPage() {
  // ⚙️ Filter state - toggles styling, filtering logic itself is not wired yet
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Hardcoded premium mock product data
  const mockProducts = [
    {
      id: "prod-1",
      name: "Aurelia Solitaire Diamond Ring",
      price: 245000,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
      category: "Rings",
      isNew: true,
    },
    {
      id: "prod-2",
      name: "Seraphina Pearl Droplet Necklace",
      price: 480000,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      category: "Necklaces",
      isNew: true,
    },
    {
      id: "prod-3",
      name: "Celeste Diamond Stud Earrings",
      price: 185000,
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop",
      category: "Earrings",
      isNew: false,
    },
    {
      id: "prod-4",
      name: "Elysian Emerald Band",
      price: 320000,
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
      category: "Rings",
      isNew: false,
    },
    {
      id: "prod-5",
      name: "Helena Gold Pendant Necklace",
      price: 125000,
      image: "https://images.unsplash.com/photo-1611085583191-a3b1a3055641?q=80&w=600&auto=format&fit=crop",
      category: "Necklaces",
      isNew: false,
    },
    {
      id: "prod-6",
      name: "Athena Diamond Drop Earrings",
      price: 210000,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      category: "Earrings",
      isNew: true,
    },
  ];

  const filterCategories = ["All", "Rings", "Necklaces", "Earrings"];

  return (
    <div className="min-h-screen bg-white">
      {/* 🎨 HERO / HEADER BANNER AREA */}
      <div className="border-b border-neutral-100 bg-neutral-50/50 py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
            Exclusive Catalog
          </span>
          <h1 className="font-serif text-3xl font-light tracking-wide text-neutral-900 sm:text-5xl">
            The Gallery
          </h1>
          <p className="mx-auto max-w-lg text-xs font-light leading-relaxed text-neutral-500">
            Explore our curated masterpieces crafted in 18k solid gold and platinum.
            Select a category below to discover fine jewelry designed to last lifetimes.
          </p>
        </div>
      </div>

      {/* GALLERY WORKSPACE */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* 🎨 FILTER BAR UI */}
        {/* Flex layout with centered horizontal list of active filter states */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <Button
                key={category}
                variant={isActive ? "primary" : "outline"}
                size="sm"
                className={isActive ? "bg-amber-600 text-neutral-950 font-semibold" : ""}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* 🎨 RESPONSIVE GALLERY GRID */}
        {/* Renders products inside a clean responsive structure */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              isNew={product.isNew}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
