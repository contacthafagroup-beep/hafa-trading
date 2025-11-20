'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { getAllProducts, deleteProduct, Product } from '@/lib/firebase/products';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'export' | 'import'>('all');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; product: any }>({ open: false, product: null });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Load products from Firebase
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // All products are export products
  const allProducts = products.map(p => ({ ...p, type: 'export' as const }));

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (product: any) => {
    setDeleteDialog({ open: true, product });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.product?.id) return;
    
    try {
      setDeleting(true);
      await deleteProduct(deleteDialog.product.id);
      toast.success(`Product "${deleteDialog.product?.name}" deleted successfully!`);
      setDeleteDialog({ open: false, product: null });
      // Reload products
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{allProducts.length}</div>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {allProducts.length}
            </div>
            <p className="text-sm text-muted-foreground">Export Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {allProducts.filter(p => p.category === 'livestock').length}
            </div>
            <p className="text-sm text-muted-foreground">Livestock Products</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'export' ? 'default' : 'outline'}
                onClick={() => setFilterType('export')}
              >
                Export
              </Button>
              <Button
                variant={filterType === 'import' ? 'default' : 'outline'}
                onClick={() => setFilterType('import')}
              >
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Price</th>
                    <th className="text-left p-4 font-medium">Min Order</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.id}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={product.type === 'export' ? 'default' : 'secondary'}>
                          {product.type}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{product.subcategory || product.category}</td>
                      <td className="p-4">
                        <div className="font-medium">{formatCurrency(product.price)}</div>
                        <div className="text-sm text-muted-foreground">per {product.unit}</div>
                      </td>
                      <td className="p-4 text-sm">
                        {product.minOrder} {product.unit}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/products/${product.id}`} target="_blank">
                            <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(product)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No products found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, product: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            Are you sure you want to delete "{deleteDialog.product?.name}"? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialog({ open: false, product: null })}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
