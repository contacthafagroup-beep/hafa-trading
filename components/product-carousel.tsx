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
    description: 'Premium quality Ethiopian ginger with strong aroma and rich flavor. Perfect for culinary and medicinal use. Our ginger is hand-selected from the finest farms in Ethiopia, ensuring maximum potency and freshness. Rich in antioxidants and anti-inflammatory compounds, it is ideal for both cooking and natural remedies.',
    image: '/products/ginger.jpg',
    category: 'Herbs & Spices',
    icon: '🫚',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: '2',
    name: 'Organic Rosemary',
    description: 'Aromatic fresh rosemary harvested from highland farms. Ideal for cooking and essential oils. Grown at high altitudes where the cool climate enhances its aromatic oils, our rosemary is certified organic and pesticide-free. Perfect for Mediterranean cuisine, herbal teas, and aromatherapy applications.',
    image: '/products/rosemary.jpg',
    category: 'Herbs & Spices',
    icon: '🌿',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: '3',
    name: 'Coffee Arabica',
    description: 'World-renowned Ethiopian coffee beans with distinctive fruity notes and smooth finish. Sourced from the birthplace of coffee, our Arabica beans are shade-grown at optimal altitudes. Each batch is carefully processed to preserve the unique flavor profile that has made Ethiopian coffee legendary worldwide.',
    image: '/products/coffee.jpg',
    category: 'Beverages',
    icon: '☕',
    color: 'from-brown-500 to-amber-700'
  },
  {
    id: '4',
    name: 'Red Onions',
    description: 'Fresh, crisp red onions with sweet flavor. Grown in fertile Ethiopian soil. Our red onions are cultivated using sustainable farming practices, resulting in bulbs with perfect texture and natural sweetness. Rich in quercetin and other beneficial compounds, they are ideal for fresh consumption, cooking, or export.',
    image: '/products/onion.jpg',
    category: 'Fresh Vegetables',
    icon: '🧅',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: '5',
    name: 'Red Pepper',
    description: 'Vibrant red peppers packed with vitamins. Perfect for fresh consumption or processing. Grown under optimal sunlight conditions, our peppers are exceptionally rich in vitamin C and antioxidants. Available in various sizes and heat levels, suitable for fresh markets, processing, or spice production.',
    image: '/products/pepper.jpg',
    category: 'Fresh Vegetables',
    icon: '🌶️',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: '6',
    name: 'Sesame Seeds',
    description: 'High-quality sesame seeds rich in nutrients. Ideal for oil production and culinary use. Our sesame seeds are carefully cleaned and sorted to ensure premium quality. With high oil content and excellent nutritional profile, they are perfect for tahini production, baking, or direct consumption.',
    image: '/products/sesame.jpg',
    category: 'Cereals & Legumes',
    icon: '🌾',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: '7',
    name: 'Fresh Thyme',
    description: 'Aromatic thyme with intense flavor. Perfect for seasoning and herbal remedies. Hand-harvested at peak freshness, our thyme retains maximum essential oils and flavor compounds. Ideal for culinary applications, herbal teas, and natural medicine preparations.',
    image: '/products/thyme.jpg',
    category: 'Herbs & Spices',
    icon: '🌿',
    color: 'from-teal-500 to-green-600'
  },
  {
    id: '8',
    name: 'White Wheat',
    description: 'Premium quality wheat grains. Perfect for flour production and baking. Our wheat is grown in optimal conditions and carefully stored to maintain freshness. With high protein content and excellent gluten quality, it produces superior flour for bread, pasta, and pastry production.',
    image: '/products/wheat.jpg',
    category: 'Cereals & Legumes',
    icon: '🌾',
    color: 'from-yellow-600 to-orange-600'
  },
  {
    id: '9',
    name: 'Black Cumin Seeds',
    description: 'Premium black cumin (Nigella sativa) seeds with powerful health benefits. Known for their distinctive flavor and medicinal properties, our black cumin seeds are carefully selected and processed. Rich in thymoquinone and essential oils, they are valued in traditional medicine and gourmet cooking.',
    image: '/products/black-cumin.jpg',
    category: 'Herbs & Spices',
    icon: '🌰',
    color: 'from-gray-700 to-slate-900'
  },
  {
    id: '10',
    name: 'Chickpeas',
    description: 'High-protein chickpeas perfect for hummus and cooking. Our chickpeas are grown in nutrient-rich soil and carefully dried to preserve quality. With excellent size uniformity and cooking properties, they are ideal for hummus production, curries, salads, and snacks.',
    image: '/products/chickpeas.jpg',
    category: 'Cereals & Legumes',
    icon: '🫘',
    color: 'from-amber-600 to-yellow-700'
  },
  {
    id: '11',
    name: 'Red Lentils',
    description: 'Nutritious red lentils rich in protein and fiber. Quick-cooking and versatile, our red lentils are perfect for soups, stews, and traditional dishes. Carefully cleaned and sorted, they maintain their vibrant color and cook to a creamy consistency.',
    image: '/products/lentils.jpg',
    category: 'Cereals & Legumes',
    icon: '🫘',
    color: 'from-orange-600 to-red-700'
  },
  {
    id: '12',
    name: 'Fresh Basil',
    description: 'Aromatic sweet basil with intense fragrance. Grown in controlled conditions to ensure year-round availability, our basil has large, tender leaves perfect for pesto, salads, and Italian cuisine. Harvested at peak freshness to maximize flavor and aroma.',
    image: '/products/basil.jpg',
    category: 'Herbs & Spices',
    icon: '🌿',
    color: 'from-green-600 to-lime-700'
  },
  {
    id: '13',
    name: 'Turmeric Root',
    description: 'Golden turmeric root with high curcumin content. Our turmeric is organically grown and carefully processed to preserve its beneficial compounds. Known for its anti-inflammatory properties and vibrant color, it is essential for curry powders, natural dyes, and health supplements.',
    image: '/products/turmeric.jpg',
    category: 'Herbs & Spices',
    icon: '🟡',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: '14',
    name: 'Green Beans',
    description: 'Fresh, crisp green beans harvested at optimal maturity. Our green beans are carefully selected for uniform size and quality. Rich in vitamins and minerals, they maintain their crunch and vibrant color when cooked. Perfect for fresh markets or processing.',
    image: '/products/green-beans.jpg',
    category: 'Fresh Vegetables',
    icon: '🫛',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: '15',
    name: 'Honey',
    description: 'Pure Ethiopian honey from wildflower meadows. Our honey is raw and unfiltered, preserving all natural enzymes and nutrients. With unique floral notes reflecting Ethiopia\'s diverse flora, it is perfect for culinary use, natural remedies, and gourmet applications.',
    image: '/products/honey.jpg',
    category: 'Natural Products',
    icon: '🍯',
    color: 'from-amber-500 to-yellow-600'
  }
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                            onClick={() => {
                              setSelectedProduct(currentProduct);
                              setShowModal(true);
                            }}
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

      {/* Product Details Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`relative h-64 bg-gradient-to-br ${selectedProduct.color} rounded-t-3xl overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-9xl"
                  >
                    {selectedProduct.icon}
                  </motion.div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <span className="text-2xl">×</span>
                </button>
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{selectedProduct.icon}</span>
                  <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedProduct.name}
                  </h3>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: '✅', title: 'Premium Quality', desc: 'Hand-selected from finest sources' },
                    { icon: '🌍', title: 'Export Ready', desc: 'Meets international standards' },
                    { icon: '🌱', title: 'Organic Certified', desc: 'Pesticide-free cultivation' },
                    { icon: '📦', title: 'Bulk Available', desc: 'Flexible order quantities' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-6 py-4 bg-gradient-to-r ${selectedProduct.color} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all`}
                  >
                    Request Quote
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
