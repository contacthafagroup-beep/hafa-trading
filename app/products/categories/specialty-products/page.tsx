'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Package, Truck, Download, Play, MapPin, Award, FileText, Phone, Mail, MessageCircle, Info, X } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SpecialtyProductsPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSampleOrderOpen, setIsSampleOrderOpen] = useState(false);
  const [selectedSamplePack, setSelectedSamplePack] = useState<string>('');

  const specialtyProducts = [
    { 
      emoji: '🍯', 
      name: 'Pure Honey', 
      desc: 'White, Red, Forest - Raw and unprocessed', 
      animation: 'pulse',
      price: '$12-20/kg',
      grade: 'Premium',
      details: {
        varieties: ['White Honey', 'Red Honey', 'Forest Honey'],
        season: 'Year-round',
        shelfLife: '24+ months',
        packaging: '500g, 1kg jars, 25kg buckets',
        origin: 'Tigray, Amhara, Oromia',
        minOrder: '500 kg',
        specifications: 'Raw, unfiltered, no additives, natural crystallization',
        benefits: ['Natural Antibacterial', 'Energy Boost', 'Antioxidants', 'Wound Healing']
      }
    },
    { 
      emoji: '☕', 
      name: 'Coffee Beans', 
      desc: 'Arabica premium grade, single origin', 
      animation: 'bounce',
      price: '$8-15/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Yirgacheffe', 'Sidamo', 'Harrar', 'Limu'],
        season: 'October - February',
        shelfLife: '12-18 months',
        packaging: '60kg jute bags, vacuum-sealed',
        origin: 'Sidama, Yirgacheffe, Harrar',
        minOrder: '1000 kg',
        specifications: 'Washed or natural process, screen size 14-18, specialty grade',
        benefits: ['Rich Flavor', 'High Caffeine', 'Antioxidants', 'Mental Alertness']
      }
    },
    { 
      emoji: '🌿', 
      name: 'Khat (Miraa)', 
      desc: 'Fresh harvest, where legally permitted', 
      animation: 'float',
      price: '$15-25/kg',
      grade: 'Premium',
      details: {
        varieties: ['Harari', 'Aweday'],
        season: 'Year-round',
        shelfLife: '24-48 hours fresh',
        packaging: 'Wrapped bundles, refrigerated',
        origin: 'Harari Region',
        minOrder: '100 kg',
        specifications: 'Fresh green leaves, harvested daily, legal export only',
        benefits: ['Stimulant', 'Social Use', 'Traditional Medicine']
      }
    },
    { 
      emoji: '🌵', 
      name: 'Aloe Vera', 
      desc: 'Fresh leaves, thick gel-rich', 
      animation: 'pulse',
      price: '$5-10/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Aloe Barbadensis Miller'],
        season: 'Year-round',
        shelfLife: '7-14 days fresh, 12 months gel',
        packaging: 'Fresh leaves or processed gel',
        origin: 'Rift Valley',
        minOrder: '500 kg',
        specifications: 'Thick leaves, high gel content, organic',
        benefits: ['Skin Health', 'Digestive Aid', 'Anti-inflammatory', 'Wound Healing']
      }
    },
    { 
      emoji: '🌿', 
      name: 'Moringa', 
      desc: 'Leaves & powder, nutrient-dense superfood', 
      animation: 'bounce',
      price: '$10-18/kg',
      grade: 'Premium',
      details: {
        varieties: ['Moringa Oleifera'],
        season: 'Year-round',
        shelfLife: '12-24 months',
        packaging: '1kg, 5kg, 25kg bags',
        origin: 'Rift Valley, Afar',
        minOrder: '300 kg',
        specifications: 'Dried leaves or fine powder, bright green, no additives',
        benefits: ['Nutrient Dense', 'Protein Rich', 'Anti-inflammatory', 'Energy Boost']
      }
    },
    { 
      emoji: '🌻', 
      name: 'Sesame Oil', 
      desc: 'Cold-pressed, pure, unrefined', 
      animation: 'spin',
      price: '$8-14/liter',
      grade: 'Premium',
      details: {
        varieties: ['White Sesame Oil', 'Black Sesame Oil'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '1L, 5L, 20L containers',
        origin: 'Humera, Tigray',
        minOrder: '500 liters',
        specifications: 'Cold-pressed, unrefined, no additives, golden color',
        benefits: ['Heart Health', 'Antioxidants', 'Skin Care', 'High Smoke Point']
      }
    },
    { 
      emoji: '🍍', 
      name: 'Dried Fruits', 
      desc: 'Mango, pineapple, banana - No added sugar', 
      animation: 'float',
      price: '$12-20/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Dried Mango', 'Dried Pineapple', 'Dried Banana'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '500g, 1kg, 5kg bags',
        origin: 'Wolaita, Arba Minch',
        minOrder: '300 kg',
        specifications: 'No added sugar, natural drying, soft texture',
        benefits: ['Natural Sweetness', 'Fiber Rich', 'Long Shelf Life', 'Portable Snack']
      }
    },
    { 
      emoji: '🌶️', 
      name: 'Dehydrated Vegetables', 
      desc: 'Garlic, ginger, onion - Long shelf life', 
      animation: 'pulse',
      price: '$10-16/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Dehydrated Garlic', 'Dehydrated Ginger', 'Dehydrated Onion'],
        season: 'Year-round',
        shelfLife: '18-24 months',
        packaging: '5kg, 10kg, 25kg bags',
        origin: 'Various regions',
        minOrder: '500 kg',
        specifications: 'Low moisture, no additives, rehydrates easily',
        benefits: ['Long Shelf Life', 'Concentrated Flavor', 'Easy Storage', 'Versatile Use']
      }
    },
    { 
      emoji: '💧', 
      name: 'Essential Oils', 
      desc: 'Rosemary, eucalyptus, basil - Therapeutic grade', 
      animation: 'bounce',
      price: '$50-150/liter',
      grade: 'Premium',
      details: {
        varieties: ['Rosemary Oil', 'Eucalyptus Oil', 'Basil Oil'],
        season: 'Year-round',
        shelfLife: '24-36 months',
        packaging: '100ml, 500ml, 1L bottles',
        origin: 'Ethiopian Highlands',
        minOrder: '50 liters',
        specifications: 'Steam distilled, 100% pure, therapeutic grade',
        benefits: ['Aromatherapy', 'Medicinal Use', 'Cosmetic Grade', 'High Potency']
      }
    },
    { 
      emoji: '🍵', 
      name: 'Herbal Tea Mixes', 
      desc: 'Traditional Ethiopian recipes', 
      animation: 'float',
      price: '$8-15/kg',
      grade: 'Premium',
      details: {
        varieties: ['Ginger Tea', 'Moringa Tea', 'Mixed Herbal Blends'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '100g, 500g, 1kg bags',
        origin: 'Various regions',
        minOrder: '200 kg',
        specifications: 'Dried herbs, no additives, traditional recipes',
        benefits: ['Digestive Health', 'Immune Support', 'Relaxation', 'Antioxidants']
      }
    }
  ];

  // Admin can replace these with actual video URLs (YouTube, Vimeo, or direct video links)
  const videos = [
    { 
      title: 'Sorting & Packing Process', 
      desc: 'See how we sort and pack vegetables', 
      thumbnail: '🎥',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Farm Harvesting', 
      desc: 'Fresh from Ethiopian farms', 
      thumbnail: '🌾',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Quality Control', 
      desc: 'Our rigorous inspection process', 
      thumbnail: '✅',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Cold Chain Transport', 
      desc: 'Temperature-controlled delivery', 
      thumbnail: '❄️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    }
  ];

  const certifications = [
    { icon: '🔒', name: 'ISO Certified', desc: 'International standards' },
    { icon: '🌿', name: 'Organic', desc: 'Chemical-free farming' },
    { icon: '📜', name: 'Phytosanitary', desc: 'Plant health certified' },
    { icon: '🧪', name: 'Lab Tested', desc: 'Quality assured' },
    { icon: '🏅', name: 'Export License', desc: 'Authorized exporter' }
  ];

  const originRegions = [
    { 
      name: 'Upper Rift Valley', 
      product: 'Tomatoes', 
      coordinates: '8.0°N, 38.7°E', 
      lat: 8.0, 
      lng: 38.7, 
      color: '#ef4444',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.7!3d8.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDAnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Arsi & Bale', 
      product: 'Potatoes', 
      coordinates: '7.5°N, 39.5°E', 
      lat: 7.5, 
      lng: 39.5, 
      color: '#f59e0b',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d39.5!3d7.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJOIDM5wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Wollo', 
      product: 'Red Onions', 
      coordinates: '11.0°N, 39.5°E', 
      lat: 11.0, 
      lng: 39.5, 
      color: '#8b5cf6',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d39.5!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiAzOcKwMzAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Afar', 
      product: 'White Onions', 
      coordinates: '11.5°N, 41.0°E', 
      lat: 11.5, 
      lng: 41.0, 
      color: '#06b6d4',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d41.0!3d11.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMwJzAwLjAiTiA0McKwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Jimma', 
      product: 'Cabbage & Leafy Vegetables', 
      coordinates: '7.7°N, 36.8°E', 
      lat: 7.7, 
      lng: 36.8, 
      color: '#10b981',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d36.8!3d7.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInMDAuMCJOIDM2wrA0OCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    }
  ];

  const downloadables = [
    { icon: '📄', name: 'Vegetable Catalog PDF', size: '2.5 MB' },
    { icon: '💰', name: 'Price List', size: '850 KB' },
    { icon: '📋', name: 'Certification Documents', size: '1.2 MB' },
    { icon: '📦', name: 'Packaging Samples', size: '3.1 MB' }
  ];

  const carouselImages = [
    { title: 'Fresh Crates', emoji: '📦' },
    { title: 'Farm Harvest', emoji: '🌾' },
    { title: 'Washing Station', emoji: '💧' },
    { title: 'Quality Check', emoji: '✅' },
    { title: 'Container Loading', emoji: '🚚' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-900 text-white py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Product Icons */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          {['🍯', '☕', '🌿', '🌵', '🌻', '🍍', '🌶️', '💧', '🍵'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-7xl"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
              style={{ left: `${i * 11}%`, top: `${(i * 13) % 80}%` }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-white hover:bg-white/20 border border-white/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="text-7xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                <motion.div
                  className="text-6xl"
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium Ethiopian
                <span className="block text-yellow-200">Specialty Products</span>
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {['Unique', 'High-Value', 'Ethiopian Origin'].map((tag, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-semibold border border-white/30"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <p className="text-xl md:text-2xl text-yellow-50 leading-relaxed mb-8">
                Ethiopia is home to rare and valuable agricultural products. We supply high-demand specialty items 
                that showcase the unique biodiversity and agricultural heritage of Ethiopia—from premium honey to 
                therapeutic essential oils.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/rfq">
                  <Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-50 shadow-xl">
                    <FileText className="mr-2 h-5 w-5" />
                    Request Quote
                  </Button>
                </Link>
                <Link href="https://wa.me/251954742383">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm">
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-yellow-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">Export Ready</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Product Showcase Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: '🍯', title: 'Pure Honey', desc: 'Raw & unprocessed', color: 'from-amber-500 to-yellow-500' },
                { icon: '☕', title: 'Coffee Beans', desc: 'Specialty grade', color: 'from-orange-600 to-red-600' },
                { icon: '🌿', title: 'Moringa', desc: 'Superfood powder', color: 'from-green-500 to-emerald-500' },
                { icon: '💧', title: 'Essential Oils', desc: 'Therapeutic grade', color: 'from-blue-500 to-cyan-500' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="group"
                >
                  <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all shadow-xl h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div 
                        className="text-6xl mb-3"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className={`h-1 bg-gradient-to-r ${item.color} rounded-full mb-3 mx-auto w-12 group-hover:w-full transition-all`}></div>
                      <h3 className="font-bold text-lg mb-1 text-white">{item.title}</h3>
                      <p className="text-sm text-yellow-100">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-yellow-700 to-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10+', label: 'Specialty Products', icon: '⭐' },
              { number: '20+', label: 'Export Countries', icon: '🌍' },
              { number: '100%', label: 'Natural & Pure', icon: '✨' },
              { number: '50+', label: 'Tons Monthly', icon: '📦' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="text-5xl mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-yellow-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Specialty Products */}
      <section className="py-20 bg-gradient-to-br from-white via-yellow-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['⭐', '✨', '🏆', '💎', '🌟', '💫'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
              style={{ left: `${10 + i * 15}%`, top: `${(i * 20) % 70}%` }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.span
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <motion.span
                className="text-5xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                💎
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Why Choose Our Specialty Products?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exceptional quality, authentic Ethiopian origin, and unbeatable value
            </p>
          </motion.div>

          {/* Main Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🌿',
                title: 'Authentic Ethiopian Origin',
                desc: 'Sourced directly from traditional producers and farms across Ethiopia',
                features: ['Direct farm partnerships', 'Traditional methods', 'Traceable origin', 'Cultural heritage'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '🔬',
                title: 'Lab Tested Quality',
                desc: 'Every batch tested for purity, potency, and safety standards',
                features: ['99%+ purity', 'ISO certified labs', 'Zero contaminants', 'Quality certificates'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🏆',
                title: 'Premium Grade Only',
                desc: 'Only the highest quality products selected for export',
                features: ['Grade A selection', 'Expert sorting', 'Quality inspection', 'Export standards'],
                color: 'from-orange-500 to-amber-500'
              },
              {
                icon: '📦',
                title: 'Professional Packaging',
                desc: 'Food-grade, moisture-proof, and tamper-evident packaging',
                features: ['Food-grade materials', 'Moisture control', 'Tamper-evident seals', 'Custom branding'],
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🌍',
                title: 'Global Export Experience',
                desc: 'Successfully shipping to 20+ countries worldwide',
                features: ['20+ countries', 'Reliable logistics', 'Export documentation', 'Customs support'],
                color: 'from-indigo-500 to-blue-500'
              },
              {
                icon: '💰',
                title: 'Competitive Pricing',
                desc: '30-50% lower costs compared to other suppliers',
                features: ['Direct sourcing', 'No middlemen', 'Volume discounts', 'Best value'],
                color: 'from-red-500 to-rose-500'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="h-full bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-2xl hover:border-yellow-400 transition-all overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                  <CardContent className="p-6">
                    <motion.div
                      className="text-6xl mb-4 text-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3 className="font-bold text-xl mb-3 text-yellow-700 dark:text-yellow-400 text-center">{benefit.title}</h3>
                    <p className="text-muted-foreground text-center mb-4 text-sm">{benefit.desc}</p>
                    <div className="space-y-2">
                      {benefit.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Unique Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                🌟
              </motion.span>
              Ethiopia's Unique Advantages
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🍯',
                  title: 'World-Class Honey',
                  stat: '#4',
                  label: 'Global Producer',
                  desc: 'Ethiopia produces some of the world\'s finest honey varieties'
                },
                {
                  icon: '☕',
                  title: 'Coffee Birthplace',
                  stat: '100%',
                  label: 'Pure Arabica',
                  desc: 'Origin of Arabica coffee with unique flavor profiles'
                },
                {
                  icon: '🌿',
                  title: 'Biodiversity Hotspot',
                  stat: '6,000+',
                  label: 'Plant Species',
                  desc: 'Rich in medicinal plants found nowhere else'
                },
                {
                  icon: '🏔️',
                  title: 'Highland Climate',
                  stat: '2,500m',
                  label: 'Avg. Altitude',
                  desc: 'Perfect growing conditions for specialty crops'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-3"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">{item.title}</h4>
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg p-3 mb-3 border border-yellow-200 dark:border-yellow-800">
                        <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">{item.stat}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Competitive Pricing Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                💰
              </motion.span>
              Unbeatable Pricing vs Other Origins
            </h3>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Save 30-50% compared to other suppliers while getting superior quality
            </p>

            {/* Price Comparison Table */}
            <Card className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 mb-8 max-w-5xl mx-auto">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
                  Real Price Comparison (Per Kg)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-blue-200 dark:border-blue-800">
                        <th className="text-left p-3 font-bold">Product</th>
                        <th className="text-center p-3 font-bold text-red-600">🇪🇺 Europe</th>
                        <th className="text-center p-3 font-bold text-orange-600">🌏 Asia</th>
                        <th className="text-center p-3 font-bold text-green-600">🇪🇹 Ethiopia</th>
                        <th className="text-center p-3 font-bold text-yellow-600">💰 Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { product: '🍯 Pure Honey', europe: '$28-35', asia: '$22-28', ethiopia: '$12-20', savings: '40-60%' },
                        { product: '☕ Coffee Beans', europe: '$18-25', asia: '$12-18', ethiopia: '$8-15', savings: '35-55%' },
                        { product: '🌿 Moringa Powder', europe: '$22-30', asia: '$15-22', ethiopia: '$10-18', savings: '30-45%' },
                        { product: '💧 Essential Oils', europe: '$180-250', asia: '$120-180', ethiopia: '$50-150', savings: '40-70%' }
                      ].map((row, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-colors"
                        >
                          <td className="p-3 font-semibold">{row.product}</td>
                          <td className="p-3 text-center text-red-600">{row.europe}</td>
                          <td className="p-3 text-center text-orange-600">{row.asia}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{row.ethiopia}</td>
                          <td className="p-3 text-center">
                            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full font-bold text-sm">
                              {row.savings}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  * Prices are approximate and vary based on quantity, quality grade, and market conditions
                </p>
              </CardContent>
            </Card>

            {/* Regional Comparison Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'vs. European Suppliers',
                  savings: '35-45%',
                  icon: '🇪🇺',
                  benefits: ['Lower production costs', 'No middlemen markup', 'Traditional methods', 'Authentic products', 'Direct from source']
                },
                {
                  title: 'vs. Asian Suppliers',
                  savings: '20-30%',
                  icon: '🌏',
                  benefits: ['Better quality standards', 'Unique varieties', 'Organic practices', 'Stricter testing', 'Premium grades']
                },
                {
                  title: 'vs. American Suppliers',
                  savings: '30-40%',
                  icon: '🌎',
                  benefits: ['Significantly lower costs', 'Rare varieties', 'Direct sourcing', 'No import markups', 'Bulk discounts']
                }
              ].map((comparison, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl hover:border-purple-400 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {comparison.icon}
                      </motion.div>
                      <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">{comparison.title}</h4>
                      <div className="text-4xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">{comparison.savings}</div>
                      <div className="text-xs text-muted-foreground mb-4">Average Cost Savings</div>
                      <div className="space-y-2">
                        {comparison.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-yellow-600 flex-shrink-0" />
                            <span className="text-muted-foreground text-left">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product-Specific Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🌟
              </motion.span>
              Product-Specific Advantages
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: '🍯',
                  title: 'Ethiopian Honey',
                  advantages: [
                    'Diverse floral sources from highland forests',
                    'No industrial pollution or pesticides',
                    'Traditional harvesting preserves enzymes',
                    'Unique varieties: White, Red, Forest honey',
                    'High antibacterial properties',
                    'Raw and unprocessed for maximum benefits'
                  ],
                  color: 'from-amber-500 to-yellow-500'
                },
                {
                  icon: '☕',
                  title: 'Ethiopian Coffee',
                  advantages: [
                    'Birthplace of Arabica coffee',
                    'Wild coffee forests with heirloom varieties',
                    'Unique flavor profiles: fruity, floral, wine-like',
                    'High altitude (1,500-2,200m) for quality',
                    'Natural and washed processing methods',
                    'Specialty grade scoring 85+ points'
                  ],
                  color: 'from-orange-500 to-red-500'
                },
                {
                  icon: '🌿',
                  title: 'Moringa & Herbs',
                  advantages: [
                    'Nutrient-dense superfood with 90+ nutrients',
                    'Grown in mineral-rich volcanic soil',
                    'Sun-dried to preserve nutrients',
                    'No chemical fertilizers or pesticides',
                    'Higher protein content than competitors',
                    'Traditional medicinal knowledge'
                  ],
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: '💧',
                  title: 'Essential Oils',
                  advantages: [
                    'Steam distilled from wild-grown plants',
                    'High concentration and purity',
                    'Therapeutic grade quality',
                    'Unique Ethiopian plant varieties',
                    'Sustainable wild harvesting',
                    'No synthetic additives or dilution'
                  ],
                  color: 'from-blue-500 to-indigo-500'
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-2xl transition-all overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="text-5xl"
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {product.icon}
                        </motion.div>
                        <h4 className="font-bold text-xl text-yellow-700 dark:text-yellow-400">{product.title}</h4>
                      </div>
                      <div className="space-y-2">
                        {product.advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Traditional Heritage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🏛️
              </motion.span>
              Ancient Traditional Heritage
              <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                📜
              </motion.span>
            </h3>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Thousands of years of traditional knowledge and practices ensure authentic, time-tested quality
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: '🍯',
                  title: 'Ancient Beekeeping',
                  points: ['3,000+ years of tradition', 'Traditional hive methods', 'Wild forest honey', 'Unique flavor profiles']
                },
                {
                  icon: '☕',
                  title: 'Coffee Origin',
                  points: ['Birthplace of coffee', 'Wild coffee forests', 'Heirloom varieties', 'Ceremonial traditions']
                },
                {
                  icon: '🌿',
                  title: 'Herbal Medicine',
                  points: ['Ancient healing knowledge', 'Indigenous plant species', 'Traditional processing', 'Proven effectiveness']
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-800 hover:shadow-2xl hover:border-amber-400 transition-all">
                    <CardContent className="p-6">
                      <motion.div
                        className="text-5xl mb-4 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-4 text-center text-amber-700 dark:text-amber-400">{item.title}</h4>
                      <div className="space-y-2">
                        {item.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quality Guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-10 text-center relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.span
                      className="text-6xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🏅
                    </motion.span>
                    <h3 className="text-3xl md:text-4xl font-bold">100% Quality Guarantee</h3>
                    <motion.span
                      className="text-6xl"
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </div>
                  <p className="text-xl text-yellow-50 mb-6">
                    If any product doesn't meet our strict quality standards, we'll replace it or provide a full refund—no questions asked
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                      <span className="font-bold">✓ Money-Back Guarantee</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                      <span className="font-bold">✓ Free Replacement</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                      <span className="font-bold">✓ Quality Certified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Product Icons Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Our Specialty Products</h2>
            <p className="text-lg text-muted-foreground">Rare and valuable items from Ethiopia</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specialtyProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: product.animation === 'spin' ? 360 : 0 }}
              >
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-yellow-100 dark:border-yellow-900 cursor-pointer group relative overflow-hidden"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  {/* Grade Badge - Top Right */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.grade}
                    </div>
                  </div>

                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="text-6xl mb-3"
                      animate={
                        product.animation === 'bounce' ? { y: [0, -10, 0] } :
                        product.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                        product.animation === 'float' ? { y: [0, -5, 0] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {product.emoji}
                    </motion.div>
                    <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {product.desc}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-4xl">{selectedProduct?.emoji}</span>
              {selectedProduct?.name}
              <span className="ml-auto bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                {selectedProduct?.grade}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {/* Price and Basic Info */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg p-6 border-2 border-yellow-200 dark:border-yellow-800">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                    <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">{selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minimum Order</p>
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{selectedProduct.details.minOrder}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-yellow-700 dark:text-yellow-400">Description</h3>
                <p className="text-muted-foreground">{selectedProduct.desc}</p>
              </div>

              {/* Varieties */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Available Varieties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.details.varieties.map((variety: string, idx: number) => (
                    <span key={idx} className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                      {variety}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground mb-1">Season</p>
                  <p className="font-semibold">{selectedProduct.details.season}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground mb-1">Shelf Life</p>
                  <p className="font-semibold">{selectedProduct.details.shelfLife}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground mb-1">Packaging</p>
                  <p className="font-semibold">{selectedProduct.details.packaging}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-muted-foreground mb-1">Origin</p>
                  <p className="font-semibold">{selectedProduct.details.origin}</p>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-yellow-700 dark:text-yellow-400">Specifications</h3>
                <p className="text-muted-foreground">{selectedProduct.details.specifications}</p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Health Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProduct.details.benefits.map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Link href="/rfq" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                </Link>
                <Link href="https://wa.me/251954742383" className="flex-1">
                  <Button variant="outline" className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Sample Packs Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['📦', '✨', '🎁', '⭐', '🌟', '💫'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
              style={{ left: `${10 + i * 15}%`, top: `${(i * 20) % 70}%` }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.span
                className="text-7xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎁
              </motion.span>
              <motion.span
                className="text-6xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📦
              </motion.span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Order Sample Packs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Try before you buy! Get premium samples delivered to test quality before placing bulk orders
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', icon: '📋', title: 'Choose Pack', desc: 'Select your sample pack' },
                { step: '2', icon: '💳', title: 'Pay & Order', desc: 'Secure payment processing' },
                { step: '3', icon: '📦', title: 'We Ship', desc: 'Samples sent via express courier' },
                { step: '4', icon: '✅', title: 'Evaluate', desc: 'Test quality & place bulk order' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <motion.div
                        className="text-5xl mb-3"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sample Pack Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10">Available Sample Packs</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter Pack',
                  price: '$99',
                  icon: '📦',
                  items: ['3 Products', '250g each', 'Express shipping', 'Quality certificates'],
                  popular: false,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  name: 'Professional Pack',
                  price: '$249',
                  icon: '🎁',
                  items: ['6 Products', '500g each', 'Priority shipping', 'Quality certificates', 'Product samples', 'Price list'],
                  popular: true,
                  color: 'from-indigo-500 to-purple-500'
                },
                {
                  name: 'Premium Pack',
                  price: '$499',
                  icon: '⭐',
                  items: ['10 Products', '1kg each', 'Express priority', 'Quality certificates', 'Full documentation', 'Price list', 'Bulk order discount'],
                  popular: false,
                  color: 'from-amber-500 to-yellow-500'
                }
              ].map((pack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="relative"
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <Card className={`h-full ${pack.popular ? 'border-4 border-yellow-400 dark:border-yellow-600' : 'border-2 border-blue-200 dark:border-blue-800'} hover:shadow-2xl transition-all overflow-hidden`}>
                    <div className={`h-2 bg-gradient-to-r ${pack.color}`}></div>
                    <CardContent className="p-8">
                      <motion.div
                        className="text-6xl mb-4 text-center"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {pack.icon}
                      </motion.div>
                      <h4 className="text-2xl font-bold text-center mb-2">{pack.name}</h4>
                      <div className="text-center mb-6">
                        <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">{pack.price}</span>
                        <span className="text-muted-foreground"> / pack</span>
                      </div>
                      <div className="space-y-3 mb-6">
                        {pack.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={`w-full ${pack.popular ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
                        onClick={() => {
                          setSelectedSamplePack(pack.name);
                          setIsSampleOrderOpen(true);
                        }}
                      >
                        Order Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10">What's Included in Every Pack</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h4 className="font-bold text-xl mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                    <span className="text-3xl">📦</span>
                    Sample Products
                  </h4>
                  <div className="space-y-3">
                    {['Hand-selected premium grade', 'Properly sealed & labeled', 'Temperature controlled shipping', 'Production date included', 'Storage instructions'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <h4 className="font-bold text-xl mb-4 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <span className="text-3xl">📄</span>
                    Documentation
                  </h4>
                  <div className="space-y-3">
                    {['Product specifications sheet', 'Quality test results', 'Pricing information', 'Bulk order form', 'Company profile'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="p-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span
                    className="text-6xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎁
                  </motion.span>
                  <h3 className="text-3xl md:text-4xl font-bold">Ready to Try Our Premium Products?</h3>
                  <motion.span
                    className="text-6xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    ✨
                  </motion.span>
                </div>
                <p className="text-xl text-blue-100 mb-8">
                  Order a sample pack today and experience the quality yourself!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      <Mail className="mr-2 h-5 w-5" />
                      Request Sample
                    </Button>
                  </Link>
                  <Link href="https://wa.me/251954742383">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sample Order Dialog */}
      <Dialog open={isSampleOrderOpen} onOpenChange={setIsSampleOrderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">📦</span>
              Order Sample Pack
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission - you can integrate with your backend here
            alert('Sample order submitted! We will contact you shortly.');
            setIsSampleOrderOpen(false);
          }}>
            {/* Selected Pack */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-muted-foreground mb-1">Selected Pack</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{selectedSamplePack}</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" required placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input id="company" required placeholder="Your Company Ltd" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required placeholder="john@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="ae">UAE</SelectItem>
                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Shipping Address</h3>
              
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" required placeholder="123 Main Street" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="NY" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP/Postal Code *</Label>
                  <Input id="zip" required placeholder="10001" />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="message">Additional Notes (Optional)</Label>
              <Textarea 
                id="message" 
                placeholder="Any specific requirements or questions about the sample pack..."
                rows={4}
              />
            </div>

            {/* Products of Interest */}
            <div>
              <Label>Products of Interest (Optional)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Honey', 'Coffee', 'Moringa', 'Essential Oils', 'Sesame Oil', 'Dried Fruits'].map((product) => (
                  <label key={product} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>{product}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I agree to the terms and conditions. Sample packs are non-refundable. Shipping costs may apply based on destination. *
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Package className="mr-2 h-4 w-4" />
                Submit Order
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsSampleOrderOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Admin Video Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎥 See Our Process</h2>
            <p className="text-lg text-muted-foreground">Watch how we ensure quality from farm to export</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Main Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={videos[activeVideo].videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{videos[activeVideo].title}</h3>
                    <p className="text-muted-foreground">{videos[activeVideo].desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveVideo(index)}
                >
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-yellow-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-yellow-600">
                        <Play className="h-4 w-4" />
                        <span className="text-xs">Play</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📸 Our Facilities</h2>
            <p className="text-lg text-muted-foreground">From farm to container</p>
          </motion.div>

          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 snap-center"
              >
                <Card className="hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-7xl mb-4">{image.emoji}</div>
                    <h3 className="font-bold">{image.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🏆 Certifications & Standards</h2>
            <p className="text-lg text-muted-foreground">Internationally recognized quality</p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="p-6">
                    <motion.div 
                      className="text-5xl mb-3"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {cert.icon}
                    </motion.div>
                    <h3 className="font-bold mb-1">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">{cert.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Map */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <MapPin className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's best agricultural zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-yellow-50 dark:bg-yellow-950 rounded-2xl p-4 md:p-8 mb-8"
            >
              <motion.div 
                className="aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800"
                key={selectedRegion ?? 'default'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <iframe
                  src={selectedRegion !== null ? originRegions[selectedRegion].mapUrl : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032506.8190193195!2d36.89!3d9.145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1635d0cedd6cfd2b%3A0x7bf6a67f5348c55a!2sEthiopia!5e0!3m2!1sen!2s!4v1234567890"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </motion.div>
              <p className="text-center mt-4 text-sm text-muted-foreground">
                {selectedRegion !== null 
                  ? `📍 Showing ${originRegions[selectedRegion].name} - ${originRegions[selectedRegion].product}` 
                  : '📍 Click on region cards below to zoom into specific locations'}
              </p>
              
              {/* Interactive Region Cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
                {originRegions.map((region, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedRegion === index 
                        ? 'ring-2 ring-yellow-600 shadow-xl scale-105' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <Card className="h-full">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <motion.div 
                            className="text-3xl"
                            animate={selectedRegion === index ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            📍
                          </motion.div>
                          <div className="flex-1">
                            <p className="font-bold text-sm mb-1">{region.name}</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-1">
                              {region.product}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">{region.coordinates}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              {selectedRegion === index ? '✓ Showing on map above' : '👆 Click to view on map'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {originRegions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold mb-1">{region.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{region.product}</p>
                          <p className="text-xs text-muted-foreground">{region.coordinates}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📥 Download Resources</h2>
            <p className="text-lg text-muted-foreground">Get detailed information about our products</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {downloadables.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-yellow-100 dark:border-yellow-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3">{file.icon}</div>
                    <h3 className="font-bold mb-2">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{file.size}</p>
                    <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Import Premium Ethiopian Vegetables?
          </h2>
          <p className="text-xl mb-8 text-yellow-100">
            Contact us today for quotes, samples, and partnership opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-yellow-50">
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-yellow-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-yellow-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-yellow-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
