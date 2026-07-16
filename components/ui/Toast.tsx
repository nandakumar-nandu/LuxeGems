/**
 * 📁 components/ui/Toast.tsx
 * 📁 Reusable Toast notification provider and UI component.
 * 🎨 Features elegant popups, fading transitions, and status-specific palettes (Emerald/Red).
 * 🔗 Imports React hooks and Framer Motion for micro-interactions.
 */

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * 🎯 useToast
 * 🎯 Hook helper that triggers the showing of toaster cards.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/**
 * 🎯 ToastProvider
 * 🎯 Wrapper provider that hosts toast queues and prints notification overlays.
 *
 * @param props - React props containing children elements
 * @returns Renders children alongside floating toaster portals
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically dismiss the toast message card after 4000 milliseconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Renders Toast elements floating in absolute space */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              /**
               * 🎨 Animation Variants:
               * - Entry: Fades from opacity 0 to 1, scaling up from 0.95 to 1, and slides upwards by 20px.
               * - Exit: Scales down to 0.9 and fades out.
               * - Transition: Spring physics (stiffness 260, damping 20) are chosen to provide a snappy, luxury bounce effect.
               */
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`pointer-events-auto flex items-center justify-between rounded-sm border p-4 shadow-md font-sans text-xs ${
                toast.type === "success"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                  : "bg-red-50 border-red-100 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {toast.type === "success" ? (
                  <svg className="h-4 w-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <span className="font-medium">{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="ml-4 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
