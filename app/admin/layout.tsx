'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      console.log('Admin Check:', { user: !!user, userData, role: userData?.role });
      if (!user) {
        console.log('No user, redirecting to login');
        router.push('/auth/login');
      } else if (userData && userData.role !== 'admin') {
        console.log('User role is not admin:', userData.role, 'redirecting to dashboard');
        router.push('/dashboard');
      } else if (userData && userData.role === 'admin') {
        console.log('User is admin, access granted');
      }
    }
  }, [user, userData, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (userData && userData.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
