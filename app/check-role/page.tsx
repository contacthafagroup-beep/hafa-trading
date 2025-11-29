'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function CheckRolePage() {
  const { user, userData, loading } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const makeAdmin = async () => {
    if (!user || !db) return;
    
    setUpdating(true);
    setMessage('');
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        role: 'admin'
      });
      setMessage('✅ Success! You are now an admin. Refresh the page.');
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You need to login first.</p>
            <Link href="/auth/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Check Your Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Your Account Info:</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
            <p><strong>Display Name:</strong> {userData?.displayName || 'Not set'}</p>
            <p className="mt-2">
              <strong>Current Role:</strong>{' '}
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                userData?.role === 'admin' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {userData?.role || 'No role set'}
              </span>
            </p>
          </div>

          {userData?.role === 'admin' ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-bold mb-2">✅ You are an admin!</p>
              <Link href="/admin">
                <Button className="w-full">Go to Admin Panel</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 mb-4">
                ⚠️ Your role is currently <strong>"{userData?.role || 'customer'}"</strong>. 
                You need admin role to access the admin panel.
              </p>
              <Button 
                onClick={makeAdmin} 
                disabled={updating}
                className="w-full"
              >
                {updating ? 'Updating...' : 'Make Me Admin'}
              </Button>
              {message && (
                <p className="mt-3 text-sm">{message}</p>
              )}
            </div>
          )}

          <div className="border-t pt-4">
            <Link href="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
