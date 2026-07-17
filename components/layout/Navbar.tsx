/**
 * 📁 components/layout/Navbar.tsx
 * 📁 Global Navbar component.
 * 🎨 Sticky navigation bar with responsive hamburger menu, glassmorphism blur, and cart badge.
 * 🔗 Imports Next.js routing helpers, Tailwind style helpers, and atomic buttons.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/context/CartContext";

/**
 * 🎯 Renders the main responsive navigation header.
 * Includes a hamburger mobile menu that expands to show all nav links.
 *
 * @returns The rendered Navbar element
 */
export default function Navbar() {
  // ⚙️ Retrieve the current URL pathname for active link styling
  const pathname = usePathname();
  // ⚙️ Retrieve cart elements to show count and open side drawer panel
  const { items, setCartOpen } = useCart();
  // ⚙️ Mobile menu open/close toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ⚙️ Calculate the total number of physical products in the cart
  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0);

  // Navigation links array for clean rendering loop
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* BRAND LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <svg
            className="h-6 w-6 text-amber-600 transition-transform duration-500 group-hover:rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.6 7.6a2.4 2.4 0 0 0 3.4 0l7.6-7.6a2.4 2.4 0 0 0 0-3.4L13.7 2.7a2.4 2.4 0 0 0-3.4 0z" />
            <path d="M12 3v18" />
            <path d="M3 12h18" />
          </svg>
          <span className="font-serif text-lg font-bold tracking-widest text-neutral-900 uppercase">
            Luxe<span className="text-amber-600">Gems</span>
          </span>
        </Link>

        {/* PRIMARY NAVIGATION LINKS — hidden on mobile, shown on md+ */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-[10px] font-medium uppercase tracking-widest transition-colors duration-300 pb-1 pt-1",
                  isActive
                    ? "text-amber-600 font-semibold font-sans"
                    : "text-neutral-600 hover:text-amber-600 font-sans"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTION ITEMS */}
        <div className="flex items-center gap-3">
          {/* Account link — hidden on smallest breakpoint */}
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" aria-label="Sign In">
            Sign In
          </Button>

          {/* Cart Bag icon with count badge */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-amber-600 transition-colors focus:outline-none"
            aria-label="Shopping Bag"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white font-sans">
                {totalCartItems > 9 ? "9+" : totalCartItems}
              </span>
            )}
          </button>

          {/* Hamburger toggle — shown only on mobile */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-neutral-700 hover:text-amber-600 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU — slides down on open */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-sm px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-3 text-sm font-medium uppercase tracking-widest border-b border-neutral-50 font-sans",
                  isActive ? "text-amber-600" : "text-neutral-700 hover:text-amber-600"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full border-neutral-200">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
