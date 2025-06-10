"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Video from 'next-video';
import vidpath1 from "../../videos/medical-bg-video.webm"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play (autoplay) as soon as component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          // If autoplay is blocked, mute and retry
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      }
    };

    playVideo();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video container */}
      <div className="absolute inset-0 z-0">
        <Video
          ref={videoRef}
          src={vidpath1} 
        
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/bg2.png" 

          
        />
          
       
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Foreground content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Chest X-Ray <span className="text-blue-300">Diagnostic</span> Insights
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-powered diagnostics transforming healthcare across Africa
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary Solid Button */}
            <Button className="rounded-full py-3 px-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors duration-200">
              Subscribe to Updates
            </Button>

            {/* Outline Button */}
            <Button
              variant="outline"
              className="rounded-full py-3 px-6 text-lg border border-white text-black hover:bg-white/20 shadow-lg transition-colors duration-200"
            >
              For Medical Professionals
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
