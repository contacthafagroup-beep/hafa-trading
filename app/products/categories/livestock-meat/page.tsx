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
import { ArrowLeft, CheckCircle, Package, Shield, Play, MapPin, Award, Download, Phone, Mail, MessageCircle, FileText, Heart, Info, Truck } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryItem {
  id: string;
  section: string;
  category?: 'Live Animals' | 'Processing' | 'Packaged Meat';
  name: string;
  description: string;
  imageUrl: string;
  emoji: string;
  order: number;
}

export default function LivestockMeatPage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [selectedMeat, setSelectedMeat] = useState<any>(null);
  const [isMeatModalOpen, setIsMeatModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [isSampleOrderOpen, setIsSampleOrderOpen] = useState(false);
  const [selectedSamplePack, setSelectedSamplePack] = useState<string>('');
  
  // Pricing Calculator State
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingMethod, setShippingMethod] = useState('sea');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  // Partnership State
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);

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
        ...doc.data()
      })) as GalleryItem[];
      
      const gallery = items.filter(i => i.section === 'gallery');
      setGalleryItems(gallery);
    } catch (error) {
      console.error('Error loading gallery items:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  const liveAnimals = [
    { 
      emoji: '🐐', 
      name: 'Goats', 
      desc: 'Healthy, grass-fed', 
      animation: 'bounce',
      grade: 'Premium A',
      price: '$150-250/head',
      details: {
        breeds: ['Somali Goat', 'Afar Goat', 'Borana Goat'],
        avgWeight: '25-40 kg',
        age: '1-2 years',
        origin: 'Afar, Somali regions',
        minOrder: '50 heads',
        specifications: 'Vet-checked, Export quarantine certified, Grass-fed, Healthy and active',
        benefits: ['Lean meat', 'High demand', 'Hardy breed', 'Disease resistant', 'Fast growing', 'Adaptable']
      }
    },
    { 
      emoji: '🐑', 
      name: 'Sheep', 
      desc: 'Premium breeds', 
      animation: 'float',
      grade: 'Premium A',
      price: '$180-300/head',
      details: {
        breeds: ['Menz Sheep', 'Horro Sheep', 'Afar Sheep'],
        avgWeight: '30-50 kg',
        age: '1-2 years',
        origin: 'Highlands, Somali region',
        minOrder: '50 heads',
        specifications: 'Vet-checked, Export certified, Grass-fed, Premium wool quality',
        benefits: ['Quality meat', 'Good wool', 'Hardy', 'High fertility', 'Disease resistant', 'Market demand']
      }
    },
    { 
      emoji: '🐂', 
      name: 'Oxen', 
      desc: 'Strong, well-fed', 
      animation: 'pulse',
      grade: 'Grade A',
      price: '$800-1200/head',
      details: {
        breeds: ['Borana Ox', 'Arsi Ox', 'Highland Ox'],
        avgWeight: '300-450 kg',
        age: '3-5 years',
        origin: 'Borana, Arsi regions',
        minOrder: '20 heads',
        specifications: 'Vet-checked, Strong and healthy, Working animals, Export certified',
        benefits: ['Large size', 'Quality meat', 'Strong build', 'Well-trained', 'Grass-fed', 'Hardy']
      }
    },
    { 
      emoji: '🐄', 
      name: 'Cattle', 
      desc: 'Quality livestock', 
      animation: 'bounce',
      grade: 'Premium',
      price: '$600-1000/head',
      details: {
        breeds: ['Borana Cattle', 'Boran Cross', 'Highland Cattle'],
        avgWeight: '250-400 kg',
        age: '2-4 years',
        origin: 'Borana, Bale regions',
        minOrder: '20 heads',
        specifications: 'Vet-checked, Export certified, Grass-fed, Premium beef quality',
        benefits: ['Quality beef', 'Good size', 'Hardy breed', 'Disease resistant', 'High yield', 'Market ready']
      }
    },
    { 
      emoji: '🐮', 
      name: 'Calves', 
      desc: 'Young, healthy', 
      animation: 'float',
      grade: 'Grade A',
      price: '$300-500/head',
      details: {
        breeds: ['Borana Calf', 'Highland Calf', 'Cross Breed'],
        avgWeight: '80-150 kg',
        age: '6-12 months',
        origin: 'Various regions',
        minOrder: '30 heads',
        specifications: 'Vet-checked, Vaccinated, Healthy and active, Export certified',
        benefits: ['Young stock', 'Good growth', 'Healthy', 'Vaccinated', 'Easy transport', 'High demand']
      }
    },
    { 
      emoji: '🐪', 
      name: 'Camels', 
      desc: 'On request', 
      animation: 'pulse',
      grade: 'Premium',
      price: '$1000-1500/head',
      details: {
        breeds: ['Somali Camel', 'Afar Camel', 'Dromedary'],
        avgWeight: '400-600 kg',
        age: '3-6 years',
        origin: 'Afar, Somali regions',
        minOrder: '10 heads',
        specifications: 'Vet-checked, Export certified, Desert-adapted, Strong and healthy',
        benefits: ['Drought resistant', 'Quality meat', 'Milk production', 'Hardy', 'High value', 'Cultural demand']
      }
    }
  ];

  const meatProducts = [
    {
      emoji: '🐐',
      name: 'Goat Meat',
      types: 'Fresh/Frozen',
      features: ['Lean and tender', 'Halal certified', 'Vacuum sealed'],
      grade: 'Premium A',
      price: '$8-12/kg',
      details: {
        cuts: ['Whole carcass', 'Leg', 'Shoulder', 'Ribs', 'Chops', 'Ground meat'],
        packaging: 'Vacuum sealed, 5kg, 10kg, 20kg boxes',
        shelfLife: '12 months frozen, 5 days fresh',
        origin: 'Ethiopian pastoralist regions',
        minOrder: '500 kg',
        specifications: 'Halal certified, Lean meat (low fat), High protein, Vet inspected, Temperature controlled',
        benefits: ['Lean protein', 'Low cholesterol', 'Tender texture', 'Rich flavor', 'Halal certified', 'Export quality']
      }
    },
    {
      emoji: '🐑',
      name: 'Mutton',
      types: 'Fresh/Frozen',
      features: ['Rich flavor', 'Premium cuts', 'Export quality'],
      grade: 'Premium A',
      price: '$9-14/kg',
      details: {
        cuts: ['Whole carcass', 'Leg', 'Shoulder', 'Rack', 'Loin', 'Shanks'],
        packaging: 'Vacuum sealed, 5kg, 10kg, 20kg boxes',
        shelfLife: '12 months frozen, 5 days fresh',
        origin: 'Highland regions',
        minOrder: '500 kg',
        specifications: 'Halal certified, Premium quality, Grass-fed, Vet inspected, Cold chain maintained',
        benefits: ['Rich flavor', 'Tender meat', 'High protein', 'Premium quality', 'Halal certified', 'Global demand']
      }
    },
    {
      emoji: '🐄',
      name: 'Beef Cuts',
      types: 'Fresh/Frozen',
      features: ['Various cuts available', 'Grass-fed', 'Halal processed'],
      grade: 'Premium',
      price: '$10-16/kg',
      details: {
        cuts: ['Ribeye', 'Sirloin', 'Tenderloin', 'Brisket', 'Chuck', 'Ground beef'],
        packaging: 'Vacuum sealed, 5kg, 10kg, 20kg boxes',
        shelfLife: '12 months frozen, 7 days fresh',
        origin: 'Borana, Bale regions',
        minOrder: '1000 kg',
        specifications: 'Halal certified, Grass-fed beef, Premium cuts, Vet inspected, Export grade',
        benefits: ['Quality beef', 'Grass-fed', 'Various cuts', 'Tender', 'Halal certified', 'High demand']
      }
    },
    {
      emoji: '🫀',
      name: 'Organs & Offal',
      types: 'Liver, Kidney, Tripe, Heart',
      features: ['On request', 'Fresh or frozen', 'Cleaned and prepared'],
      grade: 'Grade A',
      price: '$4-8/kg',
      details: {
        types: ['Liver', 'Kidney', 'Heart', 'Tripe', 'Tongue', 'Tail'],
        packaging: 'Vacuum sealed, 5kg, 10kg boxes',
        shelfLife: '6 months frozen, 3 days fresh',
        origin: 'Various regions',
        minOrder: '200 kg',
        specifications: 'Halal certified, Cleaned and prepared, Vet inspected, Fresh or frozen',
        benefits: ['Nutrient rich', 'High demand', 'Cost effective', 'Various types', 'Halal certified', 'Export quality']
      }
    }
  ];

  const videos = [
    { 
      title: 'Livestock Selection', 
      desc: 'Vet-checked healthy animals', 
      thumbnail: '🐑',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Halal Processing', 
      desc: 'Islamic slaughter methods', 
      thumbnail: '🕌',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Meat Cutting', 
      desc: 'Premium cuts preparation', 
      thumbnail: '🔪',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Cold Chain', 
      desc: 'Temperature-controlled storage', 
      thumbnail: '❄️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const certifications = [
    { icon: '✅', name: 'Vet-Checked', desc: 'Health certified' },
    { icon: '🛂', name: 'Export Quarantine', desc: 'International standards' },
    { icon: '🕌', name: 'Halal Certified', desc: 'Islamic methods' },
    { icon: '❄️', name: 'Cold Chain', desc: 'Temperature controlled' },
    { icon: '🏅', name: 'Export License', desc: 'Authorized' }
  ];

  const originRegions = [
    { 
      name: 'Afar', 
      product: 'Goats & Camels', 
      coordinates: '11.8°N, 40.9°E', 
      lat: 11.8, 
      lng: 40.9, 
      color: '#dc2626',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d40.9!3d11.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDQ4JzAwLjAiTiA0MMKwNTQnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Somali Region', 
      product: 'Sheep & Goats', 
      coordinates: '7.0°N, 43.0°E', 
      lat: 7.0, 
      lng: 43.0, 
      color: '#ef4444',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d43.0!3d7.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDAnMDAuMCJOIDQzwrAwMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Borana', 
      product: 'Cattle & Oxen', 
      coordinates: '5.0°N, 38.5°E', 
      lat: 5.0, 
      lng: 38.5, 
      color: '#f87171',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d38.5!3d5.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDAnMDAuMCJOIDM4wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Arsi', 
      product: 'Sheep & Cattle', 
      coordinates: '7.5°N, 39.5°E', 
      lat: 7.5, 
      lng: 39.5, 
      color: '#fca5a5',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d39.5!3d7.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJOIDM5wrAzMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    },
    { 
      name: 'Bale', 
      product: 'Highland Cattle', 
      coordinates: '7.0°N, 40.0°E', 
      lat: 7.0, 
      lng: 40.0, 
      color: '#fecaca',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008126.5!2d40.0!3d7.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDAnMDAuMCJOIDQwwrAwMCcwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890'
    }
  ];

  const downloadables = [
    { icon: '📄', name: 'Livestock Catalog', size: '2.9 MB' },
    { icon: '💰', name: 'Price List', size: '890 KB' },
    { icon: '📋', name: 'Health Certificates', size: '1.7 MB' },
    { icon: '🕌', name: 'Halal Certification', size: '1.2 MB' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Floating Icons */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🐑', '🐐', '🐄', '🐂', '🐮', '🐪', '🥩', '🍖', '🕌', '🐑', '🐐'].map((emoji, i) => (
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
                🐑
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium Ethiopian Livestock & Meat
              </h1>
              <p className="text-2xl mb-6 font-semibold">Healthy • Halal Certified • Export Quality</p>
              <p className="text-xl text-red-50 leading-relaxed mb-8">
                Ethiopia's finest livestock from renowned pastoralist regions. Grass-fed, vet-checked animals 
                and premium halal-processed meat products. Supplying international markets with healthy livestock 
                and export-grade meat cuts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/rfq">
                  <Button size="lg" className="bg-white text-red-700 hover:bg-red-50">
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
                { icon: '🐑', title: 'Live Sheep & Goats', desc: 'Healthy, grass-fed animals' },
                { icon: '🐄', title: 'Cattle & Oxen', desc: 'Premium breeds' },
                { icon: '🥩', title: 'Fresh/Frozen Meat', desc: 'Halal processed cuts' },
                { icon: '🕌', title: 'Halal Certified', desc: 'Islamic slaughter methods' }
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
                      <p className="text-sm text-red-100">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-red-900 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10K+', label: 'Animals Exported Annually', icon: '🐑' },
              { number: '15+', label: 'Export Destinations', icon: '🌍' },
              { number: '100%', label: 'Halal Certified', icon: '🕌' },
              { number: '500+', label: 'Tons Meat Capacity', icon: '🥩' }
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
                <div className="text-red-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Livestock */}
      <section className="py-16 bg-gradient-to-b from-white to-red-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Why Choose Our Livestock & Meat?</h2>
            <p className="text-lg text-muted-foreground">Premium quality from Ethiopia's finest pastoralist regions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '🏔️',
                title: 'Pastoralist Heritage',
                desc: 'Sourced from traditional pastoralist communities with centuries of livestock expertise',
                color: 'from-red-500 to-rose-500'
              },
              {
                icon: '🌿',
                title: 'Grass-Fed & Natural',
                desc: 'Free-range animals grazing on natural pastures, no hormones or antibiotics',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '✅',
                title: 'Vet-Checked Health',
                desc: 'Every animal inspected by certified veterinarians before export',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🕌',
                title: 'Halal Certified',
                desc: 'Islamic slaughter methods by trained professionals, fully certified',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: '🛂',
                title: 'Export Quarantine',
                desc: 'International quarantine standards, health certificates provided',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '❄️',
                title: 'Cold Chain Maintained',
                desc: 'Temperature-controlled processing, storage, and transport',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: '🥩',
                title: 'Premium Cuts',
                desc: 'Professional butchering, various cuts available, vacuum sealed',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: '🌍',
                title: 'Global Standards',
                desc: 'Meeting international food safety and quality requirements',
                color: 'from-indigo-500 to-purple-500'
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-bold text-xl mb-2 text-red-700 dark:text-red-400">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Animals */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🐑 Live Animals</h2>
            <p className="text-lg text-muted-foreground">Vet-checked • Export quarantine standards</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {liveAnimals.map((animal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card 
                  className="text-center hover:shadow-xl transition-all duration-300 border-2 border-red-100 dark:border-red-900 group cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedAnimal(animal);
                    setIsAnimalModalOpen(true);
                  }}
                >
                  {/* Grade Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {animal.grade}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <motion.div 
                      className="text-6xl mb-3"
                      animate={
                        animal.animation === 'bounce' ? { y: [0, -10, 0] } :
                        animal.animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                        animal.animation === 'float' ? { y: [0, -5, 0] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {animal.emoji}
                    </motion.div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">{animal.desc}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-red-600 text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAnimal(animal);
                        setIsAnimalModalOpen(true);
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

      {/* Meat Products */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🥩 Meat Products (Halal)</h2>
            <p className="text-lg text-muted-foreground">Fresh & Frozen • Premium Quality</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {meatProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 border-2 border-red-100 dark:border-red-900 group cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedMeat(product);
                    setIsMeatModalOpen(true);
                  }}
                >
                  {/* Grade Badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.grade}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="text-5xl mb-3">{product.emoji}</div>
                    <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{product.types}</p>
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-red-600 text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMeat(product);
                        setIsMeatModalOpen(true);
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

      {/* From Farm to Export Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['🐑', '➡️', '🥩', '✨', '🚜', '🏆'].map((icon, i) => (
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
                🐑
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
                🥩
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              From Farm to Export - Our Process
            </h2>
            <p className="text-lg text-muted-foreground">See the transformation from live animals to premium export-ready meat products</p>
          </motion.div>

          {/* Journey Steps */}
          <div className="space-y-8 mb-12">
            {[
              {
                emoji: '🐑',
                productName: 'Live Animal Selection',
                beforeTitle: 'Pastoralist Farms',
                beforeDesc: 'Animals raised in traditional pastoralist regions',
                beforeIcon: '🌾',
                beforeFeatures: ['Free-range grazing', 'Natural diet', 'Traditional breeding', 'Healthy environment'],
                afterTitle: 'Vet-Checked & Selected',
                afterDesc: 'Certified healthy animals ready for export',
                afterIcon: '✅',
                afterFeatures: ['Health certificates', 'Export quarantine', 'Age & weight verified', 'Disease-free certified'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                emoji: '🕌',
                productName: 'Halal Processing',
                beforeTitle: 'Live Animals',
                beforeDesc: 'Healthy livestock ready for processing',
                beforeIcon: '🐐',
                beforeFeatures: ['Vet-checked', 'Well-fed', 'Stress-free handling', 'Quarantine certified'],
                afterTitle: 'Halal Slaughtered',
                afterDesc: 'Islamic methods by certified professionals',
                afterIcon: '🕌',
                afterFeatures: ['Halal certified', 'Humane methods', 'Religious compliance', 'Trained butchers'],
                color: 'from-amber-500 to-orange-500'
              },
              {
                emoji: '🔪',
                productName: 'Meat Cutting & Grading',
                beforeTitle: 'Whole Carcass',
                beforeDesc: 'Fresh carcass from halal processing',
                beforeIcon: '🥩',
                beforeFeatures: ['Quality inspected', 'Temperature controlled', 'Hygiene maintained', 'Vet approved'],
                afterTitle: 'Premium Cuts',
                afterDesc: 'Professional butchering and grading',
                afterIcon: '🏆',
                afterFeatures: ['Various cuts available', 'Grade A quality', 'Vacuum sealed', 'Export ready'],
                color: 'from-red-500 to-rose-500'
              },
              {
                emoji: '❄️',
                productName: 'Cold Chain & Packaging',
                beforeTitle: 'Fresh Meat Cuts',
                beforeDesc: 'Freshly cut premium meat',
                beforeIcon: '🥩',
                beforeFeatures: ['Quality cuts', 'Clean processing', 'Sorted by type', 'Ready for packaging'],
                afterTitle: 'Frozen & Packed',
                afterDesc: 'Temperature-controlled storage and packaging',
                afterIcon: '📦',
                afterFeatures: ['Blast frozen', 'Vacuum sealed', 'Labeled & boxed', 'Cold storage maintained'],
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden border-2 border-red-200 dark:border-red-800">
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-5xl">{item.emoji}</span>
                      <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">{item.productName}</h3>
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
                            <motion.div 
                              className="text-6xl mb-4 text-center"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.beforeIcon}
                            </motion.div>
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
                            <motion.div 
                              className="text-6xl mb-4 text-center"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.afterIcon}
                            </motion.div>
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
            ))}
          </div>

          {/* Quality Control Process */}
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
                Quality Control & Inspection
              </h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '🔍', title: 'Animal Inspection', desc: 'Vet checks before processing', step: '1' },
                { icon: '🕌', title: 'Halal Compliance', desc: 'Islamic slaughter verification', step: '2' },
                { icon: '🧪', title: 'Lab Testing', desc: 'Meat quality & safety analysis', step: '3' },
                { icon: '✅', title: 'Export Approval', desc: 'Certification & documentation', step: '4' }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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

          {/* Processing Facilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated Background Icons */}
            <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
              {['🏭', '🐑', '❄️', '🚚', '⚙️', '🔧'].map((icon, i) => (
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Our Processing Facilities
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  emoji: '🕌',
                  name: 'Halal Slaughterhouse',
                  description: 'Modern facility with Islamic slaughter methods',
                  features: ['Certified halal', 'Trained professionals', 'Humane handling', 'Religious compliance']
                },
                {
                  emoji: '🔪',
                  name: 'Butchery & Cutting',
                  description: 'Professional meat cutting and grading facility',
                  features: ['Expert butchers', 'Various cuts', 'Quality grading', 'Hygiene standards']
                },
                {
                  emoji: '❄️',
                  name: 'Cold Storage',
                  description: 'Temperature-controlled storage and freezing',
                  features: ['Blast freezing', '-18°C storage', 'Cold chain maintained', 'Export containers']
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-red-100 dark:border-red-900">
                    <CardContent className="p-6">
                      <div className="relative mb-6 group">
                        <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                          <motion.span 
                            className="text-8xl"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {facility.emoji}
                          </motion.span>
                        </div>
                        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-2xl shadow-xl border-2 border-red-200 dark:border-red-700">
                          {facility.emoji}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">{facility.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{facility.description}</p>
                      <div className="space-y-2">
                        {facility.features?.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-red-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['📷', '🐑', '🥩', '✨', '🎯', '❤️'].map((icon, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Product Gallery
            </h2>
            <p className="text-lg text-muted-foreground">Real photos of our premium livestock & meat products</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {(['Live Animals', 'Processing', 'Packaged Meat'] as const).map((category, gIndex) => {
                const categoryItems = galleryItems.filter(item => item.category === category);
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gIndex * 0.1 }}
                  >
                    <Card className="h-full border-2 border-red-100 dark:border-red-900 relative overflow-hidden">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 dark:from-red-950 dark:via-orange-950 dark:to-red-950 opacity-50"></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {category === 'Live Animals' ? '🐑' : category === 'Processing' ? '🔪' : '📦'}
                          </motion.div>
                          <h4 className="font-bold text-lg text-center text-red-700 dark:text-red-400">
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
                                    <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950 flex items-center justify-center overflow-hidden relative">
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
                                      <h5 className="font-bold text-base mb-2 text-red-700 dark:text-red-400">{item.name}</h5>
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

          {/* Note for Admin */}
          {!loadingGallery && galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Card className="max-w-2xl mx-auto border-2 border-red-200 dark:border-red-800">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">📸</div>
                  <h3 className="text-xl font-bold mb-2">No Gallery Items Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add photos of your livestock and meat products from the admin panel
                  </p>
                  <Link href="/admin/product-gallery">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Go to Admin Panel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Order Sample Packs Section */}
      <section className="py-16 bg-gradient-to-b from-white to-red-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {['📦', '🐑', '🥩', '✨', '🎁', '⭐'].map((icon, i) => (
            <motion.div
              key={i}
              className="absolute text-8xl"
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 8 + i * 1.5,
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              Order Sample Packs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try before you buy! Get quality meat samples delivered to evaluate our premium livestock products
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
                { step: '1', icon: '📝', title: 'Choose Products', desc: 'Select meat cuts you want to sample' },
                { step: '2', icon: '💳', title: 'Pay Sample Fee', desc: 'Cover shipping & handling costs' },
                { step: '3', icon: '📦', title: 'We Ship', desc: 'Frozen samples via express courier' },
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-red-100 dark:border-red-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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
                  price: '$79',
                  icon: '📦',
                  items: ['3 meat types', '500g each', 'Frozen packaging', 'Standard shipping', '5-7 days delivery'],
                  color: 'from-red-500 to-rose-500'
                },
                {
                  name: 'Premium Pack',
                  price: '$149',
                  icon: '🎁',
                  items: ['5 meat types', '1kg each', 'Vacuum sealed', 'Express shipping', '3-4 days delivery', 'Halal certificates'],
                  color: 'from-orange-500 to-amber-500',
                  popular: true
                },
                {
                  name: 'Custom Pack',
                  price: 'Custom',
                  icon: '⭐',
                  items: ['Your choice', 'Custom quantities', 'Priority shipping', '2-3 days delivery', 'Full documentation', 'Quality reports'],
                  color: 'from-rose-500 to-pink-500'
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
                  <Card className={`h-full hover:shadow-2xl transition-all border-2 ${pack.popular ? 'border-orange-500 dark:border-orange-400' : 'border-gray-200 dark:border-gray-700'} relative overflow-hidden`}>
                    {pack.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
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
                      <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6">
                        {pack.price}
                      </div>
                      <div className="space-y-3 mb-6">
                        {pack.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
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
              <Card className="border-2 border-red-100 dark:border-red-900">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-3xl">🥩</span>
                    Premium Meat Samples
                  </h4>
                  <div className="space-y-3">
                    {['Grade A quality cuts', 'Vacuum sealed packaging', 'Blast frozen (-18°C)', 'Halal certified', 'Storage instructions'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
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
                    {['Product specifications', 'Halal certificates', 'Quality test results', 'Pricing information', 'Bulk order form'].map((item, idx) => (
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
                  name: 'Abdullah Al-Mansoori',
                  company: 'Dubai Meat Trading',
                  country: '🇦🇪 UAE',
                  rating: 5,
                  text: 'Excellent quality halal meat. The samples arrived frozen and fresh. Placed a 50-ton order immediately!',
                  image: '👨‍💼'
                },
                {
                  name: 'Fatima Hassan',
                  company: 'Riyadh Food Imports',
                  country: '🇸🇦 Saudi Arabia',
                  rating: 5,
                  text: 'Professional service and premium meat quality. The halal certification made our import process smooth.',
                  image: '👩‍💼'
                },
                {
                  name: 'Omar Khalid',
                  company: 'Kuwait Halal Foods',
                  country: '🇰🇼 Kuwait',
                  rating: 5,
                  text: 'Best meat samples we have received. Fast delivery and excellent cold chain maintenance.',
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
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Ready to Try Our Premium Halal Meat?</h3>
                <p className="mb-6 text-red-100">Order a sample pack today and experience the quality yourself!</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-red-600 hover:bg-gray-100"
                    onClick={() => setIsSampleOrderOpen(true)}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Request Sample
                  </Button>
                  <Link href="https://wa.me/251954742383">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <MessageCircle className="h-5 w-5 mr-2" />
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
            alert('Sample order submitted! We will contact you shortly.');
            setIsSampleOrderOpen(false);
          }}>
            {selectedSamplePack && (
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-2 border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold">Selected Pack: <span className="text-red-600 dark:text-red-400">{selectedSamplePack}</span></p>
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
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">🇦🇪 United Arab Emirates</SelectItem>
                  <SelectItem value="saudi">🇸🇦 Saudi Arabia</SelectItem>
                  <SelectItem value="kuwait">🇰🇼 Kuwait</SelectItem>
                  <SelectItem value="qatar">🇶🇦 Qatar</SelectItem>
                  <SelectItem value="oman">🇴🇲 Oman</SelectItem>
                  <SelectItem value="bahrain">🇧🇭 Bahrain</SelectItem>
                  <SelectItem value="other">🌍 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea id="address" placeholder="Full delivery address" rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">Products Interested In *</Label>
              <Textarea id="products" placeholder="e.g., Goat meat, Mutton, Beef cuts..." rows={2} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Notes</Label>
              <Textarea id="message" placeholder="Any special requirements or questions..." rows={3} />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Sample packs are shipped frozen via express courier. Delivery time depends on your location. We will contact you to confirm payment and shipping details.
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                Submit Request
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsSampleOrderOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Why Choose Ethiopian Livestock */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {['🇪🇹', '🐑', '🏔️', '🌿', '🕌', '🏆', '💰', '🌍'].map((icon, i) => (
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
                🐑
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-rose-700 bg-clip-text text-transparent">
              Why Choose Ethiopian Livestock?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique advantages that make Ethiopia the ideal source for premium livestock and halal meat
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
                  icon: '🐑',
                  title: 'Largest Livestock Population',
                  desc: 'Africa\'s #1 livestock producer with 65M+ cattle, 40M+ sheep & goats',
                  stat: '65M+',
                  statLabel: 'Cattle Population'
                },
                {
                  icon: '🌿',
                  title: 'Natural Grazing',
                  desc: 'Free-range pastoralist systems, grass-fed animals, no hormones',
                  stat: '100%',
                  statLabel: 'Grass-Fed'
                },
                {
                  icon: '🕌',
                  title: 'Halal Certified',
                  desc: 'Islamic slaughter methods, certified professionals, full compliance',
                  stat: '100%',
                  statLabel: 'Halal'
                },
                {
                  icon: '🏔️',
                  title: 'Highland Breeds',
                  desc: 'Hardy, disease-resistant breeds adapted to diverse climates',
                  stat: '2,500m',
                  statLabel: 'Avg. Altitude'
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
                  <Card className="h-full bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-800 hover:shadow-2xl hover:border-red-400 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-2 text-red-700 dark:text-red-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-3 border border-red-200 dark:border-red-800">
                        <div className="text-2xl font-bold text-red-700 dark:text-red-400">{item.stat}</div>
                        <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pastoralist Heritage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🏕️
              </motion.span>
              Pastoralist Heritage
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: '👨‍🌾',
                  title: 'Traditional Expertise',
                  points: ['Centuries of livestock breeding', 'Indigenous knowledge systems', 'Selective breeding practices', 'Animal husbandry skills']
                },
                {
                  icon: '🌾',
                  title: 'Natural Feeding',
                  points: ['Vast natural pastures', 'Diverse vegetation', 'No artificial feed', 'Seasonal migration patterns']
                },
                {
                  icon: '💪',
                  title: 'Hardy Breeds',
                  points: ['Disease resistant', 'Drought tolerant', 'High survival rates', 'Excellent meat quality']
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
                            <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
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

          {/* Quality & Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                ✅
              </motion.span>
              Quality & Certification Standards
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
                      🕌
                    </motion.div>
                    <h4 className="font-bold text-2xl text-green-700 dark:text-green-400">Halal Compliance</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Islamic slaughter methods',
                      'Certified halal professionals',
                      'Religious supervision',
                      'International halal certificates',
                      'Traceability documentation'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
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
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔬
                    </motion.div>
                    <h4 className="font-bold text-2xl text-blue-700 dark:text-blue-400">Health Standards</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Veterinary health checks',
                      'Export quarantine certified',
                      'Disease-free certification',
                      'Lab tested meat quality',
                      'Cold chain maintained'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-2 border-red-200 dark:border-red-800 mb-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    {[
                      { label: 'Production Costs', saving: '40-50%', icon: '🏭' },
                      { label: 'Feed Costs', saving: '60-70%', icon: '🌾' },
                      { label: 'Labor Costs', saving: '50-60%', icon: '👷' },
                      { label: 'Land Costs', saving: '70-80%', icon: '🏞️' }
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
                        <div className="text-3xl font-bold text-red-700 dark:text-red-400 mb-2">{item.saving}</div>
                        <div className="text-sm text-muted-foreground">Lower {item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'vs. Australian Suppliers',
                    savings: '30-40%',
                    icon: '🇦🇺',
                    benefits: ['Lower production costs', 'Competitive freight to ME', 'Halal certified']
                  },
                  {
                    title: 'vs. South American',
                    savings: '20-30%',
                    icon: '🌎',
                    benefits: ['Better quality standards', 'Shorter shipping to GCC', 'Reliable supply']
                  },
                  {
                    title: 'vs. European Suppliers',
                    savings: '35-45%',
                    icon: '🇪🇺',
                    benefits: ['Significantly lower costs', 'Natural grass-fed', 'Growing market access']
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
                        <div className="text-4xl font-bold text-red-700 dark:text-red-400 mb-4">{comparison.savings}</div>
                        <div className="text-xs text-muted-foreground mb-4">Average Cost Savings</div>
                        <div className="space-y-2">
                          {comparison.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
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
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 max-w-3xl mx-auto shadow-2xl">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  🏆
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Experience the Ethiopian Advantage</h3>
                <p className="text-lg text-red-50 mb-6">
                  Join leading importers worldwide who trust Ethiopian livestock for quality, halal compliance, and value
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/rfq">
                    <Button size="lg" className="bg-white text-red-700 hover:bg-red-50">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Request Quote
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Download className="h-5 w-5 mr-2" />
                    Download Catalog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Instant Price Estimator */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-rose-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
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
              <Card className="border-2 border-red-200 dark:border-red-800 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                      📊
                    </motion.span>
                    Calculate Your Estimate
                  </h3>

                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Simple pricing calculation for livestock/meat
                    const basePrice = selectedProduct === 'goats' ? 200 : 
                                     selectedProduct === 'sheep' ? 240 : 
                                     selectedProduct === 'cattle' ? 900 : 
                                     selectedProduct === 'goat-meat' ? 10 : 
                                     selectedProduct === 'mutton' ? 11 :
                                     selectedProduct === 'beef' ? 13 : 10;
                    
                    const qty = parseFloat(quantity) || 0;
                    const isLiveAnimal = ['goats', 'sheep', 'cattle'].includes(selectedProduct);
                    const shippingCost = isLiveAnimal ? 
                      (shippingMethod === 'air' ? 50 : 20) : 
                      (shippingMethod === 'air' ? 3 : 0.8);
                    
                    const destinationMultiplier = destination === 'middle-east' ? 1.0 : 
                                                 destination === 'europe' ? 1.3 : 
                                                 destination === 'asia' ? 1.2 : 
                                                 destination === 'africa' ? 0.9 : 1.1;
                    
                    const total = (basePrice * qty + (shippingCost * qty)) * destinationMultiplier;
                    setEstimatedPrice(Math.round(total));
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="product" className="text-base font-semibold">
                        Select Product *
                      </Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choose a product..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goats">🐐 Live Goats ($150-250/head)</SelectItem>
                          <SelectItem value="sheep">🐑 Live Sheep ($180-300/head)</SelectItem>
                          <SelectItem value="cattle">🐄 Live Cattle ($600-1000/head)</SelectItem>
                          <SelectItem value="goat-meat">🥩 Goat Meat ($8-12/kg)</SelectItem>
                          <SelectItem value="mutton">🍖 Mutton ($9-14/kg)</SelectItem>
                          <SelectItem value="beef">🥩 Beef Cuts ($10-16/kg)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-base font-semibold">
                        Quantity {['goats', 'sheep', 'cattle'].includes(selectedProduct) ? '(heads)' : '(kg)'} *
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder={['goats', 'sheep', 'cattle'].includes(selectedProduct) ? 'e.g., 50' : 'e.g., 500'}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min={['goats', 'sheep', 'cattle'].includes(selectedProduct) ? '10' : '200'}
                        step={['goats', 'sheep', 'cattle'].includes(selectedProduct) ? '10' : '100'}
                        className="h-12"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum order: {['goats', 'sheep', 'cattle'].includes(selectedProduct) ? '10 heads' : '200 kg'}
                      </p>
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
                          <SelectItem value="middle-east">🇦🇪 Middle East (UAE, Saudi, Kuwait, etc.)</SelectItem>
                          <SelectItem value="europe">🇪🇺 Europe (UK, Germany, etc.)</SelectItem>
                          <SelectItem value="asia">🌏 Asia (China, Malaysia, etc.)</SelectItem>
                          <SelectItem value="africa">🌍 Africa (Kenya, Egypt, etc.)</SelectItem>
                          <SelectItem value="americas">🌎 Americas (USA, Canada, etc.)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Shipping Method *</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Card 
                          className={`cursor-pointer transition-all ${shippingMethod === 'sea' ? 'border-2 border-red-600 bg-red-50 dark:bg-red-950' : 'border-2 hover:border-red-300'}`}
                          onClick={() => setShippingMethod('sea')}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-2">🚢</div>
                            <div className="font-semibold">Sea Freight</div>
                            <div className="text-xs text-muted-foreground">Economical</div>
                          </CardContent>
                        </Card>
                        <Card 
                          className={`cursor-pointer transition-all ${shippingMethod === 'air' ? 'border-2 border-red-600 bg-red-50 dark:bg-red-950' : 'border-2 hover:border-red-300'}`}
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
                      className="w-full h-12 text-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
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
                            <div className="font-semibold capitalize">{selectedProduct.replace('-', ' ')}</div>
                          </div>
                          <div className="text-left">
                            <div className="text-muted-foreground">Quantity:</div>
                            <div className="font-semibold">{quantity} {['goats', 'sheep', 'cattle'].includes(selectedProduct) ? 'heads' : 'kg'}</div>
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
                      <span>Final prices vary based on season, quality grade, and market conditions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Customs duties, quarantine fees, and local taxes not included</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Live animal prices include basic health certificates</span>
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
                      'Compare live animals vs meat',
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

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl"
                  >
                    📞
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-bold text-xl mb-1">Need a Detailed Quote?</h4>
                    <p className="text-red-100">Our team is ready to provide accurate pricing and answer your questions</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/rfq">
                      <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50">
                        <FileText className="h-5 w-5 mr-2" />
                        RFQ Form
                      </Button>
                    </Link>
                    <Link href="https://wa.me/251954742383">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Partnership Opportunities
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join our global network of livestock & meat distributors and grow your business with exclusive benefits
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
                  <Card className="h-full border-2 border-red-200 dark:border-red-800 hover:shadow-2xl transition-all relative overflow-hidden">
                    <div className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
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
                      <h4 className="font-bold text-xl mb-2 text-red-700 dark:text-red-400">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
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
                  desc: 'Reserved livestock/meat inventory year-round',
                  color: 'from-red-500 to-rose-500'
                },
                {
                  icon: '🚚',
                  title: 'Flexible Logistics',
                  desc: 'Customized shipping for live animals and frozen meat',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  icon: '🕌',
                  title: 'Halal Certification',
                  desc: 'Full halal documentation and compliance support',
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
                  volume: '500-1000 heads/month',
                  discount: '5%',
                  icon: '🥉',
                  color: 'from-orange-400 to-orange-600',
                  benefits: ['Standard pricing', 'Monthly invoicing', 'Email support']
                },
                {
                  tier: 'Silver',
                  volume: '1000-2500 heads/month',
                  discount: '10%',
                  icon: '🥈',
                  color: 'from-gray-400 to-gray-600',
                  benefits: ['Priority pricing', 'Flexible payment', 'Phone support', 'Quarterly reviews']
                },
                {
                  tier: 'Gold',
                  volume: '2500-5000 heads/month',
                  discount: '15%',
                  icon: '🥇',
                  color: 'from-yellow-400 to-yellow-600',
                  benefits: ['Best pricing', 'Extended credit', 'Dedicated manager', 'Monthly reviews', 'Marketing support'],
                  popular: true
                },
                {
                  tier: 'Platinum',
                  volume: '5000+ heads/month',
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
                          'First access to premium livestock',
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
                          'Minimum 2500 heads/month commitment',
                          'Established distribution network',
                          'Quarantine & cold storage facilities',
                          'Import license and halal certifications',
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

                  <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-800">
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
                          {['🇸🇦 Saudi Arabia', '🇦🇪 UAE', '🇶🇦 Qatar', '🇰🇼 Kuwait', '🇴🇲 Oman', '🇧🇭 Bahrain', '🇪🇬 Egypt', '🇯🇴 Jordan', '🇱🇧 Lebanon', '🇾🇪 Yemen', '🇲🇾 Malaysia', '🇮🇩 Indonesia'].map((territory, idx) => (
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
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 max-w-3xl mx-auto shadow-2xl">
              <CardContent className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  🤝
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h3>
                <p className="text-lg text-red-100 mb-6">
                  Join our network of successful distributors and grow your livestock & meat business
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-red-600 hover:bg-red-50"
                    onClick={() => setIsPartnershipFormOpen(true)}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Apply Now
                  </Button>
                  <Link href="https://wa.me/251954742383">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Discuss on WhatsApp
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partnership Form Dialog */}
      <Dialog open={isPartnershipFormOpen} onOpenChange={setIsPartnershipFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              Partnership Application
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert('Partnership application submitted! We will contact you shortly.');
            setIsPartnershipFormOpen(false);
          }}>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800">
              <p className="text-sm font-semibold">Let's discuss partnership opportunities and answer your questions!</p>
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
                <Label htmlFor="p-phone">Phone *</Label>
                <Input id="p-phone" type="tel" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-country">Country/Territory *</Label>
              <Input id="p-country" placeholder="e.g., Saudi Arabia, UAE" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-volume">Expected Monthly Volume *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">500-1000 heads/month</SelectItem>
                  <SelectItem value="1000-2500">1000-2500 heads/month</SelectItem>
                  <SelectItem value="2500-5000">2500-5000 heads/month</SelectItem>
                  <SelectItem value="5000+">5000+ heads/month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-experience">Business Experience *</Label>
              <Textarea id="p-experience" placeholder="Tell us about your experience in livestock/meat distribution..." rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-facilities">Facilities & Infrastructure *</Label>
              <Textarea id="p-facilities" placeholder="Describe your storage, cold chain, and distribution facilities..." rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-message">Additional Information</Label>
              <Textarea id="p-message" placeholder="Any other details you'd like to share..." rows={3} />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                Submit Application
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsPartnershipFormOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Play className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎥 Our Process</h2>
            <p className="text-lg text-muted-foreground">From farm to export</p>
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
                  <Card className={`hover:shadow-xl transition-all cursor-pointer ${activeVideo === index ? 'ring-2 ring-red-600' : ''}`}>
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2 text-center">{video.thumbnail}</div>
                      <h4 className="font-semibold text-sm text-center mb-1">{video.title}</h4>
                      <div className="flex items-center justify-center gap-1 text-red-600">
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
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🏆 Certifications</h2>
            <p className="text-lg text-muted-foreground">Quality and compliance</p>
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
                <Card className="text-center hover:shadow-2xl transition-all border-2 border-red-200 dark:border-red-800">
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
            <MapPin className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📍 Origin Regions</h2>
            <p className="text-lg text-muted-foreground">Sourced from Ethiopia's pastoralist zones</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 dark:bg-red-950 rounded-2xl p-4 md:p-8 mb-8"
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
                        ? 'ring-2 ring-red-600 shadow-xl scale-105' 
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
                            <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">
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

      {/* Global Export Markets */}
      <section className="py-16 bg-gradient-to-b from-white to-red-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌍 Our Global Export Markets</h2>
            <p className="text-lg text-muted-foreground">Trusted by importers across 15+ countries worldwide</p>
          </motion.div>

          {/* Global Reach Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-2 border-red-200 dark:border-red-800">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">🌍 Our Global Export Network</h3>
                  <p className="text-muted-foreground">Connecting Ethiopian livestock to halal markets worldwide</p>
                </div>

                {/* Simple Grid Layout */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* GCC Countries */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-orange-600">🕌 GCC Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇸🇦', name: 'Saudi Arabia', volume: 'High' },
                        { flag: '🇦🇪', name: 'United Arab Emirates', volume: 'High' },
                        { flag: '🇰🇼', name: 'Kuwait', volume: 'High' },
                        { flag: '🇶🇦', name: 'Qatar', volume: 'Medium' },
                        { flag: '🇴🇲', name: 'Oman', volume: 'Medium' },
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

                  {/* Middle East & North Africa */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-blue-600">🌍 MENA Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇪🇬', name: 'Egypt', volume: 'High' },
                        { flag: '🇯🇴', name: 'Jordan', volume: 'Medium' },
                        { flag: '🇱🇧', name: 'Lebanon', volume: 'Medium' },
                        { flag: '🇾🇪', name: 'Yemen', volume: 'Growing' },
                        { flag: '🇱🇾', name: 'Libya', volume: 'Growing' },
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

                  {/* Asian Markets */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-center text-red-600">🌏 Asian Markets</h4>
                    <div className="space-y-3">
                      {[
                        { flag: '🇲🇾', name: 'Malaysia', volume: 'High' },
                        { flag: '🇮🇩', name: 'Indonesia', volume: 'Growing' },
                        { flag: '🇧🇩', name: 'Bangladesh', volume: 'Growing' },
                        { flag: '🇵🇰', name: 'Pakistan', volume: 'Growing' },
                        { flag: '🇹🇷', name: 'Turkey', volume: 'Medium' },
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
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-700 text-white px-8 py-4 rounded-full shadow-2xl">
                    <span className="text-4xl">🇪🇹</span>
                    <div className="text-left">
                      <div className="font-bold text-lg">Ethiopia</div>
                      <div className="text-sm text-red-100">Origin of Premium Halal Livestock</div>
                    </div>
                  </div>
                </motion.div>
                <div className="p-6 bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">15+</div>
                      <div className="text-sm text-red-100">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-sm text-red-100">Continents</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">10K+</div>
                      <div className="text-sm text-red-100">Animals/Month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm text-red-100">Halal Certified</div>
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
                { flag: '🇸🇦', name: 'Saudi Arabia', region: 'GCC', volume: 'High' },
                { flag: '🇦🇪', name: 'UAE', region: 'GCC', volume: 'High' },
                { flag: '🇰🇼', name: 'Kuwait', region: 'GCC', volume: 'High' },
                { flag: '🇶🇦', name: 'Qatar', region: 'GCC', volume: 'Medium' },
                { flag: '🇴🇲', name: 'Oman', region: 'GCC', volume: 'Medium' },
                { flag: '🇪🇬', name: 'Egypt', region: 'MENA', volume: 'High' },
                { flag: '🇯🇴', name: 'Jordan', region: 'MENA', volume: 'Medium' },
                { flag: '🇲🇾', name: 'Malaysia', region: 'Asia', volume: 'High' },
                { flag: '🇮🇩', name: 'Indonesia', region: 'Asia', volume: 'Growing' },
                { flag: '🇹🇷', name: 'Turkey', region: 'Asia', volume: 'Medium' }
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900 cursor-pointer">
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
                  countries: 'Saudi, UAE, Kuwait, Qatar, Oman',
                  requirements: [
                    'Halal certification mandatory',
                    'GCC standardization compliance',
                    'Arabic labeling required',
                    'Vet health certificates',
                    'Premium quality focus'
                  ],
                  specialties: ['Live sheep & goats', 'Fresh halal meat', 'Frozen cuts'],
                  color: 'from-amber-500 to-orange-500'
                },
                {
                  region: 'MENA Markets',
                  icon: '🌍',
                  countries: 'Egypt, Jordan, Lebanon, Yemen',
                  requirements: [
                    'Halal certification',
                    'Competitive pricing',
                    'Bulk quantities',
                    'Flexible payment terms',
                    'Local language docs'
                  ],
                  specialties: ['Live cattle', 'Frozen meat', 'Offal products'],
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Markets',
                  icon: '🌏',
                  countries: 'Malaysia, Indonesia, Bangladesh',
                  requirements: [
                    'Halal certification',
                    'Quarantine compliance',
                    'Cost-effective pricing',
                    'Container shipments',
                    'Quality consistency'
                  ],
                  specialties: ['Frozen meat', 'Beef cuts', 'Mutton'],
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-red-100 dark:border-red-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${market.color}`}></div>
                    <CardContent className="p-6">
                      <div className="text-6xl mb-3 text-center">{market.icon}</div>
                      <h4 className="font-bold text-xl mb-2 text-center text-red-700 dark:text-red-400">{market.region}</h4>
                      <p className="text-xs text-center text-muted-foreground mb-4 italic">{market.countries}</p>
                      
                      <div className="mb-4">
                        <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          Requirements:
                        </div>
                        <ul className="space-y-1">
                          {market.requirements.map((req, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2">
                              <span className="text-red-600 mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4 text-orange-600" />
                          Popular Products:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {market.specialties.map((spec, idx) => (
                            <span key={idx} className="text-xs bg-red-50 dark:bg-red-950 px-2 py-1 rounded-full border border-red-200 dark:border-red-800">
                              {spec}
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

          {/* Regional Success Stories */}
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
                  flag: '🇸🇦',
                  client: 'Riyadh Halal Meat Co.',
                  story: 'Started with 500 sheep monthly, now our largest client importing 5,000+ heads per month. Our consistent halal quality and competitive pricing helped them expand to 30+ retail locations across Saudi Arabia.',
                  products: ['Live Sheep', 'Live Goats', 'Frozen Mutton'],
                  achievement: '5,000+ heads monthly',
                  duration: '3+ years partnership',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  region: 'UAE Success',
                  flag: '🇦🇪',
                  client: 'Dubai Premium Meats',
                  story: 'First Ethiopian supplier to meet their premium standards. Now supplying 50 tons of frozen halal beef monthly to major hotels and restaurants in Dubai and Abu Dhabi.',
                  products: ['Frozen Beef', 'Beef Cuts', 'Premium Steaks'],
                  achievement: '50 tons monthly',
                  duration: '2+ years partnership',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  region: 'Asian Success',
                  flag: '🇲🇾',
                  client: 'Kuala Lumpur Halal Traders',
                  story: 'Competitive pricing and reliable halal certification won us this major contract. Supplying 100+ tons of frozen meat monthly to Malaysian food processing industry and retail chains.',
                  products: ['Frozen Goat Meat', 'Mutton', 'Beef'],
                  achievement: '100+ tons monthly',
                  duration: '2.5 years partnership',
                  color: 'from-red-500 to-pink-500'
                },
                {
                  region: 'Egypt Success',
                  flag: '🇪🇬',
                  client: 'Cairo Livestock Importers',
                  story: 'Started with a 200-head trial shipment, now importing 2,000+ cattle monthly. Our competitive pricing and quality livestock helped them become the leading cattle distributor in Cairo.',
                  products: ['Live Cattle', 'Live Oxen', 'Fresh Beef'],
                  achievement: '2,000+ cattle monthly',
                  duration: '18 months partnership',
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
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-red-100 dark:border-red-900 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${success.color}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{success.flag}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-red-700 dark:text-red-400 mb-1">{success.region}</h4>
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
                              <span key={idx} className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full">
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
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Download className="h-16 w-16 text-red-600 mx-auto mb-4" />
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
                <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-red-100 dark:border-red-900">
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
                { step: 1, icon: '🐑', title: 'Selection', desc: 'Vet-checked healthy animals' },
                { step: 2, icon: '🚜', title: 'Transport', desc: 'Safe animal transport' },
                { step: 3, icon: '🕌', title: 'Halal Process', desc: 'Islamic slaughter methods' },
                { step: 4, icon: '🔪', title: 'Cutting', desc: 'Professional butchering' },
                { step: 5, icon: '📦', title: 'Packaging', desc: 'Vacuum sealed' },
                { step: 6, icon: '❄️', title: 'Freezing', desc: 'Blast freeze & storage' },
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
                  <Card className="h-full text-center hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900">
                    <CardContent className="p-4">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-2 font-bold">
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
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Package className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📦 Flexible Packaging Options</h2>
            <p className="text-lg text-muted-foreground">Customized packaging to meet your market requirements</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: '📦', 
                name: 'Vacuum Sealed', 
                desc: '5kg, 10kg, 20kg boxes',
                features: ['Airtight', 'Extended shelf life', 'Halal labeled']
              },
              { 
                icon: '🧊', 
                name: 'Frozen Blocks', 
                desc: '10kg, 20kg, 25kg blocks',
                features: ['Blast frozen', 'Industrial use', 'Cost effective']
              },
              { 
                icon: '🎁', 
                name: 'Retail Packs', 
                desc: '500g, 1kg, 2kg packs',
                features: ['Consumer ready', 'Branded', 'Attractive']
              },
              { 
                icon: '🚚', 
                name: 'Bulk Containers', 
                desc: 'Large volume orders',
                features: ['Refrigerated', 'Full container', 'Wholesale']
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3">{pkg.icon}</div>
                    <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
                    <div className="space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-red-600" />
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
            <Truck className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚚 Shipping & Logistics</h2>
            <p className="text-lg text-muted-foreground">Multiple shipping options to suit your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '✈️',
                method: 'Air Freight',
                time: '3-5 days',
                best: 'Fresh meat, urgent orders',
                features: ['Fastest delivery', 'Temperature controlled', 'Premium quality', 'Higher cost'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🚢',
                method: 'Sea Freight',
                time: '15-30 days',
                best: 'Frozen meat, large volumes',
                features: ['Cost effective', 'Bulk orders', 'Refrigerated containers', 'Economical'],
                color: 'from-red-500 to-rose-500'
              },
              {
                icon: '🚛',
                method: 'Land Transport',
                time: '1-7 days',
                best: 'Live animals, regional',
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
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-red-100 dark:border-red-900 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${shipping.color}`}></div>
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4 text-center">{shipping.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-red-700 dark:text-red-400">{shipping.method}</h3>
                    <div className="text-center mb-4">
                      <div className="inline-block bg-red-100 dark:bg-red-900 px-3 py-1 rounded-full text-sm font-semibold text-red-700 dark:text-red-400">
                        {shipping.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 text-center italic">Best for: {shipping.best}</p>
                    <div className="space-y-2">
                      {shipping.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
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
                name: 'Abdullah Al-Mansoori',
                company: 'Dubai Halal Meats',
                country: '🇦🇪 UAE',
                text: 'Excellent quality halal meat! The frozen beef arrived perfectly packaged and maintained cold chain. Hafa Trading is now our primary livestock supplier.',
                rating: 5
              },
              {
                name: 'Mohammed Al-Rashid',
                company: 'Riyadh Meat Trading',
                country: '🇸🇦 Saudi Arabia',
                text: 'Best quality live sheep and goats. Consistent supply, competitive pricing, and full halal certification. Highly recommend for GCC markets.',
                rating: 5
              },
              {
                name: 'Ahmad Hassan',
                company: 'Kuwait Livestock Co.',
                country: '🇰🇼 Kuwait',
                text: 'Reliable partner for Ethiopian livestock. Health certificates and quarantine compliance are top-notch. Great communication throughout.',
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
                <Card className="h-full hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-900">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-red-700 dark:text-red-400">{testimonial.name}</p>
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
      <section className="py-16 bg-white dark:bg-gray-950">
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
                q: 'What is the minimum order quantity for livestock?',
                a: 'MOQ varies by animal type: 50 heads for sheep/goats, 20 heads for cattle. For frozen meat, minimum is 500kg. Contact us for specific requirements.'
              },
              {
                q: 'How do you ensure halal compliance?',
                a: 'All animals are slaughtered by certified halal professionals following Islamic methods. We provide full halal certification and religious supervision documentation.'
              },
              {
                q: 'What health certificates do you provide?',
                a: 'Veterinary health certificate, Export quarantine certificate, Halal certification, and Certificate of Origin. Additional documents available upon request.'
              },
              {
                q: 'Can you provide meat samples?',
                a: 'Yes! We can send frozen meat samples via air courier. Sample costs are deductible from first commercial order.'
              },
              {
                q: 'What are your payment terms?',
                a: 'We accept T/T, L/C at sight, and can discuss flexible terms for established clients. Different terms for live animals vs frozen meat.'
              },
              {
                q: 'How long does shipping take?',
                a: 'Air freight: 3-5 days for frozen meat. Sea freight: 15-30 days. Live animals require special arrangements and quarantine compliance.'
              },
              {
                q: 'Do you handle export documentation?',
                a: 'Yes, we handle all export documentation including customs clearance, health certificates, halal certification, and shipping documents.'
              },
              {
                q: 'What packaging options are available?',
                a: 'Vacuum sealed boxes (5-20kg), frozen blocks (10-25kg), retail packs (500g-2kg), and bulk refrigerated containers for large orders.'
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
                    <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400 flex items-start gap-2">
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
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Livestock & Meat?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Premium quality meat products for global markets
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <FileText className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="tel:+251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-red-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </Link>
            <Link href="mailto:contact.hafatrading.com">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-red-600">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
            <Link href="https://wa.me/251954742383">
              <Button size="lg" className="border-2 border-white !bg-transparent text-white hover:!bg-white hover:text-red-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Animal Detail Modal */}
      <Dialog open={isAnimalModalOpen} onOpenChange={setIsAnimalModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedAnimal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-red-700 dark:text-red-400 flex items-center gap-3">
                  <span className="text-5xl">{selectedAnimal.emoji}</span>
                  {selectedAnimal.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Price and Grade */}
                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Price Range</div>
                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">{selectedAnimal.price}</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full font-bold">
                    {selectedAnimal.grade}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-700 dark:text-red-400">Breeds Available:</h4>
                    <ul className="space-y-1">
                      {selectedAnimal.details.breeds.map((breed: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{breed}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-700 dark:text-red-400">Specifications:</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Average Weight:</strong> {selectedAnimal.details.avgWeight}</p>
                      <p><strong>Age:</strong> {selectedAnimal.details.age}</p>
                      <p><strong>Origin:</strong> {selectedAnimal.details.origin}</p>
                      <p><strong>Minimum Order:</strong> {selectedAnimal.details.minOrder}</p>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Quality Standards:</h4>
                  <p className="text-sm text-muted-foreground">{selectedAnimal.details.specifications}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">Key Benefits:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedAnimal.details.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Link href="/rfq" className="flex-1">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <FileText className="mr-2 h-4 w-4" />
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="https://wa.me/251954742383" className="flex-1">
                    <Button variant="outline" className="w-full border-red-600 text-red-700 hover:bg-red-50">
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

      {/* Meat Product Detail Modal */}
      <Dialog open={isMeatModalOpen} onOpenChange={setIsMeatModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMeat && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-red-700 dark:text-red-400 flex items-center gap-3">
                  <span className="text-5xl">{selectedMeat.emoji}</span>
                  {selectedMeat.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Price and Grade */}
                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Price Range</div>
                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">{selectedMeat.price}</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full font-bold">
                    {selectedMeat.grade}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-700 dark:text-red-400">Available Cuts:</h4>
                    <ul className="space-y-1">
                      {selectedMeat.details.cuts.map((cut: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{cut}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-700 dark:text-red-400">Product Details:</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Packaging:</strong> {selectedMeat.details.packaging}</p>
                      <p><strong>Shelf Life:</strong> {selectedMeat.details.shelfLife}</p>
                      <p><strong>Origin:</strong> {selectedMeat.details.origin}</p>
                      <p><strong>Minimum Order:</strong> {selectedMeat.details.minOrder}</p>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Quality Standards:</h4>
                  <p className="text-sm text-muted-foreground">{selectedMeat.details.specifications}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">Key Benefits:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedMeat.details.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Link href="/rfq" className="flex-1">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <FileText className="mr-2 h-4 w-4" />
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="https://wa.me/251954742383" className="flex-1">
                    <Button variant="outline" className="w-full border-red-600 text-red-700 hover:bg-red-50">
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
