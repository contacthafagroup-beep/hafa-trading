'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Loader2, X } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  section: 'gallery' | 'beforeAfter' | 'facilities';
  category?: 'Fresh Harvest' | 'Processing' | 'Export Ready';
  name: string;
  description: string;
  emoji: string;
  imageUrl: string;
  facilityFeatures?: string[];
  order: number;
  createdAt?: Date;
}

interface Props {
  items: GalleryItem[];
  onDelete: (item: GalleryItem) => Promise<void>;
  onReload: () => void;
}

export default function FacilitiesSection({ items, onDelete, onReload }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    emoji: '🏭',
    facilityFeatures: ['', '', '', ''],
    imageFile: null as File | null,
    order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingItem?.imageUrl || '';

      if (formData.imageFile) {
        const result = await uploadToCloudinary(formData.imageFile, (progress) => {
          setUploadProgress(progress);
        });
        imageUrl = result.url;
      }

      const itemData = {
        section: 'facilities',
        name: formData.name,
        description: formData.description,
        emoji: formData.emoji,
        facilityFeatures: formData.facilityFeatures.filter(f => f.trim()),
        imageUrl,
        order: formData.order,
        updatedAt: new Date()
      };

      if (!db) {
        toast.error('Firebase not initialized');
        return;
      }

      if (editingItem) {
        await updateDoc(doc(db, 'productGallery', editingItem.id), itemData);
        toast.success('Facility updated');
      } else {
        await addDoc(collection(db, 'productGallery'), {
          ...itemData,
          createdAt: new Date()
        });
        toast.success('Facility added');
      }

      resetForm();
      setIsDialogOpen(false);
      onReload();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      emoji: item.emoji,
      facilityFeatures: [...(item.facilityFeatures || []), '', '', '', ''].slice(0, 4),
      imageFile: null,
      order: item.order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      emoji: '🏭',
      facilityFeatures: ['', '', '', ''],
      imageFile: null,
      order: 0
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Upload photos of your facilities (farms, processing centers, cold chain)
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Facility' : 'Add New Facility'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Facility Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Partner Farms"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Emoji</Label>
                  <Input
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Over 50 certified farms across Ethiopia"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Features (4 items)</Label>
                {formData.facilityFeatures.map((feature, idx) => (
                  <Input
                    key={idx}
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.facilityFeatures];
                      newFeatures[idx] = e.target.value;
                      setFormData({ ...formData, facilityFeatures: newFeatures });
                    }}
                    placeholder={`Feature ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label>Facility Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                />
                {editingItem?.imageUrl && !formData.imageFile && (
                  <img 
                    src={editingItem.imageUrl} 
                    alt={editingItem.name}
                    className="w-full h-48 object-cover rounded border mt-2"
                  />
                )}
                {uploading && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingItem ? 'Update' : 'Add'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-lg flex items-center justify-center mb-3 overflow-hidden relative">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-8xl">{item.emoji}</span>
                  )}
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xl shadow-lg">
                    {item.emoji}
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                {item.facilityFeatures && item.facilityFeatures.length > 0 && (
                  <div className="space-y-1 mb-3">
                    {item.facilityFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mb-3">Order: {item.order}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(item)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-3">
            <CardContent className="p-12 text-center text-muted-foreground">
              <p>No facilities yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
