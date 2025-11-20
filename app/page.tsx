'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Package, 
  TrendingUp, 
  Globe, 
  Shield, 
  Truck, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hafa General Trading PLC
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Trading Beyond Borders
            </p>
            <p className="text-lg mb-8 text-blue-50">
              Premium Ethiopian agricultural products, livestock, and herbs exported worldwide. 
              Connecting Ethiopia's finest products to global markets.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/export-products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Explore Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-blue-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hafa?</h2>
            <p className="text-lg text-muted-foreground">
              Excellence in international trade with decades of experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Network',
                description: 'Connected to suppliers and buyers across continents'
              },
              {
                icon: Shield,
                title: 'Quality Assured',
                description: 'All products meet international standards and certifications'
              },
              {
                icon: Truck,
                title: 'Reliable Logistics',
                description: 'Efficient shipping and real-time tracking for all orders'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Experienced professionals dedicated to your success'
              },
              {
                icon: TrendingUp,
                title: 'Competitive Pricing',
                description: 'Best market rates with transparent pricing'
              },
              {
                icon: Package,
                title: 'Wide Selection',
                description: '50+ product categories from agriculture to electronics'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories - Redesigned */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">🌿 Our Product Range</h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                <span>Premium Quality</span>
                <span className="text-gray-400">•</span>
                <span>Ethically Sourced</span>
                <span className="text-gray-400">•</span>
                <span>Export-Ready</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Hafa Trading PLC proudly supplies a diverse portfolio of high-quality agricultural products, fresh produce, 
                livestock, herbs, and spices, sourced directly from trusted Ethiopian farmers, cooperatives, and pastoralist communities. 
                Our products meet international safety and export standards, ensuring reliability, freshness, and competitive pricing for global buyers.
              </p>
            </motion.div>
          </div>
          
          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Ethiopian Products?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Request a quote or become a partner today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/partnership">
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-green-600">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
            {/* 1. Fresh Vegetables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-2 border-green-100 dark:border-green-900 hover:border-green-300 dark:hover:border-green-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🥬</div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Fresh Vegetables</h3>
                      <p className="text-xs text-muted-foreground">Premium & Commercial Grade</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Carefully harvested, sorted, washed, and packed to maintain freshness.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Tomatoes (round, roma, sauce-grade)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Red & White Onions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cabbage (green & red)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Carrots, Potatoes, Green Beans</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Eggplant, Green Peppers, Chili Peppers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Beetroots, Lettuce, Spinach & Kale</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Garlic, Ginger, Okra, Pumpkins</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Celery, Leeks, Broccoli & Cauliflower</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2. Fresh Fruits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-2 border-orange-100 dark:border-orange-900 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🍊</div>
                    <div>
                      <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400">Fresh Fruits</h3>
                      <p className="text-xs text-muted-foreground">Naturally Grown & Export Ready</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Sorted and packed for long-distance transport.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Avocado (Hass & Ettinger)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Bananas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Mangoes (Kent, Apple, and Local)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Papaya, Pineapple</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Oranges & Mandarins</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Lemon & Lime</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Watermelon & Melon, Guava</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Strawberries, Grapes, Pomegranate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3. Herbs & Spices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-2 border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🌿</div>
                    <div>
                      <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">Herbs & Spices</h3>
                      <p className="text-xs text-muted-foreground">Fresh & Dried</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Sustainably sourced, high in essential oils, and rich in aroma.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-purple-700 dark:text-purple-400 text-xs">Fresh Herbs:</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Rosemary, Basil, Mint, Thyme</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Oregano, Parsley & Coriander</span>
                    </div>
                    <p className="font-semibold text-purple-700 dark:text-purple-400 text-xs mt-3">Dried Herbs & Spices:</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Black Cumin, White Cumin, Nigella Sativa</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Turmeric, Ginger, Cardamom</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Black Pepper, Fenugreek, Cloves</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Cinnamon, Bay Leaves, Chili Powder</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 4. Grains & Legumes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full border-2 border-amber-100 dark:border-amber-900 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🌾</div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">Grains & Legumes</h3>
                      <p className="text-xs text-muted-foreground">Bulk Export</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    High-quality, sorted, cleaned, and moisture-controlled.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Teff (White, Red, and Mixed)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Maize (White & Yellow)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Wheat & Barley</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Sorghum (Red & White)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Chickpeas (Kabuli & Desi)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Lentils (red split, whole red, brown)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Peas, Beans (kidney, haricot)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Sesame Seeds, Soybeans, Niger Seed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 5. Livestock & Meat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-full border-2 border-red-100 dark:border-red-900 hover:border-red-300 dark:hover:border-red-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">🐑</div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">Livestock & Meat</h3>
                      <p className="text-xs text-muted-foreground">Export-Standard</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    From certified farms and pastoralist communities.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-700 dark:text-red-400 text-xs">Live Animals:</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Goats, Sheep, Oxen / Cattle</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Calves, Camels (on request)</span>
                    </div>
                    <p className="font-semibold text-red-700 dark:text-red-400 text-xs mt-3">Meat Products (Halal Certified):</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Goat Meat (fresh/frozen)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Mutton (fresh/frozen)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Beef (fresh/frozen)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Liver, Kidney, Tripe (on request)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 6. Specialty Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Card className="h-full border-2 border-yellow-100 dark:border-yellow-900 hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">⭐</div>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">Specialty Products</h3>
                      <p className="text-xs text-muted-foreground">High-Demand Items</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Honey (white, red, forest honey)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Coffee Beans (washed & unwashed)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Khat (Miraa) — where legally permitted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Aloe Vera Leaves</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Moringa Leaves & Powder</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Sesame Oil & Niger Seed Oil</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 7. Processed & Value-Added */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="md:col-span-2 lg:col-span-3"
            >
              <Card className="h-full border-2 border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">📦</div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Processed & Value-Added Goods</h3>
                      <p className="text-xs text-muted-foreground">Available for bulk orders and private labeling</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Dried Fruits (mango, pineapple, banana, papaya)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Dehydrated Vegetables (onions, garlic, ginger)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Essential Oils (rosemary, eucalyptus, basil)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Herbal Tea Mixes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">🌍 Why Choose Hafa Trading PLC?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Direct Farm Sourcing</h4>
                  <p className="text-sm text-blue-50">Consistent quality from trusted Ethiopian farmers</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Global Logistics Support</h4>
                  <p className="text-sm text-blue-50">Air, sea, and road transport options</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Customized Packaging</h4>
                  <p className="text-sm text-blue-50">Cartons, crates, vacuum-sealed, retail packs</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Competitive Pricing</h4>
                  <p className="text-sm text-blue-50">Best wholesale prices in the market</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quality Control</h4>
                  <p className="text-sm text-blue-50">Strict quality control & export documentation</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">International Standards</h4>
                  <p className="text-sm text-blue-50">All products meet global safety standards</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/export-products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
