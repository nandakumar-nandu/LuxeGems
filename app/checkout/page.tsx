/**
 * 📁 app/checkout/page.tsx
 * 📁 Checkout Form page.
 * 🎨 Multi-step checkout form flow incorporating client validation with Zod and React Hook Form.
 * 🔗 Imports React hook states, context hooks, Zod validation models, and FormField atoms.
 */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { formatPrice, cn } from "@/lib/utils";

// ⚙️ Define validation schemas for checkout steps using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  // 🔒 Name must be at least 2 characters long
  email: z.string().email("Please enter a valid email address"),
  // 🔒 Email must be valid format
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  // 🔒 Phone number must be at least 10 characters long
});

const shippingSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters long"),
  // 🔒 Address must be at least 5 characters long
  city: z.string().min(2, "City must be at least 2 characters long"),
  // 🔒 City must be at least 2 characters long
  state: z.string().min(2, "State must be at least 2 characters long"),
  // 🔒 State must be at least 2 characters long
  zip: z.string().min(5, "ZIP code must be at least 5 characters long"),
  // 🔒 ZIP code must be at least 5 characters long
  country: z.string().min(2, "Country must be at least 2 characters long"),
  // 🔒 Country must be at least 2 characters long
});

// Combine the schemas into a unified checkout schema
const checkoutSchema = contactSchema.merge(shippingSchema);
type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * 🎯 CheckoutPage
 * 
 * 🎯 Purpose:
 * Manages the multi-step client checkout process. Displays validation indicators,
 * gathers contact details and shipping locations, presents order items for review, and handles submissions.
 *
 * @returns The rendered Checkout Page markup
 */
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    },
  });

  // ⚙️ Constant placeholder values for order totals calculation
  const shippingCharge = 0; // Complimentary standard shipping for luxury jewelry
  const estimatedTax = 0; // Tax calculated during final checkout steps
  const orderTotal = totalPrice + shippingCharge + estimatedTax;

  // ⚙️ Move to the next step after running validations on target fields
  const handleNextStep = async () => {
    if (step === 1) {
      // Validate Contact Info fields
      const isStep1Valid = await trigger(["name", "email", "phone"]);
      if (isStep1Valid) setStep(2);
    } else if (step === 2) {
      // Validate Shipping Address fields
      const isStep2Valid = await trigger(["address", "city", "state", "zip", "country"]);
      if (isStep2Valid) setStep(3);
    }
  };

  // ⚙️ Return to the previous step in the form layout
  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // ⚙️ Handle checkout order placement
  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Post checkout specs to API route
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          })),
          customerInfo: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          shippingAddress: {
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country,
          },
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create checkout session. Please try again.");
      }

      const resData = await response.json();
      
      // Clear the local shopping cart state upon purchase completion
      clearCart();

      // Redirect client to secure Stripe checkout or simulated URL
      window.location.href = resData.checkoutUrl;
    } catch (err: unknown) {
      console.error("❌ Checkout submit error:", err);
      const errMsg = err instanceof Error ? err.message : "Checkout failed. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Renders loading overlay
  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-light text-neutral-400 font-sans tracking-wide">
            Preparing secure checkout portal...
          </p>
        </div>
      </div>
    );
  }

  // Renders standard checkout form when cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <p className="font-serif text-lg text-neutral-600">Your cart is empty</p>
          <Link href="/shop">
            <Button variant="gold" size="md">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, name: "Contact Info" },
    { num: 2, name: "Shipping" },
    { num: 3, name: "Review Order" },
  ];

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 🎨 STEP INDICATOR HEADER */}
        {/* Horizontal layout tracking current form position */}
        <div className="mx-auto max-w-3xl mb-12">
          <div className="flex items-center justify-between relative">
            {/* Background line connecting indicator dots */}
            <div className="absolute left-0 top-1/2 h-[1px] w-full bg-neutral-200 -z-10" />

            {stepsList.map((s) => {
              const isCompleted = step > s.num;
              const isActive = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center space-y-2 bg-white px-4">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold font-sans border transition-all duration-300",
                      isCompleted && "bg-emerald-600 border-emerald-600 text-white",
                      isActive && "bg-neutral-900 border-neutral-900 text-white ring-4 ring-neutral-100",
                      !isActive && !isCompleted && "bg-neutral-50 border-neutral-200 text-neutral-400"
                    )}
                  >
                    {isCompleted ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-wider font-semibold font-sans",
                      isActive ? "text-neutral-900" : "text-neutral-400"
                    )}
                  >
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PRIMARY FORM WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* LEFT CONTAINER: MULTI-STEP PANELS */}
          <div className="lg:col-span-7 rounded-sm border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* STEP 1: CONTACT INFO PANEL */}
              {step === 1 && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-neutral-900">Contact Information</h2>
                    <p className="text-xs text-neutral-400 font-light mt-1">
                      Provide your full contact specifications for transaction verification.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Full Name"
                      placeholder="e.g. Jane Doe"
                      error={errors.name?.message}
                      {...register("name")}
                    />

                    <FormField
                      label="Email Address"
                      placeholder="e.g. jane.doe@example.com"
                      type="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />

                    <FormField
                      label="Phone Number"
                      placeholder="e.g. 555-0199"
                      type="tel"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING ADDRESS PANEL */}
              {step === 2 && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-neutral-900">Shipping Location</h2>
                    <p className="text-xs text-neutral-400 font-light mt-1">
                      Enter the secure residential destination for handcrafted jewelry logistics.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Street Address"
                      placeholder="e.g. 742 Evergreen Terrace"
                      error={errors.address?.message}
                      {...register("address")}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="City"
                        placeholder="e.g. Springfield"
                        error={errors.city?.message}
                        {...register("city")}
                      />

                      <FormField
                        label="State / Province"
                        placeholder="e.g. IL"
                        error={errors.state?.message}
                        {...register("state")}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="ZIP / Postal Code"
                        placeholder="e.g. 62704"
                        error={errors.zip?.message}
                        {...register("zip")}
                      />

                      <FormField
                        label="Country"
                        placeholder="e.g. United States"
                        error={errors.country?.message}
                        {...register("country")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ORDER REVIEW PANEL */}
              {step === 3 && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <h2 className="font-serif text-lg font-medium text-neutral-900">Order Verification</h2>
                    <p className="text-xs text-neutral-400 font-light mt-1">
                      Inspect your client profile specifications and shipment destination details.
                    </p>
                  </div>

                  {/* Summary lists */}
                  <div className="space-y-4 divide-y divide-neutral-100 rounded-sm border border-neutral-100 bg-neutral-50/50 p-5 text-sm text-neutral-700">
                    
                    {/* Contact review */}
                    <div className="space-y-2 pb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">
                        Client Specifications
                      </h4>
                      <p className="font-medium text-neutral-800">{getValues("name")}</p>
                      <p className="text-xs font-light text-neutral-500">{getValues("email")} • {getValues("phone")}</p>
                    </div>

                    {/* Shipping address review */}
                    <div className="space-y-2 pt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">
                        Destination Address
                      </h4>
                      <p className="font-medium text-neutral-800">{getValues("address")}</p>
                      <p className="text-xs font-light text-neutral-500">
                        {getValues("city")}, {getValues("state")} {getValues("zip")} • {getValues("country")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Warning Display */}
              {error && (
                <div className="p-3 text-xs bg-red-50 border border-red-100 text-red-600 rounded-sm font-sans animate-[fadeIn_0.2s_ease-out]">
                  {error}
                </div>
              )}

              {/* 🎨 STEP NAVIGATION ACTION TRIGGERS */}
              <div className="flex justify-between border-t border-neutral-100 pt-6 mt-6">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-neutral-300 text-neutral-600 hover:text-neutral-900"
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button type="button" variant="primary" onClick={handleNextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" variant="gold" className="font-semibold">
                    Place Order
                  </Button>
                )}
              </div>

            </form>
          </div>

          {/* RIGHT CONTAINER: MINI BASKET REVIEW */}
          <div className="lg:col-span-5 rounded-sm border border-neutral-100 bg-neutral-50 p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-4">
              Your Items
            </h3>

            {/* Scrollable list */}
            <div className="max-h-[320px] overflow-y-auto space-y-4 pr-2 divide-y divide-neutral-200/60">
              {items.map((item, index) => (
                <div key={item.id} className={cn("flex items-center gap-3 pt-3", index === 0 && "pt-0")}>
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-200/20">
                    {/* ⚡ Fixed 56×56 dimensions prevent CLS; object-cover fills the container cleanly */}
                    <Image src={item.image} alt={item.name} width={56} height={56} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-semibold text-neutral-800 truncate pr-2">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-light mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-sans text-xs font-semibold text-neutral-800 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals panel */}
            <div className="border-t border-neutral-200 pt-4 space-y-3.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-950">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-amber-600 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200/80 pt-3 text-sm text-neutral-900 font-medium">
                <span className="font-serif">Grand Total</span>
                <span className="font-bold">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
