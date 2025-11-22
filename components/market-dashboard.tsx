'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react';

interface Commodity {
  id: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  lastUpdate: string;
}

const initialCommodities: Commodity[] = [
  { id: '1', name: 'Fresh Rosemary', price: 12.5, unit: 'kg', change: 5.2, trend: 'up', icon: '🌿', lastUpdate: 'Just now' },
  { id: '2', name: 'Ginger Root', price: 8.75, unit: 'kg', change: -2.1, trend: 'down', icon: '🫚', lastUpdate: 'Just now' },
  { id: '3', name: 'Coffee Arabica', price: 24.3, unit: 'kg', change: 8.5, trend: 'up', icon: '☕', lastUpdate: 'Just now' },
  { id: '4', name: 'Sesame Seeds', price: 15.6, unit: 'kg', change: 0.5, trend: 'up', icon: '🌾', lastUpdate: 'Just now' },
  { id: '5', name: 'White Wheat', price: 6.2, unit: 'kg', change: 3.8, trend: 'up', icon: '🌾', lastUpdate: 'Just now' },
  { id: '6', name: 'Fresh Thyme', price: 18.9, unit: 'kg', change: 6.3, trend: 'up', icon: '🌿', lastUpdate: 'Just now' }
];

export default function MarketDashboard() {
  const [commodities, setCommodities] = useState(initialCommodities);
  const [selected, setSelected] = useState(initialCommodities[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Simulate live price updates
  const updatePrices = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCommodities(prev => prev.map(item => {
        const variation = (Math.random() - 0.5) * 0.02;
        const newPrice = item.price * (1 + variation);
        const priceChange = ((newPrice - item.price) / item.price) * 100;
        const newTotalChange = item.change + priceChange;
        return {
          ...item,
          price: newPrice,
          change: newTotalChange,
          trend: newTotalChange >= 0 ? 'up' : 'down',
          lastUpdate: 'Just now'
        };
      }));
      setLastUpdateTime(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  // Auto-update every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update selected commodity when commodities change
  useEffect(() => {
    const updated = commodities.find(c => c.id === selected.id);
    if (updated) setSelected(updated);
  }, [commodities, selected.id]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            {['📊', '💹', '📈'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1], y: [0, -8, 0] }}
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
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Real-time <span className="font-bold text-blue-600 dark:text-blue-400">agricultural commodity prices</span> from Ethiopian markets
          </p>
          
          <motion.button
            onClick={updatePrices}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Refresh Prices'}
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Live Commodity Prices</h3>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </motion.div>
            </div>
            <div className="space-y-3">
              {commodities.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => setSelected(item)}
                  className="cursor-pointer"
                >
                  <Card className={`transition-all ${selected.id === item.id ? 'border-2 border-blue-500 shadow-xl bg-blue-50 dark:bg-blue-900/30' : 'hover:shadow-lg'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <motion.span
                            animate={selected.id === item.id ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                          >
                            {item.icon}
                          </motion.span>
                          <div className="flex-1">
                            <h4 className="font-bold text-base mb-1">{item.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-500">/{item.unit}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{item.lastUpdate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`text-sm font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{selected.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{selected.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ethiopian Market Price</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Price</p>
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                    ${selected.price.toFixed(2)}
                    <span className="text-2xl text-gray-500 ml-2">/{selected.unit}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {selected.trend === 'up' ? (
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    )}
                    <span className={`text-xl font-bold ${selected.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {selected.change > 0 ? '+' : ''}{selected.change.toFixed(1)}% (Last 7 days)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">High</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">${(selected.price * 1.1).toFixed(2)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">📉</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Low</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">${(selected.price * 0.9).toFixed(2)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">${selected.price.toFixed(2)}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
