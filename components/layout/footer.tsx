'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '@/contexts/chat-context';

export default function Footer() {
  const { setIsOpen } = useChat();
  
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
              {/* Enhanced Chat is now a floating widget, no need for inline component */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">Live Chat Support</h3>
                      <p className="text-white/80 text-xs">Get instant help from our team</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
                  >
                    Start Chat
                  </motion.button>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Get instant support with our enhanced chat featuring file sharing, emojis, and voice messages!
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="px-2 py-1 bg-white/10 rounded">📎 File Sharing</span>
                  <span className="px-2 py-1 bg-white/10 rounded">😀 Emojis</span>
                  <span className="px-2 py-1 bg-white/10 rounded">🎤 Voice Messages</span>
                  <span className="px-2 py-1 bg-white/10 rounded">⚡ Real-time</span>
                </div>
              </div>
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

// Enhanced chat is now handled by the floating EnhancedChatBox component
// No need for a separate FooterLiveChat component
