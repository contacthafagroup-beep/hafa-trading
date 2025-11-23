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
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));
  
  // Get authentication token from cookies
  const authToken = request.cookies.get('auth-token')?.value;
  const userEmail = request.cookies.get('user-email')?.value;
  
  // If accessing admin route, check if user is admin
  if (isAdminRoute) {
    if (!authToken) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    if (userEmail !== 'admin@hafatrading.com') {
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // If accessing protected route, check authentication
  if (isProtectedRoute && !isPublicRoute) {
    if (!authToken) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // If authenticated and trying to access login/register, redirect to home
  if (authToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
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
