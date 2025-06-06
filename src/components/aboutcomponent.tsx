// components/landing/TeamShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Github } from "lucide-react";

const team = [
  {
    name: "Dr. Nsiah Kofi Denis",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Dr.+Nsiah",
    social: { linkedin: "#", github: "#" },
    delay: 0.1,
  },
  {
    name: "Thomas Kangah",
    role: "AI Researcher",
    avatar: "https://via.placeholder.com/200?text=Thomas+Kangah",
    social: { linkedin: "#", github: "#" },
    delay: 0.2,
  },
  {
    name: "Eugene Baidoo",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Eugene+Baidoo",
    social: { linkedin: "#", github: "#" },
    delay: 0.3,
  },
  {
    name: "Ryan Brown",
    role: "AI Specialist",
    avatar: "https://via.placeholder.com/200?text=Ryan+Brown",
    social: { linkedin: "#", github: "#" },
    delay: 0.4,
  },
  {
    name: "Michael Oduro",
    role: "Radiologist",
    avatar: "https://via.placeholder.com/200?text=Michael+Oduro",
    social: { linkedin: "#", github: "#" },
    delay: 0.5,
  },
  {
    name: "Obed Sarkodie",
    role: "Software Engineer",
    avatar: "https://via.placeholder.com/200?text=Obed+Sarkodie",
    social: { linkedin: "#", github: "#" },
    delay: 0.6,
  },
];

export function TeamShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-cyan-50 dark:from-slate-950 dark:to-cyan-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white bg-clip-text">
            The Minds Powering Innovation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
            Combining medical expertise with technical excellence to revolutionize
            diagnostic healthcare in West Africa
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    ease: "backOut" 
                  } 
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 } 
              }}
              className="h-full"
            >
              <Card className="p-6 group bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <Avatar className="w-28 h-28 mb-5 border-4 border-white dark:border-slate-800 shadow-lg">
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-emerald-100 dark:from-cyan-900 dark:to-emerald-900 text-xl font-semibold text-slate-800 dark:text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-4">
                  {member.role}
                </p>
                
                <div className="flex justify-center gap-4 mt-2">
                  <motion.a
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.social.linkedin}
                    className="text-slate-500 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] rounded-full bg-slate-100 dark:bg-slate-800 p-2 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.social.github}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 p-2 transition-colors"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}