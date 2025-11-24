'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Insight {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  thumbnail?: string;
  content: string;
  featured: boolean;
  visible: boolean;
}

const categoryIcons: { [key: string]: string } = {
  'Herbs & Spices': '🌿',
  'Fresh Vegetables': '🥬',
  'Cereals & Legumes': '🌾',
  'Regulations': '🧪',
  'Logistics': '🚚',
  'Agriculture': '🌱',
  'Livestock': '🐑',
  'Trade News': '📰',
  'Export': '✈️'
};

// Default insights for fallback
const defaultInsights: { [key: string]: Insight } = {
  '1': {
    id: '1',
    title: 'UAE Increases Demand for Fresh Rosemary & Herbs',
    summary: 'Export opportunities rise for East African suppliers.',
    category: 'Herbs & Spices',
    date: '2025-03-22',
    content: 'UAE buyers show increasing preference for Ethiopian rosemary due to its strong aroma and long-lasting freshness. Market demand is projected to grow 25% over the next year, creating major opportunities for suppliers.\n\nThe demand surge is driven by the growing restaurant and hospitality sector in Dubai and Abu Dhabi, where fresh herbs are essential ingredients. Ethiopian rosemary is particularly valued for its organic cultivation methods and superior quality compared to competitors.\n\nKey Market Insights:\n\n1. Price Premium: Ethiopian rosemary commands 15-20% higher prices than competing origins due to superior quality.\n\n2. Growing Demand: UAE imports of fresh herbs increased by 35% in 2024, with rosemary leading the growth.\n\n3. Supply Chain: Direct air freight connections from Addis Ababa to Dubai ensure freshness within 48 hours.\n\n4. Certification Requirements: Organic certification and GlobalGAP compliance are increasingly important for premium buyers.\n\n5. Market Expansion: Beyond UAE, similar demand patterns are emerging in Saudi Arabia and Qatar.\n\nRecommendations for Exporters:\n\n- Invest in cold chain infrastructure to maintain quality\n- Obtain organic and food safety certifications\n- Build relationships with UAE importers and distributors\n- Consider contract farming to ensure consistent supply\n- Explore value-added products like dried herbs and essential oils',
    featured: true,
    visible: true
  },
  '2': {
    id: '2',
    title: 'Saudi Arabia Introduces New Quality Requirements on Fresh Produce Imports',
    summary: 'Updated regulations for agricultural exports.',
    category: 'Regulations',
    date: '2025-03-20',
    content: 'Saudi Arabia has announced new quality standards for imported fresh produce, effective from April 2025. All exporters must comply with enhanced traceability requirements and obtain updated certifications.\n\nKey Changes:\n\n1. Mandatory pesticide residue testing for all shipments\n2. Enhanced cold chain documentation requirements\n3. Stricter packaging and labeling standards\n4. Digital traceability system implementation\n5. Updated phytosanitary certificate requirements\n\nImpact on Exporters:\n\nThe new regulations will require significant investments in quality control systems and documentation processes. However, they also present opportunities for well-prepared exporters to gain market share.\n\nCompliance Timeline:\n\n- March 2025: Registration in new digital system\n- April 2025: New requirements take effect\n- May 2025: Grace period ends, full enforcement begins\n\nSupport Available:\n\n- Ethiopian Ministry of Agriculture providing training workshops\n- Certification bodies offering expedited services\n- Export promotion agencies assisting with documentation',
    featured: false,
    visible: true
  },
  '3': {
    id: '3',
    title: 'China Expands Market for East African Legumes',
    summary: 'New trade agreements open opportunities.',
    category: 'Cereals & Legumes',
    date: '2025-03-18',
    content: 'China has signed new trade agreements with East African countries, significantly expanding market access for legumes including chickpeas, lentils, and beans. The agreement reduces import tariffs by 40%.\n\nMarket Opportunity:\n\nThis development presents substantial opportunities for Ethiopian exporters, as China\'s growing middle class increasingly demands high-protein plant-based foods. Market analysts predict a 300% increase in legume exports over the next three years.\n\nKey Products in Demand:\n\n1. Chickpeas: Premium quality for hummus production\n2. Red Lentils: High demand for traditional Chinese dishes\n3. White Beans: Growing market for health-conscious consumers\n4. Green Mung Beans: Traditional ingredient in Chinese cuisine\n\nMarket Entry Strategy:\n\n- Partner with Chinese importers and distributors\n- Attend trade shows in Shanghai and Beijing\n- Obtain Chinese quality certifications\n- Develop relationships with food processors\n- Consider establishing representative offices\n\nPrice Outlook:\n\nWith reduced tariffs, Ethiopian legumes will be more competitive. Expected price increases of 20-30% for exporters while remaining competitive for Chinese buyers.',
    featured: false,
    visible: true
  }
};

export default function InsightDetailPage() {
  const params = useParams();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        if (!db) {
          // Use default insight if Firebase not initialized
          const defaultInsight = defaultInsights[params.id as string];
          if (defaultInsight) {
            setInsight(defaultInsight);
          }
          setLoading(false);
          return;
        }
        
        const insightDoc = await getDoc(doc(db, 'insights', params.id as string));
        if (insightDoc.exists()) {
          setInsight({ id: insightDoc.id, ...insightDoc.data() } as Insight);
        } else {
          // Use default insight if Firebase doesn't have it
          const defaultInsight = defaultInsights[params.id as string];
          if (defaultInsight) {
            setInsight(defaultInsight);
          }
        }
      } catch (error) {
        console.log('Using default insight');
        const defaultInsight = defaultInsights[params.id as string];
        if (defaultInsight) {
          setInsight(defaultInsight);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⏳
          </motion.div>
          <p className="text-muted-foreground">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Insight Not Found</h1>
          <p className="text-muted-foreground mb-8">The insight you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="py-12 bg-gradient-to-b from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Insights
              </Button>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-4xl">
              {categoryIcons[insight.category] || '📰'}
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
              {insight.category}
            </span>
            {insight.featured && (
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold">
                ⭐ Featured
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            {insight.title}
          </motion.h1>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-muted-foreground mb-8"
          >
            <Calendar className="w-5 h-5" />
            {new Date(insight.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </motion.div>

          {/* Thumbnail */}
          {insight.thumbnail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={insight.thumbnail}
                alt={insight.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          )}

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border-l-4 border-purple-600"
          >
            <p className="text-lg font-semibold">{insight.summary}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div className="whitespace-pre-wrap leading-relaxed">
              {insight.content}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t"
          >
            <h3 className="text-xl font-bold mb-4">Share this insight</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">📧 Email</Button>
              <Button variant="outline" size="sm">🔗 Copy Link</Button>
              <Button variant="outline" size="sm">📱 WhatsApp</Button>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Insights
              </Button>
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
