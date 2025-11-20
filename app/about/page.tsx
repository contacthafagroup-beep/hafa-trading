'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Award, Users, Globe, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hafa General Trading PLC</h1>
            <p className="text-xl text-blue-100">
              Leading the way in international trade since our establishment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Hafa General Trading PLC is a premier Ethiopian export company, specializing in 
              connecting global markets with Ethiopia's finest products. We export high-quality 
              agricultural products, livestock, herbs, spices, and specialty items to buyers 
              worldwide.
            </p>
            <p className="text-lg text-muted-foreground">
              With our extensive network of local suppliers and international buyers, we ensure 
              seamless transactions, competitive pricing, and reliable logistics. Our commitment 
              to quality, transparency, and customer satisfaction has made us a trusted partner 
              for businesses seeking authentic Ethiopian products.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the leading bridge between Ethiopian products and global markets, 
                  while bringing world-class products to Ethiopia, fostering economic growth 
                  and international partnerships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To showcase Ethiopia's finest products to the world by maintaining the highest 
                  standards of quality, ensuring timely delivery, and building lasting 
                  relationships with our international clients and partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality Excellence',
                description: 'We never compromise on quality. All products meet international standards and certifications.'
              },
              {
                icon: Users,
                title: 'Customer Focus',
                description: 'Our clients success is our success. We provide personalized service and support.'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Connected to markets worldwide, we facilitate trade across borders seamlessly.'
              },
              {
                icon: TrendingUp,
                title: 'Integrity',
                description: 'Transparency and honesty in all our dealings build trust and long-term relationships.'
              },
              {
                icon: Target,
                title: 'Innovation',
                description: 'We embrace technology and modern practices to improve our services continuously.'
              },
              {
                icon: Award,
                title: 'Reliability',
                description: 'Consistent delivery and dependable service make us a trusted trading partner.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <value.icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Certifications & Compliance</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We maintain all necessary certifications and comply with international trade regulations:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                'ISO 9001:2015 Certified',
                'HACCP Certified',
                'Export License',
                'Import License',
                'Chamber of Commerce Member',
                'International Trade Compliance'
              ].map((cert, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold">{cert}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
