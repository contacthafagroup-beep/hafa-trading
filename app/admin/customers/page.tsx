'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Mail, Phone, User, Loader2, ShoppingBag, DollarSign } from 'lucide-react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getAllOrders } from '@/lib/firebase/orders';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Customer {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  photoURL?: string;
  role: string;
  createdAt: any;
  updatedAt: any;
}

interface CustomerStats {
  orderCount: number;
  totalSpent: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerStats, setCustomerStats] = useState<Record<string, CustomerStats>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      
      if (!db) {
        setLoading(false);
        return;
      }
      
      // Load users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Customer));
      
      setCustomers(usersData);

      // Load orders to calculate stats
      const orders = await getAllOrders();
      const stats: Record<string, CustomerStats> = {};
      
      usersData.forEach(user => {
        const userOrders = orders.filter(order => order.userId === user.id);
        stats[user.id] = {
          orderCount: userOrders.length,
          totalSpent: userOrders.reduce((sum, order) => sum + order.total, 0)
        };
      });
      
      setCustomerStats(stats);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOrders = Object.values(customerStats).reduce((sum, stat) => sum + stat.orderCount, 0);
  const totalRevenue = Object.values(customerStats).reduce((sum, stat) => sum + stat.totalSpent, 0);
  const activeCustomers = customers.filter(c => c.role === 'customer').length;

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer accounts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Role</th>
                    <th className="text-left p-4 font-medium">Orders</th>
                    <th className="text-left p-4 font-medium">Total Spent</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => {
                    const stats = customerStats[customer.id] || { orderCount: 0, totalSpent: 0 };
                    return (
                      <tr key={customer.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {customer.photoURL ? (
                              <img 
                                src={customer.photoURL} 
                                alt={customer.displayName}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{customer.displayName || 'N/A'}</div>
                              <div className="text-sm text-muted-foreground">
                                Joined {formatDate(customer.createdAt)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                            {customer.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3" />
                                {customer.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={customer.role === 'superadmin' ? 'default' : 'secondary'}>
                            {customer.role}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            {stats.orderCount}
                          </div>
                        </td>
                        <td className="p-4 font-medium">
                          {formatCurrency(stats.totalSpent)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="View Details"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <a href={`mailto:${customer.email}`}>
                              <Button variant="ghost" size="icon" title="Send Email">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredCustomers.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No customers found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedCustomer.photoURL ? (
                  <img 
                    src={selectedCustomer.photoURL} 
                    alt={selectedCustomer.displayName}
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold">{selectedCustomer.displayName}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                  <Badge className="mt-2">{selectedCustomer.role}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium">#{selectedCustomer.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{formatDate(selectedCustomer.createdAt)}</p>
                </div>
                {selectedCustomer.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(selectedCustomer.updatedAt)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold">
                          {customerStats[selectedCustomer.id]?.orderCount || 0}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">
                          {formatCurrency(customerStats[selectedCustomer.id]?.totalSpent || 0)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <a href={`mailto:${selectedCustomer.email}`} className="flex-1">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
