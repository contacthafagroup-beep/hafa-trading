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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request for Quotation</h1>
            <p className="text-xl text-purple-100">
              Get competitive quotes for Ethiopian export products
            </p>
          </motion.div>
        </div>
      </section>

      {/* RFQ Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
