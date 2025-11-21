'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package, Thermometer, Shield, Heart } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function LivestockMeatPage() {
  const liveAnimals = [
    { emoji: '🐐', name: 'Goats', desc: 'Healthy, grass-fed' },
    { emoji: '🐑', name: 'Sheep', desc: 'Premium breeds' },
    { emoji: '🐂', name: 'Oxen', desc: 'Strong, well-fed' },
    { emoji: '🐄', name: 'Cattle', desc: 'Quality livestock' },
    { emoji: '🐮', name: 'Calves', desc: 'Young, healthy' },
    { emoji: '🐪', name: 'Camels', desc: 'On request' }
  ];

  const meatProducts = [
    {
      name: 'Goat Meat',
      types: 'Fresh/Frozen',
      features: ['Lean and tender', 'Halal certified', 'Vacuum sealed']
    },
    {
      name: 'Mutton',
      types: 'Fresh/Frozen',
      features: ['Rich flavor', 'Premium cuts', 'Export quality']
    },
    {
      name: 'Beef Cuts',
      types: 'Fresh/Frozen',
      features: ['Various cuts available', 'Grass-fed', 'Halal processed']
    },
    {
      name: 'Organs',
      types: 'Liver, Kidney, Tripe',
      features: ['On request', 'Fresh or frozen', 'Cleaned and prepared']
    }
  ];

  const certifications = [
    { icon: '✅', title: 'Vet-Checked', desc: 'All animals inspected' },
    { icon: '🛂', title: 'Export Quarantine', desc: 'International standards' },
    { icon: '🕌', title: 'Halal Certified', desc: 'Islamic slaughter methods' },
    { icon: '❄️', title: 'Cold Chain', desc: 'Temperature controlled' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20">
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
            <div className="text-5xl mb-4">🐑</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Livestock & Meat Products</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Healthy</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Halal</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Export Ready</span>
            </div>
            <p className="text-xl text-red-50 leading-relaxed">
              Our livestock is sourced from pastoralist regions known for healthy, grass-fed animals. We offer live animals 
              and premium processed meat for international buyers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Animals */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🐑 Live Animals</h2>
            <p className="text-lg text-muted-foreground">Vet-checked • Export quarantine standards</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {liveAnimals.map((animal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-red-100 dark:border-red-900">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-3">{animal.emoji}</div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground">{animal.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Vet-Checked</p>
              <p className="text-sm text-muted-foreground">Health certified</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Export Quarantine Standards</p>
              <p className="text-sm text-muted-foreground">International compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meat Products */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🥩 Meat Products (Halal)</h2>
            <p className="text-lg text-muted-foreground">Fresh & Frozen • Premium Quality</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {meatProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-red-100 dark:border-red-900">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{product.types}</p>
                    <div className="space-y-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging</h2>
            <p className="text-lg text-muted-foreground">Hygienic and secure packaging</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-5xl mb-3">🔒</div>
                <h3 className="font-bold mb-2">Vacuum-Sealed</h3>
                <p className="text-sm text-muted-foreground">Extended freshness</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-5xl mb-3">🧊</div>
                <h3 className="font-bold mb-2">Frozen Blocks</h3>
                <p className="text-sm text-muted-foreground">Long-term storage</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-5xl mb-3">❄️</div>
                <h3 className="font-bold mb-2">Fresh-Chilled</h3>
                <p className="text-sm text-muted-foreground">Ready to use</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Export Facilities */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 md:p-12">
              <Shield className="h-16 w-16 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">🌍 Export Facilities</h2>
              <p className="text-xl text-red-50 leading-relaxed mb-8">
                Our state-of-the-art facilities ensure the highest standards of hygiene, quality, and compliance with international regulations.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="text-4xl mb-2">{cert.icon}</div>
                    <h4 className="font-semibold mb-1">{cert.title}</h4>
                    <p className="text-sm text-red-100">{cert.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🏭</div>
                  <p className="font-semibold">Certified Slaughterhouses</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🌡️</div>
                  <p className="font-semibold">Cold Chain Logistics</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">✈️</div>
                  <p className="font-semibold">Air Cargo / Sea Freight</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Livestock & Meat?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Premium quality meat products for global markets
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-red-600">
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
