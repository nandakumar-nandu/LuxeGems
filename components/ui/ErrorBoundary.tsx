/**
 * 📁 components/ui/ErrorBoundary.tsx
 * 📁 Reusable React class-based Error Boundary component.
 *
 * 🎯 Purpose:
 * Wraps any subtree and catches rendering errors before they bubble up and crash the entire app.
 * Renders a premium branded fallback UI instead of a blank screen or React error overlay.
 *
 * 🎨 Design Decision:
 * React Error Boundaries must be class components — functional components with hooks cannot
 * implement componentDidCatch. This is the only class component in the entire LuxeGems codebase.
 *
 * ⚙️ Usage:
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <SomeComponent />
 * </ErrorBoundary>
 *
 * If no `fallback` prop is provided, the default premium LuxeGems error UI is shown.
 */

"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  /** The component tree to protect */
  children: ReactNode;
  /** Optional custom fallback — if omitted, the default LuxeGems error UI is used */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  /** Whether a rendering error has been caught */
  hasError: boolean;
  /** The caught error, stored for display/logging */
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // ⚙️ Initial state: no error has been caught yet
    this.state = { hasError: false, error: null };
  }

  /**
   * ⚙️ getDerivedStateFromError
   * Called by React when a child component throws during rendering.
   * Returning { hasError: true } triggers the fallback UI on the next render pass.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * ⚙️ componentDidCatch
   * Called after the error has been caught. Ideal for logging to external services (Sentry etc.).
   * `errorInfo.componentStack` gives the exact component tree where the error originated.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[LuxeGems ErrorBoundary] Caught error:", error);
    console.error("[LuxeGems ErrorBoundary] Component stack:", errorInfo.componentStack);
  }

  /**
   * ⚙️ handleReset
   * Clears the error state, allowing React to attempt a re-render of the children.
   * This is the "Retry" action available to the user.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback was provided by the parent, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default LuxeGems branded error fallback
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center px-6 py-16 text-center">
          {/* Decorative diamond icon */}
          <div className="mb-6 text-amber-400/50">
            <svg className="h-12 w-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.6 7.6a2.4 2.4 0 0 0 3.4 0l7.6-7.6a2.4 2.4 0 0 0 0-3.4L13.7 2.7a2.4 2.4 0 0 0-3.4 0z" />
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-amber-600 font-semibold font-sans mb-3">
            Concierge Interrupted
          </p>
          <h2 className="font-serif text-2xl font-light text-neutral-900 mb-2">
            Something Went Amiss
          </h2>
          <p className="text-sm font-light text-neutral-500 font-sans max-w-sm mb-8">
            This section encountered an unexpected error. Our team has been notified. You may retry or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-sm bg-neutral-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-700 transition-colors font-sans"
            >
              Retry
            </button>
            <a
              href="/"
              className="px-6 py-2.5 rounded-sm border border-neutral-300 text-neutral-700 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-50 transition-colors font-sans"
            >
              Return Home
            </a>
          </div>

          {/* Error detail — shown only in development for debugging */}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-8 max-w-lg text-left text-[10px] text-red-500 bg-red-50 p-4 rounded-sm overflow-auto border border-red-100">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    // No error — render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
