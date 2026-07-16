/**
 * 📁 app/products/[id]/layout.tsx
 * 📁 Dynamic SEO metadata layout for individual Product Detail pages.
 *
 * 🎯 Why each property matters:
 * - `generateMetadata`: Fetches real product data at build/request time to inject
 *   product-specific titles and descriptions — critical for Google product indexing.
 * - `title`: Unique per-product title helps search engines differentiate each product page.
 * - `description`: Tailored description incorporating name + category beats generic copy.
 * - `openGraph.images`: Using the actual product photo as the OG image dramatically
 *   increases click-through rates when links are shared on social media.
 */

import type { Metadata } from "next";

interface LayoutProps {
  params: { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  try {
    // Attempt to fetch real product data for accurate per-product metadata
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/products/${params.id}`,
      { next: { revalidate: 3600 } } // ⚡ Cache for 1h — product data is semi-static
    );
    if (res.ok) {
      const product = await res.json();
      return {
        title: `${product.name} | LuxeGems Fine Jewelry`,
        description: `${product.description ?? `Handcrafted ${product.category} — ethically sourced and hand-finished by master artisans.`}`.slice(0, 160),
        openGraph: {
          title: `${product.name} | LuxeGems`,
          description: `${product.category} — Explore this exclusive piece at LuxeGems.`,
          images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${product.name} | LuxeGems`,
          images: [product.image],
        },
      };
    }
  } catch {
    // Silently fall through to default metadata on any fetch error
  }

  // Default fallback metadata when the product cannot be fetched
  return {
    title: "Jewelry Detail | LuxeGems Fine Jewelry",
    description:
      "View product details, pricing, and availability for this exclusive LuxeGems jewelry piece.",
    openGraph: {
      title: "LuxeGems Fine Jewelry",
      description: "Handcrafted fine jewelry — ethically sourced and master-finished.",
    },
  };
}

export default function ProductDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
