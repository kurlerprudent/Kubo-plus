"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Slide {
  src: string
  alt: string
  caption: string
}

const slides: Slide[] = [
  {
    src: "/images/patient-a.jpg",
    alt: "Patient A scan",
    caption: "Patient A – new abnormality detected",
  },
  {
    src: "/images/patient-b.jpg",
    alt: "Patient B scan",
    caption: "Patient B – CTR ratio outlier",
  },
  {
    src: "/images/patient-c.jpg",
    alt: "Patient C scan",
    caption: "Patient C – report signed‑off",
  },
  // add as many as you like...
]

export function SystemCarousel() {
  // autoplay plugin instance
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full max-w-sm"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, idx) => (
          <CarouselItem key={idx}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-medium">{slide.caption}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* navigation arrows */}
      <CarouselPrevious className="text-gray-600 dark:text-gray-300" />
      <CarouselNext className="text-gray-600 dark:text-gray-300" />
    </Carousel>
  )
}
