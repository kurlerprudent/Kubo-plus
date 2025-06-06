// components/landing/ServicesSection.tsx
"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import {
  BrainCircuit,
  ClipboardCheck,
  MessageSquare,
  Briefcase,
  Settings,
  Box,
} from "lucide-react";

const services = [
  {
    icon: <BrainCircuit className="w-8 h-8" />,
    title: "AI Medical Diagnostics",
    description:
      "End-to-end analysis of X-ray, CT, MRI, and ultrasound with 98.7% accuracy.",
    accent: "from-green-400 to-emerald-500",
    bgImage: "url('https://images.unsplash.com/photo-1581595219318-04bc0b7a6d96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Clinical Decision Support",
    description:
      "Context-aware recommendations, risk scores, and second-opinion workflows.",
    accent: "from-blue-400 to-cyan-600",
    bgImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "AI Chatbot for Public Health",
    description:
      "Conversational agent fine-tuned on BioMed models, offering trusted guidance.",
    accent: "from-purple-400 to-indigo-500",
    bgImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "AI Enterprise Consultancy",
    description:
      "Strategic AI advisory, POC development, and deployment support for healthcare orgs.",
    accent: "from-amber-400 to-orange-500",
    bgImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Customized AI Services",
    description:
      "Model fine-tuning, data integration, and regulatory compliance tailored to you.",
    accent: "from-rose-400 to-pink-500",
    bgImage: "url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "AI Applications & Integrations",
    description:
      "Next.js frontends, Node.js APIs, and mobile SDKs—seamless embedding of AI features.",
    accent: "from-teal-400 to-cyan-500",
    bgImage: "url('https://images.unsplash.com/photo-1629909613657-27f26aec1c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
  },
];

export function ServicesSection() {
  const { scrollYProgress } = useScroll();
  // Create more dynamic background movement
  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Enhanced moving background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-cyan-100/50 to-blue-100/50 dark:from-slate-800 dark:to-slate-900"
        style={{
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            <span className="text-white text-sm font-medium tracking-wider">HEALTHTECH SERVICES</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Our AI-Powered Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to transform healthcare delivery across Africa
          </p>
        </motion.div>

        {/* Modern Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="group relative h-full"
            >
              {/* Background image */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-cover bg-center transition-all duration-700 group-hover:scale-110 z-0"
                style={{ backgroundImage: svc.bgImage }}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${svc.accent} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
              </div>
              
              {/* Card Content */}
              <div className="relative z-10 h-full bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Icon with gradient background */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`p-3 bg-gradient-to-br ${svc.accent} rounded-xl flex-shrink-0 shadow-md`}
                    >
                      <span className="text-white">
                        {svc.icon}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white">
                      {svc.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-200 mb-6 flex-grow">
                    {svc.description}
                  </p>

                  {/* Enhanced Learn More button */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center text-cyan-300 font-medium pt-4 border-t border-white/20">
                      <span className="mr-2">Explore Service</span>
                      <motion.svg
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          {[
            { value: "98.7%", label: "Diagnostic Accuracy" },
            { value: "500k+", label: "Medical Scans Analyzed" },
            { value: "24/7", label: "AI Support" },
            { value: "95%+", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}