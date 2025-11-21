'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package, Truck, Thermometer } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

export default function FreshVegetablesPage() {
  const vegetables = [
    {
      name: 'Tomatoes',
      subtitle: 'Round, Roma & Sauce-Grade',
      features: ['Firm texture, long shelf life', 'Packed in crates or cartons'],
      ideal: 'Ideal for supermarkets, processors & exporters'
    },
    {
      name: 'Onions (Red & White)',
      subtitle: 'Large bulbs, high pungency',
      features: ['Export-grade cleaning & bagging'],
      ideal: 'Bulk 25kg/50kg mesh bags available'
    },
    {
      name: 'Potatoes',
      subtitle: 'Fresh, soil-free, size-graded',
      features: ['Long storage life'],
      ideal: 'Cooking, chips, wholesale markets'
    },
    {
      name: 'Carrots',
      subtitle: 'Crisp, sweet, washed',
      features: ['Premium bundle packaging available'],
      ideal: 'Perfect for retail and food service'
    },
    {
      name: 'Green Chili & Peppers',
      subtitle: 'Hot/sweet varieties',
      features: ['Perfect for Middle East & EU markets'],
      ideal: 'Fresh or dried options'
    },
    {
      name: 'Garlic & Ginger',
      subtitle: 'Available fresh, semi-dried, and fully dried',
      features: ['High essential oil content'],
      ideal: 'Culinary and medicinal use'
    }
  ];

  const packagingOptions = [
    'Plastic crates',
    'Cartons',
    'Ventilated mesh bags',
    'Vacuum packaging (on special request)'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-20">
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
            <div className="text-5xl mb-4">🥬</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fresh Vegetables</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Farm-Fresh</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Sustainably Grown</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Export Certified</span>
            </div>
            <p className="text-xl text-green-50 leading-relaxed">
              Our fresh vegetable collection is sourced from trusted smallholder farmers and modern commercial farms across Ethiopia. 
              Every item undergoes hand selection, washing, sorting, and strict quality inspection before packaging.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vegetable Categories */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🥬 Our Vegetable Categories</h2>
            <p className="text-lg text-muted-foreground">Premium quality vegetables for every market need</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vegetables.map((veg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-green-100 dark:border-green-900">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">{veg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{veg.subtitle}</p>
                    <div className="space-y-2 mb-4">
                      {veg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">✔ {veg.ideal}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Package className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging Options</h2>
              <p className="text-lg text-muted-foreground">Flexible packaging solutions for your business needs</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {packagingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="font-medium">{option}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Export */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Truck className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚚 Shipping & Export</h2>
            <p className="text-lg text-muted-foreground">Reliable logistics for fresh delivery worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">✈️</div>
                <h3 className="font-bold mb-2">Air Freight</h3>
                <p className="text-sm text-muted-foreground">Urgent orders delivered fast</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🚢</div>
                <h3 className="font-bold mb-2">Sea Freight</h3>
                <p className="text-sm text-muted-foreground">Refrigerated containers</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-bold mb-2">Door-to-Port</h3>
                <p className="text-sm text-muted-foreground">Complete delivery service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Fresh Vegetables?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get a quote for bulk orders or become a partner
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-green-600">
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
