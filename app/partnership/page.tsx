'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Handshake, Globe, TrendingUp, Users, CheckCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    businessType: 'distributor',
    productsInterested: '',
    annualVolume: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Partnership application submitted! We will contact you within 48 hours.');
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      businessType: 'distributor',
      productsInterested: '',
      annualVolume: '',
      message: ''
    });
    setLoading(false);
  };

  const benefits = [
    {
      icon: Globe,
      title: 'Global Market Access',
      description: 'Access to premium Ethiopian products with international quality standards'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Pricing',
      description: 'Direct from source pricing with attractive margins for partners'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Personal account manager and 24/7 customer support'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'All products certified and quality-checked before shipment'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Handshake className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Partner</h1>
            <p className="text-xl text-blue-100">
              Join our global network of distributors and importers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Benefits</h2>
            <p className="text-lg text-muted-foreground">
              Why partner with Hafa General Trading PLC
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Partnership Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Distributors',
                  description: 'Become an exclusive distributor in your region'
                },
                {
                  title: 'Importers',
                  description: 'Direct import partnership with volume discounts'
                },
                {
                  title: 'Retailers',
                  description: 'Stock our products in your retail outlets'
                }
              ].map((type, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Partnership Application</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and our partnership team will contact you within 48 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name *</label>
                        <Input
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Your Company Ltd"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Contact Person *</label>
                          <Input
                            required
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Country *</label>
                          <Input
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="United States"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <Input
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 XXX XXX XXXX"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Partnership Type *</label>
                        <select
                          required
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="distributor">Distributor</option>
                          <option value="importer">Importer</option>
                          <option value="retailer">Retailer</option>
                          <option value="wholesaler">Wholesaler</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Products Interested In *</label>
                        <Input
                          required
                          value={formData.productsInterested}
                          onChange={(e) => setFormData({ ...formData, productsInterested: e.target.value })}
                          placeholder="e.g., Coffee, Sesame Seeds, Livestock"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Expected Annual Volume</label>
                        <Input
                          value={formData.annualVolume}
                          onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                          placeholder="e.g., 100 tons/year"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Additional Information</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your business, market experience, and partnership goals..."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? 'Submitting...' : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Application
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
