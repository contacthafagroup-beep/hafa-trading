'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Mail, CheckCircle, XCircle, Clock, Loader2, Star, Building2, Trash2 } from 'lucide-react';
import { 
  getAllSuppliers, 
  updateSupplierStatus, 
  deleteSupplier, 
  formatSupplierDate,
  Supplier 
} from '@/lib/firebase/suppliers';
import toast from 'react-hot-toast';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<Supplier['status']>('approved');
  const [statusNotes, setStatusNotes] = useState('');

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getAllSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Error loading suppliers:', error);
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedSupplier) return;
    
    try {
      await updateSupplierStatus(selectedSupplier.id, newStatus, statusNotes || undefined);
      toast.success('Supplier status updated successfully!');
      setStatusDialog(false);
      setSelectedSupplier(null);
      setStatusNotes('');
      loadSuppliers();
    } catch (error) {
      console.error('Error updating supplier status:', error);
      toast.error('Failed to update supplier status');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete supplier "${name}"?`)) return;
    
    try {
      await deleteSupplier(id);
      toast.success('Supplier deleted successfully!');
      loadSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast.error('Failed to delete supplier');
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgRating = suppliers.length > 0
    ? suppliers.reduce((sum, s) => sum + (s.rating || 0), 0) / suppliers.filter(s => s.rating).length
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage supplier accounts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{suppliers.length}</div>
                <p className="text-sm text-muted-foreground">Total Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {suppliers.filter(s => s.status === 'approved').length}
                </div>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {suppliers.filter(s => s.status === 'pending').length}
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
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
              placeholder="Search by company name, contact person, or email..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier List ({filteredSuppliers.length})</CardTitle>
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
                    <th className="text-left p-4 font-medium">Supplier</th>
                    <th className="text-left p-4 font-medium">Contact Person</th>
                    <th className="text-left p-4 font-medium">Products</th>
                    <th className="text-left p-4 font-medium">Rating</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4">
                        <div className="font-medium">{supplier.companyName}</div>
                        <div className="text-sm text-muted-foreground">
                          {supplier.city}, {supplier.country}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined {formatSupplierDate(supplier.createdAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{supplier.contactPerson}</div>
                        <div className="text-sm text-muted-foreground">{supplier.email}</div>
                        <div className="text-sm text-muted-foreground">{supplier.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.slice(0, 3).map((product, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                          {supplier.products.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{supplier.products.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {supplier.rating && supplier.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{supplier.rating.toFixed(1)}</span>
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            {supplier.reviewCount && (
                              <span className="text-xs text-muted-foreground">
                                ({supplier.reviewCount})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(supplier.status)}>
                          {getStatusIcon(supplier.status)}
                          <span className="ml-1">{supplier.status}</span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => setSelectedSupplier(supplier)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {supplier.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Approve" 
                                className="text-green-600"
                                onClick={() => {
                                  setSelectedSupplier(supplier);
                                  setNewStatus('approved');
                                  setStatusNotes('');
                                  setStatusDialog(true);
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Reject" 
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedSupplier(supplier);
                                  setNewStatus('rejected');
                                  setStatusNotes('');
                                  setStatusDialog(true);
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDelete(supplier.id, supplier.companyName)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSuppliers.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No suppliers found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supplier Details Dialog */}
      <Dialog open={!!selectedSupplier && !statusDialog} onOpenChange={(open) => !open && setSelectedSupplier(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Supplier Details</DialogTitle>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedSupplier.companyName}</h3>
                  <p className="text-muted-foreground">{selectedSupplier.city}, {selectedSupplier.country}</p>
                </div>
                <Badge className={getStatusColor(selectedSupplier.status)}>
                  {getStatusIcon(selectedSupplier.status)}
                  <span className="ml-1">{selectedSupplier.status}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{selectedSupplier.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedSupplier.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedSupplier.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{formatSupplierDate(selectedSupplier.createdAt)}</p>
                </div>
              </div>

              {selectedSupplier.address && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Address</p>
                  <p className="font-medium">{selectedSupplier.address}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Products</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.products.map((product, i) => (
                    <Badge key={i} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.categories.map((category, i) => (
                    <Badge key={i}>
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedSupplier.certifications && selectedSupplier.certifications.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.certifications.map((cert, i) => (
                      <Badge key={i} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedSupplier.rating && selectedSupplier.rating > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold">{selectedSupplier.rating.toFixed(1)}</span>
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    </div>
                    {selectedSupplier.reviewCount && (
                      <span className="text-muted-foreground">
                        ({selectedSupplier.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {selectedSupplier.notes && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    {selectedSupplier.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <a href={`mailto:${selectedSupplier.email}`} className="flex-1">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </a>
                {selectedSupplier.status === 'pending' && (
                  <Button 
                    onClick={() => {
                      setNewStatus('approved');
                      setStatusNotes('');
                      setStatusDialog(true);
                    }}
                    className="flex-1 bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusDialog} onOpenChange={setStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Supplier Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Supplier['status'])}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Textarea 
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add any notes about this status change..."
                rows={3}
              />
            </div>

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
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'suspended': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved': return <CheckCircle className="h-4 w-4" />;
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'rejected': return <XCircle className="h-4 w-4" />;
    case 'suspended': return <XCircle className="h-4 w-4" />;
    default: return null;
  }
};
