'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/auth-context';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="text-white font-bold text-xl mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hafa General Trading PLC
            </motion.h3>
            <p className="text-sm mb-6 leading-relaxed text-gray-400">
              <span className="font-semibold text-green-400">Trading Beyond Borders</span> - Your trusted partner in international import and export.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${social.color} transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'About Us', icon: '🏢' },
                { href: '/export-products', label: 'Our Products', icon: '🌿' },
                { href: '/services/export', label: 'Export Services', icon: '✈️' },
                { href: '/services/logistics', label: 'Logistics', icon: '🚚' },
                { href: '/blog', label: 'Blog', icon: '📰' }
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                    <span className="text-base group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/services/export', label: 'Export Services', icon: '📤' },
                { href: '/services/import', label: 'Import Services', icon: '📥' },
                { href: '/services/logistics', label: 'Logistics', icon: '🚛' },
                { href: '/track', label: 'Track Shipment', icon: '📍' },
                { href: '/rfq', label: 'Request Quote', icon: '💼' }
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="text-base group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <motion.li
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-green-400" />
                </motion.div>
                <span className="leading-relaxed">Hossana, Ethiopia<br />Gofer Meda Subcity<br />Jelo Naremo District</span>
              </motion.li>
              <motion.li
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-blue-400" />
                <div className="space-y-1">
                  <a href="tel:+251954742383" className="hover:text-green-400 transition-colors block">+251 954 742 383</a>
                  <a href="tel:+251964839833" className="hover:text-green-400 transition-colors block">+251 964 839 833</a>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-purple-400" />
                <div className="space-y-1">
                  <a href="mailto:contact.hafatrading@gmail.com" className="hover:text-purple-400 transition-colors block break-all">contact.hafatrading@gmail.com</a>
                  <a href="mailto:contact@hafagroup.com" className="hover:text-purple-400 transition-colors block">contact@hafagroup.com</a>
                  <a href="mailto:info@hafatrading.com" className="hover:text-purple-400 transition-colors block">info@hafatrading.com</a>
                </div>
              </motion.li>
            </ul>
          </motion.div>
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-gray-800/50 mt-8 pt-8 text-sm text-center"
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-gray-400"
          >
            &copy; {new Date().getFullYear()} <span className="font-semibold text-green-400">Hafa General Trading PLC</span>. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-xs text-gray-500 mt-2"
          >
            🌍 Trading Beyond Borders | 🌿 Quality You Can Trust
          </motion.p>
        </motion.div>
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
    if (!user || !isOpen || !db) return;

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
    if (!message.trim() || !user || !db) return;

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
