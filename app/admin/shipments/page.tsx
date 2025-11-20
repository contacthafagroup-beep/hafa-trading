'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, MapPin, Truck, Loader2, Plus, Edit, Trash2, Package } from 'lucide-react';
import { 
  getAllShipments, 
  addShipmentUpdate, 
  deleteShipment, 
  formatShipmentDate,
  getStatusLabel,
  Shipment 
} from '@/lib/firebase/shipments';
import toast from 'react-hot-toast';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<Shipment['status']>('in_transit');
  const [updateLocation, setUpdateLocation] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      setLoading(true);
      const data = await getAllShipments();
      setShipments(data);
    } catch (error) {
      console.error('Error loading shipments:', error);
      toast.error('Failed to load shipments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUpdate = async () => {
    if (!selectedShipment || !updateLocation) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      await addShipmentUpdate(
        selectedShipment.id,
        newStatus,
        updateLocation,
        updateNotes || undefined
      );
      toast.success('Shipment updated successfully!');
      setUpdateDialog(false);
      setSelectedShipment(null);
      setUpdateLocation('');
      setUpdateNotes('');
      loadShipments();
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast.error('Failed to update shipment');
    }
  };

  const handleDelete = async (id: string, trackingNumber: string) => {
    if (!confirm(`Are you sure you want to delete shipment ${trackingNumber}?`)) return;
    
    try {
      await deleteShipment(id);
      toast.success('Shipment deleted successfully!');
      loadShipments();
    } catch (error) {
      console.error('Error deleting shipment:', error);
      toast.error('Failed to delete shipment');
    }
  };

  const filteredShipments = shipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in_transit': return 'bg-blue-100 text-blue-700';
      case 'customs': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shipments</h1>
          <p className="text-muted-foreground">Track and manage shipments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{shipments.length}</div>
            <p className="text-sm text-muted-foreground">Total Shipments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-600">
              {shipments.filter(s => s.status === 'preparing').length}
            </div>
            <p className="text-sm text-muted-foreground">Preparing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {shipments.filter(s => s.status === 'in_transit').length}
            </div>
            <p className="text-sm text-muted-foreground">In Transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {shipments.filter(s => s.status === 'customs').length}
            </div>
            <p className="text-sm text-muted-foreground">At Customs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {shipments.filter(s => s.status === 'delivered').length}
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
              placeholder="Search by tracking number, order ID, or customer..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Shipments ({filteredShipments.length})</CardTitle>
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
                    <th className="text-left p-4 font-medium">Tracking #</th>
                    <th className="text-left p-4 font-medium">Order ID</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Route</th>
                    <th className="text-left p-4 font-medium">Carrier</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 font-medium">{shipment.trackingNumber}</td>
                      <td className="p-4">#{shipment.orderId.slice(0, 8)}</td>
                      <td className="p-4">
                        <div className="font-medium">{shipment.customerName}</div>
                        <div className="text-sm text-muted-foreground">{shipment.customerEmail}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {shipment.origin.city}, {shipment.origin.country}
                          </div>
                          <div className="text-muted-foreground">
                            → {shipment.destination.city}, {shipment.destination.country}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{shipment.carrier}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(shipment.status)}>
                          {getStatusLabel(shipment.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => setSelectedShipment(shipment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Add Update"
                            onClick={() => {
                              setSelectedShipment(shipment);
                              setNewStatus(shipment.status);
                              setUpdateLocation('');
                              setUpdateNotes('');
                              setUpdateDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDelete(shipment.id, shipment.trackingNumber)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredShipments.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No shipments found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipment Details Dialog */}
      <Dialog open={!!selectedShipment && !updateDialog} onOpenChange={(open) => !open && setSelectedShipment(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-medium text-lg">{selectedShipment.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedShipment.status)}>
                    {getStatusLabel(selectedShipment.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">#{selectedShipment.orderId.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carrier</p>
                  <p className="font-medium">{selectedShipment.carrier}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedShipment.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedShipment.customerEmail}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Shipping Route</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm text-muted-foreground mb-1">Origin</p>
                    <p className="font-medium">{selectedShipment.origin.city}, {selectedShipment.origin.country}</p>
                    {selectedShipment.origin.address && (
                      <p className="text-sm">{selectedShipment.origin.address}</p>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm text-muted-foreground mb-1">Destination</p>
                    <p className="font-medium">{selectedShipment.destination.city}, {selectedShipment.destination.country}</p>
                    {selectedShipment.destination.address && (
                      <p className="text-sm">{selectedShipment.destination.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedShipment.updates && selectedShipment.updates.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Tracking Updates</h3>
                  <div className="space-y-3">
                    {selectedShipment.updates.map((update, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline">{getStatusLabel(update.status as Shipment['status'])}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatShipmentDate(update.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{update.location}</p>
                          {update.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{update.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Update Dialog */}
      <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Shipment Update</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Shipment['status'])}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="preparing">Preparing</option>
                <option value="picked_up">Picked Up</option>
                <option value="in_transit">In Transit</option>
                <option value="customs">At Customs</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <Input 
                value={updateLocation}
                onChange={(e) => setUpdateLocation(e.target.value)}
                placeholder="e.g., Dubai International Airport"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Textarea 
                value={updateNotes}
                onChange={(e) => setUpdateNotes(e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setUpdateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUpdate} disabled={!updateLocation}>
                <Plus className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'out_for_delivery': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'in_transit': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'picked_up': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'customs': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'preparing': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
};
