// components/landing/HeroSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Premium Background with Subtle Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image-2.jpg" // Use high-quality medical/tech image
          alt="Advanced medical technology"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          quality={100}
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-indigo-900/30" />
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 z-1 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10" />

      {/* Animated Glow Effects */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px]"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 7, delay: 1 }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Headline with Premium Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              <motion.span 
                className="block mb-3 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Precision Diagnostics
              </motion.span>
              <motion.span 
                className="block font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                Revolutionized
              </motion.span>
            </h1>
            
            {/* Subtext with Animated Border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="relative pl-5 border-l-2 border-cyan-400/40 my-8"
            >
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Cutting-edge imaging analysis delivering unprecedented accuracy in disease detection through advanced neural networks.
              </p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Link href="/sign-up">
                  <span className="mr-3">Get Started</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="text-white text-lg px-8 py-6 rounded-lg bg-transparent border-white/30 hover:bg-white/10 hover:border-white/50 transition-colors duration-300"
              >
                <Link href="/demo">
                  <span>View Demo</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

         
        </div>
      </div>

      {/* Animated Scrolling Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm tracking-wider">SCROLL TO EXPLORE</span>
          <div className="mt-2 w-px h-8 bg-gradient-to-t from-cyan-400 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}