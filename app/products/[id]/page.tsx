'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { 
  ShoppingCart, FileText, Package, Shield, Truck, CheckCircle, ArrowLeft,
  Star, Heart, Share2, Flag, MessageCircle, ThumbsUp, Zap, Award, Loader2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart-store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getProductById, Product } from '@/lib/firebase/products';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(params.id as string);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/export-products"><Button>Browse Products</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.id) {
      toast.error('Product ID is missing');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
      type: product.type,
      image: product.image
    });
    toast.success(`Added ${quantity} ${product.unit} to cart!`);
  };
  
  const handleBuyNow = () => {
    if (!product.id) {
      toast.error('Product ID is missing');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
      type: product.type,
      image: product.image
    });
    router.push('/checkout');
  };
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Review submitted!');
    setReviewText('');
    setRating(5);
  };

  const reviews = [
    { id: 1, author: 'John Doe', rating: 5, date: '2024-01-15', comment: 'Excellent quality product!', helpful: 12 },
    { id: 2, author: 'Jane Smith', rating: 4, date: '2024-01-10', comment: 'Good product, fast delivery.', helpful: 8 }
  ];

  const qas = [
    { id: 1, question: 'What is the shelf life?', answer: 'Varies by product. Fresh: 7-14 days. Dried: 6-12 months.', askedBy: 'Customer', answeredBy: 'Hafa Trading', date: '2024-01-12' }
  ];

  const keyFeatures = ['Premium quality', 'International certifications', 'Competitive pricing', 'Complete documentation'];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Link href="/export-products">
            <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" />Back to Products</Button>
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Package className="h-24 w-24 text-gray-400" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <Badge className="mb-3">Export Product</Badge>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.subcategory || product.category}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}</div>
                  <span className="text-sm text-muted-foreground">4.8 (156 reviews)</span>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
                    <span className="text-muted-foreground">/ {product.unit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Min Order: {product.minOrder} {product.unit}</p>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium">✓ In Stock</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity ({product.unit})</label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}>-</Button>
                      <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))} className="w-24 text-center" />
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
                    </div>
                  </div>
                  <Button size="lg" className="w-full" onClick={handleBuyNow}>Buy Now</Button>
                  <Button size="lg" variant="outline" className="w-full" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />Add to Cart
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1"><Heart className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon" className="flex-1"><Share2 className="h-5 w-5" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" />Key Features</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {keyFeatures.map((f, i) => <div key={i} className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" /><span>{f}</span></div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <div className="border-b flex gap-8">
              {['reviews', 'qa', 'specifications', 'brand'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 px-2 font-medium ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
                  {tab === 'reviews' && 'Reviews'}{tab === 'qa' && 'Q&A'}{tab === 'specifications' && 'Specs'}{tab === 'brand' && 'Brand'}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader><CardTitle>Write Review</CardTitle></CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div className="flex gap-2">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setRating(s)}><Star className={`h-8 w-8 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} /></button>)}</div>
                        <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Your review..." rows={4} required />
                        <Button type="submit">Submit</Button>
                      </form>
                    </CardContent>
                  </Card>
                  {reviews.map(r => (
                    <Card key={r.id}>
                      <CardContent className="p-6">
                        <p className="font-semibold">{r.author}</p>
                        <div className="flex gap-1 my-2">{[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                        <p className="text-muted-foreground">{r.comment}</p>
                        <button className="flex items-center gap-1 text-sm mt-3"><ThumbsUp className="h-4 w-4" />Helpful ({r.helpful})</button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader><CardTitle>Ask Question</CardTitle></CardHeader>
                    <CardContent><Textarea placeholder="Your question..." rows={3} /><Button className="mt-4"><MessageCircle className="mr-2 h-4 w-4" />Submit</Button></CardContent>
                  </Card>
                  {qas.map(qa => (
                    <Card key={qa.id}>
                      <CardContent className="p-6">
                        <p className="font-semibold">Q: {qa.question}</p>
                        <p className="text-green-700 dark:text-green-400 mt-2">A: {qa.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'specifications' && (
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between py-3 border-b"><span className="font-medium">Name</span><span>{product.name}</span></div>
                    <div className="flex justify-between py-3 border-b"><span className="font-medium">Category</span><span>{product.category}</span></div>
                    {product.hsCode && <div className="flex justify-between py-3 border-b"><span className="font-medium">HS Code</span><span>{product.hsCode}</span></div>}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'brand' && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center"><Award className="h-10 w-10 text-primary" /></div>
                      <div><h3 className="text-2xl font-bold">Hafa General Trading PLC</h3><p className="text-muted-foreground">Trading Beyond Borders</p></div>
                    </div>
                    <p className="text-muted-foreground">Premier import and export company based in Ethiopia.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Card className="border-red-200">
              <CardContent className="p-6">
                <button className="flex items-center gap-2 text-red-600"><Flag className="h-5 w-5" />Report this item</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
