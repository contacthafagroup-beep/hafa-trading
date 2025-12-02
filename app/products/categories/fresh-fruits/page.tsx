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
import { ArrowLeft, CheckCircle, Package, Truck, Download, Play, MapPin, Award, FileText, Phone, Mail, MessageCircle, X, Info, Loader2 } from 'lucide-react';
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

export default function FreshFruitsPage() {
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
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingMethod, setShippingMethod] = useState('sea');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);

  useEffect(() => {
    loadAllItems();
  }, []);

  const loadAllItems = async () => {
    try {
      const q = query(collection(db, 'productGallery'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      
      setGalleryItems(items.filter(i => i.section === 'gallery'));
      setBeforeAfterItems(items.filter(i => i.section === 'beforeAfter'));
      setFacilityItems(items.filter(i => i.section === 'facilities'));
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  const fruits = [
    { emoji: '🥑', name: 'Avocado', desc: 'Hass & Ettinger varieties, high oil content, export grade', animation: 'spin' },
    { emoji: '🥭', name: 'Mango', desc: 'Kent, Apple, and local varieties, naturally sweet', animation: 'bounce' },
    { emoji: '🍌', name: 'Bananas', desc: 'Cavendish variety, carefully transported in cooled trucks', animation: 'float' },
    { emoji: '🍍', name: 'Pineapple', desc: 'Sweet, juicy, wrapped for protection during shipping', animation: 'pulse' },
    { emoji: '🍉', name: 'Watermelon', desc: 'Large size, sweet, perfect for summer markets', animation: 'bounce' },
    { emoji: '🍈', name: 'Melon', desc: 'Bright color, rich aroma, export quality', animation: 'float' },
    { emoji: '🍊', name: 'Oranges', desc: 'Fresh citrus from Sidama, high vitamin C', animation: 'spin' },
    { emoji: '🍋', name: 'Lemon & Lime', desc: 'Tangy and aromatic, perfect for GCC markets', animation: 'shake' },
    { emoji: '🍇', name: 'Grapes', desc: 'Seasonal supply, sweet varieties', animation: 'float' },
    { emoji: '🍓', name: 'Strawberries', desc: 'Fresh, hand-picked, seasonal availability', animation: 'bounce' },
    { emoji: '🍎', name: 'Apples', desc: 'Local varieties, crisp and sweet', animation: 'spin' },
    { emoji: '🍐', name: 'Pears', desc: 'Juicy, export quality', animation: 'float' },
    { emoji: '🍑', name: 'Peaches', desc: 'Soft, sweet, seasonal', animation: 'pulse' },
    { emoji: '🫐', name: 'Berries', desc: 'Mixed berries, fresh picked', animation: 'bounce' },
    { emoji: '🍒', name: 'Pomegranate', desc: 'Rich in antioxidants, premium quality', animation: 'spin' }
  ];

  const features = [
    { icon: '🌡️', title: 'Cold Chain', desc: 'Temperature-controlled from orchard to port', color: 'from-blue-500 to-cyan-500' },
    { icon: '📦', title: 'Custom Packaging', desc: 'Foam-wrapped protection for delicate fruits', color: 'from-orange-500 to-amber-500' },
    { icon: '✈️', title: 'Air & Sea Freight', desc: 'Fast air cargo or economical sea shipping', color: 'from-purple-500 to-pink-500' },
    { icon: '🔬', title: 'Lab Tested', desc: 'Pesticide residue & quality analysis', color: 'from-green-500 to-emerald-500' },
    { icon: '📋', title: 'Full Documentation', desc: 'Phytosanitary, COO, quality certificates', color: 'from-red-500 to-rose-500' },
    { icon: '🤝', title: 'Flexible Terms', desc: 'FOB, CIF, or door delivery options', color: 'from-indigo-500 to-blue-500' }
  ];

  const stats = [
    { number: '15+', label: 'Fruit Varieties', icon: '🍊' },
    { number: '300+', label: 'Tons Monthly', icon: '📦' },
    { number: '25+', label: 'Export Countries', icon: '🌍' },
    { number: '100%', label: 'Quality Assured', icon: '✅' }
  ];

  // Admin can replace these with actual video URLs (YouTube, Vimeo, or direct video links)
  const videos = [
    { 
      title: 'Orchard Harvesting', 
      desc: 'See how we carefully harvest fruits', 
      thumbnail: '🌳',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Sorting & Grading', 
      desc: 'Quality sorting by size and ripeness', 
      thumbnail: '🎯',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Packaging Process', 
      desc: 'Foam-wrapped and protected packaging', 
      thumbnail: '📦',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    },
    { 
      title: 'Cold Chain Management', 
      desc: 'Temperature-controlled from farm to port', 
      thumbnail: '❄️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
    }
  ];

  const certifications = [
    { icon: '🔒', name: 'ISO Certified', desc: 'International standards' },
    { icon: '🌿', name: 'Organic', desc: 'Naturally grown' },
    { icon: '📜', name: 'Phytosanitary', desc: 'Plant health certified' },
    { icon: '🧪', name: 'Lab Tested', desc: 'Pesticide-free verified' },
    { icon: '🏅', name: 'Export License', desc: 'Authorized exporter' }
  ];

  const originRegions = [
    { 
      name: 'Wolaita', 
      product: 'Mangoes', 
      coordinates: '6.8°N, 37.8°E', 
      lat: 6.8, 
      lng: 37.8, 
      color: '#f59e0b',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d37.8!3d6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJOIDM3wrA0OCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Arba Minch', 
      product: 'Bananas', 
      coordinates: '6.0°N, 37.5°E', 
      lat: 6.0, 
      lng: 37.5, 
      color: '#eab308',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d37.5!3d6.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDAnMDAuMCJOIDM3wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Sidama & Gamo Gofa', 
      product: 'Oranges & Citrus', 
      coordinates: '6.5°N, 38.5°E', 
      lat: 6.5, 
      lng: 38.5, 
      color: '#fb923c',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.5!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzAnMDAuMCJOIDM4wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Limo (Hadiya)', 
      product: 'Avocados', 
      coordinates: '7.5°N, 37.8°E', 
      lat: 7.5, 
      lng: 37.8, 
      color: '#10b981',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d37.8!3d7.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJOIDM3wrA0OCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Wendo Genet', 
      product: 'Pineapples & Tropical Fruits', 
      coordinates: '7.1°N, 38.6°E', 
      lat: 7.1, 
      lng: 38.6, 
      color: '#f97316',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.6!3d7.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDYnMDAuMCJOIDM4wrAzNicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    }
  ];

  const downloadables = [
    { icon: '📄', name: 'Fruit Catalog PDF', size: '2.8 MB' },
    { icon: '💰', name: 'Price List', size: '920 KB' },
    { icon: '📋', name: 'Certification Documents', size: '1.4 MB' },
    { icon: '📦', name: 'Packaging Samples', size: '3.5 MB' }
  ];

  const carouselImages = [
    { title: 'Orchard Picking', emoji: '🌳' },
    { title: 'Sorting by Ripeness', emoji: '🎯' },
    { title: 'Foam Wrapping', emoji: '📦' },
    { title: 'Quality Inspection', emoji: '✅' },
    { title: 'Cold Storage', emoji: '❄️' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Floating Icons */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🥑', '🥭', '🍌', '🍍', '🍉', '🍊', '🍋', '🍇', '🍓'].map((emoji, i) => (
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
            <div className="text-6xl mb-4">🍊</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fresh Fruits</h1>
            <p className="text-2xl mb-6">Sun-Ripened • Organic • Carefully Handled</p>
            <p className="text-xl text-orange-50 leading-relaxed">
              Premium Ethiopian fruits from rich soil and perfect climate, handled with care from orchard to export.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-orange-700 to-orange-600 text-white">
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
                <div className="text-orange-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Why Choose Our Fruits?</h2>
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
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-orange-100 dark:border-orange-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-orange-700 dark:text-orange-400">{feature.title}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌟 Our Fruit Selection</h2>
            <p className="text-lg text-muted-foreground">Hover over each fruit to see details</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {fruits.map((fruit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: fruit.animation === 'spin' ? 360 : 0 }}
              >
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 dark:border-orange-900 cursor-pointer group overflow-hidden relative"
                  onClick={() => {
                    setSelectedProduct(fruit);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Details
                  </div>
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="text-6xl mb-3"
                      animate={
                        fruit.animation === 'bounce' ? { y: [0, -10, 0] } :
                        fruit.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                        fruit.animation === 'float' ? { y: [0, -5, 0] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {fruit.emoji}
                    </motion.div>
                    <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-2">{fruit.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {fruit.desc}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(fruit);
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

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <span className="text-5xl">{selectedProduct.emoji}</span>
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedProduct.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Before & After Gallery */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-orange-600 to-emerald-600 bg-clip-text text-transparent">
              From Orchard to Export - Our Process
            </h2>
            <p className="text-lg text-muted-foreground">See the transformation from harvest to premium export-ready fruits</p>
          </motion.div>

          {/* Before & After Comparisons */}
          <div className="space-y-8 mb-12">
            {loadingGallery ? (
              <div className="text-center py-12">
                <Loader2 className="animate-spin h-12 w-12 text-orange-600 mx-auto" />
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
                <Card className="overflow-hidden border-2 border-orange-200 dark:border-orange-800">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-5xl">{item.emoji}</span>
                      <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400">{item.productName}</h3>
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

                      {/* After */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                      >
                        <div className="absolute -top-3 -right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                          AFTER
                        </div>
                        <Card className="h-full bg-orange-50 dark:bg-orange-950 border-2 border-orange-200 dark:border-orange-800">
                          <CardContent className="p-6">
                            {item.afterImageUrl ? (
                              <div className="aspect-video mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-orange-300">
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
                                  <CheckCircle className="w-4 h-4 text-orange-600" />
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quality Control Process
              </h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '🔍', title: 'Visual Inspection', desc: 'Every fruit checked for defects', step: '1' },
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
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-orange-100 dark:border-orange-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                  ❄️
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Our Facilities
              </h3>
            </div>
            {loadingGallery ? (
              <div className="text-center py-12">
                <Loader2 className="animate-spin h-12 w-12 text-orange-600 mx-auto" />
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-orange-100 dark:border-orange-900">
                    <CardContent className="p-6">
                      <div className="relative mb-6 group">
                        <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-950 dark:to-blue-950 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
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
                        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-2xl shadow-xl border-2 border-orange-200 dark:border-orange-700">
                          {facility.emoji}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400">{facility.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{facility.description}</p>
                      <div className="space-y-2">
                        {facility.facilityFeatures?.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-orange-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Product Gallery
            </h2>
            <p className="text-lg text-muted-foreground">Real photos of our premium fruits</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-orange-600 mx-auto" />
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
                    <Card className="h-full border-2 border-orange-100 dark:border-orange-900 relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {category === 'Fresh Harvest' ? '🌱' : category === 'Processing' ? '⚙️' : '📦'}
                          </motion.div>
                          <h4 className="font-bold text-lg text-center text-orange-700 dark:text-orange-400">
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
                                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-950 dark:to-blue-950 flex items-center justify-center overflow-hidden relative">
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
                                      <h5 className="font-bold text-base mb-2 text-orange-700 dark:text-orange-400">{item.name}</h5>
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

      {/* Admin Video Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎥 See Our Process</h2>
            <p className="text-lg text-muted-foreground">Watch how we handle fruits from orchard to export</p>
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
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-orange-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-orange-600">
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
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-orange-600 mx-auto mb-4" />
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
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-orange-200 dark:border-orange-800">
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
            <MapPin className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's best agricultural zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-orange-50 dark:bg-orange-950 rounded-2xl p-4 md:p-8 mb-8"
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
                        ? 'ring-2 ring-orange-600 shadow-xl scale-105' 
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
                            <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">
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
                        <MapPin className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-orange-600 mx-auto mb-4" />
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
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-orange-100 dark:border-orange-900">
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

      {/* Enhanced CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Import Premium Ethiopian Fruits?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Fresh, sun-ripened fruits delivered worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-orange-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-orange-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-orange-600">
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


