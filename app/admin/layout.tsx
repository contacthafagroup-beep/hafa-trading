'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Truck,
  MessageSquare,
  BarChart3,
  FolderTree,
  Video
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Category Content', href: '/admin/category-content', icon: Video },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'RFQs', href: '/admin/rfqs', icon: FileText },
    { name: 'Shipments', href: '/admin/shipments', icon: Truck },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Suppliers', href: '/admin/suppliers', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: MessageSquare },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r transform transition-transform lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="font-bold">Admin Panel</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-shrink-0 p-4 border-t bg-white dark:bg-gray-800">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4 ml-auto">
              <span className="text-sm text-muted-foreground">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
