// components/GlassCarousel.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Slide {
  src: string
  alt: string
  caption: string
  status: "pending" | "completed" | "urgent"
}

const slides: Slide[] = [
  {
    src: "/xray-1.jpg",
    alt: "Patient A scan",
    caption: "Upload an x-ray image",
    status: "urgent"
  },
  {
    src: "/heatmap.png",
    alt: "Patient B scan",
    caption: "Analyze",
    status: "pending"
  },
  {
    src: "/report.png",
    alt: "Patient C scan",
    caption: "Generate Report",
    status: "completed"
  },
]

export function GlassCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [loaded, setLoaded] = React.useState<boolean[]>(Array(slides.length).fill(false))
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slides
  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }, 3500)
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex])

  // Handle image loading per slide
  const handleImageLoad = (index: number) => {
    setLoaded(prev => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Glass morphism container */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg z-0" />
      
      {/* Slide container with proper horizontal layout */}
      <div 
        className="relative flex h-full transition-transform duration-700 ease-in-out"
        style={{ 
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`
        }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="relative w-full h-full flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            {/* Image with loading state */}
            <div className="absolute inset-0 z-10">
              {!loaded[index] && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
              )}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover rounded-2xl"
                onLoadingComplete={() => handleImageLoad(index)}
                onError={(e) => console.error(`Image failed to load: ${slide.src}`, e)}
              />
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20 rounded-2xl" />
            
            {/* Status badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border z-30 backdrop-blur-sm ${
              slide.status === "urgent" 
                ? "bg-amber-100/80 text-amber-800 border-amber-300" 
                : slide.status === "pending" 
                  ? "bg-blue-100/80 text-blue-800 border-blue-300" 
                  : "bg-green-100/80 text-green-800 border-green-300"
            }`}>
              {slide.status.charAt(0).toUpperCase() + slide.status.slice(1)}
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
              <p className="text-white text-md font-medium">{slide.caption}</p>
              <div className="flex items-center mt-2">
                <div className="bg-indigo-500/80 h-2 rounded-full flex-1 mr-2 overflow-hidden">
                  <div 
                    className={`h-full ${
                      slide.status === "urgent" 
                        ? "bg-amber-400 w-4/5" 
                        : slide.status === "pending" 
                          ? "bg-blue-400 w-2/3" 
                          : "bg-green-400 w-full"
                    }`}
                  />
                </div>
                <span className="text-xs text-indigo-200">
                  {slide.status === "urgent" 
                    ? "Priority" 
                    : slide.status === "pending" 
                      ? "In Review" 
                      : "Completed"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-md border border-white/50 text-indigo-700 hover:bg-white hover:text-indigo-900 shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all"
        onClick={() => goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-md border border-white/50 text-indigo-700 hover:bg-white hover:text-indigo-900 shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all"
        onClick={() => goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-30">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-3.5' 
                : 'bg-white/60 hover:bg-white'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Floating elements for depth */}
      <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-indigo-400/20 backdrop-blur-sm z-0" />
      <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-sm z-0" />
    </div>
  )
}