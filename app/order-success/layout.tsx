/**
 * 📁 app/order-success/layout.tsx
 * 📁 SEO metadata layout for the Order Confirmation page.
 *
 * 🎯 Why each property matters:
 * - `robots: noindex`: Order success pages contain unique tracking IDs and should
 *   never appear in search results — they're one-time post-purchase confirmations.
 * - `title`: Reassuring, clear title confirms the purchase was successful.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | LuxeGems Fine Jewelry",
  description: "Your LuxeGems order has been placed successfully. Track your masterpiece using your unique tracking ID.",
  robots: {
    // ⚡ Success pages are one-time post-purchase — indexing them adds no value
    index: false,
    follow: false,
  },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
