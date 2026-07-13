/**
 * 📁 lib/utils.ts
 * 📁 Core helper utilities for formatting data and styling strings.
 * ⚙️ Contains standalone tools for formatting prices and combining Tailwind class names.
 */

/**
 * 🎯 Formats a numeric price in cents to a localized US Dollar string.
 *
 * @param priceInCents - The price value in cents (e.g. 1000 for $10.00)
 * @returns The formatted string (e.g. "$10.00")
 */
export function formatPrice(priceInCents: number): string {
  // Convert cents to dollars
  const dollars = priceInCents / 100;
  
  // Format as US currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}

/**
 * 🎯 Utility function to join classnames conditionally.
 *
 * @param classes - Array of conditional CSS classes
 * @returns Concatenated space-separated class name string
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  // Filter out falsy values and join with a space
  return classes.filter(Boolean).join(" ");
}
