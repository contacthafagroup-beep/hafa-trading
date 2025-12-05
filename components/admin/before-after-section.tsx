'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, Loader2 } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  section: 'gallery' | 'beforeAfter' | 'facilities';
  category?: 'Fresh Harvest' | 'Processing' | 'Export Ready';
  productName?: string;
  name: string;
  description: string;
  imageUrl: string;
  emoji: string;
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
  order: number;
  createdAt?: Date;
}

interface Props {
  items: GalleryItem[];
  onDelete: (item: GalleryItem) => Promise<void>;
  onReload: () => void;
}

export default function BeforeAfterSection({ items, onDelete, onReload }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    productName: '',
    emoji: '🍅',
    beforeTitle: '',
    beforeDesc: '',
    beforeIcon: '🌱',
    beforeFeatures: ['', '', '', ''],
    beforeImageFile: null as File | null,
    afterTitle: '',
    afterDesc: '',
    afterIcon: '📦',
    afterFeatures: ['', '', '', ''],
    afterImageFile: null as File | null,
    color: 'from-red-500 to-rose-600',
    order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let beforeImageUrl = editingItem?.beforeImageUrl || '';
      let afterImageUrl = editingItem?.afterImageUrl || '';

      if (formData.beforeImageFile) {
        const result = await uploadToCloudinary(formData.beforeImageFile, (progress) => {
          setUploadProgress(progress / 2);
        });
        beforeImageUrl = result.url;
      }

      if (formData.afterImageFile) {
        const result = await uploadToCloudinary(formData.afterImageFile, (progress) => {
          setUploadProgress(50 + progress / 2);
        });
        afterImageUrl = result.url;
      }

      const itemData = {
        section: 'beforeAfter',
        productName: formData.productName,
        emoji: formData.emoji,
        beforeTitle: formData.beforeTitle,
        beforeDesc: formData.beforeDesc,
        beforeIcon: formData.beforeIcon,
        beforeFeatures: formData.beforeFeatures.filter(f => f.trim()),
        beforeImageUrl,
        afterTitle: formData.afterTitle,
        afterDesc: formData.afterDesc,
        afterIcon: formData.afterIcon,
        afterFeatures: formData.afterFeatures.filter(f => f.trim()),
        afterImageUrl,
        color: formData.color,
        order: formData.order,
        updatedAt: new Date()
      };

      if (!db) {
        toast.error('Firebase not initialized');
        return;
      }

      if (editingItem) {
        await updateDoc(doc(db, 'productGallery', editingItem.id), itemData);
        toast.success('Before & After updated');
      } else {
        await addDoc(collection(db, 'productGallery'), {
          ...itemData,
          createdAt: new Date()
        });
        toast.success('Before & After added');
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
      productName: item.productName || '',
      emoji: item.emoji,
      beforeTitle: item.beforeTitle || '',
      beforeDesc: item.beforeDesc || '',
      beforeIcon: item.beforeIcon || '🌱',
      beforeFeatures: [...(item.beforeFeatures || []), '', '', '', ''].slice(0, 4),
      beforeImageFile: null,
      afterTitle: item.afterTitle || '',
      afterDesc: item.afterDesc || '',
      afterIcon: item.afterIcon || '📦',
      afterFeatures: [...(item.afterFeatures || []), '', '', '', ''].slice(0, 4),
      afterImageFile: null,
      color: item.color || 'from-red-500 to-rose-600',
      order: item.order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      productName: '',
      emoji: '🍅',
      beforeTitle: '',
      beforeDesc: '',
      beforeIcon: '🌱',
      beforeFeatures: ['', '', '', ''],
      beforeImageFile: null,
      afterTitle: '',
      afterDesc: '',
      afterIcon: '📦',
      afterFeatures: ['', '', '', ''],
      afterImageFile: null,
      color: 'from-red-500 to-rose-600',
      order: 0
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Upload before and after photos showing the transformation process (photos managed separately)
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Before & After
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Before & After' : 'Add Before & After'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="e.g., Tomatoes"
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
                <Label>Color Gradient</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="from-red-500 to-rose-600"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Before Section */}
                <div className="space-y-4 border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-600">BEFORE</h3>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.beforeTitle}
                      onChange={(e) => setFormData({ ...formData, beforeTitle: e.target.value })}
                      placeholder="Fresh Harvest"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Input
                      value={formData.beforeIcon}
                      onChange={(e) => setFormData({ ...formData, beforeIcon: e.target.value })}
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.beforeDesc}
                      onChange={(e) => setFormData({ ...formData, beforeDesc: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features (4 items)</Label>
                    {formData.beforeFeatures.map((feature, idx) => (
                      <Input
                        key={idx}
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formData.beforeFeatures];
                          newFeatures[idx] = e.target.value;
                          setFormData({ ...formData, beforeFeatures: newFeatures });
                        }}
                        placeholder={`Feature ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label>Before Image (Optional)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, beforeImageFile: e.target.files?.[0] || null })}
                    />
                    {editingItem?.beforeImageUrl && !formData.beforeImageFile && (
                      <img src={editingItem.beforeImageUrl} alt="Before" className="w-full h-32 object-cover rounded" />
                    )}
                  </div>
                </div>

                {/* After Section */}
                <div className="space-y-4 border-2 border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-600">AFTER</h3>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.afterTitle}
                      onChange={(e) => setFormData({ ...formData, afterTitle: e.target.value })}
                      placeholder="Export Ready"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Input
                      value={formData.afterIcon}
                      onChange={(e) => setFormData({ ...formData, afterIcon: e.target.value })}
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.afterDesc}
                      onChange={(e) => setFormData({ ...formData, afterDesc: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features (4 items)</Label>
                    {formData.afterFeatures.map((feature, idx) => (
                      <Input
                        key={idx}
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formData.afterFeatures];
                          newFeatures[idx] = e.target.value;
                          setFormData({ ...formData, afterFeatures: newFeatures });
                        }}
                        placeholder={`Feature ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label>After Image (Optional)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, afterImageFile: e.target.files?.[0] || null })}
                    />
                    {editingItem?.afterImageUrl && !formData.afterImageFile && (
                      <img src={editingItem.afterImageUrl} alt="After" className="w-full h-32 object-cover rounded" />
                    )}
                  </div>
                </div>
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

              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }} disabled={uploading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</> : <><Save className="h-4 w-4 mr-2" />{editingItem ? 'Update' : 'Add'}</>}
                </Button>
              </div>
            </form>
          </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{item.emoji}</span>
                    <h3 className="text-xl font-bold">{item.productName}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="h-3 w-3 mr-1" />Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(item)}>
                      <Trash2 className="h-3 w-3 mr-1" />Delete
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-blue-200 rounded p-3">
                    <div className="text-xs font-bold text-blue-600 mb-2">BEFORE</div>
                    {item.beforeImageUrl && (
                      <img src={item.beforeImageUrl} alt="Before" className="w-full h-32 object-cover rounded mb-2" />
                    )}
                    <p className="font-semibold">{item.beforeTitle}</p>
                    <p className="text-sm text-muted-foreground">{item.beforeDesc}</p>
                  </div>
                  <div className="border-2 border-green-200 rounded p-3">
                    <div className="text-xs font-bold text-green-600 mb-2">AFTER</div>
                    {item.afterImageUrl && (
                      <img src={item.afterImageUrl} alt="After" className="w-full h-32 object-cover rounded mb-2" />
                    )}
                    <p className="font-semibold">{item.afterTitle}</p>
                    <p className="text-sm text-muted-foreground">{item.afterDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <p>No before & after items yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
