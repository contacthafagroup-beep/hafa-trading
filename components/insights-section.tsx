'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { Calendar, ArrowRight, Sun, Moon, Globe } from 'lucide-react';

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
  const [brightness, setBrightness] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  // Helper function to get translated content
  const getTranslatedContent = (insight: Insight | null) => {
    if (!insight) return null;
    
    const langMap: { [key: string]: string } = {
      'English': 'english',
      'አማርኛ (Amharic)': 'amharic',
      'العربية (Arabic)': 'arabic',
      'Français': 'french',
      '中文 (Chinese)': 'chinese'
    };

    const langKey = langMap[language];
    
    if (langKey === 'english' || !insight.translations || !insight.translations[langKey]) {
      return {
        title: insight.title,
        summary: insight.summary,
        content: insight.content
      };
    }

    return insight.translations[langKey];
  };

  // Default sample insights if Firebase is not configured
  const defaultInsights: Insight[] = [
    {
      id: '1',
      title: 'UAE Increases Demand for Fresh Rosemary & Herbs',
      summary: 'Export opportunities rise for East African suppliers.',
      category: 'Herbs & Spices',
      date: '2025-03-22',
      content: 'UAE buyers show increasing preference for Ethiopian rosemary due to its strong aroma and long-lasting freshness. Market demand is projected to grow 25% over the next year, creating major opportunities for suppliers.\n\nThe demand surge is driven by the growing restaurant and hospitality sector in Dubai and Abu Dhabi, where fresh herbs are essential ingredients. Ethiopian rosemary is particularly valued for its organic cultivation methods and superior quality compared to competitors.',
      featured: true,
      visible: true
    },
    {
      id: '2',
      title: 'Saudi Arabia Introduces New Quality Requirements on Fresh Produce Imports',
      summary: 'Updated regulations for agricultural exports.',
      category: 'Regulations',
      date: '2025-03-20',
      content: 'Saudi Arabia has announced new quality standards for imported fresh produce, effective from April 2025. All exporters must comply with enhanced traceability requirements and obtain updated certifications.\n\nKey changes include mandatory pesticide residue testing, improved cold chain documentation, and stricter packaging standards. Exporters are advised to work closely with certification bodies to ensure compliance.',
      featured: false,
      visible: true
    },
    {
      id: '3',
      title: 'China Expands Market for East African Legumes',
      summary: 'New trade agreements open opportunities.',
      category: 'Cereals & Legumes',
      date: '2025-03-18',
      content: 'China has signed new trade agreements with East African countries, significantly expanding market access for legumes including chickpeas, lentils, and beans. The agreement reduces import tariffs by 40%.\n\nThis development presents substantial opportunities for Ethiopian exporters, as China\'s growing middle class increasingly demands high-protein plant-based foods. Market analysts predict a 300% increase in legume exports over the next three years.',
      featured: false,
      visible: true
    }
  ];

  useEffect(() => {
    try {
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
        
        // Use Firebase data if available, otherwise use defaults
        if (insightsData.length > 0) {
          setInsights(insightsData);
          if (!selectedInsight) {
            setSelectedInsight(insightsData[0]);
          }
        } else {
          setInsights(defaultInsights);
          if (!selectedInsight) {
            setSelectedInsight(defaultInsights[0]);
          }
        }
      }, (error) => {
        console.log('Firebase not configured, using default insights');
        setInsights(defaultInsights);
        setSelectedInsight(defaultInsights[0]);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log('Firebase not configured, using default insights');
      setInsights(defaultInsights);
      setSelectedInsight(defaultInsights[0]);
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
        
        {/* Floating Icons */}
        {['📰', '📱', '🌐', '💡', '📊', '🚀'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        ))}
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
              className="mb-10"
            >
              {/* Animated Icons */}
              <div className="flex items-center gap-3 mb-6">
                {['📰', '💡', '🚀'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                      y: [0, -8, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="text-5xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
              
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Bringing you the latest insights
                </span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl md:text-4xl font-normal bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 bg-clip-text text-transparent"
                >
                  from the export industry
                </motion.span>
              </motion.h2>
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
                    whileHover={{ x: 12, scale: 1.03 }}
                    onClick={() => setSelectedInsight(insight)}
                    className="cursor-pointer group"
                  >
                    <Card className={`transition-all duration-500 backdrop-blur-xl relative overflow-hidden ${
                      selectedInsight?.id === insight.id
                        ? 'border-2 border-purple-500 shadow-2xl shadow-purple-500/50 bg-purple-50/90 dark:bg-purple-900/30'
                        : 'bg-white/90 dark:bg-gray-800/90 border-2 border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400 hover:shadow-xl'
                    }`}>
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      {/* Glowing border effect */}
                      {selectedInsight?.id === insight.id && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(168, 85, 247, 0.3)',
                              '0 0 40px rgba(168, 85, 247, 0.6)',
                              '0 0 20px rgba(168, 85, 247, 0.3)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      )}
                      
                      <CardContent className="p-5 relative z-10">
                        <div className="flex items-start gap-4">
                          {/* Animated Icon */}
                          <motion.div
                            animate={{ 
                              scale: selectedInsight?.id === insight.id ? [1, 1.2, 1] : 1,
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl flex-shrink-0"
                          >
                            {categoryIcons[insight.category] || '📰'}
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {insight.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                              {insight.summary}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(insight.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                                {insight.category}
                              </span>
                            </div>
                          </div>
                          
                          <motion.div
                            animate={{ 
                              x: selectedInsight?.id === insight.id ? [0, 5, 0] : 0
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className={`w-6 h-6 flex-shrink-0 transition-all ${
                              selectedInsight?.id === insight.id ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'
                            }`} />
                          </motion.div>
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
              {/* Premium Floating animation */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* iPhone Mockup */}
                <div className="relative mx-auto max-w-sm">
                  {/* Glowing aura */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    {/* Metallic shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[3rem]"
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10 shadow-lg"></div>
                    
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
                      <div 
                        className="h-[600px] overflow-y-auto custom-scrollbar"
                        style={{ 
                          filter: `brightness(${brightness}%)`,
                          backgroundColor: isDarkMode ? '#000' : '#fff'
                        }}
                      >
                        {selectedInsight ? (
                          <motion.div
                            key={selectedInsight.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-6"
                            style={{ color: isDarkMode ? '#fff' : '#000' }}
                          >
                            {/* Mobile Controls */}
                            <motion.div
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mb-6 space-y-3 p-4 rounded-xl"
                              style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#f3f4f6' }}
                            >
                              {/* Brightness Control */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-semibold flex items-center gap-1">
                                    ☀️ Brightness
                                  </span>
                                  <span className="text-xs">{brightness}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="150"
                                  value={brightness}
                                  onChange={(e) => setBrightness(Number(e.target.value))}
                                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                  style={{
                                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(brightness - 50) / 1}%, #e5e7eb ${(brightness - 50) / 1}%, #e5e7eb 100%)`
                                  }}
                                />
                              </div>

                              {/* Day/Night Mode */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold">
                                  {isDarkMode ? '🌙' : '☀️'} {isDarkMode ? 'Night' : 'Day'} Mode
                                </span>
                                <button
                                  onClick={() => setIsDarkMode(!isDarkMode)}
                                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                                  style={{ backgroundColor: isDarkMode ? '#a855f7' : '#d1d5db' }}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </div>

                              {/* Language Preference */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold">🌐 Language</span>
                                <select
                                  value={language}
                                  onChange={(e) => setLanguage(e.target.value)}
                                  className="text-xs px-2 py-1 rounded-lg border"
                                  style={{
                                    backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                                    color: isDarkMode ? '#fff' : '#000',
                                    borderColor: isDarkMode ? '#444' : '#d1d5db'
                                  }}
                                >
                                  <option value="English">English</option>
                                  <option value="Amharic">አማርኛ (Amharic)</option>
                                  <option value="Arabic">العربية (Arabic)</option>
                                  <option value="French">Français</option>
                                  <option value="Chinese">中文 (Chinese)</option>
                                </select>
                              </div>
                            </motion.div>

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
                              <span 
                                className="px-3 py-1 rounded-full text-sm font-semibold"
                                style={{
                                  backgroundColor: isDarkMode ? '#7c3aed' : '#f3e8ff',
                                  color: isDarkMode ? '#e9d5ff' : '#7c3aed'
                                }}
                              >
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
                              {getTranslatedContent(selectedInsight)?.title}
                            </motion.h3>

                            {/* Date */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="flex items-center gap-2 text-sm mb-6"
                              style={{ opacity: 0.7 }}
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
                              className="prose prose-sm max-w-none mb-8"
                            >
                              <p className="leading-relaxed whitespace-pre-wrap" style={{ opacity: 0.8 }}>
                                {getTranslatedContent(selectedInsight)?.content}
                              </p>
                            </motion.div>

                            {/* Read More Button */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.6 }}
                              className="mt-8 mb-6"
                            >
                              <a
                                href={`/insights/${selectedInsight.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-center hover:scale-105"
                              >
                                Read Full Report →
                              </a>
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

                  {/* Enhanced Glow Effect */}
                  <motion.div
                    className="absolute inset-0 -z-20 bg-gradient-to-br from-purple-500/25 to-blue-500/25 blur-3xl rounded-full"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
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
