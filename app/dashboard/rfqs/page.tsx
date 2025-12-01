'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Loader2, Mail, Send, MessageSquare } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { RFQ, formatRFQDate } from '@/lib/firebase/rfqs';
import { getRFQMessages, sendRFQMessage, formatMessageDate, RFQMessage } from '@/lib/firebase/rfq-messages';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function CustomerRFQsPage() {
  const { user, loading: authLoading } = useAuth();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [messagesDialog, setMessagesDialog] = useState(false);
  const [messages, setMessages] = useState<RFQMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    console.log('Auth state:', { user: !!user, email: user?.email, authLoading });
    if (user && user.email) {
      console.log('Loading RFQs for user:', user.email);
      loadRFQs();
    } else if (!authLoading) {
      console.log('No user or still loading auth');
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadRFQs = async () => {
    if (!db || !user || !user.email) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Try with orderBy first
      try {
        const q = query(
          collection(db, 'rfqs'),
          where('customerEmail', '==', user.email),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as RFQ));
        setRfqs(data);
      } catch (indexError: any) {
        // If index error, try without orderBy
        console.log('Index not available, loading without sorting:', indexError);
        const q = query(
          collection(db, 'rfqs'),
          where('customerEmail', '==', user.email)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as RFQ));
        // Sort manually by createdAt
        data.sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || 0;
          return bTime - aTime;
        });
        setRfqs(data);
        
        // Show info about creating index
        if (indexError.code === 'failed-precondition') {
          console.log('Firestore index needed. Check console for index creation link.');
        }
      }
    } catch (error: any) {
      console.error('Error loading RFQs:', error);
      toast.error('Failed to load your RFQs. Please try again.');
      setRfqs([]);
    } finally {
      setLoading(false);
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
        user.displayName || user.email || 'Customer',
        'customer',
        newMessage.trim()
      );
      
      setNewMessage('');
      await loadMessages(selectedRFQ.id);
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'quoted': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'new': return 'bg-purple-100 text-purple-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (authLoading || (loading && !user)) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your RFQs...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Please log in to view your RFQs</p>
              <Link href="/auth/login">
                <Button>Log In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My RFQs</h1>
          <p className="text-muted-foreground">View and manage your quotation requests</p>
        </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{rfqs.length}</div>
            <p className="text-sm text-muted-foreground">Total RFQs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {rfqs.filter(r => r.status === 'reviewing').length}
            </div>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {rfqs.filter(r => r.status === 'quoted').length}
            </div>
            <p className="text-sm text-muted-foreground">Quoted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {rfqs.filter(r => r.status === 'accepted').length}
            </div>
            <p className="text-sm text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* RFQs List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Quotation Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : rfqs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">You haven't submitted any RFQs yet</p>
              <Link href="/rfq">
                <Button>Submit RFQ</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rfqs.map((rfq) => (
                <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{rfq.productName}</h3>
                          <Badge className={getStatusColor(rfq.status)}>
                            {rfq.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          RFQ #{rfq.id.slice(0, 8)} • Submitted {formatRFQDate(rfq.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{rfq.quantity} {rfq.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Delivery Location</p>
                        <p className="font-medium">{rfq.deliveryLocation}</p>
                      </div>
                      {rfq.quotedPrice && (
                        <div>
                          <p className="text-sm text-muted-foreground">Quoted Price</p>
                          <p className="font-medium text-lg text-green-600">
                            {formatCurrency(rfq.quotedPrice)}
                          </p>
                        </div>
                      )}
                    </div>

                    {rfq.quotedNotes && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-medium mb-1">Quote Notes:</p>
                        <p className="text-sm">{rfq.quotedNotes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMessagesDialog(rfq)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages
                      </Button>
                      {rfq.status === 'quoted' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept Quote
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages Dialog */}
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
              <MessageSquare className="h-5 w-5" />
              Messages - RFQ #{selectedRFQ?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          {selectedRFQ && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* RFQ Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <p className="font-medium">{selectedRFQ.productName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedRFQ.status)}>
                      {selectedRFQ.status}
                    </Badge>
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
                    <p className="text-sm">Send a message to start the conversation</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderRole === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderRole === 'customer'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-800 border'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {msg.senderRole === 'admin' ? 'Hafa Trading' : 'You'}
                            </span>
                            <span className={`text-xs ${msg.senderRole === 'customer' ? 'text-blue-100' : 'text-muted-foreground'}`}>
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
                  placeholder="Type your message..."
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
                Press Enter to send, Shift+Enter for new line.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
      <Footer />
    </div>
  );
}
