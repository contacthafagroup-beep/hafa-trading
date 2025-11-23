'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Globe, Package, Shield, FileCheck, TrendingUp, Clock, 
  CheckCircle, ArrowRight, Sparkles, Box, Truck, Warehouse,
  Target, Users, BarChart3, Award, DollarSign, MapPin,
  Container, Anchor, Scale, FileText, Zap
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Global Sourcing',
    description: 'Access to worldwide suppliers and manufacturers with verified quality standards and competitive pricing.'
  },
  {
    icon: Shield,
    title: 'Quality Verification',
    description: 'Comprehensive quality checks and supplier verification to ensure product standards and authenticity.'
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Expert customs brokerage services ensuring smooth clearance and compliance with Ethiopian regulations.'
  },
  {
    icon: Truck,
    title: 'Local Distribution',
    description: 'Efficient last-mile delivery and distribution network across Ethiopia with real-time tracking.'
  },
  {
    icon: Warehouse,
    title: 'Warehousing Solutions',
    description: 'Secure storage facilities with inventory management and order fulfillment services.'
  },
  {
    icon: DollarSign,
    title: 'Payment Solutions',
    description: 'Secure international payment processing and foreign exchange management services.'
  },
];

const features = [
  'Supplier verification and due diligence',
  'Product quality inspection',
  'Competitive pricing negotiation',
  'Import documentation handling',
  'Customs duty optimization',
  'Insurance and risk management',
  'Multi-modal transportation',
  'Real-time shipment tracking',
  'Local delivery coordination',
  'After-sales support',
];

const categories = [
  { name: 'Industrial Equipment', icon: Box, count: '500+' },
  { name: 'Electronics', icon: Zap, count: '1,000+' },
  { name: 'Machinery', icon: Target, count: '300+' },
  { name: 'Raw Materials', icon: Container, count: '800+' },
];

export default function ImportServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(20)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${Math.random() * 1000} ${Math.random() * 500} Q ${Math.random() * 1000} ${Math.random() * 500} ${Math.random() * 1000} ${Math.random() * 500}`}
                stroke="url(#gradientImport)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
            <defs>
              <linearGradient id="gradientImport" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Globe, x: '10%', y: '20%', delay: 0 },
            { Icon: Package, x: '85%', y: '30%', delay: 0.5 },
            { Icon: Truck, x: '15%', y: '70%', delay: 1 },
            { Icon: Container, x: '80%', y: '75%', delay: 1.5 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-12 h-12 text-purple-500/30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-6 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Import Services
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Import Services
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
                Streamlined import solutions bringing global products to Ethiopian markets with full compliance and efficiency
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50"
                  >
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Import Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive solutions for seamless international imports
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="h-full backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all group">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive import management from source to delivery
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Import Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Wide range of products from trusted global suppliers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all text-center group">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-xl"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      {category.count} Products
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-12 border border-white/20 shadow-2xl text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Start Importing Today
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let us handle your import needs with expertise and efficiency
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl"
                    >
                      Contact Us
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/rfq">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50"
                    >
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
