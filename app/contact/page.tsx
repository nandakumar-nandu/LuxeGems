/**
 * 📁 app/contact/page.tsx
 * 📁 Client contact and messaging form page.
 * 🎨 Validates contact specs via React Hook Form/Zod, dispatches templates via EmailJS, and fires Toasts.
 * 🔗 Imports React, Hook Form, Zod resolver, EmailJS adapters, FormFields, and toasts.
 */

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (minimum 2 characters)"),
  email: z.string().email("Please enter a valid email address (e.g. name@domain.com)"),
  message: z.string().min(10, "Your message must contain at least 10 characters detailing your request"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * 🎯 ContactPage
 * 🎯 Renders the contact inquiries submission portal using email dispatch adapters and validator hooks.
 *
 * @returns The rendered Contact Page markup
 */
export default function ContactPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      setLoading(true);

      // Simulation mode if credentials are not configured
      if (!serviceId || !templateId || !publicKey) {
        console.warn("⚠️ EmailJS variables missing. Operating in Simulation Mode.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("📨 Simulated Contact Form Message:", data);
        showToast("Your message was dispatched successfully! (Simulation Mode)", "success");
        reset();
        return;
      }

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (result.status === 200) {
        showToast("Thank you! Your message has been sent successfully.", "success");
        reset();
      } else {
        throw new Error("Unable to send message via EmailJS.");
      }
    } catch (err: unknown) {
      console.error("❌ Send contact message error:", err);
      const errMsg = err instanceof Error ? err.message : "Message dispatch failed.";
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left info column */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-sans block">
              Contact Us
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 leading-tight">
              Get in Touch
            </h1>
            <p className="text-sm font-light text-neutral-500 leading-relaxed font-sans">
              Have questions regarding ring sizing, custom material selections, or shipping logs? Fill out our form or contact our showroom directly.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-neutral-100 text-sm font-light text-neutral-600 font-sans">
            <div>
              <p className="font-medium text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Showroom Address
              </p>
              <p>120 Gallery Row, Suite 400</p>
              <p>San Francisco, CA 94108</p>
            </div>
            <div>
              <p className="font-medium text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Direct Support
              </p>
              <p>Email: concierge@luxegems.com</p>
              <p>Phone: +1 (415) 555-0198</p>
            </div>
            <div>
              <p className="font-medium text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Concierge Hours
              </p>
              <p>Monday - Friday: 10:00 AM - 6:00 PM PST</p>
              <p>Saturday: 11:00 AM - 4:00 PM PST</p>
            </div>
          </div>
        </div>

        {/* Right form column */}
        <div className="md:col-span-7 bg-neutral-50 border border-neutral-100 p-6 sm:p-8 rounded-sm shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              label="Full Name"
              placeholder="concierge will address you by name"
              error={errors.name?.message}
              {...register("name")}
            />

            <FormField
              label="Email Address"
              type="email"
              placeholder="e.g. customer@concierge.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Custom text area layout since FormField is typed as input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-sans block">
                Your Inquiry Message
              </label>
              <textarea
                rows={5}
                placeholder="Describe your design parameters, gemstone sizing requests, or delivery timelines..."
                {...register("message")}
                className={`w-full rounded-sm border px-3 py-2 text-sm font-sans placeholder-neutral-400 focus:border-amber-600 focus:outline-none transition-colors ${
                  errors.message ? "border-red-500" : "border-neutral-300"
                }`}
              />
              {errors.message?.message && (
                <p className="text-xs text-red-500 font-sans mt-0.5">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-semibold uppercase tracking-wider py-3 animate-[fadeIn_0.2s_ease-out]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Inquiry"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
