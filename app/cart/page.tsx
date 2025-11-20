'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + shipping + tax;

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <ShoppingCart className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-xl text-purple-100">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Package className="h-24 w-24 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your cart
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/export-products">
                  <Button size="lg">Browse Export Products</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">Contact Us</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {item.type === 'export' ? 'Export Product' : 'Import Product'}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(item.id, item.name)}
                              >
                                <Trash2 className="h-5 w-5 text-red-600" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="w-20 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm text-muted-foreground">{item.unit}</span>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(item.price)} / {item.unit}
                                </p>
                                <p className="text-lg font-bold">
                                  {formatCurrency(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">{formatCurrency(shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (15%)</span>
                        <span className="font-medium">{formatCurrency(tax)}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" className="w-full mb-3" onClick={handleCheckout}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <Link href="/export-products">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>

                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        ✓ Secure checkout
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        ✓ Free shipping on orders over $1000
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
