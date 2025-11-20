'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Package, 
  FileCheck, 
  Truck, 
  Shield, 
  Globe, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

export default function ExportServicesPage() {
  const services = [
    {
      icon: Package,
      title: 'Product Sourcing',
      description: 'We source high-quality Ethiopian products including agricultural goods, livestock, and herbs from trusted suppliers.'
    },
    {
      icon: FileCheck,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks and certifications (Organic, HACCP, GlobalGAP) ensure products meet international standards.'
    },
    {
      icon: Shield,
      title: 'Export Documentation',
      description: 'Complete handling of export licenses, certificates of origin, phytosanitary certificates, and customs documentation.'
    },
    {
      icon: Truck,
      title: 'Logistics & Shipping',
      description: 'Efficient packaging, freight forwarding, and shipping to destinations worldwide with real-time tracking.'
    },
    {
      icon: Globe,
      title: 'Market Access',
      description: 'Access to global markets with established networks in Europe, Middle East, Asia, and North America.'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Support',
      description: 'Assistance with international trade regulations, import requirements, and compliance documentation.'
    }
  ];

  const exportProducts = [
    'Agricultural Products (Vegetables, Fruits, Grains)',
    'Coffee (Arabica & Robusta)',
    'Pulses & Legumes',
    'Spices & Seeds',
    'Livestock (Cattle, Sheep, Goats)',
    'Herbs & Medicinal Plants'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Export Services</h1>
            <p className="text-xl text-green-100 mb-6">
              Connecting Ethiopian excellence to global markets with comprehensive export solutions
            </p>
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Request Export Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Export Services</h2>
            <p className="text-lg text-muted-foreground">
              End-to-end export solutions for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <service.icon className="h-12 w-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products We Export */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Products We Export</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {exportProducts.map((product, index) => (
                <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-medium">{product}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/export-products">
                <Button size="lg">
                  View All Export Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Export Process</h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Inquiry & Quotation',
                  description: 'Submit your requirements and receive a detailed quotation within 24 hours.'
                },
                {
                  step: '2',
                  title: 'Order Confirmation',
                  description: 'Confirm order details, specifications, and payment terms.'
                },
                {
                  step: '3',
                  title: 'Product Sourcing & Quality Check',
                  description: 'We source products from verified suppliers and conduct quality inspections.'
                },
                {
                  step: '4',
                  title: 'Documentation & Certification',
                  description: 'Prepare all export documents, certificates, and customs paperwork.'
                },
                {
                  step: '5',
                  title: 'Packaging & Shipping',
                  description: 'Professional packaging and arrangement of international shipping.'
                },
                {
                  step: '6',
                  title: 'Delivery & Support',
                  description: 'Track your shipment and receive post-delivery support.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Export?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get started with your export journey today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
