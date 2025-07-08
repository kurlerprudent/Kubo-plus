// components/landing/TeamShowcase.tsx
"use client";

import { motion, useInView, stagger } from "framer-motion";
import { useEffect, useRef } from "react";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Nsiah Kofi Denis",
    role: "Software Engineer && Co-Founder",
    avatar: "https://via.placeholder.com/200?text=Dr.+Nsiah",
    bio: "CS major at University of Ghana. Passionate about AI in healthcare.",
  },
  {
    name: "Thomas Kangah",
    role: "CEO & Founder",
    avatar: "https://via.placeholder.com/200?text=Thomas+Kangah",
    bio: "Tech entrepreneur with 10+ years in health tech & business development.",
  },
  {
    name: "Eugene Baidoo",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Eugene+Baidoo",
    bio: "CS major at University of Ghana. Passionate about building scalable web applications.",
  },
  {
    name: "Ryan Brown",
    role: "AI Specialist",
    avatar: "https://via.placeholder.com/200?text=Ryan+Brown",
    bio: "Statistics major at University of Ghana. Focused on machine learning and data analysis.",
  },
  {
    name: "Michael Oduro",
    role: "Radiographer",
    avatar: "https://via.placeholder.com/200?text=Michael+Oduro",
    bio: "Experienced radiographer with a focus on AI applications in medical imaging.",
  },
  {
    name: "Geraldine Essilfua Enu",
    role: "Med Lab Specialist",
    avatar: "https://via.placeholder.com/200?text=Geraldine+Essilfua+Enu",
    bio: "Med Lab Specialist with a focus on AI applications in diagnostics.",
  },
  {
    name: "Michael Perry",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Michael+Perry",
    bio: "CS major at University of Ghana. Software Engineer with a passion for developing innovative AI solutions.",
  },
  {
    name: "Obed Sarkodie",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Obed+Sarkodie",
    bio: "CS major at University of Ghana. Software Engineer with a focus on AI and web development.",
  },
];


export function TeamShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-800/70"
      ref={ref}
    >
      {/* Animated decorative bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ 
          width: "100%",
          opacity: isInView ? 0.5 : 0
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-24 left-0 h-1 bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5]"
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Our AI Healthcare Pioneers
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            World-class team building ethical AI for Africa's healthcare transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                type: "spring"
              }}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-6 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(79,209,197,0.3)]">
                {/* Avatar with teal border gradient */}
                <div className="mb-6">
                  <div className="relative inline-block rounded-full p-1 bg-gradient-to-br from-[#2C7A7B] to-[#4FD1C5]">
                    <div className="bg-slate-700 rounded-full p-1">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] mb-2" />
                  <p className="text-cyan-200 font-medium">
                    {member.role}
                  </p>
                </div>
                
                <p className="text-slate-400 mb-6">
                  {member.bio}
                </p>
                
                <div className="flex space-x-3">
                  {[Linkedin, Twitter, Mail].map((Icon, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ 
                        y: -3,
                        backgroundColor: '#2C7A7B'
                      }}
                      className="p-2 rounded-full bg-slate-700 text-slate-300 cursor-pointer transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}