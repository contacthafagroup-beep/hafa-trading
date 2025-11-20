'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team for any inquiries or business opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    Hossana, Ethiopia<br />
                    Gofer Meda Subcity<br />
                    Jelo Naremo District
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+251954742383" className="hover:text-primary">+251 954 742 383</a><br />
                    <a href="tel:+251964839833" className="hover:text-primary">+251 964 839 833</a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@hafatrading.com" className="hover:text-primary">contact.hafatrading.com</a><br />
                    <a href="mailto:contact@hafagroup.com" className="hover:text-primary">contact.hafagroup.com</a><br />
                    <a href="mailto:info@hafatrading.com" className="hover:text-primary">info.hafatrading.com</a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+251 91 XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject *</label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Inquiry about..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
                      {loading ? 'Sending...' : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
