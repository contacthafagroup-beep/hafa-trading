'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, Globe, TrendingUp, Users, CheckCircle, Send, 
  Award, Shield, Zap, Target, Crown, Star, Rocket,
  Package, DollarSign, HeadphonesIcon, BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    businessType: 'distributor',
    productsInterested: '',
    annualVolume: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Import dynamically to avoid SSR issues
      const { createPartnership } = await import('@/lib/firebase/partnerships');
      
      await createPartnership({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        businessType: formData.businessType,
        productsInterested: formData.productsInterested,
        annualVolume: formData.annualVolume,
        message: formData.message,
        status: 'new'
      });
      
      toast.success('Partnership application submitted! We will contact you within 48 hours.');
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        businessType: 'distributor',
        productsInterested: '',
        annualVolume: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting partnership:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold mb-6"
            >
              <Crown className="h-4 w-4" />
              PREMIUM PARTNERSHIP PROGRAM
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Become a Partner
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join our global network of successful distributors and unlock 
              <span className="font-semibold text-blue-600"> exclusive benefits</span>, 
              <span className="font-semibold text-purple-600"> premium support</span>, and 
              <span className="font-semibold text-pink-600"> unlimited growth potential</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                  onClick={() => {
                    const formSection = document.getElementById('application-form');
                    formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Apply Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2">
                    <HeadphonesIcon className="mr-2 h-5 w-5" />
                    Talk to Us
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { number: '500+', label: 'Active Partners' },
                { number: '30+', label: 'Countries' },
                { number: '15+', label: 'Years Experience' },
                { number: '98%', label: 'Satisfaction Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              EXCLUSIVE BENEFITS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Partner <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Advantages</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Unlock powerful features designed to accelerate your business growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Exclusive Territory Rights',
                description: 'Become the sole distributor in your region with protected market territory',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-500/10 to-cyan-500/10'
              },
              {
                icon: DollarSign,
                title: 'Volume Discounts',
                description: 'Tiered pricing structure with up to 30% discount on bulk orders',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-500/10 to-emerald-500/10'
              },
              {
                icon: Zap,
                title: 'Priority Shipping',
                description: 'Fast-track processing and expedited shipping for all your orders',
                gradient: 'from-yellow-500 to-orange-500',
                bgGradient: 'from-yellow-500/10 to-orange-500/10'
              },
              {
                icon: Package,
                title: 'Custom Packaging',
                description: 'Private labeling and custom packaging options for your brand',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-500/10 to-pink-500/10'
              },
              {
                icon: HeadphonesIcon,
                title: 'Dedicated Support',
                description: 'Personal account manager and 24/7 priority customer support',
                gradient: 'from-red-500 to-rose-500',
                bgGradient: 'from-red-500/10 to-rose-500/10'
              },
              {
                icon: BarChart3,
                title: 'Market Intelligence',
                description: 'Regular market reports, trend analysis, and pricing insights',
                gradient: 'from-indigo-500 to-blue-500',
                bgGradient: 'from-indigo-500/10 to-blue-500/10'
              },
              {
                icon: Award,
                title: 'Training Programs',
                description: 'Product training, certification programs, and business development',
                gradient: 'from-teal-500 to-cyan-500',
                bgGradient: 'from-teal-500/10 to-cyan-500/10'
              },
              {
                icon: Shield,
                title: 'Quality Guarantee',
                description: '100% satisfaction guarantee with easy returns and replacements',
                gradient: 'from-violet-500 to-purple-500',
                bgGradient: 'from-violet-500/10 to-purple-500/10'
              },
              {
                icon: Target,
                title: 'Marketing Support',
                description: 'Co-branded materials, product samples, and promotional campaigns',
                gradient: 'from-pink-500 to-rose-500',
                bgGradient: 'from-pink-500/10 to-rose-500/10'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              <Crown className="h-4 w-4" />
              PARTNERSHIP TIERS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Growth Path</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Flexible partnership levels designed to match your business goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                tier: 'Silver Partner',
                icon: Star,
                volume: '$50K - $200K/year',
                discount: '10-15%',
                color: 'from-gray-400 to-gray-600',
                bgColor: 'from-gray-500/10 to-gray-600/10',
                features: [
                  'Standard support response',
                  'Marketing materials access',
                  'Quarterly business reviews',
                  'Product training sessions',
                  'Standard shipping rates'
                ]
              },
              {
                tier: 'Gold Partner',
                icon: Award,
                volume: '$200K - $500K/year',
                discount: '15-25%',
                color: 'from-yellow-400 to-orange-500',
                bgColor: 'from-yellow-500/10 to-orange-500/10',
                popular: true,
                features: [
                  'Priority support (4h response)',
                  'Co-marketing campaigns',
                  'Monthly business reviews',
                  'Custom packaging options',
                  'Discounted shipping rates',
                  'Dedicated account manager'
                ]
              },
              {
                tier: 'Platinum Partner',
                icon: Crown,
                volume: '$500K+/year',
                discount: 'Up to 30%',
                color: 'from-purple-400 to-pink-500',
                bgColor: 'from-purple-500/10 to-pink-500/10',
                features: [
                  'VIP support (1h response)',
                  'Exclusive territory rights',
                  'Weekly business reviews',
                  'Private labeling included',
                  'Free priority shipping',
                  'Executive account manager',
                  '90-day trade credit terms',
                  'Market intelligence reports'
                ]
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}
                <Card className={`h-full ${tier.popular ? 'border-4 border-yellow-400 shadow-2xl scale-105' : 'border-2'} hover:shadow-2xl transition-all duration-300`}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.bgColor} flex items-center justify-center mb-6 mx-auto`}>
                      <tier.icon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center mb-2">{tier.tier}</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{tier.volume}</p>
                    
                    <div className={`text-center py-4 rounded-xl bg-gradient-to-r ${tier.bgColor} mb-6`}>
                      <div className={`text-4xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                        {tier.discount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Volume Discount</div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${tier.popular ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600' : ''}`}
                      onClick={() => {
                        const formSection = document.getElementById('application-form');
                        formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="h-4 w-4" />
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Partners <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Thriving</span> Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real results from real partners who transformed their businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                company: 'Dubai Fresh Markets',
                country: '🇦🇪 United Arab Emirates',
                growth: '300% Growth',
                revenue: '$2.5M Annual Revenue',
                quote: 'Partnering with Hafa Trading transformed our business. The quality, reliability, and support are unmatched in the industry.',
                person: 'Mohammed Al-Farsi',
                role: 'CEO & Founder',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                company: 'Euro Organic Foods',
                country: '🇩🇪 Germany',
                growth: '250% Growth',
                revenue: '€2M Annual Revenue',
                quote: 'Best decision we ever made. Their premium products and dedicated support helped us dominate the European organic market.',
                person: 'Hans Mueller',
                role: 'Managing Director',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                company: 'Asia Pacific Imports',
                country: '🇸🇬 Singapore',
                growth: '400% Growth',
                revenue: '50+ Retail Locations',
                quote: 'From 1 store to 50+ locations in just 3 years. Hafa Trading has been instrumental in our rapid expansion across Asia.',
                person: 'Li Wei',
                role: 'Founder & CEO',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-2 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className={`h-2 w-full rounded-full bg-gradient-to-r ${story.gradient} mb-6`}></div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-xl mb-1">{story.company}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{story.country}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${story.gradient} bg-opacity-10`}>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent`}>
                          {story.growth}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">in 2 years</div>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${story.gradient} bg-opacity-10`}>
                        <div className="text-sm font-bold">{story.revenue}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">achieved</div>
                      </div>
                    </div>

                    <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      "{story.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                        {story.person.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold">{story.person}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{story.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Partner With Hafa Trading?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Industry-leading expertise and unmatched support for your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: '15+ Years',
                subtitle: 'Industry Experience',
                description: 'Established reputation in Ethiopian agricultural exports'
              },
              {
                icon: Users,
                title: '500+',
                subtitle: 'Farmer Partnerships',
                description: 'Direct access to quality farms and cooperatives'
              },
              {
                icon: Globe,
                title: '30+',
                subtitle: 'Countries Served',
                description: 'Global reach across 5 continents'
              },
              {
                icon: Shield,
                title: '100%',
                subtitle: 'Quality Certified',
                description: 'ISO, HACCP, and organic certifications'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-10 w-10" />
                </div>
                <div className="text-3xl font-bold mb-1">{item.title}</div>
                <div className="text-blue-100 font-semibold mb-2">{item.subtitle}</div>
                <p className="text-sm text-blue-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                <Send className="h-4 w-4" />
                START YOUR JOURNEY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Apply for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Partnership</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Fill out the form below and our partnership team will contact you within 48 hours
              </p>
            </div>

            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      Company Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name *</label>
                        <Input
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Your Company Ltd"
                          className="h-12"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Contact Person *</label>
                          <Input
                            required
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                            placeholder="John Doe"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Country *</label>
                          <Input
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="United States"
                            className="h-12"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@company.com"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <Input
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 XXX XXX XXXX"
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      Business Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Partnership Type *</label>
                        <select
                          required
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full h-12 rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="distributor">Distributor</option>
                          <option value="importer">Importer</option>
                          <option value="retailer">Retailer</option>
                          <option value="wholesaler">Wholesaler</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Products Interested In *</label>
                        <Input
                          required
                          value={formData.productsInterested}
                          onChange={(e) => setFormData({ ...formData, productsInterested: e.target.value })}
                          placeholder="e.g., Coffee, Sesame Seeds, Livestock"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Expected Annual Volume</label>
                        <Input
                          value={formData.annualVolume}
                          onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                          placeholder="e.g., $100K - $500K/year"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tell Us About Your Business</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Share your business experience, market reach, and partnership goals..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={loading} 
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Application...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Partnership Application
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    By submitting this form, you agree to our partnership terms and conditions
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
