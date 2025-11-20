'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderNumber = `HGT-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-xl text-muted-foreground">
                Thank you for your order
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                  <p className="text-2xl font-bold">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        We've sent a confirmation email with your order details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Order Processing</p>
                      <p className="text-sm text-muted-foreground">
                        Your order is being prepared for shipment
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                You can track your order status in your dashboard
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg">
                    View Order Status
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/export-products">
                  <Button size="lg" variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ You'll receive an email confirmation shortly</li>
                <li>✓ We'll notify you when your order ships</li>
                <li>✓ Track your shipment in real-time</li>
                <li>✓ Contact us if you have any questions</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
