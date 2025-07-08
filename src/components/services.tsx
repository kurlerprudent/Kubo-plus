"use client";

import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Clinical Decision Support",
    description:
      "Context-aware recommendations, risk scores, and second-opinion workflows.",
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "AI Chatbot for Public Health",
    description:
      "Conversational agent fine-tuned on BioMed models, offering trusted guidance.",
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "AI Enterprise Consultancy",
    description:
      "Strategic AI advisory, POC development, and deployment support for healthcare orgs.",
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Customized AI Services",
    description:
      "Model fine-tuning, data integration, and regulatory compliance tailored to you.",
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "AI Applications & Integrations",
    description:
      "Next.js frontends, Node.js APIs, and mobile SDKs—seamless embedding of AI features.",
    accent: "from-[#2C7A7B] to-[#4FD1C5]",
  },
];

export function ServicesSection() {
  const { scrollYProgress } = useScroll();
  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  
  // Count-up animation for stats
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const stats = [
    { value: 98.7, suffix: "%", label: "Diagnostic Accuracy" },
    { value: 500, suffix: "k+", label: "Medical Scans Analyzed" },
    { value: 24, suffix: "/7", label: "AI Support" },
    { value: 95, suffix: "%+", label: "Client Satisfaction" }
  ];
  
  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background with teal palette */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#2C7A7B]/10 via-[#4FD1C5]/10 to-[#38B2AC]/10 dark:from-slate-800 dark:to-slate-900"
        style={{
          backgroundPositionX: bgX,
          backgroundPositionY: bgY,
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,122,123,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(79,209,197,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            <span className="text-white text-sm font-medium tracking-wider">HEALTHTECH SERVICES</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Our AI-Powered Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to transform healthcare delivery across Africa
          </p>
        </motion.div>

        {/* Service Cards */}
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
              whileHover={{ 
                y: -10,
                scale: 1.03,
              }}
              className="group relative h-full"
            >
              {/* Card with dark background and teal glow */}
              <div className="relative z-10 h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(79,209,197,0.3)]">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Icon with teal background */}
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
                  
                  <p className="text-slate-300 mb-6 flex-grow">
                    {svc.description}
                  </p>

                  {/* Learn More button */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center text-[#4FD1C5] font-medium pt-4 border-t border-slate-700">
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
          ref={statsRef}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700"
            >
              <div className="text-3xl font-bold text-[#4FD1C5]">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  isInView={isInView} 
                />
              </div>
              <div className="text-slate-300 mt-1 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Fixed animated counter component
const AnimatedCounter = ({ 
  value, 
  suffix = "",
  isInView 
}: {
  value: number;
  suffix?: string;
  isInView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      startValueRef.current = displayValue;
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        const duration = 2000;
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // Cubic ease-out function
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValueRef.current + 
            (value - startValueRef.current) * easedProgress;
          
          setDisplayValue(currentValue);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          animationRef.current = null;
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (!isInView && !hasAnimatedRef.current) {
      // Reset only if not animated yet
      setDisplayValue(0);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, value]);

  // Format display value
  const formatValue = (val: number) => {
    if (Number.isInteger(value)) {
      return Math.round(val) + suffix;
    }
    return val.toFixed(1) + suffix;
  };

  return <>{formatValue(displayValue)}</>;
};