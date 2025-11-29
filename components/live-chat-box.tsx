'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Send, User } from 'lucide-react';
import { useAuth } from '@/lib/contexts/auth-context';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  timestamp: any;
  isAdmin: boolean;
}

export default function LiveChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen to messages in real-time
  useEffect(() => {
    if (!user || !isOpen || !db) return;

    const messagesRef = collection(db, 'chatMessages');
    const q = query(
      messagesRef,
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  const sendMessage = async () => {
    if (!message.trim() || !user || !db) {
      console.log('Cannot send:', { hasMessage: !!message.trim(), hasUser: !!user, hasDb: !!db });
      return;
    }

    setLoading(true);
    try {
      console.log('Sending message...');
      await addDoc(collection(db, 'chatMessages'), {
        text: message.trim(),
        senderId: user.uid,
        senderName: user.displayName || user.email?.split('@')[0] || 'Customer',
        senderEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
        isAdmin: false,
        read: false
      });

      setMessage('');
      console.log('Message sent successfully!');
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

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            size="lg"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.span
                  key="chat"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  💬
                </motion.span>
              ) : (
                <motion.span
                  key="close"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
            
            {/* Notification badge */}
            {!isOpen && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                !
              </motion.div>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-2 left-2 sm:left-auto sm:right-4 z-50 sm:w-72 md:w-80 max-w-[calc(100vw-1rem)] max-h-[5alc(100vh-7rem)] overflow-hidden"
          >
            <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-2 border-blue-200 dark:border-blue-800 shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                        💬
                      </div>
                      <div className="text-white">
                        <h3 className="font-bold text-sm">Live Chat</h3>
                        <p className="text-xs opacity-90">
                          {user ? 'Chat with us' : 'Login'}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Chat Content */}
                {authLoading ? (
                  // Loading auth state
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-xs text-muted-foreground">Loading...</p>
                  </div>
                ) : !user ? (
                  // Not logged in - Show login prompt
                  <div className="p-3 text-center max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h4 className="font-bold text-sm mb-1">Welcome!</h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-tight">
                      Login to chat with us
                    </p>
                    <div className="space-y-2 mb-3">
                      <Link href="/login">
                        <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                          Login to Chat
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button size="sm" variant="outline" className="w-full">
                          Create Account
                        </Button>
                      </Link>
                    </div>

                    {/* Alternative Contact Options */}
                    <div className="border-t pt-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                        Or contact us directly:
                      </p>
                      <div className="space-y-1.5">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/251954742383"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-base flex-shrink-0">
                            📱
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-green-700 dark:text-green-400">WhatsApp</p>
                            <p className="text-xs text-muted-foreground truncate">+251 954 742 383</p>
                          </div>
                          <motion.div
                            className="text-green-600 dark:text-green-400 text-sm"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </a>

                        {/* Telegram */}
                        <a
                          href="https://t.me/hafatrading"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-base flex-shrink-0">
                            ✈️
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Telegram</p>
                            <p className="text-xs text-muted-foreground truncate">@hafatrading</p>
                          </div>
                          <motion.div
                            className="text-blue-600 dark:text-blue-400 text-sm"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </a>

                        {/* Email */}
                        <a
                          href="mailto:contact.hafatrading@gmail.com"
                          className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-base flex-shrink-0">
                            📧
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">Email</p>
                            <p className="text-xs text-muted-foreground truncate">contact.hafatrading@gmail.com</p>
                          </div>
                          <motion.div
                            className="text-purple-600 dark:text-purple-400 text-sm"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Logged in - Show chat interface
                  <>
                    {/* Messages Area */}
                    <div className="h-64 overflow-y-auto p-4 space-y-3">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                          >
                            👋
                          </motion.div>
                          <p className="text-sm text-muted-foreground">
                            Start a conversation with our team!
                          </p>
                        </div>
                      ) : (
                        messages.map((msg, index) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                msg.isAdmin
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                  : 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                              }`}
                            >
                              {msg.isAdmin && (
                                <p className="text-xs font-semibold mb-1 opacity-70">
                                  Admin
                                </p>
                              )}
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {msg.timestamp?.toDate?.()?.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) || 'Sending...'}
                              </p>
                            </div>
                          </motion.div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className="flex-1"
                          disabled={loading}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!message.trim() || loading}
                          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Typically replies within minutes
                      </p>

                      {/* Quick Contact Links */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                          Other ways to reach us:
                        </p>
                        <div className="flex justify-center gap-2">
                          <a
                            href="https://wa.me/251954742383"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-xs"
                            title="WhatsApp: +251 954 742 383"
                          >
                            <span>📱</span>
                            <span className="font-medium">WhatsApp</span>
                          </a>
                          <a
                            href="https://t.me/hafatrading"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-xs"
                            title="Telegram: @hafatrading"
                          >
                            <span>✈️</span>
                            <span className="font-medium">Telegram</span>
                          </a>
                          <a
                            href="mailto:contact.hafatrading@gmail.com"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-xs"
                            title="Email: contact.hafatrading@gmail.com"
                          >
                            <span>📧</span>
                            <span className="font-medium">Email</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
