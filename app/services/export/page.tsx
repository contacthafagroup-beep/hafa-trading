'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Package, FileCheck, Truck, Shield, Globe, CheckCircle, ArrowRight,
  Sparkles, Leaf, Coffee, Wheat, Award, Target, TrendingUp, Users,
  MapPin, DollarSign, Clock, BarChart3, Zap, Star, ThermometerSun,
  Box, Scale, FileText, Ship, Plane
} from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Product Sourcing',
    description: 'Access to premium Ethiopian products from verified suppliers with quality guarantees',
    color: 'from-green-500 to-emerald-500',
    features: ['Verified Suppliers', 'Quality Checks', 'Best Pricing', 'Fast Sourcing']
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous quality control with international certifications and standards compliance',
    color: 'from-blue-500 to-cyan-500',
    features: ['ISO Certified', 'Lab Testing', 'Organic Cert', 'HACCP']
  },
  {
    icon: FileCheck,
    title: 'Export Documentation',
    description: 'Complete handling of all export paperwork, licenses, and certificates',
    color: 'from-purple-500 to-pink-500',
    features: ['Export License', 'Certificate of Origin', 'Phytosanitary', 'Customs Docs']
  },
  {
    icon: Ship,
    title: 'Logistics & Shipping',
    description: 'Efficient freight forwarding with sea, air, and land transportation options',
    color: 'from-orange-500 to-red-500',
    features: ['Sea Freight', 'Air Freight', 'Land Transport', 'Tracking']
  },
  {
    icon: Globe,
    title: 'Market Access',
    description: 'Established networks in 45+ countries across all major continents',
    color: 'from-indigo-500 to-blue-500',
    features: ['Europe', 'Middle East', 'Asia', 'Americas']
  },
  {
    icon: Target,
    title: 'Compliance Support',
    description: 'Expert guidance on international trade regulations and import requirements',
    color: 'from-teal-500 to-cyan-500',
    features: ['Trade Laws', 'Import Rules', 'Tariffs', 'Regulations']
  },
];

const exportProducts = [
  { name: 'Coffee', icon: Coffee, volume: '5,000+ tons/year', color: 'from-amber-500 to-orange-500' },
  { name: 'Spices & Seeds', icon: ThermometerSun, volume: '2,000+ tons/year', color: 'from-red-500 to-pink-500' },
  { name: 'Pulses & Legumes', icon: Wheat, volume: '10,000+ tons/year', color: 'from-yellow-500 to-orange-500' },
  { name: 'Fresh Produce', icon: Leaf, volume: '8,000+ tons/year', color: 'from-green-500 to-emerald-500' },
  { name: 'Herbs & Plants', icon: Leaf, volume: '1,500+ tons/year', color: 'from-teal-500 to-cyan-500' },
  { name: 'Grains & Cereals', icon: Wheat, volume: '15,000+ tons/year', color: 'from-amber-500 to-yellow-500' },
];

const processSteps = [
  { step: '01', title: 'Inquiry & Quotation', description: 'Submit requirements and receive detailed quote within 24 hours', icon: FileText },
  { step: '02', title: 'Order Confirmation', description: 'Confirm specifications, quantities, and payment terms', icon: CheckCircle },
  { step: '03', title: 'Sourcing & Quality', description: 'Source from verified suppliers with rigorous quality checks', icon: Shield },
  { step: '04', title: 'Documentation', description: 'Prepare all export documents and certifications', icon: FileCheck },
  { step: '05', title: 'Packaging & Shipping', description: 'Professional packaging and international freight arrangement', icon: Package },
  { step: '06', title: 'Delivery & Support', description: 'Real-time tracking and post-delivery assistance', icon: Truck },
];

export default function ExportServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 500}
                r="3"
                fill="url(#gradientExport)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
            <defs>
              <linearGradient id="gradientExport" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Coffee, x: '10%', y: '20%', delay: 0 },
            { Icon: Leaf, x: '85%', y: '25%', delay: 0.5 },
            { Icon: Package, x: '15%', y: '70%', delay: 1 },
            { Icon: Globe, x: '80%', y: '75%', delay: 1.5 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -30, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-16 h-16 text-green-500/30" />
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
              <Badge className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Export Services
              </Badge>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Export Services
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
              >
                Connecting Ethiopian excellence to global markets with comprehensive export solutions
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/rfq">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all"
                  >
                    Request Export Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/export-products">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20"
                  >
                    View Products
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {[
                  { icon: Award, text: 'ISO Certified' },
                  { icon: Users, text: '500+ Clients' },
                  { icon: Globe, text: '45+ Countries' },
                ].map((indicator, index) => {
                  const Icon = indicator.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Export Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              End-to-end solutions for seamless international trade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredService === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group"
                >
                  <div className="relative h-full backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative p-8">
                      <motion.div
                        animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl mb-6`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-emerald-600 transition-all">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className={`w-4 h-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Sparkle Effect */}
                    <AnimatePresence>
                      {isHovered && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-white rounded-full"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 40}%`,
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Products Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Products We Export
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Premium Ethiopian products for global markets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportProducts.map((product, index) => {
              const Icon = product.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all text-center group overflow-hidden relative">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mx-auto mb-4 shadow-xl`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      
                      <Badge className={`bg-gradient-to-r ${product.color} text-white border-0`}>
                        {product.volume}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/export-products">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl"
              >
                View All Export Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Export Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Export Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple, streamlined process from inquiry to delivery
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {processSteps.map((process, index) => {
                const Icon = process.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all group">
                      <div className="relative mb-4">
                        <div className="text-6xl font-bold text-gray-200 dark:text-gray-800">
                          {process.step}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {process.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {process.description}
                      </p>
                    </div>

                    {/* Connecting Arrow */}
                    {index < processSteps.length - 1 && index % 3 !== 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 z-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-xl bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Export Excellence
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Trusted by businesses worldwide for quality and reliability
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { value: '500+', label: 'Export Clients', icon: Users },
                  { value: '45+', label: 'Countries', icon: Globe },
                  { value: '50K+', label: 'Tons Exported', icon: Package },
                  { value: '98%', label: 'Satisfaction Rate', icon: Star },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                        className="text-5xl font-bold text-white mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-lg text-white/90 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-12 border border-white/20 shadow-2xl text-center overflow-hidden">
              {/* Gradient Orbs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Ready to Export?
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Start your export journey with Ethiopia's trusted trading partner
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rfq">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all"
                    >
                      Request Export Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20"
                    >
                      Contact Sales Team
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { icon: Shield, text: 'Secure & Compliant' },
                    { icon: Clock, text: '24/7 Support' },
                    { icon: Award, text: 'ISO Certified' },
                  ].map((indicator, index) => {
                    const Icon = indicator.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{indicator.text}</span>
                      </div>
                    );
                  })}
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
