'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { addProduct } from '@/lib/firebase/products';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    unit: 'kg',
    minOrder: '',
    origin: 'Ethiopia',
    inStock: true,
    featured: false,
  });
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState('');
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.minOrder) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const specs: Record<string, string> = {};
      specifications.forEach(spec => {
        if (spec.key && spec.value) {
          specs[spec.key] = spec.value;
        }
      });

      await addProduct({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        price: parseFloat(formData.price),
        unit: formData.unit,
        minOrder: parseFloat(formData.minOrder),
        origin: formData.origin,
        certifications,
        specifications: specs,
        images: images.length > 0 ? images : ['/placeholder-product.jpg'],
        inStock: formData.inStock,
        featured: formData.featured,
      });

      toast.success('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setCertifications([...certifications, certInput.trim()]);
      setCertInput('');
    }
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product for your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ethiopian Arabica Coffee"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product description..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agricultural">Agricultural Products</SelectItem>
                      <SelectItem value="livestock">Livestock Products</SelectItem>
                      <SelectItem value="herbs">Herbs & Spices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g., Coffee, Grains"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="e.g., Ethiopia"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Units</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="ton">Ton</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="bag">Bag</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minOrder">Minimum Order *</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    step="0.01"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g., Organic, Fair Trade"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                />
                <Button type="button" onClick={addCertification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm">{cert}</span>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={spec.key}
                    onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                    placeholder="Property (e.g., Moisture)"
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                    placeholder="Value (e.g., 12%)"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSpecification}>
                <Plus className="mr-2 h-4 w-4" />
                Add Specification
              </Button>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Image URL"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
                <Button type="button" onClick={addImage}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {images.map((img, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <span className="text-sm flex-1 truncate">{img}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Link href="/admin/products">
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
