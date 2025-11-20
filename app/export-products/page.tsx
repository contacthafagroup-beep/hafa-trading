'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, ShoppingCart, Heart, Eye, Star, TrendingUp, Award, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getAllProducts, Product } from '@/lib/firebase/products';
import { getAllCategories, Category } from '@/lib/firebase/categories';
import { useCartStore } from '@/lib/store/cart-store';
import toast from 'react-hot-toast';

function ExportProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'featured'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem } = useCartStore();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: Product) => {
    if (!product.id) {
      toast.error('Product ID is missing');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.minOrder,
      image: product.images?.[0] || '',
      unit: product.unit,
      type: 'export'
    });
    toast.success(`${product.name} added to cart!`);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'agricultural': Package,
      'livestock': Award,
      'herbs': Star,
      'coffee-tea': TrendingUp,
      'honey': Award
    };
    return icons[category] || Package;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-green-100 mb-8">
              Premium Ethiopian agricultural products, livestock, and herbs exported worldwide
            </p>
            
            {!loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{products.length}</div>
                  <div className="text-sm text-green-100">Total Products</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{categories.length}</div>
                  <div className="text-sm text-green-100">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{products.filter(p => p.featured).length}</div>
                  <div className="text-sm text-green-100">Featured</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{products.filter(p => p.inStock !== false).length}</div>
                  <div className="text-sm text-green-100">In Stock</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products by name, category, or HS code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="whitespace-nowrap"
              >
                <Package className="mr-2 h-4 w-4" />
                All Products
              </Button>
              {categories.map(cat => {
                const Icon = getCategoryIcon(cat.slug);
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className="whitespace-nowrap"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => {
                  const CategoryIcon = getCategoryIcon(product.category);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                        {product.featured && (
                          <div className="absolute top-2 left-2 z-10">
                            <Badge className="bg-yellow-500 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                        
                        <Link href={`/products/${product.id}`} className="block">
                          <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-t-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CategoryIcon className="h-24 w-24 text-green-200 dark:text-gray-700" />
                            </div>
                            {product.images?.[0] && (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          </div>
                        </Link>

                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/products/${product.id}`} className="flex-1">
                              <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          {product.certifications && product.certifications.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {product.certifications.slice(0, 2).map(cert => (
                                <Badge key={cert} variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  {cert}
                                </Badge>
                              ))}
                              {product.certifications.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.certifications.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-bold text-green-600">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Package className="h-3 w-3" />
                              <span>Min Order: {product.minOrder} {product.unit}</span>
                            </div>
                            {product.hsCode && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3" />
                                <span>HS Code: {product.hsCode}</span>
                              </div>
                            )}
                            {product.inStock !== false && (
                              <Badge variant="outline" className="text-xs">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                In Stock
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              className="flex-1"
                              size="sm"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                            <Link href={`/products/${product.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ExportProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <ExportProductsContent />
    </Suspense>
  );
}
