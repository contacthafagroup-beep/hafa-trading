'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Image as ImageIcon, Save, X, Upload, Loader2 } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  section: string;
  category?: string;
  name: string;
  description: string;
  imageUrl: string;
  emoji: string;
  order: number;
}

interface Props {
  items: GalleryItem[];
  onDelete: (item: GalleryItem) => void;
  onReload: () => void;
}

export default function GallerySection({ items, onDelete, onReload }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    category: 'Fresh Harvest' as 'Fresh Harvest' | 'Processing' | 'Export Ready',
    name: '',
    description: '',
    emoji: '📷',
    order: 0,
    imageFile: null as File | null
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = editingItem?.imageUrl || '';

      // Upload image if provided
      if (formData.imageFile) {
        console.log('Uploading image to Cloudinary...');
        const result = await uploadToCloudinary(formData.imageFile, (progress) => {
          setUploadProgress(progress);
        });
        imageUrl = result.url;
        console.log('Image uploaded:', imageUrl);
      }

      const itemData = {
        section: 'gallery',
        category: formData.category,
        name: formData.name,
        description: formData.description,
        emoji: formData.emoji,
        order: formData.order,
        imageUrl,
        updatedAt: new Date()
      };

      console.log('Saving to Firestore:', itemData);

      if (editingItem) {
        await updateDoc(doc(db, 'productGallery', editingItem.id), itemData);
        toast.success('Gallery item updated');
      } else {
        await addDoc(collection(db, 'productGallery'), {
          ...itemData,
          createdAt: new Date()
        });
        toast.success('Gallery item added');
      }

      resetForm();
      setIsDialogOpen(false);
      onReload();
    } catch (error: any) {
      console.error('Error saving item:', error);
      toast.error(`Failed to save: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category as any || 'Fresh Harvest',
      name: item.name,
      description: item.description,
      emoji: item.emoji,
      order: item.order,
      imageFile: null
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      category: 'Fresh Harvest',
      name: '',
      description: '',
      emoji: '📷',
      order: 0,
      imageFile: null
    });
  };

  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Upload photos for the product gallery section (Fresh Harvest, Processing, Export Ready)
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Gallery Item
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fresh Harvest">Fresh Harvest</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Export Ready">Export Ready</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Emoji</Label>
                  <Input
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    placeholder="📷"
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Fresh Tomatoes"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Vine-ripened, ready for sorting"
                  rows={3}
                  required
                />
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
                <Label>Product Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                {editingItem?.imageUrl && !formData.imageFile && (
                  <img 
                    src={editingItem.imageUrl} 
                    alt={editingItem.name}
                    className="w-32 h-32 object-cover rounded border mt-2"
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

      {(['Fresh Harvest', 'Processing', 'Export Ready'] as const).map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              {category}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({groupedItems[category]?.length || 0} items)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {groupedItems[category]?.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {groupedItems[category].map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-7xl">{item.emoji}</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No items in this category yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
