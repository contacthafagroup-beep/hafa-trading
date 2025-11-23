'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Ship, Plane, Truck, Package, Shield, MapPin, Clock, CheckCircle,
  ArrowRight, Sparkles, Globe, Anchor, Container, Warehouse,
  Target, TrendingUp, Users, Award, BarChart3, Zap, Star,
  FileCheck, DollarSign, Navigation, Radio, Thermometer
} from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'Cost-effective ocean freight with FCL and LCL options to all major ports worldwide',
    color: 'from-blue-500 to-cyan-500',
    features: ['FCL Shipping', 'LCL Consolidation', 'Port-to-Port', 'Door-to-Door']
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and reliable air cargo services for time-sensitive shipments',
    color: 'from-purple-500 to-pink-500',
    features: ['Express Delivery', 'Charter Services', 'Dangerous Goods', 'Temperature Control']
  },
  {
    icon: Truck,
    title: 'Land Transportation',
    description: 'Domestic and cross-border trucking with GPS tracking and secure handling',
    color: 'from-orange-500 to-red-500',
    features: ['FTL & LTL', 'Cross-Border', 'GPS Tracking', 'Secure Transport']
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure storage facilities with inventory management and distribution',
    color: 'from-green-500 to-emerald-500',
    features: ['Climate Control', 'Inventory Mgmt', 'Pick & Pack', 'Distribution']
  },
  {
    icon: Shield,
    title: 'Customs Clearance',
    description: 'Expert customs brokerage ensuring smooth clearance and compliance',
    color: 'from-indigo-500 to-blue-500',
    features: ['Import/Export', 'Documentation', 'Duty Calculation', 'Compliance']
  },
  {
    icon: MapPin,
    title: 'Last Mile Delivery',
    description: 'Efficient final delivery to end customers with real-time tracking',
    color: 'from-teal-500 to-cyan-500',
    features: ['Same Day', 'Next Day', 'Scheduled', 'Proof of Delivery']
  },
];

const capabilities = [
  { icon: Radio, title: 'Real-Time Tracking', description: 'Track shipments 24/7 with live updates' },
  { icon: Thermometer, title: 'Temperature Control', description: 'Climate-controlled transport for sensitive goods' },
  { icon: Shield, title: 'Cargo Insurance', description: 'Comprehensive insurance coverage' },
  { icon: FileCheck, title: 'Documentation', description: 'Complete paperwork handling' },
  { icon: Container, title: 'Consolidation', description: 'LCL consolidation services' },
  { icon: Zap, title: 'Express Services', description: 'Expedited shipping options' },
];

const routes = [
  { from: 'Ethiopia', to: 'Europe', time: '15-20 days', mode: 'Sea', icon: Ship },
  { from: 'Ethiopia', to: 'Middle East', time: '10-15 days', mode: 'Sea', icon: Ship },
  { from: 'Ethiopia', to: 'Asia', time: '20-25 days', mode: 'Sea', icon: Ship },
  { from: 'Ethiopia', to: 'Global', time: '3-7 days', mode: 'Air', icon: Plane },
];

export default function LogisticsPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(15)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${Math.random() * 1000} ${Math.random() * 500} L ${Math.random() * 1000} ${Math.random() * 500}`}
                stroke="url(#gradientLogistics)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
            <defs>
              <linearGradient id="gradientLogistics" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Ship, x: '10%', y: '20%', delay: 0 },
            { Icon: Plane, x: '85%', y: '25%', delay: 0.5 },
            { Icon: Truck, x: '15%', y: '70%', delay: 1 },
            { Icon: Package, x: '80%', y: '75%', delay: 1.5 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -30, 0],
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
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Logistics Services
              </Badge>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Logistics & Shipping
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
              >
                End-to-end freight and logistics solutions for seamless global delivery
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
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transition-all"
                  >
                    Get Shipping Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20"
                  >
                    Track Shipment
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {[
                  { icon: Award, text: 'IATA Certified' },
                  { icon: Users, text: '10K+ Shipments' },
                  { icon: Globe, text: '100+ Routes' },
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Our Logistics Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive freight solutions for all your shipping needs
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
                      
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-cyan-600 transition-all">
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

      {/* Capabilities Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Technology-driven logistics solutions
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
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

      {/* Shipping Routes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Major Shipping Routes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Fast and reliable connections to global markets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {routes.map((route, index) => {
              const Icon = route.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all text-center group">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-xl"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">From</div>
                      <div className="font-bold text-gray-900 dark:text-white">{route.from}</div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      <Navigation className="w-4 h-4 mx-2 text-blue-600" />
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">To</div>
                      <div className="font-bold text-gray-900 dark:text-white">{route.to}</div>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {route.time}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
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
                  Logistics Excellence
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Delivering reliability and efficiency in every shipment
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { value: '10K+', label: 'Shipments/Year', icon: Package },
                  { value: '100+', label: 'Active Routes', icon: Globe },
                  { value: '99%', label: 'On-Time Delivery', icon: Clock },
                  { value: '24/7', label: 'Support', icon: Users },
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
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Ready to Ship?
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Get your freight moving with our reliable logistics solutions
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rfq">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transition-all"
                    >
                      Get Shipping Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/track">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-white/20"
                    >
                      Track Shipment
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { icon: Shield, text: 'Cargo Insurance' },
                    { icon: Clock, text: '24/7 Tracking' },
                    { icon: Award, text: 'IATA Certified' },
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
