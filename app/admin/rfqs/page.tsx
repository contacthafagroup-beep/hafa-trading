'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Send, FileText, Loader2, Edit, Trash2, Mail, Reply } from 'lucide-react';
import { getAllRFQs, updateRFQStatus, deleteRFQ, formatRFQDate, sendRFQReplyEmail, RFQ } from '@/lib/firebase/rfqs';
import { getRFQMessages, sendRFQMessage, formatMessageDate, RFQMessage } from '@/lib/firebase/rfq-messages';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import toast from 'react-hot-toast';

export default function RFQsPage() {
  const { user } = useAuth();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [quoteDialog, setQuoteDialog] = useState(false);
  const [replyDialog, setReplyDialog] = useState(false);
  const [messagesDialog, setMessagesDialog] = useState(false);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [quotedNotes, setQuotedNotes] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [newStatus, setNewStatus] = useState<RFQ['status']>('new');
  const [messages, setMessages] = useState<RFQMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

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

  const handleSendReply = async () => {
    if (!selectedRFQ || !replyMessage || !replySubject) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSendingReply(true);
    try {
      // Send email via Firebase Function
      await sendRFQReplyEmail(
        selectedRFQ.customerEmail,
        replySubject,
        replyMessage,
        selectedRFQ.id,
        selectedRFQ.customerName
      );
      
      // Update RFQ status to reviewing if it's new
      if (selectedRFQ.status === 'new') {
        await updateRFQStatus(selectedRFQ.id, 'reviewing');
      }
      
      toast.success('Reply sent successfully to customer!');
      setReplyDialog(false);
      setReplySubject('');
      setReplyMessage('');
      setSelectedRFQ(null);
      loadRFQs();
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  const loadMessages = async (rfqId: string) => {
    setLoadingMessages(true);
    try {
      const msgs = await getRFQMessages(rfqId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const openMessagesDialog = async (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setMessagesDialog(true);
    await loadMessages(rfq.id);
  };

  const handleSendMessage = async () => {
    if (!selectedRFQ || !newMessage.trim() || !user) {
      toast.error('Please enter a message');
      return;
    }
    
    setSendingMessage(true);
    try {
      await sendRFQMessage(
        selectedRFQ.id,
        user.uid,
        user.displayName || 'Admin',
        'admin',
        newMessage.trim()
      );
      
      setNewMessage('');
      await loadMessages(selectedRFQ.id);
      toast.success('Message sent!');
      
      // Update RFQ status to reviewing if it's new
      if (selectedRFQ.status === 'new') {
        await updateRFQStatus(selectedRFQ.id, 'reviewing');
        loadRFQs();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const openReplyDialog = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setReplySubject(`Re: RFQ #${rfq.id.slice(0, 8)} - ${rfq.productName}`);
    setReplyMessage(`Dear ${rfq.customerName},\n\nThank you for your quotation request for ${rfq.productName}.\n\n[Your message here]\n\nBest regards,\nHafa General Trading PLC\nHossana, Ethiopia\nPhone: +251 954 742 383\nEmail: contact@hafatrading.com`);
    setReplyDialog(true);
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Direct Message"
                            onClick={() => openMessagesDialog(rfq)}
                          >
                            <Mail className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Send Email Reply"
                            onClick={() => openReplyDialog(rfq)}
                          >
                            <Reply className="h-4 w-4 text-green-600" />
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
      <Dialog open={!!selectedRFQ && !quoteDialog && !replyDialog && !messagesDialog} onOpenChange={(open) => !open && setSelectedRFQ(null)}>
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
                <Button 
                  variant="outline"
                  onClick={() => {
                    openReplyDialog(selectedRFQ);
                    setSelectedRFQ(null);
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply to Customer
                </Button>
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

      {/* Direct Messages Dialog */}
      <Dialog open={messagesDialog} onOpenChange={(open) => {
        setMessagesDialog(open);
        if (!open) {
          setSelectedRFQ(null);
          setMessages([]);
          setNewMessage('');
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Direct Messages - RFQ #{selectedRFQ?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          {selectedRFQ && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Customer Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 mb-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <p className="font-medium">{selectedRFQ.customerName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <p className="font-medium">{selectedRFQ.productName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantity:</span>
                    <p className="font-medium">{selectedRFQ.quantity} {selectedRFQ.unit}</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-900 min-h-[300px] max-h-[400px]">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Mail className="h-12 w-12 mb-2 opacity-50" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation below</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderRole === 'admin'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-800 border'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {msg.senderName}
                            </span>
                            <span className={`text-xs ${msg.senderRole === 'admin' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                              {formatMessageDate(msg.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message to the customer..."
                  rows={3}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendingMessage}
                  className="self-end"
                >
                  {sendingMessage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Customer will see this message in their dashboard. Press Enter to send, Shift+Enter for new line.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialog} onOpenChange={(open) => {
        setReplyDialog(open);
        if (!open) {
          setReplySubject('');
          setReplyMessage('');
          setSelectedRFQ(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Reply to Customer
            </DialogTitle>
          </DialogHeader>
          {selectedRFQ && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">To:</span>
                    <p className="font-medium">{selectedRFQ.customerName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedRFQ.customerEmail}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RFQ:</span>
                    <p className="font-medium">#{selectedRFQ.id.slice(0, 8)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <p className="font-medium">{selectedRFQ.productName}</p>
                  </div>
                </div>
              </div>

              {/* Email Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Input 
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  placeholder="Email subject"
                  required
                />
              </div>
              
              {/* Email Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply message..."
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will send an email directly to the customer
                </p>
              </div>

              {/* Quick Templates */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Quick Templates:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage(`Dear ${selectedRFQ.customerName},\n\nThank you for your interest in ${selectedRFQ.productName}.\n\nWe have received your quotation request and are currently reviewing it. We will get back to you with a detailed quote within 24-48 hours.\n\nIf you have any urgent questions, please don't hesitate to contact us.\n\nBest regards,\nHafa General Trading PLC`)}
                  >
                    Acknowledgment
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage(`Dear ${selectedRFQ.customerName},\n\nThank you for your quotation request for ${selectedRFQ.productName}.\n\nWe are pleased to inform you that we can fulfill your order. Please find our quotation details below:\n\nProduct: ${selectedRFQ.productName}\nQuantity: ${selectedRFQ.quantity} ${selectedRFQ.unit}\nPrice: [Your Price]\nDelivery Time: [Estimated Time]\nPayment Terms: [Your Terms]\n\nPlease let us know if you need any additional information.\n\nBest regards,\nHafa General Trading PLC`)}
                  >
                    Quote Template
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage(`Dear ${selectedRFQ.customerName},\n\nThank you for your inquiry about ${selectedRFQ.productName}.\n\nWe need some additional information to provide you with an accurate quotation:\n\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n\nOnce we receive this information, we'll be able to send you a detailed quote.\n\nBest regards,\nHafa General Trading PLC`)}
                  >
                    Request Info
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setReplyDialog(false);
                    setReplySubject('');
                    setReplyMessage('');
                  }}
                  disabled={sendingReply}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendReply} 
                  disabled={!replyMessage || !replySubject || sendingReply}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {sendingReply ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
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
