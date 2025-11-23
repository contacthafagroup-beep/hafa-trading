'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { 
  Calendar, User, ArrowRight, Loader2, BookOpen, Eye, 
  TrendingUp, Search, Mic, Play, Clock, Bookmark,
  Package, Plane, Ship, Leaf, Filter, ChevronLeft, ChevronRight,
  BarChart3, Globe, Scale, Box, Award, MapPin, DollarSign,
  TrendingDown, Phone, MessageCircle
} from 'lucide-react';
import { getPublishedBlogPosts, formatBlogDate } from '@/lib/firebase/blog';

const categories = [
  { name: 'All', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { name: 'Agriculture', icon: Leaf, color: 'from-green-500 to-emerald-500' },
  { name: 'Spices', icon: Package, color: 'from-orange-500 to-red-500' },
  { name: 'Logistics', icon: Ship, color: 'from-purple-500 to-pink-500' },
  { name: 'Market Trends', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
  { name: 'Export Laws', icon: Scale, color: 'from-indigo-500 to-blue-500' },
  { name: 'Storage & Packaging', icon: Box, color: 'from-teal-500 to-cyan-500' },
  { name: 'Success Stories', icon: Award, color: 'from-pink-500 to-rose-500' },
];

const trendingTopics = [
  { title: 'Saudi Arabia Spice Demand Surge +45%', trend: 'up', value: '+45%' },
  { title: 'New UAE Import Regulations 2025', trend: 'neutral', value: 'NEW' },
  { title: 'Russia Grain Import Forecast', trend: 'up', value: '+32%' },
  { title: 'Air Freight Costs Declining', trend: 'down', value: '-18%' },
  { title: 'Ethiopia Coffee Export Record High', trend: 'up', value: '+67%' },
];

const dataCards = [
  { title: 'Global Price Index', value: '↑ 12.5%', subtitle: 'Spices & Vegetables', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
  { title: 'Top Destination', value: 'UAE', subtitle: '34% of exports', icon: MapPin, color: 'from-blue-500 to-cyan-500' },
  { title: 'Avg Shipping Time', value: '14 days', subtitle: 'Air freight', icon: Plane, color: 'from-purple-500 to-pink-500' },
  { title: 'New Regulations', value: '3 Updates', subtitle: 'This month', icon: Scale, color: 'from-orange-500 to-red-500' },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const categorySliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, selectedCategory, searchQuery]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await getPublishedBlogPosts();
      setBlogPosts(posts);
      if (posts.length > 0) {
        setSelectedPost(posts[0]);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = blogPosts;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  };

  const toggleSaveArticle = (postId: string) => {
    setSavedArticles(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categorySliderRef.current) {
      const scrollAmount = 300;
      categorySliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Hero Section - Export Insights Hub */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated World Map Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(20)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${Math.random() * 1000} ${Math.random() * 500} Q ${Math.random() * 1000} ${Math.random() * 500} ${Math.random() * 1000} ${Math.random() * 500}`}
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Package, x: '10%', y: '20%', delay: 0 },
            { Icon: Plane, x: '85%', y: '30%', delay: 0.5 },
            { Icon: Ship, x: '15%', y: '70%', delay: 1 },
            { Icon: Leaf, x: '80%', y: '75%', delay: 1.5 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-12 h-12 text-blue-500/30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Glassmorphism Header */}
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl p-12 border border-white/20 shadow-2xl">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Export Insights Hub
                </h1>
              </motion.div>
              
              {/* Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  Latest Global Export Insights
                </motion.span>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Trends
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing Updates
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-2">
                  <Ship className="w-5 h-5" />
                  Logistic Innovations
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI-Assisted Smart Search Bar */}
      <section className="py-8 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-2 border border-white/20 shadow-xl">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Search by voice or keywords... (e.g., 'Saudi Arabia demand', 'UAE spices price')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
                />
                <Button size="icon" variant="ghost" className="hover:bg-blue-500/20">
                  <Mic className="w-5 h-5 text-blue-600" />
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Category Slider */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-900"
              onClick={() => scrollCategories('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div 
              ref={categorySliderRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.name;
                
                return (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex-shrink-0 group relative`}
                  >
                    <div className={`
                      relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300
                      ${isSelected 
                        ? 'bg-gradient-to-br ' + category.color + ' text-white border-white/20 shadow-2xl' 
                        : 'bg-white/60 dark:bg-gray-900/60 border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl'
                      }
                    `}>
                      <Icon className={`w-8 h-8 mb-2 mx-auto ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                      <div className={`text-sm font-semibold whitespace-nowrap ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {category.name}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        layoutId="categoryIndicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-900"
              onClick={() => scrollCategories('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Data Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`
                    relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 
                    border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300
                    overflow-hidden group
                  `}>
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${card.color}`}
                        />
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className={`text-3xl font-bold mb-2 bg-gradient-to-br ${card.color} bg-clip-text text-transparent`}
                      >
                        {card.value}
                      </motion.div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {card.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual-View Article Layout */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-12 w-12 text-blue-600" />
              </motion.div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* LEFT: Article List */}
              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedPost(post)}
                    className={`
                      cursor-pointer backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300
                      ${selectedPost?.id === post.id
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-xl'
                        : 'bg-white/60 dark:bg-gray-900/60 border-white/20 hover:border-blue-500/30 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-blue-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`bg-gradient-to-r ${categories.find(c => c.name === post.category)?.color || 'from-gray-500 to-gray-600'} text-white border-0`}>
                            {post.category}
                          </Badge>
                          {post.views > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatBlogDate(post.publishedAt || post.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {calculateReadTime(post.content)} min read
                            </span>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveArticle(post.id);
                            }}
                          >
                            <Bookmark 
                              className={`w-4 h-4 ${savedArticles.includes(post.id) ? 'fill-blue-600 text-blue-600' : ''}`} 
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* RIGHT: Smart Phone Preview Box */}
              <div className="lg:sticky lg:top-24 h-fit">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  {/* Phone Frame */}
                  <div className="relative mx-auto max-w-md">
                    {/* Phone Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
                    
                    {/* Phone Body */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 border-8 border-gray-800 shadow-2xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />
                      
                      {/* Screen */}
                      <div className="relative bg-white dark:bg-gray-950 rounded-[2.5rem] overflow-hidden h-[600px]">
                        {selectedPost ? (
                          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-900">
                            {/* Article Preview */}
                            <div className="relative">
                              {/* Featured Image */}
                              {selectedPost.featuredImage ? (
                                <div className="relative h-64 overflow-hidden">
                                  <img 
                                    src={selectedPost.featuredImage} 
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  
                                  {/* Floating Badge */}
                                  <div className="absolute top-4 left-4">
                                    <Badge className={`bg-gradient-to-r ${categories.find(c => c.name === selectedPost.category)?.color || 'from-gray-500 to-gray-600'} text-white border-0`}>
                                      {selectedPost.category}
                                    </Badge>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                  <BookOpen className="w-20 h-20 text-blue-400" />
                                </div>
                              )}
                              
                              {/* Content */}
                              <div className="p-6">
                                <motion.h2
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                                >
                                  {selectedPost.title}
                                </motion.h2>
                                
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {selectedPost.author}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatBlogDate(selectedPost.publishedAt || selectedPost.createdAt)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {calculateReadTime(selectedPost.content)} min
                                  </span>
                                </div>
                                
                                {selectedPost.tags && selectedPost.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedPost.tags.map((tag: string, i: number) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                                >
                                  {selectedPost.excerpt}
                                </motion.p>
                                
                                <Link href={`/blog/${selectedPost.slug}`}>
                                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                    Read Full Article
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center p-6 text-center">
                            <div>
                              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                              <p className="text-gray-600 dark:text-gray-400">
                                Select an article to preview
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Swipe Indicator */}
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
                        >
                          <div className="w-1 h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Articles Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Trending Insights Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
                />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Top 5 Export Market Updates
              </h2>
            </div>
            
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 hover:border-orange-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`
                        ${topic.trend === 'up' ? 'bg-green-500' : topic.trend === 'down' ? 'bg-red-500' : 'bg-blue-500'}
                        text-white border-0
                      `}
                    >
                      {topic.value}
                    </Badge>
                    {topic.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : topic.trend === 'down' ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Insights Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Video Insights
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Market Forecast for 2025', duration: '5:32', views: '12.5K' },
              { title: 'How Hafa Trading Ensures Freshness', duration: '4:18', views: '8.3K' },
              { title: 'Air vs Sea Shipping: What Buyers Prefer', duration: '6:45', views: '15.2K' },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group cursor-pointer"
              >
                <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                        <div className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                          <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 text-white text-xs font-semibold">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {video.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Author Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Expert Export Authors
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Ahmed Hassan', 
                role: 'Agricultural Export Specialist', 
                country: '🇪🇹', 
                specialty: 'Spices & Grains',
                articles: 45,
                whatsapp: '+251-XXX-XXXX'
              },
              { 
                name: 'Sarah Mohammed', 
                role: 'Logistics & Freight Expert', 
                country: '🇪🇹', 
                specialty: 'Air & Sea Freight',
                articles: 38,
                whatsapp: '+251-XXX-XXXX'
              },
              { 
                name: 'David Tesfaye', 
                role: 'Market Analysis Director', 
                country: '🇪🇹', 
                specialty: 'Global Markets',
                articles: 52,
                whatsapp: '+251-XXX-XXXX'
              },
            ].map((author, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -20 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ rotateY: 5, y: -10 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group"
              >
                <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all text-center">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 text-3xl">
                      {author.country}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {author.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {author.role}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      {author.specialty}
                    </Badge>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {author.articles} Articles Published
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Telegram
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block - Follow Export Intelligence */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center py-16 px-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <Globe className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get Weekly Export Market Insights — Free!
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Stay ahead with the latest trends, pricing updates, and logistics innovations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 backdrop-blur-xl border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/50"
                />
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Subscribe Now
                  </motion.span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
              </div>
              
              {/* Sparkle Effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
