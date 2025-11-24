'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Loader2, FileText, Building2 } from 'lucide-react';
import { getAllOrders } from '@/lib/firebase/orders';
import { getAllProducts } from '@/lib/firebase/products';
import { getAllRFQs } from '@/lib/firebase/rfqs';
import { getAllShipments } from '@/lib/firebase/shipments';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRFQs: 0,
    totalShipments: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [topProducts, setTopProducts] = useState<Array<{ name: string; sales: number; revenue: number }>>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      if (!db) {
        setLoading(false);
        return;
      }
      
      // Load all data
      const [orders, products, rfqs, shipments, usersSnapshot] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllRFQs(),
        getAllShipments(),
        getDocs(collection(db, 'users'))
      ]);

      // Calculate revenue
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

      // Calculate product sales
      const productSales: Record<string, { count: number; revenue: number; name: string }> = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if (!productSales[item.productId]) {
            productSales[item.productId] = {
              count: 0,
              revenue: 0,
              name: item.productName
            };
          }
          productSales[item.productId].count += item.quantity;
          productSales[item.productId].revenue += item.quantity * item.price;
        });
      });

      // Get top 5 products
      const topProductsList = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map(p => ({
          name: p.name,
          sales: p.count,
          revenue: p.revenue
        }));

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: usersSnapshot.size,
        totalProducts: products.length,
        totalRFQs: rfqs.length,
        totalShipments: shipments.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        deliveredOrders: orders.filter(o => o.status === 'delivered').length
      });

      setTopProducts(topProductsList);
    } catch (error) {
      console.error('Error loading analytics:', error);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Business insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-2">From {stats.totalOrders} orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.pendingOrders} pending, {stats.deliveredOrders} delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-2">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">In catalog</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">RFQs</p>
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{stats.totalRFQs}</div>
            <p className="text-xs text-muted-foreground mt-2">Quote requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Shipments</p>
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{stats.totalShipments}</div>
            <p className="text-xs text-muted-foreground mt-2">Active shipments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">
              {stats.totalOrders > 0 
                ? formatCurrency(stats.totalRevenue / stats.totalOrders)
                : formatCurrency(0)
              }
            </div>
            <p className="text-xs text-muted-foreground mt-2">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Revenue chart will be displayed here</p>
                <p className="text-sm">Integrate with Recharts for visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Order status chart will be displayed here</p>
                <p className="text-sm">Integrate with Recharts for visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(product.revenue)}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sales data available yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Pending</span>
                </div>
                <span className="font-bold">{stats.pendingOrders}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Processing</span>
                </div>
                <span className="font-bold">
                  {stats.totalOrders - stats.pendingOrders - stats.deliveredOrders}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Delivered</span>
                </div>
                <span className="font-bold">{stats.deliveredOrders}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold">
                  {stats.totalCustomers > 0 
                    ? ((stats.totalOrders / stats.totalCustomers) * 100).toFixed(1)
                    : 0
                  }%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Products per Order</span>
                <span className="font-semibold">
                  {stats.totalOrders > 0 
                    ? (stats.totalProducts / stats.totalOrders).toFixed(1)
                    : 0
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">RFQ Conversion</span>
                <span className="font-semibold">
                  {stats.totalRFQs > 0 
                    ? ((stats.totalOrders / stats.totalRFQs) * 100).toFixed(1)
                    : 0
                  }%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Shipment Rate</span>
                <span className="font-semibold">
                  {stats.totalOrders > 0 
                    ? ((stats.totalShipments / stats.totalOrders) * 100).toFixed(1)
                    : 0
                  }%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
