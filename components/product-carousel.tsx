'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  icon: string;
  color: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Ginger Root',
    description: 'Premium quality Ethiopian ginger with strong aroma and rich flavor. Perfect for culinary and medicinal use.',
    image: '/products/ginger.jpg',
    category: 'Herbs & Spices',
    icon: '🫚',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: '2',
    name: 'Organic Rosemary',
    description: 'Aromatic fresh rosemary harvested from highland farms. Ideal for cooking and essential oils.',
    image: '/products/rosemary.jpg',
    category: 'Herbs & Spices',
    icon: '🌿',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: '3',
    name: 'Coffee Arabica',
    description: 'World-renowned Ethiopian coffee beans with distinctive fruity notes and smooth finish.',
    image: '/products/coffee.jpg',
    category: 'Beverages',
    icon: '☕',
    color: 'from-brown-500 to-amber-700'
  },
  {
    id: '4',
    name: 'Red Onions',
    description: 'Fresh, crisp red onions with sweet flavor. Grown in fertile Ethiopian soil.',
    image: '/products/onion.jpg',
    category: 'Fresh Vegetables',
    icon: '🧅',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: '5',
    name: 'Red Pepper',
    description: 'Vibrant red peppers packed with vitamins. Perfect for fresh consumption or processing.',
    image: '/products/pepper.jpg',
    category: 'Fresh Vegetables',
    icon: '🌶️',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: '6',
    name: 'Sesame Seeds',
    description: 'High-quality sesame seeds rich in nutrients. Ideal for oil production and culinary use.',
    image: '/products/sesame.jpg',
    category: 'Cereals & Legumes',
    icon: '🌾',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: '7',
    name: 'Fresh Thyme',
    description: 'Aromatic thyme with intense flavor. Perfect for seasoning and herbal remedies.',
    image: '/products/thyme.jpg',
    category: 'Herbs & Spices',
    icon: '🌿',
    color: 'from-teal-500 to-green-600'
  },
  {
    id: '8',
    name: 'White Wheat',
    description: 'Premium quality wheat grains. Perfect for flour production and baking.',
    image: '/products/wheat.jpg',
    category: 'Cereals & Legumes',
    icon: '🌾',
    color: 'from-yellow-600 to-orange-600'
  }
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = products.length - 1;
      if (nextIndex >= products.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const currentProduct = products[currentIndex];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-purple-600" />
            </motion.div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Discover Our Premium Products
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our <span className="font-bold text-purple-600 dark:text-purple-400">world-class selection</span> of Ethiopian agricultural products
          </p>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[500px] flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  rotateY: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-4xl"
                >
                  <Card className="overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-800/50 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-6 p-8">
                      {/* Left: Image */}
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
                        >
                          {/* Placeholder with icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="text-9xl"
                            >
                              {currentProduct.icon}
                            </motion.div>
                          </div>
                          
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color} opacity-20`} />
                          
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>

                        {/* Category badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-4 left-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full border border-purple-200 dark:border-purple-800"
                        >
                          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            {currentProduct.category}
                          </span>
                        </motion.div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-5xl">{currentProduct.icon}</span>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                              {currentProduct.name}
                            </h3>
                          </div>
                          
                          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {currentProduct.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-3 mb-6">
                            {['Premium Quality', 'Export Ready', 'Certified Organic'].map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 bg-gradient-to-r ${currentProduct.color} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all`}
                          >
                            Learn More
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border-2 border-purple-200 dark:border-purple-800 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border-2 border-purple-200 dark:border-purple-800 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-purple-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
