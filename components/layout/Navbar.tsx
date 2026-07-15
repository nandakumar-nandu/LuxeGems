/**
 * 📁 components/layout/Navbar.tsx
 * 📁 Global Navbar component.
 * 🎨 Sticky navigation bar featuring luxurious branding, SVG icons, and a glassmorphism blur.
 * 🔗 Imports Next.js routing helpers, Tailwind style helpers, and atomic buttons.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * 🎯 Renders the main responsive navigation header for the website.
 * Contains placeholders for store search, authentication, and shopping bag count.
 *
 * @returns The rendered Navbar element
 */
export default function Navbar() {
  // ⚙️ Retrieve the current URL pathname for active link styling
  const pathname = usePathname();

  // Navigation links array for clean rendering loop
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* BRAND LOGO AREA */}
        {/* 🎨 Custom elegant typography for luxury jewelry branding */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Elegant diamond SVG icon */}
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

        {/* PRIMARY NAVIGATION LINKS */}
        {/* 🎨 Horizontal list with clean text size and letter spacing */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;
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

        {/* ACTION ITEMS (Search, Account, Shopping Bag) */}
        <div className="flex items-center gap-4">
          {/* User Account placeholder */}
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" aria-label="Account Account">
            Sign In
          </Button>

          {/* Cart Status and Count display */}
          <Link href="#cart" className="relative p-2 text-neutral-700 hover:text-amber-600 transition-colors" aria-label="Shopping Bag">
            {/* Bag Icon SVG */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {/* Shopping cart count badge - 🚧 Coming Soon */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white">
              0
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}
