'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Target, Eye, Award, Users, Globe, TrendingUp, CheckCircle, 
  Sparkles, Package, Shield, Truck, FileText, Leaf, Heart,
  Factory, Microscope, Plane, Box, Thermometer, ClipboardCheck
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* 1. Hero Section - "Who We Are" */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 25, repeat: Infinity, delay: 3 }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"
          />
          
          {/* Floating Icons */}
          {['🌿', '✈️', '📦', '🌍', '🚚', '⭐'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl opacity-20"
              style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-7xl mb-6 inline-block"
            >
              🌍
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Empowering Global Markets With Premium Ethiopian Exports
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              From our farms, fields, and production partners in Ethiopia, we deliver high-quality agricultural, livestock, spice, and natural products to customers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Story
              </h2>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border-2 border-blue-200/50 dark:border-blue-800/50"
              >
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Hafa Trading PLC</span> was founded with a mission to connect Ethiopia's finest natural resources with the world. We are <span className="font-bold">exporters, not brokers</span> — meaning we source, process, package, and ship products directly, ensuring quality control at every step.
                </p>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  We work with certified farms, cooperatives, and processing centers that meet international export standards.
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" />
                {[
                  { year: 'Founded', title: 'Company Establishment', desc: 'Started with a vision to connect Ethiopian products to global markets' },
                  { year: 'Growth', title: 'International Expansion', desc: 'Established partnerships across UAE, USA, EU, and Asia' },
                  { year: 'Today', title: 'Leading Exporter', desc: 'Trusted by hundreds of international buyers worldwide' }
                ].map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative pl-20 pb-12"
                  >
                    <div className="absolute left-4 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <span className="text-sm font-bold text-blue-600">{milestone.year}</span>
                      <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Mission, Vision & Values */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mission, Vision & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-800/50">
                <CardContent className="p-8">
                  <Target className="h-16 w-16 text-purple-600 mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To deliver premium Ethiopian exports with unmatched quality, transparency, and reliability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-pink-200/50 dark:border-pink-800/50">
                <CardContent className="p-8">
                  <Eye className="h-16 w-16 text-pink-600 mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To become East Africa's most trusted and globally recognized export partner.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: '✨', title: 'Quality', color: 'from-blue-500 to-cyan-500' },
              { icon: '🤝', title: 'Integrity', color: 'from-purple-500 to-pink-500' },
              { icon: '🌱', title: 'Sustainability', color: 'from-green-500 to-emerald-500' },
              { icon: '🧠', title: 'Innovation', color: 'from-orange-500 to-red-500' },
              { icon: '⭐', title: 'Customer Focus', color: 'from-yellow-500 to-amber-500' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <Card className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="text-5xl mb-3"
                    >
                      {value.icon}
                    </motion.div>
                    <h4 className={`text-lg font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                      {value.title}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Makes Us Different */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Why Exporters Worldwide Choose Hafa Trading PLC
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Leaf, title: 'Direct Sourcing — No Middlemen', desc: 'We work directly with farmers and producers, ensuring authenticity, fair pricing, and consistent quality.', color: 'from-green-500 to-emerald-600' },
              { icon: Factory, title: 'End-to-End Quality Control', desc: 'From harvesting to packaging to export logistics — every stage is monitored.', color: 'from-blue-500 to-cyan-600' },
              { icon: Globe, title: 'International Export Standards', desc: 'We follow export protocols for UAE, USA, EU, China, GCC, & East Africa.', color: 'from-purple-500 to-pink-600' },
              { icon: Truck, title: 'Reliable Global Logistics', desc: 'Temperature-controlled transport, real-time tracking, and fast dispatch.', color: 'from-orange-500 to-red-600' },
              { icon: Package, title: 'Custom Packaging & Private Labeling', desc: 'Your branding, your specifications, international standard packaging.', color: 'from-yellow-500 to-amber-600' },
              { icon: Users, title: 'Strong Professional Team', desc: 'Experts in quality control, export documentation, logistics, and international trade.', color: 'from-teal-500 to-green-600' },
              { icon: Shield, title: 'Full Compliance & Certifications', desc: 'Health certificates, phytosanitary, COA, SGS, HALAL (if needed), export permits, etc.', color: 'from-indigo-500 to-purple-600' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quality Control Process */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Quality Control Process
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {[
              { icon: '🌿', title: 'Farm Selection', desc: 'Partnering with certified organic farms' },
              { icon: '✂️', title: 'Harvesting', desc: 'Optimal timing for maximum quality' },
              { icon: '🧼', title: 'Sorting & Cleaning', desc: 'Rigorous quality inspection' },
              { icon: '📦', title: 'Processing & Packaging', desc: 'International standard packaging' },
              { icon: '❄️', title: 'Cold Storage', desc: 'Temperature-controlled facilities' },
              { icon: '🚚', title: 'Export Logistics', desc: 'Fast and reliable shipping' },
              { icon: '✔️', title: 'Final Quality Check', desc: 'Pre-shipment verification' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative mb-8"
              >
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg"
                  >
                    {step.icon}
                  </motion.div>
                  <div className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
                  </div>
                </div>
                {i < 6 && (
                  <div className="absolute left-10 top-20 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sustainability & Social Impact */}
      <section className="py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sustainability & Social Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '👨‍🌾', title: 'Supporting Local Farmers', desc: 'Fair prices and long-term partnerships' },
              { icon: '🤝', title: 'Fair-Trade Cooperation', desc: 'Ethical sourcing practices' },
              { icon: '♻️', title: 'Eco-Friendly Packaging', desc: 'Biodegradable materials' },
              { icon: '🌱', title: 'Sustainable Harvesting', desc: 'Protecting natural resources' },
              { icon: '💼', title: 'Community Employment', desc: 'Creating local jobs' },
              { icon: '💚', title: 'Environmental Care', desc: 'Reducing carbon footprint' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="h-full text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="text-6xl mb-4"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Certifications & Compliance */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications & Compliance
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: '🏛️', title: 'Ministry of Trade' },
              { icon: '🛃', title: 'Customs Authority' },
              { icon: '🌿', title: 'Phytosanitary' },
              { icon: '✅', title: 'SGS Certified' },
              { icon: '☪️', title: 'HALAL' },
              { icon: '🏆', title: 'ISO Certified' },
              { icon: '📋', title: 'Export License' },
              { icon: '🔬', title: 'Lab Tested' }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Card className="text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-5xl mb-3"
                    >
                      {cert.icon}
                    </motion.div>
                    <p className="font-bold text-sm">{cert.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-6">
              Partner With Us for Reliable Ethiopian Exports
            </h2>
            <p className="text-2xl text-white/90 mb-10">
              Join hundreds of satisfied international buyers who trust Hafa Trading PLC
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-7 text-xl font-bold shadow-2xl">
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
              <Link href="/rfq">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-7 text-xl font-bold">
                    Request a Quote
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
