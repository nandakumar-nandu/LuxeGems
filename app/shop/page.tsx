/**
 * 📁 app/shop/page.tsx
 * 📁 Shop Page component for LuxeGems Store.
 * 🎨 Renders a premium Product Gallery layout with responsive grid layout and filter navigation UI.
 * 🔗 Imports React hooks, UI Button, ProductCard atomic component, and helper fetch functions.
 */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";

interface DBProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
}

/**
 * 🎯 ShopPage
 * 
 * 🎯 Purpose:
 * Renders the primary storefront shop gallery. Features an interactive filter navigation bar
 * and displays a premium responsive grid of fine jewelry items fetched dynamically from the database.
 *
 * @returns The rendered Shop page markup
 */
export default function ShopPage() {
  // ⚙️ Filter state - triggers a database query whenever it changes
  const [activeFilter, setActiveFilter] = useState<string>("All");
  // ⚙️ Product storage state
  const [products, setProducts] = useState<DBProduct[]>([]);
  // ⚙️ UI loading status flag
  const [loading, setLoading] = useState<boolean>(true);
  // ⚙️ Exception error status storage
  const [error, setError] = useState<string | null>(null);

  const filterCategories = ["All", "Rings", "Necklaces", "Earrings"];

  // ⚙️ Fetch catalog items from API on component mount or category filter changes
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build target URL; append category query parameter if filtering is active
        const url =
          activeFilter === "All"
            ? "/api/products"
            : `/api/products?category=${activeFilter}`;

        // 🔗 Execute API request using Next.js fetch API
        const response = await fetch(url, {
          next: { revalidate: 60 }, // Revalidate caching rules (every 60 seconds)
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve catalog collections");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        console.error("❌ Fetch products error:", err);
        const errMsg = err instanceof Error ? err.message : "Failed to load catalog. Please try again.";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [activeFilter]);

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

        {/* LOADING & ERROR TEMPLATE PLACEMENT */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-light text-neutral-400 font-sans tracking-wide">
              Loading Collections...
            </p>
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-4">
            <div className="rounded-full bg-red-50 p-4 text-red-500 inline-block">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm font-sans font-medium text-neutral-800">{error}</p>
            <Button variant="outline" size="sm" onClick={() => setActiveFilter(activeFilter)}>
              Retry Load
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-light text-neutral-400 font-sans">
              No products found in this category.
            </p>
          </div>
        ) : (
          /* 🎨 RESPONSIVE GALLERY GRID */
          /* Renders products retrieved dynamically from the MongoDB catalog API */
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
