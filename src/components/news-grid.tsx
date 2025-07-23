"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// -- Stub Data, replace with real API fetch
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  slug: string;
}
const allNews: NewsItem[] = [
  {
    id: "tuberculosis-ai",
    title: "AI Model Detects Tuberculosis with 96% Accuracy",
    excerpt: "Our latest AI model demonstrates rapid and accurate detection of pulmonary TB in X-rays.",
    date: "2025-07-10",
    author: "Dr. A. Mensah",
    category: "Research",
    imageUrl: "/news/tb-ai.jpg",
    slug: "tuberculosis-ai"
  },
  {
    id: "conference-2025",
    title: "Join Us at the 2025 Radiology Innovation Summit",
    excerpt: "Meet top researchers and learn about the latest AI diagnostic advancements in Nairobi.",
    date: "2025-08-15",
    author: "TechHealth Events",
    category: "Event",
    imageUrl: "/news/radiology-summit.jpg",
    slug: "conference-2025"
  },
  {
    id: "xray-enhancement-tool",
    title: "New Image-Enhancement Tool Releases Today",
    excerpt: "Enhance low-quality chest X-rays instantly with frame-by-frame enhancement software.",
    date: "2025-06-28",
    author: "QuiverTech Team",
    category: "Announcement",
    imageUrl: "/news/enhancement-tool.jpg",
    slug: "xray-enhancement-tool"
  },
  {
    id: "pneumonia-detection",
    title: "Open-Source Pneumonia Detection Model Available",
    excerpt: "Our model is now free for institutions worldwide—download and integrate today.",
    date: "2025-07-01",
    author: "OpenHealth Labs",
    category: "Announcement",
    imageUrl: "/news/pneumonia-model.jpg",
    slug: "pneumonia-detection"
  },
  {
    id: "diagnosis-speed-study",
    title: "AI Cuts Diagnostic Time by 70% in Emergency Departments",
    excerpt: "New study shows dramatic reduction in chest X-ray interpretation times with AI assistance.",
    date: "2025-07-05",
    author: "Dr. K. Nyarko",
    category: "Research",
    imageUrl: "/news/ai-diagnosis-speed.jpg",
    slug: "diagnosis-speed-study"
  }
];


export default function NewsPage() {
  // Filter & search state
  const [items, setItems] = useState<NewsItem[]>(allNews);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  // Simulate fetch on mount
  useEffect(() => {
    // TODO: fetch from /api/news
    setItems(allNews);
  }, []);

  // Derived lists
  const filtered = items
    .filter((n) => filter === "All" || n.category === filter)
    .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));

  // Sidebar data
  const featured = items.length > 0 ? items[0] : null;

  const categories = Array.from(
    items.reduce((map, n) => map.set(n.category, (map.get(n.category) || 0) + 1), new Map<string, number>())
  );
  const recent = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row bg-[#0D1117] text-white min-h-screen">
      {/* Main Content */}
      <div className="flex-1 px-6 lg:px-12 py-10">
        {/* Filters */}
        <Filters
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
        />

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 px-6 lg:px-0 bg-[#121826] py-10">
        {featured && (
  <Sidebar featured={featured} categories={categories} recent={recent} />
)}


      </aside>
    </div>
  );
}

// --------- Filters Component ---------
function Filters({
  query,
  setQuery,
  filter,
  setFilter
}: {
  query: string;
  setQuery: (q: string) => void;
  filter: string;
  setFilter: (f: string) => void;
}) {
  const cats = ["All", "AI", "Research", "Radiologist", "Patients"];
  return (
    <motion.div
      className="flex overflow-x-auto gap-4 items-center"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {cats.map((c) => (
        <Button
          key={c}
          variant={filter === c ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter(c)}
        >
          {c}
        </Button>
      ))}

      <div className="ml-auto flex items-center gap-2">
        <Input
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-[#121826] text-white placeholder-[#94a3b8]"
        />
      </div>
    </motion.div>
  );
}

// --------- NewsCard Component ---------
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <motion.div
      className="group rounded-lg overflow-hidden shadow-lg bg-[#1e293b] cursor-pointer"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-2 left-2 bg-[#10BCE3] text-black px-2 py-1 text-xs font-semibold">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/news/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="text-sm text-[#94a3b8] mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-[#94a3b8]">
          <span>{new Date(item.date).toLocaleDateString()}</span>
          <span>By {item.author}</span>
        </div>
      </div>
    </motion.div>
  );
}

// --------- Sidebar Component ---------
function Sidebar({
  featured,
  categories,
  recent
}: {
  featured: NewsItem;
  categories: [string, number][];
  recent: NewsItem[];
}) {
  return (
    <div className="space-y-8">
      {/* Featured Story */}
      <div className="rounded-lg overflow-hidden shadow-lg bg-[#1e293b]">
        <div className="relative h-56">
          <Image
            src={featured.imageUrl}
            alt={featured.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-2">Featured</h4>
          <h3 className="text-xl font-bold">
            <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
          </h3>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-lg">
        <h4 className="font-semibold mb-4">Categories</h4>
        <ul className="space-y-2">
          {categories.map(([cat, count]) => (
            <li key={cat} className="flex justify-between">
              <button className="text-left hover:text-[#10BCE3]">{cat}</button>
              <span className="text-sm text-[#94a3b8]">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-lg">
        <h4 className="font-semibold mb-4">Recent Posts</h4>
        <ul className="space-y-3">
          {recent.map((n) => (
            <li key={n.id} className="text-sm">
              <Link href={`/news/${n.slug}`} className="hover:text-[#10BCE3]">
                {n.title}
              </Link>
              <div className="text-xs text-[#94a3b8]">
                {new Date(n.date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-lg text-center">
        <h4 className="font-semibold mb-2">Stay Informed</h4>
        <p className="text-sm text-[#94a3b8] mb-4">
          Subscribe to our newsletter for weekly AI insights.
        </p>
        <Input
          placeholder="Email address"
          type="email"
          className="mb-3 bg-[#121826] text-white"
        />
        <Button className="w-full bg-[#10BCE3] text-black hover:bg-[#00F0FF]">
          Subscribe
        </Button>
      </div>
    </div>
  );
}
