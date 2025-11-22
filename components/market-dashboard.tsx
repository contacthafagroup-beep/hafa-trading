'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Commodity {
  id: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}

const commodities: Commodity[] = [
  { id: '1', name: 'Fresh Rosemary', price: 12.5, unit: 'kg', change: 5.2, trend: 'up', icon: '🌿' },
  { id: '2', name: 'Ginger Root', price: 8.75, unit: 'kg', change: -2.1, trend: 'down', icon: '🫚' },
  { id: '3', name: 'Coffee Arabica', price: 24.3, unit: 'kg', change: 8.5, trend: 'up', icon: '☕' },
  { id: '4', name: 'Sesame Seeds', price: 15.6, unit: 'kg', change: 0.5, trend: 'up', icon: '🌾' },
  { id: '5', name: 'White Wheat', price: 6.2, unit: 'kg', change: 3.8, trend: 'up', icon: '🌾' },
  { id: '6', name: 'Fresh Thyme', price: 18.9, unit: 'kg', change: 6.3, trend: 'up', icon: '🌿' }
];

export default function MarketDashboard() {
  const [selected, setSelected] = useState(commodities[0]);

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
            <span className="text-6xl">📊</span>
            <span className="text-6xl">💹</span>
            <span className="text-6xl">📈</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Market Trends & Price Dashboard
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time <span className="font-bold text-blue-600 dark:text-blue-400">agricultural commodity prices</span> from Ethiopian markets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Live Commodity Prices</h3>
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
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{item.icon}</span>
                          <div>
                            <h4 className="font-bold text-base">{item.name}</h4>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ${item.price.toFixed(2)}/{item.unit}
                            </span>
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
