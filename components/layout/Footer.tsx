/**
 * 📁 components/layout/Footer.tsx
 * 📁 Global Footer component.
 * 🎨 Displays secondary links, copyright, and social layout columns with dark/charcoal themes.
 * 🔗 Imports React utilities and Link navigation helpers.
 */

import React from "react";
import Link from "next/link";

/**
 * 🎯 Renders the footer component with static links, newsletter signup placeholder, and copyright info.
 *
 * @returns The rendered Footer element
 */
export default function Footer() {
  // Current calendar year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-[#111111] text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* FOUR COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* COLUMN 1: BRAND DETAIL */}
          <div className="space-y-4">
            <span className="font-serif text-lg font-bold tracking-widest text-white uppercase">
              Luxe<span className="text-amber-500">Gems</span>
            </span>
            <p className="text-sm text-neutral-500 max-w-xs">
              Handcrafting timeless luxury jewelry using conflict-free diamonds and sustainably sourced precious metals.
            </p>
          </div>

          {/* COLUMN 2: QUICK SHOP COLLECTIONS */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#collections" className="hover:text-amber-500 transition-colors">Bridal Collection</Link>
              </li>
              <li>
                <Link href="#rings" className="hover:text-amber-500 transition-colors">Engagement Rings</Link>
              </li>
              <li>
                <Link href="#necklaces" className="hover:text-amber-500 transition-colors">Diamond Necklaces</Link>
              </li>
              <li>
                <Link href="#earrings" className="hover:text-amber-500 transition-colors">Classic Earrings</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#shipping" className="hover:text-amber-500 transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-amber-500 transition-colors">Sizing Guide</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-amber-500 transition-colors">Contact Expert</Link>
              </li>
              <li>
                <Link href="#appointments" className="hover:text-amber-500 transition-colors">Book Consultation</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER SUBSCRIPTION */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm text-neutral-500">
              Subscribe to receive updates on exclusive private sales and new releases.
            </p>
            {/* Newsletter input wrapper - 🚧 coming soon */}
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                disabled
              />
              <button
                className="bg-amber-600 hover:bg-amber-700 text-neutral-950 px-4 font-medium transition-colors"
                disabled
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM AREA WITH COPYRIGHT */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {currentYear} LuxeGems Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="#terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
