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
  Package, Ship, Plane, Truck, Globe, Shield, FileCheck, 
  TrendingUp, Clock, Award, CheckCircle, ArrowRight, Sparkles,
  Leaf, Box, Scale, Target, Zap, Users, BarChart3, MapPin,
  DollarSign, Warehouse, Container, Anchor, CloudRain, ThermometerSun
} from 'lucide-react';

const services = [
  {
    id: 'export',
    title: 'Export Services',
    description: 'Comprehensive export solutions connecting Ethiopian excellence to global markets',
    icon: Package,
    color: 'from-green-500 to-emerald-500',
    href: '/services/export',
    features: ['Product Sourcing', 'Quality Control', 'Documentation', 'Market Access'],
    stats: { clients: '500+', countries: '45+', satisfaction: '98%' }
  },
  {
    id: 'logistics',
    title: 'Logistics & Shipping',
    description: 'End-to-end freight and logistics solutions for seamless global delivery',
    icon: Ship,
    color: 'from-blue-500 to-cyan-500',
    href: '/services/logistics',
    features: ['Sea Freight', 'Air Freight', 'Land Transport', 'Warehousing'],
    stats: { shipments: '10K+', routes: '100+', onTime: '99%' }
  },
];

const capabilities = [
  { icon: Shield, title: 'Compliance & Certification', description: 'Full regulatory compliance and quality certifications' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer service and tracking' },
  { icon: TrendingUp, title: 'Market Intelligence', description: 'Real-time market insights and pricing data' },
  { icon: Award, title: 'Quality Assurance', description: 'Rigorous quality control at every step' },
  { icon: FileCheck, title: 'Documentation', description: 'Complete paperwork and customs handling' },
  { icon: Target, title: 'Custom Solutions', description: 'Tailored services for your specific needs' },
];

const industries = [
  { name: 'Agriculture', icon: Leaf, count: '2,500+ Products' },
  { name: 'Spices & Herbs', icon: ThermometerSun, count: '500+ Varieties' },
  { name: 'Coffee & Tea', icon: Package, count: '1,000+ Tons/Year' },
  { name: 'Textiles', icon: Box, count: '300+ Suppliers' },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(15)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 500}
                r="2"
                fill="url(#gradient)"
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
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Package, x: '10%', y: '20%', delay: 0 },
            { Icon: Ship, x: '85%', y: '25%', delay: 0.5 },
            { Icon: Plane, x: '15%', y: '70%', delay: 1 },
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
              <Icon className="w-16 h-16 text-blue-500/30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl p-12 border border-white/20 shadow-2xl">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Trade Services
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Global Trade Solutions
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
              >
                Connecting Ethiopian excellence to global markets with comprehensive export, import, and logistics services
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20 hover:bg-white/70 dark:hover:bg-gray-900/70"
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive trade solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group"
                >
                  <Link href={service.href}>
                    <div className="relative h-full backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Icon Header */}
                      <div className="relative p-8 pb-6">
                        <motion.div
                          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl mb-6 mx-auto`}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
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

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                          {Object.entries(service.stats).map(([key, value], i) => (
                            <div key={i} className="text-center">
                              <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                                {value}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="p-6 pt-0">
                        <Button 
                          className={`w-full bg-gradient-to-r ${service.color} hover:shadow-xl transition-all text-white`}
                        >
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
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
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Hafa Trading
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Industry-leading capabilities and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                          {capability.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Specialized expertise across multiple sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all text-center group overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-xl"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {industry.name}
                      </h3>
                      
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {industry.count}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Simple, streamlined process from start to finish
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Consultation', description: 'Discuss your needs and requirements', icon: Users },
                { step: '02', title: 'Planning', description: 'Develop customized solution', icon: Target },
                { step: '03', title: 'Execution', description: 'Implement and manage operations', icon: Zap },
                { step: '04', title: 'Delivery', description: 'Ensure successful completion', icon: CheckCircle },
              ].map((process, index) => {
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
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all text-center group">
                      <div className="relative mb-4">
                        <div className="text-6xl font-bold text-gray-200 dark:text-gray-800">
                          {process.step}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
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

                    {/* Connecting Line */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
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
                  Trusted by Businesses Worldwide
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Delivering excellence in global trade since 2010
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { value: '15+', label: 'Years Experience', icon: Award },
                  { value: '500+', label: 'Active Clients', icon: Users },
                  { value: '45+', label: 'Countries Served', icon: Globe },
                  { value: '10K+', label: 'Successful Shipments', icon: Ship },
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
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help your business succeed in global trade
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
                    >
                      Contact Us Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/rfq">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20 hover:bg-white/70 dark:hover:bg-gray-900/70"
                    >
                      Request a Quote
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
