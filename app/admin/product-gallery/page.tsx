'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image as ImageIcon, Factory, ArrowLeftRight, Loader2 } from 'lucide-react';
import { collection, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import GallerySection from '@/components/admin/gallery-section';
import BeforeAfterSection from '@/components/admin/before-after-section';
import FacilitiesSection from '@/components/admin/facilities-section';

interface GalleryItem {
  id: string;
  section: 'gallery' | 'beforeAfter' | 'facilities';
  category?: 'Fresh Harvest' | 'Processing' | 'Export Ready';
  productName?: string;
  name: string;
  description: string;
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  emoji: string;
  order: number;
  beforeTitle?: string;
  beforeDesc?: string;
  beforeIcon?: string;
  beforeFeatures?: string[];
  afterTitle?: string;
  afterDesc?: string;
  afterIcon?: string;
  afterFeatures?: string[];
  color?: string;
  facilityFeatures?: string[];
  createdAt: Date;
}

export default function ProductGalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const q = query(collection(db, 'productGallery'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const loadedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as GalleryItem[];
      setItems(loadedItems);
    } catch (error) {
      console.error('Error loading items:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      await deleteDoc(doc(db, 'productGallery', item.id));
      toast.success('Item deleted successfully');
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const galleryItems = items.filter(i => i.section === 'gallery');
  const beforeAfterItems = items.filter(i => i.section === 'beforeAfter');
  const facilityItems = items.filter(i => i.section === 'facilities');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Product Gallery Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage photos for Product Gallery, Before & After, and Facilities sections
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Product Gallery ({galleryItems.length})
          </TabsTrigger>
          <TabsTrigger value="beforeAfter" className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Before & After ({beforeAfterItems.length})
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <Factory className="h-4 w-4" />
            Facilities ({facilityItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <GallerySection items={galleryItems} onDelete={handleDelete} onReload={loadItems} />
        </TabsContent>

        <TabsContent value="beforeAfter">
          <BeforeAfterSection items={beforeAfterItems} onDelete={handleDelete} onReload={loadItems} />
        </TabsContent>

        <TabsContent value="facilities">
          <FacilitiesSection items={facilityItems} onDelete={handleDelete} onReload={loadItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
