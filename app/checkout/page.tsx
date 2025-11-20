'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  DollarSign,
  Lock,
  CheckCircle,
  Package
} from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { formatCurrency } from '@/lib/utils';
import { createOrder } from '@/lib/firebase/orders';
import { auth } from '@/lib/firebase/config';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Contact Info
    fullName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Notes
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (!mounted) return null;

  const subtotal = getTotalPrice();
  const shipping = 50;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      
      // Create order in Firebase
      const orderId = await createOrder({
        userId: user?.uid || 'guest',
        userEmail: formData.email,
        userName: formData.fullName,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit
        })),
        subtotal,
        shipping,
        tax,
        total,
        status: 'pending',
        paymentMethod,
        paymentStatus: 'pending',
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          phone: formData.phone
        },
        notes: formData.notes
      });

      toast.success('Order placed successfully!');
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' },
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone, description: 'M-Pesa, Telebirr' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your order</p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <Input
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+251 91 XXX XXXX"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Address *</label>
                        <Input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <Input
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Addis Ababa"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State/Region</label>
                          <Input
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="Region"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Country *</label>
                          <Input
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="Ethiopia"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Postal Code</label>
                          <Input
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            placeholder="1000"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              paymentMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <method.icon className="h-6 w-6" />
                              <span className="font-semibold">{method.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </button>
                        ))}
                      </div>

                      {/* Card Payment Form */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium mb-2">Card Number *</label>
                            <Input
                              required
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                            <Input
                              required
                              value={formData.cardName}
                              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                              <Input
                                required
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">CVV *</label>
                              <Input
                                required
                                value={formData.cvv}
                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer Info */}
                      {paymentMethod === 'bank' && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm font-medium mb-2">Bank Transfer Details:</p>
                          <p className="text-sm text-muted-foreground">
                            Bank: Commercial Bank of Ethiopia<br />
                            Account: 1000XXXXXXXX<br />
                            Account Name: Hafa General Trading PLC
                          </p>
                        </div>
                      )}

                      {/* Mobile Money Info */}
                      {paymentMethod === 'mobile' && (
                        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-sm font-medium mb-2">Mobile Money:</p>
                          <p className="text-sm text-muted-foreground">
                            You will receive payment instructions via SMS after placing your order.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Order Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Notes (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any special instructions for your order..."
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3 pb-3 border-b">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} {item.unit} × {formatCurrency(item.price)}
                              </p>
                              <p className="text-sm font-semibold">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax (15%)</span>
                          <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Total</span>
                          <span className="text-primary">{formatCurrency(total)}</span>
                        </div>
                      </div>

                      {/* Place Order Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          'Processing...'
                        ) : (
                          <>
                            <Lock className="mr-2 h-5 w-5" />
                            Place Order
                          </>
                        )}
                      </Button>

                      {/* Security Badge */}
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Secure checkout</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
