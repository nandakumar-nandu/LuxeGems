/**
 * 📁 components/ui/FormField.tsx
 * 📁 Reusable FormField component wrapping standard input fields.
 * 🎨 Features custom labeling, clean border layouts, error message displays, and gold focus highlights.
 * 🔗 Imports React core forwarding ref utilities and class merging helpers.
 */

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 📦 FormFieldProps
 * 📦 Props interface for the custom FormField component.
 * Extends the default HTML input element attributes.
 */
export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The text displayed above the input field as its label */
  label: string;
  /** Optional error message string; if present, renders the input with alert red styling */
  error?: string;
  /** Optional container class name to adjust wrapper margins or layout */
  containerClassName?: string;
}

/**
 * 🎯 FormField
 * 
 * 🎯 Purpose:
 * Renders a premium labeled input field with forwarded reference support for hook libraries.
 * Handles styling changes dynamically when error states are active.
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, containerClassName, type = "text", ...props }, ref) => {
    return (
      <div className={cn("flex flex-col space-y-1.5 w-full", containerClassName)}>
        {/* Labeled Input Heading */}
        <label
          className={cn(
            "text-xs font-semibold uppercase tracking-wider font-sans select-none",
            error ? "text-red-500" : "text-neutral-500"
          )}
        >
          {label}
        </label>

        {/* Input Element */}
        <input
          ref={ref}
          type={type}
          className={cn(
            "h-11 w-full rounded-sm border bg-white px-3.5 py-2 text-sm font-sans transition-all duration-300 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-400"
              : "border-neutral-200 focus:border-amber-500 text-neutral-900",
            className
          )}
          {...props}
        />

        {/* Validation Error Snippet */}
        {error && (
          <span className="text-[11px] font-sans font-medium text-red-500 select-none animate-[fadeIn_0.2s_ease-out]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
