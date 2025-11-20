'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  DollarSign,
  FileText,
  Truck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { getAllOrders, formatOrderDate } from '@/lib/firebase/orders';
import { getAllProducts } from '@/lib/firebase/products';
import { getAllRFQs, formatRFQDate } from '@/lib/firebase/rfqs';
import { getAllShipments } from '@/lib/firebase/shipments';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingRFQs: 0,
    activeShipments: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [pendingRFQs, setPendingRFQs] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [orders, products, rfqs, shipments, usersSnapshot] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllRFQs(),
        getAllShipments(),
        getDocs(collection(db, 'users'))
      ]);

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const pendingRFQsCount = rfqs.filter(r => r.status === 'new' || r.status === 'reviewing').length;
      const activeShipmentsCount = shipments.filter(s => 
        s.status === 'in_transit' || s.status === 'preparing' || s.status === 'picked_up'
      ).length;

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: usersSnapshot.size,
        pendingRFQs: pendingRFQsCount,
        activeShipments: activeShipmentsCount
      });

      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));

      // Get pending RFQs (last 5)
      setPendingRFQs(rfqs.filter(r => r.status === 'new' || r.status === 'reviewing').slice(0, 5));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      link: '/admin/orders'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      link: '/admin/orders'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'text-purple-600',
      link: '/admin/products'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: 'text-orange-600',
      link: '/admin/customers'
    },
    {
      title: 'Pending RFQs',
      value: stats.pendingRFQs.toString(),
      icon: FileText,
      color: 'text-yellow-600',
      link: '/admin/rfqs'
    },
    {
      title: 'Active Shipments',
      value: stats.activeShipments.toString(),
      icon: Truck,
      color: 'text-indigo-600',
      link: '/admin/shipments'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Hafa General Trading Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg bg-gray-100 dark:bg-gray-800", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <span className="text-sm text-primary hover:underline">View All</span>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{order.userName}</p>
                      <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(order.total)}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No orders yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending RFQs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending RFQs</CardTitle>
              <Link href="/admin/rfqs">
                <span className="text-sm text-primary hover:underline">View All</span>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {pendingRFQs.length > 0 ? (
              <div className="space-y-4">
                {pendingRFQs.map((rfq) => (
                  <div key={rfq.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-semibold">#{rfq.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{rfq.customerName}</p>
                      <p className="text-sm">{rfq.productName}</p>
                      <p className="text-xs text-muted-foreground">{rfq.quantity} {rfq.unit}</p>
                    </div>
                    <Badge className={getRFQStatusColor(rfq.status)}>
                      {rfq.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No pending RFQs</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" />
            Quick Actions & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.pendingRFQs > 0 && (
              <Link href="/admin/rfqs">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold">New RFQs Received</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.pendingRFQs} quotation request{stats.pendingRFQs > 1 ? 's' : ''} need{stats.pendingRFQs === 1 ? 's' : ''} review
                  </p>
                </div>
              </Link>
            )}
            
            {stats.activeShipments > 0 && (
              <Link href="/admin/shipments">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold">Active Shipments</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.activeShipments} shipment{stats.activeShipments > 1 ? 's' : ''} in transit
                  </p>
                </div>
              </Link>
            )}

            {stats.totalOrders > 0 && (
              <Link href="/admin/orders">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold">Total Orders</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.totalOrders} order{stats.totalOrders > 1 ? 's' : ''} processed - {formatCurrency(stats.totalRevenue)} revenue
                  </p>
                </div>
              </Link>
            )}

            {stats.totalProducts === 0 && (
              <Link href="/admin/products">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold">No Products</p>
                  <p className="text-sm text-muted-foreground">
                    Start by adding products to your catalog
                  </p>
                </div>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function getStatusColor(status: string) {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

function getRFQStatusColor(status: string) {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'reviewing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'quoted': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'accepted': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}
