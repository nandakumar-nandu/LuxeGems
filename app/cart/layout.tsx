/**
 * 📁 app/cart/layout.tsx
 * 📁 SEO metadata layout for the Shopping Cart page.
 *
 * 🎯 Why each property matters:
 * - `robots: noindex`: Cart pages should NOT be indexed by search engines — they contain
 *   user-specific session state that has no value in search results.
 * - `title`: Still matters for browser tabs — helps users identify the tab quickly.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | LuxeGems Fine Jewelry",
  description: "Review and manage the items in your LuxeGems shopping cart before proceeding to checkout.",
  robots: {
    // ⚡ Cart is session-specific and should not appear in search engine results
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
