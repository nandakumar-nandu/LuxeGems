/**
 * 📁 app/not-found.tsx
 * 📁 Next.js custom Not Found 404 page.
 * 🎨 Renders upscale error warning statement containers alongside redirection actions.
 * 🔗 Imports React, Next.js Link and button UI components.
 */

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * 🎯 NotFound
 * 🎯 Displays fallback 404 screen when client queries unmapped or invalid routes.
 *
 * @returns Renders custom 404 text and links
 */
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center space-y-6">
        {/* Empty shopping bag visual outline */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 border border-neutral-100">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-light text-neutral-900">Masterpiece Not Found</h1>
          <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm mx-auto font-sans">
            The requested jewelry page does not exist or has been archived. Browse our catalog for contemporary arrivals.
          </p>
        </div>

        {/* Back to catalog path redirect */}
        <div className="pt-4">
          <Link href="/shop">
            <Button
              type="button"
              variant="gold"
              size="md"
              className="font-semibold px-8"
            >
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
