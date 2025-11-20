'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getProductById, updateProduct } from '@/lib/firebase/products';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    unit: 'kg',
    minOrder: 0,
    origin: 'Ethiopia',
    hsCode: '',
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await getProductById(params.id);
      
      if (!product) {
        toast.error('Product not found');
        router.push('/admin/products');
        return;
      }

      setFormData({
        name: product.name,
        description: product.description || '',
        category: product.category,
        subcategory: product.subcategory || '',
        price: product.price,
        unit: product.unit,
        minOrder: product.minOrder,
        origin: product.origin || 'Ethiopia',
        hsCode: product.hsCode || '',
        inStock: product.inStock !== false,
        featured: product.featured || false,
      });
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      await updateProduct(params.id, {
        ...formData,
        price: Number(formData.price),
        minOrder: Number(formData.minOrder),
      });
      
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">Update product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <Input 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    rows={4}
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <Input 
                      required 
                      value={formData.category} 
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subcategory</label>
                    <Input 
                      value={formData.subcategory} 
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (USD) *</label>
                    <Input 
                      required 
                      type="number" 
                      step="0.01" 
                      value={formData.price} 
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Unit *</label>
                    <Input 
                      required 
                      value={formData.unit} 
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Order *</label>
                    <Input 
                      required 
                      type="number" 
                      value={formData.minOrder} 
                      onChange={(e) => setFormData({ ...formData, minOrder: parseInt(e.target.value) || 0 })} 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    />
                    <span className="text-sm font-medium">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Featured Product</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">HS Code</label>
                  <Input 
                    value={formData.hsCode} 
                    onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })} 
                    placeholder="e.g., 0901.21"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Origin</label>
                  <Input 
                    value={formData.origin} 
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Link href="/admin/products">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
