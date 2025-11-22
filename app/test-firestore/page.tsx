'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestFirestorePage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testWrite = async () => {
    setLoading(true);
    setResult('Testing write...');
    try {
      const testData = {
        test: 'Hello from test page',
        timestamp: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'test', 'testDoc'), testData);
      setResult('✅ Write successful! Data: ' + JSON.stringify(testData, null, 2));
    } catch (error: any) {
      setResult('❌ Write failed: ' + error.message);
      console.error('Write error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRead = async () => {
    setLoading(true);
    setResult('Testing read...');
    try {
      const docRef = doc(db, 'test', 'testDoc');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setResult('✅ Read successful! Data: ' + JSON.stringify(docSnap.data(), null, 2));
      } else {
        setResult('⚠️ Document does not exist');
      }
    } catch (error: any) {
      setResult('❌ Read failed: ' + error.message);
      console.error('Read error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testWhyChoose = async () => {
    setLoading(true);
    setResult('Testing Why Choose data...');
    try {
      const docRef = doc(db, 'siteContent', 'whyChoose');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setResult('✅ Why Choose data found!\n\nVideo URL: ' + data.videoUrl + '\n\nFull data:\n' + JSON.stringify(data, null, 2));
      } else {
        setResult('⚠️ Why Choose document does not exist yet');
      }
    } catch (error: any) {
      setResult('❌ Failed: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Firestore Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={testWrite} disabled={loading}>
              Test Write
            </Button>
            <Button onClick={testRead} disabled={loading}>
              Test Read
            </Button>
            <Button onClick={testWhyChoose} disabled={loading} variant="secondary">
              Test Why Choose Data
            </Button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-bold mb-2">Firebase Project Info:</h3>
            <p className="text-sm">Project ID: hafa-trading</p>
            <p className="text-sm">Auth Domain: hafa-trading.firebaseapp.com</p>
            <p className="text-sm mt-4">
              <strong>If you see permission errors:</strong>
            </p>
            <ol className="text-sm list-decimal list-inside space-y-1 mt-2">
              <li>Go to Firebase Console</li>
              <li>Make sure you're in the "hafa-trading" project</li>
              <li>Go to Firestore Database → Rules</li>
              <li>Set rules to allow all (for testing)</li>
              <li>Click Publish and wait 30 seconds</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
