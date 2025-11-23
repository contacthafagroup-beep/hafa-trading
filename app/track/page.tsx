'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Search, MapPin, CheckCircle, Clock, Truck } from 'lucide-react';

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        trackingNumber: trackingNumber,
        status: 'in_transit',
        carrier: 'DHL Express',
        origin: 'Addis Ababa, Ethiopia',
        destination: 'Dubai, UAE',
        estimatedDelivery: '2024-01-25',
        currentLocation: 'Djibouti Port',
        timeline: [
          {
            status: 'Order Confirmed',
            location: 'Addis Ababa, Ethiopia',
            date: '2024-01-15 10:30 AM',
            completed: true
          },
          {
            status: 'Package Prepared',
            location: 'Addis Ababa, Ethiopia',
            date: '2024-01-16 02:15 PM',
            completed: true
          },
          {
            status: 'In Transit',
            location: 'Djibouti Port',
            date: '2024-01-18 08:45 AM',
            completed: true
          },
          {
            status: 'Customs Clearance',
            location: 'Dubai, UAE',
            date: 'Pending',
            completed: false
          },
          {
            status: 'Out for Delivery',
            location: 'Dubai, UAE',
            date: 'Pending',
            completed: false
          },
          {
            status: 'Delivered',
            location: 'Dubai, UAE',
            date: 'Pending',
            completed: false
          }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 25, repeat: Infinity, delay: 3 }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-red-500 to-pink-600 rounded-full blur-3xl"
          />
          
          {/* Floating Tracking Icons */}
          {['📦', '🚚', '✈️', '🌍', '📍', '🚢', '🛃', '✅'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl opacity-20"
              style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Animated Package Icon */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/20">
                <Package className="h-12 w-12" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-r from-white via-orange-100 to-white bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Track Your Shipment
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed"
            >
              Real-time tracking for all your orders with <span className="font-bold text-white">live updates</span>
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-orange-100"
            >
              {[
                { icon: '🌍', text: 'Global Tracking' },
                { icon: '📱', text: 'Real-time Updates' },
                { icon: '🔒', text: 'Secure & Private' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <motion.path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
              className="text-white dark:text-gray-950"
              animate={{
                d: [
                  "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                  "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                  "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Enter Tracking Number</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="flex gap-2">
                  <Input
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number (e.g., TRK-XXX-XXXXX)"
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading}>
                    <Search className="mr-2 h-5 w-5" />
                    {loading ? 'Tracking...' : 'Track'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tracking Results */}
          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Status Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                      <p className="font-semibold text-lg">{trackingData.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge className="text-sm">
                        {trackingData.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Carrier</p>
                      <p className="font-semibold">{trackingData.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                      <p className="font-semibold">{trackingData.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Origin</p>
                      <p className="font-semibold">{trackingData.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Destination</p>
                      <p className="font-semibold">{trackingData.destination}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Location */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-semibold text-lg">{trackingData.currentLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingData.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {event.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <Clock className="h-6 w-6" />
                            )}
                          </div>
                          {index < trackingData.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${
                              event.completed ? 'bg-green-200' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-semibold">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
