/**
 * 📁 components/ui/Card.tsx
 * 📁 Reusable Card UI subcomponents.
 * 🎨 Renders content wrapped in premium borders, light shadows, and soft background tones.
 * 🔗 Imports React utilities and the conditional styling merger `cn`.
 */

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 📦 Props interface for the generic Card component.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If true, applies a light amber hover glow effect */
  hoverable?: boolean;
}

/**
 * 🎯 Renders the main Card wrapper with optional hover animation.
 *
 * @param props - Custom properties including hoverable option and standard HTML div properties
 * @returns The rendered Card container
 */
export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  // Combine borders, shadows, and transitions for responsive card display
  return (
    <div
      className={cn(
        "rounded-sm border border-neutral-200 bg-white text-neutral-950 shadow-sm transition-all duration-300",
        hoverable && "hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * 🎯 Renders the header section of the Card.
 *
 * @param props - Standard HTML div properties
 * @returns The CardHeader element
 */
export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Sets padding and internal vertical spacing for titles
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * 🎯 Renders the title heading in the Card header.
 *
 * @param props - Standard HTML heading properties
 * @returns The CardTitle element
 */
export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  // Uses elegant serif font for luxury jewelry style names
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-neutral-900", className)} {...props}>
      {children}
    </h3>
  );
}

/**
 * 🎯 Renders the descriptive subtitle in the Card header.
 *
 * @param props - Standard HTML paragraph properties
 * @returns The CardDescription element
 */
export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  // Faint grey text color for subtitles
  return (
    <p className={cn("text-sm text-neutral-500", className)} {...props}>
      {children}
    </p>
  );
}

/**
 * 🎯 Renders the main body content of the Card.
 *
 * @param props - Standard HTML div properties
 * @returns The CardContent element
 */
export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Default padding layout for main body sections
  return (
    <div className={cn("p-6 pt-0 text-sm text-neutral-700", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * 🎯 Renders the footer action area of the Card.
 *
 * @param props - Standard HTML div properties
 * @returns The CardFooter element
 */
export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Adds top border separators and flex alignment for cards actions
  return (
    <div className={cn("flex items-center p-6 pt-0 border-t border-neutral-100 mt-4", className)} {...props}>
      {children}
    </div>
  );
}
