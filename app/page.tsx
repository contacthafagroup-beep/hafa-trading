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
                <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-blue-600">
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

      {/* Product Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="text-6xl">🌿</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Product Range
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                Premium Quality
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                Ethically Sourced
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                Export-Ready
              </span>
            </div>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Hafa Trading PLC proudly supplies a diverse portfolio of high-quality agricultural products, fresh produce, 
              livestock, herbs, and spices, sourced directly from trusted Ethiopian farmers, cooperatives, and pastoralist communities.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Fresh Vegetables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/fresh-vegetables" className="block h-full">
                <Card className="h-full border-2 border-green-100 dark:border-green-900 hover:border-green-300 dark:hover:border-green-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🥬</div>
                    <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">Fresh Vegetables</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">Premium & Commercial Grade</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tomatoes, Onions, Cabbage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Carrots, Potatoes, Green Beans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Peppers, Eggplant, Beetroots</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Lettuce, Spinach, Kale, Garlic</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Fresh Fruits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/fresh-fruits" className="block h-full">
                <Card className="h-full border-2 border-orange-100 dark:border-orange-900 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🍊</div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Fresh Fruits</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">Naturally Grown & Export Ready</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Avocado (Hass & Ettinger)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Bananas, Mangoes, Papaya</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Pineapple, Oranges, Lemons</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>Watermelon, Guava, Grapes</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Herbs & Spices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/herbs-spices" className="block h-full">
                <Card className="h-full border-2 border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🌿</div>
                    <h3 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">Herbs & Spices</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">Fresh & Dried</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Rosemary, Basil, Mint, Thyme</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Black Cumin, Turmeric, Ginger</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Cardamom, Black Pepper, Cloves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>Cinnamon, Fenugreek, Bay Leaves</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Grains & Legumes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/grains-legumes" className="block h-full">
                <Card className="h-full border-2 border-amber-100 dark:border-amber-900 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🌾</div>
                    <h3 className="text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400">Grains & Legumes</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">Bulk Export Quality</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Teff (White, Red, Mixed)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Maize, Wheat, Barley, Sorghum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Chickpeas, Lentils, Peas, Beans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Sesame Seeds, Soybeans</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-amber-600 dark:text-amber-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Livestock & Meat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/livestock-meat" className="block h-full">
                <Card className="h-full border-2 border-red-100 dark:border-red-900 hover:border-red-300 dark:hover:border-red-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🐑</div>
                    <h3 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-400">Livestock & Meat</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">Export-Standard & Halal Certified</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Live: Goats, Sheep, Cattle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Oxen, Calves, Camels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Fresh/Frozen: Goat Meat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>Mutton, Beef, Organs</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-red-600 dark:text-red-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Specialty Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/products/categories/specialty-products" className="block h-full">
                <Card className="h-full border-2 border-yellow-100 dark:border-yellow-900 hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">⭐</div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">Specialty Products</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">High-Demand Items</p>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Honey (White, Red, Forest)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Coffee Beans (Washed/Unwashed)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Aloe Vera Leaves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>Moringa Leaves & Powder</span>
                      </li>
                    </ul>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">🌍 Why Choose Hafa Trading PLC?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm">Direct farm sourcing for consistent quality</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm">Global logistics support (air, sea, road)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm">Customized packaging options</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm">Competitive wholesale pricing</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/export-products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
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
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-green-600">
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
