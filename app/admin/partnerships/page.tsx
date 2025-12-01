'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Send, Loader2, Trash2, Mail, Reply, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import { 
  getAllPartnerships, 
  updatePartnershipStatus, 
  deletePartnership, 
  formatPartnershipDate, 
  sendPartnershipReplyEmail,
  Partnership 
} from '@/lib/firebase/partnerships';
import { 
  getPartnershipMessages, 
  sendPartnershipMessage, 
  formatMessageDate, 
  PartnershipMessage 
} from '@/lib/firebase/partnership-messages';
import { useAuth } from '@/contexts/auth-context';
import toast from 'react-hot-toast';

export default function AdminPartnershipsPage() {
  const { user } = useAuth();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [messagesDialog, setMessagesDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [messages, setMessages] = useState<PartnershipMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    loadPartnerships();
  }, []);

  const loadPartnerships = async () => {
    try {
      setLoading(true);
      const data = await getAllPartnerships();
      setPartnerships(data);
    } catch (error) {
      console.error('Error loading partnerships:', error);
      toast.error('Failed to load partnership applications');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (partnershipId: string) => {
    setLoadingMessages(true);
    try {
      const msgs = await getPartnershipMessages(partnershipId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const openEmailDialog = (partnership: Partnership) => {
    setSelectedPartnership(partnership);
    setEmailSubject(`Re: Partnership Application - ${partnership.companyName}`);
    setEmailMessage(`Dear ${partnership.contactPerson},\n\nThank you for your interest in partnering with Hafa Trading PLC.\n\n[Your message here]\n\nBest regards,\nHafa Trading PLC\nPartnership Team\nPhone: +251 954 742 383\nEmail: partnerships@hafatrading.com`);
    setEmailDialog(true);
  };

  const openMessagesDialog = async (partnership: Partnership) => {
    setSelectedPartnership(partnership);
    setMessagesDialog(true);
    await loadMessages(partnership.id);
  };

  const handleSendEmail = async () => {
    if (!selectedPartnership || !emailMessage || !emailSubject) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSendingEmail(true);
    try {
      await sendPartnershipReplyEmail(
        selectedPartnership.email,
        emailSubject,
        emailMessage,
        selectedPartnership.id,
        selectedPartnership.companyName
      );
      
      if (selectedPartnership.status === 'new') {
        await updatePartnershipStatus(selectedPartnership.id, 'contacted');
      }
      
      toast.success('Email sent successfully!');
      setEmailDialog(false);
      setEmailSubject('');
      setEmailMessage('');
      setSelectedPartnership(null);
      loadPartnerships();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedPartnership || !newMessage.trim() || !user) {
      toast.error('Please enter a message');
      return;
    }
    
    setSendingMessage(true);
    try {
      await sendPartnershipMessage(
        selectedPartnership.id,
        user.uid,
        user.displayName || 'Admin',
        'admin',
        newMessage.trim()
      );
      
      setNewMessage('');
      await loadMessages(selectedPartnership.id);
      toast.success('Message sent!');
      
      if (selectedPartnership.status === 'new') {
        await updatePartnershipStatus(selectedPartnership.id, 'contacted');
        loadPartnerships();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: Partnership['status']) => {
    try {
      await updatePartnershipStatus(id, status);
      toast.success('Status updated successfully!');
      loadPartnerships();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string, companyName: string) => {
    if (!confirm(`Are you sure you want to delete partnership application from ${companyName}?`)) return;
    
    try {
      await deletePartnership(id);
      toast.success('Partnership application deleted successfully!');
      loadPartnerships();
    } catch (error) {
      console.error('Error deleting partnership:', error);
      toast.error('Failed to delete partnership application');
    }
  };

  const filteredPartnerships = partnerships.filter(p => 
    p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'contacted': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'new': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      case 'contacted': return Mail;
      case 'reviewing': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partnership Applications</h1>
          <p className="text-muted-foreground">Manage and respond to partnership inquiries</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{partnerships.length}</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {partnerships.filter(p => p.status === 'new').length}
            </div>
            <p className="text-sm text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {partnerships.filter(p => p.status === 'contacted').length}
            </div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {partnerships.filter(p => p.status === 'reviewing').length}
            </div>
            <p className="text-sm text-muted-foreground">Reviewing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {partnerships.filter(p => p.status === 'approved').length}
            </div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by company, contact person, email, or country..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Applications ({filteredPartnerships.length})</CardTitle>
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
                    <th className="text-left p-4 font-medium">Company</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Products</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartnerships.map((partnership) => {
                    const StatusIcon = getStatusIcon(partnership.status);
                    return (
                      <tr key={partnership.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">
                          <div className="font-medium">{partnership.companyName}</div>
                          <div className="text-sm text-muted-foreground">{partnership.country}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{partnership.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{partnership.email}</div>
                          <div className="text-xs text-muted-foreground">{partnership.phone}</div>
                        </td>
                        <td className="p-4 capitalize">{partnership.businessType}</td>
                        <td className="p-4 text-sm">{partnership.productsInterested}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(partnership.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {partnership.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{formatPartnershipDate(partnership.createdAt)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="View Details"
                              onClick={() => {
                                setSelectedPartnership(partnership);
                                setDetailsDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Direct Message"
                              onClick={() => openMessagesDialog(partnership)}
                            >
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Send Email"
                              onClick={() => openEmailDialog(partnership)}
                            >
                              <Reply className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Delete"
                              onClick={() => handleDelete(partnership.id, partnership.companyName)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredPartnerships.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No partnership applications found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Partnership Application Details</DialogTitle>
          </DialogHeader>
          {selectedPartnership && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium">{selectedPartnership.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedPartnership.status)}>
                    {selectedPartnership.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{selectedPartnership.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{selectedPartnership.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedPartnership.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedPartnership.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-medium capitalize">{selectedPartnership.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Volume</p>
                  <p className="font-medium">{selectedPartnership.annualVolume || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Products Interested</p>
                <p className="font-medium">{selectedPartnership.productsInterested}</p>
              </div>

              {selectedPartnership.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Additional Information</p>
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm whitespace-pre-wrap">
                    {selectedPartnership.message}
                  </p>
                </div>
              )}

              {selectedPartnership.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Admin Notes</p>
                  <p className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                    {selectedPartnership.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setDetailsDialog(false);
                    openMessagesDialog(selectedPartnership);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setDetailsDialog(false);
                    openEmailDialog(selectedPartnership);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                {selectedPartnership.status === 'new' && (
                  <Button onClick={() => {
                    handleUpdateStatus(selectedPartnership.id, 'reviewing');
                    setDetailsDialog(false);
                  }}>
                    Mark as Reviewing
                  </Button>
                )}
                {selectedPartnership.status === 'reviewing' && (
                  <>
                    <Button onClick={() => {
                      handleUpdateStatus(selectedPartnership.id, 'approved');
                      setDetailsDialog(false);
                    }} className="bg-green-600">
                      Approve
                    </Button>
                    <Button onClick={() => {
                      handleUpdateStatus(selectedPartnership.id, 'rejected');
                      setDetailsDialog(false);
                    }} variant="destructive">
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email Reply
            </DialogTitle>
          </DialogHeader>
          {selectedPartnership && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">To:</span>
                    <p className="font-medium">{selectedPartnership.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedPartnership.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Company:</span>
                    <p className="font-medium">{selectedPartnership.companyName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium capitalize">{selectedPartnership.businessType}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Input 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea 
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Type your email message..."
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will send an email directly to the applicant
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Quick Templates:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailMessage(`Dear ${selectedPartnership.contactPerson},\n\nThank you for your interest in partnering with Hafa Trading PLC.\n\nWe have received your partnership application and are currently reviewing it. We will get back to you with more information within 3-5 business days.\n\nIf you have any urgent questions, please don't hesitate to contact us.\n\nBest regards,\nHafa Trading PLC\nPartnership Team`)}
                  >
                    Acknowledgment
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailMessage(`Dear ${selectedPartnership.contactPerson},\n\nWe are pleased to inform you that your partnership application has been approved!\n\nWe would like to schedule a call to discuss the next steps and partnership details. Please let us know your availability for a meeting.\n\nWelcome to the Hafa Trading family!\n\nBest regards,\nHafa Trading PLC\nPartnership Team`)}
                  >
                    Approval
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailMessage(`Dear ${selectedPartnership.contactPerson},\n\nThank you for your partnership application.\n\nWe need some additional information to proceed:\n\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n\nPlease provide this information at your earliest convenience.\n\nBest regards,\nHafa Trading PLC\nPartnership Team`)}
                  >
                    Request Info
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmailDialog(false);
                    setEmailSubject('');
                    setEmailMessage('');
                  }}
                  disabled={sendingEmail}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendEmail} 
                  disabled={!emailMessage || !emailSubject || sendingEmail}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {sendingEmail ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Messages Dialog */}
      <Dialog open={messagesDialog} onOpenChange={(open) => {
        setMessagesDialog(open);
        if (!open) {
          setSelectedPartnership(null);
          setMessages([]);
          setNewMessage('');
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Direct Messages - {selectedPartnership?.companyName}
            </DialogTitle>
          </DialogHeader>
          {selectedPartnership && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 mb-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium">{selectedPartnership.contactPerson}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium capitalize">{selectedPartnership.businessType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Products:</span>
                    <p className="font-medium text-xs">{selectedPartnership.productsInterested}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-900 min-h-[300px] max-h-[400px]">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-2 opacity-50" />
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

              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message to the applicant..."
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
                Applicant will see this message in their dashboard. Press Enter to send, Shift+Enter for new line.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
