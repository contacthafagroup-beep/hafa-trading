'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Send } from 'lucide-react';
import { createRFQ } from '@/lib/firebase/rfqs';
import toast from 'react-hot-toast';

export default function RFQPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productType: 'export',
    productName: '',
    quantity: '',
    unit: 'kg',
    targetPrice: '',
    deliveryLocation: '',
    deliveryDate: '',
    specifications: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createRFQ({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        companyName: formData.company || undefined,
        productName: formData.productName,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        targetPrice: formData.targetPrice ? parseFloat(formData.targetPrice) : undefined,
        deliveryLocation: formData.deliveryLocation,
        deliveryDate: formData.deliveryDate || undefined,
        additionalRequirements: formData.specifications || undefined,
        status: 'new'
      });

      toast.success('RFQ submitted successfully! We will send you a quote within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        productType: 'export',
        productName: '',
        quantity: '',
        unit: 'kg',
        targetPrice: '',
        deliveryLocation: '',
        deliveryDate: '',
        specifications: ''
      });
    } catch (error) {
      console.error('Error submitting RFQ:', error);
      toast.error('Failed to submit RFQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      <Navbar />
      
      {/* Hero with Premium Background */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
          />
          
          {/* Floating Icons */}
          {['📋', '✉️', '📦', '🚚', '💰', '🌍'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FileText className="h-20 w-20 mx-auto mb-6 drop-shadow-2xl" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Request for Quotation
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-4">
              Get competitive quotes for Ethiopian export products
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>24h Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💯</span>
                <span>Best Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <span>Quality Assured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RFQ Form */}
      <section className="py-16 relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-200 to-purple-200 dark:from-cyan-900/20 dark:to-purple-900/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-2 shadow-2xl">
              <CardHeader>
                <CardTitle>Submit Your Request</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you with a detailed quotation within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
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
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                    <div className="space-y-4">
                      <input type="hidden" name="productType" value="export" />

                      <div>
                        <label className="block text-sm font-medium mb-2">Product Name *</label>
                        <Input
                          required
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          placeholder="e.g., Fresh Rosemary, Electric Bikes"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Quantity *</label>
                          <Input
                            required
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            placeholder="1000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Unit *</label>
                          <Input
                            required
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            placeholder="kg, pieces"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Target Price (Optional)</label>
                        <Input
                          value={formData.targetPrice}
                          onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                          placeholder="Your budget per unit in USD"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Delivery Location *</label>
                        <Input
                          required
                          value={formData.deliveryLocation}
                          onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                          placeholder="City, Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Expected Delivery Date</label>
                        <Input
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Specifications */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Specifications</label>
                    <Textarea
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      placeholder="Any specific requirements, certifications needed, packaging preferences, etc."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? 'Submitting...' : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit RFQ
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: '🔒', title: 'Secure', desc: 'Your data is protected' },
                { icon: '⚡', title: 'Fast Response', desc: 'Quote within 24 hours' },
                { icon: '🎯', title: 'Accurate', desc: 'Detailed pricing breakdown' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 shadow-lg"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
