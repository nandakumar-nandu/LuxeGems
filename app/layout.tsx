/**
 * 📁 app/layout.tsx
 * 📁 Root layout wrapper for the LuxeGems Store.
 * ⚙️ Configures global SEO metadata, imports premium Google Fonts, and defines the structural shell.
 * 🔗 Imports Next.js core types, fonts, globals stylesheet, and global layouts (Navbar, Footer).
 */

import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// 🎨 Premium Serif Font for luxury typography headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// 🎨 Clean Sans-Serif Font for high-readability body copy
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// ⚙️ SEO Metadata configuration for search engine indexing
export const metadata: Metadata = {
  title: "LuxeGems Store | Premium Custom Fine Jewelry",
  description: "Explore conflict-free diamonds, engagement rings, gold necklaces, and signature earrings. Handcrafted excellence at LuxeGems Store.",
  keywords: "fine jewelry, diamond rings, gold necklace, wedding band, luxury diamonds, conflict-free gems",
  authors: [{ name: "LuxeGems Artisans" }],
  openGraph: {
    title: "LuxeGems Store | Premium Custom Fine Jewelry",
    description: "Discover curated diamond collections and fine jewelry handcrafted by master artisans.",
    type: "website",
  },
};

/**
 * 🎯 Core structural layout wrapper enclosing all views with navbar, main view pane, and footer.
 *
 * @param props - Children React nodes representing nested page views
 * @returns The main HTML container with global font variables applied
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-white text-neutral-900 antialiased min-h-screen flex flex-col">
        {/* GLOBAL HEADER */}
        <Navbar />

        {/* PRIMARY VIEWPORT CONTAINER */}
        <main className="flex-grow">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
