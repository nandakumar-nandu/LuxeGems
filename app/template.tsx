/**
 * 📁 app/template.tsx
 * 📁 Client Page Transition template.
 * 🎨 Applies global entrance and exit page fade animations during client-side route transitions.
 * 🔗 Imports React, motion components, and transition settings.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * 🎯 Template
 * 🎯 Next.js App Router template wrapper supplying entrance and exit fade animations for dynamic pages.
 *
 * @param props - Children React nodes representing page contents
 * @returns Animated motion container enclosing children elements
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      /**
       * 🎨 Page transition animation configuration:
       * - Initial: Invisible at opacity 0.
       * - Animate: Fades in to opacity 1.
       * - Transition: 0.4 seconds duration using a smooth ease-out curves offers an upscale transition.
       */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
