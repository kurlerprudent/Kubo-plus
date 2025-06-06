"use client";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MedicalIcon, RadiologyIcon, ChartIcon, MeetingIcon } from "@/components/icons";

const newsItems = [
  {
    id: "ctr-feature",
    title: "New Feature: Automatic CTR Calculation",
    date: "2025-06-10",
    excerpt: "Our platform now automatically calculates Cardiothoracic Ratio (CTR) for more accurate heart condition assessments.",
    category: "Feature Update",
    categoryColor: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    image: "/ctr-feature.jpg",
    icon: <ChartIcon className="w-5 h-5 mr-1" />,
    stats: {
      accuracy: "95%",
      timeSaved: "2 mins"
    }
  },
  {
    id: "ug-meeting",
    title: "Meeting with UG Radiology Department",
    date: "2025-06-08",
    excerpt: "Productive collaboration session with University of Ghana Radiology Department to enhance clinical workflow integration.",
    category: "Partnership",
    categoryColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
    image: "/ug-meeting.jpg",
    icon: <MeetingIcon className="w-5 h-5 mr-1" />,
    attendees: ["Prof. Ama Mensah", "Dr. Kwame Osei", "Dr. Ngozi Adebayo"]
  },
  {
    id: "introduction",
    title: "Introducing HealthTech Africa's Diagnostic Platform",
    date: "2025-06-05",
    excerpt: "Revolutionizing chest X-ray diagnostics across Africa with AI-powered insights tailored for our healthcare ecosystem.",
    category: "Announcement",
    categoryColor: "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
    image: "/introduction.jpg",
    icon: <MedicalIcon className="w-5 h-5 mr-1" />,
    stats: {
      coverage: "12 countries",
      facilities: "200+"
    }
  },
  {
    id: "tb-detection",
    title: "AI Advances in TB Detection",
    date: "2025-06-02",
    excerpt: "New techniques identify tuberculosis with 94% accuracy in early stages, critical for African healthcare settings.",
    category: "Disease Focus",
    categoryColor: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    image: "/tb-detection.jpg",
    icon: <RadiologyIcon className="w-5 h-5 mr-1" />,
    stats: {
      accuracy: "94%",
      detectionTime: "<30 sec"
    }
  },
  {
    id: "pneumonia",
    title: "Pneumonia Patterns in Pediatric Cases",
    date: "2025-05-28",
    excerpt: "New insights into identifying pneumonia in children under 5 across different African regions.",
    category: "Clinical Update",
    categoryColor: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    image: "/pneumonia.jpg",
    icon: <MedicalIcon className="w-5 h-5 mr-1" />,
    patterns: [
      { name: "Lobar Pneumonia", percentage: 72 },
      { name: "Bronchopneumonia", percentage: 18 }
    ]
  },
  {
    id: "team-spotlight",
    title: "Meet Dr. Kofi Asante",
    date: "2025-05-25",
    excerpt: "Leading our clinical validation efforts with 15 years of thoracic imaging experience.",
    category: "Team Spotlight",
    categoryColor: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    image: "/team-spotlight.jpg",
    position: "Lead Radiologist",
    achievements: ["15+ publications", "Clinical validation lead"]
  },
  {
    id: "feature-voting",
    title: "Shape Our Diagnostic Features",
    date: "2025-05-22",
    excerpt: "Help prioritize our development roadmap. Which feature would benefit your practice most?",
    category: "Community",
    categoryColor: "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
    image: "/£feature-voting.jpg",
    options: [
      "Automated Report Generation",
      "Multi-Language Support",
      "Mobile Offline Mode",
      "Regional Disease Alerts"
    ],
    votes: [42, 38, 28, 32]
  },
  {
    id: "silicosis",
    title: "Silicosis Patterns in Mining Communities",
    date: "2025-05-18",
    excerpt: "New findings on occupational lung disease prevalence in African mining regions.",
    category: "Research",
    categoryColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    image: "/silicosis.jpg",
    regions: ["South Africa", "Ghana", "Zambia"],
    prevalence: "12-18%"
  }
];

export default function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [votedFeature, setVotedFeature] = useState<number | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(newsItems.map((item) => item.category))),
    []
  );

  const filteredItems = useMemo(() => {
    const items = selectedCategory
      ? newsItems.filter((item) => item.category === selectedCategory)
      : newsItems;
    return items.slice(0, visibleCount);
  }, [selectedCategory, visibleCount]);

  const hasMore = useMemo(() => {
    const items = selectedCategory
      ? newsItems.filter((item) => item.category === selectedCategory)
      : newsItems;
    return items.length > visibleCount;
  }, [selectedCategory, visibleCount]);

  const handleVote = (index: number) => {
    setVotedFeature(index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Latest <span className="text-blue-600 dark:text-blue-400">Medical Insights</span> & Updates
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Stay informed with the latest advancements in AI-powered diagnostics and healthcare innovations across Africa
        </motion.p>

        {/* Animated Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 shadow-sm 
              ${selectedCategory === null
                ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-blue-500/30'
                : 'bg-white text-gray-800 dark:bg-slate-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 shadow-gray-200/50 dark:shadow-slate-900/50'
              }`}
          >
            All Updates
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 shadow-sm 
                ${selectedCategory === cat
                  ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-blue-500/30'
                  : 'bg-white text-gray-800 dark:bg-slate-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 shadow-gray-200/50 dark:shadow-slate-900/50'
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => {
            // Assign different sizes based on index
            let sizeClass = "";
            if (index % 5 === 0) sizeClass = "lg:col-span-2 lg:row-span-2"; // Large
            else if (index % 3 === 0) sizeClass = "lg:col-span-2"; // Wide
            else sizeClass = ""; // Regular

            return (
              <motion.div
                key={item.id}
                className={`${sizeClass} flex h-full`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="relative w-full h-full overflow-hidden group border-0 shadow-xl dark:shadow-slate-900/30">
                  {/* Background Image with Parallax Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col p-5">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex justify-between items-start">
                        <Badge 
                          className={`${item.categoryColor} backdrop-blur-sm border border-white/30 px-3 py-1.5`}
                        >
                          {item.icon}
                          {item.category}
                        </Badge>
                        <span className="text-white/90 text-sm bg-black/30 px-2 py-1 rounded-full">
                          {new Date(item.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-4 leading-tight tracking-tight">
                        {item.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="p-0 mt-auto flex-grow flex flex-col">
                      <p className="text-white/90 mb-4">
                        {item.excerpt}
                      </p>
                      
                      {/* Dynamic Content Blocks */}
                      {item.id === "ctr-feature" && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{item.stats?.accuracy}</div>
                              <div className="text-xs text-blue-200">Accuracy</div>
                            </div>
                            <div className="text-center p-3 bg-teal-500/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{item.stats?.timeSaved}</div>
                              <div className="text-xs text-teal-200">Time Saved</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {item.id === "ug-meeting" && (
                        <div className="mt-auto">
                          <div className="text-white/80 text-sm mb-2">Key Attendees:</div>
                          <div className="flex flex-wrap gap-2">
                            {item.attendees?.map((person, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white/90"
                              >
                                {person}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {item.id === "tb-detection" && (
                        <div className="mt-auto">
                          <div className="flex justify-between text-white/80 text-sm mb-1">
                            <span>Early Detection Rate</span>
                            <span>{item.stats?.accuracy}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                            <div 
                              className="bg-red-400 h-2 rounded-full" 
                              style={{ width: item.stats?.accuracy || "0%" }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {item.id === "pneumonia" && item.patterns && (
                        <div className="space-y-3 mt-auto">
                          {item.patterns.map((pattern, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-white/80 text-sm mb-1">
                                <span>{pattern.name}</span>
                                <span>{pattern.percentage}%</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${idx === 0 ? 'bg-blue-400' : 'bg-green-400'}`} 
                                  style={{ width: `${pattern.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item.id === "feature-voting" && (
                        <div className="space-y-3 mt-auto">
                          <h4 className="text-white/80 text-sm font-medium">Vote for next feature:</h4>
                          {item.options?.map((option, idx) => (
                            <motion.div 
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                                ${votedFeature === idx 
                                  ? 'bg-blue-500/30 border border-blue-400' 
                                  : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
                              onClick={() => handleVote(idx)}
                            >
                              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3
                                ${votedFeature === idx 
                                  ? 'border-blue-400 bg-blue-500/20' 
                                  : 'border-white/40'}`}>
                                {votedFeature === idx && (
                                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                                )}
                              </div>
                              <span className="text-white font-medium text-sm">{option}</span>
                              {item.votes && (
                                <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full text-white/80">
                                  {item.votes[idx]} votes
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="p-0 mt-4">
                      <button
                        aria-label={`Read more about ${item.title}`}
                        className="text-blue-300 font-medium flex items-center group text-sm"
                      >
                        Read full report
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 flex items-center"
            >
              Load More Updates
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}