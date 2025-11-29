'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';
import { Send, User, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  userId: string;
  timestamp: any;
  isAdmin: boolean;
  read: boolean;
}

interface ChatUser {
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  unreadCount: number;
  lastTimestamp: any;
}

export default function AdminLiveChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get all chat users
  useEffect(() => {
    if (!db) {
      console.error('Firebase not initialized');
      return;
    }

    console.log('Setting up chat users listener...');
    const messagesRef = collection(db, 'chatMessages');
    // Query without orderBy to avoid index requirement - we'll sort client-side
    const q = query(messagesRef);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log('✅ Snapshot received, total documents:', snapshot.size);
        const usersMap = new Map<string, ChatUser>();
        const allMessages: any[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log('📨 Message document:', doc.id, data);
          allMessages.push(data);
        });

        console.log('📊 Total messages loaded:', allMessages.length);

      // Sort messages by timestamp (newest first)
      allMessages.sort((a, b) => {
        const aTime = a.timestamp?.toMillis?.() || 0;
        const bTime = b.timestamp?.toMillis?.() || 0;
        return bTime - aTime;
      });

      // Build users map from sorted messages
      allMessages.forEach((data) => {
        const userId = data.userId;

        if (!userId) {
          console.warn('Message without userId:', data);
          return;
        }

        if (!usersMap.has(userId)) {
          usersMap.set(userId, {
            userId,
            userName: data.senderName || 'Unknown User',
            userEmail: data.senderEmail || 'No email',
            lastMessage: data.text || '',
            unreadCount: !data.read && !data.isAdmin ? 1 : 0,
            lastTimestamp: data.timestamp
          });
        } else {
          const existing = usersMap.get(userId)!;
          if (!data.read && !data.isAdmin) {
            existing.unreadCount++;
          }
        }
      });

      const users = Array.from(usersMap.values());
      console.log('👥 Chat users extracted:', users.length, users);
      setChatUsers(users);
    }, 
    (error) => {
      console.error('❌ Error loading chat users:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Check if it's a permission error
      if (error.code === 'permission-denied') {
        console.error('🚫 PERMISSION DENIED: You need to deploy the updated Firestore rules!');
        console.error('Run: firebase deploy --only firestore:rules');
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to messages for selected user
  useEffect(() => {
    if (!selectedUser || !db) return;

    const messagesRef = collection(db, 'chatMessages');
    const q = query(
      messagesRef,
      where('userId', '==', selectedUser),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);

      // Mark messages as read
      snapshot.forEach(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (!data.read && !data.isAdmin && db) {
          await updateDoc(doc(db, 'chatMessages', docSnapshot.id), { read: true });
        }
      });
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser || !user || !db) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'chatMessages'), {
        text: message.trim(),
        senderId: user.uid,
        senderName: 'Admin',
        senderEmail: user.email,
        userId: selectedUser,
        timestamp: serverTimestamp(),
        isAdmin: true,
        read: true
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⏳
          </motion.div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
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
          <h1 className="text-3xl font-bold mb-2">Live Chat Management</h1>
          <p className="text-muted-foreground">Respond to customer inquiries in real-time</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Users List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Active Chats ({chatUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {chatUsers.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No active chats</p>
                  </div>
                ) : (
                  chatUsers.map((chatUser) => (
                    <motion.button
                      key={chatUser.userId}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedUser(chatUser.userId)}
                      className={`w-full p-4 border-b text-left transition-colors ${
                        selectedUser === chatUser.userId
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {chatUser.userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{chatUser.userName}</p>
                              <p className="text-xs text-muted-foreground">{chatUser.userEmail}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 truncate">
                            {chatUser.lastMessage}
                          </p>
                        </div>
                        {chatUser.unreadCount > 0 && (
                          <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                            {chatUser.unreadCount}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedUser ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {chatUsers.find(u => u.userId === selectedUser)?.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p>{chatUsers.find(u => u.userId === selectedUser)?.userName}</p>
                      <p className="text-sm font-normal text-muted-foreground">
                        {chatUsers.find(u => u.userId === selectedUser)?.userEmail}
                      </p>
                    </div>
                  </div>
                ) : (
                  'Select a chat to start'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedUser ? (
                <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a customer to view conversation</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="h-[450px] overflow-y-auto mb-4 space-y-3">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.isAdmin
                              ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp?.toDate?.()?.toLocaleString() || 'Sending...'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response..."
                      disabled={loading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!message.trim() || loading}
                      className="bg-gradient-to-r from-green-500 to-blue-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
