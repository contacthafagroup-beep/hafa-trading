'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Sparkles, Package } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function SpecialtyProductsPage() {
  const specialtyProducts = [
    {
      emoji: '🍯',
      name: 'Pure Honey',
      varieties: 'White, Red, Forest',
      features: [
        'Raw and unprocessed',
        'High enzyme content',
        'Natural antibacterial properties',
        'Various floral sources'
      ],
      glow: 'from-yellow-400 to-amber-500'
    },
    {
      emoji: '☕',
      name: 'Coffee Beans',
      varieties: 'Washed & Unwashed',
      features: [
        'Arabica premium grade',
        'Single origin Ethiopian',
        'Various roast levels',
        'Export quality beans'
      ],
      glow: 'from-brown-400 to-amber-700'
    },
    {
      emoji: '🌿',
      name: 'Khat (Miraa)',
      varieties: 'Where legally permitted',
      features: [
        'Fresh harvest',
        'Carefully packaged',
        'Fast delivery',
        'Legal compliance verified'
      ],
      glow: 'from-green-400 to-green-600'
    },
    {
      emoji: '🌵',
      name: 'Aloe Vera Leaves',
      varieties: 'Fresh leaves',
      features: [
        'Thick, gel-rich leaves',
        'Organic cultivation',
        'Cosmetic & medicinal grade',
        'Carefully harvested'
      ],
      glow: 'from-green-300 to-emerald-500'
    },
    {
      emoji: '🌿',
      name: 'Moringa',
      varieties: 'Leaves & Powder',
      features: [
        'Nutrient-dense superfood',
        'Dried leaves or powder',
        'High protein content',
        'Export certified'
      ],
      glow: 'from-lime-400 to-green-600'
    },
    {
      emoji: '🌻',
      name: 'Sesame & Niger Seed Oil',
      varieties: 'Cold-pressed oils',
      features: [
        'Pure, unrefined',
        'High nutritional value',
        'Culinary & cosmetic use',
        'Bottled or bulk'
      ],
      glow: 'from-amber-300 to-yellow-600'
    }
  ];

  const valueAddedProducts = [
    {
      category: 'Dried Fruits',
      icon: '🍍',
      items: ['Mango', 'Pineapple', 'Banana', 'Papaya'],
      desc: 'No added sugar, naturally sweet'
    },
    {
      category: 'Dehydrated Vegetables',
      icon: '🌶️',
      items: ['Garlic', 'Ginger', 'Onion'],
      desc: 'Long shelf life, intense flavor'
    },
    {
      category: 'Essential Oils',
      icon: '💧',
      items: ['Rosemary', 'Eucalyptus', 'Basil'],
      desc: 'Pure, therapeutic grade'
    },
    {
      category: 'Herbal Tea Mixes',
      icon: '🍵',
      items: ['Custom blends available'],
      desc: 'Traditional Ethiopian recipes'
    }
  ];

  const packagingOptions = [
    'Retail-size packs',
    'Bulk cartons',
    'Private labeling for supermarkets and brands',
    'Custom packaging solutions'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
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
            <div className="text-5xl mb-4">⭐</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Specialty Agricultural Products</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Unique</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">High-Value</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Ethiopian Origin</span>
            </div>
            <p className="text-xl text-yellow-50 leading-relaxed">
              Ethiopia is home to rare and valuable agricultural products. We supply high-demand specialty items that showcase 
              the unique biodiversity and agricultural heritage of Ethiopia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specialty Products */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="h-16 w-16 text-yellow-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Our Specialty Products</h2>
            <p className="text-lg text-muted-foreground">Rare and valuable items from Ethiopia</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtyProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-300 border-2 border-yellow-100 dark:border-yellow-900 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.glow} opacity-5`}></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-6xl mb-4">{product.emoji}</div>
                    <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{product.varieties}</p>
                    <div className="space-y-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
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

      {/* Value-Added Products */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🏭 Processed & Value-Added Goods</h2>
            <p className="text-lg text-muted-foreground">Available for bulk orders and private labeling</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueAddedProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-3">{product.icon}</div>
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">{product.category}</h3>
                    <p className="text-sm text-muted-foreground mb-3 italic">{product.desc}</p>
                    <div className="space-y-1">
                      {product.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm">{item}</span>
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
            <Package className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging Options</h2>
            <p className="text-lg text-muted-foreground">Flexible solutions for your brand</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {packagingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                <span className="font-medium">{option}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Specialty Products?
          </h2>
          <p className="text-xl mb-8 text-yellow-100">
            Discover unique Ethiopian agricultural treasures
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-yellow-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-yellow-600">
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
