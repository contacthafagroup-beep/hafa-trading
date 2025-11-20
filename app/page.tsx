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
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Product Range</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/export-products?category=agricultural">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="bg-green-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Agricultural Products</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Fresh Vegetables & Fruits',
                      'Coffee (Arabica)',
                      'Pulses & Legumes',
                      'Spices & Seeds'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    View Products
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/export-products?category=livestock">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="bg-blue-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Livestock</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Goats & Sheep',
                      'Cattle & Oxen',
                      'Camels',
                      'Live Poultry'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    View Livestock
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/export-products?category=herbs">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="bg-purple-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Herbs & Spices</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Medicinal Plants',
                      'Culinary Herbs',
                      'Organic Spices',
                      'Essential Oils'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-white text-purple-600 hover:bg-purple-50">
                    View Herbs
                  </Button>
                </div>
              </Card>
            </Link>
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
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
