'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface WhyChooseData {
  title: string;
  subtitle: string;
  videoUrl: string;
  videoCaption: string;
  ctaText: string;
  ctaLink: string;
  features: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    videoUrl: string;
  }[];
}

export default function WhyChooseSection() {
  const [data, setData] = useState<WhyChooseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const defaultData: WhyChooseData = {
        title: 'Why Choose Hafa Trading PLC?',
        subtitle: 'Trusted global exporter of premium agricultural products, herbs, livestock, and spices — delivering freshness, quality, and reliability worldwide.',
        videoUrl: '',
        videoCaption: 'Quality You Can Trust. From Farm to Market.',
        ctaText: '🛒 Explore All Products',
        ctaLink: '/export-products',
        features: [
          {
            title: 'Direct Farm Sourcing',
            subtitle: 'Freshness Guaranteed',
            description: 'We partner directly with local farmers, cooperatives, and rural suppliers, ensuring 100% traceable, ethically-grown products — from fresh rosemary and spices to premium vegetables and cereals.',
            icon: '🌱',
            videoUrl: ''
          },
          {
            title: 'Global Logistics Support',
            subtitle: 'Air • Sea • Road',
            description: 'From Ethiopia to the world — delivered with precision, speed, and temperature-controlled logistics. We coordinate air freight, sea freight, and inland transport with real-time tracking.',
            icon: '🌐',
            videoUrl: ''
          },
          {
            title: 'Customized Packaging',
            subtitle: 'Options',
            description: 'Choose from vacuum-sealed, eco-friendly, private-label, and bulk export packaging options — all designed to keep products fresh and preserve aroma during long transport.',
            icon: '📦',
            videoUrl: ''
          },
          {
            title: 'Competitive Wholesale Pricing',
            subtitle: '',
            description: 'By cutting middlemen and sourcing straight from farms, we deliver global market–competitive pricing with transparent quotes and stable supply.',
            icon: '💲',
            videoUrl: ''
          }
        ]
      };

      try {
        const docRef = doc(db, 'siteContent', 'whyChoose');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setData(docSnap.data() as WhyChooseData);
        } else {
          // Use default data if not found
          setData(defaultData);
        }
      } catch (error) {
        console.error('Error loading Why Choose data:', error);
        // Use default data on error
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper function to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube watch URL
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&loop=0&controls=1`;
    }
    
    // YouTube short URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&loop=0&controls=1`;
    }
    
    // Already an embed URL or direct video
    return url;
  };

  if (loading || !data) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const embedUrl = getEmbedUrl(data.videoUrl);
  const isVideo = embedUrl && (embedUrl.includes('youtube.com') || embedUrl.includes('.mp4') || embedUrl.includes('.webm'));

  const handleFeatureClick = (index: number) => {
    if (data.features[index].videoUrl) {
      setSelectedFeature(index);
      setShowVideoModal(true);
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedFeature(null);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Parallax Background Layers */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              {/* Layer 1: Ethiopian farmland silhouette with parallax */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 dark:from-green-950 dark:via-emerald-900 dark:to-green-800"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 Q 25 30, 50 50 T 100 50 L 100 100 L 0 100 Z\' fill=\'%23166534\' opacity=\'0.1\'/%3E%3C/svg%3E")',
                  backgroundSize: '200px 100px',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: 'bottom'
                }}
                animate={{
                  backgroundPositionX: ['0px', '200px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              {/* Layer 2: Animated sunlight rays */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute top-0 w-1 h-full bg-gradient-to-b from-yellow-200/30 via-yellow-100/10 to-transparent"
                    style={{
                      left: `${20 + i * 20}%`,
                      transformOrigin: 'top center'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scaleY: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </div>

              {/* Layer 3: Floating particles */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 bg-green-400/20 rounded-full blur-sm"
                    initial={{ 
                      x: Math.random() * 100 + '%', 
                      y: '100%',
                      scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                      y: [null, '-20%'],
                      x: [null, `${Math.random() * 100}%`],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: Math.random() * 8 + 6,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:via-black/5 dark:to-black/20"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-16">
            {/* Title with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.03, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl md:text-7xl"
                >
                  🌍
                </motion.div>
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="text-4xl"
                >
                  🍃
                </motion.div>
              </div>
              
              <motion.h3 
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 dark:from-green-400 dark:via-emerald-300 dark:to-green-400 bg-clip-text text-transparent mb-6"
              >
                {data.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
            </motion.div>

            {/* Video Section */}
            {isVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-16 -mx-8 md:-mx-16"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full bg-black/20 backdrop-blur-sm"
                    style={{ aspectRatio: '21/9' }}
                  >
                    {embedUrl.includes('youtube.com') ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        loop
                      />
                    )}
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
                    
                    {/* Glowing border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(34, 197, 94, 0)',
                          '0 0 30px rgba(34, 197, 94, 0.4)',
                          '0 0 0px rgba(34, 197, 94, 0)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {data.features.map((feature, index) => {
                const colors = [
                  { border: 'border-green-200/50 dark:border-green-700/50 hover:border-green-400 dark:hover:border-green-500', glow: 'rgba(34, 197, 94, 0.6)', gradient: 'from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10', text: 'text-green-600 dark:text-green-400', shadow: 'hover:shadow-green-500/20' },
                  { border: 'border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-500', glow: 'rgba(59, 130, 246, 0.6)', gradient: 'from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10', text: 'text-blue-600 dark:text-blue-400', shadow: 'hover:shadow-blue-500/20' },
                  { border: 'border-purple-200/50 dark:border-purple-700/50 hover:border-purple-400 dark:hover:border-purple-500', glow: 'rgba(168, 85, 247, 0.6)', gradient: 'from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10', text: 'text-purple-600 dark:text-purple-400', shadow: 'hover:shadow-purple-500/20' },
                  { border: 'border-yellow-200/50 dark:border-yellow-700/50 hover:border-yellow-400 dark:hover:border-yellow-500', glow: 'rgba(234, 179, 8, 0.6)', gradient: 'from-yellow-500/0 to-amber-500/0 group-hover:from-yellow-500/10 group-hover:to-amber-500/10', text: 'text-yellow-600 dark:text-yellow-400', shadow: 'hover:shadow-yellow-500/20' }
                ];
                const color = colors[index % 4];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: index < 2 ? 0 : 50 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                    whileHover={{ scale: 1.04, y: -8 }}
                    className="group"
                  >
                    <div 
                      className={`relative h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 border-2 ${color.border} transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl ${color.shadow} ${feature.videoUrl ? 'cursor-pointer' : ''}`}
                      onClick={() => handleFeatureClick(index)}
                    >
                      {/* Neon border sweep */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        animate={{
                          boxShadow: [
                            `0 0 0px ${color.glow.replace('0.6', '0')}`,
                            `0 0 20px ${color.glow}`,
                            `0 0 0px ${color.glow.replace('0.6', '0')}`
                          ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
                      />
                      
                      {/* Animated Icon */}
                      <motion.div
                        animate={
                          index === 0 ? { y: [0, -5, 0], scale: [1, 1.05, 1] } :
                          index === 1 ? { rotate: [0, 360] } :
                          index === 2 ? { rotateY: [0, 15, 0], y: [0, -3, 0] } :
                          { scale: [1, 1.1, 1] }
                        }
                        transition={
                          index === 0 ? { duration: 3, repeat: Infinity } :
                          index === 1 ? { duration: 10, repeat: Infinity, ease: 'linear' } :
                          index === 2 ? { duration: 5, repeat: Infinity } :
                          { duration: 2, repeat: Infinity }
                        }
                        whileHover={
                          index === 0 ? { scale: 1.2, rotate: [0, -5, 5, 0] } :
                          index === 2 ? { scale: 1.2, rotateY: 180 } :
                          { scale: 1.2 }
                        }
                        className="text-7xl mb-4 cursor-pointer"
                        style={index === 2 ? { transformStyle: 'preserve-3d' } : {}}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h4 className={`text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:${color.text} transition-colors`}>
                        {feature.title}
                      </h4>
                      {feature.subtitle && (
                        <p className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2`}>
                          <span className={`font-semibold ${color.text}`}>{feature.subtitle}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Video indicator */}
                      {feature.videoUrl && (
                        <motion.div
                          className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          animate={{ 
                            boxShadow: [
                              '0 0 0px rgba(255, 255, 255, 0)',
                              '0 0 20px rgba(255, 255, 255, 0.5)',
                              '0 0 0px rgba(255, 255, 255, 0)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      )}
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} transition-all duration-500 rounded-3xl`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Showcase Caption */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mb-10"
            >
              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 font-bold italic">
                "{data.videoCaption}"
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <Link href={data.ctaLink}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(34, 197, 94, 0.3)',
                        '0 0 40px rgba(34, 197, 94, 0.6)',
                        '0 0 20px rgba(34, 197, 94, 0.3)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="rounded-full"
                  >
                    <Button 
                      size="lg" 
                      className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white px-10 py-7 text-lg font-bold shadow-2xl overflow-hidden group"
                    >
                      {/* Neon outer ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        whileHover={{
                          boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.4)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        {data.ctaText}
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedFeature !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Feature title */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-2xl">{data.features[selectedFeature].icon}</span>
                {data.features[selectedFeature].title}
              </p>
            </div>

            {/* Video */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              {(() => {
                const featureVideoUrl = getEmbedUrl(data.features[selectedFeature].videoUrl);
                const isYouTube = featureVideoUrl.includes('youtube.com');
                
                return isYouTube ? (
                  <iframe
                    src={featureVideoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={featureVideoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                );
              })()}
            </div>

            {/* Feature description */}
            <div className="p-6 bg-gradient-to-t from-gray-900 to-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">
                {data.features[selectedFeature].subtitle}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {data.features[selectedFeature].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
