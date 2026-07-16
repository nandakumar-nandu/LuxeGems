/**
 * 📁 app/checkout/layout.tsx
 * 📁 SEO metadata layout for the Checkout page.
 *
 * 🎯 Why each property matters:
 * - `robots: noindex`: Checkout pages are transactional and session-specific.
 *   Indexing them would be meaningless and potentially expose ephemeral state URLs.
 * - `title`: A clear "Secure Checkout" title reassures users they are on the right page.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | LuxeGems Fine Jewelry",
  description: "Complete your LuxeGems order securely. Enter your shipping details and payment information.",
  robots: {
    // ⚡ Checkout is a transactional page — block indexing to avoid confusing search results
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
