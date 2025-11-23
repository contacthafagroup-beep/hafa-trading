'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, Phone, MapPin, Clock, Send, Sparkles, MessageCircle,
  Globe, Building, Users, CheckCircle, ArrowRight, Zap,
  Facebook, Twitter, Linkedin, Instagram, Youtube, MapPinned,
  PhoneCall, MailOpen, Calendar, HeadphonesIcon, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const contactMethods = [
  {
    icon: MapPin,
    title: 'Visit Our Office',
    details: ['Hossana, Ethiopia', 'Gofer Meda Subcity', 'Jelo Naremo District'],
    color: 'from-blue-500 to-cyan-500',
    action: 'Get Directions'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+251 954 742 383', '+251 964 839 833'],
    color: 'from-green-500 to-emerald-500',
    action: 'Call Now'
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['contact@hafatrading.com', 'info@hafatrading.com'],
    color: 'from-purple-500 to-pink-500',
    action: 'Send Email'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 1:00 PM', 'Sun: Closed'],
    color: 'from-orange-500 to-red-500',
    action: 'Schedule Meeting'
  },
];

const departments = [
  { name: 'Sales & Export', icon: Globe, email: 'sales@hafatrading.com' },
  { name: 'Customer Support', icon: HeadphonesIcon, email: 'support@hafatrading.com' },
  { name: 'Logistics', icon: MapPinned, email: 'logistics@hafatrading.com' },
  { name: 'General Inquiry', icon: MailOpen, email: 'info@hafatrading.com' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleContactAction = (action: string) => {
    switch(action) {
      case 'Get Directions':
        setShowDirectionsModal(true);
        break;
      case 'Call Now':
        window.location.href = 'tel:+251954742383';
        break;
      case 'Send Email':
        window.location.href = 'mailto:contact@hafatrading.com';
        break;
      case 'Schedule Meeting':
        setShowScheduleModal(true);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', department: '', subject: '', message: '' });
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 500">
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 1000}
                cy={Math.random() * 500}
                r="3"
                fill="url(#gradientContact)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
            <defs>
              <linearGradient id="gradientContact" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Mail, x: '10%', y: '20%', delay: 0 },
            { Icon: Phone, x: '85%', y: '25%', delay: 0.5 },
            { Icon: MessageCircle, x: '15%', y: '70%', delay: 1 },
            { Icon: Globe, x: '80%', y: '75%', delay: 1.5 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: x, top: y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -30, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-16 h-16 text-blue-500/30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Contact Us
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
              >
                Have questions? We're here to help you succeed in global trade
              </motion.p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {[
                  { icon: Users, text: '24/7 Support' },
                  { icon: Zap, text: 'Quick Response' },
                  { icon: Globe, text: 'Global Reach' },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{stat.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative h-full backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all group">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative p-8">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-2xl mb-6 mx-auto`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                        {method.title}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        {method.details.map((detail, i) => (
                          <p key={i} className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {detail}
                          </p>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        onClick={() => handleContactAction(method.action)}
                        className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30"
                      >
                        {method.action}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Departments & Social */}
            <div className="space-y-6">
              {/* Departments */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Contact Departments
                  </h3>
                  
                  <div className="space-y-4">
                    {departments.map((dept, index) => {
                      const Icon = dept.icon;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 hover:border-blue-500/30 transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {dept.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {dept.email}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Follow Us
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: 'spring' }}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${social.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Stay updated with our latest news and offers
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 border border-white/20 shadow-xl text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    Need Immediate Help?
                  </h3>
                  <p className="text-white/90 mb-6">
                    Our team is available 24/7 to assist you with any urgent inquiries
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <PhoneCall className="mr-2 w-5 h-5" />
                    Call Now
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div id="contact-form" className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-2xl"
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We'll get back to you within 24 hours
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Full Name *
                            </label>
                            <Input
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe"
                              className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Email Address *
                            </label>
                            <Input
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com"
                              className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Phone Number
                            </label>
                            <Input
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+251 91 XXX XXXX"
                              className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Company Name
                            </label>
                            <Input
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="Your Company"
                              className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Department *
                            </label>
                            <select
                              required
                              value={formData.department}
                              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                              className="w-full h-10 rounded-lg border border-white/20 bg-white/50 dark:bg-gray-800/50 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Department</option>
                              {departments.map((dept, i) => (
                                <option key={i} value={dept.name}>{dept.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                              Subject *
                            </label>
                            <Input
                              required
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="Inquiry about..."
                              className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Message *
                          </label>
                          <Textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us about your inquiry..."
                            rows={6}
                            className="bg-white/50 dark:bg-gray-800/50 border-white/20 focus:border-blue-500"
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <Button 
                            type="submit" 
                            size="lg" 
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
                          >
                            {loading ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="mr-2"
                                >
                                  <Send className="w-5 h-5" />
                                </motion.div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 w-5 h-5" />
                                Send Message
                              </>
                            )}
                          </Button>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            We'll respond within 24 hours
                          </p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Us Here
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Visit our office in Hossana, Ethiopia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-video">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126184.89283403!2d37.7!3d7.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1f1f1f1f1f1f1%3A0x1f1f1f1f1f1f1f1f!2sHossana%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              
              {/* Overlay Info Card */}
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      Hafa General Trading PLC
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Hossana, Ethiopia • Gofer Meda Subcity • Jelo Naremo District
                    </p>
                    <Button 
                      size="sm"
                      onClick={() => setShowDirectionsModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <MapPinned className="mr-2 w-4 h-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'What are your response times?',
                answer: 'We typically respond to all inquiries within 24 hours during business days.'
              },
              {
                question: 'Do you offer international shipping?',
                answer: 'Yes, we ship to over 45 countries worldwide with various freight options.'
              },
              {
                question: 'How can I track my order?',
                answer: 'Use our tracking page with your shipment ID for real-time updates.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept bank transfers, letters of credit, and major international payment methods.'
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all h-full">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl text-center overflow-hidden">
              {/* Animated Background Pattern */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Order from Hafa?
                </h2>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join hundreds of businesses who trust us for premium Ethiopian exports
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => {
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                      toast.success('Fill out the form below to get started!');
                    }}
                    className="bg-white text-blue-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Schedule a Call
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/20">
                  {[
                    { icon: CheckCircle, text: 'Trusted by 500+ Clients' },
                    { icon: Globe, text: '45+ Countries' },
                    { icon: Award, text: 'ISO Certified' },
                  ].map((indicator, index) => {
                    const Icon = indicator.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-white/90">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{indicator.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directions Modal */}
      <AnimatePresence>
        {showDirectionsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDirectionsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get Directions
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDirectionsModal(false)}
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      Hafa General Trading PLC
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Hossana, Ethiopia<br />
                      Gofer Meda Subcity<br />
                      Jelo Naremo District
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    onClick={() => {
                      window.open('https://maps.google.com/?q=Hossana,Ethiopia', '_blank');
                      toast.success('Opening Google Maps...');
                    }}
                  >
                    <MapPinned className="mr-2 w-5 h-5" />
                    Google Maps
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText('Hossana, Ethiopia, Gofer Meda Subcity, Jelo Naremo District');
                      toast.success('Address copied to clipboard!');
                    }}
                  >
                    Copy Address
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Meeting Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Schedule a Meeting
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowScheduleModal(false)}
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Book Your Meeting
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose your preferred contact method
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={() => {
                      window.location.href = 'tel:+251954742383';
                      toast.success('Calling now...');
                    }}
                  >
                    <PhoneCall className="mr-2 w-5 h-5" />
                    Call +251 954 742 383
                  </Button>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => {
                      window.location.href = 'mailto:contact@hafatrading.com?subject=Meeting Request';
                      toast.success('Opening email client...');
                    }}
                  >
                    <MailOpen className="mr-2 w-5 h-5" />
                    Email Us
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowScheduleModal(false);
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Business Hours:</strong><br />
                    Mon-Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
