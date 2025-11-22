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
import GlobalMap from '@/components/global-map';
import LiveChatBox from '@/components/live-chat-box';
import InsightsSection from '@/components/insights-section';
import WhyChooseSection from '@/components/why-choose-section';
import MarketDashboardSection from '@/components/market-dashboard-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 md:py-40 overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0">
          {/* Large Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -60, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 25, repeat: Infinity, delay: 3 }}
            className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              y: [0, 40, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full blur-3xl"
          />
          
          {/* Floating Icons */}
          {['🌿', '🌾', '🐑', '✈️', '🌍', '📦', '🚚', '⭐'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl opacity-10"
              style={{
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                🌍
              </motion.span>
              <span className="text-sm font-semibold text-blue-100">Premium Ethiopian Exports</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-r from-white via-blue-100 to-white bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Hafa General Trading
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-4xl mb-6 font-bold"
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-emerald-300 bg-clip-text text-transparent">
                Trading Beyond Borders
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Premium <span className="font-bold text-white">Ethiopian agricultural products</span>, livestock, and herbs exported worldwide. 
              Connecting Ethiopia's finest products to <span className="font-bold text-cyan-300">global markets</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link href="/export-products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                        '0 0 40px rgba(255, 255, 255, 0.5)',
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="inline-block rounded-full"
                  >
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-7 text-lg font-bold shadow-2xl relative overflow-hidden group">
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Our Products
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </Link>
              
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="border-2 border-white !bg-white/10 backdrop-blur-xl text-white hover:!bg-white hover:text-blue-600 px-8 py-7 text-lg font-bold shadow-xl transition-all duration-300">
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-blue-100"
            >
              {[
                { icon: '✅', text: 'ISO Certified' },
                { icon: '🌍', text: '50+ Countries' },
                { icon: '⭐', text: '15+ Years Experience' },
                { icon: '🚚', text: 'Fast Shipping' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <motion.path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
              className="text-emerald-50 dark:text-gray-900"
              animate={{
                d: [
                  "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                  "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                  "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* Why Choose Hafa - Super Attractive Premium Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl"
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              ⭐
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Why Choose Hafa Trading?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Excellence in international trade with <span className="font-bold text-green-600 dark:text-green-400">decades of experience</span> and a commitment to your success
            </p>
          </motion.div>
          
          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Globe,
                title: 'Direct From Ethiopian Farms',
                description: 'We export fresh, authentic, and sustainably sourced Ethiopian agricultural products directly from our partnered farms and cooperatives — ensuring purity, freshness, and full traceability.',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-50 dark:bg-green-900/20',
                iconBg: 'bg-green-100 dark:bg-green-900/40',
                borderColor: 'border-green-200 dark:border-green-800',
                emoji: '🌿',
                animation: 'float'
              },
              {
                icon: Shield,
                title: 'International-Grade Quality Control',
                description: 'Every product goes through multi-stage inspection, packaging verification, and export compliance checks to meet EU, FDA, Gulf, and Asian import requirements.',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                iconBg: 'bg-blue-100 dark:bg-blue-900/40',
                borderColor: 'border-blue-200 dark:border-blue-800',
                emoji: '🛡️',
                animation: 'shine'
              },
              {
                icon: Truck,
                title: 'Export-Optimized Logistics',
                description: 'Whether air cargo for perishables or sea freight for bulk shipments, our logistics chain ensures fast, temperature-controlled, and fully documented exports with real-time tracking.',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                iconBg: 'bg-purple-100 dark:bg-purple-900/40',
                borderColor: 'border-purple-200 dark:border-purple-800',
                emoji: '🚚',
                animation: 'move'
              },
              {
                icon: Users,
                title: 'Agricultural Export Experts',
                description: 'Our team consists of experienced agronomists, export specialists, and quality engineers committed to delivering products that meet international buyer expectations.',
                color: 'from-orange-500 to-amber-500',
                bgColor: 'bg-orange-50 dark:bg-orange-900/20',
                iconBg: 'bg-orange-100 dark:bg-orange-900/40',
                borderColor: 'border-orange-200 dark:border-orange-800',
                emoji: '👨‍🌾',
                animation: 'wave'
              },
              {
                icon: TrendingUp,
                title: 'Competitive International Pricing',
                description: 'Thanks to our direct sourcing, efficient operations, and large-scale supply capacity, we offer fair, stable, and globally competitive export pricing.',
                color: 'from-yellow-500 to-amber-500',
                bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
                borderColor: 'border-yellow-200 dark:border-yellow-800',
                emoji: '💰',
                animation: 'bounce'
              },
              {
                icon: Package,
                title: 'Wide & Reliable Export Portfolio',
                description: 'Choose from 50+ export-quality products, including fresh herbs, spices, cereals, legumes, vegetables, fruits, livestock products, and various Ethiopian-origin commodities.',
                color: 'from-teal-500 to-cyan-500',
                bgColor: 'bg-teal-50 dark:bg-teal-900/20',
                iconBg: 'bg-teal-100 dark:bg-teal-900/40',
                borderColor: 'border-teal-200 dark:border-teal-800',
                emoji: '📦',
                animation: 'open'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className={`relative h-full ${feature.bgColor} backdrop-blur-xl rounded-3xl p-6 border-2 ${feature.borderColor} hover:border-opacity-100 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl`}>
                  {/* Parallax farmland background for Direct From Farms */}
                  {feature.animation === 'float' && (
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%']
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 Q 25 30, 50 50 T 100 50 L 100 100 L 0 100 Z\' fill=\'%23166534\'/%3E%3C/svg%3E")',
                        backgroundSize: '200px 100px',
                        backgroundRepeat: 'repeat'
                      }}
                    />
                  )}
                  
                  {/* World map lines for Logistics */}
                  {feature.animation === 'move' && (
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                          style={{
                            top: `${20 + i * 20}%`,
                            left: 0,
                            right: 0
                          }}
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scaleX: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Quality badges fade-in for Quality Control */}
                  {feature.animation === 'shine' && (
                    <div className="absolute top-4 right-4 flex gap-1">
                      {['EU', 'FDA', 'ISO'].map((badge, i) => (
                        <motion.div
                          key={badge}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.2 }}
                          className="text-xs font-bold px-2 py-1 bg-blue-500/20 rounded-full text-blue-700 dark:text-blue-300"
                        >
                          {badge}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Currency icons float for Pricing */}
                  {feature.animation === 'bounce' && (
                    <div className="absolute top-4 right-4">
                      {['$', '€', '£'].map((currency, i) => (
                        <motion.span
                          key={currency}
                          className="absolute text-yellow-500/30 font-bold"
                          style={{ left: i * 15, top: i * 10 }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        >
                          {currency}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(0,0,0,0)',
                        '0 0 20px rgba(34, 197, 94, 0.3)',
                        '0 0 0px rgba(0,0,0,0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with emoji - Custom animations per feature */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className={`${feature.iconBg} p-3 rounded-2xl relative overflow-hidden`}
                      >
                        {/* Shield shine effect */}
                        {feature.animation === 'shine' && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{
                              x: ['-100%', '200%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        )}
                        <feature.icon className={`h-8 w-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent relative z-10`} />
                      </motion.div>
                      
                      {/* Emoji with custom animations */}
                      <motion.span
                        animate={
                          feature.animation === 'float' ? {
                            y: [0, -8, 0],
                            rotate: [0, 5, -5, 0]
                          } :
                          feature.animation === 'shine' ? {
                            scale: [1, 1.1, 1],
                            filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
                          } :
                          feature.animation === 'move' ? {
                            x: [0, 5, -5, 0]
                          } :
                          feature.animation === 'wave' ? {
                            rotate: [0, 15, -15, 0]
                          } :
                          feature.animation === 'bounce' ? {
                            y: [0, -10, 0],
                            scale: [1, 1.15, 1]
                          } :
                          feature.animation === 'open' ? {
                            rotateY: [0, 180, 360]
                          } :
                          { scale: [1, 1.1, 1] }
                        }
                        transition={{ 
                          duration: feature.animation === 'open' ? 4 : 3, 
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: 'easeInOut'
                        }}
                        className="text-4xl"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {feature.emoji}
                      </motion.span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Hover arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      Learn more
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 hover:from-green-700 hover:via-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-bold shadow-2xl rounded-full"
                >
                  <span className="flex items-center gap-2">
                    Discover Our Story
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Range - Premium Redesigned Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              y: [0, 30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity, delay: 4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
          />
          
          {/* Floating Product Icons */}
          {['🌿', '🥬', '🍊', '🌾', '🐑', '☕'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Animated Icon Group */}
            <div className="flex justify-center items-center gap-3 mb-6">
              {['🌿', '🥬', '🍊', '🌾'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-5xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 dark:from-green-400 dark:via-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Our Export Product Range
            </h2>
            
            {/* Animated Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { text: '🏆 Premium Quality', color: 'green' },
                { text: '🌱 Ethically Sourced', color: 'blue' },
                { text: '✈️ Export-Ready', color: 'purple' },
                { text: '🛡️ Certified', color: 'amber' }
              ].map((badge, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-5 py-2.5 bg-${badge.color}-100 dark:bg-${badge.color}-900/30 text-${badge.color}-700 dark:text-${badge.color}-300 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-${badge.color}-200 dark:border-${badge.color}-800`}
                >
                  {badge.text}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Hafa Trading PLC proudly <span className="font-bold text-green-600 dark:text-green-400">exports</span> a diverse portfolio of high-quality agricultural products, fresh produce, 
              livestock, herbs, and spices, sourced directly from trusted Ethiopian farmers, cooperatives, and pastoralist communities.
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Fresh Vegetables */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/fresh-vegetables" className="block h-full">
                <Card className="h-full border-2 border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(34, 197, 94, 0)',
                        '0 0 30px rgba(34, 197, 94, 0.4)',
                        '0 0 0px rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Floating vegetables in background */}
                  <div className="absolute inset-0 opacity-5">
                    {['🥬', '🥕', '🍅'].map((veg, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-6xl"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        {veg}
                      </motion.span>
                    ))}
                  </div>
                  
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🥬
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400 group-hover:text-green-500 transition-colors">Fresh Vegetables</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Premium & Commercial Grade</p>
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
                    <div className="flex items-center text-green-600 dark:text-green-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Fresh Fruits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/fresh-fruits" className="block h-full">
                <Card className="h-full border-2 border-orange-200/50 dark:border-orange-800/50 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(249, 115, 22, 0)',
                        '0 0 30px rgba(249, 115, 22, 0.4)',
                        '0 0 0px rgba(249, 115, 22, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🍊
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400 group-hover:text-orange-500 transition-colors">Fresh Fruits</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Naturally Grown & Export Ready</p>
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
                    <div className="flex items-center text-orange-600 dark:text-orange-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Herbs & Spices */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/herbs-spices" className="block h-full">
                <Card className="h-full border-2 border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(168, 85, 247, 0)',
                        '0 0 30px rgba(168, 85, 247, 0.4)',
                        '0 0 0px rgba(168, 85, 247, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🌿
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 transition-colors">Herbs & Spices</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Fresh & Dried</p>
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
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Grains & Legumes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/grains-legumes" className="block h-full">
                <Card className="h-full border-2 border-amber-200/50 dark:border-amber-800/50 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(245, 158, 11, 0)',
                        '0 0 30px rgba(245, 158, 11, 0.4)',
                        '0 0 0px rgba(245, 158, 11, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      🌾
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400 group-hover:text-amber-500 transition-colors">Grains & Legumes</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Bulk Export Quality</p>
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
                    <div className="flex items-center text-amber-600 dark:text-amber-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Livestock & Meat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/livestock-meat" className="block h-full">
                <Card className="h-full border-2 border-red-200/50 dark:border-red-800/50 hover:border-red-400 dark:hover:border-red-600 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(239, 68, 68, 0)',
                        '0 0 30px rgba(239, 68, 68, 0.4)',
                        '0 0 0px rgba(239, 68, 68, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🐑
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors">Livestock & Meat</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">Export-Standard & Halal Certified</p>
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
                    <div className="flex items-center text-red-600 dark:text-red-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Specialty Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <Link href="/products/categories/specialty-products" className="block h-full">
                <Card className="h-full border-2 border-yellow-200/50 dark:border-yellow-800/50 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 overflow-hidden group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(234, 179, 8, 0)',
                        '0 0 30px rgba(234, 179, 8, 0.4)',
                        '0 0 0px rgba(234, 179, 8, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      ⭐
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-500 transition-colors">Specialty Products</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-semibold">High-Demand Items</p>
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
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Range</span>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Hafa Section - Managed from Admin */}
      <WhyChooseSection />

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

      {/* Meet Our Team - Super Attractive Premium Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"
          />
          
          {/* Floating Team Icons */}
          {['👨‍💼', '👩‍💼', '🤝', '🌍', '⭐'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Animated Icon Group */}
            <div className="flex justify-center items-center gap-3 mb-6">
              {['👨‍💼', '👩‍💼', '🤝'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-5xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Meet Our Expert Team
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Dedicated professionals with <span className="font-bold text-purple-600 dark:text-purple-400">decades of experience</span> connecting Ethiopia to the world
            </motion.p>
          </motion.div>

          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'Ahmed Hassan', position: 'CEO & Founder', country: '🇪🇹', color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-500/10 to-cyan-500/10', borderColor: 'border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400' },
              { name: 'Sarah Mohammed', position: 'Export Director', country: '🇪🇹', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-500/10 to-pink-500/10', borderColor: 'border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400' },
              { name: 'David Chen', position: 'Quality Assurance', country: '🇨🇳', color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-500/10 to-rose-500/10', borderColor: 'border-pink-200/50 dark:border-pink-800/50 hover:border-pink-400' }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group"
              >
                <Card className={`h-full backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-2 ${member.borderColor} hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(168, 85, 247, 0)',
                        '0 0 25px rgba(168, 85, 247, 0.3)',
                        '0 0 0px rgba(168, 85, 247, 0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  
                  <CardContent className="p-6 text-center relative z-10">
                    {/* Avatar with animations */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative inline-block mb-4"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} mx-auto flex items-center justify-center text-4xl shadow-xl relative overflow-hidden`}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        />
                        <span className="relative z-10">👤</span>
                      </motion.div>
                      
                      {/* Pulsing glow */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1], 
                          opacity: [0.3, 0.6, 0.3] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} blur-xl -z-10`}
                      />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                    <p className={`text-sm font-bold mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                      {member.position}
                    </p>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      {member.country}
                    </motion.div>
                    
                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm font-semibold text-purple-600 dark:text-purple-400"
                    >
                      View Profile →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                      '0 0 40px rgba(168, 85, 247, 0.5)',
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block rounded-full"
                >
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold shadow-2xl relative overflow-hidden group">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Meet the Whole Team
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global Market Reach - Super Attractive Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-950 to-black text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -50, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl"
          />
          
          {/* Floating Globe Icons */}
          {['🌍', '🌎', '🌏', '✈️', '🚢'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl opacity-10"
              style={{
                left: `${10 + i * 20}%`,
                top: `${15 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
          
          {/* Animated Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Animated Globe Icons */}
            <div className="flex justify-center items-center gap-4 mb-6">
              {['🌍', '🌎', '🌏'].map((globe, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: i * 0.5 },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                  }}
                  className="text-6xl"
                >
                  {globe}
                </motion.div>
              ))}
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Global Market Reach
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
            >
              Exporting <span className="font-bold text-cyan-400">premium Ethiopian agricultural products</span> to more than <span className="font-bold text-green-400">12 countries</span> worldwide
            </motion.p>
          </motion.div>

          {/* Freight Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '✈️', title: 'Air Freight', desc: '48–72 hours delivery', color: 'from-blue-500 to-cyan-500', shadow: 'hover:shadow-blue-500/50' },
              { icon: '🚢', title: 'Sea Freight', desc: '15–40 days transit', color: 'from-green-500 to-emerald-500', shadow: 'hover:shadow-green-500/50' },
              { icon: '🚚', title: 'Road Freight', desc: 'Across East Africa', color: 'from-orange-500 to-red-500', shadow: 'hover:shadow-orange-500/50' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <Card className={`bg-gradient-to-br ${item.color} border-0 text-white hover:shadow-2xl ${item.shadow} transition-all duration-500 relative overflow-hidden`}>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: index * 0.5
                    }}
                  />
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      animate={{ 
                        y: [0, -12, 0],
                        rotate: index === 0 ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90 text-lg">{item.desc}</p>
                    
                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm font-bold"
                    >
                      Learn More →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Interactive World Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <GlobalMap />
          </motion.div>

          {/* Export Destinations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/20 relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"
              animate={{
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
              >
                🌐 Our Export Destinations
              </motion.h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
                {[
                  { flag: '🇦🇪', name: 'UAE', region: 'Middle East' },
                  { flag: '🇸🇦', name: 'Saudi Arabia', region: 'Middle East' },
                  { flag: '🇷🇺', name: 'Russia', region: 'Europe' },
                  { flag: '🇨🇳', name: 'China', region: 'Asia' },
                  { flag: '🇹🇷', name: 'Turkey', region: 'Europe' },
                  { flag: '🇪🇺', name: 'EU', region: 'Europe' },
                  { flag: '🇺🇸', name: 'USA', region: 'Americas' },
                  { flag: '🇮🇳', name: 'India', region: 'Asia' }
                ].map((country, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.15, y: -8 }}
                    className="cursor-pointer group"
                  >
                    <motion.div
                      className="relative"
                    >
                      {/* Pulsing glow on hover */}
                      <motion.div
                        className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        className="text-5xl mb-2 relative z-10"
                      >
                        {country.flag}
                      </motion.div>
                    </motion.div>
                    <p className="text-sm font-bold mb-1">{country.name}</p>
                    <p className="text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {country.region}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-10 pt-8 border-t border-white/20 grid grid-cols-3 gap-6 text-center"
              >
                {[
                  { number: '12+', label: 'Countries' },
                  { number: '50+', label: 'Products' },
                  { number: '24/7', label: 'Support' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2"
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-sm text-blue-200">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Control Process - Super Attractive Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🛡️
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Quality Control Process
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              <span className="font-bold text-green-600 dark:text-green-400">7-step verification</span> ensuring premium quality from farm to export
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="max-w-5xl mx-auto">
            {[
              { icon: '🌱', title: 'Farm Selection', desc: 'Partnering with certified organic farms', color: 'from-green-400 to-emerald-600', bgColor: 'from-green-500/10 to-emerald-500/10', borderColor: 'border-green-200 dark:border-green-800' },
              { icon: '🚜', title: 'Harvesting', desc: 'Optimal timing for peak freshness', color: 'from-yellow-400 to-orange-600', bgColor: 'from-yellow-500/10 to-orange-500/10', borderColor: 'border-yellow-200 dark:border-yellow-800' },
              { icon: '🧼', title: 'Sorting & Cleaning', desc: 'Rigorous quality inspection', color: 'from-blue-400 to-cyan-600', bgColor: 'from-blue-500/10 to-cyan-500/10', borderColor: 'border-blue-200 dark:border-blue-800' },
              { icon: '📦', title: 'Packaging', desc: 'Export-grade protective packaging', color: 'from-purple-400 to-pink-600', bgColor: 'from-purple-500/10 to-pink-500/10', borderColor: 'border-purple-200 dark:border-purple-800' },
              { icon: '❄️', title: 'Cold Storage', desc: 'Temperature-controlled preservation', color: 'from-cyan-400 to-blue-600', bgColor: 'from-cyan-500/10 to-blue-500/10', borderColor: 'border-cyan-200 dark:border-cyan-800' },
              { icon: '✈️', title: 'Export Logistics', desc: 'Fast & reliable shipping', color: 'from-indigo-400 to-purple-600', bgColor: 'from-indigo-500/10 to-purple-500/10', borderColor: 'border-indigo-200 dark:border-indigo-800' },
              { icon: '✅', title: 'Final Quality Check', desc: 'Pre-shipment verification', color: 'from-green-500 to-teal-600', bgColor: 'from-green-500/10 to-teal-500/10', borderColor: 'border-green-200 dark:border-green-800' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative mb-6 last:mb-0"
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-6 group"
                >
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 relative">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-xl relative overflow-hidden`}
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: index * 0.3
                        }}
                      />
                      <span className="text-4xl mb-1 relative z-10">{step.icon}</span>
                      <span className="text-white text-xs font-bold relative z-10">STEP {index + 1}</span>
                    </motion.div>
                    
                    {/* Pulsing glow */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.3, 0.6, 0.3] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl -z-10`}
                    />
                  </div>
                  
                  {/* Content Card */}
                  <Card className={`flex-1 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-2 ${step.borderColor} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-lg">{step.desc}</p>
                        </div>
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-3xl ml-4"
                        >
                          →
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Connecting Line */}
                {index < 6 && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="relative ml-12 my-3"
                  >
                    <div className={`w-2 h-10 bg-gradient-to-b ${step.color} rounded-full`} />
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      className="absolute top-0 left-0 w-2 h-3 bg-white rounded-full"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials - Super Attractive Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"
          />
          
          {/* Floating Stars */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="text-5xl"
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Trusted by <span className="font-bold text-purple-600 dark:text-purple-400">businesses worldwide</span>
            </p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'Mohammed Al-Farsi', country: '🇦🇪', company: 'Dubai Fresh Markets', rating: 5, text: 'Outstanding quality and reliable delivery. Hafa Trading has been our trusted partner for 3 years.', color: 'from-purple-500 to-pink-500' },
              { name: 'Elena Petrova', country: '🇷🇺', company: 'Moscow Import Co.', rating: 5, text: 'Excellent communication and premium products. Their logistics team is highly professional.', color: 'from-pink-500 to-rose-500' },
              { name: 'James Wilson', country: '🇺🇸', company: 'US Organic Foods', rating: 5, text: 'Best Ethiopian coffee and spices supplier. Quality consistently exceeds expectations.', color: 'from-blue-500 to-purple-500' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-2 border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden">
                  {/* Quote mark background */}
                  <div className="absolute top-4 right-4 text-8xl text-purple-200/20 dark:text-purple-800/20 font-serif">
                    "
                  </div>
                  
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Client Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg relative overflow-hidden`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: index * 0.5
                          }}
                        />
                        <span className="relative z-10">👤</span>
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl"
                        >
                          {testimonial.country}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.15 + i * 0.1 }}
                          whileHover={{ scale: 1.3, rotate: 20 }}
                          className="text-yellow-500 text-2xl cursor-pointer"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trusted Companies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Trusted By Leading Companies
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {['🏢', '🏭', '🏪', '🏬', '🏛', '🏦'].map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.3, y: -10, rotate: 10 }}
                  className="text-7xl grayscale hover:grayscale-0 transition-all cursor-pointer filter drop-shadow-lg"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{
                x: [null, Math.random() * 100 + '%'],
                y: [null, Math.random() * 100 + '%'],
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              🍃
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Animated Icons Group */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-7xl"
              >
                🌍
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl"
              >
                🤝
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  y: [0, -8, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl"
              >
                💚
              </motion.div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Sustainability & Social Impact
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Building a <span className="font-bold text-green-600 dark:text-green-400">better future</span> through responsible farming and <span className="font-bold text-emerald-600 dark:text-emerald-400">community empowerment</span>
            </motion.p>
          </motion.div>

          {/* Premium Impact Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: '♻️',
                title: 'Sustainable Farming',
                items: ['Water conservation', 'Chemical-free harvesting', 'Farmer training programs', 'Soil health protection'],
                color: 'from-green-400 to-emerald-600',
                bgGradient: 'from-green-500/10 to-emerald-500/10',
                borderColor: 'border-green-200/50 dark:border-green-800/50 hover:border-green-400',
                iconBg: 'from-green-400 to-emerald-600'
              },
              {
                icon: '🤝',
                title: 'Community Support',
                items: ['Supporting smallholder farmers', 'Job creation', 'Women farmers empowerment', 'Fair trade practices'],
                color: 'from-blue-400 to-cyan-600',
                bgGradient: 'from-blue-500/10 to-cyan-500/10',
                borderColor: 'border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400',
                iconBg: 'from-blue-400 to-cyan-600'
              },
              {
                icon: '🌱',
                title: 'Environmental Commitment',
                items: ['Eco-friendly packaging', 'Reduced carbon footprint', 'Responsible waste management', 'Renewable energy use'],
                color: 'from-teal-400 to-green-600',
                bgGradient: 'from-teal-500/10 to-green-500/10',
                borderColor: 'border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400',
                iconBg: 'from-teal-400 to-green-600'
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group"
              >
                <Card className={`h-full backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-2 ${section.borderColor} hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(34, 197, 94, 0)',
                        '0 0 30px rgba(34, 197, 94, 0.4)',
                        '0 0 0px rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.8 }}
                  />
                  
                  <CardContent className="p-10 relative z-10">
                    {/* Animated Icon Container */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        rotate: index === 0 ? [0, 360] : [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: index === 0 ? 8 : 3, 
                        repeat: Infinity,
                        ease: index === 0 ? 'linear' : 'easeInOut'
                      }}
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${section.iconBg} flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl relative`}
                    >
                      {/* Icon glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-white/20"
                        animate={{
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="relative z-10">{section.icon}</span>
                    </motion.div>
                    
                    <h3 className={`text-3xl font-bold mb-6 text-center bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                      {section.title}
                    </h3>
                    
                    <ul className="space-y-4">
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-start gap-3 group/item"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0 group-hover/item:text-green-500" />
                          </motion.div>
                          <span className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="mt-6 text-center text-sm font-bold text-green-600 dark:text-green-400"
                    >
                      Learn More →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends & Price Dashboard */}
      <MarketDashboardSection />

      {/* Insights Section - Latest Industry News */}
      <InsightsSection />

      {/* Live Chat Box with Real-time Messaging */}
      <LiveChatBox />

      <Footer />
    </div>
  );
}
