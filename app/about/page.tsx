/**
 * 📁 app/about/page.tsx
 * 📁 Brand About and Story page.
 * 🎨 Renders curated descriptions of our history, artisan values, and creative team.
 * 🔗 Imports React, motion components, and utility badges.
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * 🎯 AboutPage
 * 🎯 Brand overview, philosophy, and team profiles.
 *
 * @returns The rendered About page markup
 */
export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const team = [
    {
      name: "Aurelia Thorne",
      role: "Creative Director",
      bio: "With over 20 years in high jewelry design, Aurelia shapes our collections combining classic silhouettes with modern shapes.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Marcus Vane",
      role: "Master Goldsmith",
      bio: "Marcus ensures every weld, setting, and polish reflects the absolute pinnacle of hand-finished metalwork craftsmanship.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Dr. Elena Rostova",
      role: "Lead Gemologist",
      bio: "Elena hand-selects every diamond and precious gemstone, verifying strict ethical conflict-free origins and visual fire.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const values = [
    {
      title: "Ethical Sourcing",
      desc: "Every diamond and gemstone in our studio is verified conflict-free, adhering strictly to the Kimberly Process.",
    },
    {
      title: "Artisanal Craft",
      desc: "We reject mass factory casting. Every ring, necklace, and earring is detailed individually by master hands.",
    },
    {
      title: "Circular Luxury",
      desc: "Our gold, silver, and platinum are sourced from 100% recycled luxury streams to reduce mining impacts.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Brand Intro Hero Banner */}
      <div className="bg-neutral-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-6 text-center space-y-6"
        >
          <motion.span variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-amber-500 font-sans">
            Our Legacy
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-serif text-4xl sm:text-5xl font-light text-neutral-100 tracking-wide">
            Crafting Silent Stories
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm font-light text-neutral-400 leading-relaxed font-sans max-w-xl mx-auto">
            LuxeGems was established in 2021 on a simple promise: to elevate jewelry design from simple ornament to personalized wearable histories.
          </motion.p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 space-y-28">
        
        {/* Brand Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl font-light text-neutral-900">
              The Art of Fine Craftsmanship
            </h2>
            <div className="space-y-4 text-sm font-light text-neutral-500 leading-relaxed font-sans">
              <p>
                Our designs emerge from our studio in downtown San Francisco, where draftsmen, gemologists, and smiths work side-by-side. By centralizing design and fabrication under one roof, we eliminate unnecessary middlemen markups while preserving full control over quality.
              </p>
              <p>
                We believe fine jewelry shouldn&apos;t be reserved for special events. Each piece is constructed with daily wear resilience in mind, engineered using advanced mounting configurations to secure every stone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="aspect-[4/3] rounded-sm bg-neutral-100 overflow-hidden border border-neutral-150"
          >
            {/* ⚡ fill + sizes serves responsive resolutions; this image is purely decorative/editorial */}
            <Image
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800&auto=format&fit=crop"
              alt="Artisan studio work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Brand Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900">
              Our Core Convictions
            </h2>
            <p className="text-xs font-light text-neutral-400 max-w-sm mx-auto font-sans">
              How we construct, detail, and source our collections defines our values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="border border-neutral-100 rounded-sm bg-neutral-50 p-8 space-y-3 text-center"
              >
                <h3 className="font-serif text-lg font-medium text-neutral-900">
                  {v.title}
                </h3>
                <p className="text-xs font-light text-neutral-500 leading-relaxed font-sans">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Creative Team Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900">
              The Creative Team
            </h2>
            <p className="text-xs font-light text-neutral-400 max-w-sm mx-auto font-sans">
              Meet the design draftsmen and goldsmiths bringing LuxeGems pieces to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="relative h-48 w-48 rounded-full overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
                  {/* ⚡ fill inside a fixed 192×192 parent; grayscale filter for editorial team look */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="192px"
                    className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-neutral-900">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-600 font-sans uppercase tracking-wider block">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs font-light text-neutral-500 leading-relaxed max-w-xs font-sans">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
