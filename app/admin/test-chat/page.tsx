'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, limit } from 'firebase/firestore';

export default function TestChatPage() {
  const [status, setStatus] = useState('Testing...');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testFirestore() {
      try {
        if (!db) {
          setError('Firebase not initialized');
          setStatus('❌ Firebase not initialized');
          return;
        }

        setStatus('✅ Firebase initialized');
        
        // Try to read from chatMessages collection
        const messagesRef = collection(db, 'chatMessages');
        const q = query(messagesRef, limit(10));
        
        console.log('Attempting to read chatMessages...');
        const snapshot = await getDocs(q);
        
        console.log('Query successful! Documents:', snapshot.size);
        setStatus(`✅ Successfully read ${snapshot.size} messages`);
        
        const msgs: any[] = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });
        
        setMessages(msgs);
        console.log('Messages:', msgs);
        
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
        setStatus(`❌ Error: ${err.code || err.message}`);
        
        if (err.code === 'permission-denied') {
          setStatus('🚫 PERMISSION DENIED - Deploy Firestore rules!');
        }
      }
    }

    testFirestore();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chat Messages Test</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <p className="text-2xl mb-4">{status}</p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 mb-4">
              <p className="text-red-800 dark:text-red-200 font-mono text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Messages ({messages.length})</h2>
          
          {messages.length === 0 ? (
            <p className="text-muted-foreground">No messages found</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="border rounded p-4">
                  <p className="font-semibold">{msg.senderName} ({msg.senderEmail})</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    User ID: {msg.userId} | Admin: {msg.isAdmin ? 'Yes' : 'No'}
                  </p>
                  <p className="mb-2">{msg.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {msg.timestamp?.toDate?.()?.toLocaleString() || 'No timestamp'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Check the status above</li>
            <li>If you see "PERMISSION DENIED", run: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">firebase deploy --only firestore:rules</code></li>
            <li>If you see messages, the connection works!</li>
            <li>Open browser console (F12) for detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
