'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, CheckCircle, Package, Play, MapPin, Award, Download, Phone, Mail, MessageCircle, FileText, Info, Leaf, ThermometerSnowflake, Calendar, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState } from 'react';

export default function HerbsSpicesPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const freshHerbs = [
    { 
      name: 'Fresh Rosemary', 
      emoji: '🌿', 
      animation: 'float', 
      color: 'from-green-400 to-emerald-600',
      desc: 'Aromatic needles, high essential oil content',
      price: '$12-18/kg',
      grade: 'Premium',
      details: {
        varieties: ['Common Rosemary', 'Tuscan Blue'],
        season: 'Year-round',
        shelfLife: '7-10 days fresh, 6 months dried',
        packaging: '500g, 1kg bundles or cartons',
        origin: 'Ethiopian Highlands',
        minOrder: '100 kg',
        specifications: 'Fresh green needles, strong aroma, no wilting',
        benefits: ['Improves Memory', 'Anti-inflammatory', 'Antioxidant Rich', 'Digestive Aid']
      }
    },
    { 
      name: 'Basil', 
      emoji: '🍃', 
      animation: 'bounce', 
      color: 'from-lime-400 to-green-600',
      desc: 'Sweet basil, fresh and aromatic',
      price: '$10-15/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Sweet Basil', 'Thai Basil', 'Holy Basil'],
        season: 'Year-round',
        shelfLife: '5-7 days fresh, 3 months dried',
        packaging: '250g, 500g bundles',
        origin: 'Central Ethiopia',
        minOrder: '50 kg',
        specifications: 'Bright green leaves, strong aroma, no bruising',
        benefits: ['Anti-bacterial', 'Rich in Vitamin K', 'Stress Relief', 'Anti-inflammatory']
      }
    },
    { 
      name: 'Mint', 
      emoji: '🌱', 
      animation: 'pulse', 
      color: 'from-teal-400 to-cyan-600',
      desc: 'Fresh peppermint and spearmint varieties',
      price: '$8-12/kg',
      grade: 'Premium',
      details: {
        varieties: ['Peppermint', 'Spearmint'],
        season: 'Year-round',
        shelfLife: '5-7 days fresh, 6 months dried',
        packaging: '500g, 1kg bundles',
        origin: 'Jimma Region',
        minOrder: '100 kg',
        specifications: 'Fresh green leaves, strong menthol aroma',
        benefits: ['Digestive Health', 'Fresh Breath', 'Headache Relief', 'Respiratory Support']
      }
    },
    { 
      name: 'Thyme', 
      emoji: '🌾', 
      animation: 'float', 
      color: 'from-green-500 to-emerald-700',
      desc: 'Aromatic herb, culinary and medicinal',
      price: '$14-20/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Common Thyme', 'Lemon Thyme'],
        season: 'Year-round',
        shelfLife: '10-14 days fresh, 12 months dried',
        packaging: '500g, 1kg bundles',
        origin: 'Ethiopian Highlands',
        minOrder: '50 kg',
        specifications: 'Small green leaves, strong herbal aroma',
        benefits: ['Antibacterial', 'Cough Relief', 'Immune Boost', 'Antioxidants']
      }
    },
    { 
      name: 'Oregano', 
      emoji: '🍀', 
      animation: 'bounce', 
      color: 'from-lime-500 to-green-700',
      desc: 'Mediterranean herb, intense flavor',
      price: '$12-16/kg',
      grade: 'Premium',
      details: {
        varieties: ['Greek Oregano', 'Italian Oregano'],
        season: 'Year-round',
        shelfLife: '7-10 days fresh, 12 months dried',
        packaging: '500g, 1kg bundles',
        origin: 'Sidama Region',
        minOrder: '50 kg',
        specifications: 'Dark green leaves, pungent aroma',
        benefits: ['Antioxidant Rich', 'Anti-inflammatory', 'Antibacterial', 'Digestive Aid']
      }
    },
    { 
      name: 'Parsley & Coriander', 
      emoji: '🌿', 
      animation: 'pulse', 
      color: 'from-emerald-400 to-green-600',
      desc: 'Fresh leafy herbs for garnish and cooking',
      price: '$6-10/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Flat Leaf Parsley', 'Curly Parsley', 'Fresh Coriander'],
        season: 'Year-round',
        shelfLife: '5-7 days fresh, 3 months dried',
        packaging: '500g, 1kg bundles',
        origin: 'Central Ethiopia',
        minOrder: '100 kg',
        specifications: 'Bright green, fresh, no yellowing',
        benefits: ['Rich in Vitamin C', 'Detoxifying', 'Bone Health', 'Heart Health']
      }
    }
  ];        

  const drySpices = [
    { 
      name: 'Black Cumin', 
      desc: 'Tikur Azmud - Premium Ethiopian variety', 
      emoji: '⚫', 
      animation: 'spin', 
      color: 'from-gray-700 to-gray-900',
      price: '$15-22/kg',
      grade: 'Premium',
      details: {
        varieties: ['Tikur Azmud (Ethiopian Black Cumin)'],
        season: 'October - December',
        shelfLife: '18-24 months',
        packaging: '5kg, 10kg, 25kg bags',
        origin: 'Kafa & Jimma Regions',
        minOrder: '500 kg',
        specifications: 'Small black seeds, strong aroma, 99% purity',
        benefits: ['Immune Boost', 'Anti-inflammatory', 'Digestive Health', 'Antioxidant Rich']
      }
    },
    { 
      name: 'Turmeric', 
      desc: 'Whole rhizomes or powder - Bright yellow', 
      emoji: '🟡', 
      animation: 'pulse', 
      color: 'from-yellow-400 to-amber-600',
      price: '$8-14/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Whole Rhizomes', 'Fine Powder'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '10kg, 25kg bags',
        origin: 'Jimma Region',
        minOrder: '1000 kg',
        specifications: 'Bright yellow color, high curcumin content, no additives',
        benefits: ['Anti-inflammatory', 'Antioxidant', 'Joint Health', 'Immune Support']
      }
    },
    { 
      name: 'Ginger', 
      desc: 'Dried slices or powder - High potency', 
      emoji: '🫚', 
      animation: 'bounce', 
      color: 'from-amber-400 to-orange-600',
      price: '$10-16/kg',
      grade: 'Premium',
      details: {
        varieties: ['Dried Slices', 'Fine Powder'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '10kg, 25kg bags',
        origin: 'Jimma & Sidama',
        minOrder: '500 kg',
        specifications: 'Strong aroma, high gingerol content, clean and dry',
        benefits: ['Digestive Aid', 'Anti-nausea', 'Anti-inflammatory', 'Immune Boost']
      }
    },
    { 
      name: 'Cardamom', 
      desc: 'Green pods - Aromatic and premium', 
      emoji: '🟢', 
      animation: 'float', 
      color: 'from-green-400 to-emerald-600',
      price: '$25-35/kg',
      grade: 'Premium',
      details: {
        varieties: ['Green Cardamom Pods', 'Seeds'],
        season: 'October - February',
        shelfLife: '12-18 months',
        packaging: '5kg, 10kg cartons',
        origin: 'Kafa Region',
        minOrder: '200 kg',
        specifications: 'Green pods, strong aroma, 8-10mm size',
        benefits: ['Digestive Health', 'Fresh Breath', 'Antioxidant', 'Blood Pressure']
      }
    },
    { 
      name: 'Black Pepper', 
      desc: 'Whole peppercorns - Bold flavor', 
      emoji: '⚫', 
      animation: 'spin', 
      color: 'from-gray-800 to-black',
      price: '$12-18/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Whole Peppercorns', 'Cracked', 'Ground'],
        season: 'Year-round',
        shelfLife: '24 months',
        packaging: '10kg, 25kg bags',
        origin: 'Southern Ethiopia',
        minOrder: '500 kg',
        specifications: 'Black, wrinkled, strong pungency',
        benefits: ['Digestive Aid', 'Antioxidant', 'Anti-inflammatory', 'Nutrient Absorption']
      }
    },
    { 
      name: 'Fenugreek', 
      desc: 'Seeds - Rich flavor and aroma', 
      emoji: '🟤', 
      animation: 'pulse', 
      color: 'from-amber-600 to-brown-700',
      price: '$6-10/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Whole Seeds', 'Ground Powder'],
        season: 'Year-round',
        shelfLife: '18-24 months',
        packaging: '10kg, 25kg bags',
        origin: 'Tigray & Amhara Regions',
        minOrder: '1000 kg',
        specifications: 'Golden brown seeds, strong aroma, clean',
        benefits: ['Blood Sugar Control', 'Digestive Health', 'Lactation Support', 'Anti-inflammatory']
      }
    },
    { 
      name: 'Cloves', 
      desc: 'Whole cloves - Intense aroma', 
      emoji: '🟤', 
      animation: 'bounce', 
      color: 'from-orange-700 to-red-900',
      price: '$18-28/kg',
      grade: 'Premium',
      details: {
        varieties: ['Whole Cloves', 'Ground'],
        season: 'Year-round',
        shelfLife: '24 months',
        packaging: '5kg, 10kg bags',
        origin: 'Sidama Region',
        minOrder: '200 kg',
        specifications: 'Dark brown, nail-shaped, strong aroma',
        benefits: ['Dental Health', 'Antioxidant', 'Anti-inflammatory', 'Digestive Aid']
      }
    },
    { 
      name: 'Cinnamon', 
      desc: 'Sticks or powder - Sweet aromatic spice', 
      emoji: '🟫', 
      animation: 'float', 
      color: 'from-orange-600 to-amber-800',
      price: '$14-22/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Cinnamon Sticks', 'Fine Powder'],
        season: 'Year-round',
        shelfLife: '18-24 months',
        packaging: '5kg, 10kg, 25kg bags',
        origin: 'Sidama & Kafa',
        minOrder: '300 kg',
        specifications: 'Sweet aroma, reddish-brown color, high oil content',
        benefits: ['Blood Sugar Control', 'Anti-inflammatory', 'Heart Health', 'Antioxidant']
      }
    },
    { 
      name: 'Bay Leaves', 
      desc: 'Dried leaves - Culinary essential', 
      emoji: '🍂', 
      animation: 'spin', 
      color: 'from-green-600 to-olive-700',
      price: '$8-12/kg',
      grade: 'Grade A',
      details: {
        varieties: ['Whole Dried Leaves', 'Crushed'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '5kg, 10kg bags',
        origin: 'Ethiopian Highlands',
        minOrder: '200 kg',
        specifications: 'Green-brown color, intact leaves, aromatic',
        benefits: ['Digestive Health', 'Anti-inflammatory', 'Respiratory Support', 'Antioxidant']
      }
    },
    { 
      name: 'Chili Powder & Paprika', 
      desc: 'Various heat levels - Vibrant color', 
      emoji: '🌶️', 
      animation: 'pulse', 
      color: 'from-red-500 to-red-700',
      price: '$10-18/kg',
      grade: 'Premium',
      details: {
        varieties: ['Mild Paprika', 'Hot Chili Powder', 'Berbere Blend'],
        season: 'Year-round',
        shelfLife: '12-18 months',
        packaging: '10kg, 25kg bags',
        origin: 'Rift Valley',
        minOrder: '500 kg',
        specifications: 'Bright red color, fine powder, no additives',
        benefits: ['Metabolism Boost', 'Pain Relief', 'Rich in Vitamin C', 'Antioxidant']
      }
    }
  ];

  const videos = [
    { 
      title: 'Herb Harvesting', 
      desc: 'Fresh picking at peak aroma', 
      thumbnail: '🌿',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Drying Process', 
      desc: 'Traditional sun-drying methods', 
      thumbnail: '☀️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Grinding & Packaging', 
      desc: 'From whole spice to powder', 
      thumbnail: '⚙️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Quality Control', 
      desc: 'Aroma and purity testing', 
      thumbnail: '🧪',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const certifications = [
    { icon: '🔒', name: 'ISO Certified', desc: 'Quality standards' },
    { icon: '🌿', name: 'Organic', desc: 'Chemical-free' },
    { icon: '📜', name: 'Phytosanitary', desc: 'Plant health' },
    { icon: '🧪', name: 'Lab Tested', desc: 'Purity verified' },
    { icon: '🏅', name: 'Export License', desc: 'Authorized' }
  ];

  const originRegions = [
    { 
      name: 'Kafa', 
      product: 'Black Cumin & Cardamom', 
      coordinates: '7.3°N, 36.2°E', 
      lat: 7.3, 
      lng: 36.2, 
      color: '#8b5cf6',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d36.2!3d7.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTgnMDAuMCJOIDM2wrAxMicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Jimma', 
      product: 'Ginger & Turmeric', 
      coordinates: '7.7°N, 36.8°E', 
      lat: 7.7, 
      lng: 36.8, 
      color: '#a855f7',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d36.8!3d7.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInMDAuMCJOIDM2wrA0OCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Sidama', 
      product: 'Cinnamon & Cloves', 
      coordinates: '6.5°N, 38.5°E', 
      lat: 6.5, 
      lng: 38.5, 
      color: '#c084fc',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.5!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzAnMDAuMCJOIDM4wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Shewa', 
      product: 'Fenugreek & Black Pepper', 
      coordinates: '9.0°N, 38.7°E', 
      lat: 9.0, 
      lng: 38.7, 
      color: '#d8b4fe',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.7!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Tigray', 
      product: 'Herbs & Bay Leaves', 
      coordinates: '13.5°N, 39.5°E', 
      lat: 13.5, 
      lng: 39.5, 
      color: '#e9d5ff',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d39.5!3d13.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDMwJzAwLjAiTiAzOcKwMzAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    }
  ];

  const carouselImages = [
    { title: 'Herb Harvesting', emoji: '🌿' },
    { title: 'Sun Drying', emoji: '☀️' },
    { title: 'Grinding Process', emoji: '⚙️' },
    { title: 'Quality Testing', emoji: '🧪' },
    { title: 'Packaging', emoji: '📦' }
  ];

  const downloadables = [
    { icon: '📄', name: 'Herbs & Spices Catalog', size: '2.5 MB' },
    { icon: '💰', name: 'Price List', size: '780 KB' },
    { icon: '📋', name: 'Quality Certificates', size: '1.6 MB' },
    { icon: '📦', name: 'Packaging Options', size: '1.9 MB' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Floating Icons */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🌿', '🌶️', '🧄', '🫚', '🌰', '🍃', '🌾', '💐', '🌺', '⚫', '🟡', '🟢', '🟤'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                x: [0, 20, -20, 0]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ left: `${i * 8}%`, top: `${(i * 11) % 80}%` }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="text-7xl mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌿
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium Ethiopian Herbs & Spices
              </h1>
              <p className="text-2xl mb-6 font-semibold">Aromatic • Potent • Export Quality</p>
              <p className="text-xl text-purple-50 leading-relaxed mb-8">
                Ethiopia's finest herbs and spices—fresh, dried, or powdered. Renowned for exceptional aroma, 
                high essential oil content, and unmatched purity. From traditional black cumin to aromatic fresh herbs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rfq">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                    <FileText className="mr-2 h-5 w-5" />
                    Request Quote
                  </Button>
                </Link>
                <Link href="https://wa.me/251954742383">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: '🌿', title: 'Fresh Herbs', desc: 'High essential oils' },
                { icon: '⚫', title: 'Black Cumin', desc: 'Premium Tikur Azmud' },
                { icon: '🫚', title: 'Ginger & Turmeric', desc: 'High potency' },
                { icon: '🌶️', title: 'Chili & Paprika', desc: 'Various heat levels' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-purple-100">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-purple-700 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '20+', label: 'Herb & Spice Varieties', icon: '🌿' },
              { number: '15+', label: 'Export Destinations', icon: '🌍' },
              { number: '100%', label: 'Natural & Pure', icon: '✨' },
              { number: '50+', label: 'Tons Monthly Capacity', icon: '📦' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-purple-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Herbs & Spices */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Why Choose Our Herbs & Spices?</h2>
            <p className="text-lg text-muted-foreground">Exceptional quality from harvest to export</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: '🌿', 
                title: 'High Essential Oil Content', 
                desc: 'Maximum aroma and potency preserved through careful handling and processing', 
                color: 'from-green-500 to-emerald-500' 
              },
              { 
                icon: '🔬', 
                title: 'Lab Tested Purity', 
                desc: 'Every batch tested for contaminants, moisture content, and quality standards', 
                color: 'from-blue-500 to-cyan-500' 
              },
              { 
                icon: '☀️', 
                title: 'Traditional Drying Methods', 
                desc: 'Sun-dried or controlled dehydration to maintain natural properties', 
                color: 'from-orange-500 to-amber-500' 
              },
              { 
                icon: '📦', 
                title: 'Hygienic Packaging', 
                desc: 'Food-grade materials, moisture-proof, and tamper-evident sealing', 
                color: 'from-purple-500 to-pink-500' 
              },
              { 
                icon: '🌍', 
                title: 'Traceability', 
                desc: 'Full documentation from origin farm to export, batch tracking available', 
                color: 'from-indigo-500 to-blue-500' 
              },
              { 
                icon: '✈️', 
                title: 'Fast Export', 
                desc: 'Air freight for fresh herbs, sea freight for dried spices, flexible logistics', 
                color: 'from-red-500 to-rose-500' 
              },
              { 
                icon: '🧄', 
                title: 'Authentic Ethiopian Varieties', 
                desc: 'Unique local varieties like Tikur Azmud (black cumin) not found elsewhere', 
                color: 'from-gray-700 to-gray-900' 
              },
              { 
                icon: '🌡️', 
                title: 'Temperature Control', 
                desc: 'Cold storage for fresh herbs, climate-controlled warehouses for dried spices', 
                color: 'from-cyan-500 to-blue-500' 
              },
              { 
                icon: '🤝', 
                title: 'Flexible Terms', 
                desc: 'FOB, CIF, or door delivery. Custom blends and grinding services available', 
                color: 'from-emerald-500 to-green-500' 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-purple-100 dark:border-purple-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Herbs */}
      <section className="py-16 bg-gradient-to-b from-green-50 via-emerald-50 to-white dark:from-gray-900 dark:via-green-950 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <span className="text-5xl">🌿</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Fresh Herbs</h2>
            <p className="text-lg text-muted-foreground">High essential oil content • Refrigerated transport available</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {freshHerbs.map((herb, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -5 }}
              >
                <Card 
                  className={`h-full hover:shadow-2xl transition-all duration-300 border-2 border-green-200 dark:border-green-800 overflow-hidden relative group cursor-pointer`}
                  onClick={() => {
                    setSelectedProduct(herb);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {herb.grade}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Details
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${herb.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div
                        className="text-5xl"
                        animate={
                          herb.animation === 'bounce' ? { y: [0, -10, 0] } :
                          herb.animation === 'pulse' ? { scale: [1, 1.15, 1] } :
                          herb.animation === 'float' ? { y: [0, -8, 0] } : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {herb.emoji}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Fresh</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{herb.name}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{herb.desc}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(herb);
                        setIsModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dry Spices */}
      <section className="py-16 bg-gradient-to-b from-orange-50 via-amber-50 to-white dark:from-gray-900 dark:via-orange-950 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-full mb-4">
              <span className="text-5xl">🔥</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Dry Spices</h2>
            <p className="text-lg text-muted-foreground">100% natural • No additives or preservatives</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {drySpices.map((spice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Card 
                  className={`h-full hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-800 overflow-hidden relative group cursor-pointer`}
                  onClick={() => {
                    setSelectedProduct(spice);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {spice.grade}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Details
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${spice.color} opacity-5 group-hover:opacity-15 transition-opacity`}></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div 
                        className="text-5xl flex-shrink-0"
                        animate={
                          spice.animation === 'bounce' ? { y: [0, -12, 0] } :
                          spice.animation === 'pulse' ? { scale: [1, 1.2, 1] } :
                          spice.animation === 'float' ? { y: [0, -8, 0] } :
                          spice.animation === 'spin' ? { rotate: [0, 360] } : {}
                        }
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {spice.emoji}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">Dried</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{spice.name}</h3>
                        <p className="text-sm text-muted-foreground opacity-100 transition-opacity leading-relaxed">{spice.desc}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(spice);
                        setIsModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 p-6 rounded-xl text-center shadow-lg">
              <CheckCircle className="h-10 w-10 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <p className="font-bold text-lg text-gray-800 dark:text-gray-100">100% Natural</p>
              <p className="text-sm text-muted-foreground mt-1">Pure and authentic</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 p-6 rounded-xl text-center shadow-lg">
              <CheckCircle className="h-10 w-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
              <p className="font-bold text-lg text-gray-800 dark:text-gray-100">No Additives</p>
              <p className="text-sm text-muted-foreground mt-1">Chemical-free guarantee</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎥 Our Process</h2>
            <p className="text-lg text-muted-foreground">From harvest to packaging</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
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
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-purple-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-purple-600">
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
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📸 Our Facilities</h2>
            <p className="text-lg text-muted-foreground">From harvest to export</p>
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
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🏆 Certifications</h2>
            <p className="text-lg text-muted-foreground">Quality you can trust</p>
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
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-purple-200 dark:border-purple-800">
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
            <MapPin className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's aromatic zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-purple-50 dark:bg-purple-950 rounded-2xl p-4 md:p-8 mb-8"
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
                        ? 'ring-2 ring-purple-600 shadow-xl scale-105' 
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
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">
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
          </div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📥 Download Resources</h2>
            <p className="text-lg text-muted-foreground">Get detailed product information</p>
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
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-purple-100 dark:border-purple-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3">{file.icon}</div>
                    <h3 className="font-bold mb-2">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{file.size}</p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
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
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-purple-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-purple-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-purple-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-5xl">{selectedProduct.emoji}</span>
                  <div>
                    <div>{selectedProduct.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">{selectedProduct.desc}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Price and Grade */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Price Range</div>
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{selectedProduct.price}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Quality Grade</div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{selectedProduct.grade}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Leaf className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-semibold">Varieties</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.varieties.join(', ')}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-semibold">Season</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.season}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ThermometerSnowflake className="h-5 w-5 text-cyan-600 mt-1" />
                      <div>
                        <div className="font-semibold">Shelf Life</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.shelfLife}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-semibold">Packaging</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.packaging}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <div className="font-semibold">Origin</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Scale className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-semibold">Minimum Order</div>
                        <div className="text-sm text-muted-foreground">{selectedProduct.details.minOrder}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-purple-600" />
                      <div className="font-semibold">Specifications</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedProduct.details.specifications}</p>
                  </CardContent>
                </Card>

                {/* Health Benefits */}
                <div>
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">💜</span>
                    Health Benefits
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.details.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Link href="/rfq" className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <FileText className="mr-2 h-4 w-4" />
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="https://wa.me/251954742383" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
