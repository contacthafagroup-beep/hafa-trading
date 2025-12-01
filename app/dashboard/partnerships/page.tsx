'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/contexts/auth-context';
import { db } from '@/lib/firebase/config';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { 
  Briefcase, MessageCircle, Send, Calendar, Mail, 
  Building, Phone, Globe, Package, CheckCircle, 
  Clock, XCircle, AlertCircle, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface PartnershipApplication {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productsInterested: string;
  estimatedVolume: string;
  experience: string;
  message: string;
  status: 'new' | 'contacted' | 'reviewing' | 'approved' | 'rejected';
  createdAt: any;
  userId: string;
  adminNotes?: string;
}

interface PartnershipMessage {
  id: string;
  partnershipId: string;
  text: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  timestamp: any;
  read: boolean;
}

export default function UserPartnershipsPage() {
  const [applications, setApplications] = useState<PartnershipApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<PartnershipApplication | null>(null);
  const [messages, setMessages] = useState<PartnershipMessage[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load user's partnership applications
  useEffect(() => {
    if (!user || !db) return;

    const q = query(
      collection(db, 'partnerships'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps: PartnershipApplication[] = [];
      snapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as PartnershipApplication);
      });
      setApplications(apps);
    });

    return () => unsubscribe();
  }, [user]);

  // Load messages for selected application
  useEffect(() => {
    if (!selectedApp || !db) return;

    const q = query(
      collection(db, 'partnershipMessages'),
      where('partnershipId', '==', selectedApp.id),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: PartnershipMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as PartnershipMessage);
      });
      setMessages(msgs);

      // Mark messages as read
      snapshot.forEach(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (!data.read && data.isAdmin && db) {
          await updateDoc(doc(db, 'partnershipMessages', docSnapshot.id), { read: true });
        }
      });
    });

    return () => unsubscribe();
  }, [selectedApp]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedApp || !user || !db) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'partnershipMessages'), {
        partnershipId: selectedApp.id,
        text: message.trim(),
        senderId: user.uid,
        senderName: user.displayName || user.email,
        isAdmin: false,
        timestamp: serverTimestamp(),
        read: false
      });

      setMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4" />;
      case 'contacted':
        return <Mail className="w-4 h-4" />;
      case 'reviewing':
        return <AlertCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contacted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please login to view your partnership applications
            </p>
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">My Partnership Applications</h1>
          <p className="text-muted-foreground">Track and manage your partnership applications</p>
        </motion.div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't submitted any partnership applications
              </p>
              <Link href="/partnership">
                <Button className="bg-gradient-to-r from-green-500 to-blue-600">
                  Apply for Partnership
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Applications List */}
            <div className="md:col-span-1 space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedApp?.id === app.id
                        ? 'ring-2 ring-blue-600 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedApp(app)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{app.companyName}</h3>
                          <p className="text-xs text-muted-foreground">
                            {app.createdAt?.toDate?.()?.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-3 h-3" />
                          <span className="truncate">{app.businessType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Globe className="w-3 h-3" />
                          <span className="truncate">{app.country}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Application Details & Messages */}
            <div className="md:col-span-2">
              {!selectedApp ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">
                      Select an application to view details and messages
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Application Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Application Details</span>
                        <Badge className={getStatusColor(selectedApp.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedApp.status)}
                            <span className="capitalize">{selectedApp.status}</span>
                          </div>
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Company Name</label>
                          <p className="flex items-center gap-2 mt-1">
                            <Building className="w-4 h-4 text-blue-600" />
                            {selectedApp.companyName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Contact Person</label>
                          <p className="mt-1">{selectedApp.contactPerson}</p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Email</label>
                          <p className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-purple-600" />
                            {selectedApp.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                          <p className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-green-600" />
                            {selectedApp.phone}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Country</label>
                          <p className="flex items-center gap-2 mt-1">
                            <Globe className="w-4 h-4 text-blue-600" />
                            {selectedApp.country}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Business Type</label>
                          <p className="mt-1">{selectedApp.businessType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Products Interested</label>
                          <p className="flex items-center gap-2 mt-1">
                            <Package className="w-4 h-4 text-orange-600" />
                            {selectedApp.productsInterested}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground">Estimated Volume</label>
                          <p className="mt-1">{selectedApp.estimatedVolume}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Experience</label>
                        <p className="mt-1">{selectedApp.experience}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Message</label>
                        <p className="mt-1 text-sm">{selectedApp.message}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Submitted</label>
                        <p className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          {selectedApp.createdAt?.toDate?.()?.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Messages */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Messages with Admin
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Messages Area */}
                      <div className="h-[300px] overflow-y-auto mb-4 space-y-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        {messages.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <MessageCircle className="w-12 h-12 mb-3 text-muted-foreground opacity-50" />
                            <p className="text-sm text-muted-foreground">
                              No messages yet. Start a conversation with the admin!
                            </p>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                  msg.isAdmin
                                    ? 'bg-white dark:bg-gray-800 border'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                }`}
                              >
                                <p className="text-xs opacity-70 mb-1">
                                  {msg.isAdmin ? 'Admin' : 'You'}
                                </p>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                <p className="text-xs opacity-50 mt-1">
                                  {msg.timestamp?.toDate?.()?.toLocaleString() || 'Sending...'}
                                </p>
                              </div>
                            </motion.div>
                          ))
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Input Area */}
                      <div className="flex gap-2">
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          placeholder="Type your message to admin..."
                          disabled={loading}
                          className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                          rows={2}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!message.trim() || loading}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
