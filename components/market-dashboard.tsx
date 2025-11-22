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
    price: 12.5,
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
    price: 24.3,
    currency: 'USD',
    unit: 'kg',
    change: 8.5,
    trend: 'up',
    icon: '☕',
    chartData: [20, 21, 22, 22.5, 23, 23.8, 24.3]
  }
];

export default function MarketDashboard() {
  const [commodities] = useState<Commodity[]>(defaultCommodities);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity>(defaultCommodities[0]);
  const [animatedPrice, setAnimatedPrice] = useState(selectedCommodity.price);

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
  }, [selectedCommodity.price, animatedPrice]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400';
    if (trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Market Trends & Price Dashboard
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time agricultural commodity prices from Ethiopian markets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Live Commodity Prices</h3>
            <div className="space-y-3">
              {commodities.map((commodity) => (
                <Card
                  key={commodity.id}
                  onClick={() => setSelectedCommodity(commodity)}
                  className={`cursor-pointer transition-all ${
                    selectedCommodity.id === commodity.id
                      ? 'border-2 border-blue-500 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{commodity.icon}</span>
                        <div>
                          <h4 className="font-bold">{commodity.name}</h4>
                          <span className="text-lg font-bold text-blue-600">
                            ${commodity.price.toFixed(2)}/{commodity.unit}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {getTrendIcon(commodity.trend)}
                        <span className={`text-sm font-bold ${getTrendColor(commodity.trend)}`}>
                          {commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">{selectedCommodity.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold">{selectedCommodity.name}</h3>
                  <p className="text-sm text-gray-600">Ethiopian Market Price</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Current Price</p>
                <div className="text-5xl font-bold text-blue-600">
                  ${animatedPrice.toFixed(2)}
                  <span className="text-2xl text-gray-500 ml-2">/{selectedCommodity.unit}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">Chart visualization coming soon</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
