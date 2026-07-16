/**
 * 📁 app/about/layout.tsx
 * 📁 SEO metadata layout for the About / Brand Story page.
 *
 * 🎯 Why each property matters:
 * - `title/description`: About pages rank for branded searches and build trust —
 *   "LuxeGems jewelry brand" or "ethical jewelry studio San Francisco".
 * - `openGraph`: When journalists or bloggers share our About page, the OG image
 *   and copy should convey a premium, artisan brand identity.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | LuxeGems — Artisan Fine Jewelry Since 2021",
  description:
    "Meet the master goldsmiths, gemologists, and creative directors behind LuxeGems. Discover our commitment to ethical sourcing, hand-finished craftsmanship, and circular luxury.",
  openGraph: {
    title: "Our Story | LuxeGems Fine Jewelry",
    description:
      "The artisan studio behind every hand-finished LuxeGems piece — meet our team and our craft.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LuxeGems Artisan Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | LuxeGems Fine Jewelry",
    description:
      "Ethical sourcing, hand-finished craft, and circular luxury — this is LuxeGems.",
    images: [
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
