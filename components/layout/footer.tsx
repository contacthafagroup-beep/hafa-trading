'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hafa General Trading PLC</h3>
            <p className="text-sm mb-4">
              Trading Beyond Borders - Your trusted partner in international import and export.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/export-products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link href="/services/export" className="hover:text-white transition-colors">Export Services</Link></li>
              <li><Link href="/services/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/export" className="hover:text-white transition-colors">Export Services</Link></li>
              <li><Link href="/services/import" className="hover:text-white transition-colors">Import Services</Link></li>
              <li><Link href="/services/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track Shipment</Link></li>
              <li><Link href="/rfq" className="hover:text-white transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Hossana, Ethiopia<br />Gofer Meda Subcity<br />Jelo Naremo District</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+251954742383" className="hover:text-white transition-colors block">+251 954 742 383</a>
                  <a href="tel:+251964839833" className="hover:text-white transition-colors block">+251 964 839 833</a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:contact.hafatrading@gmail.com" className="hover:text-white transition-colors block">contact.hafatrading@gmail.com</a>
                  <a href="mailto:contact@hafagroup.com" className="hover:text-white transition-colors block">contact@hafagroup.com</a>
                  <a href="mailto:info@hafatrading.com" className="hover:text-white transition-colors block">info@hafatrading.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Live Chat and Quick Connect Section - Side by Side */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Live Chat Support - Left (2/3 width) */}
            <div className="lg:col-span-2">
              <FooterLiveChat />
            </div>

            {/* Quick Connect Buttons - Right (1/3 width) */}
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Connect</h5>
              <div className="space-y-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/251954742383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                    📱
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white">WhatsApp</p>
                    <p className="text-xs text-green-100 truncate">+251 954 742 383</p>
                  </div>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/hafatrading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                    ✈️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white">Telegram</p>
                    <p className="text-xs text-blue-100 truncate">@hafatrading</p>
                  </div>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact.hafatrading@gmail.com"
                  className="flex items-center gap-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                    📧
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white">Email Us</p>
                    <p className="text-xs text-purple-100 truncate">contact.hafatrading@gmail.com</p>
                  </div>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Hafa General Trading PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Footer Live Chat Component
function FooterLiveChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Array<{ id: string; text: string; senderId: string; senderName: string; senderEmail: string; timestamp: any; isAdmin: boolean }>>([]);
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Import auth context and firebase
  const { useAuth } = require('@/contexts/auth-context');
  const { db } = require('@/lib/firebase');
  const { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } = require('firebase/firestore');
  const { user } = useAuth();

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen to messages in real-time
  React.useEffect(() => {
    if (!user || !isOpen) return;

    const messagesRef = collection(db, 'chatMessages');
    const q = query(
      messagesRef,
      where('userId', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const msgs: any[] = [];
      snapshot.forEach((doc: any) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-4 shadow-2xl h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              💬
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Live Chat</h3>
              <p className="text-white/80 text-xs">{user ? 'Chat with us' : 'Login to chat'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-1.5 bg-white text-blue-600 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            {isOpen ? 'Close' : 'Chat'}
          </button>
        </div>

        {isOpen && (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {!user ? (
              // Not logged in - Show login prompt
              <div className="p-4 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h4 className="font-bold text-base mb-2 text-gray-800">Welcome!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Please login or register to start chatting with our team
                </p>
                <div className="space-y-2 mb-4">
                  <Link href="/login">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                      Login to Chat
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                      Create Account
                    </button>
                  </Link>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Or contact us directly:</p>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/251954742383"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-base flex-shrink-0">
                        📱
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold text-green-700">WhatsApp</p>
                        <p className="text-xs text-gray-600 truncate">+251 954 742 383</p>
                      </div>
                      <span className="text-green-600">→</span>
                    </a>
                    <a
                      href="https://t.me/hafatrading"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-base flex-shrink-0">
                        ✈️
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold text-blue-700">Telegram</p>
                        <p className="text-xs text-gray-600 truncate">@hafatrading</p>
                      </div>
                      <span className="text-blue-600">→</span>
                    </a>
                    <a
                      href="mailto:contact.hafatrading@gmail.com"
                      className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-base flex-shrink-0">
                        📧
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold text-purple-700">Email</p>
                        <p className="text-xs text-gray-600 truncate">contact.hafatrading@gmail.com</p>
                      </div>
                      <span className="text-purple-600">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="text-white font-semibold">Hafa Support Team</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
                        <p className="text-white/90 text-xs">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/251954742383"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      title="WhatsApp"
                    >
                      📱
                    </a>
                    <a
                      href="https://t.me/hafatrading"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      title="Telegram"
                    >
                      ✈️
                    </a>
                    <a
                      href="mailto:contact.hafatrading@gmail.com"
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      title="Email"
                    >
                      📧
                    </a>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="h-64 overflow-y-auto p-3 bg-gray-50 space-y-2">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-5xl mb-3">👋</div>
                      <p className="text-sm text-gray-600">
                        Start a conversation with our team!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.isAdmin
                              ? 'bg-white border border-gray-200 text-gray-800'
                              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                          }`}
                        >
                          {msg.isAdmin && (
                            <p className="text-xs font-semibold mb-1 opacity-70">
                              Admin
                            </p>
                          )}
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-gray-500' : 'text-white/70'}`}>
                            {msg.timestamp?.toDate?.()?.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            }) || 'Sending...'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                      placeholder="Type message..."
                      disabled={loading}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!message.trim() || loading}
                      className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm font-semibold hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Typically replies within minutes
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="p-3 bg-gray-50 border-t">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Quick:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setMessage('I need a quote for export')}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      📋 Quote
                    </button>
                    <button
                      onClick={() => setMessage('I want to track my shipment')}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      📦 Track
                    </button>
                    <button
                      onClick={() => setMessage('Tell me about your products')}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      🌿 Products
                    </button>
                    <button
                      onClick={() => setMessage('I need help with customs')}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      🛃 Customs
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
