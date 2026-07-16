/**
 * 📁 app/shop/layout.tsx
 * 📁 SEO metadata layout for the Shop / Catalog page.
 *
 * 🎯 Why each property matters:
 * - `title`: Appears in browser tab and Google search result titles — uses product keywords.
 * - `description`: Shown under title in search results — should be compelling and under 160 chars.
 * - `openGraph.title/description/images`: Rendered when sharing the URL on Facebook, LinkedIn, Slack etc.
 * - `twitter.card`: Controls preview format on Twitter/X — "summary_large_image" shows a big preview image.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Fine Jewelry | LuxeGems — Rings, Necklaces, Earrings",
  description:
    "Browse our curated collection of handcrafted diamond rings, gold necklaces, and artisan earrings. Every piece is conflict-free and ethically sourced.",
  openGraph: {
    title: "Shop Fine Jewelry | LuxeGems",
    description:
      "Explore our signature catalog of ethically sourced, hand-finished jewelry pieces.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LuxeGems Jewelry Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Fine Jewelry | LuxeGems",
    description:
      "Handcrafted diamond rings, gold necklaces, and signature earrings — all conflict-free.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
