'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: '💬',
      name: 'Live Chat',
      desc: 'Chat with us now',
      action: () => window.open('/contact', '_blank'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📱',
      name: 'WhatsApp',
      desc: '+251 XXX XXX XXX',
      action: () => window.open('https://wa.me/251XXXXXXXXX', '_blank'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '✈',
      name: 'Telegram',
      desc: '@HafaTrading',
      action: () => window.open('https://t.me/HafaTrading', '_blank'),
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '📧',
      name: 'Email',
      desc: 'info@hafatrading.com',
      action: () => window.location.href = 'mailto:info@hafatrading.com',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎥',
      name: 'Zoom Meeting',
      desc: 'Schedule a call',
      action: () => window.open('/contact', '_blank'),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '📞',
      name: 'Direct Call',
      desc: '+251 XXX XXX XXX',
      action: () => window.location.href = 'tel:+251XXXXXXXXX',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-50 w-80 md:w-96"
          >
            <Card className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-2 border-blue-200 dark:border-blue-800 shadow-2xl">
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-2xl">
                      👋
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">How can we help?</h3>
                      <p className="text-sm text-muted-foreground">Choose your preferred contact method</p>
                    </div>
                  </motion.div>
                </div>

                {/* Contact Options */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contactOptions.map((option, index) => (
                    <motion.button
                      key={option.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={option.action}
                      className="w-full"
                    >
                      <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${option.color} text-white hover:shadow-lg transition-shadow`}>
                        <div className="text-3xl">{option.icon}</div>
                        <div className="text-left flex-1">
                          <div className="font-semibold">{option.name}</div>
                          <div className="text-sm opacity-90">{option.desc}</div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-4 border-t text-center"
                >
                  <p className="text-xs text-muted-foreground">
                    Available 24/7 • Response within 1 hour
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
