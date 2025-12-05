'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle, Package, Shield, Play, MapPin, Award, Download, Phone, Mail, MessageCircle, FileText, Leaf, Calendar, ThermometerSnowflake, Scale, ShieldCheck, Info, Truck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryItem {
  id: string;
  section: string;
  category?: string;
  name: string;
  description: string;
  imageUrl: string;
  emoji: string;
  order: number;
  productName?: string;
  beforeTitle?: string;
  beforeDesc?: string;
  beforeIcon?: string;
  beforeFeatures?: string[];
  beforeImageUrl?: string;
  afterTitle?: string;
  afterDesc?: string;
  afterIcon?: string;
  afterFeatures?: string[];
  afterImageUrl?: string;
  color?: string;
  facilityFeatures?: string[];
  createdAt: Date;
}

export default function GrainsLegumesPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [beforeAfterItems, setBeforeAfterItems] = useState<GalleryItem[]>([]);
  const [facilityItems, setFacilityItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [isSampleOrderOpen, setIsSampleOrderOpen] = useState(false);
  const [selectedSamplePack, setSelectedSamplePack] = useState<string>('');
  
  // Price Estimator States
  const [selectedGrain, setSelectedGrain] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingMethod, setShippingMethod] = useState('sea');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      if (!db) {
        setLoadingGallery(false);
        return;
      }

      const q = query(collection(db, 'productGallery'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as GalleryItem[];

      setGalleryItems(items.filter(item => item.section === 'gallery'));
      setBeforeAfterItems(items.filter(item => item.section === 'beforeAfter'));
      setFacilityItems(items.filter(item => item.section === 'facilities'));
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  const products = [
    {
      emoji: '🌾',
      name: 'Teff (White, Red, Mixed)',
      desc: "Ethiopia's premium export grain",
      features: ['99% purity for export', 'Gluten-free superfood', 'High protein & fiber'],
      animation: 'float',
      price: '$800-1200/ton',
      grade: 'Premium A',
      details: {
        varieties: ['White Teff', 'Red Teff', 'Mixed Teff'],
        season: 'Year-round availability',
        shelfLife: '12-18 months (proper storage)',
        packaging: '25kg, 50kg PP bags or bulk',
        origin: 'Shewa, Gojjam regions',
        minOrder: '5 tons (1 container)',
        specifications: 'Purity: 99%+, Moisture: 10-12%, Protein: 13-14%, Gluten-free, Ancient grain superfood',
        benefits: ['High in protein & fiber', 'Rich in iron & calcium', 'Gluten-free alternative', 'Low glycemic index', 'Complete amino acid profile', 'Supports bone health']
      }
    },
    {
      emoji: '🌾',
      name: 'Wheat, Barley & Sorghum',
      desc: 'A-grade, bulk supply',
      features: ['Truck or container loading', 'Cleaned and sorted', 'Moisture controlled'],
      animation: 'bounce',
      price: '$250-400/ton',
      grade: 'Grade A',
      details: {
        varieties: ['Durum Wheat', 'Barley', 'White Sorghum'],
        season: 'November-February harvest',
        shelfLife: '12 months (dry storage)',
        packaging: '50kg PP bags or bulk',
        origin: 'Arsi, Bale regions',
        minOrder: '20 tons (1 container)',
        specifications: 'Moisture: 12-13%, Protein: 11-13% (wheat), Cleaned and sorted, Food & feed grade',
        benefits: ['High protein content', 'Versatile grain', 'Excellent for milling', 'Animal feed quality', 'Drought resistant', 'Long shelf life']
      }
    },
    {
      emoji: '🫘',
      name: 'Red Lentils',
      desc: 'Split and whole varieties',
      features: ['High protein content', 'Quick cooking', 'Export quality'],
      animation: 'pulse',
      price: '$600-900/ton',
      grade: 'Premium',
      details: {
        varieties: ['Split Red Lentils', 'Whole Red Lentils'],
        season: 'Year-round availability',
        shelfLife: '18-24 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Gojjam, Shewa regions',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 12-14%, Protein: 24-26%, Quick cooking (15-20 min)',
        benefits: ['High in protein & fiber', 'Rich in iron & folate', 'Quick cooking time', 'Heart healthy', 'Supports digestion', 'Low in fat']
      }
    },
    {
      emoji: '🫘',
      name: 'Brown Lentils',
      desc: 'Whole lentils',
      features: ['Rich earthy flavor', 'Holds shape when cooked', 'Premium grade'],
      animation: 'float',
      price: '$550-850/ton',
      grade: 'Premium',
      details: {
        varieties: ['Whole Brown Lentils', 'Pardina Lentils'],
        season: 'Year-round availability',
        shelfLife: '18-24 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Gojjam region',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 12-14%, Protein: 25-27%, Holds shape when cooked',
        benefits: ['High protein content', 'Rich earthy flavor', 'Excellent texture', 'Versatile cooking', 'High in fiber', 'Nutrient dense']
      }
    },
    {
      emoji: '🫘',
      name: 'Chickpeas (Desi & Kabuli)',
      desc: 'Both varieties available',
      features: ['Large size Kabuli', 'Small Desi variety', 'Cleaned and graded'],
      animation: 'bounce',
      price: '$700-1100/ton',
      grade: 'Premium A',
      details: {
        varieties: ['Kabuli (Large)', 'Desi (Small)'],
        season: 'Year-round availability',
        shelfLife: '18-24 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Shewa, Gojjam regions',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 12-14%, Protein: 19-21%, Size: 7-9mm (Kabuli), 5-7mm (Desi)',
        benefits: ['High protein & fiber', 'Rich in vitamins', 'Versatile ingredient', 'Heart healthy', 'Blood sugar control', 'Weight management']
      }
    },
    {
      emoji: '🫘',
      name: 'Pigeon Peas',
      desc: 'Yellow split peas',
      features: ['High nutritional value', 'Long shelf life', 'Bulk packaging'],
      animation: 'pulse',
      price: '$500-800/ton',
      grade: 'Grade A',
      details: {
        varieties: ['Yellow Split Pigeon Peas', 'Whole Pigeon Peas'],
        season: 'Year-round availability',
        shelfLife: '24 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Southern Ethiopia',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 12-14%, Protein: 20-22%, Split and cleaned',
        benefits: ['High protein content', 'Rich in minerals', 'Long shelf life', 'Easy to digest', 'Supports immunity', 'Versatile cooking']
      }
    },
    {
      emoji: '🫘',
      name: 'Haricot & Kidney Beans',
      desc: 'White and red beans',
      features: ['Uniform size', 'Low moisture', 'Export standard'],
      animation: 'float',
      price: '$650-950/ton',
      grade: 'Premium',
      details: {
        varieties: ['White Haricot Beans', 'Red Kidney Beans'],
        season: 'Year-round availability',
        shelfLife: '18-24 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Rift Valley regions',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 12-14%, Protein: 21-23%, Uniform size and color',
        benefits: ['High protein & fiber', 'Rich in antioxidants', 'Heart healthy', 'Blood sugar control', 'Weight management', 'Versatile cooking']
      }
    },
    {
      emoji: '🌻',
      name: 'White Humera Sesame',
      desc: 'Premium oil seed',
      features: ['High oil content', 'Whitest variety', 'Global demand'],
      animation: 'spin',
      price: '$1200-1800/ton',
      grade: 'Premium A+',
      details: {
        varieties: ['White Humera Sesame', 'Whitish Humera'],
        season: 'November-January harvest',
        shelfLife: '12-18 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Humera, Tigray region',
        minOrder: '20 tons',
        specifications: 'Purity: 99%+, Oil content: 50-52%, Moisture: 6-8%, Whitest variety globally',
        benefits: ['Highest oil content', 'Premium white color', 'Rich in nutrients', 'Versatile use', 'High demand', 'Export quality']
      }
    },
    {
      emoji: '🌻',
      name: 'Wollega Sesame',
      desc: 'Ethiopian origin',
      features: ['Rich flavor', 'Natural quality', 'Bulk export'],
      animation: 'spin',
      price: '$1000-1500/ton',
      grade: 'Grade A',
      details: {
        varieties: ['Wollega Sesame', 'Mixed Sesame'],
        season: 'November-January harvest',
        shelfLife: '12-18 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Wollega region',
        minOrder: '20 tons',
        specifications: 'Purity: 98%+, Oil content: 48-50%, Moisture: 6-8%, Natural quality',
        benefits: ['Rich nutty flavor', 'High oil content', 'Natural quality', 'Versatile use', 'Export grade', 'Competitive pricing']
      }
    },
    {
      emoji: '🌻',
      name: 'Niger Seeds',
      desc: 'Oil seed crop',
      features: ['High oil yield', 'Bird feed quality', 'Export grade'],
      animation: 'pulse',
      price: '$800-1200/ton',
      grade: 'Grade A',
      details: {
        varieties: ['Black Niger Seed', 'Brown Niger Seed'],
        season: 'Year-round availability',
        shelfLife: '12 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Various regions',
        minOrder: '20 tons',
        specifications: 'Purity: 98%+, Oil content: 35-40%, Moisture: 8-10%, Food & bird feed grade',
        benefits: ['High oil yield', 'Bird feed quality', 'Industrial use', 'Export demand', 'Competitive price', 'Versatile application']
      }
    },
    {
      emoji: '🌻',
      name: 'Soybeans',
      desc: 'Protein-rich legume',
      features: ['Non-GMO', 'High protein', 'Food & feed grade'],
      animation: 'bounce',
      price: '$500-750/ton',
      grade: 'Grade A',
      details: {
        varieties: ['Non-GMO Soybeans', 'Food Grade Soybeans'],
        season: 'Year-round availability',
        shelfLife: '12-18 months',
        packaging: '25kg, 50kg PP bags',
        origin: 'Wollega, Jimma regions',
        minOrder: '20 tons',
        specifications: 'Purity: 98%+, Protein: 36-38%, Moisture: 12-14%, Non-GMO certified',
        benefits: ['Highest protein content', 'Non-GMO quality', 'Versatile use', 'Food & feed grade', 'Rich in nutrients', 'Sustainable crop']
      }
    },
    {
      emoji: '🥜',
      name: 'Groundnuts (Peanuts)',
      desc: 'Raw and roasted',
      features: ['Large kernels', 'Low aflatoxin', 'Various grades'],
      animation: 'float',
      price: '$900-1400/ton',
      grade: 'Premium',
      details: {
        varieties: ['Raw Groundnuts', 'Roasted Peanuts', 'Blanched Peanuts'],
        season: 'Year-round availability',
        shelfLife: '12 months (raw), 6 months (roasted)',
        packaging: '25kg, 50kg bags',
        origin: 'Eastern Ethiopia',
        minOrder: '10 tons',
        specifications: 'Purity: 98%+, Moisture: 7-9%, Aflatoxin: <4ppb, Large kernel size',
        benefits: ['High protein & healthy fats', 'Low aflatoxin', 'Large kernels', 'Versatile use', 'Rich in vitamins', 'Export quality']
      }
    }
  ];

  const videos = [
    { 
      title: 'Grain Harvesting', 
      desc: 'Modern harvesting techniques', 
      thumbnail: '🌾',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Cleaning & Sorting', 
      desc: 'Machine and hand sorting process', 
      thumbnail: '🔍',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Quality Testing', 
      desc: 'Moisture and purity testing', 
      thumbnail: '🧪',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Packaging & Export', 
      desc: 'From warehouse to container', 
      thumbnail: '📦',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const certifications = [
    { icon: '🔒', name: 'ISO Certified', desc: 'Quality management' },
    { icon: '🌿', name: 'Organic Options', desc: 'Chemical-free' },
    { icon: '📜', name: 'Phytosanitary', desc: 'Plant health certified' },
    { icon: '🧪', name: 'Lab Tested', desc: 'Purity verified' },
    { icon: '🏅', name: 'Export License', desc: 'Authorized exporter' }
  ];

  const originRegions = [
    { 
      name: 'Humera', 
      product: 'White Sesame', 
      coordinates: '14.3°N, 36.6°E', 
      lat: 14.3, 
      lng: 36.6, 
      color: '#f59e0b',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d36.6!3d14.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDE4JzAwLjAiTiAzNsKwMzYnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Wollega', 
      product: 'Sesame & Soybeans', 
      coordinates: '9.0°N, 36.5°E', 
      lat: 9.0, 
      lng: 36.5, 
      color: '#eab308',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d36.5!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM2wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Arsi & Bale', 
      product: 'Wheat & Barley', 
      coordinates: '7.5°N, 39.5°E', 
      lat: 7.5, 
      lng: 39.5, 
      color: '#fb923c',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d39.5!3d7.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJOIDM5wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Shewa', 
      product: 'Teff & Chickpeas', 
      coordinates: '9.0°N, 38.7°E', 
      lat: 9.0, 
      lng: 38.7, 
      color: '#10b981',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.7!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Gojjam', 
      product: 'Lentils & Beans', 
      coordinates: '10.5°N, 37.5°E', 
      lat: 10.5, 
      lng: 37.5, 
      color: '#f97316',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d37.5!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMwJzAwLjAiTiAzN8KwMzAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    }
  ];

  const downloadables = [
    { icon: '📄', name: 'Grains Catalog PDF', size: '3.2 MB' },
    { icon: '💰', name: 'Price List', size: '850 KB' },
    { icon: '📋', name: 'Quality Certificates', size: '1.8 MB' },
    { icon: '📦', name: 'Packaging Specs', size: '2.1 MB' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Floating Icons */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🌾', '🫘', '🌻', '🥜', '🌰', '🫛', '🌽', '🍚', '🫘', '🌾', '🫘'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-8xl"
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
              style={{ left: `${i * 9}%`, top: `${(i * 12) % 80}%` }}
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
                🌾
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium Ethiopian Grains & Legumes
              </h1>
              <p className="text-2xl mb-6 font-semibold">Clean • Sorted • Moisture-Controlled</p>
              <p className="text-xl text-amber-50 leading-relaxed mb-8">
                Ethiopia's finest grains, cereals, and legumes—from ancient teff to premium sesame seeds. 
                Renowned for exceptional quality, high purity, and rigorous sorting. Supplying wholesalers, 
                millers, and food processors worldwide with export-grade products.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rfq">
                  <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
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
                { icon: '🌾', title: 'Premium Teff', desc: '99% purity export grade' },
                { icon: '🫘', title: 'Lentils & Beans', desc: 'Red, brown, chickpeas' },
                { icon: '🌻', title: 'Sesame Seeds', desc: 'White Humera quality' },
                { icon: '🥜', title: 'Oil Seeds', desc: 'Niger seed, soybeans' }
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
                      <p className="text-sm text-amber-100">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-amber-700 to-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '30+', label: 'Grain & Legume Varieties', icon: '🌾' },
              { number: '25+', label: 'Export Destinations', icon: '🌍' },
              { number: '99%', label: 'Purity Standard', icon: '✨' },
              { number: '500+', label: 'Tons Monthly Capacity', icon: '📦' }
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
                <div className="text-amber-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Grains & Legumes */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Why Choose Our Grains & Legumes?</h2>
            <p className="text-lg text-muted-foreground">Exceptional quality from harvest to export</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '🔍',
                title: 'Rigorous Sorting',
                desc: 'Machine and hand-sorted for uniform size and quality',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: '💧',
                title: 'Moisture Control',
                desc: 'Optimal moisture levels tested and certified',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🧪',
                title: 'Lab Tested',
                desc: 'Purity, aflatoxin, and quality analysis for every batch',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '📦',
                title: 'Export Packaging',
                desc: 'PP bags, jute sacks, or bulk containers',
                color: 'from-yellow-500 to-amber-500'
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-amber-700 dark:text-amber-400">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌾 Our Products</h2>
            <p className="text-lg text-muted-foreground">Premium grains and legumes for global markets</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 border-2 border-amber-100 dark:border-amber-900 group cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  {/* Grade Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.grade}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={
                        product.animation === 'bounce' ? { y: [0, -10, 0] } :
                        product.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                        product.animation === 'float' ? { y: [0, -5, 0] } :
                        product.animation === 'spin' ? { rotate: [0, 360] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {product.emoji}
                    </motion.div>
                    <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">{product.desc}</p>
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-amber-600 text-amber-700 hover:bg-amber-50"
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

      {/* From Farm to Export - Our Process */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['🌾', '➡️', '📦', '✨', '🚜', '🏆'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
              style={{ left: `${10 + i * 15}%`, top: `${(i * 25) % 70}%` }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                🌾
              </motion.div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl"
              >
                ➡️
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-5xl"
              >
                📦
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              From Farm to Export - Our Process
            </h2>
            <p className="text-lg text-muted-foreground">See the transformation from harvest to premium export-ready grains & legumes</p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: 1,
                icon: '🌾',
                title: 'Harvest',
                desc: 'Grains and legumes harvested at optimal maturity for maximum quality',
                color: 'from-green-500 to-emerald-500'
              },
              {
                step: 2,
                icon: '🚜',
                title: 'Collection & Transport',
                desc: 'Quick transport from farms to processing facilities to maintain freshness',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: 3,
                icon: '🧹',
                title: 'Cleaning',
                desc: 'Removal of stones, dust, and foreign materials using modern machinery',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: 4,
                icon: '☀️',
                title: 'Drying',
                desc: 'Controlled drying to achieve optimal moisture content (10-14%)',
                color: 'from-orange-500 to-amber-500'
              },
              {
                step: 5,
                icon: '✅',
                title: 'Sorting & Grading',
                desc: 'Machine and manual sorting by size, color, and quality standards',
                color: 'from-red-500 to-rose-500'
              },
              {
                step: 6,
                icon: '🔬',
                title: 'Quality Testing',
                desc: 'Lab analysis for purity, moisture, protein content, and aflatoxin',
                color: 'from-indigo-500 to-blue-500'
              },
              {
                step: 7,
                icon: '📦',
                title: 'Packaging',
                desc: 'Food-grade PP bags or jute sacks with proper labeling and sealing',
                color: 'from-teal-500 to-green-500'
              },
              {
                step: 8,
                icon: '✈️',
                title: 'Export',
                desc: 'Container loading and shipping to global markets with full documentation',
                color: 'from-yellow-500 to-amber-500'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${process.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                        {process.step}
                      </div>
                      <div className="text-5xl">{process.icon}</div>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-amber-700 dark:text-amber-400">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Before & After Comparisons */}
          <div className="space-y-8 mb-12">
            {loadingGallery ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading...</p>
              </div>
            ) : beforeAfterItems.length > 0 ? (
              beforeAfterItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden border-2 border-amber-200 dark:border-amber-800">
                    <div className={`h-2 bg-gradient-to-r ${item.color || 'from-amber-500 to-orange-500'}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-5xl">{item.emoji}</span>
                        <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">{item.productName}</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 relative">
                        {/* Before */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute -top-3 -left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            BEFORE
                          </div>
                          <Card className="h-full bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800">
                            <CardContent className="p-6">
                              {item.beforeImageUrl ? (
                                <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-blue-300">
                                  <img src={item.beforeImageUrl} alt={item.beforeTitle} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                              ) : (
                                <motion.div 
                                  className="text-6xl mb-4 text-center"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {item.beforeIcon}
                                </motion.div>
                              )}
                              <h4 className="font-bold text-lg mb-2 text-center">{item.beforeTitle}</h4>
                              <p className="text-sm text-muted-foreground mb-4 text-center">{item.beforeDesc}</p>
                              <div className="space-y-2">
                                {item.beforeFeatures?.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        {/* Arrow */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-4xl"
                          >
                            ➡️
                          </motion.div>
                        </div>

                        {/* After */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute -top-3 -right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            AFTER
                          </div>
                          <Card className="h-full bg-amber-50 dark:bg-amber-950 border-2 border-amber-200 dark:border-amber-800">
                            <CardContent className="p-6">
                              {item.afterImageUrl ? (
                                <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-amber-300">
                                  <img src={item.afterImageUrl} alt={item.afterTitle} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                              ) : (
                                <motion.div 
                                  className="text-6xl mb-4 text-center"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {item.afterIcon}
                                </motion.div>
                              )}
                              <h4 className="font-bold text-lg mb-2 text-center">{item.afterTitle}</h4>
                              <p className="text-sm text-muted-foreground mb-4 text-center">{item.afterDesc}</p>
                              <div className="space-y-2">
                                {item.afterFeatures?.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-amber-600" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p>No before & after items yet. <Link href="/admin/product-gallery" className="text-amber-600 hover:underline">Add from admin panel</Link></p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quality Control Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="text-5xl mb-3 inline-block"
              >
                🔬
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Quality Control Process</h3>
              <p className="text-muted-foreground">Rigorous testing at every stage</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: '🧪', title: 'Lab Testing', desc: 'Purity & contaminant analysis' },
                { icon: '💧', title: 'Moisture Check', desc: 'Optimal moisture content' },
                { icon: '⚖️', title: 'Weight Verification', desc: 'Accurate measurements' },
                { icon: '🌡️', title: 'Storage Control', desc: 'Proper storage conditions' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all border-2 border-amber-100 dark:border-amber-900">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Processing Facilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="text-5xl"
                >
                  ⚙️
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-5xl"
                >
                  🏭
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  📦
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Our Processing Facilities
              </h3>
            </div>

            {loadingGallery ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading...</p>
              </div>
            ) : facilityItems.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {facilityItems.map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900">
                      <CardContent className="p-6">
                        <div className="relative mb-6 group">
                          <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                            {facility.imageUrl ? (
                              <>
                                <img src={facility.imageUrl} alt={facility.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </>
                            ) : (
                              <motion.span 
                                className="text-8xl"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                {facility.emoji}
                              </motion.span>
                            )}
                          </div>
                          <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-2xl shadow-xl border-2 border-amber-200 dark:border-amber-700">
                            {facility.emoji}
                          </div>
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">{facility.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{facility.description}</p>
                        <div className="space-y-2">
                          {facility.facilityFeatures?.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-amber-600" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    emoji: '🏭',
                    name: 'Modern Cleaning Plant',
                    desc: 'State-of-the-art machinery for cleaning and sorting',
                    features: ['Destoner machines', 'Color sorters', 'Gravity separators', 'Dust collectors']
                  },
                  {
                    emoji: '🔬',
                    name: 'Quality Lab',
                    desc: 'Fully equipped laboratory for comprehensive testing',
                    features: ['Moisture analyzers', 'Protein testers', 'Aflatoxin testing', 'Purity analysis']
                  },
                  {
                    emoji: '📦',
                    name: 'Packaging Unit',
                    desc: 'Hygienic packaging with modern equipment',
                    features: ['Automated weighing', 'Sealing machines', 'Labeling systems', 'Quality packaging']
                  }
                ].map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900">
                      <CardContent className="p-6">
                        <div className="text-6xl mb-4 text-center">{facility.emoji}</div>
                        <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">{facility.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{facility.desc}</p>
                        <div className="space-y-2">
                          {facility.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-amber-600" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4 inline-block"
            >
              📷
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Product Gallery
            </h2>
            <p className="text-lg text-muted-foreground">Real photos of our premium grains & legumes</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {(['Fresh Harvest', 'Processing', 'Export Ready'] as const).map((category, gIndex) => {
                const categoryItems = galleryItems.filter(item => item.category === category);
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gIndex * 0.1 }}
                  >
                    <Card className="h-full border-2 border-amber-100 dark:border-amber-900 relative overflow-hidden">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950 dark:via-orange-950 dark:to-amber-950 opacity-50"></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {category === 'Fresh Harvest' ? '🌾' : category === 'Processing' ? '⚙️' : '📦'}
                          </motion.div>
                          <h4 className="font-bold text-lg text-center text-amber-700 dark:text-amber-400">
                            {category}
                          </h4>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ✨
                          </motion.div>
                        </div>
                        <div className="space-y-4">
                          {categoryItems.length > 0 ? (
                            categoryItems.map((item, iIndex) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.03 }}
                                className="cursor-pointer"
                              >
                                <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
                                  <CardContent className="p-0">
                                    <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center overflow-hidden relative">
                                      {item.imageUrl ? (
                                        <img 
                                          src={item.imageUrl} 
                                          alt={item.name}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                      ) : (
                                        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-4">
                                      <h5 className="font-bold text-base mb-2 text-amber-700 dark:text-amber-400">{item.name}</h5>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <p className="text-sm">No items yet</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="inline-block bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-3">Want to see more photos?</p>
                <Link href="/rfq">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Product Samples
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sample Order Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['📦', '✨', '🎁', '👍', '⭐', '💼'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-8xl"
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
              style={{ left: `${i * 15}%`, top: `${(i * 25) % 70}%` }}
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
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl"
              >
                📦
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-5xl"
              >
                ✨
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Order Sample Packs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try before you buy! Get quality samples delivered to evaluate our premium grains & legumes
            </p>
          </motion.div>

          {/* How to Order Samples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                🔄
              </motion.span>
              How to Order Samples
            </h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { step: '1', icon: '📝', title: 'Choose Products', desc: 'Select grains & legumes you want to sample' },
                { step: '2', icon: '💳', title: 'Pay Sample Fee', desc: 'Cover shipping & handling costs' },
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
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

          {/* Sample Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                💰
              </motion.span>
              Sample Pricing
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Basic Pack',
                  price: '$49',
                  icon: '📦',
                  items: ['3 grain/legume types', '500g each', 'Standard shipping', '5-7 days delivery'],
                  color: 'from-amber-500 to-yellow-500'
                },
                {
                  name: 'Premium Pack',
                  price: '$89',
                  icon: '🎁',
                  items: ['5 grain/legume types', '1kg each', 'Express shipping', '3-4 days delivery', 'Quality certificates'],
                  color: 'from-orange-500 to-amber-500',
                  popular: true
                },
                {
                  name: 'Custom Pack',
                  price: 'Custom',
                  icon: '⭐',
                  items: ['Your choice', 'Custom quantities', 'Priority shipping', '2-3 days delivery', 'Full documentation'],
                  color: 'from-yellow-500 to-orange-500'
                }
              ].map((pack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className={`h-full hover:shadow-2xl transition-all border-2 ${pack.popular ? 'border-amber-500 dark:border-amber-400' : 'border-gray-200 dark:border-gray-700'} relative overflow-hidden`}>
                    {pack.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                        POPULAR
                      </div>
                    )}
                    <div className={`h-2 bg-gradient-to-r ${pack.color}`}></div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {pack.icon}
                      </motion.div>
                      <h4 className="font-bold text-2xl mb-2">{pack.name}</h4>
                      <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-6">
                        {pack.price}
                      </div>
                      <div className="space-y-3 mb-6">
                        {pack.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={`w-full bg-gradient-to-r ${pack.color} text-white hover:opacity-90`}
                        onClick={() => {
                          setSelectedSamplePack(pack.name);
                          setIsSampleOrderOpen(true);
                        }}
                      >
                        Order Sample
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sample Pack Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                📋
              </motion.span>
              What's Included in Sample Packs
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 border-amber-100 dark:border-amber-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">🌾</span>
                    Fresh Samples
                  </h4>
                  <div className="space-y-3">
                    {['Hand-picked premium grade', 'Properly packaged & labeled', 'Moisture-sealed containers', 'Harvest/processing date', 'Storage instructions'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 dark:border-orange-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">📄</span>
                    Documentation
                  </h4>
                  <div className="space-y-3">
                    {['Product specifications sheet', 'Quality test results', 'Pricing information', 'Bulk order form', 'Company profile'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                ⭐
              </motion.span>
              What Sample Recipients Say
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: 'Ahmed Al-Rashid',
                  company: 'Dubai Grain Trading',
                  country: '🇦🇪 UAE',
                  rating: 5,
                  text: 'The teff quality exceeded our expectations. We immediately placed a bulk order for 10 tons!',
                  image: '👨‍💼'
                },
                {
                  name: 'Sarah Johnson',
                  company: 'UK Organic Grains',
                  country: '🇬🇧 UK',
                  rating: 5,
                  text: 'Professional packaging, excellent purity. The documentation made our import process smooth.',
                  image: '👩‍💼'
                },
                {
                  name: 'Mohammed Hassan',
                  company: 'Saudi Grain Co.',
                  country: '🇸🇦 Saudi Arabia',
                  rating: 5,
                  text: 'Best sample service in the industry. Fast delivery and premium quality grains & legumes.',
                  image: '👨‍💼'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-yellow-100 dark:border-yellow-900">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-5xl">{testimonial.image}</div>
                        <div>
                          <h5 className="font-bold">{testimonial.name}</h5>
                          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                          <p className="text-xs">{testimonial.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            className="text-yellow-500"
                          >
                            ⭐
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Ready to Try Our Premium Grains & Legumes?</h3>
                <p className="mb-6 text-amber-100">Order a sample pack today and experience the quality yourself!</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-amber-600 hover:bg-gray-100"
                    onClick={() => setIsSampleOrderOpen(true)}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Request Sample
                  </Button>
                  <Link href="tel:+251954742383">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Phone className="h-5 w-5 mr-2" />
                      Call Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Ethiopian Grains & Legumes */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {['🇪🇹', '🌾', '🏔️', '☀️', '💧', '🌱', '🏆', '💰'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl"
              animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6
              }}
              style={{ left: `${5 + i * 12}%`, top: `${(i * 20) % 70}%` }}
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-7xl"
              >
                🇪🇹
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl"
              >
                🌾
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Why Choose Ethiopian Grains & Legumes?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique advantages that make Ethiopia the ideal source for premium grains and legumes
            </p>
          </motion.div>

          {/* Unique Selling Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                ⭐
              </motion.span>
              Unique Advantages
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🏔️',
                  title: 'Highland Altitude',
                  desc: '1,500-3,000m elevation creates perfect growing conditions',
                  stat: '2,500m',
                  statLabel: 'Avg. Altitude'
                },
                {
                  icon: '☀️',
                  title: 'Year-Round Sunshine',
                  desc: '12+ hours daily sunlight for optimal growth',
                  stat: '12hrs',
                  statLabel: 'Daily Sun'
                },
                {
                  icon: '💧',
                  title: 'Natural Irrigation',
                  desc: 'Abundant rainfall and river systems',
                  stat: '1,200mm',
                  statLabel: 'Annual Rain'
                },
                {
                  icon: '🌡️',
                  title: 'Perfect Climate',
                  desc: 'Moderate temperatures ideal for cultivation',
                  stat: '15-25°C',
                  statLabel: 'Temperature'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-800 hover:shadow-2xl hover:border-amber-400 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2 text-amber-700 dark:text-amber-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                        <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{item.stat}</div>
                        <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ancient Heritage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🏛️
              </motion.span>
              Ancient Agricultural Heritage
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: '🌾',
                  title: 'Origin of Teff',
                  points: ['Exclusive to Ethiopia', 'Ancient grain superfood', 'Gluten-free nutrition', 'Global demand growing']
                },
                {
                  icon: '📜',
                  title: '10,000+ Years',
                  points: ['Cradle of agriculture', 'Traditional knowledge', 'Proven farming methods', 'Genetic diversity']
                },
                {
                  icon: '🌍',
                  title: 'Biodiversity Hotspot',
                  points: ['Indigenous varieties', 'Unique gene pools', 'Climate-adapted crops', 'Rare legume species']
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 hover:shadow-2xl hover:border-green-400 transition-all">
                    <CardContent className="p-6">
                      <motion.div
                        className="text-5xl mb-4 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-4 text-center text-green-700 dark:text-green-400">{item.title}</h4>
                      <div className="space-y-2">
                        {item.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
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

          {/* Soil Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🌱
              </motion.span>
              Superior Soil Quality
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="text-6xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      🏔️
                    </motion.div>
                    <h4 className="font-bold text-2xl text-orange-700 dark:text-orange-400">Volcanic Soil</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Rich in minerals & nutrients',
                      'Excellent water retention',
                      'Natural pH balance (6.0-7.0)',
                      'High organic matter content',
                      'Superior drainage properties'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="text-6xl"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🌿
                    </motion.div>
                    <h4 className="font-bold text-2xl text-emerald-700 dark:text-emerald-400">Organic Practices</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Minimal chemical usage',
                      'Natural pest management',
                      'Crop rotation systems',
                      'Composting & green manure',
                      'Sustainable farming methods'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Competitive Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                💰
              </motion.span>
              Competitive Pricing vs Other Origins
            </h3>
            
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-amber-800 mb-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    {[
                      { label: 'Labor Costs', saving: '40-60%', icon: '👷' },
                      { label: 'Land Costs', saving: '50-70%', icon: '🏞️' },
                      { label: 'Water Costs', saving: '60-80%', icon: '💧' },
                      { label: 'Processing', saving: '30-50%', icon: '⚙️' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="text-5xl mb-3"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="text-3xl font-bold text-amber-700 dark:text-amber-400 mb-2">{item.saving}</div>
                        <div className="text-sm text-muted-foreground">Lower {item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'vs. European Suppliers',
                    savings: '25-35%',
                    flag: '🇪🇺',
                    benefits: ['Lower production costs', 'Favorable exchange rates', 'Reduced overhead'],
                    color: 'from-blue-500 to-indigo-500'
                  },
                  {
                    title: 'vs. Asian Suppliers',
                    savings: '15-25%',
                    flag: '🌏',
                    benefits: ['Better quality standards', 'Shorter shipping to EU/ME', 'Reliable supply chain'],
                    color: 'from-amber-500 to-orange-500'
                  },
                  {
                    title: 'vs. American Suppliers',
                    savings: '30-40%',
                    flag: '🌎',
                    benefits: ['Significantly lower costs', 'Competitive freight rates', 'Growing season advantage'],
                    color: 'from-green-500 to-emerald-500'
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
                    <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${comparison.color}`}></div>
                      <CardContent className="p-6">
                        <div className="text-6xl mb-3 text-center">{comparison.flag}</div>
                        <h4 className="font-bold text-lg mb-2 text-center">{comparison.title}</h4>
                        <div className="text-center mb-4">
                          <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800">
                            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{comparison.savings}</div>
                            <div className="text-xs text-muted-foreground">Average Cost Savings</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {comparison.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 max-w-4xl mx-auto">
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-8xl"
                  >
                    🏆
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-3">Experience the Ethiopian Advantage</h3>
                    <p className="text-lg text-amber-50 mb-6">
                      Join leading importers worldwide who trust Ethiopian grains & legumes for quality and value
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Link href="/rfq">
                        <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                          <FileText className="mr-2 h-5 w-5" />
                          Request Quote
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                          <Mail className="mr-2 h-5 w-5" />
                          Contact Us Today
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator/Estimator */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['💰', '📊', '🧮', '💵', '📈', '✨'].map((icon, i) => (
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
              style={{ left: `${i * 15}%`, top: `${(i * 25) % 70}%` }}
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
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl"
              >
                💰
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                🧮
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Instant Price Estimator
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a rough quote instantly! Select your product, quantity, and destination
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                      📊
                    </motion.span>
                    Calculate Your Estimate
                  </h3>

                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Pricing calculation for grains/legumes (per ton)
                    const basePrice = selectedGrain === 'teff' ? 1000 : 
                                     selectedGrain === 'sesame' ? 1400 : 
                                     selectedGrain === 'lentils' ? 750 : 
                                     selectedGrain === 'chickpeas' ? 900 : 
                                     selectedGrain === 'wheat' ? 325 : 
                                     selectedGrain === 'beans' ? 800 : 600;
                    
                    const qty = parseFloat(quantity) || 0;
                    const shippingCost = shippingMethod === 'air' ? 300 : shippingMethod === 'land' ? 100 : 150;
                    const destinationMultiplier = destination === 'europe' ? 1.2 : 
                                                 destination === 'middle-east' ? 1.0 : 
                                                 destination === 'asia' ? 1.1 : 
                                                 destination === 'africa' ? 0.9 : 1.0;
                    
                    const total = (basePrice * qty + (shippingCost * qty)) * destinationMultiplier;
                    setEstimatedPrice(Math.round(total));
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="grain" className="text-base font-semibold">
                        Select Grain/Legume *
                      </Label>
                      <Select value={selectedGrain} onValueChange={setSelectedGrain} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose a product..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teff">🌾 Teff ($800-1200/ton)</SelectItem>
                          <SelectItem value="sesame">🌻 White Sesame ($1200-1800/ton)</SelectItem>
                          <SelectItem value="lentils">🫘 Red Lentils ($600-900/ton)</SelectItem>
                          <SelectItem value="chickpeas">🫘 Chickpeas ($700-1100/ton)</SelectItem>
                          <SelectItem value="wheat">🌾 Wheat ($250-400/ton)</SelectItem>
                          <SelectItem value="beans">🫘 Haricot Beans ($650-950/ton)</SelectItem>
                          <SelectItem value="soybeans">🌻 Soybeans ($500-750/ton)</SelectItem>
                          <SelectItem value="peanuts">🥜 Groundnuts ($900-1400/ton)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-base font-semibold">
                        Quantity (Tons) *
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 20"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="5"
                        step="5"
                        className="h-12"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Minimum order: 5-20 tons (varies by product)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-base font-semibold">
                        Destination *
                      </Label>
                      <Select value={destination} onValueChange={setDestination} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select destination..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="middle-east">🇦🇪 Middle East (UAE, Saudi, etc.)</SelectItem>
                          <SelectItem value="europe">🇪🇺 Europe (UK, Germany, etc.)</SelectItem>
                          <SelectItem value="asia">🌏 Asia (China, India, etc.)</SelectItem>
                          <SelectItem value="africa">🌍 Africa (Kenya, Egypt, etc.)</SelectItem>
                          <SelectItem value="americas">🌎 Americas (USA, Canada, etc.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Shipping Method *</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Card 
                          className={`cursor-pointer transition-all ${shippingMethod === 'sea' ? 'border-2 border-orange-600 bg-orange-50 dark:bg-orange-950' : 'border-2 hover:border-orange-300'}`}
                          onClick={() => setShippingMethod('sea')}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-2">🚢</div>
                            <div className="font-semibold">Sea Freight</div>
                            <div className="text-xs text-muted-foreground">Economical</div>
                          </CardContent>
                        </Card>
                        <Card 
                          className={`cursor-pointer transition-all ${shippingMethod === 'air' ? 'border-2 border-orange-600 bg-orange-50 dark:bg-orange-950' : 'border-2 hover:border-orange-300'}`}
                          onClick={() => setShippingMethod('air')}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-2">✈️</div>
                            <div className="font-semibold">Air Freight</div>
                            <div className="text-xs text-muted-foreground">Fast</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💰
                      </motion.span>
                      <span className="ml-2">Calculate Estimate</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Estimated Price Display */}
              <Card className="border-2 border-green-200 dark:border-green-800 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                      📈
                    </motion.span>
                    Your Estimate
                  </h3>
                  
                  {estimatedPrice !== null ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                        ${estimatedPrice.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Estimated Total Cost (USD)</p>
                      
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-left">
                            <div className="text-muted-foreground">Product:</div>
                            <div className="font-semibold capitalize">{selectedGrain}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-muted-foreground">Quantity:</div>
                            <div className="font-semibold">{quantity} tons</div>
                          </div>
                          <div className="text-left">
                            <div className="text-muted-foreground">Shipping:</div>
                            <div className="font-semibold capitalize">{shippingMethod}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-muted-foreground">Destination:</div>
                            <div className="font-semibold capitalize">{destination.replace('-', ' ')}</div>
                          </div>
                        </div>
                      </div>

                      <Link href="/rfq">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Mail className="h-4 w-4 mr-2" />
                          Request Official Quote
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        🧮
                      </motion.div>
                      <p className="text-muted-foreground">
                        Fill in the form to get your instant estimate
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Important Notes
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>This is a rough estimate for planning purposes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Final prices may vary based on season, quality grade, and market conditions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Customs duties and local taxes not included</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Contact us for official quotation and bulk discounts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Use This Tool */}
              <Card className="border-2 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Why Use This Tool?
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Quick budget planning',
                      'Compare different products',
                      'Understand shipping costs',
                      'No commitment required',
                      'Instant results'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['🤝', '🌍', '💼', '🏆', '📈', '⭐', '💰', '🎯'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-9xl"
              animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6
              }}
              style={{ left: `${5 + i * 12}%`, top: `${(i * 20) % 70}%` }}
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl"
              >
                🤝
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl"
              >
                💼
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Partnership Opportunities
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join our global network of distributors and grow your business with exclusive benefits
            </p>
          </motion.div>

          {/* Become a Distributor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                🌍
              </motion.span>
              Become a Distributor
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {[
                {
                  icon: '📋',
                  title: 'Apply',
                  desc: 'Submit your application with business details',
                  step: '1'
                },
                {
                  icon: '🔍',
                  title: 'Review',
                  desc: 'We evaluate your market potential and capabilities',
                  step: '2'
                },
                {
                  icon: '✅',
                  title: 'Partner',
                  desc: 'Sign agreement and start receiving exclusive benefits',
                  step: '3'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="h-full border-2 border-amber-200 dark:border-amber-800 hover:shadow-2xl transition-all relative overflow-hidden">
                    <div className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2 text-amber-700 dark:text-amber-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/partnership">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Apply for Partnership
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Long-term Contract Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🏆
              </motion.span>
              Long-term Contract Benefits
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: '💰',
                  title: 'Priority Pricing',
                  desc: 'Locked-in rates protected from market fluctuations',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: '📦',
                  title: 'Guaranteed Supply',
                  desc: 'Reserved inventory even during peak seasons',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: '🚚',
                  title: 'Flexible Logistics',
                  desc: 'Customized shipping schedules and consolidation',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  icon: '🎯',
                  title: 'Marketing Support',
                  desc: 'Co-branded materials and promotional assistance',
                  color: 'from-amber-500 to-yellow-500'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Volume Discount Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                📈
              </motion.span>
              Volume Discount Tiers
            </h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  tier: 'Bronze',
                  volume: '10-25 tons/month',
                  discount: '5%',
                  icon: '🥉',
                  color: 'from-orange-400 to-orange-600',
                  benefits: ['Standard pricing', 'Monthly invoicing', 'Email support']
                },
                {
                  tier: 'Silver',
                  volume: '25-50 tons/month',
                  discount: '10%',
                  icon: '🥈',
                  color: 'from-gray-400 to-gray-600',
                  benefits: ['Priority pricing', 'Flexible payment', 'Phone support', 'Quarterly reviews']
                },
                {
                  tier: 'Gold',
                  volume: '50-100 tons/month',
                  discount: '15%',
                  icon: '🥇',
                  color: 'from-yellow-400 to-yellow-600',
                  benefits: ['Best pricing', 'Extended credit', 'Dedicated manager', 'Monthly reviews', 'Marketing support'],
                  popular: true
                },
                {
                  tier: 'Platinum',
                  volume: '100+ tons/month',
                  discount: '20%+',
                  icon: '💎',
                  color: 'from-purple-400 to-purple-600',
                  benefits: ['Custom pricing', 'Exclusive terms', 'VIP support', 'Weekly reviews', 'Full marketing', 'Territory rights']
                }
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className={`h-full border-2 ${tier.popular ? 'border-yellow-500 dark:border-yellow-400 shadow-2xl' : 'border-gray-200 dark:border-gray-700'} hover:shadow-2xl transition-all relative overflow-hidden`}>
                    {tier.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    )}
                    <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-3"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {tier.icon}
                      </motion.div>
                      <h4 className="font-bold text-2xl mb-2">{tier.tier}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{tier.volume}</p>
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                        {tier.discount}
                      </div>
                      <div className="text-xs text-muted-foreground mb-4">Discount</div>
                      <div className="space-y-2 text-left">
                        {tier.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Exclusive Territory Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                🗺️
              </motion.span>
              Exclusive Territory Rights
            </h3>
            <div className="max-w-5xl mx-auto">
              <Card className="border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-2xl mb-4 flex items-center gap-2">
                        <span className="text-4xl">🎯</span>
                        What You Get
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Exclusive distribution rights in your territory',
                          'Protection from competing distributors',
                          'First access to new products',
                          'Territory-specific marketing materials',
                          'Local market insights and support',
                          'Renewable contract terms'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-2xl mb-4 flex items-center gap-2">
                        <span className="text-4xl">📋</span>
                        Requirements
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Minimum 50 tons/month commitment',
                          'Established distribution network',
                          'Proper storage facilities',
                          'Import license and certifications',
                          'Financial stability verification',
                          '2-year minimum contract'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl"
                      >
                        🌟
                      </motion.div>
                      <div>
                        <h5 className="font-bold text-lg mb-2">Available Territories</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          We're currently seeking exclusive distributors in:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', '🇮🇹 Italy', '🇪🇸 Spain', '🇳🇱 Netherlands', '🇸🇦 Saudi Arabia', '🇦🇪 UAE', '🇶🇦 Qatar', '🇰🇼 Kuwait', '🇨🇳 China', '🇯🇵 Japan'].map((territory, idx) => (
                            <span key={idx} className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm border border-orange-200 dark:border-orange-800">
                              {territory}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white border-0 max-w-4xl mx-auto shadow-2xl">
              <CardContent className="p-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  🤝
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h3>
                <p className="text-lg text-amber-50 mb-6 max-w-2xl mx-auto">
                  Join our network of successful distributors and unlock exclusive benefits, competitive pricing, and territory rights
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      alert('Partnership Guide PDF will be downloaded. In production, this would download a real PDF file.');
                    }}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Partnership Guide
                  </Button>
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Schedule a Call
                    </Button>
                  </Link>
                  <Link href="/partnership">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Contact Partnership Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎥 Our Process</h2>
            <p className="text-lg text-muted-foreground">From field to export container</p>
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
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-amber-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-amber-600">
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

      {/* Certifications */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-amber-600 mx-auto mb-4" />
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
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-amber-200 dark:border-amber-800">
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's prime agricultural zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-amber-50 dark:bg-amber-950 rounded-2xl p-4 md:p-8 mb-8"
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
                        ? 'ring-2 ring-amber-600 shadow-xl scale-105' 
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
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
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
            <p className="text-lg text-muted-foreground">Trusted by importers across 25+ countries worldwide</p>
          </motion.div>

          {/* Global Reach Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-2 border-amber-200 dark:border-amber-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">🌍 Our Global Export Network</h3>
                  <p className="text-muted-foreground">Connecting Ethiopian grains to markets worldwide</p>
                </div>

                {/* Simple Grid Layout */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* GCC Countries */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-orange-600">🕌 GCC Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇦🇪', name: 'United Arab Emirates', volume: 'High' },
                        { flag: '🇸🇦', name: 'Saudi Arabia', volume: 'High' },
                        { flag: '🇴🇲', name: 'Oman', volume: 'Medium' },
                        { flag: '🇶🇦', name: 'Qatar', volume: 'Medium' },
                        { flag: '🇰🇼', name: 'Kuwait', volume: 'Medium' },
                      ].map((country, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <Card className="hover:shadow-lg transition-all cursor-pointer">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-3xl">{country.flag}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{country.name}</div>
                                <div className={`text-xs ${country.volume === 'High' ? 'text-green-600' : 'text-blue-600'}`}>
                                  {country.volume} Volume
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* European Countries */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-blue-600">🇪🇺 European Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇳🇱', name: 'Netherlands', volume: 'High' },
                        { flag: '🇬🇧', name: 'United Kingdom', volume: 'Medium' },
                        { flag: '🇩🇪', name: 'Germany', volume: 'Medium' },
                        { flag: '🇫🇷', name: 'France', volume: 'Growing' },
                        { flag: '🇧🇪', name: 'Belgium', volume: 'Growing' },
                      ].map((country, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <Card className="hover:shadow-lg transition-all cursor-pointer">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-3xl">{country.flag}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{country.name}</div>
                                <div className={`text-xs ${country.volume === 'High' ? 'text-green-600' : country.volume === 'Medium' ? 'text-blue-600' : 'text-orange-600'}`}>
                                  {country.volume} Volume
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Asian Countries */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-red-600">🌏 Asian Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇮🇳', name: 'India', volume: 'High' },
                        { flag: '🇨🇳', name: 'China', volume: 'High' },
                        { flag: '🇸🇬', name: 'Singapore', volume: 'Medium' },
                        { flag: '🇯🇵', name: 'Japan', volume: 'Growing' },
                        { flag: '🇰🇷', name: 'South Korea', volume: 'Growing' },
                      ].map((country, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, x: -5 }}
                        >
                          <Card className="hover:shadow-lg transition-all cursor-pointer">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-3xl">{country.flag}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{country.name}</div>
                                <div className={`text-xs ${country.volume === 'High' ? 'text-green-600' : 'text-orange-600'}`}>
                                  {country.volume} Volume
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ethiopia at Center */}
                <motion.div
                  className="mt-8 text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-700 text-white px-8 py-4 rounded-full shadow-2xl">
                    <span className="text-4xl">🇪🇹</span>
                    <div className="text-left">
                      <div className="font-bold text-lg">Ethiopia</div>
                      <div className="text-sm text-amber-100">Origin of Premium Grains & Legumes</div>
                    </div>
                  </div>
                </motion.div>
                <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">25+</div>
                      <div className="text-sm text-amber-100">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">4</div>
                      <div className="text-sm text-amber-100">Continents</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">1000+</div>
                      <div className="text-sm text-amber-100">Tons/Month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm text-amber-100">On-Time Delivery</div>
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
                { flag: '🇨🇳', name: 'China', region: 'Asia', volume: 'High' }
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="hover:shadow-xl transition-all border-2 border-amber-100 dark:border-amber-900 cursor-pointer">
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
                    'Moisture content verification',
                    'Premium quality focus'
                  ],
                  specialties: ['White Sesame', 'Teff', 'Chickpeas'],
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
                    'Aflatoxin testing',
                    'Sustainability focus'
                  ],
                  specialties: ['Organic Teff', 'Lentils', 'Quinoa'],
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Markets',
                  icon: '🌏',
                  countries: 'India, China, Singapore, Japan',
                  requirements: [
                    'Competitive pricing',
                    'Bulk quantities',
                    'Flexible packaging',
                    'Quick turnaround',
                    'Local language docs'
                  ],
                  specialties: ['Sesame Seeds', 'Soybeans', 'Niger Seeds'],
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${market.color}`}></div>
                    <CardContent className="p-6">
                      <div className="text-6xl mb-3 text-center">{market.icon}</div>
                      <h4 className="font-bold text-xl mb-2 text-center text-amber-700 dark:text-amber-400">{market.region}</h4>
                      <p className="text-xs text-center text-muted-foreground mb-4 italic">{market.countries}</p>
                      
                      <div className="mb-4">
                        <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-amber-600" />
                          Requirements:
                        </div>
                        <ul className="space-y-1">
                          {market.requirements.map((req, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2">
                              <span className="text-amber-600 mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-3">
                        <div className="font-semibold text-sm mb-2">Popular Products:</div>
                        <div className="flex flex-wrap gap-1">
                          {market.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
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
                  client: 'Dubai Grain Traders',
                  story: 'Supplied 100 tons of premium white sesame monthly for 3 years. Our consistent quality helped them become the leading sesame distributor in the UAE.',
                  products: ['White Sesame', 'Teff', 'Chickpeas'],
                  achievement: '300% growth in orders',
                  duration: '3+ years partnership',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  region: 'European Success',
                  flag: '🇳🇱',
                  client: 'Amsterdam Organic Grains',
                  story: 'First Ethiopian supplier to meet their strict organic standards. Now supplying 50 tons monthly of certified organic teff to major EU health food retailers.',
                  products: ['Organic Teff', 'Red Lentils', 'Quinoa'],
                  achievement: 'EU Organic Certified',
                  duration: '2+ years partnership',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Success',
                  flag: '🇨🇳',
                  client: 'Shanghai Sesame Imports',
                  story: 'Competitive pricing and bulk supply capabilities won us this major contract. Supplying 200+ tons of sesame seeds monthly to Chinese oil processing industry.',
                  products: ['Sesame Seeds', 'Soybeans', 'Niger Seeds'],
                  achievement: '200+ tons monthly',
                  duration: '4+ years partnership',
                  color: 'from-red-500 to-pink-500'
                },
                {
                  region: 'Middle East Success',
                  flag: '🇸🇦',
                  client: 'Riyadh Food Distributors',
                  story: 'Started with a 10-ton trial order, now our largest client in Saudi Arabia. Our premium teff is their bestselling specialty grain across 30+ retail locations.',
                  products: ['Teff', 'Lentils', 'Wheat'],
                  achievement: '30+ retail locations',
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${success.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{success.flag}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-amber-700 dark:text-amber-400 mb-1">{success.region}</h4>
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-amber-600 mx-auto mb-4" />
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
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-amber-100 dark:border-amber-900">
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
                { step: 1, icon: '🌾', title: 'Harvest', desc: 'Optimal maturity picking' },
                { step: 2, icon: '🚜', title: 'Transport', desc: 'Quick farm-to-facility' },
                { step: 3, icon: '🧹', title: 'Cleaning', desc: 'Remove impurities' },
                { step: 4, icon: '✅', title: 'Sorting', desc: 'Grade by size & quality' },
                { step: 5, icon: '📦', title: 'Packing', desc: 'Export-grade bags' },
                { step: 6, icon: '🏭', title: 'Storage', desc: 'Moisture-controlled' },
                { step: 7, icon: '🚢', title: 'Export', desc: 'Container shipping' }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all border-2 border-amber-100 dark:border-amber-900">
                    <CardContent className="p-4">
                      <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto mb-2 font-bold">
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Flexible Packaging Options</h2>
            <p className="text-lg text-muted-foreground">Customized packaging to meet your market requirements</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: '📦', 
                name: 'PP Bags', 
                desc: '25kg, 50kg standard sizes',
                features: ['Durable', 'Moisture-proof', 'Stackable']
              },
              { 
                icon: '🧺', 
                name: 'Jute Sacks', 
                desc: '50kg, 100kg options',
                features: ['Breathable', 'Eco-friendly', 'Traditional']
              },
              { 
                icon: '🎁', 
                name: 'Retail Packs', 
                desc: '500g, 1kg, 2kg packs',
                features: ['Consumer Ready', 'Labeled', 'Attractive']
              },
              { 
                icon: '🚚', 
                name: 'Bulk Containers', 
                desc: 'Large volume orders',
                features: ['Cost Effective', 'Industrial', 'Efficient']
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-amber-100 dark:border-amber-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3">{pkg.icon}</div>
                    <h3 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
                    <div className="space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-amber-600" />
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
            <Truck className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚚 Shipping & Logistics</h2>
            <p className="text-lg text-muted-foreground">Multiple shipping options to suit your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '✈️',
                method: 'Air Freight',
                time: '3-5 days',
                best: 'Urgent orders, premium products',
                features: ['Fastest delivery', 'Temperature controlled', 'Premium quality', 'Higher cost'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🚢',
                method: 'Sea Freight',
                time: '20-35 days',
                best: 'Large volumes, bulk orders',
                features: ['Cost effective', 'Bulk orders', 'Container loads', 'Economical'],
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: '🚛',
                method: 'Land Transport',
                time: '1-7 days',
                best: 'Regional deliveries',
                features: ['Flexible routes', 'Door-to-door', 'Regional markets', 'Quick turnaround'],
                color: 'from-green-500 to-emerald-500'
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
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-amber-100 dark:border-amber-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${shipping.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4 text-center">{shipping.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-amber-700 dark:text-amber-400">{shipping.method}</h3>
                    <div className="text-center mb-4">
                      <div className="inline-block bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-sm font-semibold text-amber-700 dark:text-amber-400">
                        {shipping.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 text-center italic">Best for: {shipping.best}</p>
                    <div className="space-y-2">
                      {shipping.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
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
                name: 'Ahmed Al-Mansouri',
                company: 'Dubai Grain Traders',
                country: '🇦🇪 UAE',
                text: 'Exceptional quality sesame seeds! The white Humera variety is the best we\'ve sourced. Hafa Trading is now our exclusive supplier.',
                rating: 5
              },
              {
                name: 'Hans Mueller',
                company: 'Berlin Organic Foods',
                country: '🇩🇪 Germany',
                text: 'Reliable partner for Ethiopian teff. Organic certification and quality control are excellent. Highly recommend for European markets.',
                rating: 5
              },
              {
                name: 'Li Wei',
                company: 'Shanghai Sesame Co.',
                country: '🇨🇳 China',
                text: 'Best quality sesame seeds at competitive prices. Consistent supply and professional service. Great for bulk orders.',
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-amber-100 dark:border-amber-900">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-amber-700 dark:text-amber-400">{testimonial.name}</p>
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
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
                a: 'MOQ varies by product: typically 5-20 tons for grains and legumes. Contact us for specific requirements.'
              },
              {
                q: 'How do you ensure quality during storage and transport?',
                a: 'We use moisture-controlled storage facilities and proper packaging. Container loads are sealed and monitored throughout transit.'
              },
              {
                q: 'What certifications do you provide?',
                a: 'Phytosanitary certificate, Certificate of Origin, Quality analysis (moisture, purity, protein), and Organic certification (where applicable).'
              },
              {
                q: 'Can you provide samples?',
                a: 'Yes! We can send samples via air courier (1-2kg). Sample costs are deductible from first commercial order.'
              },
              {
                q: 'What are your payment terms?',
                a: 'We accept T/T, L/C at sight, and can discuss flexible terms for established clients and long-term contracts.'
              },
              {
                q: 'Which ports do you ship from?',
                a: 'Primarily from Djibouti Port (sea freight). We can arrange inland transport from our warehouses in Ethiopia.'
              },
              {
                q: 'Do you offer organic certified products?',
                a: 'Yes, we have organic certified teff, lentils, and other products. EU and USDA organic certifications available.'
              },
              {
                q: 'What is the typical lead time?',
                a: 'Processing and loading: 7-14 days. Sea freight: 20-35 days depending on destination. Air freight: 3-5 days.'
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
                    <h3 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400 flex items-start gap-2">
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Grains & Legumes?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Bulk orders available for wholesalers and processors
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-amber-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-amber-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-amber-600">
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
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Price Range</div>
                      <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{selectedProduct.price}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Quality Grade</div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">{selectedProduct.grade}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Leaf className="h-5 w-5 text-amber-600 mt-1" />
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
                      <Package className="h-5 w-5 text-amber-600 mt-1" />
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
                      <Scale className="h-5 w-5 text-amber-600 mt-1" />
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
                      <ShieldCheck className="h-5 w-5 text-amber-600" />
                      <div className="font-semibold">Specifications</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedProduct.details.specifications}</p>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <div>
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    Key Benefits
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.details.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-amber-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Link href="/rfq" className="flex-1">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
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
            alert('Sample order request submitted! We will contact you within 24 hours to confirm shipping details.');
            setIsSampleOrderOpen(false);
          }}>
            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border-2 border-amber-200 dark:border-amber-800">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">✨</span>
                {selectedSamplePack ? `${selectedSamplePack} Selected` : 'Sample Pack Benefits'}
              </h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  <span>Premium quality samples</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  <span>Express courier delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  <span>Full documentation included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  <span>Quality test certificates</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name *</label>
                  <Input placeholder="Your Company Ltd" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input type="email" placeholder="contact@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input placeholder="+1 XXX XXX XXXX" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <Input placeholder="United States" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sample Pack Type *</label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    value={selectedSamplePack}
                    onChange={(e) => setSelectedSamplePack(e.target.value)}
                    required
                  >
                    <option value="">Select pack...</option>
                    <option value="Basic Pack">Basic Pack - $49</option>
                    <option value="Premium Pack">Premium Pack - $89</option>
                    <option value="Custom Pack">Custom Pack - Custom Price</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Products Interested In *</label>
                <Input placeholder="e.g., Teff, Red Lentils, Sesame Seeds" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                <Textarea 
                  placeholder="Full shipping address including postal code..."
                  rows={3}
                  className="resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <Textarea 
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h4 className="font-bold mb-2 text-sm">📋 Next Steps:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• We'll review your request within 24 hours</li>
                <li>• Confirm sample pack details and shipping</li>
                <li>• Send payment invoice for sample fee</li>
                <li>• Ship samples via express courier</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsSampleOrderOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
