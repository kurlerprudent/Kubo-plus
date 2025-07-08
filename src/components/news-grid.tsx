'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Announcement' | 'Research' | 'Event';
  imageUrl: string;
  stats?: string; // e.g., "94% TB detection"
  href: string;
}

// Stub data - replace with actual API data
const initialNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "New AI Model Achieves 94% Accuracy in TB Detection",
    excerpt: "Breakthrough algorithm shows unprecedented accuracy in early tuberculosis diagnosis",
    date: "2025-06-15",
    category: "Research",
    imageUrl: "/news/research-1.jpg",
    stats: "94% accuracy",
    href: "/research/tb-detection"
  },

  {
    id: "3",
    title: "Annual African Radiology Conference 2025",
    excerpt: "Join 300+ experts in Nairobi this August to discuss AI diagnostics advancements",
    date: "2025-07-22",
    category: "Event",
    imageUrl: "/news/conference.jpg",
    href: "/events/radiology-conference"
  },
  {
    id: "4",
    title: "Pneumonia Detection Model Now Open Source",
    excerpt: "Our award-winning algorithm available on GitHub for researchers worldwide",
    date: "2025-05-30",
    category: "Announcement",
    imageUrl: "/news/open-source.jpg",
    href: "/announcements/open-source"
  },
  {
    id: "5",
    title: "Study: AI Reduces Diagnosis Time by 68%",
    excerpt: "New research shows significant time savings in emergency settings",
    date: "2025-06-05",
    category: "Research",
    imageUrl: "/news/research-2.jpg",
    stats: "68% faster",
    href: "/research/diagnosis-time"
  },
  {
    id: "6",
    title: "New Partnership with UGMC for TB Screening",
    excerpt: "Global initiative to deploy our technology in high-risk regions",
    date: "2025-05-18",
    category: "Announcement",
    imageUrl: "/news/who-partnership.jpg",
    href: "/announcements/who-partnership"
  },

  {
    id: "8",
    title: "Lung Cancer Detection Model Enters Clinical Trials",
    excerpt: "Phase 2 trials show promising early results for early-stage detection",
    date: "2025-06-01",
    category: "Research",
    imageUrl: "/news/clinical-trial.jpg",
    stats: "89% sensitivity",
    href: "/research/lung-cancer"
  },

 
  {
    id: "12",
    title: "New Version 3.0 Released with Enhanced Features",
    excerpt: "Real-time collaboration tools and improved visualization dashboard",
    date: "2025-06-18",
    category: "Announcement",
    imageUrl: "/news/software-update.jpg",
    href: "/announcements/v3-release"
  }
];

export default function NewsGrid() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setNewsItems(initialNewsItems);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...newsItems];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }
    
    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredItems(result);
  }, [newsItems, searchQuery, activeCategory, sortOrder]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  // Sticky filter bar implementation
  useEffect(() => {
    const handleScroll = () => {
      if (filterBarRef.current) {
        const shouldSticky = window.scrollY > 100;
        filterBarRef.current.classList.toggle('sticky', shouldSticky);
        filterBarRef.current.classList.toggle('bg-slate-900', shouldSticky);
        filterBarRef.current.classList.toggle('shadow-lg', shouldSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Category badge component
  const CategoryBadge = ({ category }: { category: string }) => (
    <span className={`
      absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold
      ${category === 'Announcement' ? 'bg-teal-700 text-teal-50' : ''}
      ${category === 'Research' ? 'bg-blue-600 text-blue-50' : ''}
      ${category === 'Event' ? 'bg-slate-700 text-slate-100' : ''}
    `}>
      {category}
    </span>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sticky Filter Bar */}
      <div 
        ref={filterBarRef}
        className="py-4 transition-all duration-300 top-0 z-30"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            {['All', 'Announcement', 'Research', 'Event'].map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === cat 
                    ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                    : 'bg-transparent text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredItems.slice(0, visibleCount).map((item) => (
            <NewsCard 
              key={item.id} 
              item={item} 
              CategoryBadge={CategoryBadge}
            />
          ))
        )}
      </div>

      {/* Load More */}
      {visibleCount < filteredItems.length && !isLoading && (
        <div className="text-center mt-10">
          <Button
            onClick={loadMore}
            className="bg-teal-700 hover:bg-teal-600 text-white px-8 py-4 rounded-full"
          >
            Load More
          </Button>
        </div>
      )}

      {!isLoading && filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No matching news items found
        </div>
      )}
    </div>
  );
}

// News Card Component
const NewsCard = ({ 
  item,
  CategoryBadge
}: { 
  item: NewsItem;
  CategoryBadge: React.FC<{ category: string }>;
}) => (
  <Link href={item.href} passHref>
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group relative block h-full rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-teal-500/50 hover:shadow-teal-500/20"
    >
      <div className="aspect-[3/2] relative">
        {/* Image with gradient overlay */}
        <div className="absolute inset-0">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>

        <CategoryBadge category={item.category} />

        {/* Stats badge */}
        {item.stats && (
          <span className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-md text-xs text-teal-300 font-medium">
            {item.stats}
          </span>
        )}

        {/* Date */}
        <span className="absolute bottom-3 right-3 bg-black/50 px-2 py-1 rounded-md text-xs text-slate-200">
          {new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>

      {/* Text content */}
      <div className="p-4 bg-slate-800 group-hover:bg-slate-750 transition-colors">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-slate-300 text-sm line-clamp-2">
          {item.excerpt}
        </p>
      </div>
    </motion.div>
  </Link>
);

// Skeleton Loading Component
const SkeletonCard = () => (
  <div className="aspect-[3/2] rounded-xl overflow-hidden bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse">
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-slate-700" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);