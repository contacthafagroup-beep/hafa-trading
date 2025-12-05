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
import { ArrowLeft, CheckCircle, Package, Truck, Download, Play, MapPin, Award, FileText, Phone, Mail, MessageCircle, X, Info, Leaf, ThermometerSnowflake, Calendar, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryItem {
  id: string;
  section: string;
  category?: 'Fresh Harvest' | 'Processing' | 'Export Ready';
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
}

export default function FreshVegetablesPage() {
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
  
  // Pricing Calculator State
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingMethod, setShippingMethod] = useState('sea');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  // Partnership State
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);

  useEffect(() => {
    loadAllItems();
  }, []);

  const loadAllItems = async () => {
    try {
      if (!db) {
        setLoadingGallery(false);
        return;
      }
      console.log('Loading gallery items from Firestore...');
      const q = query(collection(db, 'productGallery'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      
      console.log('Total items loaded:', items.length);
      console.log('Items:', items);
      
      const gallery = items.filter(i => i.section === 'gallery');
      const beforeAfter = items.filter(i => i.section === 'beforeAfter');
      const facilities = items.filter(i => i.section === 'facilities');
      
      console.log('Gallery items:', gallery.length);
      console.log('Before/After items:', beforeAfter.length);
      console.log('Facility items:', facilities.length);
      
      setGalleryItems(gallery);
      setBeforeAfterItems(beforeAfter);
      setFacilityItems(facilities);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

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

      {/* Before & After Gallery */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['🌱', '➡️', '📦', '✨', '🚜', '🏆'].map((icon, i) => (
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
                🌱
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
              From Farm to Export - Our Process
            </h2>
            <p className="text-lg text-muted-foreground">See the transformation from harvest to premium export-ready products</p>
          </motion.div>

          {/* Before & After Comparisons */}
          <div className="space-y-8 mb-12">
            {loadingGallery ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-5xl">{item.emoji}</span>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">{item.productName}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
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
                        <div className="absolute -top-3 -right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                          AFTER
                        </div>
                        <Card className="h-full bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800">
                          <CardContent className="p-6">
                            {item.afterImageUrl ? (
                              <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-green-300">
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
                                  <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <p>No before & after items yet. <Link href="/admin/product-gallery" className="text-blue-600 hover:underline">Add from admin panel</Link></p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quality Control Process Photos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 relative"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              {['🔬', '✅', '🧪', '⚖️', '🔍'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-7xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5
                  }}
                  style={{ left: `${15 + i * 18}%`, top: `${(i * 20) % 60}%` }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-8 relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="text-5xl mb-3 inline-block"
              >
                🔬
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quality Control Process
              </h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '🔍', title: 'Visual Inspection', desc: 'Every piece checked for defects', step: '1' },
                { icon: '⚖️', title: 'Weight Sorting', desc: 'Automated size grading', step: '2' },
                { icon: '🧪', title: 'Lab Testing', desc: 'Pesticide & quality analysis', step: '3' },
                { icon: '✅', title: 'Final Approval', desc: 'Export certification issued', step: '4' }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-green-100 dark:border-green-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {process.step}
                    </div>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {process.icon}
                      </motion.div>
                      <h4 className="font-bold mb-2">{process.title}</h4>
                      <p className="text-sm text-muted-foreground">{process.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Facility Tour */}
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Facilities
              </h3>
            </div>
            {loadingGallery ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-100 dark:border-green-900">
                    <CardContent className="p-6">
                      <div className="relative mb-6 group">
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
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
                        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-2xl shadow-xl border-2 border-green-200 dark:border-green-700">
                          {facility.emoji}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400">{facility.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{facility.description}</p>
                      <div className="space-y-2">
                        {facility.facilityFeatures?.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
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
                  <p>No facilities yet. <Link href="/admin/product-gallery" className="text-blue-600 hover:underline">Add from admin panel</Link></p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Real Product Photos Gallery */}
      <section className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['📷', '🌿', '📦', '✨', '🎯', '💚'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-8xl"
              initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }}
              style={{ left: `${i * 15}%`, top: `${(i * 20) % 80}%` }}
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
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4 inline-block"
            >
              📷
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Product Gallery
            </h2>
            <p className="text-lg text-muted-foreground">Real photos of our premium vegetables</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                    <Card className="h-full border-2 border-green-100 dark:border-green-900 relative overflow-hidden">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-50 dark:from-green-950 dark:via-blue-950 dark:to-green-950 opacity-50"></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {category === 'Fresh Harvest' ? '🌱' : category === 'Processing' ? '⚙️' : '📦'}
                          </motion.div>
                          <h4 className="font-bold text-lg text-center text-green-700 dark:text-green-400">
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
                                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 flex items-center justify-center overflow-hidden relative">
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
                                      <h5 className="font-bold text-base mb-2 text-green-700 dark:text-green-400">{item.name}</h5>
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

        </div>
      </section>

      {/* Sample Order Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Order Sample Packs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try before you buy! Get quality samples delivered to evaluate our premium vegetables
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
                { step: '1', icon: '📝', title: 'Choose Products', desc: 'Select vegetables you want to sample' },
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-blue-100 dark:border-blue-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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
                  items: ['3 vegetable types', '1kg each', 'Standard shipping', '5-7 days delivery'],
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  name: 'Premium Pack',
                  price: '$89',
                  icon: '🎁',
                  items: ['5 vegetable types', '2kg each', 'Express shipping', '3-4 days delivery', 'Quality certificates'],
                  color: 'from-purple-500 to-pink-500',
                  popular: true
                },
                {
                  name: 'Custom Pack',
                  price: 'Custom',
                  icon: '⭐',
                  items: ['Your choice', 'Custom quantities', 'Priority shipping', '2-3 days delivery', 'Full documentation'],
                  color: 'from-orange-500 to-red-500'
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
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
                        {pack.price}
                      </div>
                      <div className="space-y-3 mb-6">
                        {pack.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
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
              <Card className="border-2 border-green-100 dark:border-green-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">🥬</span>
                    Fresh Samples
                  </h4>
                  <div className="space-y-3">
                    {['Hand-picked premium grade', 'Properly packaged & labeled', 'Temperature controlled shipping', 'Harvest date included', 'Storage instructions'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 dark:border-blue-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">📄</span>
                    Documentation
                  </h4>
                  <div className="space-y-3">
                    {['Product specifications sheet', 'Quality test results', 'Pricing information', 'Bulk order form', 'Company profile'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
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
                  company: 'Dubai Fresh Markets',
                  country: '🇦🇪 UAE',
                  rating: 5,
                  text: 'The sample quality exceeded our expectations. We immediately placed a bulk order for 20 tons!',
                  image: '👨‍💼'
                },
                {
                  name: 'Sarah Johnson',
                  company: 'UK Organic Imports',
                  country: '🇬🇧 UK',
                  rating: 5,
                  text: 'Professional packaging, excellent freshness. The documentation made our import process smooth.',
                  image: '👩‍💼'
                },
                {
                  name: 'Mohammed Hassan',
                  company: 'Saudi Food Co.',
                  country: '🇸🇦 Saudi Arabia',
                  rating: 5,
                  text: 'Best sample service in the industry. Fast delivery and premium quality vegetables.',
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
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Ready to Try Our Premium Vegetables?</h3>
                <p className="mb-6 text-blue-100">Order a sample pack today and experience the quality yourself!</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
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
            alert('Sample order submitted! We will contact you shortly.');
            setIsSampleOrderOpen(false);
          }}>
            {selectedSamplePack && (
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold">Selected Pack: <span className="text-blue-600 dark:text-blue-400">{selectedSamplePack}</span></p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input id="company" placeholder="Your Company Ltd" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="john@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input id="country" placeholder="United States" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address *</Label>
              <Textarea id="address" placeholder="Full shipping address" rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vegetables">Vegetables Interested In *</Label>
              <Textarea 
                id="vegetables" 
                placeholder="e.g., Tomatoes, Red Onions, Potatoes..." 
                rows={2}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Expected Monthly Volume</Label>
              <Input id="quantity" placeholder="e.g., 10 tons/month" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Notes</Label>
              <Textarea 
                id="message" 
                placeholder="Any special requirements or questions..." 
                rows={3}
              />
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What Happens Next?
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• We'll review your request within 24 hours</li>
                <li>• Send you a payment invoice for the sample pack</li>
                <li>• Ship samples via express courier after payment</li>
                <li>• Follow up to discuss bulk orders</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsSampleOrderOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Why Choose Ethiopian Vegetables */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {['🇪🇹', '🌍', '🏔️', '☀️', '💧', '🌱', '🏆', '💰'].map((icon, i) => (
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
                🚨
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              Why Choose Ethiopian Vegetables?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique advantages that make Ethiopia the ideal source for premium vegetables
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
                  desc: '12+ hours daily sunlight for optimal photosynthesis',
                  stat: '12hrs',
                  statLabel: 'Daily Sun'
                },
                {
                  icon: '💧',
                  title: 'Natural Irrigation',
                  desc: 'Abundant rainfall and river systems reduce water costs',
                  stat: '1,200mm',
                  statLabel: 'Annual Rain'
                },
                {
                  icon: '🌡️',
                  title: 'Perfect Climate',
                  desc: 'Moderate temperatures ideal for vegetable cultivation',
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 hover:shadow-2xl hover:border-green-400 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2 text-green-700 dark:text-green-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-3 border border-green-200 dark:border-green-800">
                        <div className="text-2xl font-bold text-green-700 dark:text-green-400">{item.stat}</div>
                        <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Climate Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🌤️
              </motion.span>
              Climate Advantages
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: '🌦️',
                  title: 'Two Growing Seasons',
                  points: ['Main season: June-September', 'Dry season: October-May', 'Continuous production', 'Year-round supply']
                },
                {
                  icon: '❄️',
                  title: 'Natural Cooling',
                  points: ['Cool highland nights', 'Reduces pest pressure', 'Extends shelf life', 'Better flavor development']
                },
                {
                  icon: '🗺️',
                  title: 'Diverse Microclimates',
                  points: ['Multiple growing zones', 'Variety-specific regions', 'Risk diversification', 'Consistent quality']
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 hover:shadow-2xl hover:border-blue-400 transition-all">
                    <CardContent className="p-6">
                      <motion.div
                        className="text-5xl mb-4 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-4 text-center text-blue-700 dark:text-blue-400">{item.title}</h4>
                      <div className="space-y-2">
                        {item.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
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
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                💰
              </motion.span>
              Competitive Pricing vs Other Origins
            </h3>
            
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border-2 border-green-200 dark:border-green-800 mb-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    {[
                      { label: 'Labor Costs', saving: '40-60%', icon: '👷' },
                      { label: 'Land Costs', saving: '50-70%', icon: '🏞️' },
                      { label: 'Water Costs', saving: '60-80%', icon: '💧' },
                      { label: 'Energy Costs', saving: '30-50%', icon: '⚡' }
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
                        <div className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{item.saving}</div>
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
                    icon: '🇪🇺',
                    benefits: ['Lower production costs', 'Favorable exchange rates', 'Reduced overhead']
                  },
                  {
                    title: 'vs. Asian Suppliers',
                    savings: '15-25%',
                    icon: '🌏',
                    benefits: ['Better quality standards', 'Shorter shipping to EU/ME', 'Reliable supply chain']
                  },
                  {
                    title: 'vs. American Suppliers',
                    savings: '30-40%',
                    icon: '🌎',
                    benefits: ['Significantly lower costs', 'Competitive freight rates', 'Growing season advantage']
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
                        <div className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">{comparison.savings}</div>
                        <div className="text-xs text-muted-foreground mb-4">Average Cost Savings</div>
                        <div className="space-y-2">
                          {comparison.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                              <span className="text-muted-foreground text-left">{benefit}</span>
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
            className="text-center mt-16"
          >
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 max-w-3xl mx-auto shadow-2xl">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  🏆
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Experience the Ethiopian Advantage</h3>
                <p className="text-lg text-green-50 mb-6">
                  Join leading importers worldwide who trust Ethiopian vegetables for quality and value
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact Us Today
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Download className="h-5 w-5 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator/Estimator */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
              <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                      📊
                    </motion.span>
                    Calculate Your Estimate
                  </h3>

                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Simple pricing calculation
                    const basePrice = selectedVegetable === 'tomatoes' ? 6 : 
                                     selectedVegetable === 'onions' ? 5 : 
                                     selectedVegetable === 'potatoes' ? 4 : 
                                     selectedVegetable === 'carrots' ? 5.5 : 5;
                    
                    const qty = parseFloat(quantity) || 0;
                    const shippingCost = shippingMethod === 'air' ? 2 : 0.5;
                    const destinationMultiplier = destination === 'europe' ? 1.2 : 
                                                 destination === 'middle-east' ? 1.0 : 
                                                 destination === 'asia' ? 1.3 : 
                                                 destination === 'africa' ? 0.9 : 1.0;
                    
                    const total = (basePrice * qty + (shippingCost * qty)) * destinationMultiplier;
                    setEstimatedPrice(Math.round(total));
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="vegetable" className="text-base font-semibold">
                        Select Vegetable *
                      </Label>
                      <Select value={selectedVegetable} onValueChange={setSelectedVegetable} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose a vegetable..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tomatoes">🍅 Tomatoes ($5-8/kg)</SelectItem>
                          <SelectItem value="onions">🧅 Red Onions ($4-6/kg)</SelectItem>
                          <SelectItem value="potatoes">🥔 Potatoes ($3-5/kg)</SelectItem>
                          <SelectItem value="carrots">🥕 Carrots ($4-7/kg)</SelectItem>
                          <SelectItem value="peppers">🫑 Green Peppers ($6-9/kg)</SelectItem>
                          <SelectItem value="cabbage">🥬 Cabbage ($3-5/kg)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-base font-semibold">
                        Quantity (kg) *
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 1000"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="100"
                        step="100"
                        className="h-12"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Minimum order: 100 kg</p>
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
                          className={`cursor-pointer transition-all ${shippingMethod === 'sea' ? 'border-2 border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-2 hover:border-blue-300'}`}
                          onClick={() => setShippingMethod('sea')}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-2">🚢</div>
                            <div className="font-semibold">Sea Freight</div>
                            <div className="text-xs text-muted-foreground">Economical</div>
                          </CardContent>
                        </Card>
                        <Card 
                          className={`cursor-pointer transition-all ${shippingMethod === 'air' ? 'border-2 border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-2 hover:border-blue-300'}`}
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
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                            <div className="font-semibold capitalize">{selectedVegetable}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-muted-foreground">Quantity:</div>
                            <div className="font-semibold">{quantity} kg</div>
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

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Mail className="h-4 w-4 mr-2" />
                        Request Official Quote
                      </Button>
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
              <Card className="border-2 border-blue-200 dark:border-blue-800">
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
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
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
                  <Card className="h-full border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl transition-all relative overflow-hidden">
                    <div className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
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
                      <h4 className="font-bold text-xl mb-2 text-purple-700 dark:text-purple-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => setIsPartnershipFormOpen(true)}
              >
                <FileText className="h-5 w-5 mr-2" />
                Apply for Partnership
              </Button>
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
                  color: 'from-purple-500 to-pink-500'
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
                  volume: '5-10 tons/month',
                  discount: '5%',
                  icon: '🥉',
                  color: 'from-orange-400 to-orange-600',
                  benefits: ['Standard pricing', 'Monthly invoicing', 'Email support']
                },
                {
                  tier: 'Silver',
                  volume: '10-25 tons/month',
                  discount: '10%',
                  icon: '🥈',
                  color: 'from-gray-400 to-gray-600',
                  benefits: ['Priority pricing', 'Flexible payment', 'Phone support', 'Quarterly reviews']
                },
                {
                  tier: 'Gold',
                  volume: '25-50 tons/month',
                  discount: '15%',
                  icon: '🥇',
                  color: 'from-yellow-400 to-yellow-600',
                  benefits: ['Best pricing', 'Extended credit', 'Dedicated manager', 'Monthly reviews', 'Marketing support'],
                  popular: true
                },
                {
                  tier: 'Platinum',
                  volume: '50+ tons/month',
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
                          'Minimum 25 tons/month commitment',
                          'Established distribution network',
                          'Cold storage facilities',
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

                  <div className="mt-8 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-800">
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
            <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white border-0 max-w-4xl mx-auto shadow-2xl">
              <CardContent className="p-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  🤝
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h3>
                <p className="text-lg text-purple-50 mb-6 max-w-2xl mx-auto">
                  Join our network of successful distributors and unlock exclusive benefits, competitive pricing, and territory rights
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-700 hover:bg-purple-50"
                    onClick={() => {
                      // Simulate PDF download
                      alert('Partnership Guide PDF will be downloaded. In production, this would download a real PDF file.');
                    }}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Partnership Guide
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => setIsScheduleCallOpen(true)}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Schedule a Call
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => setIsPartnershipFormOpen(true)}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Partnership Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partnership Application Dialog */}
      <Dialog open={isPartnershipFormOpen} onOpenChange={setIsPartnershipFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              Partnership Application
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert('Partnership application submitted! Our team will contact you within 48 hours.');
            setIsPartnershipFormOpen(false);
          }}>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <p className="text-sm font-semibold">Join our global network of distributors and unlock exclusive benefits!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="p-name">Full Name *</Label>
                <Input id="p-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-company">Company Name *</Label>
                <Input id="p-company" placeholder="Your Company Ltd" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="p-email">Email *</Label>
                <Input id="p-email" type="email" placeholder="john@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-phone">Phone Number *</Label>
                <Input id="p-phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="p-country">Country *</Label>
                <Input id="p-country" placeholder="United States" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-city">City *</Label>
                <Input id="p-city" placeholder="New York" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-volume">Expected Monthly Volume *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">5-10 tons/month (Bronze)</SelectItem>
                  <SelectItem value="10-25">10-25 tons/month (Silver)</SelectItem>
                  <SelectItem value="25-50">25-50 tons/month (Gold)</SelectItem>
                  <SelectItem value="50+">50+ tons/month (Platinum)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-territory">Interested Territory *</Label>
              <Input id="p-territory" placeholder="e.g., UK, Germany, UAE" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-experience">Distribution Experience</Label>
              <Textarea 
                id="p-experience" 
                placeholder="Tell us about your distribution network, cold storage facilities, and experience..." 
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-message">Additional Information</Label>
              <Textarea 
                id="p-message" 
                placeholder="Any questions or special requirements..." 
                rows={3}
              />
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What Happens Next?
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• We'll review your application within 48 hours</li>
                <li>• Schedule a video call to discuss partnership details</li>
                <li>• Conduct due diligence and market assessment</li>
                <li>• Finalize agreement and start partnership</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsPartnershipFormOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Schedule Call Dialog */}
      <Dialog open={isScheduleCallOpen} onOpenChange={setIsScheduleCallOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">📞</span>
              Schedule a Call
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert('Call scheduled! You will receive a confirmation email shortly.');
            setIsScheduleCallOpen(false);
          }}>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold">Let's discuss partnership opportunities and answer your questions!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-name">Full Name *</Label>
                <Input id="c-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-company">Company Name *</Label>
                <Input id="c-company" placeholder="Your Company Ltd" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-email">Email *</Label>
                <Input id="c-email" type="email" placeholder="john@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-phone">Phone Number *</Label>
                <Input id="c-phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-timezone">Your Timezone *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">EST (Eastern Time)</SelectItem>
                  <SelectItem value="cst">CST (Central Time)</SelectItem>
                  <SelectItem value="pst">PST (Pacific Time)</SelectItem>
                  <SelectItem value="gmt">GMT (London)</SelectItem>
                  <SelectItem value="cet">CET (Central Europe)</SelectItem>
                  <SelectItem value="gst">GST (Gulf Standard)</SelectItem>
                  <SelectItem value="ist">IST (India)</SelectItem>
                  <SelectItem value="cst-china">CST (China)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-date">Preferred Date *</Label>
              <Input id="c-date" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-time">Preferred Time *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">01:00 PM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-topics">Topics to Discuss</Label>
              <Textarea 
                id="c-topics" 
                placeholder="e.g., Volume discounts, territory rights, logistics..." 
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsScheduleCallOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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

          {/* Global Reach Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">🌍 Our Global Export Network</h3>
                  <p className="text-muted-foreground">Connecting Ethiopian farms to markets worldwide</p>
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
                        { flag: '🇨🇳', name: 'China', volume: 'Growing' },
                        { flag: '🇸🇬', name: 'Singapore', volume: 'Medium' },
                        { flag: '🇲🇾', name: 'Malaysia', volume: 'Growing' },
                        { flag: '🇯🇵', name: 'Japan', volume: 'Growing' },
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
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full shadow-2xl">
                    <span className="text-4xl">🇪🇹</span>
                    <div className="text-left">
                      <div className="font-bold text-lg">Ethiopia</div>
                      <div className="text-sm text-green-100">Origin of Premium Vegetables</div>
                    </div>
                  </div>
                </motion.div>
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
