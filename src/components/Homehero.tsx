// components/landing/HeroSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image + Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg1.jpg"
          alt="Advanced radiology equipment"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="inline-block bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 mb-5"
          >
            <span className="text-base sm:text-lg font-semibold text-white">
              AI-Powered Diagnostics
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="block"
            >
              Revolutionizing
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Medical Imaging Analysis
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed"
          >
            Leveraging deep learning to deliver fast, accurate, and accessible lung-disease detection from X-ray images.
          </motion.p>

          {/* CTA + Role Dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="
                    bg-gradient-to-r from-blue-500 to-cyan-500 
                    hover:from-blue-600 hover:to-cyan-600 
                    text-white text-lg 
                    px-8 py-4 
                    rounded-full 
                    shadow-lg 
                    transform transition-transform duration-200 ease-in-out hover:scale-105
                  "
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Get Started
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-lg bg-white/90 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/login?role=patient">
                    <a className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                      As Patient
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login?role=doctor">
                    <a className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                      As Doctor
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login?role=admin">
                    <a className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                      As Admin
                    </a>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="lg"
              className="
                border-white/60 
                text-white text-lg 
                px-8 py-4 
                rounded-full 
                shadow-lg 
                bg-transparent 
                hover:bg-white/20 
                transform transition-transform duration-200 ease-in-out hover:scale-105
              "
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
