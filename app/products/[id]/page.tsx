/**
 * 📁 app/products/[id]/page.tsx
 * 📁 Dynamic Product Detail Page component.
 * 🎨 Renders primary jewelry images, metadata details, quantity managers, and suggested related items.
 * 🔗 Imports React hooks, CartContext state interfaces, product card components, and styling.
 */

"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

interface Product {
  _id: string;
  id?: string;
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
 * 🎯 ProductDetailPage
 * 🎯 Renders the details page of a single product based on ID query parameters.
 *
 * @param context - Dynamic route parameters containing target product ID
 * @returns The rendered Product Detail page markup
 */
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProductDetails() {
      try {
        setLoading(true);
        setError(null);

        // Fetch single product info
        const productRes = await fetch(`/api/products/${id}`);
        if (!productRes.ok) {
          throw new Error("Unable to locate product details. It may have been removed.");
        }
        const productData = (await productRes.json()) as Product;
        setProduct(productData);

        // Fetch related products in the same category
        try {
          const relatedRes = await fetch(`/api/products?category=${productData.category}`);
          if (relatedRes.ok) {
            const allCategoryProducts = (await relatedRes.json()) as Product[];
            // Filter out current product and take at most 3 items
            const filtered = allCategoryProducts
              .filter((p) => (p._id || p.id) !== (productData._id || productData.id))
              .slice(0, 3);
            setRelatedProducts(filtered);
          }
        } catch (relatedErr) {
          console.error("⚠️ Failed to load related products:", relatedErr);
        }

      } catch (err: unknown) {
        console.error("❌ Failed to load product detail:", err);
        const errMsg = err instanceof Error ? err.message : "Lookup failed.";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProductDetails();
      // Reset quantity selectors on page change
      setQuantity(1);
    }
  }, [id]);

  // Handles adding item to global cart context state
  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id || product.id || "",
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    alert(`Added ${quantity} x ${product.name} to your cart.`);
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-light text-neutral-400 font-sans tracking-wide">
            Loading luxury item specifications...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-white px-6">
        <div className="text-center space-y-5 max-w-sm">
          <p className="font-serif text-lg text-neutral-700">{error || "Item details unavailable"}</p>
          <Link href="/shop">
            <Button variant="gold" size="md">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Stock status tag renderer
  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="text-red-600 font-semibold bg-red-50 px-2.5 py-1 rounded-sm border border-red-100 uppercase tracking-wider text-[10px]">
          Out of Stock
        </span>
      );
    } else if (stock <= 3) {
      return (
        <span className="text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-wider text-[10px]">
          Low Stock ({stock} left)
        </span>
      );
    } else {
      return (
        <span className="text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-wider text-[10px]">
          In Stock
        </span>
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        
        {/* Main product info split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Image Block */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square overflow-hidden border border-neutral-100 bg-neutral-50 rounded-sm">
              {/* ⚡ fill prop + sizes lets Next.js serve the right resolution per viewport — avoids oversized downloads */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
                priority // ⚡ LCP image — prioritise fetch so it renders before other assets
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-amber-600/90 text-white font-semibold text-[10px] uppercase tracking-widest px-3 py-1 shadow-sm backdrop-blur-sm rounded-sm">
                  New Edition
                </span>
              )}
            </div>
          </div>

          {/* Details Block */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-neutral-400 text-xs font-semibold uppercase tracking-widest font-sans">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price & Stock Indicator Row */}
            <div className="flex items-center gap-6 border-y border-neutral-100 py-4">
              <span className="font-serif text-2xl font-medium text-amber-800">
                ${(product.price / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              {getStockBadge(product.stock)}
            </div>

            {/* Product Craftsmanship Description */}
            <p className="text-sm font-light text-neutral-500 leading-relaxed font-sans">
              {product.description || "Each item in our jewelry catalog represents pure hand-finished elegance, selected by our expert team of luxury designers."}
            </p>

            {/* Quantity Selector & Add to Cart Action */}
            {product.stock > 0 ? (
              <div className="space-y-4 pt-4 border-t border-neutral-50">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-sans">
                    Quantity
                  </span>
                  
                  {/* Plus Minus control buttons */}
                  <div className="flex items-center border border-neutral-300 rounded-sm bg-neutral-50">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold font-mono text-neutral-800 bg-white border-x border-neutral-200">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-3 py-1 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="gold"
                  size="lg"
                  className="w-full font-semibold py-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50"
                disabled
              >
                Sold Out
              </Button>
            )}
          </div>
        </div>

        {/* 🎨 RELATED SUGGESTIONS ("YOU MAY ALSO LIKE") */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 border-t border-neutral-100 pt-16">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl font-light text-neutral-900 tracking-wide">
                Complete the Look
              </h2>
              <p className="text-xs font-light text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Discover pieces from the same collection selected by our design house to complement your style.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related._id || related.id}
                  id={related._id || related.id || ""}
                  name={related.name}
                  price={related.price}
                  image={related.image}
                  category={related.category}
                  isNew={related.isNew}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
