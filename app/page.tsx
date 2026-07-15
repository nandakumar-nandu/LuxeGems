/**
 * 📁 app/page.tsx
 * 📁 Homepage for LuxeGems Store.
 * 🎨 Renders a stunning premium Hero Section utilizing the design system tokens.
 * 🔗 Imports custom Button atomic UI component and Next.js Link.
 */

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * 🎯 Renders the landing page for LuxeGems Store.
 * Outlines the high-end value propositions, premium materials, and shop directions.
 *
 * @returns The rendered homepage markup
 */
export default function Home() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white min-h-[85vh] flex items-center">
      
      {/* 🎨 DECORATIVE BACKGROUND ELEMENTS */}
      {/* Dynamic blurred gold circles for a warm, premium ambient glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Soft gold glow top left */}
        <div className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-amber-500/10 blur-[120px]" />
        {/* Soft amber glow bottom right */}
        <div className="absolute -right-1/4 -bottom-1/4 h-[700px] w-[700px] rounded-full bg-yellow-500/10 blur-[120px]" />
      </div>

      {/* HERO WRAPPER GRID */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: BRAND PROMISE & CTA */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Subtle tag/label above the main heading */}
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              The Artisan Collection
            </span>
          </div>

          {/* Main Headline utilizing elegant serif font */}
          <h1 className="font-serif text-4xl font-extralight tracking-wide text-neutral-100 sm:text-6xl md:text-7xl leading-tight">
            Handcrafted <br />
            <span className="font-semibold italic text-amber-500">Timeless</span> Elegance
          </h1>

          {/* Descriptive body text */}
          <p className="text-sm font-light leading-relaxed text-neutral-400 max-w-xl">
            Indulge in our signature collections of conflict-free diamonds and sustainably sourced precious metals. Each piece is custom designed and carefully sculpted by master jewelers to carry your stories through generations.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/shop">
              <Button variant="gold" size="lg">
                Explore Collections
              </Button>
            </Link>
            <Link href="#appointments">
              <Button variant="outline" size="lg" className="border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white">
                Book Consultation
              </Button>
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: HIGH-END VISUAL PLACEHOLDER */}
        {/* 🎨 Abstract gold grid outline with text overlays representing pure craftsmanship */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-sm border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
            {/* Top-right corner diamond marker */}
            <div className="absolute top-4 right-4 text-amber-500/40">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L2 12h20L12 2zM2 12l10 10 10-10H2z" />
              </svg>
            </div>
            
            {/* Abstract aesthetic card top header */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">Signature Piece</span>
              <h2 className="font-serif text-xl font-light text-neutral-200">The Aurelia Solitaire</h2>
            </div>

            {/* Abstract visual center lines showing structural blueprints */}
            <div className="flex items-center justify-center py-12">
              <div className="relative w-48 h-48 rounded-full border border-dashed border-amber-500/20 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-dashed border-amber-500/30 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                  <div className="w-24 h-24 rounded-full border border-dashed border-amber-500/40" />
                </div>
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full" />
              </div>
            </div>

            {/* Bottom pricing/materials summary */}
            <div className="flex justify-between items-end border-t border-neutral-800/80 pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Materials</p>
                <p className="text-xs text-neutral-300">18k Yellow Gold & Platinum</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Starting At</p>
                <p className="text-sm font-semibold text-amber-500">$2,450</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
