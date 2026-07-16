/**
 * 📁 app/track-order/page.tsx
 * 📁 Client-side order tracking dashboard page.
 * 🎨 Renders lookup forms, visual status timelines, product summaries, and recipient lists.
 * 🔗 Imports React, Suspense components, Next.js queries, buttons, and API fetch triggers.
 */

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderData {
  trackingId: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  totalAmount: number;
  status: "Pending" | "Paid" | "Failed" | "Shipped" | "Delivered";
  createdAt?: string;
}

/**
 * 🎯 TrackOrderContent
 * 🎯 Subcomponent containing tracking state hooks and visual layout, wrapped inside Suspense.
 */
function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryId = searchParams.get("trackingId") || "";

  const [inputTrackingId, setInputTrackingId] = useState(queryId);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically search when query param changes or mounts
  useEffect(() => {
    if (queryId) {
      handleSearch(queryId);
    }
  }, [queryId]);

  const handleSearch = async (tid: string) => {
    const cleanId = tid.trim();
    if (!cleanId) return;

    try {
      setLoading(true);
      setError(null);
      setOrder(null);

      // Fetch tracking details from backend endpoint
      const res = await fetch(`/api/orders/${cleanId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Order tracking ID not found. Verify the code and try again.");
        }
        throw new Error("Failed to fetch order details. Please try again later.");
      }

      const data = await res.json();
      setOrder(data);
    } catch (err: unknown) {
      console.error("❌ Search tracking order error:", err);
      const errMsg = err instanceof Error ? err.message : "Lookup failed.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTrackingId.trim()) return;

    // Update query params to support browser history updates and bookmarking
    router.push(`/track-order?trackingId=${inputTrackingId.trim()}`);
  };

  // Status mapping to integer steps (0 to 3) for the status stepper
  const getStepIndex = (status: string) => {
    switch (status) {
      case "Pending":
      case "Failed":
        return 0;
      case "Paid":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const steps = [
    { label: "Order Placed", desc: "Order details received" },
    { label: "Processing", desc: "Crafting fine pieces" },
    { label: "Shipped", desc: "Dispatched via secure mail" },
    { label: "Delivered", desc: "Arrived at destination" },
  ];

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl font-light text-neutral-900 tracking-wide">
          Track Your Masterpiece
        </h1>
        <p className="text-sm font-light text-neutral-500 max-w-md mx-auto leading-relaxed">
          Enter your unique fulfillment tracking ID below to follow the journey of your hand-finished jewelry.
        </p>
      </div>

      {/* Lookup Card Form */}
      <form onSubmit={onSubmit} className="max-w-md mx-auto flex gap-3">
        <input
          type="text"
          placeholder="e.g. LG-ABCD-1234"
          value={inputTrackingId}
          onChange={(e) => setInputTrackingId(e.target.value)}
          className="flex-1 rounded-sm border border-neutral-300 px-4 py-2 text-sm font-sans placeholder-neutral-400 focus:border-amber-600 focus:outline-none tracking-wider font-medium uppercase"
        />
        <Button type="submit" variant="gold" className="px-6 font-semibold" disabled={loading}>
          {loading ? "Searching..." : "Track"}
        </Button>
      </form>

      {/* Loading Spin Screen */}
      {loading && (
        <div className="py-20 text-center">
          <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-light text-neutral-400">Retrieving fulfillment log...</p>
        </div>
      )}

      {/* Error State Banner */}
      {error && (
        <div className="max-w-md mx-auto p-4 text-center rounded-sm border border-red-100 bg-red-50 text-sm text-red-600 font-sans">
          {error}
        </div>
      )}

      {/* Order Tracking Dashboard Details */}
      {order && (
        <div className="border border-neutral-100 bg-white p-6 sm:p-8 rounded-sm shadow-sm space-y-10 animate-[fadeIn_0.3s_ease-out]">
          {/* Dashboard Summary Header */}
          <div className="flex flex-col sm:flex-row justify-between border-b border-neutral-100 pb-6 gap-4">
            <div>
              <span className="text-neutral-400 text-xs font-sans font-semibold uppercase tracking-wider block">
                Fulfillment Tracking ID
              </span>
              <span className="font-mono text-lg font-bold text-neutral-900 tracking-wide select-all uppercase">
                {order.trackingId}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-neutral-400 text-xs font-sans font-semibold uppercase tracking-wider block">
                Total Charge
              </span>
              <span className="font-serif text-lg font-semibold text-amber-800">
                ${(order.totalAmount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* 🎨 VISUAL STATUS STEPPER */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans border-b border-neutral-100 pb-2">
              Delivery Progress Stage
            </h3>

            {/* Stepper Timeline Graphics */}
            <div className="relative py-8">
              {/* Connection progress bar background line */}
              <div className="absolute top-[35px] left-[12%] right-[12%] h-[2px] bg-neutral-200 -z-10" />
              {/* Active filled line highlights */}
              <div
                className="absolute top-[35px] left-[12%] h-[2px] bg-amber-600 transition-all duration-500 -z-10"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 76}%` }}
              />

              <div className="grid grid-cols-4 text-center">
                {steps.map((step, idx) => {
                  const isActive = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={idx} className="flex flex-col items-center group">
                      {/* Step Circle Pin */}
                      <div
                        className={`h-[18px] w-[18px] rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-amber-600 border-amber-600 text-white shadow-sm ring-4 ring-amber-100"
                            : "bg-white border-neutral-300 text-neutral-400"
                        }`}
                      >
                        {isActive && (
                          <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                      </div>

                      {/* Step Labels */}
                      <span
                        className={`mt-4 text-xs font-medium tracking-wide font-sans block ${
                          isCurrent
                            ? "text-amber-800 font-semibold"
                            : isActive
                            ? "text-neutral-900"
                            : "text-neutral-400"
                        }`}
                      >
                        {step.label}
                      </span>
                      
                      {/* Step Description */}
                      <span className="hidden sm:block text-[10px] font-light text-neutral-400 mt-1 max-w-[120px] leading-tight">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Two Column details split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Left Column: Items purchased list */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans border-b border-neutral-100 pb-2">
                Order Items
              </h3>
              <div className="space-y-4 divide-y divide-neutral-50 pr-2 max-h-[350px] overflow-y-auto">
                {order.items.map((item, idx) => (
                  <div key={idx} className={`flex gap-4 items-center ${idx > 0 ? "pt-4" : ""}`}>
                    <div className="relative h-12 w-12 flex-shrink-0 bg-neutral-50 border border-neutral-100 rounded-sm overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs font-light text-neutral-500">
                        Qty: {item.quantity} • ${(item.price / 100).toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 text-right">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Customer + Address specs */}
            <div className="space-y-6">
              {/* Destination address */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans border-b border-neutral-100 pb-2">
                  Destination Address
                </h3>
                <div className="text-sm font-light text-neutral-600 leading-relaxed">
                  <p className="font-medium text-neutral-900">{order.customerInfo.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p className="uppercase">{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Contact meta specs */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans border-b border-neutral-100 pb-2">
                  Recipient Contact
                </h3>
                <div className="text-sm font-light text-neutral-600">
                  <p>Email: {order.customerInfo.email}</p>
                  <p>Phone: {order.customerInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 🎯 TrackOrderPage
 * 🎯 Main tracker dashboard wrapped in Suspense to permit static compilation of search query params.
 *
 * @returns The rendered Track Order Page markup
 */
export default function TrackOrderPage() {
  return (
    <div className="min-h-[85vh] bg-white">
      <Suspense
        fallback={
          <div className="min-h-[75vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-light text-neutral-400 font-sans">
                Initializing Tracker Workspace...
              </p>
            </div>
          </div>
        }
      >
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
