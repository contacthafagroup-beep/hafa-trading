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
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Package className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Shipment</h1>
            <p className="text-xl text-orange-100">
              Real-time tracking for all your orders
            </p>
          </motion.div>
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
