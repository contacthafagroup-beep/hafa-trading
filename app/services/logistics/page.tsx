'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Truck, 
  Ship, 
  Plane, 
  Package, 
  MapPin, 
  Clock,
  Shield,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

export default function LogisticsPage() {
  const services = [
    {
      icon: Ship,
      title: 'Sea Freight',
      description: 'Cost-effective ocean freight for large shipments with FCL and LCL options to all major ports worldwide.'
    },
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Fast and reliable air cargo services for time-sensitive shipments with door-to-door delivery.'
    },
    {
      icon: Truck,
      title: 'Land Transportation',
      description: 'Domestic and cross-border trucking services with real-time GPS tracking and secure handling.'
    },
    {
      icon: Package,
      title: 'Warehousing',
      description: 'Secure storage facilities with inventory management and distribution services.'
    },
    {
      icon: Shield,
      title: 'Customs Clearance',
      description: 'Expert customs brokerage services ensuring smooth clearance and compliance with regulations.'
    },
    {
      icon: MapPin,
      title: 'Last Mile Delivery',
      description: 'Efficient final delivery to your doorstep with flexible scheduling and tracking.'
    }
  ];

  const features = [
    'Real-time shipment tracking',
    'Insurance coverage options',
    'Temperature-controlled transport',
    'Hazardous materials handling',
    'Consolidation services',
    'Documentation support',
    'Multi-modal transport solutions',
    'Express delivery options'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Logistics & Shipping</h1>
            <p className="text-xl text-orange-100 mb-6">
              Reliable freight forwarding and logistics solutions connecting Ethiopia to the world
            </p>
            <Link href="/track">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Track Your Shipment
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Logistics Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive freight and logistics solutions for your business
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
                    <service.icon className="h-12 w-12 text-orange-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Logistics Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Routes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Major Shipping Routes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Ship className="h-6 w-6 text-orange-600 mr-2" />
                    Export Routes
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Ethiopia → Middle East (Dubai, Saudi Arabia)</li>
                    <li>• Ethiopia → Europe (Rotterdam, Hamburg)</li>
                    <li>• Ethiopia → Asia (China, India, Japan)</li>
                    <li>• Ethiopia → North America (USA, Canada)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Plane className="h-6 w-6 text-orange-600 mr-2" />
                    Import Routes
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• China → Ethiopia (Electronics, Machinery)</li>
                    <li>• India → Ethiopia (Vehicles, Equipment)</li>
                    <li>• Turkey → Ethiopia (Appliances, Furniture)</li>
                    <li>• Europe → Ethiopia (Industrial Equipment)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Shipping Process</h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Booking & Documentation',
                  description: 'Submit shipping requirements and prepare necessary documentation.',
                  icon: Package
                },
                {
                  step: '2',
                  title: 'Pickup & Packaging',
                  description: 'Professional packaging and pickup from your location.',
                  icon: Truck
                },
                {
                  step: '3',
                  title: 'Customs Clearance',
                  description: 'Handle export/import customs procedures and documentation.',
                  icon: Shield
                },
                {
                  step: '4',
                  title: 'International Transit',
                  description: 'Transport via sea, air, or land with real-time tracking.',
                  icon: Ship
                },
                {
                  step: '5',
                  title: 'Destination Clearance',
                  description: 'Clear customs at destination and prepare for delivery.',
                  icon: MapPin
                },
                {
                  step: '6',
                  title: 'Final Delivery',
                  description: 'Last-mile delivery to your specified address.',
                  icon: Clock
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-5 w-5 text-orange-600" />
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Shipping Solutions?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Get a quote for your freight and logistics needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rfq">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Request Quote
              </Button>
            </Link>
            <Link href="/track">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Track Shipment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
