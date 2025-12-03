'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, Package, Play, MapPin, Award, Download, Phone, Mail, MessageCircle, FileText, Info, Leaf, ThermometerSnowflake, Calendar, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
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

export default function HerbsSpicesPage() {
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

      {/* From Farm to Export - Our Process */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['🌿', '➡️', '📦', '✨', '🚜', '🏆'].map((icon, i) => (
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
                🌿
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-orange-600 to-green-600 bg-clip-text text-transparent">
              From Farm to Export - Our Process
            </h2>
            <p className="text-lg text-muted-foreground">See the transformation from harvest to premium export-ready herbs & spices</p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: 1,
                icon: '🌱',
                title: 'Harvest',
                desc: 'Fresh herbs picked at peak aroma, spices harvested at optimal maturity',
                color: 'from-green-500 to-emerald-500'
              },
              {
                step: 2,
                icon: '☀️',
                title: 'Drying & Processing',
                desc: 'Traditional sun-drying or controlled dehydration to preserve natural properties',
                color: 'from-orange-500 to-amber-500'
              },
              {
                step: 3,
                icon: '🔬',
                title: 'Quality Testing',
                desc: 'Lab analysis for purity, moisture content, and essential oil levels',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: 4,
                icon: '✅',
                title: 'Sorting & Grading',
                desc: 'Manual inspection and grading by size, color, and quality standards',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: 5,
                icon: '📦',
                title: 'Hygienic Packaging',
                desc: 'Food-grade, moisture-proof packaging with tamper-evident sealing',
                color: 'from-red-500 to-rose-500'
              },
              {
                step: 6,
                icon: '✈️',
                title: 'Export',
                desc: 'Temperature-controlled storage and fast shipping to global markets',
                color: 'from-indigo-500 to-blue-500'
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
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-purple-100 dark:border-purple-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${process.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                        {process.step}
                      </div>
                      <div className="text-5xl">{process.icon}</div>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">{process.title}</h3>
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
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
                  <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                    <div className={`h-2 bg-gradient-to-r ${item.color || 'from-purple-500 to-orange-500'}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-5xl">{item.emoji}</span>
                        <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">{item.productName}</h3>
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
                          <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            AFTER
                          </div>
                          <Card className="h-full bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800">
                            <CardContent className="p-6">
                              {item.afterImageUrl ? (
                                <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-purple-300">
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
                                    <CheckCircle className="w-4 h-4 text-purple-600" />
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
                  <p>No before & after items yet. <Link href="/admin/product-gallery" className="text-purple-600 hover:underline">Add from admin panel</Link></p>
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
                { icon: '🌡️', title: 'Temperature Control', desc: 'Proper storage conditions' },
                { icon: '⚖️', title: 'Weight Verification', desc: 'Accurate measurements' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all border-2 border-purple-100 dark:border-purple-900">
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

          {/* Our Facilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated Background Icons */}
            <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
              {['🏭', '🌾', '❄️', '🚚', '⚙️', '🔧'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-8xl"
                  animate={{
                    y: [0, -25, 0],
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 7 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4
                  }}
                  style={{ left: `${5 + i * 16}%`, top: `${(i * 30) % 60}%` }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-8 relative z-10">
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
                  ❄️
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                Our Facilities
              </h3>
            </div>

            {loadingGallery ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
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
                    <Card className="h-full hover:shadow-2xl transition-all border-2 border-purple-100 dark:border-purple-900">
                      <CardContent className="p-6">
                        <div className="relative mb-6 group">
                          <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 dark:from-purple-950 dark:to-orange-950 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
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
                          <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-2xl shadow-xl border-2 border-purple-200 dark:border-purple-700">
                            {facility.emoji}
                          </div>
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">{facility.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{facility.description}</p>
                        <div className="space-y-2">
                          {facility.facilityFeatures?.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
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
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p>No facilities yet. <Link href="/admin/product-gallery" className="text-purple-600 hover:underline">Add from admin panel</Link></p>
                </CardContent>
              </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              Product Gallery
            </h2>
            <p className="text-lg text-muted-foreground">Real photos of our premium herbs & spices</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
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
                    <Card className="h-full border-2 border-purple-100 dark:border-purple-900 relative overflow-hidden">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-orange-50 to-purple-50 dark:from-purple-950 dark:via-orange-950 dark:to-purple-950 opacity-50"></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {category === 'Fresh Harvest' ? '🌱' : category === 'Processing' ? '⚙️' : '📦'}
                          </motion.div>
                          <h4 className="font-bold text-lg text-center text-purple-700 dark:text-purple-400">
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
                                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 dark:from-purple-950 dark:to-orange-950 flex items-center justify-center overflow-hidden relative">
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
                                      <h5 className="font-bold text-base mb-2 text-purple-700 dark:text-purple-400">{item.name}</h5>
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
            <Card className="inline-block bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-950 dark:to-orange-950 border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-3">Want to see more photos?</p>
                <Link href="/rfq">
                  <Button className="bg-purple-600 hover:bg-purple-700">
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
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Order Sample Packs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try before you buy! Get quality samples delivered to evaluate our premium herbs & spices
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
                { step: '1', icon: '📝', title: 'Choose Products', desc: 'Select herbs & spices you want to sample' },
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-purple-100 dark:border-purple-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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
                  price: '$59',
                  icon: '📦',
                  items: ['3 herb/spice types', '100g each', 'Standard shipping', '5-7 days delivery'],
                  color: 'from-purple-500 to-indigo-500'
                },
                {
                  name: 'Premium Pack',
                  price: '$99',
                  icon: '🎁',
                  items: ['5 herb/spice types', '250g each', 'Express shipping', '3-4 days delivery', 'Quality certificates'],
                  color: 'from-orange-500 to-pink-500',
                  popular: true
                },
                {
                  name: 'Custom Pack',
                  price: 'Custom',
                  icon: '⭐',
                  items: ['Your choice', 'Custom quantities', 'Priority shipping', '2-3 days delivery', 'Full documentation'],
                  color: 'from-red-500 to-rose-500'
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
                  <Card className={`h-full hover:shadow-2xl transition-all border-2 ${pack.popular ? 'border-purple-500 dark:border-purple-400' : 'border-gray-200 dark:border-gray-700'} relative overflow-hidden`}>
                    {pack.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
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
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                        {pack.price}
                      </div>
                      <div className="space-y-3 mb-6">
                        {pack.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
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
              <Card className="border-2 border-purple-100 dark:border-purple-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">🌿</span>
                    Fresh Samples
                  </h4>
                  <div className="space-y-3">
                    {['Hand-picked premium grade', 'Properly packaged & labeled', 'Aroma-sealed containers', 'Harvest/processing date', 'Storage instructions'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
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
                  company: 'Dubai Spice Trading',
                  country: '🇦🇪 UAE',
                  rating: 5,
                  text: 'The black cumin quality exceeded our expectations. We immediately placed a bulk order for 5 tons!',
                  image: '👨‍💼'
                },
                {
                  name: 'Sarah Johnson',
                  company: 'UK Organic Herbs',
                  country: '🇬🇧 UK',
                  rating: 5,
                  text: 'Professional packaging, excellent aroma. The documentation made our import process smooth.',
                  image: '👩‍💼'
                },
                {
                  name: 'Mohammed Hassan',
                  company: 'Saudi Spice Co.',
                  country: '🇸🇦 Saudi Arabia',
                  rating: 5,
                  text: 'Best sample service in the industry. Fast delivery and premium quality herbs & spices.',
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
            <Card className="bg-gradient-to-r from-purple-600 to-orange-600 text-white border-0 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Ready to Try Our Premium Herbs & Spices?</h3>
                <p className="mb-6 text-purple-100">Order a sample pack today and experience the quality yourself!</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    onClick={() => setIsSampleOrderOpen(true)}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Request Sample
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Ethiopian Herbs & Spices */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {['🇪🇹', '🌍', '🏔️', '☀️', '💧', '🌿', '🏆', '💰'].map((icon, i) => (
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
                🌿
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-orange-600 to-purple-700 bg-clip-text text-transparent">
              Why Choose Ethiopian Herbs & Spices?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique advantages that make Ethiopia the ideal source for premium herbs & spices
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
                  desc: '1,500-3,000m elevation creates intense aromas and high essential oil content',
                  stat: '2,500m',
                  statLabel: 'Avg. Altitude'
                },
                {
                  icon: '☀️',
                  title: 'Year-Round Sunshine',
                  desc: '12+ hours daily sunlight for optimal essential oil production',
                  stat: '12hrs',
                  statLabel: 'Daily Sun'
                },
                {
                  icon: '🌿',
                  title: 'Unique Varieties',
                  desc: 'Indigenous species like Tikur Azmud (black cumin) found nowhere else',
                  stat: '20+',
                  statLabel: 'Varieties'
                },
                {
                  icon: '🌡️',
                  title: 'Perfect Climate',
                  desc: 'Moderate temperatures ideal for herb and spice cultivation',
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl hover:border-purple-400 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                      <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-950 dark:to-orange-950 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                        <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{item.stat}</div>
                        <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quality Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🌟
              </motion.span>
              Quality Advantages
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: '🔥',
                  title: 'High Essential Oil Content',
                  points: ['Intense natural aroma', 'Superior flavor profile', 'Longer shelf life', 'Better value per kg']
                },
                {
                  icon: '🌱',
                  title: 'Organic Growing',
                  points: ['Minimal pesticide use', 'Natural soil fertility', 'Chemical-free processing', 'EU organic certified']
                },
                {
                  icon: '⚫',
                  title: 'Authentic Varieties',
                  points: ['Tikur Azmud (black cumin)', 'Ethiopian cardamom', 'Korarima (false cardamom)', 'Unique flavor profiles']
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 hover:shadow-2xl hover:border-orange-400 transition-all">
                    <CardContent className="p-6">
                      <motion.div
                        className="text-5xl mb-4 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-4 text-center text-orange-700 dark:text-orange-400">{item.title}</h4>
                      <div className="space-y-2">
                        {item.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
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

          {/* Economic Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                💰
              </motion.span>
              Economic Advantages
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="text-6xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      💵
                    </motion.div>
                    <h4 className="text-2xl font-bold text-green-700 dark:text-green-400">Competitive Pricing</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Lower production costs', value: '30-40% less' },
                      { label: 'Direct from source', value: 'No middlemen' },
                      { label: 'Bulk discounts', value: 'Volume pricing' },
                      { label: 'Stable currency', value: 'Predictable costs' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm font-bold text-green-700 dark:text-green-400">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="text-6xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🚚
                    </motion.div>
                    <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Logistics Benefits</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Strategic location', value: 'Africa-Asia-Europe' },
                      { label: 'Modern airports', value: 'Direct flights' },
                      { label: 'Djibouti port access', value: 'Sea freight' },
                      { label: 'Export experience', value: '50+ countries' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{item.value}</span>
                      </div>
                    ))}
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
            <Card className="bg-gradient-to-r from-purple-600 to-orange-600 text-white border-0 max-w-4xl mx-auto">
              <CardContent className="p-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  🇪🇹
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Experience Ethiopian Excellence</h3>
                <p className="text-xl mb-8 text-purple-100">
                  Join hundreds of satisfied importers who trust Ethiopian herbs & spices for their superior quality and value
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/rfq">
                    <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                      <FileText className="mr-2 h-5 w-5" />
                      Request Quote
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setIsSampleOrderOpen(true)}>
                    <Package className="mr-2 h-5 w-5" />
                    Order Samples
                  </Button>
                </div>
              </CardContent>
            </Card>
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

      {/* Photo Carousel - Facilities */}
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

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading...</p>
            </div>
          ) : facilityItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {facilityItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-purple-100 dark:border-purple-900">
                    <CardContent className="p-6">
                      {item.imageUrl ? (
                        <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ) : (
                        <div className="text-7xl mb-4 text-center">{item.emoji}</div>
                      )}
                      <h3 className="font-bold text-lg mb-2 text-center text-purple-700 dark:text-purple-400">{item.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">{item.description}</p>
                      {item.facilityFeatures && item.facilityFeatures.length > 0 && (
                        <div className="space-y-2">
                          {item.facilityFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>No facility photos yet. <Link href="/admin/product-gallery" className="text-purple-600 hover:underline">Add from admin panel</Link></p>
              </CardContent>
            </Card>
          )}
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

      {/* Sample Order Dialog */}
      <Dialog open={isSampleOrderOpen} onOpenChange={setIsSampleOrderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">📦</span>
              Order Sample Pack
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedSamplePack && (
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                <p className="text-sm text-muted-foreground">Selected Pack:</p>
                <p className="font-bold text-lg text-purple-700 dark:text-purple-400">{selectedSamplePack}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-name">Full Name *</Label>
                <Input id="s-name" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="s-company">Company Name *</Label>
                <Input id="s-company" placeholder="Your Company Ltd" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="s-email">Email *</Label>
                <Input id="s-email" type="email" placeholder="john@company.com" required />
              </div>
              <div>
                <Label htmlFor="s-phone">Phone *</Label>
                <Input id="s-phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div>
              <Label htmlFor="s-country">Country *</Label>
              <Select>
                <SelectTrigger id="s-country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">🇦🇪 United Arab Emirates</SelectItem>
                  <SelectItem value="saudi">🇸🇦 Saudi Arabia</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="usa">🇺🇸 United States</SelectItem>
                  <SelectItem value="india">🇮🇳 India</SelectItem>
                  <SelectItem value="other">🌍 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="s-address">Shipping Address *</Label>
              <Textarea 
                id="s-address" 
                placeholder="Full shipping address including postal code" 
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="s-products">Products Interested In *</Label>
              <Textarea 
                id="s-products" 
                placeholder="e.g., Black Cumin, Turmeric, Ginger, Fresh Herbs..." 
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="s-quantity">Expected Monthly Volume</Label>
              <Select>
                <SelectTrigger id="s-quantity">
                  <SelectValue placeholder="Select expected volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100-500">100-500 kg/month</SelectItem>
                  <SelectItem value="500-1000">500-1000 kg/month</SelectItem>
                  <SelectItem value="1000-5000">1-5 tons/month</SelectItem>
                  <SelectItem value="5000+">5+ tons/month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="s-notes">Additional Notes</Label>
              <Textarea 
                id="s-notes" 
                placeholder="Any special requirements or questions..." 
                rows={3}
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Sample fees are deductible from your first bulk order. We'll contact you within 24 hours to confirm details and arrange payment.
              </p>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Mail className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsSampleOrderOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
