import { Footer } from '@/components/footer'
import NewsGrid from '@/components/news-grid'
import HeroSection from '@/components/news-hero'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeroSection/>
        <NewsGrid/>
        <Footer/>
    </div>
  )
}

export default page