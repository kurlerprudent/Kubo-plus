"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  DownloadCloud,
  Plus,
  Minus,
} from 'lucide-react';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const faqs = [
  {
    question: 'Is patient data encrypted?',
    answer:
      'Yes, all patient data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols.',
  },
  {
    question: 'Do we share medical images?',
    answer:
      'No, medical images are never shared with third parties without explicit consent from the patient.',
  },
  {
    question: 'How do we ensure compliance?',
    answer:
      'We adhere to HIPAA and GDPR regulations, performing regular audits and vulnerability assessments.',
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pt-20 px-4 md:px-16">
      

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center text-center py-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-semibold tracking-wide"
          variants={item}
          whileHover={{ scale: 1.02, textShadow: '0 0 10px rgb(14,165,233)' }}
        >
          Your Data is Safe with Us
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-sky-300"
          variants={item}
        >
          We protect your information with cutting-edge security measures.
        </motion.p>
        {/* Optional SVG decoration could go here */}
      </motion.section>

      {/* Features Grid */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {[
          { Icon: ShieldCheck, title: 'Secure Encryption', desc: 'AES-256 bit encryption for all data.' },
          { Icon: Fingerprint, title: 'Strong Password Hashing', desc: 'Your passwords are are not made visible to anyone.' },
          { Icon: KeyRound, title: 'Key Management', desc: 'Secure key rotation and storage.' },
          { Icon: ShieldCheck, title: 'Continuous Monitoring', desc: '24/7 threat detection.' },
        ].map(({ Icon, title, desc }, i) => (
          <motion.div key={i} variants={item}>
            <Card className="hover:scale-105 hover:border hover:border-sky-500 transition-transform">
              <CardHeader>
                <Icon className="mx-auto text-sky-400" size={32} />
                <CardTitle className="mt-2 text-center">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* FAQ Accordion */}
      <motion.section
        className="max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        <Accordion type="single" collapsible>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="group">
                <span>{faq.question}</span>
                <motion.span
                  className="ml-auto"
                  whileHover={{ scale: 1.1 }}
                >
                  <Plus className="group-data-[state=open]:hidden" />
                  <Minus className="hidden group-data-[state=open]:inline" />
                </motion.span>
              </AccordionTrigger>
              <AccordionContent className="text-sky-200">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.8 } }}
      >
        <Button
          size="lg"
          className="relative overflow-hidden border border-sky-500 hover:shadow-lg hover:shadow-sky-500/50"
        >
          <DownloadCloud className="mr-2" />
          Download Full Security Policy
        </Button>
      </motion.section>
    </div>
  );
}
