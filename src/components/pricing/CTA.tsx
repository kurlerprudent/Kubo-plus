// components/pricing/CTA.tsx

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <motion.div
      className="text-center py-12 bg-[#121826] rounded-2xl shadow-lg max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">
        Ready to get started?
      </h2>
      <p className="text-sm text-[#94a3b8] mb-6">
        Sign up now and experience the future of AI-powered chest X-ray diagnostics.
      </p>
      <Link href="/signup">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#10BCE3] text-black px-8 py-3 rounded-full font-semibold"
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  );
}
