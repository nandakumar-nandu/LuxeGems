/**
 * 📁 app/track-order/layout.tsx
 * 📁 SEO metadata layout for the Order Tracking page.
 *
 * 🎯 Why each property matters:
 * - `title/description`: This page CAN be indexed — customers may search for
 *   "track LuxeGems order" and landing here is a useful UX entry point.
 * - `robots: noindex` is intentionally NOT set here — the page is genuinely useful
 *   to appear in branded searches (e.g. "LuxeGems track order").
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | LuxeGems Fine Jewelry",
  description:
    "Enter your LuxeGems tracking ID to follow the delivery progress of your handcrafted jewelry piece — from our studio to your door.",
  openGraph: {
    title: "Track Your LuxeGems Order",
    description:
      "Follow your jewelry's journey from our San Francisco studio to your door.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LuxeGems Order Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Your LuxeGems Order",
    description: "Follow your jewelry's journey from our studio to your door.",
  },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
