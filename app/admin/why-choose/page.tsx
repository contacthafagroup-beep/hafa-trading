'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Video, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhyChooseData {
  title: string;
  subtitle: string;
  videoUrl: string;
  videoCaption: string;
  ctaText: string;
  ctaLink: string;
  features: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    videoUrl: string;
  }[];
}

export default function WhyChooseAdminPage() {
  const [data, setData] = useState<WhyChooseData>({
    title: 'Why Choose Hafa Trading PLC?',
    subtitle: 'Trusted global exporter of premium agricultural products, herbs, livestock, and spices — delivering freshness, quality, and reliability worldwide.',
    videoUrl: '',
    videoCaption: 'Quality You Can Trust. From Farm to Market.',
    ctaText: '🛒 Explore All Products',
    ctaLink: '/export-products',
    features: [
      {
        title: 'Direct Farm Sourcing',
        subtitle: 'Freshness Guaranteed',
        description: 'We partner directly with local farmers, cooperatives, and rural suppliers, ensuring 100% traceable, ethically-grown products — from fresh rosemary and spices to premium vegetables and cereals.',
        icon: '🌱',
        videoUrl: ''
      },
      {
        title: 'Global Logistics Support',
        subtitle: 'Air • Sea • Road',
        description: 'From Ethiopia to the world — delivered with precision, speed, and temperature-controlled logistics. We coordinate air freight, sea freight, and inland transport with real-time tracking.',
        icon: '🌐',
        videoUrl: ''
      },
      {
        title: 'Customized Packaging',
        subtitle: 'Options',
        description: 'Choose from vacuum-sealed, eco-friendly, private-label, and bulk export packaging options — all designed to keep products fresh and preserve aroma during long transport.',
        icon: '📦',
        videoUrl: ''
      },
      {
        title: 'Competitive Wholesale Pricing',
        subtitle: '',
        description: 'By cutting middlemen and sourcing straight from farms, we deliver global market–competitive pricing with transparent quotes and stable supply.',
        icon: '💲',
        videoUrl: ''
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Load data from Firestore
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'siteContent', 'whyChoose');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setData(docSnap.data() as WhyChooseData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'siteContent', 'whyChoose');
      await setDoc(docRef, data, { merge: true });
      
      toast({
        title: 'Success',
        description: 'Why Choose section updated successfully'
      });
    } catch (error: any) {
      console.error('Error saving data:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to save changes. Check console for details.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-green-600" />
          Why Choose Hafa Section
        </h1>
        <p className="text-muted-foreground">Manage the Why Choose Hafa section content</p>
      </motion.div>

      <div className="space-y-6">
        {/* Title & Subtitle */}
        <Card>
          <CardHeader>
            <CardTitle>Title & Subtitle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Why Choose Hafa Trading PLC?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <Textarea
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                placeholder="Trusted global exporter..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Section
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video URL (YouTube or direct link)</label>
              <Input
                value={data.videoUrl}
                onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
              />
              <p className="text-xs text-muted-foreground mt-1">
                For YouTube: Use the full watch URL or embed URL
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video Caption</label>
              <Input
                value={data.videoCaption}
                onChange={(e) => setData({ ...data, videoCaption: e.target.value })}
                placeholder="Quality You Can Trust. From Farm to Market."
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        {data.features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Feature {index + 1}: {feature.icon} {feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                  <Input
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                    placeholder="🌱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    placeholder="Direct Farm Sourcing"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <Input
                  value={feature.subtitle}
                  onChange={(e) => updateFeature(index, 'subtitle', e.target.value)}
                  placeholder="Freshness Guaranteed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Feature description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Feature Video URL (Optional)
                </label>
                <Input
                  value={feature.videoUrl}
                  onChange={(e) => updateFeature(index, 'videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or video file URL"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This video will play when the feature card is clicked
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* CTA Button */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Button</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <Input
                value={data.ctaText}
                onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                placeholder="🛒 Explore All Products"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Link</label>
              <Input
                value={data.ctaLink}
                onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
                placeholder="/export-products"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            <Save className="w-5 h-5 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
