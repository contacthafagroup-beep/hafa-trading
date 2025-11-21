'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package, Droplets, Shield } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function GrainsLegumesPage() {
  const products = [
    {
      emoji: '🌾',
      name: 'Teff (White, Red, Mixed)',
      desc: "Ethiopia's premium export grain",
      features: ['99% purity for export', 'Gluten-free superfood', 'High protein & fiber']
    },
    {
      emoji: '🌾',
      name: 'Wheat, Barley & Sorghum',
      desc: 'A-grade, bulk supply',
      features: ['Truck or container loading', 'Cleaned and sorted', 'Moisture controlled']
    },
    {
      emoji: '🫘',
      name: 'Red Lentils',
      desc: 'Split and whole varieties',
      features: ['High protein content', 'Quick cooking', 'Export quality']
    },
    {
      emoji: '🫘',
      name: 'Brown Lentils',
      desc: 'Whole lentils',
      features: ['Rich earthy flavor', 'Holds shape when cooked', 'Premium grade']
    },
    {
      emoji: '🫘',
      name: 'Chickpeas (Desi & Kabuli)',
      desc: 'Both varieties available',
      features: ['Large size Kabuli', 'Small Desi variety', 'Cleaned and graded']
    },
    {
      emoji: '🫘',
      name: 'Pigeon Peas',
      desc: 'Yellow split peas',
      features: ['High nutritional value', 'Long shelf life', 'Bulk packaging']
    },
    {
      emoji: '🫘',
      name: 'Haricot & Kidney Beans',
      desc: 'White and red beans',
      features: ['Uniform size', 'Low moisture', 'Export standard']
    },
    {
      emoji: '🌻',
      name: 'White Humera Sesame',
      desc: 'Premium oil seed',
      features: ['High oil content', 'Whitest variety', 'Global demand']
    },
    {
      emoji: '🌻',
      name: 'Wollega Sesame',
      desc: 'Ethiopian origin',
      features: ['Rich flavor', 'Natural quality', 'Bulk export']
    },
    {
      emoji: '🌻',
      name: 'Niger Seeds',
      desc: 'Oil seed crop',
      features: ['High oil yield', 'Bird feed quality', 'Export grade']
    },
    {
      emoji: '🌻',
      name: 'Soybeans',
      desc: 'Protein-rich legume',
      features: ['Non-GMO', 'High protein', 'Food & feed grade']
    },
    {
      emoji: '🥜',
      name: 'Groundnuts (Peanuts)',
      desc: 'Raw and roasted',
      features: ['Large kernels', 'Low aflatoxin', 'Various grades']
    }
  ];

  const packagingOptions = [
    { name: 'Jute Bags', desc: '50kg natural fiber bags' },
    { name: 'PP Bags', desc: 'Polypropylene woven bags' },
    { name: 'Branded Export Sacks', desc: 'Custom labeling available' },
    { name: 'Bulk Containers', desc: 'For large shipments' }
  ];

  const qualityControls = [
    { icon: '💧', title: 'Moisture Testing', desc: 'Optimal moisture levels' },
    { icon: '🪨', title: 'Stone Removal', desc: 'Clean product guarantee' },
    { icon: '🔍', title: 'Machine & Hand Sorting', desc: 'Double quality check' },
    { icon: '🛡️', title: 'Fumigation', desc: 'On request for pest control' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white py-20">
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
            <div className="text-5xl mb-4">🌾</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Grains, Cereals & Legumes</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Clean</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Sorted</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Moisture-Controlled</span>
            </div>
            <p className="text-xl text-amber-50 leading-relaxed">
              We supply high-grade grains, cereals, and legumes to wholesalers, millers, and food processors worldwide. 
              All products undergo sorting, cleaning, and moisture testing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌾 Our Products</h2>
            <p className="text-lg text-muted-foreground">Premium grains and legumes for global markets</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-amber-100 dark:border-amber-900">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{product.emoji}</div>
                    <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{product.desc}</p>
                    <div className="space-y-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging</h2>
            <p className="text-lg text-muted-foreground">Secure packaging for safe transport</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {packagingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">📦</div>
                    <h3 className="font-bold mb-2">{option.name}</h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Shield className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🧪 Quality Control</h2>
            <p className="text-lg text-muted-foreground">Rigorous testing and inspection processes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {qualityControls.map((control, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-2 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-3">{control.icon}</div>
                    <h3 className="font-bold mb-2">{control.title}</h3>
                    <p className="text-sm text-muted-foreground">{control.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Grains & Legumes?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Bulk orders available for wholesalers and processors
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-amber-600">
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
