'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package, Thermometer } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function FreshFruitsPage() {
  const fruits = [
    {
      emoji: '🥑',
      name: 'Avocado (Hass & Ettinger)',
      features: ['High oil content', 'Best for UAE, EU, China', '4kg / 10kg carton packaging']
    },
    {
      emoji: '🥭',
      name: 'Mango (Kent, Apple, Local)',
      features: ['Naturally sweet', 'Sorted and ripeness-controlled', 'Export-grade quality']
    },
    {
      emoji: '🍌',
      name: 'Bananas',
      features: ['Cavendish & local varieties', 'Carefully transported in cooled trucks', 'Green or ripe options']
    },
    {
      emoji: '🍍',
      name: 'Pineapples & Melons',
      features: ['Bright color, rich aroma', 'Wrapped for protection during shipping', 'Sweet and juicy']
    },
    {
      emoji: '🍊',
      name: 'Oranges & Mandarins',
      features: ['Fresh citrus flavor', 'High vitamin C content', 'Perfect for juice or fresh consumption']
    },
    {
      emoji: '🍋',
      name: 'Lemon & Lime',
      features: ['Tangy and aromatic', 'Export quality', 'Various sizes available']
    }
  ];

  const packagingOptions = [
    { name: 'Foam-wrapped', desc: 'Individual fruit protection' },
    { name: 'Carton boxes', desc: 'Standard export packaging' },
    { name: 'Fruit trays', desc: 'Premium presentation' },
    { name: 'Premium branding', desc: 'Custom labels on request' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-5xl mb-4">🍊</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fresh Fruits</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Sun-Ripened</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Organic</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Carefully Handled</span>
            </div>
            <p className="text-xl text-orange-50 leading-relaxed">
              Our fruit collection reflects Ethiopia's rich soil and climate. We partner with orchard farmers to deliver sweet, 
              vibrant, premium-quality fruits handled with care during harvest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fruits Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🍇 Fruits You Can Order</h2>
            <p className="text-lg text-muted-foreground">Premium selection from Ethiopian orchards</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fruits.map((fruit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 dark:border-orange-900">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{fruit.emoji}</div>
                    <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-4">{fruit.name}</h3>
                    <div className="space-y-2">
                      {fruit.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging</h2>
            <p className="text-lg text-muted-foreground">Premium packaging for maximum freshness</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {packagingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">{option.name}</h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cold Chain */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12">
              <Thermometer className="h-16 w-16 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">❄ Cold Chain Management</h2>
              <p className="text-xl text-blue-50 leading-relaxed">
                We maintain ideal temperatures from farm to airport/seaport to ensure fruits arrive fresh, firm, and ready for market. 
                Our refrigerated transport and storage facilities guarantee quality preservation throughout the supply chain.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">🌡️</div>
                  <h4 className="font-semibold mb-1">Temperature Control</h4>
                  <p className="text-sm text-blue-100">Monitored 24/7</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">📦</div>
                  <h4 className="font-semibold mb-1">Proper Handling</h4>
                  <p className="text-sm text-blue-100">Trained staff</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl mb-2">✈️</div>
                  <h4 className="font-semibold mb-1">Fast Transit</h4>
                  <p className="text-sm text-blue-100">Minimal delays</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Fresh Fruits?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Get premium Ethiopian fruits delivered worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-orange-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
