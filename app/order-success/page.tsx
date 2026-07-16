/**
 * 📁 app/order-success/page.tsx
 * 📁 Order Success presentation page.
 * 🎨 Renders order confirmation notices, tracking details, and navigation links.
 * 🔗 Imports React, Next.js navigation hooks, atomic Buttons, and Suspense overlays.
 */

"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

/**
 * 🎯 SuccessPageContent
 * 🎯 Subcomponent rendering the actual order values from URL queries inside Suspense boundaries.
 */
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("trackingId") || "LG-XXXX-XXXX";

  return (
    <div className="mx-auto max-w-md px-6 text-center space-y-6">
      {/* 🎨 Elegant success circle illustration with animated checkmark */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* 🎨 Header texts */}
      <div className="space-y-3">
        <h1 className="font-serif text-3xl font-light text-neutral-900">Order Confirmed</h1>
        <p className="text-sm text-neutral-500 font-light leading-relaxed">
          Thank you for choosing LuxeGems. Your handcrafted masterpiece is being prepared.
          A digital invoice and logistics updates have been sent to your email.
        </p>
      </div>

      {/* 🎨 Highlighted Tracking Card Box */}
      <div className="rounded-sm border border-neutral-100 bg-neutral-50 p-6 space-y-3 text-sm text-neutral-700">
        <span className="text-neutral-400 text-xs uppercase tracking-wider font-semibold font-sans">
          Fulfillment Tracking ID
        </span>
        <div className="font-mono text-lg font-bold text-neutral-900 tracking-widest py-1 border border-dashed border-neutral-200 bg-white rounded-sm select-all">
          {trackingId}
        </div>
        <p className="text-[11px] text-neutral-400 font-light">
          Use this code to follow progress stages from creation to final courier delivery.
        </p>
      </div>

      {/* 🎨 Action navigation triggers */}
      <div className="pt-4 flex flex-col gap-3">
        {/* Track Order CTA (Alert confirmation as placeholder tracking) */}
        <Button
          type="button"
          variant="gold"
          size="lg"
          className="w-full font-semibold"
          onClick={() => alert(`Fulfillment stages lookup for tracking code ${trackingId} is coming soon.`)}
        >
          Track Your Order
        </Button>
        
        {/* Return to gallery catalog link */}
        <Link href="/shop">
          <Button variant="outline" size="lg" className="w-full border-neutral-300 text-neutral-600 hover:text-neutral-900 bg-white">
            Return to Storefront
          </Button>
        </Link>
      </div>
    </div>
  );
}

/**
 * 🎯 OrderSuccessPage
 * 🎯 Main page component wrapped in Suspense to support useSearchParams static compilation.
 *
 * @returns The rendered Order Success page markup
 */
export default function OrderSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-16">
      <Suspense
        fallback={
          <div className="text-center py-20">
            <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-light text-neutral-400 font-sans">Loading Confirmation...</p>
          </div>
        }
      >
        <SuccessPageContent />
      </Suspense>
    </div>
  );
}
