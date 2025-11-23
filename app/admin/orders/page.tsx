'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Download, Package, Loader2, Edit, Truck, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAllOrders, updateOrderStatus, formatOrderDate, Order } from '@/lib/firebase/orders';
import { createShipment } from '@/lib/firebase/shipments';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [shipmentDialog, setShipmentDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [creatingShipment, setCreatingShipment] = useState(false);
  const [shipmentData, setShipmentData] = useState({
    carrier: 'DHL',
    estimatedDelivery: '',
    notes: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    
    try {
      await updateOrderStatus(selectedOrder.id, newStatus, trackingNumber || undefined);
      toast.success('Order status updated successfully!');
      setStatusDialog(false);
      setSelectedOrder(null);
      setTrackingNumber('');
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const generateTrackingNumber = () => {
    const prefix = 'HFT';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleCreateShipment = async () => {
    if (!selectedOrder) return;
    
    setCreatingShipment(true);
    try {
      const generatedTrackingNumber = generateTrackingNumber();
      
      // Create shipment
      await createShipment({
        orderId: selectedOrder.id,
        trackingNumber: generatedTrackingNumber,
        customerName: selectedOrder.userName,
        customerEmail: selectedOrder.userEmail,
        origin: {
          city: 'Hossana',
          country: 'Ethiopia',
          address: 'Gofer Meda Subcity, Jelo Naremo District'
        },
        destination: {
          city: selectedOrder.shippingAddress.city || 'N/A',
          country: selectedOrder.shippingAddress.country || 'N/A',
          address: selectedOrder.shippingAddress.address,
          postalCode: selectedOrder.shippingAddress.postalCode
        },
        carrier: shipmentData.carrier,
        status: 'preparing',
        estimatedDelivery: shipmentData.estimatedDelivery || undefined,
        updates: [{
          status: 'preparing',
          location: 'Hossana, Ethiopia',
          timestamp: new Date(),
          notes: 'Shipment created and preparing for dispatch'
        }],
        notes: shipmentData.notes || undefined
      });

      // Update order status to processing with tracking number
      await updateOrderStatus(selectedOrder.id, 'processing', generatedTrackingNumber);

      // Send email notification (opens email client)
      const subject = encodeURIComponent(`Your Order #${selectedOrder.id.slice(0, 8)} Has Been Shipped`);
      const body = encodeURIComponent(
        `Dear ${selectedOrder.userName},\n\n` +
        `Your order #${selectedOrder.id.slice(0, 8)} has been shipped!\n\n` +
        `Tracking Number: ${generatedTrackingNumber}\n` +
        `Carrier: ${shipmentData.carrier}\n` +
        `${shipmentData.estimatedDelivery ? `Estimated Delivery: ${shipmentData.estimatedDelivery}\n` : ''}` +
        `\nYou can track your shipment at: ${window.location.origin}/track\n\n` +
        `Thank you for your order!\n\n` +
        `Best regards,\n` +
        `Hafa General Trading PLC\n` +
        `Phone: +251 954 742 383\n` +
        `Email: contact@hafatrading.com`
      );
      
      window.location.href = `mailto:${selectedOrder.userEmail}?subject=${subject}&body=${body}`;

      toast.success(`Shipment created! Tracking #: ${generatedTrackingNumber}`);
      setShipmentDialog(false);
      setSelectedOrder(null);
      setShipmentData({ carrier: 'DHL', estimatedDelivery: '', notes: '' });
      loadOrders();
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast.error('Failed to create shipment');
    } finally {
      setCreatingShipment(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'processing').length}
            </div>
            <p className="text-sm text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'shipped').length}
            </div>
            <p className="text-sm text-muted-foreground">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by order ID, customer name, or email..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
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
                    <th className="text-left p-4 font-medium">Order ID</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Items</th>
                    <th className="text-left p-4 font-medium">Total</th>
                    <th className="text-left p-4 font-medium">Payment</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 font-medium">#{order.id.slice(0, 8)}</td>
                      <td className="p-4">
                        <div className="font-medium">{order.userName}</div>
                        <div className="text-sm text-muted-foreground">{order.userEmail}</div>
                      </td>
                      <td className="p-4">{order.items.length} items</td>
                      <td className="p-4 font-medium">{formatCurrency(order.total)}</td>
                      <td className="p-4">
                        <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{formatOrderDate(order.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!order.trackingNumber && order.status !== 'cancelled' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Create Shipment"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShipmentData({ carrier: 'DHL', estimatedDelivery: '', notes: '' });
                                setShipmentDialog(true);
                              }}
                            >
                              <Truck className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Update Status"
                            onClick={() => {
                              setSelectedOrder(order);
                              setNewStatus(order.status);
                              setTrackingNumber(order.trackingNumber || '');
                              setStatusDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder && !statusDialog} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">#{selectedOrder.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.userName}</p>
                  <p className="text-sm">{selectedOrder.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatOrderDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.quantity * item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>{formatCurrency(selectedOrder.shipping)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>{formatCurrency(selectedOrder.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-sm">{selectedOrder.shippingAddress.address}</p>
                    <p className="text-sm">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                    <p className="text-sm">Phone: {selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              )}

              {selectedOrder.trackingNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-medium">{selectedOrder.trackingNumber}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {(newStatus === 'shipped' || newStatus === 'delivered') && (
              <div>
                <label className="block text-sm font-medium mb-2">Tracking Number</label>
                <Input 
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStatusDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus}>
                Update Status
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Shipment Dialog */}
      <Dialog open={shipmentDialog} onOpenChange={setShipmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Create Shipment & Send Tracking Number
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Order Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID:</span>
                    <p className="font-medium">#{selectedOrder.id.slice(0, 8)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <p className="font-medium">{selectedOrder.userName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedOrder.userEmail}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <p className="font-medium">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Shipping Address
                </h4>
                <p className="text-sm">
                  {selectedOrder.shippingAddress.address}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                  {selectedOrder.shippingAddress.country} - {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>

              {/* Shipment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Carrier *</label>
                  <select
                    value={shipmentData.carrier}
                    onChange={(e) => setShipmentData({ ...shipmentData, carrier: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="DHL">DHL Express</option>
                    <option value="FedEx">FedEx International</option>
                    <option value="UPS">UPS Worldwide</option>
                    <option value="Ethiopian Airlines">Ethiopian Airlines Cargo</option>
                    <option value="Maersk">Maersk Sea Freight</option>
                    <option value="MSC">MSC Sea Freight</option>
                    <option value="Local Courier">Local Courier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Delivery Date</label>
                  <Input
                    type="date"
                    value={shipmentData.estimatedDelivery}
                    onChange={(e) => setShipmentData({ ...shipmentData, estimatedDelivery: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                  <Input
                    value={shipmentData.notes}
                    onChange={(e) => setShipmentData({ ...shipmentData, notes: e.target.value })}
                    placeholder="Add any special instructions..."
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                      What happens next:
                    </p>
                    <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
                      <li>A unique tracking number will be generated automatically</li>
                      <li>Shipment will be created with status "Preparing"</li>
                      <li>Order status will be updated to "Processing"</li>
                      <li>Email notification will be prepared for the customer</li>
                      <li>You can track and update shipment status in Shipments page</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShipmentDialog(false);
                    setShipmentData({ carrier: 'DHL', estimatedDelivery: '', notes: '' });
                  }}
                  disabled={creatingShipment}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateShipment}
                  disabled={creatingShipment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {creatingShipment ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 mr-2" />
                      Create Shipment & Notify Customer
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
