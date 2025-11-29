'use client';

import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DebugAuthPage() {
  const { user, userData, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Auth Debug Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-4 rounded font-mono text-sm">
            <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
            <p><strong>User:</strong> {user ? 'Logged in' : 'Not logged in'}</p>
            {user && (
              <>
                <p><strong>User Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.uid}</p>
              </>
            )}
            <p className="mt-2"><strong>UserData:</strong> {userData ? 'Loaded' : 'null'}</p>
            {userData && (
              <>
                <p><strong>Role:</strong> {userData.role}</p>
                <p><strong>Display Name:</strong> {userData.displayName}</p>
              </>
            )}
          </div>

          <div className="space-y-2">
            <p className="font-bold">Test Access:</p>
            <Link href="/admin">
              <Button className="w-full">Try Admin Panel</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">Try Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>

          <div className="bg-yellow-50 p-4 rounded text-sm">
            <p className="font-bold mb-2">Expected for Admin Access:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Loading: false</li>
              <li>User: Logged in</li>
              <li>UserData: Loaded</li>
              <li>Role: admin</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
