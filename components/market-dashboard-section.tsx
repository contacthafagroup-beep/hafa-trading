'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Commodity {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  chartData: number[];
}

const defaultCommodities: Commodity[] = [
  {
    id: '1',
    name: 'Fresh Rosemary',
    price: 12.50,
    currency: 'USD',
    unit: 'kg',
    change: 5.2,
    trend: 'up',
    icon: '🌿',
    chartData: [10, 11, 10.5, 11.5, 12, 11.8, 12.5]
  },
  {
    id: '2',
    name: 'Ginger Root',
    price: 8.75,
    currency: 'USD',
    unit: 'kg',
    change: -2.1,
    trend: 'down',
    icon: '🫚',
    chartData: [9.5, 9.2, 9, 8.9, 8.8, 8.7, 8.75]
  },
  {
    id: '3',
    name: 'Coffee Arabica',
    price: 24.30,
    currency: 'USD',
    unit: 'kg',
    change: 8.5,
    trend: 'up',
    icon: '☕',
    chartData: [20, 21, 22, 22.5, 23, 23.8, 24.3]
  },
  {
    id: '4',
    name: 'Sesame Seeds',
    price: 15.60,
    currency: 'USD',
    unit: 'kg',
    change: 0.0,
    trend: 'stable',
    icon: '🌾',
    chartData: [15.6, 15.5, 15.6, 15.7, 15.6, 15.5, 15.6]
  },
  {
    id: '5',
    name: 'White Wheat',
    price: 6.20,
    currency: 'USD',
    unit: 'kg',
    change: 3.8,
    trend: 'up',
    icon: '🌾',
    chartData: [5.5, 5.7, 5.9, 6, 6.1, 6.15, 6.2]
  },
  {
    id: '6',
    name: 'Red Sorghum',
    price: 5.40,
    currency: 'USD',
    unit: 'kg',
    change: -1.5,
    trend: 'down',
    icon: '🌾',
    chartData: [5.8, 5.7, 5.6, 5.5, 5.45, 5.42, 5.4]
  },
  {
    id: '7',
    name: 'Fresh Thyme',
    price: 18.90,
    currency: 'USD',
    unit: 'kg',
    change: 6.3,
    trend: 'up',
    icon: '🌿',
    chartData: [16, 16.5, 17, 17.5, 18, 18.5, 18.9]
  },
  {
    id: '8',
    name: 'Black Cumin',
    price: 22.50,
    currency: 'USD',
    unit: 'kg',
    change: 4.1,
    trend: 'up',
    icon: '🌰',
    chartData: [20, 20.5, 21, 21.5, 22, 22.3, 22.5]
  }
];

export default function MarketDashboardSection() {
  const [commodities, setCommodities] = useState<Commodity[]>(defaultCommodities);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity>(defaultCommodities[0]);
  const [animatedPrice, setAnimatedPrice] = useState(selectedCommodity.price);

  // Animate price changes
  useEffect(() => {
    const start = animatedPrice;
    const end = selectedCommodity.price;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = start + (end - start) * progress;
      setAnimatedPrice(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCommodity.price]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-900">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl"
        />

        {/* Floating Icons */}
        {['📈', '💹', '📊', '💰', '🌍', '📉'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            {['📊', '💹', '📈'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  y: [0, -8, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                className="text-6xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Market Trends & Price Dashboard
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Real-time <span className="font-bold text-blue-600 dark:text-blue-400">agricultural commodity prices</span> and market trends from Ethiopian markets
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Side - Commodity List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Live Commodity Prices
              </h3>

              <div className="space-y-3">
                {commodities.map((commodity, index) => (
                  <motion.div
                    key={commodity.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    onClick={() => setSelectedCommodity(commodity)}
                    className="cursor-pointer"
                  >
                    <Card className={`transition-all duration-300 backdrop-blur-xl ${
                      selectedCommodity.id === commodity.id
                        ? 'border-2 border-blue-500 shadow-xl shadow-blue-500/30 bg-blue-50/90 dark:bg-blue-900/30'
                        : 'bg-white/90 dark:bg-gray-800/90 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400 hover:shadow-lg'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <motion.div
                              animate={{
                                scale: selectedCommodity.id === commodity.id ? [1, 1.2, 1] : 1,
                                rotate: [0, 10, -10, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-4xl"
                            >
                              {commodity.icon}
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-bold text-base mb-1">{commodity.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                  ${commodity.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">/{commodity.unit}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            {getTrendIcon(commodity.trend)}
                            <span className={`text-sm font-bold ${getTrendColor(commodity.trend)}`}>
                              {commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Animated Dashboard */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-24"
            >
              {/* Tablet Frame */}
              <div className="relative mx-auto max-w-2xl">
                {/* Glowing aura */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl rounded-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Tablet Device */}
                <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-3xl p-4 shadow-2xl">
                  {/* Screen */}
                  <div className="relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-inner">
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 flex items-center justify-between text-white text-sm">
                      <span className="font-semibold">Market Dashboard</span>
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📊
                        </motion.span>
                        <span className="text-xs">Live</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-950 min-h-[500px]">
                      <motion.div
                        key={selectedCommodity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Commodity Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="text-5xl"
                            >
                              {selectedCommodity.icon}
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {selectedCommodity.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Ethiopian Market Price
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price Display */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-6 border-2 border-blue-200/50 dark:border-blue-800/50">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Price</p>
                              <motion.div
                                key={selectedCommodity.price}
                                initial={{ scale: 1.2, color: '#3b82f6' }}
                                animate={{ scale: 1, color: '#1e40af' }}
                                className="text-5xl font-bold text-blue-600 dark:text-blue-400"
                              >
                                ${animatedPrice.toFixed(2)}
                                <span className="text-2xl text-gray-500 ml-2">/{selectedCommodity.unit}</span>
                              </motion.div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-2">
                                {getTrendIcon(selectedCommodity.trend)}
                                <span className={`text-2xl font-bold ${getTrendColor(selectedCommodity.trend)}`}>
                                  {selectedCommodity.change > 0 ? '+' : ''}{selectedCommodity.change.toFixed(1)}%
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">Last 7 days</p>
                            </div>
                          </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-gray-200/50 dark:border-gray-700/50">
                          <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
                            7-Day Price Trend
                          </h4>
                          <div className="relative h-48">
                            <svg className="w-full h-full" viewBox="0 0 700 200">
                              {/* Grid lines */}
                              {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                  key={i}
                                  x1="0"
                                  y1={i * 50}
                                  x2="700"
                                  y2={i * 50}
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  className="text-gray-200 dark:text-gray-700"
                                  opacity="0.3"
                                />
                              ))}

                              {/* Animated Line Chart */}
                              <motion.path
                                d={`M ${selectedCommodity.chartData.map((value, i) => {
                                  const x = (i / (selectedCommodity.chartData.length - 1)) * 700;
                                  const minPrice = Math.min(...selectedCommodity.chartData);
                                  const maxPrice = Math.max(...selectedCommodity.chartData);
                                  const y = 180 - ((value - minPrice) / (maxPrice - minPrice)) * 160;
                                  return `${x},${y}`;
                                }).join(' L ')}`
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                              />

                              {/* Gradient Definition */}
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="50%" stopColor="#6366f1" />
                                  <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                              </defs>

                              {/* Data Points */}
                              {selectedCommodity.chartData.map((value, i) => {
                                const x = (i / (selectedCommodity.chartData.length - 1)) * 700;
                                const minPrice = Math.min(...selectedCommodity.chartData);
                                const maxPrice = Math.max(...selectedCommodity.chartData);
                                const y = 180 - ((value - minPrice) / (maxPrice - minPrice)) * 160;
                                
                                return (
                                  <motion.circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r="6"
                                    fill="#3b82f6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 + 2 }}
                                  />
                                );
                              })}
                            </svg>
                          </div>

                          {/* Days Labels */}
                          <div className="flex justify-between mt-4 text-xs text-gray-500">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                              <span key={i}>{day}</span>
                            ))}
                          </div>
                        </div>

                        {/* Market Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          {[
                            { label: 'High', value: `$${Math.max(...selectedCommodity.chartData).toFixed(2)}`, icon: '📈' },
                            { label: 'Low', value: `$${Math.min(...selectedCommodity.chartData).toFixed(2)}`, icon: '📉' },
                            { label: 'Avg', value: `$${(selectedCommodity.chartData.reduce((a, b) => a + b, 0) / selectedCommodity.chartData.length).toFixed(2)}`, icon: '📊' }
                          ].map((stat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 2.5 + i * 0.1 }}
                              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 text-center"
                            >
                              <div className="text-2xl mb-1">{stat.icon}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
