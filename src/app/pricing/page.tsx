"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ToggleSwitch from "@/components/pricing/ToggleSwitch";
import PricingCard from "@/components/pricing/pricingCard";
import PricingTable from "@/components/pricing/pricingTable";
import CTA from "@/components/pricing/CTA";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      id: 'payg',
      title: 'Pay As You Go',
      description: 'One-off AI-powered chest X-ray scan',
      priceMonthly: 5,
      priceAnnual: 5,
      features: [
        'AI image analysis',
        'Instant diagnostic report',
        'Secure HIPAA-compliant storage'
      ],
      cta: 'Scan Now'
    },
    {
      id: 'monthly',
      title: 'Monthly Subscription',
      description: 'Unlimited scans per month',
      priceMonthly: 99,
      priceAnnual: 99 * 12 * 0.8, // 20% discount annual
      features: [
        'Unlimited X-ray scans',
        'Priority processing',
        'Detailed reports & analytics'
      ],
      cta: 'Subscribe'
    }
  ];

  return (
    <main className="min-h-screen bg-[#0D1117] text-white py-16 px-4">
      {/* Hero */}
      <motion.section
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-[#94a3b8]">
          Flexible pricing for AI-powered chest X-ray diagnostics.
        </p>
      </motion.section>

      {/* Toggle */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <ToggleSwitch
          labelLeft="Monthly"
          labelRight="Annual"
          enabled={annual}
          setEnabled={setAnnual}
        />
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            price={annual ? plan.priceAnnual : plan.priceMonthly}
            per={plan.id === 'payg' ? '/scan' : annual ? '/year' : '/mo'}
            features={plan.features}
            cta={plan.cta}
          />
        ))}
      </motion.div>

      {/* Comparison Table */}
      <motion.section
        className="mt-16 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <PricingTable plans={plans} annual={annual} />
      </motion.section>

      {/* CTA Footer */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <CTA />
      </motion.div>
    </main>
  );
}
