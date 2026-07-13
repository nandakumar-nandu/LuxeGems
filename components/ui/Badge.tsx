/**
 * 📁 components/ui/Badge.tsx
 * 📁 Atomic status badge component.
 * 🎨 Renders tiny labels (e.g., "Sale", "New", "Limited") with rounded borders and subtle background themes.
 * 🔗 Imports React utilities and the conditional styling merger `cn`.
 */

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 📦 Props interface for the custom Badge component.
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual theme of the badge labels */
  variant?: "default" | "secondary" | "outline" | "gold" | "success" | "destructive";
}

/**
 * 🎯 Renders a badge label for product tags and transaction statuses.
 *
 * @param props - Custom properties including variant selection and standard HTML div attributes
 * @returns The rendered HTML div badge element
 */
export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  // Base style configuration for badges including font weight, size, and layout
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 select-none tracking-wide font-sans scale-[0.9] origin-left";

  // Individual color profiles matching the overall premium web app theme
  const variants = {
    // Charcoal slate badge
    default: "border-transparent bg-neutral-900 text-white hover:bg-neutral-800",
    // Neutral grey badge
    secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    // Clean transparent outline badge
    outline: "text-neutral-900 border-neutral-300 bg-transparent",
    // Luxury gold gradient badge
    gold: "border-transparent bg-amber-50 text-amber-800 border border-amber-200",
    // Status success (green)
    success: "border-transparent bg-emerald-50 text-emerald-700 border border-emerald-200",
    // Status alert (red)
    destructive: "border-transparent bg-red-50 text-red-700 border border-red-200",
  };

  // Combine classes cleanly using the custom cn helper
  const badgeStyles = cn(baseStyles, variants[variant], className);

  return (
    <div className={badgeStyles} {...props}>
      {children}
    </div>
  );
}
