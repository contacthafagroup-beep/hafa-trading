'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
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

            {/* Quick Contact Buttons */}
            <div className="mt-6 space-y-2">
              <h5 className="text-white font-semibold text-xs mb-3">Quick Connect</h5>
              
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

        {/* Live Chat Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <FooterLiveChat />
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
  const [messages, setMessages] = React.useState<Array<{ text: string; isUser: boolean; time: string }>>([
    { text: 'Hello! How can we help you today?', isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      text: message,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Auto-reply after 1 second
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Thank you for your message! Our team will respond shortly. For immediate assistance, please use WhatsApp or Telegram.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              💬
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Live Chat Support</h3>
              <p className="text-white/80 text-sm">We're here to help you 24/7</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            {isOpen ? 'Close Chat' : 'Start Chat'}
          </button>
        </div>

        {isOpen && (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
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
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 For faster response, use WhatsApp or Telegram above
              </p>
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-xs font-semibold text-gray-600 mb-2">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMessage('I need a quote for export')}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition-colors text-gray-700"
                >
                  📋 Request Quote
                </button>
                <button
                  onClick={() => setMessage('I want to track my shipment')}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition-colors text-gray-700"
                >
                  📦 Track Order
                </button>
                <button
                  onClick={() => setMessage('Tell me about your products')}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition-colors text-gray-700"
                >
                  🌿 View Products
                </button>
                <button
                  onClick={() => setMessage('I need help with customs')}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-100 transition-colors text-gray-700"
                >
                  🛃 Customs Help
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
