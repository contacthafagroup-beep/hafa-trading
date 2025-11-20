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
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌿 Our Product Range</h2>
            <p className="text-lg text-muted-foreground mb-2">Premium Quality • Ethically Sourced • Export-Ready</p>
            <p className="text-base text-muted-foreground max-w-4xl mx-auto">
              Hafa Trading PLC proudly supplies a diverse portfolio of high-quality agricultural products, fresh produce, 
              livestock, herbs, and spices, sourced directly from trusted Ethiopian farmers, cooperatives, and pastoralist communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Fresh Vegetables */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-600">🥬 Fresh Vegetables</h3>
                <p className="text-sm text-muted-foreground mb-3">Premium & Commercial Grade</p>
                <ul className="text-sm space-y-1">
                  <li>• Tomatoes, Onions, Cabbage</li>
                  <li>• Carrots, Potatoes, Green Beans</li>
                  <li>• Peppers, Eggplant, Beetroots</li>
                  <li>• Lettuce, Spinach, Kale, Garlic</li>
                  <li>• Ginger, Okra, Celery, Leeks</li>
                </ul>
              </CardContent>
            </Card>

            {/* Fresh Fruits */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-600">🍊 Fresh Fruits</h3>
                <p className="text-sm text-muted-foreground mb-3">Naturally Grown & Export Ready</p>
                <ul className="text-sm space-y-1">
                  <li>• Avocado (Hass & Ettinger)</li>
                  <li>• Bananas, Mangoes, Papaya</li>
                  <li>• Pineapple, Oranges, Lemons</li>
                  <li>• Watermelon, Guava, Grapes</li>
                  <li>• Strawberries, Pomegranate</li>
                </ul>
              </CardContent>
            </Card>

            {/* Herbs & Spices */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-600">🌿 Herbs & Spices</h3>
                <p className="text-sm text-muted-foreground mb-3">Fresh & Dried</p>
                <ul className="text-sm space-y-1">
                  <li>• Rosemary, Basil, Mint, Thyme</li>
                  <li>• Black Cumin, Turmeric, Ginger</li>
                  <li>• Cardamom, Black Pepper, Cloves</li>
                  <li>• Cinnamon, Fenugreek, Bay Leaves</li>
                  <li>• Chili Powder & Paprika</li>
                </ul>
              </CardContent>
            </Card>

            {/* Grains & Legumes */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-amber-600">🌾 Grains & Legumes</h3>
                <p className="text-sm text-muted-foreground mb-3">Bulk Export Quality</p>
                <ul className="text-sm space-y-1">
                  <li>• Teff (White, Red, Mixed)</li>
                  <li>• Maize, Wheat, Barley, Sorghum</li>
                  <li>• Chickpeas, Lentils, Peas, Beans</li>
                  <li>• Sesame Seeds, Soybeans</li>
                  <li>• Niger Seed, Peanuts</li>
                </ul>
              </CardContent>
            </Card>

            {/* Livestock & Meat */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-red-600">🐑 Livestock & Meat</h3>
                <p className="text-sm text-muted-foreground mb-3">Export-Standard & Halal Certified</p>
                <ul className="text-sm space-y-1">
                  <li>• Live: Goats, Sheep, Cattle</li>
                  <li>• Oxen, Calves, Camels</li>
                  <li>• Fresh/Frozen: Goat Meat</li>
                  <li>• Mutton, Beef</li>
                  <li>• Liver, Kidney, Tripe</li>
                </ul>
              </CardContent>
            </Card>

            {/* Specialty Products */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-600">⭐ Specialty Products</h3>
                <p className="text-sm text-muted-foreground mb-3">High-Demand Items</p>
                <ul className="text-sm space-y-1">
                  <li>• Honey (White, Red, Forest)</li>
                  <li>• Coffee Beans (Washed/Unwashed)</li>
                  <li>• Aloe Vera Leaves</li>
                  <li>• Moringa Leaves & Powder</li>
                  <li>• Sesame & Niger Seed Oil</li>
                </ul>
              </CardContent>
            </Card>
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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
