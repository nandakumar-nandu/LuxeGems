/**
 * 📁 app/error.tsx
 * 📁 Next.js global Error Boundary page.
 * 🎨 Renders upscale error warning statement containers alongside interactive diagnostic resets.
 * 🔗 Imports React, button assets, and lifecycle handler functions.
 */

"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 🎯 ErrorBoundary
 * 🎯 Displays fallback alert screen for general application failures and offers reset triggers.
 *
 * @param props - React props containing the error details and the reset function
 * @returns Renders error warnings and actions
 */
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception context details to analytical tracking systems
    console.error("❌ Root Layout Error Boundary caught exception:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center space-y-6">
        {/* Warning notification icon wrapper */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100 animate-[pulse_2s_infinite]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-light text-neutral-900">Concierge Interrupted</h1>
          <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm mx-auto">
            The workspace encountered an unexpected problem. Our design house technicians have been notified.
          </p>
        </div>

        {/* Action recovery buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            variant="gold"
            size="md"
            className="font-semibold px-8"
            onClick={() => reset()}
          >
            Retry Session
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="border-neutral-300 text-neutral-600 hover:text-neutral-900 bg-white px-8"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
