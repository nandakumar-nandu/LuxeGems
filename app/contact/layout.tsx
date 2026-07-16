/**
 * 📁 app/contact/layout.tsx
 * 📁 SEO metadata layout for the Contact / Concierge Inquiry page.
 *
 * 🎯 Why each property matters:
 * - `title/description`: Contact pages rank for queries like "LuxeGems contact",
 *   "jewelry concierge San Francisco", or "custom ring inquiry". Good descriptions
 *   set the right expectation before the user clicks through.
 * - `openGraph`: Contact page shares rarely happen, but still beneficial for
 *   brand consistency if anyone links to or embeds our contact URL.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Concierge | LuxeGems Fine Jewelry",
  description:
    "Have questions about custom ring sizing, gemstone sourcing, or delivery timelines? Reach out to the LuxeGems concierge team — we reply within 24 hours.",
  openGraph: {
    title: "Contact LuxeGems | Fine Jewelry Concierge",
    description:
      "Reach our design concierge for bespoke inquiries, ring sizing, and delivery questions.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LuxeGems Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LuxeGems | Fine Jewelry Concierge",
    description:
      "Bespoke inquiries, ring sizing, and custom orders — our concierge is here to help.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
