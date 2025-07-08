'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

interface Slide {
  imageSrc: string;
  headline: string;
  date: string;
  href?: string;
}

const slides: Slide[] = [
  {
    imageSrc: '/X-ray-3.jpg',
    headline: 'New AI Model Detects Rare Conditions',
    date: 'May 15, 2025',
    href: '/news/ai-model-update'
  },
  {
    imageSrc: '/medic-team.jpg',
    headline: 'Mobile Clinics Expand Rural Coverage',
    date: 'June 2, 2025',
    href: '/news/rural-expansion'
  },
  {
    imageSrc: '/conference.jpg',
    headline: 'Annual Diagnostics Conference Announced',
    date: 'June 18, 2025'
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const handleSelect = useCallback(() => {
    setSelectedIndex(emblaApi?.selectedScrollSnap() || 0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect();
    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <section 
      className="relative w-full overflow-hidden h-[90vh] md:h-screen bg-slate-900"
      role="region" 
      aria-label="News Carousel"
    >
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={index}>
              {/* Slide image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.imageSrc} 
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
              </div>

              {/* Animated text content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6">
                  <div className="max-w-3xl text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={selectedIndex === index ? 
                        { opacity: 1, y: 0 } : 
                        { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {slide.headline}
                      </h2>
                      <p className="text-sm text-teal-200 mt-2">
                        {slide.date}
                      </p>
                      {slide.href && (
                        <a 
                          href={slide.href}
                          className="mt-4 inline-block px-4 py-2 text-white rounded bg-teal-700 hover:bg-teal-800 transition-colors"
                        >
                          Read More
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center px-2 z-20">
        <button 
          onClick={() => emblaApi?.scrollPrev()} 
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-teal-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 z-20">
        <button 
          onClick={() => emblaApi?.scrollNext()} 
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-teal-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'bg-teal-500 scale-125' 
                  : 'bg-white/50 hover:bg-teal-300 hover:shadow-[0_0_8px_rgba(44,122,123,0.3)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}