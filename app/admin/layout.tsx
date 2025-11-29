'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';
import AdminNav from '@/components/admin/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      console.log('Admin Check:', { user: !!user, userData, role: userData?.role });
      
      // Wait for userData to load before checking role
      if (userData === null) {
        console.log('Waiting for userData to load...');
        return;
      }
      
      if (userData.role !== 'admin') {
        console.log('User role is not admin:', userData.role, 'redirecting to dashboard');
        router.push('/dashboard');
      } else {
        console.log('User is admin, access granted');
      }
    } else if (!loading && !user) {
      console.log('No user, redirecting to login');
      router.push('/auth/login');
    }
  }, [user, userData, loading, router]);

  // Show loading while auth is initializing OR while userData is being fetched
  if (loading || (user && userData === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Don't render if not logged in or not admin
  if (!user || !userData || userData.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
