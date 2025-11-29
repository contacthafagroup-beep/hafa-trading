'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  FileText, 
  MessageSquare,
  Settings,
  BarChart3,
  FolderTree,
  Building2
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/suppliers', label: 'Suppliers', icon: Building2 },
  { href: '/admin/rfqs', label: 'RFQs', icon: MessageSquare },
  { href: '/admin/shipments', label: 'Shipments', icon: Truck },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r min-h-screen p-4">
      <div className="mb-8">
        <Link href="/">
          <h2 className="text-xl font-bold text-blue-600">Hafa Trading</h2>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </Link>
      </div>
      
      <ul className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 pt-8 border-t">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
          ← Back to Website
        </Link>
      </div>
    </nav>
  );
}
