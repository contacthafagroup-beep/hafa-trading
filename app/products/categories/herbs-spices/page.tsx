'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function HerbsSpicesPage() {
  const freshHerbs = [
    'Fresh Rosemary',
    'Basil',
    'Mint',
    'Thyme',
    'Oregano',
    'Parsley & Coriander'
  ];

  const drySpices = [
    { name: 'Black Cumin', desc: 'Tikur Azmud - Premium quality' },
    { name: 'Turmeric', desc: 'Whole/powder - Bright yellow' },
    { name: 'Ginger', desc: 'Dried/powder - High potency' },
    { name: 'Cardamom', desc: 'Green pods - Aromatic' },
    { name: 'Black Pepper', desc: 'Whole peppercorns' },
    { name: 'Fenugreek', desc: 'Seeds - Rich flavor' },
    { name: 'Cloves', desc: 'Whole - Intense aroma' },
    { name: 'Cinnamon', desc: 'Sticks/powder - Sweet spice' },
    { name: 'Bay Leaves', desc: 'Dried - Culinary essential' },
    { name: 'Chili Powder & Paprika', desc: 'Various heat levels' }
  ];

  const packagingOptions = [
    'Spice jars',
    'Vacuum-sealed bags',
    'Foil pouches',
    'Bulk sacks (25kg, 50kg)'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-20">
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
            <div className="text-5xl mb-4">🌿</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Herbs, Aromatics & Spices</h1>
            <div className="flex flex-wrap gap-3 text-lg mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full">Aromatic</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Potent</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Globally Demanded</span>
            </div>
            <p className="text-xl text-purple-50 leading-relaxed">
              Hafa Trading PLC exports Ethiopia's most aromatic herbs and spices—fresh, dried, or powdered—maintaining purity, 
              sharp flavor, and export-standard hygiene.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fresh Herbs */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌿 Fresh Herbs</h2>
            <p className="text-lg text-muted-foreground">High essential oil content • Refrigerated transport available</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {freshHerbs.map((herb, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="font-medium">{herb}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 px-6 py-3 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">High essential oil content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dry Spices */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🔥 Dry Spices</h2>
            <p className="text-lg text-muted-foreground">100% natural • No additives or preservatives</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drySpices.map((spice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-purple-100 dark:border-purple-900">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🌶️</div>
                      <div>
                        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-1">{spice.name}</h3>
                        <p className="text-sm text-muted-foreground">{spice.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">100% Natural</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">No Additives or Preservatives</p>
            </div>
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
            <Package className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Packaging</h2>
            <p className="text-lg text-muted-foreground">Preserve freshness and aroma</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {packagingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">📦</div>
                    <p className="font-semibold">{option}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Premium Herbs & Spices?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Source authentic Ethiopian herbs and spices for your business
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-purple-600">
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
