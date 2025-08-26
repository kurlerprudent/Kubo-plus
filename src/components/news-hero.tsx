"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function NewsHeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black">
      {/* Background Image */}
      <Image
        src="/introduction.jpg" // Replace with your path
        alt="AI Model Update Background"
        fill
        priority
        quality={100}
        className="object-cover object-center opacity-80"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0, y: 50 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
          <Typewriter
            words={["Coming Soon", "AI Innovation", "Future of Healthcare"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl">
          Stay tuned for updates about our AI-powered Chest X-ray Diagnostic System. We&apos;re working on bringing innovative healthcare solutions to the future.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link
            href="/news"
            className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 font-medium shadow-md transition-transform hover:scale-105"
          >
            View News & Events
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
