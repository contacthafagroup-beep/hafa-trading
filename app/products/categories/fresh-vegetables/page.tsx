'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, CheckCircle, Package, Truck, Download, Play, MapPin, Award, FileText, Phone, Mail, MessageCircle, X, Info, Leaf, ThermometerSnowflake, Calendar, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState } from 'react';

export default function FreshVegetablesPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vegetables = [
    { 
      emoji: '🍅', 
      name: 'Tomatoes', 
      desc: 'Fresh Roma & round tomatoes, firm, juicy, long shelf life', 
      price: '$5-8/kg', 
      grade: 'Grade A', 
      animation: 'spin',
      details: {
        varieties: ['Roma', 'Round', 'Cherry', 'Plum'],
        season: 'Year-round',
        shelfLife: '7-14 days',
        packaging: '5kg, 10kg cartons',
        origin: 'Upper Rift Valley',
        minOrder: '500 kg',
        specifications: 'Size: 50-80mm, Color: Red/Pink, Firmness: High',
        benefits: ['Rich in Lycopene', 'High Vitamin C', 'Low Calorie', 'Antioxidant Rich']
      }
    },
    { 
      emoji: '🧅', 
      name: 'Red Onions', 
      desc: 'Strong aroma, high pungency, perfect for cooking', 
      price: '$4-6/kg', 
      grade: 'Premium', 
      animation: 'shake',
      details: {
        varieties: ['Red Globe', 'Red Creole'],
        season: 'October - March',
        shelfLife: '3-6 months',
        packaging: '10kg, 25kg mesh bags',
        origin: 'Wollo Region',
        minOrder: '2000 kg',
        specifications: 'Size: 50-90mm, Dry outer skin, No sprouting',
        benefits: ['High Quercetin', 'Anti-inflammatory', 'Heart Health', 'Long Storage']
      }
    },
    { 
      emoji: '⚪', 
      name: 'White Onions', 
      desc: 'Soft pungency, sweet, ideal for GCC markets', 
      price: '$4-6/kg', 
      grade: 'Premium', 
      animation: 'glow',
      details: {
        varieties: ['White Globe', 'Sweet White'],
        season: 'Year-round',
        shelfLife: '2-4 months',
        packaging: '10kg, 25kg mesh bags',
        origin: 'Afar Region',
        minOrder: '2000 kg',
        specifications: 'Size: 50-80mm, White skin, Mild flavor',
        benefits: ['Mild Taste', 'Low Sulfur', 'Digestive Aid', 'Vitamin C']
      }
    },
    { 
      emoji: '🥔', 
      name: 'Potatoes', 
      desc: 'Size-graded, soil-free, long storage life', 
      price: '$3-5/kg', 
      grade: 'Grade A', 
      animation: 'rise',
      details: {
        varieties: ['Russet', 'Red', 'Yellow', 'White'],
        season: 'Year-round',
        shelfLife: '2-6 months',
        packaging: '10kg, 25kg, 50kg bags',
        origin: 'Arsi & Bale',
        minOrder: '5000 kg',
        specifications: 'Size: 40-80mm, Clean, No green spots',
        benefits: ['High Potassium', 'Vitamin B6', 'Fiber Rich', 'Versatile Cooking']
      }
    },
    { 
      emoji: '🥕', 
      name: 'Carrots', 
      desc: 'Crisp, sweet, washed, sorted by size', 
      price: '$4-7/kg', 
      grade: 'Premium', 
      animation: 'bounce',
      details: {
        varieties: ['Nantes', 'Imperator', 'Chantenay'],
        season: 'Year-round',
        shelfLife: '2-4 weeks',
        packaging: '5kg, 10kg cartons',
        origin: 'Central Highlands',
        minOrder: '1000 kg',
        specifications: 'Length: 15-20cm, Diameter: 2-4cm, Orange color',
        benefits: ['Beta-Carotene', 'Eye Health', 'Immune Boost', 'Skin Health']
      }
    },
    { 
      emoji: '🫑', 
      name: 'Green Peppers', 
      desc: 'Fresh, crunchy sweet peppers', 
      price: '$6-9/kg', 
      grade: 'Grade A', 
      animation: 'slide',
      details: {
        varieties: ['Bell Pepper', 'Sweet Pepper'],
        season: 'Year-round',
        shelfLife: '7-10 days',
        packaging: '5kg cartons',
        origin: 'Rift Valley',
        minOrder: '500 kg',
        specifications: 'Size: Large, Color: Green, Thick walls',
        benefits: ['Vitamin C', 'Low Calorie', 'Antioxidants', 'Digestive Health']
      }
    },
    { 
      emoji: '🌶', 
      name: 'Hot Chili Peppers', 
      desc: 'Spicy varieties for sauces and export', 
      price: '$7-12/kg', 
      grade: 'Premium', 
      animation: 'wave',
      details: {
        varieties: ['Bird\'s Eye', 'Cayenne', 'Jalapeño'],
        season: 'Year-round',
        shelfLife: '5-7 days fresh, 6 months dried',
        packaging: '2kg, 5kg cartons',
        origin: 'Southern Ethiopia',
        minOrder: '500 kg',
        specifications: 'Length: 3-10cm, Heat: 30,000-50,000 SHU',
        benefits: ['Capsaicin', 'Metabolism Boost', 'Pain Relief', 'Vitamin A']
      }
    },
    { 
      emoji: '🍆', 
      name: 'Eggplant', 
      desc: 'Shiny, deep purple, low damage', 
      price: '$5-8/kg', 
      grade: 'Grade A', 
      animation: 'fade',
      details: {
        varieties: ['Globe', 'Italian', 'Japanese'],
        season: 'Year-round',
        shelfLife: '7-10 days',
        packaging: '5kg, 10kg cartons',
        origin: 'Rift Valley',
        minOrder: '500 kg',
        specifications: 'Length: 15-25cm, Color: Deep purple, Firm',
        benefits: ['Fiber Rich', 'Antioxidants', 'Heart Health', 'Low Calorie']
      }
    },
    { 
      emoji: '🥬', 
      name: 'Cabbage', 
      desc: 'Tight head, clean outer leaves, export grade', 
      price: '$3-5/kg', 
      grade: 'Premium', 
      animation: 'glow',
      details: {
        varieties: ['Green', 'Red', 'Savoy'],
        season: 'Year-round',
        shelfLife: '2-4 weeks',
        packaging: '10kg, 15kg cartons',
        origin: 'Jimma Region',
        minOrder: '1000 kg',
        specifications: 'Weight: 1-2kg per head, Tight leaves, No damage',
        benefits: ['Vitamin K', 'Vitamin C', 'Fiber', 'Anti-inflammatory']
      }
    },
    { 
      emoji: '🥗', 
      name: 'Lettuce', 
      desc: 'Fresh, crisp, hydroponic available', 
      price: '$6-10/kg', 
      grade: 'Premium', 
      animation: 'float',
      details: {
        varieties: ['Iceberg', 'Romaine', 'Butterhead', 'Leaf'],
        season: 'Year-round',
        shelfLife: '5-7 days',
        packaging: '3kg, 5kg cartons',
        origin: 'Hydroponic Farms',
        minOrder: '300 kg',
        specifications: 'Fresh, Crisp, No wilting, Clean',
        benefits: ['Hydration', 'Low Calorie', 'Vitamins A & K', 'Folate']
      }
    },
    { 
      emoji: '🥒', 
      name: 'Cucumbers', 
      desc: 'Firm, crisp, evenly sized', 
      price: '$4-7/kg', 
      grade: 'Grade A', 
      animation: 'slide-up',
      details: {
        varieties: ['Slicing', 'Pickling', 'English'],
        season: 'Year-round',
        shelfLife: '7-10 days',
        packaging: '5kg, 10kg cartons',
        origin: 'Rift Valley',
        minOrder: '500 kg',
        specifications: 'Length: 15-20cm, Straight, Dark green',
        benefits: ['Hydration', 'Vitamin K', 'Antioxidants', 'Skin Health']
      }
    },
    { 
      emoji: '🌽', 
      name: 'Sweet Corn', 
      desc: 'Golden, tender, ready for retail markets', 
      price: '$5-8/kg', 
      grade: 'Premium', 
      animation: 'pulse',
      details: {
        varieties: ['Yellow', 'White', 'Bi-color'],
        season: 'March - September',
        shelfLife: '3-5 days fresh',
        packaging: '5kg cartons',
        origin: 'Central Highlands',
        minOrder: '500 kg',
        specifications: 'Ear length: 15-20cm, Full kernels, Sweet',
        benefits: ['Fiber', 'Vitamin B', 'Antioxidants', 'Energy']
      }
    },
    { 
      emoji: '🥦', 
      name: 'Broccoli', 
      desc: 'Green heads, fresh, cooled', 
      price: '$8-12/kg', 
      grade: 'Premium', 
      animation: 'scale',
      details: {
        varieties: ['Calabrese', 'Sprouting'],
        season: 'Year-round',
        shelfLife: '5-7 days',
        packaging: '5kg cartons',
        origin: 'Highland Farms',
        minOrder: '300 kg',
        specifications: 'Head size: 10-15cm, Dark green, Tight florets',
        benefits: ['Vitamin C', 'Vitamin K', 'Fiber', 'Cancer Prevention']
      }
    },
    { 
      emoji: '🧄', 
      name: 'Garlic', 
      desc: 'Fresh or dried, high essential oil', 
      price: '$6-10/kg', 
      grade: 'Grade A', 
      animation: 'glow-shake',
      details: {
        varieties: ['White', 'Purple', 'Elephant'],
        season: 'Year-round',
        shelfLife: '3-6 months',
        packaging: '5kg, 10kg mesh bags',
        origin: 'Northern Ethiopia',
        minOrder: '1000 kg',
        specifications: 'Bulb size: 40-60mm, Dry skin, Strong aroma',
        benefits: ['Allicin', 'Immune Boost', 'Heart Health', 'Antibacterial']
      }
    },
    { 
      emoji: '🟠', 
      name: 'Ginger', 
      desc: 'Fresh young ginger or dried', 
      price: '$8-14/kg', 
      grade: 'Premium', 
      animation: 'rotate',
      details: {
        varieties: ['Young', 'Mature', 'Dried'],
        season: 'Year-round',
        shelfLife: '2-3 weeks fresh, 6 months dried',
        packaging: '5kg, 10kg cartons',
        origin: 'Western Ethiopia',
        minOrder: '500 kg',
        specifications: 'Fresh, Firm, High oil content, Aromatic',
        benefits: ['Anti-inflammatory', 'Digestive Aid', 'Nausea Relief', 'Antioxidants']
      }
    }
  ];

  const features = [
    { icon: '🌡️', title: 'Cold Chain', desc: 'Temperature-controlled from farm to port', color: 'from-blue-500 to-cyan-500' },
    { icon: '📦', title: 'Custom Packaging', desc: 'Cartons, crates, or bulk as per requirement', color: 'from-orange-500 to-amber-500' },
    { icon: '✈️', title: 'Air & Sea Freight', desc: 'Fast air cargo or economical sea shipping', color: 'from-purple-500 to-pink-500' },
    { icon: '🔬', title: 'Lab Tested', desc: 'Pesticide residue & quality analysis', color: 'from-green-500 to-emerald-500' },
    { icon: '📋', title: 'Full Documentation', desc: 'Phytosanitary, COO, quality certificates', color: 'from-red-500 to-rose-500' },
    { icon: '🤝', title: 'Flexible Terms', desc: 'FOB, CIF, or door delivery options', color: 'from-indigo-500 to-blue-500' }
  ];

  const stats = [
    { number: '15+', label: 'Vegetable Varieties', icon: '🥬' },
    { number: '500+', label: 'Tons Monthly', icon: '📦' },
    { number: '20+', label: 'Export Countries', icon: '🌍' },
    { number: '100%', label: 'Quality Assured', icon: '✅' }
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

      {/* Hero Section with Floating Icons */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🍅', '🧅', '🥔', '🥕', '🌶', '🧄', '🟠', '🥬', '🫑'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ left: `${i * 11}%`, top: `${(i * 13) % 80}%` }}
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-6xl mb-4">🥬</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fresh Vegetables</h1>
            <p className="text-2xl mb-6">Farm-Fresh • Graded • Ready for Export</p>
            <p className="text-xl text-green-50 leading-relaxed">
              Premium Ethiopian vegetables, carefully harvested, sorted, and packed to maintain freshness for global markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-green-700 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
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
                <div className="text-green-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Why Choose Our Vegetables?</h2>
            <p className="text-lg text-muted-foreground">End-to-end quality assurance and logistics</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-100 dark:border-green-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-green-700 dark:text-green-400">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌟 Our Vegetable Range</h2>
            <p className="text-lg text-muted-foreground">Hover over each product to see details</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {vegetables.map((veg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: veg.animation === 'spin' ? 360 : 0 }}
              >
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-green-100 dark:border-green-900 cursor-pointer group overflow-hidden relative"
                  onClick={() => {
                    setSelectedProduct(veg);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {veg.grade}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Details
                  </div>
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="text-6xl mb-3"
                      animate={
                        veg.animation === 'bounce' ? { y: [0, -10, 0] } :
                        veg.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                        veg.animation === 'float' ? { y: [0, -5, 0] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {veg.emoji}
                    </motion.div>
                    <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">{veg.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {veg.desc}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(veg);
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

      {/* Admin Video Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-green-600 mx-auto mb-4" />
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
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-green-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-green-600">
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
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
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
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-green-200 dark:border-green-800">
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
            <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's best agricultural zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 dark:bg-green-950 rounded-2xl p-4 md:p-8 mb-8"
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
                        ? 'ring-2 ring-green-600 shadow-xl scale-105' 
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
                            <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">
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
                        <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
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

      {/* Export Markets & Destinations */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌍 Our Global Export Markets</h2>
            <p className="text-lg text-muted-foreground">Trusted by importers across 20+ countries worldwide</p>
          </motion.div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 relative">
                  {/* Interactive Visual Map */}
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-4xl mx-auto">
                      {/* Central Ethiopia */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="relative">
                          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white">
                            🇪🇹
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Ethiopia
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Export Destinations */}
                      {[
                        { flag: '🇦🇪', name: 'UAE', position: 'top-[20%] right-[15%]', delay: 0 },
                        { flag: '🇸🇦', name: 'Saudi', position: 'top-[15%] right-[25%]', delay: 0.1 },
                        { flag: '🇬🇧', name: 'UK', position: 'top-[10%] left-[20%]', delay: 0.2 },
                        { flag: '🇩🇪', name: 'Germany', position: 'top-[15%] left-[30%]', delay: 0.3 },
                        { flag: '🇳🇱', name: 'Netherlands', position: 'top-[12%] left-[35%]', delay: 0.4 },
                        { flag: '🇮🇳', name: 'India', position: 'bottom-[25%] right-[10%]', delay: 0.5 },
                        { flag: '🇨🇳', name: 'China', position: 'top-[25%] right-[5%]', delay: 0.6 },
                        { flag: '🇴🇲', name: 'Oman', position: 'top-[30%] right-[20%]', delay: 0.7 },
                        { flag: '🇶🇦', name: 'Qatar', position: 'top-[25%] right-[22%]', delay: 0.8 },
                      ].map((dest, index) => (
                        <motion.div
                          key={index}
                          className={`absolute ${dest.position}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: dest.delay, duration: 0.5 }}
                        >
                          <motion.div
                            className="relative group cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                          >
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-blue-500">
                              {dest.flag}
                            </div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                {dest.name}
                              </div>
                            </div>
                            {/* Connection Line */}
                            <svg className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                              <motion.line
                                x1="0"
                                y1="0"
                                x2={dest.position.includes('left') ? '200' : '-200'}
                                y2={dest.position.includes('top') ? '100' : '-100'}
                                stroke="#10b981"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: dest.delay + 0.5, duration: 1 }}
                              />
                            </svg>
                          </motion.div>
                        </motion.div>
                      ))}

                      {/* Decorative Elements */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-green-400 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">20+</div>
                      <div className="text-sm text-green-100">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">4</div>
                      <div className="text-sm text-green-100">Continents</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm text-green-100">Tons/Month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm text-green-100">On-Time Delivery</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Importing Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">🏆 Top Importing Countries</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { flag: '🇦🇪', name: 'UAE', region: 'GCC', volume: 'High' },
                { flag: '🇸🇦', name: 'Saudi Arabia', region: 'GCC', volume: 'High' },
                { flag: '🇴🇲', name: 'Oman', region: 'GCC', volume: 'Medium' },
                { flag: '🇶🇦', name: 'Qatar', region: 'GCC', volume: 'Medium' },
                { flag: '🇰🇼', name: 'Kuwait', region: 'GCC', volume: 'Medium' },
                { flag: '🇬🇧', name: 'United Kingdom', region: 'Europe', volume: 'Medium' },
                { flag: '🇩🇪', name: 'Germany', region: 'Europe', volume: 'Medium' },
                { flag: '🇳🇱', name: 'Netherlands', region: 'Europe', volume: 'High' },
                { flag: '🇮🇳', name: 'India', region: 'Asia', volume: 'High' },
                { flag: '🇨🇳', name: 'China', region: 'Asia', volume: 'Growing' }
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="hover:shadow-xl transition-all border-2 border-green-100 dark:border-green-900 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="text-5xl mb-2">{country.flag}</div>
                      <h4 className="font-bold text-sm mb-1">{country.name}</h4>
                      <div className="text-xs text-muted-foreground mb-1">{country.region}</div>
                      <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                        country.volume === 'High' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' :
                        country.volume === 'Medium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-400'
                      }`}>
                        {country.volume} Volume
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Market-Specific Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8">📋 Market-Specific Requirements</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  region: 'GCC Markets',
                  icon: '🕌',
                  countries: 'UAE, Saudi, Qatar, Oman, Kuwait',
                  requirements: [
                    'Halal certification preferred',
                    'GCC standardization compliance',
                    'Arabic labeling required',
                    'Short shelf-life acceptable',
                    'Premium quality focus'
                  ],
                  specialties: ['White onions', 'Fresh tomatoes', 'Potatoes'],
                  color: 'from-amber-500 to-orange-500'
                },
                {
                  region: 'European Union',
                  icon: '🇪🇺',
                  countries: 'UK, Germany, Netherlands, France',
                  requirements: [
                    'EU organic certification',
                    'Strict pesticide limits',
                    'Traceability required',
                    'Long shelf-life needed',
                    'Sustainability focus'
                  ],
                  specialties: ['Organic vegetables', 'Broccoli', 'Lettuce'],
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Markets',
                  icon: '🌏',
                  countries: 'India, China, Singapore, Malaysia',
                  requirements: [
                    'Competitive pricing',
                    'Bulk quantities',
                    'Flexible packaging',
                    'Quick turnaround',
                    'Local language docs'
                  ],
                  specialties: ['Ginger', 'Garlic', 'Chili peppers'],
                  color: 'from-red-500 to-pink-500'
                }
              ].map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-100 dark:border-green-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${market.color}`}></div>
                    <CardContent className="p-6">
                      <div className="text-6xl mb-3 text-center">{market.icon}</div>
                      <h4 className="font-bold text-xl mb-2 text-center text-green-700 dark:text-green-400">{market.region}</h4>
                      <p className="text-xs text-center text-muted-foreground mb-4 italic">{market.countries}</p>
                      
                      <div className="mb-4">
                        <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Requirements:
                        </div>
                        <ul className="space-y-1">
                          {market.requirements.map((req, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-3">
                        <div className="font-semibold text-sm mb-2">Popular Products:</div>
                        <div className="flex flex-wrap gap-1">
                          {market.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories by Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">🌟 Regional Success Stories</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  region: 'GCC Success',
                  flag: '🇦🇪',
                  client: 'Dubai Fresh Markets',
                  story: 'Supplied 50 tons of premium red onions monthly for 2 years. Consistent quality and on-time delivery helped them become the leading vegetable distributor in Dubai.',
                  products: ['Red Onions', 'Tomatoes', 'Potatoes'],
                  achievement: '200% growth in orders',
                  duration: '2+ years partnership',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  region: 'European Success',
                  flag: '🇳🇱',
                  client: 'Amsterdam Organic Imports',
                  story: 'First Ethiopian supplier to meet their strict organic standards. Now supplying 30 tons monthly of certified organic vegetables to major EU retailers.',
                  products: ['Organic Lettuce', 'Broccoli', 'Cabbage'],
                  achievement: 'EU Organic Certified',
                  duration: '18 months partnership',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Success',
                  flag: '🇮🇳',
                  client: 'Mumbai Spice Traders',
                  story: 'Competitive pricing and bulk supply capabilities won us this major contract. Supplying 100+ tons of ginger and garlic monthly to Indian spice processing industry.',
                  products: ['Ginger', 'Garlic', 'Chili Peppers'],
                  achievement: '100+ tons monthly',
                  duration: '3+ years partnership',
                  color: 'from-red-500 to-pink-500'
                },
                {
                  region: 'Middle East Success',
                  flag: '🇸🇦',
                  client: 'Riyadh Wholesale Group',
                  story: 'Started with a 5-ton trial order, now our largest client in Saudi Arabia. Our white onions are their bestselling item across 50+ retail locations.',
                  products: ['White Onions', 'Carrots', 'Cucumbers'],
                  achievement: '50+ retail locations',
                  duration: '2.5 years partnership',
                  color: 'from-green-500 to-emerald-500'
                }
              ].map((success, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-100 dark:border-green-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${success.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{success.flag}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-green-700 dark:text-green-400 mb-1">{success.region}</h4>
                          <p className="text-sm font-semibold text-muted-foreground">{success.client}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                        "{success.story}"
                      </p>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground mb-1">Products Supplied:</div>
                          <div className="flex flex-wrap gap-1">
                            {success.products.map((product, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                          <div>
                            <div className="text-xs text-muted-foreground">Achievement</div>
                            <div className="text-sm font-bold text-green-600">{success.achievement}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                            <div className="text-sm font-bold text-blue-600">{success.duration}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-green-600 mx-auto mb-4" />
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
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-green-100 dark:border-green-900">
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

      {/* Supply Chain Process */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🔄 Our Supply Chain Process</h2>
            <p className="text-lg text-muted-foreground">From farm to your destination in 7 simple steps</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-7 gap-4">
              {[
                { step: 1, icon: '🌱', title: 'Harvest', desc: 'Fresh picking at optimal maturity' },
                { step: 2, icon: '🚜', title: 'Transport', desc: 'Quick farm-to-facility transfer' },
                { step: 3, icon: '🧼', title: 'Washing', desc: 'Clean & sanitize' },
                { step: 4, icon: '✅', title: 'Sorting', desc: 'Grade by size & quality' },
                { step: 5, icon: '📦', title: 'Packing', desc: 'Export-grade packaging' },
                { step: 6, icon: '❄️', title: 'Cooling', desc: 'Cold storage & transport' },
                { step: 7, icon: '✈️', title: 'Export', desc: 'Air or sea freight' }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all border-2 border-green-100 dark:border-green-900">
                    <CardContent className="p-4">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-2 font-bold">
                        {process.step}
                      </div>
                      <div className="text-4xl mb-2">{process.icon}</div>
                      <h3 className="font-bold text-sm mb-1">{process.title}</h3>
                      <p className="text-xs text-muted-foreground">{process.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Options */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Flexible Packaging Options</h2>
            <p className="text-lg text-muted-foreground">Customized packaging to meet your market requirements</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: '📦', 
                name: 'Carton Boxes', 
                desc: '5kg, 10kg, 15kg options',
                features: ['Ventilated', 'Stackable', 'Branded']
              },
              { 
                icon: '🧺', 
                name: 'Mesh Bags', 
                desc: '10kg, 25kg, 50kg sizes',
                features: ['Breathable', 'Durable', 'Reusable']
              },
              { 
                icon: '🎁', 
                name: 'Retail Packs', 
                desc: '500g, 1kg, 2kg packs',
                features: ['Consumer Ready', 'Labeled', 'Attractive']
              },
              { 
                icon: '🚚', 
                name: 'Bulk Crates', 
                desc: 'Large volume orders',
                features: ['Cost Effective', 'Industrial', 'Reusable']
              }
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 border-green-100 dark:border-green-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3">{pkg.icon}</div>
                    <h3 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
                    <div className="space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Truck className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚚 Shipping & Logistics</h2>
            <p className="text-lg text-muted-foreground">Multiple shipping options to suit your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '✈️',
                method: 'Air Freight',
                time: '3-5 days',
                best: 'Fresh, perishable items',
                features: ['Fastest delivery', 'Temperature controlled', 'Premium quality', 'Higher cost'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🚢',
                method: 'Sea Freight',
                time: '15-30 days',
                best: 'Large volumes, long shelf-life',
                features: ['Cost effective', 'Bulk orders', 'Refrigerated containers', 'Economical'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '🚛',
                method: 'Land Transport',
                time: '1-7 days',
                best: 'Regional deliveries',
                features: ['Flexible routes', 'Door-to-door', 'Regional markets', 'Quick turnaround'],
                color: 'from-orange-500 to-amber-500'
              }
            ].map((shipping, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-100 dark:border-green-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${shipping.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4 text-center">{shipping.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-green-700 dark:text-green-400">{shipping.method}</h3>
                    <div className="text-center mb-4">
                      <div className="inline-block bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full text-sm font-semibold text-green-700 dark:text-green-400">
                        {shipping.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 text-center italic">Best for: {shipping.best}</p>
                    <div className="space-y-2">
                      {shipping.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">💬 What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">Trusted by importers worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Ahmed Al-Rashid',
                company: 'Dubai Fresh Markets',
                country: '🇦🇪 UAE',
                text: 'Excellent quality vegetables! The red onions arrived fresh and perfectly graded. Hafa Trading is now our primary supplier.',
                rating: 5
              },
              {
                name: 'Sarah Johnson',
                company: 'Euro Produce Ltd',
                country: '🇬🇧 UK',
                text: 'Reliable partner for Ethiopian vegetables. Cold chain management is top-notch. Highly recommend for European markets.',
                rating: 5
              },
              {
                name: 'Mohammed Hassan',
                company: 'Riyadh Wholesale',
                country: '🇸🇦 Saudi Arabia',
                text: 'Best quality potatoes and tomatoes. Consistent supply and competitive pricing. Great communication throughout.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 border-green-100 dark:border-green-900">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-green-700 dark:text-green-400">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      <p className="text-sm font-semibold mt-1">{testimonial.country}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">❓ Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'What is the minimum order quantity?',
                a: 'MOQ varies by product: typically 500kg-2000kg for most vegetables. Contact us for specific requirements.'
              },
              {
                q: 'How do you ensure freshness during transport?',
                a: 'We use temperature-controlled cold chain from harvest to port. Air freight available for urgent orders.'
              },
              {
                q: 'What certifications do you provide?',
                a: 'Phytosanitary certificate, Certificate of Origin, Quality analysis, and Organic certification (where applicable).'
              },
              {
                q: 'Can you provide samples?',
                a: 'Yes! We can send samples via air courier. Sample costs are deductible from first commercial order.'
              },
              {
                q: 'What are your payment terms?',
                a: 'We accept T/T, L/C at sight, and can discuss flexible terms for established clients.'
              },
              {
                q: 'Which ports do you ship from?',
                a: 'Primarily from Addis Ababa (air) and Djibouti Port (sea). We can arrange inland transport as needed.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400 flex items-start gap-2">
                      <span className="text-2xl">❓</span>
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground pl-8">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Import Premium Ethiopian Vegetables?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Contact us today for quotes, samples, and partnership opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-green-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-green-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-green-600">
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
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Price Range</div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">{selectedProduct.price}</div>
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
                      <Leaf className="h-5 w-5 text-green-600 mt-1" />
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
                      <Package className="h-5 w-5 text-orange-600 mt-1" />
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
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <div className="font-semibold">Specifications</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedProduct.details.specifications}</p>
                  </CardContent>
                </Card>

                {/* Health Benefits */}
                <div>
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">💚</span>
                    Health Benefits
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.details.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Link href="/rfq" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
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
