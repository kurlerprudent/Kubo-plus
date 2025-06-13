"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Video from 'next-video';
import vidpath1 from "../../videos/medical-bg-video.webm";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Force mute for autoplay on mobile
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (err) {
          console.error("Video playback failed:", err);
        }
      }
    };

    playVideo();
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-[90vh] md:h-screen">
      {/* Background video with mobile portrait adjustment */}
      <div className="absolute inset-0 z-0">
        <Video
          ref={videoRef}
          src={vidpath1}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${isMobile ? 'scale-125' : ''}`}
          poster="/bg2.png"
          style={isMobile ? { objectPosition: 'center 25%' } : {}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl text-center md:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Chest X-Ray <span className="text-blue-300">Diagnostic</span> Insights
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl md:max-w-none leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered diagnostics transforming healthcare across Africa.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button className="rounded-full py-2 px-5 sm:py-3 sm:px-6 text-base sm:text-lg bg-blue-600 hover:bg-blue-700 shadow-lg transition transform hover:scale-105">
                Subscribe to Updates
              </Button>

              <Button
                className="rounded-full py-2 px-5 sm:py-3 sm:px-6 text-base sm:text-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition transform hover:scale-105"
              >
                For Medical Professionals
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}