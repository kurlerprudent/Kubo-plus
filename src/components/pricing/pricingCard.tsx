// components/pricing/PricingCard.tsx

"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  per: string;
  features: string[];
  cta: string;
}

export default function PricingCard({ title, description, price, per, features, cta }: PricingCardProps) {
  return (
    <motion.div
      className="bg-[#121826] p-6 rounded-2xl shadow-lg flex flex-col"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-[#94a3b8] mb-4">{description}</p>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-bold text-[#10BCE3]">${price}</span>
        <span className="text-sm text-[#94a3b8]">{per}</span>
      </div>
      <ul className="mb-6 space-y-2 flex-1">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-center">
            <span className="inline-block w-2 h-2 bg-[#10BCE3] rounded-full mr-3" />
            <span className="text-sm text-white">{feat}</span>
          </li>
        ))}
      </ul>
      <Button className="bg-[#10BCE3] text-black hover:bg-[#00F0FF] rounded-full">
        {cta}
      </Button>
    </motion.div>
  );
}