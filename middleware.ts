import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/admin',
  '/profile',
  '/orders',
  '/shipments',
  '/rfqs',
];

// Define admin-only routes
const adminRoutes = [
  '/admin',
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/products',
  '/about',
  '/contact',
  '/blog',
  '/login',
  '/register',
  '/forgot-password',
];

export function middleware(request: NextRequest) {
  // Middleware disabled - auth is handled by client-side AuthContext and admin layout
  // Firebase Auth uses its own token management, not cookies
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
