'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Send, FileText, Loader2, Edit, Trash2 } from 'lucide-react';
import { getAllRFQs, updateRFQStatus, deleteRFQ, formatRFQDate, RFQ } from '@/lib/firebase/rfqs';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [quoteDialog, setQuoteDialog] = useState(false);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [quotedNotes, setQuotedNotes] = useState('');
  const [newStatus, setNewStatus] = useState<RFQ['status']>('new');

  useEffect(() => {
    loadRFQs();
  }, []);

  const loadRFQs = async () => {
    try {
      setLoading(true);
      const data = await getAllRFQs();
      setRfqs(data);
    } catch (error) {
      console.error('Error loading RFQs:', error);
      toast.error('Failed to load RFQs');
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (!selectedRFQ) return;
    
    try {
      await updateRFQStatus(
        selectedRFQ.id, 
        'quoted',
        quotedPrice ? parseFloat(quotedPrice) : undefined,
        quotedNotes
      );
      toast.success('Quote sent successfully!');
      setQuoteDialog(false);
      setSelectedRFQ(null);
      setQuotedPrice('');
      setQuotedNotes('');
      loadRFQs();
    } catch (error) {
      console.error('Error sending quote:', error);
      toast.error('Failed to send quote');
    }
  };

  const handleUpdateStatus = async (id: string, status: RFQ['status']) => {
    try {
      await updateRFQStatus(id, status);
      toast.success('Status updated successfully!');
      loadRFQs();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (!confirm(`Are you sure you want to delete RFQ from ${customerName}?`)) return;
    
    try {
      await deleteRFQ(id);
      toast.success('RFQ deleted successfully!');
      loadRFQs();
    } catch (error) {
      console.error('Error deleting RFQ:', error);
      toast.error('Failed to delete RFQ');
    }
  };

  const filteredRFQs = rfqs.filter(rfq => 
    rfq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'quoted': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'new': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">RFQs (Request for Quotation)</h1>
          <p className="text-muted-foreground">Manage quotation requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{rfqs.length}</div>
            <p className="text-sm text-muted-foreground">Total RFQs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {rfqs.filter(r => r.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {rfqs.filter(r => r.status === 'reviewing').length}
            </div>
            <p className="text-sm text-muted-foreground">Reviewing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {rfqs.filter(r => r.status === 'quoted').length}
            </div>
            <p className="text-sm text-muted-foreground">Quoted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {rfqs.filter(r => r.status === 'accepted').length}
            </div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by customer name, email, or product..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* RFQs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quotation Requests ({filteredRFQs.length})</CardTitle>
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
                    <th className="text-left p-4 font-medium">RFQ ID</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Quantity</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRFQs.map((rfq) => (
                    <tr key={rfq.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 font-medium">#{rfq.id.slice(0, 8)}</td>
                      <td className="p-4">
                        <div className="font-medium">{rfq.customerName}</div>
                        <div className="text-sm text-muted-foreground">{rfq.customerEmail}</div>
                        {rfq.companyName && (
                          <div className="text-xs text-muted-foreground">{rfq.companyName}</div>
                        )}
                      </td>
                      <td className="p-4">{rfq.productName}</td>
                      <td className="p-4">
                        {rfq.quantity} {rfq.unit}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{formatRFQDate(rfq.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => setSelectedRFQ(rfq)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {rfq.status === 'new' || rfq.status === 'reviewing' ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Send Quote"
                              onClick={() => {
                                setSelectedRFQ(rfq);
                                setQuotedPrice(rfq.targetPrice?.toString() || '');
                                setQuotedNotes('');
                                setQuoteDialog(true);
                              }}
                            >
                              <Send className="h-4 w-4 text-blue-600" />
                            </Button>
                          ) : null}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDelete(rfq.id, rfq.customerName)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRFQs.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No RFQs found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* RFQ Details Dialog */}
      <Dialog open={!!selectedRFQ && !quoteDialog} onOpenChange={(open) => !open && setSelectedRFQ(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>RFQ Details</DialogTitle>
          </DialogHeader>
          {selectedRFQ && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">RFQ ID</p>
                  <p className="font-medium">#{selectedRFQ.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedRFQ.status)}>
                    {selectedRFQ.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{selectedRFQ.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedRFQ.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedRFQ.customerPhone}</p>
                </div>
                {selectedRFQ.companyName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{selectedRFQ.companyName}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Product Requirements</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-medium">{selectedRFQ.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{selectedRFQ.quantity} {selectedRFQ.unit}</p>
                  </div>
                  {selectedRFQ.targetPrice && (
                    <div>
                      <p className="text-sm text-muted-foreground">Target Price</p>
                      <p className="font-medium">{formatCurrency(selectedRFQ.targetPrice)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Location</p>
                    <p className="font-medium">{selectedRFQ.deliveryLocation}</p>
                  </div>
                  {selectedRFQ.deliveryDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Date</p>
                      <p className="font-medium">{selectedRFQ.deliveryDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedRFQ.additionalRequirements && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Additional Requirements</p>
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    {selectedRFQ.additionalRequirements}
                  </p>
                </div>
              )}

              {selectedRFQ.quotedPrice && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Quote Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Quoted Price</p>
                      <p className="font-medium text-lg text-green-600">
                        {formatCurrency(selectedRFQ.quotedPrice)}
                      </p>
                    </div>
                  </div>
                  {selectedRFQ.quotedNotes && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Notes</p>
                      <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        {selectedRFQ.quotedNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                {selectedRFQ.status === 'new' && (
                  <Button onClick={() => handleUpdateStatus(selectedRFQ.id, 'reviewing')}>
                    Mark as Reviewing
                  </Button>
                )}
                {selectedRFQ.status === 'quoted' && (
                  <>
                    <Button onClick={() => handleUpdateStatus(selectedRFQ.id, 'accepted')} className="bg-green-600">
                      Mark as Accepted
                    </Button>
                    <Button onClick={() => handleUpdateStatus(selectedRFQ.id, 'rejected')} variant="destructive">
                      Mark as Rejected
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Quote Dialog */}
      <Dialog open={quoteDialog} onOpenChange={setQuoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Quotation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quoted Price (USD) *</label>
              <Input 
                type="number"
                step="0.01"
                value={quotedPrice}
                onChange={(e) => setQuotedPrice(e.target.value)}
                placeholder="Enter quoted price"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Notes / Terms</label>
              <Textarea 
                value={quotedNotes}
                onChange={(e) => setQuotedNotes(e.target.value)}
                placeholder="Add any notes, terms, or conditions..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setQuoteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendQuote} disabled={!quotedPrice}>
                <Send className="h-4 w-4 mr-2" />
                Send Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
