'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { Calendar, ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  thumbnail?: string;
  content: string;
  featured: boolean;
  visible: boolean;
}

const categoryIcons: { [key: string]: string } = {
  'Herbs & Spices': '🌿',
  'Fresh Vegetables': '🥬',
  'Cereals & Legumes': '🌾',
  'Regulations': '🧪',
  'Logistics': '🚚',
  'Agriculture': '🌱',
  'Livestock': '🐑',
  'Trade News': '📰',
  'Export': '✈️'
};

export default function InsightsSection() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  useEffect(() => {
    const insightsRef = collection(db, 'insights');
    const q = query(
      insightsRef,
      where('visible', '==', true),
      orderBy('featured', 'desc'),
      orderBy('date', 'desc'),
      limit(6)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const insightsData: Insight[] = [];
      snapshot.forEach((doc) => {
        insightsData.push({ id: doc.id, ...doc.data() } as Insight);
      });
      setInsights(insightsData);
      if (insightsData.length > 0 && !selectedInsight) {
        setSelectedInsight(insightsData[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Article List */}
          <div className="lg:col-span-2">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              >
                Bringing you the latest insights
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-muted-foreground"
              >
                from the export industry
              </motion.p>
            </motion.div>

            {/* Article List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {insights.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground">No insights available yet</p>
                </motion.div>
              ) : (
                insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    onClick={() => setSelectedInsight(insight)}
                    className="cursor-pointer"
                  >
                    <Card className={`transition-all duration-300 ${
                      selectedInsight?.id === insight.id
                        ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/50 bg-purple-50 dark:bg-purple-900/20'
                        : 'hover:border-purple-300 hover:shadow-md'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl flex-shrink-0">
                            {categoryIcons[insight.category] || '📰'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-1 line-clamp-2">
                              {insight.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {insight.summary}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(insight.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                                {insight.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                            selectedInsight?.id === insight.id ? 'translate-x-1' : ''
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Mobile Preview */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-24"
            >
              {/* Floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* iPhone Mockup */}
                <div className="relative mx-auto max-w-sm">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                    
                    {/* Screen */}
                    <div className="relative bg-white dark:bg-gray-950 rounded-[2.5rem] overflow-hidden shadow-inner">
                      {/* Status Bar */}
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 flex items-center justify-between text-white text-xs">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <span>📶</span>
                          <span>📡</span>
                          <span>🔋</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="h-[600px] overflow-y-auto custom-scrollbar">
                        {selectedInsight ? (
                          <motion.div
                            key={selectedInsight.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-6"
                          >
                            {/* Thumbnail */}
                            {selectedInsight.thumbnail && (
                              <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 rounded-2xl overflow-hidden"
                              >
                                <img
                                  src={selectedInsight.thumbnail}
                                  alt={selectedInsight.title}
                                  className="w-full h-48 object-cover"
                                />
                              </motion.div>
                            )}

                            {/* Category Badge */}
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="flex items-center gap-2 mb-3"
                            >
                              <span className="text-2xl">
                                {categoryIcons[selectedInsight.category] || '📰'}
                              </span>
                              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                                {selectedInsight.category}
                              </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="text-2xl font-bold mb-3"
                            >
                              {selectedInsight.title}
                            </motion.h3>

                            {/* Date */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
                            >
                              <Calendar className="w-4 h-4" />
                              {new Date(selectedInsight.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </motion.div>

                            {/* Content */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="prose prose-sm dark:prose-invert max-w-none"
                            >
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {selectedInsight.content}
                              </p>
                            </motion.div>

                            {/* Read More Button */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.6 }}
                              className="mt-8"
                            >
                              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                                Read Full Report →
                              </button>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <div className="h-full flex items-center justify-center p-6 text-center">
                            <div>
                              <div className="text-6xl mb-4">📱</div>
                              <p className="text-muted-foreground">
                                Select an insight to preview
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </section>
  );
}
