"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="bg-[#0D1117] text-white min-h-screen">
      {/* Main Content */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* News Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Newspaper className="w-12 h-12 text-[#10BCE3] mr-4" />
              <h2 className="text-4xl font-bold">Latest News</h2>
            </div>
            <div className="bg-[#121826] rounded-lg p-12 border border-[#30363d]">
              <p className="text-xl text-[#94a3b8] mb-4">
                We&apos;re currently not in business operations.
              </p>
              <p className="text-[#94a3b8]">
                Check back later for the latest updates and announcements about our AI-powered chest X-ray diagnostic system.
              </p>
            </div>
          </motion.div>

          {/* Upcoming Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-[#10BCE3] mr-4" />
              <h2 className="text-4xl font-bold">Upcoming Events</h2>
            </div>
            <div className="bg-[#121826] rounded-lg p-12 border border-[#30363d]">
              <p className="text-xl text-[#94a3b8] mb-4">
                No upcoming events scheduled at this time.
              </p>
              <p className="text-[#94a3b8]">
                Stay tuned for future conferences, webinars, and product launches.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
