/**
 * 📁 components/ui/Button.tsx
 * 📁 Atomic button component.
 * 🎨 Implements premium luxury styling variants (Gold, Dark, Outline, Ghost).
 * 🔗 Imports React core attributes and the class merge utility `cn`.
 */

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 📦 Props interface for the custom Button component.
 * Extends the default HTML button attributes to support custom styling and behavior.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The design variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  /** The size of the button padding/text */
  size?: "sm" | "md" | "lg";
}

/**
 * 🎯 Renders a styled button with support for luxury design themes and flexible layouts.
 *
 * @param props - Custom properties including variant, size, and standard HTML button attributes
 * @returns The rendered HTML button element
 */
export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  // Base classes for button styling and smooth micro-animations
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none tracking-wider uppercase text-xs";
  
  // Custom styles for each luxury visual variant
  const variants = {
    // Elegant deep dark/charcoal button
    primary: "bg-[#111111] text-white hover:bg-neutral-800 border border-transparent shadow-sm",
    // Clean light grey button
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-transparent",
    // Luxurious gold/amber button indicating premium call to action
    gold: "bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-neutral-950 font-semibold shadow-md hover:shadow-lg focus:ring-yellow-400",
    // Thin gold/border button
    outline: "border border-neutral-300 text-neutral-700 bg-transparent hover:bg-neutral-50 hover:text-neutral-950",
    // Clean transparent hover-only button
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
  };

  // Paddings and font sizes based on selected button size
  const sizes = {
    sm: "h-9 px-3 py-1.5",
    md: "h-11 px-5 py-2.5",
    lg: "h-13 px-8 py-3.5 text-sm",
  };

  // Combine conditional and user-defined styles using standard cn helper
  const buttonStyles = cn(baseStyles, variants[variant], sizes[size], className);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
}
