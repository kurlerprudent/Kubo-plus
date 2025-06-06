// app/page.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, BrainCircuit, Languages, MessageSquare, BarChart2, Users, Zap } from "lucide-react";

export default function FeaturesGrid() {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for different sections
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const parallaxY5 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const parallaxY6 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const parallaxY7 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div className="relative">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 z-50 -translate-y-1/2 space-y-4">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-white border border-slate-300"
            animate={{
              scale: scrollYProgress.get() > i/7 ? 1.2 : 1,
              backgroundColor: scrollYProgress.get() > i/7 ? "#10b981" : "white"
            }}
          />
        ))}
      </div>

      {/* Section 1: Vision & Overview */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581595219318-04bc0b7a6d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY1
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/90" />
        
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mb-6">
            <span className="text-white text-sm font-medium tracking-wider">HEALTHTECH 4 AFRICA</span>
          </div>
          
          <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transforming Healthcare in Africa
          </motion.h1>
          
          <motion.p className="text-xl text-slate-200 max-w-3xl mx-auto">
            To become Africa's leading HealthTech innovation hub—empowering clinicians, researchers, and patients with AI-driven diagnostics and conversational support.
          </motion.p>
          
          <motion.div 
            className="mt-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-10 h-10 mx-auto border-t-2 border-r-2 border-white rotate-45" />
            <span className="text-white text-sm mt-2">Scroll to begin</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Phase 1: AI X-Ray Platform */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY2
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <motion.div 
            className="max-w-xl ml-8 md:ml-16 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white">1</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">AI X-Ray Platform</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
              We trained our deep-learning model on 500,000+ annotated chest X-rays to achieve 98.7% accuracy in under 5 seconds. End-to-end encrypted, HIPAA-compliant storage ensures patient privacy and continuous model monitoring.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BrainCircuit className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">AI-Powered Analysis</h3>
                  <p className="text-slate-600 text-sm">Trained on 500k+ annotated scans</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">Real-time Inference & Reporting</h3>
                  <p className="text-slate-600 text-sm">Results in under 5 seconds</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">HIPAA-Compliant Storage</h3>
                  <p className="text-slate-600 text-sm">End-to-end encrypted patient data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Phase 2: Multimodal Imaging */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1612531386530-97286f1f68d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10 h-full flex items-center justify-end">
          <motion.div 
            className="max-w-xl mr-8 md:mr-16 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white">2</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Multimodal Imaging</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
              Building beyond X-rays—our pipeline now ingests CT, MRI, ultrasound, and pathology slides. A single multimodal encoder processes text, audio, and images to deliver accurate insights across all modalities.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-5 rounded-lg border border-emerald-100 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-800">Broad Diagnostic Coverage</h3>
                <p className="text-slate-600">CT, MRI, Ultrasound, Pathology</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Phase 3: Health Chatbot Agent */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10 h-full flex flex-col justify-end items-center pb-20">
          <motion.div 
            className="max-w-2xl w-full p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl mx-auto"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white">3</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Health Chatbot Agent</h2>
            </div>
            
            <p className="text-slate-600 text-center mb-8">
              A conversational assistant fine-tuned on BioMed models (e.g., MedPalm 2) that reasons over patient history. We use Retrieval-Augmented Generation (RAG) to ground every response in verified clinical guidelines—no hallucinations.
            </p>
            
            <div className="text-center">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Learn More <ArrowRight size={18} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Phase 4: Multilingual Reach */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1629909613657-27f26aec1c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY5
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <motion.div 
            className="max-w-xl ml-8 md:ml-16 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white">4</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Multilingual Models</h2>
            </div>
            
            <p className="text-slate-600 mb-8">
              From day one, we serve all of Africa: English, Français, العربية, Kiswahili, Hausa, Yoruba, Twi, and more. Our encoder's text path accepts multiple languages; our decoder translates results in real time—bridging gaps between patients and providers.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['English', 'Français', 'العربية', 'Kiswahili', 'Hausa', 'Yoruba', 'Twi'].map((lang, i) => (
                <motion.div 
                  key={i}
                  className="px-4 py-2 bg-slate-100 rounded-full text-slate-800 text-sm font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {lang}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Goal: 95%+ Accuracy & Clinical Validation */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10 h-full flex items-center justify-end">
          <motion.div 
            className="max-w-xl mr-8 md:mr-16 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white">G</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">95%+ Accuracy Goal</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
              Every prediction is validated by board-certified radiologists and clinical experts. We aim for ≥ 95% diagnostic accuracy, because any misdiagnosis carries serious medico-legal consequences.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BarChart2 className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">Radiologist-Reviewed Models</h3>
                  <p className="text-slate-600 text-sm">Board-certified validation of every prediction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">Second-Opinion Workflow & Auditing</h3>
                  <p className="text-slate-600 text-sm">Robust quality control systems</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BrainCircuit className="w-6 h-6 text-emerald-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-800">Continuous Model Improvement</h3>
                  <p className="text-slate-600 text-sm">CI/CD pipelines for ongoing enhancement</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
            y: parallaxY7
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/90" />
        
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <Users className="w-8 h-8 text-emerald-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Join Us in Transforming Healthcare</h2>
          </div>
          
          <motion.p className="text-xl text-slate-200 max-w-3xl mx-auto mb-12">
            We're building an ecosystem of developers, clinicians, researchers, and partners to bring this platform to life. If you have expertise in AI, cloud architecture, medical imaging, or want to support improved health outcomes, let's talk.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.button>
            
            <motion.button 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
          
        
        </motion.div>
      </section>
    </div>
  );
}